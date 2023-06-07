require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  plugins: ["@itwin"],
  extends: ["plugin:@itwin/ui", "prettier"],
  parserOptions: { tsconfigRootDir: __dirname },
};
