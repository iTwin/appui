module.exports = [
  {
    files: ["**/*.{ts,tsx}"],
    rules: {
      "@typescript-eslint/ban-ts-comment": [
        "error",
        {
          "ts-ignore": "allow-with-description",
        },
      ],
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          args: "after-used",
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
      "no-duplicate-imports": "off",
    },
  },
  {
    files: ["**/test/**/*.{ts,tsx}"],
    rules: {
      "@itwin/no-internal-barrel-imports": "off",
    },
  },
];
