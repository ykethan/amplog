oclif-amplog-monitor
=================

oclif amplog CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/oclif/hello-world/tree/main)
[![GitHub license](https://img.shields.io/github/license/oclif/hello-world)](https://github.com/oclif/hello-world/blob/main/LICENSE)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g amplog
$ amplog COMMAND
running command...
$ amplog (--version)
amplog/3.0.2 darwin-arm64 node-v18.18.0
$ amplog --help [COMMAND]
USAGE
  $ amplog COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`amplog help [COMMANDS]`](#amplog-help-commands)
* [`amplog monitor`](#amplog-monitor)
* [`amplog plugins`](#amplog-plugins)
* [`amplog plugins:install PLUGIN...`](#amplog-pluginsinstall-plugin)
* [`amplog plugins:inspect PLUGIN...`](#amplog-pluginsinspect-plugin)
* [`amplog plugins:install PLUGIN...`](#amplog-pluginsinstall-plugin-1)
* [`amplog plugins:link PLUGIN`](#amplog-pluginslink-plugin)
* [`amplog plugins:uninstall PLUGIN...`](#amplog-pluginsuninstall-plugin)
* [`amplog plugins:uninstall PLUGIN...`](#amplog-pluginsuninstall-plugin-1)
* [`amplog plugins:uninstall PLUGIN...`](#amplog-pluginsuninstall-plugin-2)
* [`amplog plugins update`](#amplog-plugins-update)

## `amplog help [COMMANDS]`

Display help for amplog.

```
USAGE
  $ amplog help [COMMANDS] [-n]

ARGUMENTS
  COMMANDS  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for amplog.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v6.0.5/src/commands/help.ts)_

## `amplog monitor`

Monitors a log file

```
USAGE
  $ amplog monitor [-b] [-f <value>] [-h]

FLAGS
  -b, --beginning     Start reading the log file from the beginning
  -f, --file=<value>  [default: ~/.amplify/logs/amplify-cli-2023-10-30.log] Path to the log file
  -h, --help          Show help

DESCRIPTION
  Monitors a log file

EXAMPLES
  $ amplog monitor
```

_See code: [src/commands/monitor.ts](https://github.com/ykethan/amplog/blob/v3.0.2/src/commands/monitor.ts)_

## `amplog plugins`

List installed plugins.

```
USAGE
  $ amplog plugins [--json] [--core]

FLAGS
  --core  Show core plugins.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ amplog plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v4.0.1/src/commands/plugins/index.ts)_

## `amplog plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ amplog plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -s, --silent   Silences yarn output.
  -v, --verbose  Show verbose yarn output.

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ amplog plugins add

EXAMPLES
  $ amplog plugins:install myplugin 

  $ amplog plugins:install https://github.com/someuser/someplugin

  $ amplog plugins:install someuser/someplugin
```

## `amplog plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ amplog plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ amplog plugins:inspect myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v4.0.1/src/commands/plugins/inspect.ts)_

## `amplog plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ amplog plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -s, --silent   Silences yarn output.
  -v, --verbose  Show verbose yarn output.

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ amplog plugins add

EXAMPLES
  $ amplog plugins:install myplugin 

  $ amplog plugins:install https://github.com/someuser/someplugin

  $ amplog plugins:install someuser/someplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v4.0.1/src/commands/plugins/install.ts)_

## `amplog plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ amplog plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help      Show CLI help.
  -v, --verbose
  --[no-]install  Install dependencies after linking the plugin.

DESCRIPTION
  Links a plugin into the CLI for development.
  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ amplog plugins:link myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v4.0.1/src/commands/plugins/link.ts)_

## `amplog plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ amplog plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ amplog plugins unlink
  $ amplog plugins remove
```

## `amplog plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ amplog plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ amplog plugins unlink
  $ amplog plugins remove
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v4.0.1/src/commands/plugins/uninstall.ts)_

## `amplog plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ amplog plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ amplog plugins unlink
  $ amplog plugins remove
```

## `amplog plugins update`

Update installed plugins.

```
USAGE
  $ amplog plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v4.0.1/src/commands/plugins/update.ts)_
<!-- commandsstop -->
