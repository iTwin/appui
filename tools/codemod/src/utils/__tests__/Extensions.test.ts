/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { createApplyCollectionTransform, createDefineInlineCollectionTest } from "../testUtils";
import { useExtensions } from "../Extensions";

const applyTransform = createApplyCollectionTransform((j) => {
  useExtensions(j);
});

const defineInlineTest = createDefineInlineCollectionTest((j) => {
  useExtensions(j);
});

describe("Extensions", () => {
  describe("concat", () => {
    it("should maintain collection type", () => {
      applyTransform(
        `A;`,
        (j, root) => {
          const expressions1 = root.find(j.CallExpression);
          const expressions2 = root.find(j.CallExpression);
          const expressions = expressions1.concat(expressions2);
          expect(expressions.size()).toBe(0);
          expect(expressions.getTypes()).toContain("CallExpression");
        },
      );
    });
  });

  describe("rename", () => {
    defineInlineTest(
      (_, root) => {
        root.rename("a", "b");
      },
      `a();`,
      `b();`,
      `should rename call expression`
    );

    defineInlineTest(
      (_, root) => {
        root.rename("@itwin/from.a.x", "@itwin/from.a.y");
      },
      `a.x;`,
      `a.y;`,
      "should rename member expression"
    );

    defineInlineTest(
      (_, root) => {
        root.rename("@itwin/from.a", "@itwin/from.b");
      },
      `
      a;
      `,
      `
      b;
      `,
      "should rename identifier"
    );

    defineInlineTest(
      (_, root) => {
        root.rename("@itwin/from.a", "@itwin/from.b");
      },
      `
      a.y;
      `,
      `
      b.y;
      `,
      "should rename root identifiers"
    );

    defineInlineTest(
      (_, root) => {
        root.rename("@itwin/from.a", "@itwin/from.b");
      },
      `
      x.a;
      `,
      `
      x.a;
      `,
      "should not rename nested identifiers"
    );

    defineInlineTest(
      (_, root) => {
        root.rename("@itwin/from.a", "@itwin/from.b");
      },
      `
      import { a } from "@itwin/from";
      `,
      `
      import { b } from "@itwin/from";
      `,
      `should rename a specifier`
    );

    defineInlineTest(
      (_, root) => {
        root.rename("@itwin/from.a", "@itwin/to.b");
      },
      `
      import { a } from "@itwin/from";
      `,
      `
      import { b } from "@itwin/to";
      `,
      `should rename a declaration`
    );

    defineInlineTest(
      (_, root) => {
        root.rename("@itwin/from.b", "@itwin/to.b");
      },
      `
      import { b } from "@itwin/from";
      import { a } from "@itwin/to";
      `,
      `
      import { a, b } from "@itwin/to";
      `,
      `should merge declarations`
    );

    defineInlineTest(
      (_, root) => {
        root.rename("@itwin/from.aa", "@itwin/to.bc");
        root.rename("@itwin/from.ab", "@itwin/to.ba");
        root.rename("@itwin/from.ac", "@itwin/to.bb");
      },
      `
      import { aa, ab, ac } from "@itwin/from";
      `,
      `
      import { ba, bb, bc } from "@itwin/to";
      `,
      `should sort moved specifiers`,
    );

    defineInlineTest(
      (_, root) => {
        root.rename("@itwin/from.a", "@itwin/to.b");
      },
      `
      import { a } from "@itwin/from";
      import { b } from "@itwin/to";
      `,
      `
      import { b } from "@itwin/to";
      `,
      "should not add duplicate specifiers to existing declaration"
    );

    defineInlineTest(
      (_, root) => {
        root.rename("@itwin/from.a", "@itwin/to.a");
      },
      `
      import { a, c } from "@itwin/from";
      `,
      `
      import { c } from "@itwin/from";
      import { a } from "@itwin/to";
      `,
      "should remove changed specifier"
    );

    defineInlineTest(
      (_, root) => {
        root.rename("@itwin/from.a", "@itwin/to.a");
      },
      `
      import { a, c } from "@itwin/from";
      `,
      `
      import { c } from "@itwin/from";
      import { a } from "@itwin/to";
      `,
      "should remove changed specifier"
    );
  });
});
