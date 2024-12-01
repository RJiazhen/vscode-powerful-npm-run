import { Terminal, window, workspace } from "vscode";
import { checkIsNvmrcExit } from "../../utils/check-is-nvmrc-exit";

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
  if (isNvmrcExit) {
    const nvmrcPath = selectedNpmScript.packageJsonPath.replace(
      "package.json",
      ".nvmrc",
    );
    const nvmrcVersion = (await workspace.openTextDocument(nvmrcPath))
      .getText()
      .trim()
      .replace("v", "");
    terminal.sendText(`nvm use ${nvmrcVersion}`);
  } else {
    const defaultNodeVersion = workspace
      .getConfiguration("powerful-npm-run")
      .get("defaultNodeVersion");

    if (defaultNodeVersion) {
      terminal.sendText(`nvm use ${defaultNodeVersion}`);
    }
  }

  const npmCommand = `npm run ${selectedNpmScript.name}`;
  terminal.sendText(npmCommand);
};
