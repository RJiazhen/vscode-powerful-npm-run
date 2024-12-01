import { Terminal, window } from "vscode";
import {
  ConfigurationSection,
  SingleLineCommandOption,
} from "../../constants/enums/configuration";
import { checkIsNvmrcExit } from "../../utils/check-is-nvmrc-exit";
import { getPowerfulNpmRunConfiguration } from "../../utils/get-powerful-npm-run-configuration";
import { getVersionInNvmrc } from "../../utils/get-version-in-nvmrc";
import { isDefaultTerminalTypeCmd } from "../../utils/is-default-terminal-type-cmd";

/**
 * Opens a terminal and runs the selected npm script in it.
 * @param selectedNpmScript The npm script to run.
 * @param terminal The terminal to open. If not provided, a new terminal will be opened, and the command will be executed in it in a single line.
 */
export const openScriptInTerminal = async (
  selectedNpmScript: NpmScriptQuickPickItem,
  terminal: Terminal | undefined,
) => {
  const workPath = selectedNpmScript.packageJsonPath.replace(
    "package.json",
    "",
  );

  const isNvmrcExit = checkIsNvmrcExit(workPath);

  const nodeVersion = isNvmrcExit
    ? await getVersionInNvmrc(workPath + ".nvmrc")
    : getPowerfulNpmRunConfiguration(ConfigurationSection.defaultNodeVersion);

  const terminalTextList = [
    `cd ${workPath}`,
    nodeVersion ? `nvm use ${nodeVersion}` : "",
    `npm run ${selectedNpmScript.name}`,
  ];

  const singleLineCommandOption = getPowerfulNpmRunConfiguration(
    ConfigurationSection.singleLineCommand,
  );

  if (terminal) {
    terminal.show();
    const lastTerminalSeparatorMap = {
      [SingleLineCommandOption.onlyInNewTerminal]: "\n",
      [SingleLineCommandOption.off]: "\n",
      [SingleLineCommandOption.alwaysUseAnd]: "&&",
      [SingleLineCommandOption.alwaysUseSemicolon]: ";",
    };
    terminal.sendText(
      terminalTextList.join(lastTerminalSeparatorMap[singleLineCommandOption]),
    );
    return;
  }

  const newTerminalSeparatorMap = {
    [SingleLineCommandOption.onlyInNewTerminal]: isDefaultTerminalTypeCmd()
      ? "&&"
      : ";",
    [SingleLineCommandOption.off]: "\n",
    [SingleLineCommandOption.alwaysUseAnd]: "&&",
    [SingleLineCommandOption.alwaysUseSemicolon]: ";",
  };

  const newTerminal = window.createTerminal();
  newTerminal.show();
  newTerminal.sendText(
    terminalTextList.join(newTerminalSeparatorMap[singleLineCommandOption]),
  );
};
