/**
 * run command in single line
 * @author: Ruan Jiazhen
 * @date: 2024-12-22 21:24:25
 **/

import { Terminal, window } from "vscode";
import {
  ConfigurationSection,
  SingleLineCommandOption,
} from "../constants/enums/configuration";
import { getPowerfulNpmRunConfiguration } from "./get-powerful-npm-run-configuration";
import { isDefaultTerminalTypeCmd } from "./is-default-terminal-type-cmd";

type Params = {
  /**
   * text list for terminal.sendText
   */
  textList: string | string[];
  /**
   * default configuration is used if not specified
   */
  separator?: string;
  /**
   * terminal for send text, default is vscode.window.createTerminal()
   */
  terminal?: Terminal;
};

/**
 *  send text in single line
 * @description:
 * if separator is not specified, it will use the configuration in "Single Line Command"
 * @param {Params} params
 */
export const sendTextInSingleLine = async ({
  textList,
  separator,
  terminal,
}: Params) => {
  const separatorMap = {
    [SingleLineCommandOption.onlyInNewTerminal]: isDefaultTerminalTypeCmd()
      ? "&&"
      : ";",
    [SingleLineCommandOption.off]: "\n",
    [SingleLineCommandOption.alwaysUseAnd]: "&&",
    [SingleLineCommandOption.alwaysUseSemicolon]: ";",
  };

  const normalizedParams = {
    textList: typeof textList === "string" ? [textList] : textList,
    separator:
      separator ??
      separatorMap[
        getPowerfulNpmRunConfiguration(ConfigurationSection.singleLineCommand)
      ],
    terminal: terminal ?? window.createTerminal(),
  };

  normalizedParams.terminal.show();
  normalizedParams.terminal.sendText(
    normalizedParams.textList.join(normalizedParams.separator),
  );
};
