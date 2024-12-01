import { workspace } from "vscode";
import { ConfigurationSection } from "../constants/enums/configuration";

export const getPowerfulNpmRunConfiguration = (
  section: ConfigurationSection,
) => {
  return workspace.getConfiguration("powerful-npm-run").get(section);
};
