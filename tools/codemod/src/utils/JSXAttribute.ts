/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { ASTNode, Collection, JSCodeshift, JSXAttribute } from "jscodeshift";
import { usePlugin } from "./usePlugin";
import { useExtensions } from "./Extensions";

declare module "jscodeshift/src/collection" {
  interface Collection<N> extends GlobalMethods {}
}

interface GlobalMethods {
  findJSXAttributes(name?: string): JSXAttributeCollection;
}

export type JSXAttributeCollection = Collection<JSXAttribute> &
  JSXAttributeMethods;

export type AttributeValue = Exclude<JSXAttribute["value"], null | undefined>;

export interface JSXAttributeMethods {
  renameAttribute(newName: string): this;
  extractAttributeValue(): Collection<AttributeValue> | null;
}

function jsxAttributePlugin(j: JSCodeshift) {
  useExtensions(j);

  const globalMethods: GlobalMethods = {
    findJSXAttributes(this: Collection, name) {
      return this.find(j.JSXAttribute).map((path) => {
        const typeIdentifier = j(path)
          .closest(j.VariableDeclarator)
          .find(j.TSTypeReference)
          .find(j.Identifier)
          .paths()[0];
        if (typeIdentifier?.value?.name === name) {
          return path;
        }
        return undefined;
      }, j.JSXAttribute) as JSXAttributeCollection;
    },
  };
  const methods: JSXAttributeMethods = {
    renameAttribute(this: JSXAttributeCollection, newName) {
      return this.forEach(
        (path) => (path.node.name = j.jsxIdentifier(newName))
      ) as JSXAttributeCollection;
    },
    extractAttributeValue(this: JSXAttributeCollection) {
      const path = this.path();

      const attributeValue = path.node.value;
      if (attributeValue === null) return null;

      if (attributeValue === undefined) throw new Error("Invalid path");

      if (attributeValue.type === "JSXExpressionContainer")
        return j(path).navigatePath("value", "expression");

      return j(path).navigatePath("value", "expression");
    },
  };

  j.registerMethods(globalMethods);
  j.registerMethods(methods, j.JSXAttribute);
}

export function useJSXAttribute(j: JSCodeshift) {
  usePlugin(j, jsxAttributePlugin);
}
