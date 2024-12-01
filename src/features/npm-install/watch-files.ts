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

    const installFileInfoList = [
      {
        fileName: "pnpm-lock.yaml",
        command: "pnpm install",
      },
      {
        fileName: "yarn.lock",
        command: "yarn install",
      },
      {
        fileName: "package-lock.json",
        command: "npm ci",
      },
      {
        fileName: "package.json",
        command: "npm install",
      },
    ];

    const installCommandList = installFiles
      .map((file) => {
        const fileName = file.fsPath.split("\\")?.pop();

        const targetInstallInfo = installFileInfoList.find(
          (item) => item.fileName === fileName,
        );

        return {
          command: targetInstallInfo?.command,
          file,
        };
      })
      .toSorted((a, b) => {
        const directoryA = a.file.fsPath.split("\\")?.slice(0, -1).join("\\");
        const directoryB = b.file.fsPath.split("\\")?.slice(0, -1).join("\\");
        if (directoryA !== directoryB) {
          return 0;
        }

        // if same directory, sort by the order of installFileInfoList
        const aTargetFIleInfoIndex = installFileInfoList.findIndex(
          (item) => item.fileName === a.file.fsPath.split("\\")?.pop(),
        );
        const bTargetFIleInfoIndex = installFileInfoList.findIndex(
          (item) => item.fileName === b.file.fsPath.split("\\")?.pop(),
        );

        return aTargetFIleInfoIndex - bTargetFIleInfoIndex;
      });

    updateInstallFillPathsCallBack?.(installCommandList);
  },
);
