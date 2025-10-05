import { Terminal } from "vscode";
import { getNodeVersion } from "../../utils/get-node-version";
import { sendTextInSingleLine } from "../../utils/send-text-in-single-line";
import { getPowerfulNpmRunConfiguration } from "../../utils/get-powerful-npm-run-configuration";
import { ConfigurationSection } from "../../constants/enums/configuration";
import { hasVoltaConfig } from "../../utils/has-volta-config";
import { convertPathForTerminal } from "../../utils/convert-path-for-terminal";
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

  const nvmUseTerminalText = await (async () => {
    const skipNvmWhenVoltaDetected = getPowerfulNpmRunConfiguration(
      ConfigurationSection.skipNvmWhenVoltaDetected,
    );

    if (skipNvmWhenVoltaDetected) {
      const isVoltaConfig = await hasVoltaConfig(workPath);
      if (isVoltaConfig) {
        return "";
      }
    }

    const nodeVersion = await getNodeVersion(workPath);

    return `nvm use ${nodeVersion}`;
  })();

  /** converted work path for terminal */
  const convertedWorkPath = convertPathForTerminal(workPath);

  const terminalTextList = [
    `cd ${convertedWorkPath}`,
    nvmUseTerminalText,
    `npm run ${selectedNpmScript.name}`,
  ].filter(Boolean);

  sendTextInSingleLine({
    textList: terminalTextList,
    terminal,
  });
};
