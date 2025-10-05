import { commands, ExtensionContext, window, workspace } from "vscode";
import { npmInstallQuickPick } from "./quick-pick";
import { watchFiles } from "./watch-files";
import { getNodeVersion } from "../../utils/get-node-version";
import { sendTextInSingleLine } from "../../utils/send-text-in-single-line";
import { getPowerfulNpmRunConfiguration } from "../../utils/get-powerful-npm-run-configuration";
import { ConfigurationSection } from "../../constants/enums/configuration";
import { hasVoltaConfig } from "../../utils/has-volta-config";
import { convertPathForTerminal } from "../../utils/convert-path-for-terminal";

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

  const nvmUseCommand = await (async () => {
    const skipNvmWhenVoltaDetected = getPowerfulNpmRunConfiguration(
      ConfigurationSection.skipNvmWhenVoltaDetected,
    );

    console.log(skipNvmWhenVoltaDetected);

    if (skipNvmWhenVoltaDetected) {
      const isVoltaConfig = await hasVoltaConfig(workDir);
      if (isVoltaConfig) {
        return "";
      }
    }

    const nodeVersion = await getNodeVersion(workDir);

    return `nvm use ${nodeVersion}`;
  })();

  const convertedWorkDir = convertPathForTerminal(workDir);

  const commandList = [
    `cd "${convertedWorkDir}"`,
    nvmUseCommand,
    selectedItem.command || "",
  ].filter(Boolean);

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
