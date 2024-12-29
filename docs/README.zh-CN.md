# Powerful NPM Run

## 功能

通过命令面板快速执行`npm run`脚本并且自动切换 node 版本。

<img src="https://github.com/RJiazhen/vscode-powerful-npm-run/raw/refs/heads/main/docs/images/npm-run-demo.gif" alt="demo">

- 支持探测子目录中的npm脚本
- 根据同目录下的`.nvmrc`文件自动切换node版本
- 设置默认node版本

通过命令面板快速执行`npm install`、`npm ci`、`pnpm install`、`yarn install`等相关命令。

<img src="https://github.com/RJiazhen/vscode-powerful-npm-run/raw/refs/heads/main/docs/images/npm-install-demo.gif" alt="npm-install-demo">

## 命令

- `npm run (Last Used Terminal)`: 显示所有可用的`npm run`脚本，并在最后一次使用的终端中执行。
- `npm run (New Terminal)`: 显示所有可用的 `npm run` 脚本，并在新的终端中执行。
- `npm install`: 显示所有可用的`npm install`、`npm ci`、`pnpm install`、`yarn install`命令，并在最后一次使用的终端中执行。

## 配置项

- `Default Node Version`: 设置默认node版本。
  当没有检测到`.nvmrc`文件，并且`package.json`中没有`engines.node`配置项时，会使用默认node版本。

- `Single Line Command`: 单行命令模式。
  将切换目录、切换node版本、执行npm脚本等操作合并为一行命令，推荐windows用户**使用`Terminal: Select Default Profile`将默认终端设置为非cmd**，然后**将该项设置为`always use ;`**。

## 详细说明

### 配置Node版本

除了直接在设置中配置默认node版本，还可以在`package.json`同级目录下创建`.nvmrc`文件，或者在`package.json`中添加`engines.node`配置项，指定node版本。

node版本的优先级如下：

1. `.nvmrc`文件中的版本；
2. `package.json`中的`engines.node`配置项：
   1. 开头没有任何符号的版本号，例如`20.11.0`；
   2. 以`^`开头的版本号，例如`^20.11.0`；
   3. 以`~`开头的版本号，例如`~20.11.0`；
   4. 以`>=`或`<=`开头的版本号，会选取最高的版本号，例如`>=20.11.0 <=21.10.0`将会选取`21.10.0`；
   5. **注意**：以`>`或`<`开头的版本号，会被忽略（或许未来会添加支持）；
3. 设置中的默认node版本

`engines.node` 示例：

```json
{
  "engines": {
    "node": "20.11.0 ^22.12.0 ~18.20.4 <=16.0.0 >=23.0.0 <20.0.0 >21.0.0"
  }
}
```

将会使用`20.11.0`版本，并且完全忽略`<20.0.0`和`>21.0.0`。

### 单行命令

`npm run XXX`和`npm install`命令将会根据`Single Line Command`设置变为单行命令。

如果`Single Line Command`设置为`always use ;`，命令将会是这样的：

```powershell
cd d:\Projects\vscode-extension\vscode-powerful-npm-run\test\;nvm use 20.11.0;npm run test
```

## 路线图

- [x] 配置默认node版本；
- [x] 支持`npm install`、`pnpm install`、`yarn install`等相关命令；
- [x] 在一行中执行所有命令；
- [x] 支持从`package.json`的`engines.node`配置项读取node版本；
- [ ] 记住每个工作区目录上次使用的命令；
- [ ] 支持通过任务执行npm脚本；
- [ ] 国际化；

## 协议

MIT
