# Powerful NPM Run

## 功能

通过命令面板快速执行`npm run`脚本并且自动切换 node 版本。

<img src="https://github.com/RJiazhen/vscode-powerful-npm-run/raw/refs/heads/main/docs/images/npm-run-demo.webp" alt="demo">

- 支持探测子目录中的npm脚本
- 根据同目录下的`.nvmrc`文件自动切换node版本
- 设置默认node版本

通过命令面板快速执行`npm install`、`npm ci`、`pnpm install`、`yarn install`等相关命令。

<img src="https://github.com/RJiazhen/vscode-powerful-npm-run/raw/refs/heads/main/docs/images/npm-install-demo.webp" alt="npm-install-demo">

## 命令

- `npm run (Last Used Terminal)`: 显示所有可用的`npm run`脚本，并在最后一次使用的终端中执行。
- `npm run (New Terminal)`: 显示所有可用的 `npm run` 脚本，并在新的终端中执行。
- `npm install`: 显示所有可用的`npm install`、`npm ci`、`pnpm install`、`yarn install`命令，并在最后一次使用的终端中执行。

## 配置项

- `Default Node Version`: 设置默认node版本。
  当没有检测到`.nvmrc`文件时，会使用默认node版本。

- `Single Line Command`: 单行命令模式。
  将切换目录、切换node版本、执行npm脚本等操作合并为一行命令，推荐windows用户将默认终端为非cmd，然后将该项设置为`always use ;`。

## 路线图

- [x] 配置默认node版本
- [x] 支持`npm install`、`pnpm install`、`yarn install`等相关命令
- [ ] 记住每个工作区目录上次使用的命令
- [ ] 支持通过任务执行npm脚本
- [ ] 国际化

## 协议

MIT
