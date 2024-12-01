import { commands, ExtensionContext } from "vscode";
import { npmInstall } from "./features/npm-install";
import { readNpmScriptsMain } from "./features/npm-run";
import {
  initPackageJsonScriptsList,
  watchPackageJsonChanges,
} from "./stores/npm-scripts-store";

export async function activate(context: ExtensionContext) {
  initPackageJsonScriptsList();

  npmInstall(context);

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
}

export function deactivate() {}
