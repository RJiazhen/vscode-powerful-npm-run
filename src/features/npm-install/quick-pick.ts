import { window } from "vscode";

export const quickPick = window.createQuickPick<NpmInstallQuickPickItem>();

quickPick.items = [
  {
    label: "Loading install commands...",
    description: "Please wait...",
  },
];

quickPick.placeholder = "Select an npm install command to run";

export const onQuickPickSelected = (
  onDidSelect: (item: NpmInstallQuickPickItem) => void,
): void => {
  quickPick.onDidChangeSelection((items) => {
    onDidSelect(items[0]);
  });
};

export const updateQuickPickItems = (
  items: NpmInstallQuickPickItem[],
): void => {
  quickPick.items = items;
};
