/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import {
  FileInfo,
  API,
  Options,
  JSCodeshift,
  Collection,
  JSXElement,
  ASTPath,
  JSXIdentifier,
  JSXAttribute,
} from "jscodeshift";
import { useExtensions } from "../utils/Extensions";
import { useImportDeclaration } from "../utils/ImportDeclaration";
import { useImportSpecifier } from "../utils/ImportSpecifier";

export default function transformer(
  file: FileInfo,
  api: API,
  options: Options
) {
  const j = api.jscodeshift;
  useImportDeclaration(j);
  useImportSpecifier(j);
  useExtensions(j);

  const root = j(file.source);
  const coreReactImportDec = root.findImportDeclarations("@itwin/core-react");

  const dialogName = coreReactImportDec.findSpecifiers("Dialog").getLocalName();

  if (dialogName !== "") {
    const dialogTransformer = new DialogTransformer(j);
    root
      .findJSXElements(dialogName)
      .forEach((path) => dialogTransformer.transform(path));
  }

  return root.toSource(options.printOptions);
}

class DialogTransformer {
  private dialog: Collection<JSXElement>;

  constructor(private j: JSCodeshift) {
    this.j = j;
    useExtensions(j);
  }

  transform(dialogPath: ASTPath<JSXElement>) {
    const j = this.j;
    this.dialog = j(dialogPath);
    const dialog = this.dialog;

    const dialogName = this.getDialogName();

    const openedAttribute = this.getAttribute(
      dialog,
      "opened"
    )?.removeFromParentPath();
    if (openedAttribute) {
      const isOpenedAttributeValue = openedAttribute.node().value;
      const isOpenedAttribute = this.createAttribute(
        "isOpened",
        isOpenedAttributeValue
      );
      this.appendAttributes(dialog, isOpenedAttribute);
    }
  }

  getDialogName(): string {
    return (this.dialog.node().openingElement.name as JSXIdentifier).name;
  }

  getAttribute(
    element: Collection<JSXElement>,
    name: string
  ): Collection<JSXAttribute> | undefined {
    const j = this.j;
    const attributes = element.navigatePath("openingElement", "attributes");
    return attributes
      .findInChildren(j.JSXAttribute, { name: { name: name } })
      .nonEmpty();
  }

  createAttribute(
    name: string,
    value?: Parameters<typeof this.j.jsxAttribute>[1]
  ): Collection<JSXAttribute> {
    const j = this.j;
    const attribute = j.jsxAttribute(j.jsxIdentifier(name), value ?? null);
    return j(attribute);
  }

  appendAttributes(
    element: Collection<JSXElement>,
    attributes: Collection<JSXAttribute>
  ) {
    const attributesPath = element
      .navigatePath("openingElement", "attributes")
      .path();
    if (!Array.isArray(attributesPath.value)) attributesPath.value = [];
    attributesPath.value.unshift(...attributes.nodes());
  }
}
