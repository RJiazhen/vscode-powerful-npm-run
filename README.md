# Powerful NPM Run

[中文文档](./docs/README.zh-CN.md)

## Features

Quickly execute npm scripts and switch node versions through the command panel.

<img src="docs/images/demo.gif" alt="demo">

- Support detection of npm scripts in subdirectory
- Automatically switch node versions according to the `.nvmrc` file in the same directory

## Commands

- `npm run (Last Used Terminal)`: Displays all available npm scripts and executes them in the last used terminal.

- `npm run (New Terminal)`: Displays all available npm scripts and executes them in the new terminal.

## Roadmap

- [ ] Configure default node version
- [ ] Support `npm install`,`pnpm install`,`yarn install` and other related commands
- [ ] Remember the last command you used for each workspace directory
- [ ] Detect whether nvm is installed
- [ ] Support execution of npm scripts through tasks
- [ ] Internationalization

## License

MIT
