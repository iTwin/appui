const eslintBaseConfig = require("../eslint.config.base");
const prettierConfig = require("eslint-config-prettier");

module.exports = [
  ...eslintBaseConfig,
  {
    files: ["**/*.{ts,tsx}"],
    rules: {
      ...prettierConfig.rules,
    },
  },
];
