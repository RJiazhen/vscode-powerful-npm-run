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

const getNodeVersionFromNvmrc = async (nvmrcPath: string) => {
  const nvmrcVersion = (await workspace.openTextDocument(nvmrcPath))
    .getText()
    .trim()
    .replace(/^v/, "");

  return nvmrcVersion;
};

const getDefaultNodeVersion = async () => {
  const defaultNodeVersion = workspace
    .getConfiguration("powerful-npm-run")
    .get<string>("defaultNodeVersion");

  return defaultNodeVersion || "";
};

export const getNodeVersion: GetNvmVersion = async (targetDir) => {
  const targetDirStr =
    typeof targetDir === "string" ? targetDir : targetDir.fsPath;

  const nvmrcPath = `${targetDirStr}\.nvmrc`;

  const isNvmrcExist = existsSync(nvmrcPath);

  if (isNvmrcExist) {
    return getNodeVersionFromNvmrc(nvmrcPath);
  }

  return getDefaultNodeVersion();
};
