import { workspace } from "vscode";

/**
 * Get the version in.nvmrc file
 * @param filePath The path of.nvmrc file
 * @returns The version in.nvmrc file
 */
export const getVersionInNvmrc = async (filePath: string) => {
  const nvmrcVersion = (await workspace.openTextDocument(filePath))
    .getText()
    .trim()
    .replace("v", "");

  return nvmrcVersion;
};
