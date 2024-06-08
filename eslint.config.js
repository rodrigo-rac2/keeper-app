import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import prettierConfig from "eslint-config-prettier";

export default [
  { languageOptions: { globals: globals.browser } },
  { settings: { react: { version: "18" } } },
  pluginJs.configs.recommended,
  prettierConfig.configs.recommended,
  pluginReactConfig,
];
