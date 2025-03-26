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

// @ts-ignore
export const getPowerfulNpmRunConfiguration: GetPowerfulNpmRunConfiguration = (
  section,
) => {
  return workspace.getConfiguration("powerful-npm-run").get(section);
};
