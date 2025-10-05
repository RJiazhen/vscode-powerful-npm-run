import { workspace } from "vscode";
import {
  ConfigurationSection,
  SingleLineCommandOption,
} from "../constants/enums/configuration";

interface GetPowerfulNpmRunConfiguration {
  (section: ConfigurationSection.defaultNodeVersion): string;
  (section: ConfigurationSection.singleLineCommand): SingleLineCommandOption;
  (section: ConfigurationSection.skipNvmWhenVoltaDetected): boolean;
}

/**
 * get powerful npm run configuration
 */
// @ts-ignore
export const getPowerfulNpmRunConfiguration: GetPowerfulNpmRunConfiguration = (
  /**
   * section of powerful npm run configuration
   */
  section,
) => {
  return workspace.getConfiguration("powerful-npm-run").get(section);
};
