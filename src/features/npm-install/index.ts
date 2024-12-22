import { commands, ExtensionContext, window, workspace } from "vscode";
import { npmInstallQuickPick } from "./quick-pick";
import { watchFiles } from "./watch-files";
import { getNvmVersion } from "../../utils/get-nvm-version";
import { sendTextToTerminal } from "../../utils/send-text-to-terminal";
import { sendTextInSingleLine } from "../../utils/send-text-in-single-line";

const quickPickOnDidChangeSelection = async (
  quickPickItemList: readonly NpmInstallQuickPickItem[],
) => {
  const selectedItem = quickPickItemList[0];

  if (!selectedItem.file) {
    npmInstallQuickPick.hide();
    return;
  }

  const lastBackslashIndex = selectedItem.file.fsPath.lastIndexOf("\\");
  if (lastBackslashIndex === -1) {
    npmInstallQuickPick.hide();
    return;
  }
  const workDir =
    lastBackslashIndex !== -1
      ? selectedItem.file.fsPath.slice(0, lastBackslashIndex + 1)
      : "";

  const nvmVersion = await getNvmVersion(workDir);

  const commandList = [
    `cd "${workDir}"`,
    `nvm use ${nvmVersion}`,
    selectedItem.command || "",
  ];

  sendTextInSingleLine({
    textList: commandList,
    terminal: window.activeTerminal,
  });

  npmInstallQuickPick.hide();
};

const updateInstallFillPathsCallBack = (
  installCommandList: InstallCommand[],
) => {
  const newQuickPickItemList = installCommandList.map((installCommand) => {
    const workspaceRootUri = workspace.workspaceFolders?.[0]?.uri;

    const relativeRunPath = installCommand.file.fsPath.replace(
      workspaceRootUri?.fsPath + "\\",
      "",
    );

    return {
      label: `${installCommand.command}${relativeRunPath ? ` - ${relativeRunPath}` : ""}`,
      ...installCommand,
    };
  });

  npmInstallQuickPick.items = newQuickPickItemList;
};

/**
 * Register the npm install command
 * @param context The extension context
 */
export const registerNpmInstall = (context: ExtensionContext) => {
  npmInstallQuickPick.onDidChangeSelection(quickPickOnDidChangeSelection);
  watchFiles(updateInstallFillPathsCallBack);

  const npmInstallCommand = commands.registerCommand(
    "rjz-npm-run.npmInstall",
    () => {
      npmInstallQuickPick.show();
      npmInstallQuickPick.items = npmInstallQuickPick.items;
    },
  );

  context.subscriptions.push(npmInstallCommand);
};
