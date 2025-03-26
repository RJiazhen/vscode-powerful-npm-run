/**
 * @description: check if there is a volta configuration in target package.json file
 * @author: Ruan Jiazhen
 * @date: 2024-03-19
 */

import { existsSync } from "fs";
import { Uri, workspace } from "vscode";

interface HasVoltaConfig {
  (targetDir: Uri): Promise<boolean>;
  (targetDir: string): Promise<boolean>;
}

/**
 * Check if volta configuration exists in package.json
 * @param targetDir The target directory
 * @returns boolean indicating whether volta config exists
 */
export const hasVoltaConfig: HasVoltaConfig = async (targetDir) => {
  const targetDirStr =
    typeof targetDir === "string" ? targetDir : targetDir.fsPath;

  const packageJsonPath = `${targetDirStr}\package.json`;
  const isPackageJsonExist = existsSync(packageJsonPath);
  if (!isPackageJsonExist) {
    return false;
  }

  try {
    const packageJson = await workspace.openTextDocument(packageJsonPath);
    const packageJsonContent = packageJson.getText();
    const packageJsonObj = JSON.parse(packageJsonContent);
    return !!packageJsonObj?.volta;
  } catch (error) {
    console.error("Error checking volta config:", error);
    return false;
  }
};
