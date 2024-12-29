# Powerful NPM Run

[中文文档](./docs/README.zh-CN.md)

## Features

Quickly execute `npm run` and switch node versions through the command panel.

<img src="https://github.com/RJiazhen/vscode-powerful-npm-run/raw/refs/heads/main/docs/images/npm-run-demo.gif" alt="demo">

- Support detection of npm scripts in subdirectory
- Automatically switch node versions according to the `.nvmrc` file in the same directory
- Setting default node version

Quickly execute `npm install`, `npm ci`, `pnpm install`, `yarn install` commands.

<img src="https://github.com/RJiazhen/vscode-powerful-npm-run/raw/refs/heads/main/docs/images/npm-install-demo.gif" alt="npm-install-demo">

## Commands

- `npm run (Last Used Terminal)`: Displays all available `npm run` scripts and executes them in the last used terminal.

- `npm run (New Terminal)`: Displays all available `npm run` scripts and executes them in the new terminal.

- `npm install`: Displays all available `npm install`, `npm ci`, `pnpm install`, `yarn install` commands and executes them in the last used terminal.

## Configuration

- `Default Node Version`: Set the default node version.
  When there is no `.nvmrc` file and `package.json`'s `engines.node` field does not specify the node version, the default node version will be used.

- `Single Line Command`: Single line command mode.
  Merge the operations of switching directories, switching node versions, and executing npm scripts into a single line command. Recommended for Windows users to **choose a non-cmd terminal by `Terminal: Select Default Profile`** and **set this option to `always use;`**.

## Detailed Introduction

### Config Node Version

In addition to configuring the default node version in the extension settings, you can also add `.nvmrc` file or `engines.node` field in `package.json` to specify the node version.

The priority of node version is as follows:

1. `.nvmrc` file;
2. `engines.node` field in `package.json`:
   1. Node version without any symbol at the beginning, like `20.11.0`;
   2. Node version with `^` symbol at the beginning, like `^20.11.0`;
   3. Node version with `~` symbol at the beginning, like `~20.11.0`;
   4. Node version with `>=` or `<=` symbol at the beginning, will take the highest version number, like `>=20.11.0 <=21.10.0` will take `21.10.0`;
   5. **NOTE**: the node version start with `<` or `>` will be ignored now(maybe will support in the future).
3. Default node version in the extension settings.

`engines.node` example:

```json
{
  "engines": {
    "node": "20.11.0 ^22.12.0 ~18.20.4 <=16.0.0 >=23.0.0 <20.0.0 >21.0.0"
  }
}
```

The Node `20.11.0` version will be used, and the `<20.0.0` and `>21.0.0` will be ignored.

### Single Line Command

The `npm run XXX` and `npm install` commands will be merged into a single line command according to the `Single Line Command` setting.

If `Single Line Command` is set to `always use ;`, the command will like this:

```bash
cd d:\Projects\vscode-extension\vscode-powerful-npm-run\test\;nvm use 20.11.0;npm run test
```

## Roadmap

- [x] Configure default node version
- [x] Support `npm install`,`pnpm install`,`yarn install` and other related commands
- [x] Run all commands in one line
- [x] Get node version from `package.json`'s `engines` field
- [ ] Remember the last command you used for each workspace directory
- [ ] Support execution of npm scripts through tasks
- [ ] Internationalization

## License

MIT
