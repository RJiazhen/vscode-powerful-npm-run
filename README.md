# Powerful NPM Run

[中文文档](./docs/README.zh-CN.md)

## Features

Quickly execute `npm run` and switch node versions through the command panel.

<img src="https://github.com/RJiazhen/vscode-powerful-npm-run/raw/refs/heads/main/docs/images/npm-run-demo.webp" alt="demo">

- Support detection of npm scripts in subdirectory
- Automatically switch node versions according to the `.nvmrc` file in the same directory
- Setting default node version

Quickly execute `npm install`, `npm ci`, `pnpm install`, `yarn install` commands.

<img src="https://github.com/RJiazhen/vscode-powerful-npm-run/raw/refs/heads/main/docs/images/npm-install-demo.webp" alt="npm-install-demo">

## Commands

- `npm run (Last Used Terminal)`: Displays all available `npm run` scripts and executes them in the last used terminal.

- `npm run (New Terminal)`: Displays all available `npm run` scripts and executes them in the new terminal.

- `npm install`: Displays all available `npm install`, `npm ci`, `pnpm install`, `yarn install` commands and executes them in the last used terminal.

## Configuration

- `Default Node Version`: Set the default node version.
  When there is no `.nvmrc` file, the default node version will be used.

- `Single Line Command`: Single line command mode.
  Merge the operations of switching directories, switching node versions, and executing npm scripts into a single line command. Recommended for Windows users to use a non-cmd terminal as the default terminal and set this option to `always use ;`.

## Roadmap

- [x] Configure default node version
- [x] Support `npm install`,`pnpm install`,`yarn install` and other related commands
- [ ] Remember the last command you used for each workspace directory
- [ ] Support execution of npm scripts through tasks
- [ ] Internationalization

## License

MIT
