import { Terminal } from "vscode";
import { ConfigurationSection } from "../../constants/enums/configuration";
import { checkIsNvmrcExit } from "../../utils/check-is-nvmrc-exit";
import { getPowerfulNpmRunConfiguration } from "../../utils/get-powerful-npm-run-configuration";
import { getVersionInNvmrc } from "../../utils/get-version-in-nvmrc";
import { sendTextInSingleLine } from "../../utils/send-text-in-single-line";
import { getNodeVersion } from "../../utils/get-node-version";

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

  const nodeVersion = await getNodeVersion(workPath);

  const terminalTextList = [
    `cd ${workPath}`,
    nodeVersion ? `nvm use ${nodeVersion}` : "",
    `npm run ${selectedNpmScript.name}`,
  ];

  sendTextInSingleLine({
    textList: terminalTextList,
    terminal,
  });
};
