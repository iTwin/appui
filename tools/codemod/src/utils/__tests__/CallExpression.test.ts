/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { toExpressionName, useCallExpression } from "../CallExpression";
import { createApplyCollectionTransform, createDefineInlineCollectionTest } from "../TestUtils";

const applyTransform = createApplyCollectionTransform((j) => {
  useCallExpression(j);
});

const defineInlineTest = createDefineInlineCollectionTest((j) => {
  useCallExpression(j);
});

describe("CallExpression", () => {
  describe("toExpressionName", () => {
    it("member expressions", () => {
      applyTransform(
        `x.y.z;`,
        (j, root) => {
          expect(toExpressionName(root.find(j.MemberExpression, { property: { name: "y" } }).nodes()[0])).toBe("x.y");
          expect(toExpressionName(root.find(j.MemberExpression, { property: { name: "z" } }).nodes()[0])).toBe("x.y.z");
          expect(toExpressionName(root.find(j.Identifier, { name: "x" }).nodes()[0])).toBe("x");
          expect(toExpressionName(root.find(j.Identifier, { name: "y" }).nodes()[0])).toBe("y");
          expect(toExpressionName(root.find(j.Identifier, { name: "z" }).nodes()[0])).toBe("z");
        }
      );
    });
  });

  describe("findCallExpressions", () => {
    it("should find call expression with 1 identifier", () => {
      applyTransform(
        `
        A();
        B();
        `,
        (_, root) => {
          const expressions = root.findCallExpressions("A");
          expect(expressions.size()).toBe(1);
          expect(expressions.getTypes()).toContain("CallExpression");
        },
      );
    });

    it("should find call expression with 2 identifiers", () => {
      applyTransform(
        `
        A.x();
        A();
        `,
        (_, root) => {
          const expressions = root.findCallExpressions("A.x");
          expect(expressions.size()).toBe(1);
          expect(expressions.getTypes()).toContain("CallExpression");
        },
      );
    });

    it("should find call expression with 3 identifiers", () => {
      applyTransform(
        `
        A.x.y();
        A.x();
        A();
        `,
        (_, root) => {
          const expressions = root.findCallExpressions("A.x.y");
          expect(expressions.size()).toBe(1);
          expect(expressions.getTypes()).toContain("CallExpression");
        },
      );
    });

    it("should find multiple call expressions", () => {
      applyTransform(
        `
        A.x();
        B.x();
        () => A.x();
        `,
        (_, root) => {
          const expressions = root.findCallExpressions("A.x");
          expect(expressions.size()).toBe(2);
          expect(expressions.getTypes()).toContain("CallExpression");
        },
      );
    });

    it("should contain `CallExpression` type in empty collection", () => {
      applyTransform(
        `
        B.x();
        `,
        (_, root) => {
          const expressions = root.findCallExpressions("A.x");
          expect(expressions.size()).toBe(0);
          expect(expressions.getTypes()).toContain("CallExpression");
        },
      );
    });
  });

  describe("renameTo", () => {
    defineInlineTest(
      (_, root) => {
        const expressions = root.findCallExpressions("A");
        expressions.renameTo("B");
      },
      `A();`,
      `B();`,
      "should rename call expression"
    );

    defineInlineTest(
      (_, root) => {
        const expressions = root.findCallExpressions("A.x");
        expressions.renameTo("B.x");
      },
      `A.x();`,
      `B.x();`,
      "should rename call expression w/ member expression"
    );
  });
});
