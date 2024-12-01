import { workspace } from "vscode";

export const isDefaultTerminalTypeCmd = () => {
  const integratedDefaultProfile = (() => {
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
  })();

  return integratedDefaultProfile === "Command Prompt";
};
