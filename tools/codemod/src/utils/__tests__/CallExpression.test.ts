/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { API, Collection, FileInfo, JSCodeshift } from "jscodeshift";
import { applyTransform } from "jscodeshift/src/testUtils";
import { useCallExpression } from "../CallExpression";
import { tsxModule } from "../testUtils";

function testCallExpression(source: string, transform: (j: JSCodeshift, root: Collection) => void) {
  return applyTransform(
    tsxModule((file: FileInfo, api: API) => {
      const j = api.jscodeshift;
      useCallExpression(j);

      const root = j(file.source);
      transform(j, root);
      return root.toSource({
        lineTerminator: "\n",
      });
    }),
    {},
    { source },
  );
}

describe("CallExpression", () => {
  describe("findCallExpressions", () => {
    it("should find call expression with 1 identifier", () => {
      testCallExpression(
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
      testCallExpression(
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
      testCallExpression(
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
      testCallExpression(
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
      testCallExpression(
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
});
