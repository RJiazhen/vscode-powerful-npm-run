import { Terminal } from "vscode";
import { ConfigurationSection } from "../../constants/enums/configuration";
import { checkIsNvmrcExit } from "../../utils/check-is-nvmrc-exit";
import { getPowerfulNpmRunConfiguration } from "../../utils/get-powerful-npm-run-configuration";
import { getVersionInNvmrc } from "../../utils/get-version-in-nvmrc";

/**
 * Opens a terminal and runs the selected npm script in it.
 * @param terminal The terminal to open.
 * @param selectedNpmScript The npm script to run.
 */
export const openScriptInTerminal = async (
  terminal: Terminal,
  selectedNpmScript: NpmScriptQuickPickItem,
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

  terminal.show();
  terminal.sendText(terminalTextList.join("\n"));
};
