/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { useImportSpecifier } from "../ImportSpecifier";
import { createApplyCollectionTransform } from "../TestUtils";

const applyTransform = createApplyCollectionTransform((j) => {
  useImportSpecifier(j);
});

describe("ImportSpecifier", () => {
  describe("getLocalName", () => {
    it("should use imported name", () => {
      applyTransform(
        `
        import { a } from "x";
        `,
        (_, root) => {
          const specifiers = root.findSpecifiers("a");
          expect(specifiers.getLocalName()).toBe("a");
        }
      );
    });

    it("should use local name", () => {
      applyTransform(
        `
        import { a as b } from "x";
        `,
        (_, root) => {
          const specifiers = root.findSpecifiers("a");
          expect(specifiers.getLocalName()).toBe("b");
        }
      );
    });

    it("should fall back to `identifier` property if `local` is not set", () => {
      applyTransform(
        `
        import { a } from "x";
        `,
        (_, root) => {
          const specifiers = root.findSpecifiers("a");
          specifiers.forEach((path) => {
            // Parser sets `local` property, while builder does not.
            expect(path.value.local).toBeTruthy();
            path.value.local = undefined;
          });
          expect(specifiers.getLocalName()).toBe("a");
        }
      );
    });
  });

  describe("isUsed", () => {
    it("should return 'true' if identifier is found", () => {
      applyTransform(
        `
        import { a } from "x";
        a;
        `,
        (_, root) => {
          const specifiers = root.findSpecifiers("a");
          expect(specifiers.isUsed()).toBe(true);
        }
      );
    });

    it("should return 'false' if identifier is not found", () => {
      applyTransform(
        `
        import { a } from "x";
        a;
        `,
        (_, root) => {
          const specifiers = root.findSpecifiers("a");
          expect(specifiers.isUsed()).toBe(true);
        }
      );
    });

    it("should check root identifier", () => {
      applyTransform(
        `
        import { a } from "x";
        x.a;
        `,
        (_, root) => {
          const specifiers = root.findSpecifiers("a");
          expect(specifiers.isUsed()).toBe(false);
        }
      );
    });

    it("should check root identifier", () => {
      applyTransform(
        `
        import { a } from "x";
        x.a;
        `,
        (_, root) => {
          const specifiers = root.findSpecifiers("a");
          expect(specifiers.isUsed()).toBe(false);
        }
      );
    });

    it("should use local name", () => {
      applyTransform(
        `
        import { a as b } from "x";
        a;
        `,
        (_, root) => {
          const specifiers = root.findSpecifiers("a");
          expect(specifiers.isUsed()).toBe(false);
        }
      );
    });

    it("should use local name (found)", () => {
      applyTransform(
        `
        import { a as b } from "x";
        b;
        `,
        (_, root) => {
          const specifiers = root.findSpecifiers("a");
          expect(specifiers.isUsed()).toBe(true);
        }
      );
    });
  });
});
