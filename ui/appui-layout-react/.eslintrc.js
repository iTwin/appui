require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  extends: ["../.eslintrc.base.js", "prettier"],
  parserOptions: { tsconfigRootDir: __dirname },
};
