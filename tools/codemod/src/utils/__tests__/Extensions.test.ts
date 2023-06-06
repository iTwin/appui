/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import {
  createApplyCollectionTransform,
  createDefineInlineCollectionTest,
} from "../TestUtils";
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
      applyTransform(`A;`, (j, root) => {
        const expressions1 = root.find(j.CallExpression);
        const expressions2 = root.find(j.CallExpression);
        const expressions = expressions1.concat(expressions2);
        expect(expressions.size()).toBe(0);
        expect(expressions.getTypes()).toContain("CallExpression");
      });
    });
  });

  describe("rename", () => {
    defineInlineTest(
      (_, root) => {
        root.rename("@itwin/from:a", "@itwin/to:b");
      },
      `
      import { a } from "@itwin/from";
      a();
      `,
      `
      import { b } from "@itwin/to";
      b();
      `,
      `should rename call expression`
    );

    defineInlineTest(
      (_, root) => {
        root.rename("@itwin/from:a.x", "@itwin/to:a.y");
      },
      `
      import { a } from "@itwin/from";
      a.x;
      `,
      `
      import { a } from "@itwin/to";
      a.y;
      `,
      "should rename member expression"
    );

    defineInlineTest(
      (_, root) => {
        root.rename("@itwin/from:a", "@itwin/to:b");
      },
      `
      import { a } from "@itwin/from";
      a;
      `,
      `
      import { b } from "@itwin/to";
      b;
      `,
      "should rename identifier"
    );

    defineInlineTest(
      (_, root) => {
        root.rename("@itwin/from:a", "@itwin/to:b");
      },
      `
      import { a } from "@itwin/from";
      a.y;
      `,
      `
      import { b } from "@itwin/to";
      b.y;
      `,
      "should rename root identifiers"
    );

    defineInlineTest(
      (_, root) => {
        root.rename("@itwin/from:a", "@itwin/from:b");
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
        root.rename("@itwin/from:a", "@itwin/from:b");
      },
      `
      import { a } from "@itwin/from";
      a;
      `,
      `
      import { b } from "@itwin/from";
      b;
      `,
      `should rename a specifier`
    );

    defineInlineTest(
      (_, root) => {
        root.rename("@itwin/from:a", "@itwin/to:b");
      },
      `
      import { a } from "@itwin/from";
      a;
      `,
      `
      import { b } from "@itwin/to";
      b;
      `,
      `should rename a declaration`
    );

    defineInlineTest(
      (_, root) => {
        root.rename("@itwin/from:b", "@itwin/to:b");
      },
      `
      import { b } from "@itwin/from";
      import { a } from "@itwin/to";
      b;
      `,
      `
      import { a, b } from "@itwin/to";
      b;
      `,
      `should merge declarations`
    );

    defineInlineTest(
      (_, root) => {
        root.rename("@itwin/from:aa", "@itwin/to:bc");
        root.rename("@itwin/from:ab", "@itwin/to:ba");
        root.rename("@itwin/from:ac", "@itwin/to:bb");
      },
      `
      import { aa, ab, ac } from "@itwin/from";
      aa;
      ab;
      ac;
      `,
      `
      import { ba, bb, bc } from "@itwin/to";
      bc;
      ba;
      bb;
      `,
      `should sort moved specifiers`
    );

    defineInlineTest(
      (_, root) => {
        root.rename("@itwin/from:a", "@itwin/to:b");
      },
      `
      import { a } from "@itwin/from";
      import { b } from "@itwin/to";
      a;
      `,
      `
      import { b } from "@itwin/to";
      b;
      `,
      "should not add duplicate specifiers to existing declaration"
    );

    defineInlineTest(
      (_, root) => {
        root.rename("@itwin/from:a", "@itwin/to:a");
      },
      `
      import { a, c } from "@itwin/from";
      a;
      `,
      `
      import { c } from "@itwin/from";
      import { a } from "@itwin/to";
      a;
      `,
      "should remove changed specifier"
    );

    defineInlineTest(
      (_, root) => {
        root.rename("@itwin/from:a", "@itwin/to:b");
      },
      `
      import { c } from "@itwin/to";
      c;
      `,
      `
      import { c } from "@itwin/to";
      c;
      `,
      "should not update specifiers if nothing to rename"
    );

    defineInlineTest(
      (_, root) => {
        root.rename("@itwin/from:a", "@itwin/to:b");
      },
      `
      /** @copyright */
      import { a } from "@itwin/from";
      a;
      `,
      `
      /** @copyright */
      import { b } from "@itwin/to";
      b;
      `,
      "should retain first comment"
    );

    defineInlineTest(
      (_, root) => {
        root.rename("@itwin/from:a.x", "@itwin/to:b.y");
      },
      `
      import { a as c } from "@itwin/from";
      c.x;
      `,
      `
      import { b } from "@itwin/to";
      b.y;
      `,
      "should update renamed specifier"
    );

    defineInlineTest(
      (_, root) => {
        root.rename("@itwin/from:a.x", "@itwin/to:b.y");
      },
      `
      import { a } from "@itwin/from";
      a.x;
      a.z;
      `,
      `
      import { a } from "@itwin/from";
      import { b } from "@itwin/to";
      b.y;
      a.z;
      `,
      "should not remove used specifiers"
    );

    defineInlineTest(
      (_, root) => {
        root.rename("@itwin/from:TestId", '@itwin/to:Test["id"]');
      },
      `
      import { TestId } from "@itwin/from";
      const x: TestId = "";
      `,
      `
      import { Test } from "@itwin/to";
      const x: Test["id"] = "";
      `,
      "should change to indexed access type"
    );

    defineInlineTest(
      (_, root) => {
        root.rename("@itwin/from:A", "@itwin/to:B");
      },
      `
      import { A } from "@itwin/from";
      <A value="x" />
      `,
      `
      import { B } from "@itwin/to";
      <B value="x" />
      `,
      "should change component name in JSX"
    );

    defineInlineTest(
      (_, root) => {
        root.rename("@itwin/from:A", "@itwin/to:B.C");
      },
      `
      import { A } from "@itwin/from";
      <A />
      `,
      `
      import { B } from "@itwin/to";
      <B.C />
      `,
      "should change to property access in JSX"
    );

    defineInlineTest(
      (_, root) => {
        root.rename("@itwin/from:a", "@itwin/to:b");
      },
      `
      import { a, b, c } from "@itwin/from";
      c;
      `,
      `
      import { b, c } from "@itwin/from";
      c;
      `,
      "should remove unused source specifier"
    );

    defineInlineTest(
      (_, root) => {
        root.rename("@itwin/from:a.x", "@itwin/from:a.y");
      },
      `
      import { a } from "@itwin/from";
      a;
      `,
      `
      import { a } from "@itwin/from";
      a;
      `,
      "should not update if expression is not matched"
    );

    defineInlineTest(
      (_, root) => {
        root.rename("@itwin/from:a", "@itwin/to:b");
        root.rename("@itwin/to:b", "@itwin/to:c");
      },
      `
      import { a } from "@itwin/from";
      a;
      `,
      `
      import { c } from "@itwin/to";
      c;
      `,
      "should rename multiple times"
    );

    defineInlineTest(
      (_, root) => {
        root.rename("@itwin/from:a", "@itwin/to:b");
      },
      `
      import { a } from "@itwin/x";
      a;
      `,
      `
      import { a } from "@itwin/x";
      a;
      `,
      "should not modify specifiers of other modules"
    );

    defineInlineTest(
      (_, root) => {
        root.rename("@itwin/x:a", "@itwin/y:b.c.d");
        root.rename("@itwin/y:b.e", "@itwin/y:b.f");
      },
      `
      import { a } from "@itwin/x";
      a;
      `,
      `
      import { b } from "@itwin/y";
      b.c.d;
      `,
      "should not remove specifier (nested member expression)"
    );
  });
});
