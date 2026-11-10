const js = require("@eslint/js");
const globals = require("globals");

module.exports = [
  { ignores: ["node_modules"] },
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: 2022,
      globals: { ...globals.node },
      sourceType: "commonjs",
    },
    rules: {
      ...js.configs.recommended.rules,
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
      "no-empty": ["error", { allowEmptyCatch: true }],
      "no-console": "off",
    },
  },
];
