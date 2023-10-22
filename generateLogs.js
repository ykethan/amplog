/* eslint-disable max-nested-callbacks */
/* eslint-disable unicorn/filename-case */
/* eslint-disable perfectionist/sort-imports */
/* eslint-disable unicorn/filename-case */
import fs from 'node:fs'
import {DateTime} from 'luxon'

const logFilePath = `./${DateTime.now().toFormat('yyyy-MM-dd')}.log`

const writeError = (errorMessage, faultMessage) => {
  const timeStamp = DateTime.now().toISO()
  fs.appendFileSync(logFilePath, `${timeStamp}|${errorMessage}\n`)
  if (faultMessage) {
    fs.appendFileSync(logFilePath, `${faultMessage}\n`)
  }
}

const generateLogs = () => {
  // Scenario 1: Generate the first error
  writeError(
    'error : No Amazon CloudFront and S3 hosting service is enabled.',
    'UnknownFault: No Amazon CloudFront and S3 hosting service is enabled.',
  )

  setTimeout(() => {
    // Scenario 2: Generate the second error
    writeError('error : 254', 'UnknownFault: 254')

    setTimeout(() => {
      // Scenario 3: Generate the third error
      writeError('error : Removing a model from the GraphQL schema will also remove the underlying DynamoDB table.')

      setTimeout(() => {
        // Scenario 4: Generate the fourth error
        writeError('error : NotFoundException: BackendEnvironment dev does not exist.')

        setTimeout(() => {
          // Scenario 5: Generate the fifth error
          writeError(
            'error : Syntax Error: Expected Name, found "{".',
            'BackendPullFault: Syntax Error: Expected Name, found "{".',
          )

          setTimeout(() => {
            // Scenario 6: Duplicate the first error rapidly
            writeError(
              'error : No Amazon CloudFront and S3 hosting service is enabled.',
              'UnknownFault: No Amazon CloudFront and S3 hosting service is enabled.',
            )
            writeError(
              'error : No Amazon CloudFront and S3 hosting service is enabled.',
              'UnknownFault: No Amazon CloudFront and S3 hosting service is enabled.',
            )

            setTimeout(() => {
              // Scenario 7: Rapid input of various logs
              writeError('error : Module not found')
              writeError('error : error in line 10')
              writeError('error : space not available')
              writeError('error : Rapid Error 4', 'Fault: Rapid Fault for Error 4')

              console.log(`Logs generated in ${logFilePath}`)
            }, 500)
          }, 500)
        }, 1000)
      }, 1000)
    }, 1000)
  }, 1000)
}

generateLogs()
