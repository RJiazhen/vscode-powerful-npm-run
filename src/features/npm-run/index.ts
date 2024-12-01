import { QuickPickItem, window } from "vscode";
import {
  getQuickPickItemList,
  setQuickPickItemToFirst,
} from "../../stores/npm-scripts-store";
import { openScriptInTerminal } from "./open-script-in-terminal";

/**
 * 'runNpmScriptCurrentTerminal' and 'runNpmScriptNewTerminal' command callbacks
 * run the selected npm script in the current or a new terminal
 * @param isRunInNewTerminal whether to run the script in a new terminal or the current terminal
 */
export const readNpmScriptsMain = async (isRunInNewTerminal: boolean) => {
  const quickPick = window.createQuickPick<
    NpmScriptQuickPickItem | QuickPickItem
  >();
  quickPick.items = [
    {
      label: "Loading npm scripts...",
      description: "Please wait...",
    },
  ];
  quickPick.placeholder = "Select an npm script to run";
  quickPick.show();

  // FIXME if immediately call after change package.json, quickPick.items will not be updated
  quickPick.items = await getQuickPickItemList();
  quickPick.placeholder = "Select an npm script to run";
  const selectedNpmScript = await new Promise<NpmScriptQuickPickItem>(
    (resolve) => {
      quickPick.onDidChangeSelection((e) => {
        resolve(e[0] as NpmScriptQuickPickItem);
      });
    },
  );

  if (!selectedNpmScript) {
    return;
  }
  setQuickPickItemToFirst(selectedNpmScript);

  openScriptInTerminal(
    selectedNpmScript,
    isRunInNewTerminal ? undefined : window.activeTerminal,
  );
};
