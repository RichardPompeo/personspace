/* eslint-env node */
const { FlatCompat } = require("@eslint/eslintrc");
// const path = require("node:path"); // Removed unused import

const compat = new FlatCompat({
  baseDirectory: __dirname,
  resolvePluginsRelativeTo: __dirname,
  recommendedConfig: require("@eslint/js").configs.recommended,
});

module.exports = [
  ...compat.extends("custom"),
  {
    ignores: ["**/dist/**", "**/build/**", "**/node_modules/**"],
  },
  {
    files: [
      "**/postcss.config.js",
      "**/eslint.config.js",
      "**/eslint-config-custom/index.js",
    ],
    languageOptions: {
      globals: {
        module: "writable",
        require: "readonly",
        __dirname: "readonly",
        process: "readonly",
        console: "readonly",
        Buffer: "readonly",
        global: "readonly",
      },
    },
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
];
