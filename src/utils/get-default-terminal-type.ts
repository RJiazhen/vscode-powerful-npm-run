import { workspace } from "vscode";

/**
 * get the default terminal type in the current platform
 */
export const getDefaultTerminalType = () => {
  switch (process.platform) {
    case "win32":
      return workspace
        .getConfiguration("terminal")
        .get("integrated.defaultProfile.windows");
    case "darwin":
      return workspace
        .getConfiguration("terminal")
        .get("integrated.defaultProfile.osx");
    case "linux":
      return workspace
        .getConfiguration("terminal")
        .get("integrated.defaultProfile.linux");
    default:
      return "unknown";
  }
};
