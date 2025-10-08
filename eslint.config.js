const { FlatCompat } = require("@eslint/eslintrc");
const path = require("node:path");

const compat = new FlatCompat({
  baseDirectory: __dirname,
  resolvePluginsRelativeTo: __dirname,
});

module.exports = [
  ...compat.extends("custom"),
  {
    ignores: ["**/dist/**", "**/build/**", "**/.next/**", "**/node_modules/**"],
  },
];
