import { getDefaultTerminalType } from "./get-default-terminal-type";

/**
 * convert the windows path to the format suitable for different terminals
 * @param path windows path (e.g. d:\Projects\vscode-extension\vscode-powerful-npm-run\test\no-node-version\)
 * @returns the path format suitable for the current terminal
 */
export const convertPathForTerminal = (path: string): string => {
  // if not windows, return the path as is
  if (process.platform !== "win32") {
    return path;
  }

  const terminalType = getDefaultTerminalType();

  switch (terminalType) {
    // only git-bash and wsl need to convert the path
    case "Git Bash":
    case "wsl":
      // git-bash and wsl need unix style path
      return path
        .replace(/^([A-Za-z]):/, "/$1") // convert d: to /d
        .replace(/\\/g, "/") // convert backslash to slash
        .replace(/\/$/, ""); // remove the trailing slash
    default:
      // cmd and powershell use windows format, but need to ensure the path is correctly quoted
      return `"${path.replace(/\/$/, "")}"`; // quote the path and remove the trailing slash
  }
};
