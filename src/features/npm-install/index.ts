import { commands, ExtensionContext, workspace } from "vscode";
import { quickPick } from "./quick-pick";
import { watchFiles } from "./watch-files";
import { getNvmVersion } from "../../utils/get-nvm-version";
import { sendTextToTerminal } from "../../utils/send-text-to-terminal";

const quickPickOnDidChangeSelection = async (
  quickPickItemList: readonly NpmInstallQuickPickItem[],
) => {
  const selectedItem = quickPickItemList[0];

  if (!selectedItem.file) {
    quickPick.hide();
    return;
  }

  const lastBackslashIndex = selectedItem.file.fsPath.lastIndexOf("\\");
  if (lastBackslashIndex === -1) {
    quickPick.hide();
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

  sendTextToTerminal(commandList);

  quickPick.hide();
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

  quickPick.items = newQuickPickItemList;
};

export const npmInstall = (context: ExtensionContext) => {
  quickPick.onDidChangeSelection(quickPickOnDidChangeSelection);
  watchFiles(updateInstallFillPathsCallBack);

  const npmInstallCommand = commands.registerCommand(
    "rjz-npm-run.npmInstall",
    () => {
      quickPick.show();
      quickPick.items = quickPick.items;
    },
  );

  context.subscriptions.push(npmInstallCommand);
};
