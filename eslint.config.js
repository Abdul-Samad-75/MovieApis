import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: {
      globals: {
        ...globals.node, // Include Node.js globals like `process`
      },
      ecmaVersion: 2021, // Specify ECMAScript version
      sourceType: "module", // Use ES Modules
    },
  },
  pluginJs.configs.recommended,
];
