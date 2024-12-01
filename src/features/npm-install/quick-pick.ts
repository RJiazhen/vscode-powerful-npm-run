import { window } from "vscode";

export const npmInstallQuickPick =
  window.createQuickPick<NpmInstallQuickPickItem>();

npmInstallQuickPick.items = [
  {
    label: "Loading install commands...",
    description: "Please wait...",
  },
];

npmInstallQuickPick.placeholder = "Select an npm install command to run";
