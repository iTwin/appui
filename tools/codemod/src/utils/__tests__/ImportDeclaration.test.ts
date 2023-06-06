/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { useImportDeclaration } from "../ImportDeclaration";
import { createDefineInlineCollectionTest } from "../TestUtils";

const defineInlineTest = createDefineInlineCollectionTest((j) => {
  useImportDeclaration(j);
});

describe("ImportDeclaration", () => {
  describe("removeSpecifier", () => {
    defineInlineTest(
      (_, root) => {
        root.findImportDeclarations("@itwin/from").removeSpecifier("a");
      },
      `
      import { a, b } from "@itwin/from";
      `,
      `
      import { b } from "@itwin/from";
      `,
      `should remove specifier`
    );

    defineInlineTest(
      (_, root) => {
        root
          .findImportDeclarations("@itwin/from")
          .removeSpecifier("b")
          .removeSpecifier("c");
      },
      `
      import { a, b, c } from "@itwin/from";
      `,
      `
      import { a } from "@itwin/from";
      `,
      `should remove multiple specifiers`
    );

    defineInlineTest(
      (_, root) => {
        root.findImportDeclarations("@itwin/from").removeSpecifier("a");
      },
      `
      import { a } from "@itwin/from";
      import { b } from "test";
      `,
      `
      import { b } from "test";
      `,
      `should remove declaration`
    );

    defineInlineTest(
      (_, root) => {
        root.findImportDeclarations("@itwin/from").removeSpecifier("a");
      },
      `
      /** @copyright */
      import { a } from "@itwin/from";
      x;
      `,
      `
      /** @copyright */
      x;
      `,
      `should retain first comment`
    );

    defineInlineTest(
      (_, root) => {
        root
          .findImportDeclarations("@itwin/from")
          .removeSpecifier("a")
          .removeSpecifier("b");
      },
      `
      import { a } from "@itwin/from";
      import { x } from "test";
      `,
      `
      import { x } from "test";
      `,
      `should not fail if declaration is removed`
    );

    defineInlineTest(
      (_, root) => {
        root.findImportDeclarations("@itwin/from").removeSpecifier("a");
      },
      `
      x;
      `,
      `
      x;
      `,
      `should not fail if declaration is not found`
    );
  });
});
