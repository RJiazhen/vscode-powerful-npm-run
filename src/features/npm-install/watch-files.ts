import { RelativePattern, workspace } from "vscode";
import { workspaceRootUri } from "../../read-npm-scripts";
import { debounce } from "../../utils/debounce";

/** Install files Pattern */
const installFilePattern =
  "**/{package.json,package-lock.json,yarn.lock,pnpm-lock.yaml}";

/**
 * watch install files changes and update install command list
 */
export const watchFiles = (
  updateInstallFillPathsCallBack: (
    installCommandList: InstallCommand[],
  ) => void,
) => {
  const watcher = workspace.createFileSystemWatcher(
    new RelativePattern(workspaceRootUri || "", installFilePattern),
  );

  updateInstallFilePaths(updateInstallFillPathsCallBack);

  watcher.onDidCreate(() => {
    updateInstallFilePaths(updateInstallFillPathsCallBack);
  });

  watcher.onDidDelete(() => {
    updateInstallFilePaths(updateInstallFillPathsCallBack);
  });
};

const updateInstallFilePaths = debounce(
  async (
    updateInstallFillPathsCallBack?: (installCommandList: any) => void,
  ) => {
    const installFiles = await workspace.findFiles(
      new RelativePattern(workspaceRootUri || "", installFilePattern),
      "**/node_modules/**",
    );

    const commandFileTypeMap = {
      "package.json": "npm install",
      "package-lock.json": "npm ci",
      "yarn.lock": "yarn install",
      "pnpm-lock.yaml": "pnpm install",
    };

    const installCommandList = installFiles.map((file) => {
      const fileName = file.fsPath.split("\\")?.pop();

      if (!fileName || !Object.keys(commandFileTypeMap).includes(fileName)) {
        return undefined;
      }

      const command =
        commandFileTypeMap[fileName as keyof typeof commandFileTypeMap];
      return {
        command,
        file,
      };
    });

    updateInstallFillPathsCallBack?.(installCommandList);
  },
);
