/**
 * types about configuration
 * @author: Ruan Jiazhen
 * @date: 2024-12-01 10:42:35
 **/

export enum ConfigurationSection {
  /** default node version */
  defaultNodeVersion = "defaultNodeVersion",
  /** command in single line when run in active terminal */
  singleLineCommand = "singleLineCommand",
  /** skip nvm when volta detected */
  skipNvmWhenVoltaDetected = "skipNvmWhenVoltaDetected",
}

export enum SingleLineCommandOption {
  /** only in new terminal */
  onlyInNewTerminal = "only in new terminal",
  /** off */
  off = "off",
  /** always use ; */
  alwaysUseSemicolon = "always use ;",
  /** always use && */
  alwaysUseAnd = "always use &&",
}
