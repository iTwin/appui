/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import {
  Collection,
  JSCodeshift,
  JSXElement,
  JSXText,
  JSXSpreadChild,
  JSXExpressionContainer,
  JSXFragment,
} from "jscodeshift";
import { JSXAttributeCollection } from "./JSXAttribute";
import { usePlugin } from "./usePlugin";
import { useExtensions } from "./Extensions";

declare module "jscodeshift/src/collection" {
  interface Collection<N> extends GlobalMethods {}
}

interface GlobalMethods {
  //findJSXElements(name?: string): JSXElementCollection;
}

export type JSXElementCollection = Collection<JSXElement> & JSXElementMethods;

export type ChildElement =
  | JSXExpressionContainer
  | JSXElement
  | JSXFragment
  | JSXText
  | JSXSpreadChild;

interface JSXElementMethods {
  getAttribute(name: string): JSXAttributeCollection | undefined;
  appendAttributes(attributes: JSXAttributeCollection): void;
}

function jsxElementPlugin(j: JSCodeshift) {
  useExtensions(j);

  const globalMethods: GlobalMethods = {};
  const methods: JSXElementMethods = {
    getAttribute(this: JSXElementCollection, name) {
      const attributes = this.navigatePath("openingElement", "attributes");
      return attributes
        .findInChildren(j.JSXAttribute, { name: { name: name } })
        .nonEmpty() as JSXAttributeCollection | undefined;
    },
    appendAttributes(this: JSXElementCollection, attributes) {
      const attributesPath = this.navigatePath(
        "openingElement",
        "attributes"
      ).path();
      if (attributesPath.value === null) attributesPath.value = [];
      if (Array.isArray(attributesPath.value))
        attributesPath.value.unshift(...attributes.nodes());
      else throw new Error("Could not append attributes");
    },
  };

  j.registerMethods(globalMethods);
  j.registerMethods(methods, j.JSXElement);
}

export function useJSXElement(j: JSCodeshift) {
  usePlugin(j, jsxElementPlugin);
}
