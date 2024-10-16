/**
 * @description: Send text to terminal
 * @author: Ruan Jiazhen
 * @date: 2024-10-16 21:17:38
 **/

import { window } from "vscode";

interface SendTextToTerminal {
  /**
   * Send text to terminal
   * @param text The text to send
   * @param runInNewTerminal Whether to run in a new terminal or not
   */
  (text: string, runInNewTerminal?: boolean): void;

  /**
   * Send text list to terminal
   * @param textList The text list to send
   * @param runInNewTerminal Whether to run in a new terminal or not
   */
  (textList: string[], runInNewTerminal?: boolean): void;
}

export const sendTextToTerminal: SendTextToTerminal = (
  text,
  runInNewTerminal = false,
) => {
  const textList = Array.isArray(text) ? text : [text];
  const terminal = runInNewTerminal
    ? window.createTerminal()
    : window.activeTerminal || window.createTerminal();

  for (const line of textList) {
    terminal.sendText(line);
  }
};
