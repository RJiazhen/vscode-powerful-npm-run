import { commands, ExtensionContext } from "vscode";
import { registerNpmInstall } from "./features/npm-install";
import { readNpmScriptsMain } from "./features/npm-run";
import {
  initPackageJsonScriptsList,
  watchPackageJsonChanges,
} from "./stores/npm-scripts-store";

export const activate = (context: ExtensionContext) => {
  initPackageJsonScriptsList();

  registerNpmInstall(context);

  context.subscriptions.push(watchPackageJsonChanges());

  const runNpmScriptCurrentTerminal = commands.registerCommand(
    "rjz-npm-run.runNpmScriptCurrentTerminal",
    () => readNpmScriptsMain(false),
  );
  context.subscriptions.push(runNpmScriptCurrentTerminal);

  const runNpmScriptNewTerminal = commands.registerCommand(
    "rjz-npm-run.runNpmScriptNewTerminal",
    () => readNpmScriptsMain(true),
  );
  context.subscriptions.push(runNpmScriptNewTerminal);
};
