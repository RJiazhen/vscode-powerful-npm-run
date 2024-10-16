type InstallCommand = {
  command: string;
  file: import("vscode").Uri;
};

/**
 * extended QuickPickItem for npm scripts
 */
type NpmInstallQuickPickItem = import("vscode").QuickPickItem &
  Partial<InstallCommand>;
