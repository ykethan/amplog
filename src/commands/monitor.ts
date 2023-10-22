import {Args, Command, Flags} from '@oclif/core'
import chalk from 'chalk'
import * as chokidar from 'chokidar'
import {Bedrock} from 'langchain/llms/bedrock'
import lodash from 'lodash'
const {debounce} = lodash
import {DateTime} from 'luxon'
import * as crypto from 'node:crypto'
import * as fs from 'node:fs'
import ora, {Ora} from 'ora'

const bedrockModel = new Bedrock({
  maxTokens: 150,
  model: 'anthropic.claude-v2',
  region: 'us-east-1',
  stopSequences: [],
  temperature: 0,
})

export default class Monitor extends Command {
  static args = {
    file: Args.string({description: 'file to read'}),
  }

  static description = 'Monitors a log file'
  static examples = ['<%= config.bin %> <%= command.id %>']

  static flags = {
    beginning: Flags.boolean({
      char: 'b',
      default: false,
      description: 'Start reading the log file from the beginning',
    }),
    file: Flags.string({
      char: 'f',
      default: `./${DateTime.now().toFormat('yyyy-MM-dd')}.log`,
      description: 'Path to the log file',
    }),
    help: Flags.help({char: 'h', description: 'Show help'}),
  }

  private lastFileSize = 0
  private logProcessor = new LogProcessor(this.log.bind(this))

  public async run(): Promise<void> {
    const {flags} = await this.parse(Monitor)
    const logFilePath = flags.file

    console.log(`Monitoring -> ${logFilePath}`)

    // Create the file if it doesn't exist
    if (!fs.existsSync(logFilePath)) {
      fs.writeFileSync(logFilePath, '')
      this.log(`File ${logFilePath} does not exist. Created a new one.`)
    }

    const initialSize = fs.statSync(logFilePath).size

    this.lastFileSize = flags.beginning ? 0 : initialSize

    // Set up chokidar watcher
    const watcher = chokidar.watch(logFilePath, {
      ignoreInitial: true,
      persistent: true,
    })

    const debouncedProcess = debounce(() => {
      this.processNewLogEntries(logFilePath)
      // eslint-disable-next-line unicorn/numeric-separators-style
    }, 10000)

    watcher
      .on('add', (path) => {
        this.log(`New log file detected ${path}`)
      })
      .on('change', (path) => {
        this.log(`Log file changed ${path}`)
        debouncedProcess()
      })
  }

  private async filterAndLogErrors(content: string): Promise<void> {
    const newEntries = content.split('\n').filter(Boolean)

    if (newEntries.length > 0) {
      await this.logProcessor.processLogs(newEntries)
    }
  }

  private processNewLogEntries(filePath: string): void {
    const fileStats = fs.statSync(filePath)
    const newSize = fileStats.size

    if (newSize <= this.lastFileSize) return

    const readStream = fs.createReadStream(filePath, {
      encoding: 'utf8',
      start: this.lastFileSize,
    })

    let content = ''
    readStream.on('data', (chunk) => {
      content += chunk
    })

    readStream.on('end', async () => {
      this.lastFileSize = newSize
      await this.filterAndLogErrors(content)
    })
  }
}

class LogProcessor {
  private batch: string[] = []
  private errorCache: Map<string, string> = new Map()
  private errorFound = false
  private log: (msg: string) => void
  private seenLogs: Set<string> = new Set()
  private spinner: Ora = ora({color: 'cyan'})

  constructor(logger: (msg: string) => void) {
    this.log = logger
  }

  public async processLogs(logs: string[]): Promise<void> {
    for (const log of logs) {
      const logHash = this.generateHash(log)
      if (log.includes('|error :')) {
        this.errorFound = true
      }

      if (!this.seenLogs.has(logHash)) {
        this.seenLogs.add(logHash)
        this.batch.push(log)
      }
    }

    if (this.batch.length > 0) {
      await this.processBatch()
      this.resetBatch()
    }
  }

  private addSeparator(): void {
    console.log('\n' + '-'.repeat(50) + '\n')
  }

  private generateHash(log: string): string {
    return crypto.createHash('md5').update(log).digest('hex')
  }

  private async getBedrockInsight(log: string): Promise<string> {
    const errorKey = log.split('error :')[1]?.trim() || log
    if (this.errorCache.has(errorKey)) {
      return this.errorCache.get(errorKey)!
    }

    try {
      const response = await bedrockModel.invoke(
        `Human: got error ${log} \n what does this mean and what should I do? \n keep the response concise \n\n Assistant:`,
      )

      this.errorCache.set(errorKey, response)
      if (this.errorCache.size > 5) {
        this.errorCache.delete([...this.errorCache.keys()][0])
      }

      return response
    } catch (error) {
      this.log(`Error in invoking Bedrock: ${error}`)
      return log
    }
  }

  private async processBatch(): Promise<void> {
    const errors = this.batch.filter((log) => log.includes('|error :'))
    for (const err of errors) {
      this.addSeparator()
      this.spinner.start(chalk.green(`Processing error: ${err}`))
      this.log('\nInvoking Bedrock with: Error detected: ' + err + '\n')

      // Fetching error insight one-by-one
      // eslint-disable-next-line no-await-in-loop
      const insight = await this.getBedrockInsight(`Error detected: ${err}`)

      this.spinner.succeed(chalk.green('Finished processing error.'))
      this.log(insight)
    }

    this.resetBatch()
  }

  private resetBatch(): void {
    this.batch = []
    this.errorFound = false
  }
}
