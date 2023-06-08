require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  plugins: ["@itwin"],
  extends: ["plugin:@itwin/itwinjs-recommended", "prettier"],
  parserOptions: {
    project: ["tsconfig.json", "tsconfig.backend.json"],
    tsconfigRootDir: __dirname,
  },
  rules: {
    "nonblock-statement-body-position": "off",
    "max-statements-per-line": "off",
    "@typescript-eslint/naming-convention": [
      "warn",
      {
        selector: "function",
        format: ["camelCase", "PascalCase"],
      },
    ],
    "@typescript-eslint/unbound-method": "off",
  },
};
