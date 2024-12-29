/**
 * @description: get nvm version in target directory
 * @author: Ruan Jiazhen
 * @date: 2024-10-16 21:26:15
 **/

import { existsSync } from "fs";
import { Uri, workspace } from "vscode";

interface GetNvmVersion {
  (targetDir: Uri): Promise<string>;
  (targetDir: string): Promise<string>;
}

/**
 * @description: get nvm version in target directory
 * @param nvmrcPath nvmrc file path
 */
const getNodeVersionFromNvmrc = async (nvmrcPath: string) => {
  const nvmrcVersion = (await workspace.openTextDocument(nvmrcPath))
    .getText()
    .trim()
    .replace(/^v/, "");

  return nvmrcVersion;
};

/**
 * @description: get node version from package.json's engines field
 * @param packageJsonPath
 */
const getNodeVersionFromPackageJsonEngines = async (
  packageJsonPath: string,
) => {
  const isPackageJsonExist = existsSync(packageJsonPath);
  if (!isPackageJsonExist) {
    return "";
  }

  const packageJson = await workspace.openTextDocument(packageJsonPath);

  const packageJsonContent = packageJson.getText();
  try {
    const packageJsonObj = JSON.parse(packageJsonContent);
    const { node } = packageJsonObj?.engines;
    const nodeVersionDescriptionList: string[] = node?.split(" ");
    /** node version list get from engines string */
    const nodeVersionList = nodeVersionDescriptionList
      ?.map((str) => {
        if (str.startsWith("^")) {
          return {
            version: str.replace("^", "").split(".")[0],
            startWith: "^",
          };
        }

        if (str.startsWith("~")) {
          const versionList = str.replace("~", "").split(".");
          return {
            version: [versionList[0], versionList[1]].join("."),
            startWith: "~",
          };
        }

        if (str.startsWith(">=") || str.startsWith("<=")) {
          return {
            version: str.replace(">=", "").replace("<=", "").split(".")[0],
            startWith: str.startsWith(">=") ? ">=" : "<=",
          };
        }
        // TODO handle for '>', '<'
        if (str.startsWith(">") || str.startsWith("<")) {
          return undefined;
        }

        return {
          version: str,
          startWith: "",
        };
      })
      .filter(Boolean) as { version: string; startWith: string }[];

    // if node version start with '', '^' or '~', return the version
    const highPriorityNodeVersionFlag = ["", "^", "~"];
    const highPriorityNodeVersion = nodeVersionList.find((item) =>
      highPriorityNodeVersionFlag.includes(item.startWith),
    );
    if (highPriorityNodeVersion) {
      return highPriorityNodeVersion.version;
    }

    /** sorted node version list */
    const sortedNodeVersionList = nodeVersionList.toSorted((a, b) => {
      const aVersion = a.version.split(".");
      const completeAVersion = [
        aVersion[0] || "0",
        aVersion[1] || "0",
        aVersion[2] || "0",
      ];
      const bVersion = b.version.split(".");
      const completeBVersion = [
        bVersion[0] || "0",
        bVersion[1] || "0",
        bVersion[2] || "0",
      ];

      for (let i = 0; i < 3; i++) {
        if (completeAVersion[i] > completeBVersion[i]) {
          return 1;
        }
        if (completeAVersion[i] < completeBVersion[i]) {
          return -1;
        }
      }

      return 0;
    });

    // return the highest version
    return sortedNodeVersionList[0]?.version || "";
  } catch (error) {
    console.error("Error parsing package.json:", error);
    return "";
  }
};

/**
 * @description: get default node version from setting
 */
const getDefaultNodeVersion = async () => {
  const defaultNodeVersion = workspace
    .getConfiguration("powerful-npm-run")
    .get<string>("defaultNodeVersion");

  return defaultNodeVersion || "";
};

/**
 * Get the node version from the nvmrc file in the target directory, package.json, or settings
 * @param targetDir The target directory
 * @returns The node version
 */
export const getNodeVersion: GetNvmVersion = async (targetDir) => {
  const targetDirStr =
    typeof targetDir === "string" ? targetDir : targetDir.fsPath;

  const nvmrcPath = `${targetDirStr}\.nvmrc`;
  const isNvmrcExist = existsSync(nvmrcPath);
  if (isNvmrcExist) {
    return getNodeVersionFromNvmrc(nvmrcPath);
  }

  const packageJsonPath = `${targetDirStr}\package.json`;
  console.log("engines", getNodeVersionFromPackageJsonEngines(packageJsonPath));

  return (
    getNodeVersionFromPackageJsonEngines(packageJsonPath) ||
    getDefaultNodeVersion()
  );
};
