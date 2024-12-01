import { Terminal, window, workspace } from "vscode";
import { checkIsNvmrcExit } from "../../utils/check-is-nvmrc-exit";
import { getVersionInNvmrc } from "../../utils/get-version-in-nvmrc";
import { getPowerfulNpmRunConfiguration } from "../../utils/get-powerful-npm-run-configuration";
import { ConfigurationSection } from "../../constants/enums/configuration";

/**
 * Opens a terminal and runs the selected npm script in it.
 * @param terminal The terminal to open.
 * @param selectedNpmScript The npm script to run.
 */
export const openScriptInTerminal = async (
  terminal: Terminal,
  selectedNpmScript: NpmScriptQuickPickItem,
) => {
  terminal.show();
  const workPath = selectedNpmScript.packageJsonPath.replace(
    "package.json",
    "",
  );
  terminal.sendText(`cd ${workPath}`);

  const isNvmrcExit = checkIsNvmrcExit(
    selectedNpmScript.packageJsonPath.replace("package.json", ""),
  );

  const nvmrcVersion = isNvmrcExit
    ? await getVersionInNvmrc(
        selectedNpmScript.packageJsonPath.replace("package.json", ".nvmrc"),
      )
    : getPowerfulNpmRunConfiguration(ConfigurationSection.defaultNodeVersion);

  terminal.sendText(`nvm use ${nvmrcVersion}`);

  const npmCommand = `npm run ${selectedNpmScript.name}`;
  terminal.sendText(npmCommand);
};
