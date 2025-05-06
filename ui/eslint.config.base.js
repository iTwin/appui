/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

/**
 * Do not import packages directly in this file or it will cause issue
 * with resolutions (either CI or VSCode)
 * packages like "eslint-config-prettier" and "@itwin/eslint-plugin" MUST be imported within
 * each packages eslint.config.js files. (Unless significant changes occurs in either workflow)
 **/
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
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/unbound-method": "off",
    },
  },
  {
    files: ["**/test/**/*.{ts,tsx}"],
    rules: {
      "@itwin/no-internal-barrel-imports": "off",
    },
  },
];
