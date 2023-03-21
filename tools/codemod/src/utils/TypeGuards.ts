/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import type { ASTNode, JSXAttribute, JSXElement } from "jscodeshift";

export function isSpecifiedJSXElement(node: ASTNode, name: string): node is JSXElement {
  return node.type === "JSXElement" && node.openingElement.name.type === "JSXIdentifier" && node.openingElement.name.name === name;
}

export function isSpecifiedJSXAttribute(node: ASTNode, name: string): node is JSXAttribute {
  return node.type === "JSXAttribute" && node.name.type === "JSXIdentifier" && node.name.name === name;
}
