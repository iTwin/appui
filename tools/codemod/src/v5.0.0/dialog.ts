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
  ConditionalExpression,
  LogicalExpression,
  JSXExpressionContainer,
  JSXFragment,
  JSXText,
  ObjectExpression,
} from "jscodeshift";
import { useExtensions } from "../utils/Extensions";
import {
  ChildElement,
  JSXElementCollection,
  useJSXElement,
} from "../utils/JSXElement";
import { JSXAttributeCollection, useJSXAttribute } from "../utils/JSXAttribute";
import { useImportDeclaration } from "../utils/ImportDeclaration";
import { useImportSpecifier } from "../utils/ImportSpecifier";
import { ExpressionKind } from "ast-types/gen/kinds";

export default function transformer(
  file: FileInfo,
  api: API,
  options: Options
) {
  const j = api.jscodeshift;
  useExtensions(j);
  useImportDeclaration(j);
  useImportSpecifier(j);

  const root = j(file.source);
  const coreReactImportDec = root.findImportDeclarations("@itwin/core-react");

  const dialogName = coreReactImportDec.findSpecifiers("Dialog").getLocalName();

  if (dialogName !== "") {
    // TODO: Add import from itwinui
    const dialogTransformer = new DialogTransformer(j);
    root
      .findJSXElements(dialogName)
      .forEach((path) => dialogTransformer.transform(path));
  }

  return root.toSource(options.printOptions);
}

class DialogTransformer {
  private dialog: JSXElementCollection;

  constructor(private j: JSCodeshift) {
    this.j = j;
    useExtensions(j);
    useJSXElement(j);
    useJSXAttribute(j);
  }

  transform(dialogPath: ASTPath<JSXElement>) {
    const j = this.j;
    this.dialog = j(dialogPath) as JSXElementCollection;
    const dialog = this.dialog;

    const isOpenAttribute = dialog
      .getAttribute("opened")
      ?.renameAttribute("isOpen");
    const isResizableAttribute = dialog
      .getAttribute("resizable")
      ?.renameAttribute("isResizable");
    const isDraggableAttribute = dialog
      .getAttribute("movable")
      ?.renameAttribute("isResizable");

    const hideHeaderAttributeValue = dialog
      .getAttribute("hideHeader")
      ?.removeFromParentPath()
      .extractAttributeValue();
    const hideHeaderExpressionNode =
      hideHeaderAttributeValue === null
        ? null
        : hideHeaderAttributeValue?.node();

    const headerAttributeValue = dialog
      .getAttribute("header")
      ?.removeFromParentPath()
      .extractAttributeValue();
    const headerExpressionNode =
      headerAttributeValue === null ? null : headerAttributeValue?.node();

    const titleAttributeNode = dialog
      .getAttribute("title")
      ?.removeFromParentPath()
      .renameAttribute("titleText")
      .node();
    const titleStyleAttributeNode = dialog
      .getAttribute("titleStyle")
      ?.removeFromParentPath()
      .renameAttribute("style")
      .node();
    const titleBarAttributeNodes = this.createAttributeNodes(
      titleAttributeNode,
      titleStyleAttributeNode
    );

    const titleBarExpressionNode = this.createTitleBarExpressionNode(
      hideHeaderExpressionNode,
      headerExpressionNode,
      titleBarAttributeNodes
    );

    const contentClassNameAttributeNode = dialog
      .getAttribute("contentClassName")
      ?.removeFromParentPath()
      .renameAttribute("className")
      .node();
    const contentStyleAttributeNode = dialog
      .getAttribute("contentStyle")
      ?.removeFromParentPath()
      .renameAttribute("style")
      .node();
    const contentAttributeNodes = this.createAttributeNodes(
      contentClassNameAttributeNode,
      contentStyleAttributeNode
    );

    const contentElementNode = this.createInnerDialogElementNode(
      "Content",
      contentAttributeNodes,
      this.dialogChildren
    );

    const footerAttributeValue = dialog
      .getAttribute("footer")
      ?.removeFromParentPath()
      .extractAttributeValue();
    const footerExpressionNode =
      footerAttributeValue === null ? null : footerAttributeValue?.node();

    const footerStyleAttributeNode = dialog
      .getAttribute("footerStyle")
      ?.removeFromParentPath()
      .renameAttribute("style")
      .node();
    const buttonBarAttributeNodes = this.createAttributeNodes(
      footerStyleAttributeNode
    );

    const buttonClusterExpressionNode = dialog
      .getAttribute("buttonCluster")
      ?.removeFromParentPath()
      .extractAttributeValue()
      ?.node();

    const buttonClusterChildren = buttonClusterExpressionNode
      ? [
          this.convertToChildExpression(
            j.callExpression(j.identifier("getFooterButtons"), [
              buttonClusterExpressionNode,
            ])
          ),
        ]
      : undefined;
    // TODO: add getFooterButtons import
    const buttonBarExpressionNode = this.createButtonBarExpressionNode(
      footerExpressionNode,
      buttonBarAttributeNodes,
      buttonClusterChildren
    );

    const widthExpressionNode = dialog
      .getAttribute("width")
      ?.removeFromParentPath()
      .extractAttributeValue()
      ?.node();
    const heightExpressionNode = dialog
      .getAttribute("height")
      ?.removeFromParentPath()
      .extractAttributeValue()
      ?.node();
    const minWidthExpressionNode = dialog
      .getAttribute("minWidth")
      ?.removeFromParentPath()
      .extractAttributeValue()
      ?.node();
    const minHeightExpressionNode = dialog
      .getAttribute("minHeight")
      ?.removeFromParentPath()
      .extractAttributeValue()
      ?.node();
    const maxWidthExpressionNode = dialog
      .getAttribute("maxWidth")
      ?.removeFromParentPath()
      .extractAttributeValue()
      ?.node();
    const maxHeightExpressionNode = dialog
      .getAttribute("maxHeight")
      ?.removeFromParentPath()
      .extractAttributeValue()
      ?.node();

    const mainStyleProperties = this.createPropertyNodes(
      widthExpressionNode &&
        j.objectProperty(j.identifier("width"), widthExpressionNode),
      heightExpressionNode &&
        j.objectProperty(j.identifier("height"), heightExpressionNode),
      minWidthExpressionNode &&
        j.objectProperty(j.identifier("minWidth"), minWidthExpressionNode),
      minHeightExpressionNode &&
        j.objectProperty(j.identifier("minHeight"), minHeightExpressionNode),
      maxWidthExpressionNode &&
        j.objectProperty(j.identifier("maxWidth"), maxWidthExpressionNode),
      maxHeightExpressionNode &&
        j.objectProperty(j.identifier("maxHeight"), maxHeightExpressionNode)
    );

    const mainStyleObjectExpressionNode = mainStyleProperties
      ? j.objectExpression(mainStyleProperties)
      : undefined;
    const mainStyleExpressionNode = mainStyleObjectExpressionNode
      ? this.createAttributeNode(
          "style",
          j.jsxExpressionContainer(mainStyleObjectExpressionNode)
        )
      : undefined;

    const mainAttributeNodes = this.createAttributeNodes(
      mainStyleExpressionNode
    );

    const mainChildren = this.createChildNodes(
      titleBarExpressionNode,
      contentElementNode,
      buttonBarExpressionNode
    );

    const mainElementNode =
      mainAttributeNodes || mainChildren
        ? this.createInnerDialogElementNode(
            "Main",
            mainAttributeNodes,
            mainChildren
          )
        : undefined;

    const onOutsideClickAttributeNode = dialog
      .getAttribute("onOutsideClick")
      ?.removeFromParentPath()
      .node();

    const divWithOutsideClickAttributeNodes = this.createAttributeNodes(
      onOutsideClickAttributeNode
    );
    const divWithOutsideClickChildren = this.createChildNodes(mainElementNode);

    const divWithOutsideClickElementNode = divWithOutsideClickAttributeNodes
      ? this.createInnerDialogElementNode(
          "DivWithOutsideClick",
          divWithOutsideClickAttributeNodes,
          divWithOutsideClickChildren,
          false
        )
      : undefined;

    const modalExpressionNode = dialog
      .getAttribute("modal")
      ?.removeFromParentPath()
      .extractAttributeValue()
      ?.node();

    const backgroundStyleAttributeNode = dialog
      .getAttribute("backgroundStyle")
      ?.removeFromParentPath()
      .renameAttribute("style")
      ?.node();
    const backdropAttributeNodes = this.createAttributeNodes(
      backgroundStyleAttributeNode
    );

    const backdropExpressionNode = this.createBackdropExpressionNode(
      modalExpressionNode,
      backdropAttributeNodes
    );

    // TODO: add z-index of 150000

    const children = this.createChildNodes(
      backdropExpressionNode,
      divWithOutsideClickElementNode || mainElementNode
    );
    if (children) {
      const closingElementName = j.jsxIdentifier(this.dialogName);
      const closingElement = j.jsxClosingElement(closingElementName);

      dialog.node().openingElement.selfClosing = false;
      dialog.node().closingElement = closingElement;
      dialog.node().children = children;
    }
  }

  get dialogName(): string {
    return (this.dialog.node().openingElement.name as JSXIdentifier).name;
  }

  get dialogChildren(): JSXElement["children"] {
    return this.dialog.node().children;
  }

  createAttributeNode(
    name: string,
    value?: Parameters<typeof this.j.jsxAttribute>[1]
  ): JSXAttribute {
    const j = this.j;
    return j.jsxAttribute(j.jsxIdentifier(name), value ?? null);
  }

  createInnerDialogElementNode(
    stringName: string,
    attributes?: JSXElement["attributes"],
    children?: JSXElement["children"],
    useDialogName?: boolean
  ): JSXElement {
    const j = this.j;

    const dialogName = this.dialogName;
    const object = j.jsxIdentifier(dialogName);
    const property = j.jsxIdentifier(stringName);
    const name =
      useDialogName || useDialogName === undefined
        ? j.jsxMemberExpression(object, property)
        : property;

    const selfClosing = children ? false : true;
    const openingElement = j.jsxOpeningElement(
      name,
      attributes ?? [],
      selfClosing
    );
    const closingElement = selfClosing ? null : j.jsxClosingElement(name);

    return j.jsxElement(openingElement, closingElement, children ?? []);
  }

  createLogicalExpressionNode(
    operator: "&&" | "||" | "??",
    left: ExpressionKind | undefined,
    right: ExpressionKind | undefined
  ): ExpressionKind | undefined {
    const j = this.j;
    if (left) {
      if (right) return j.logicalExpression(operator, left, right);
      else return left;
    } else if (right) return right;
    else return undefined;
  }

  convertToChildExpression(expression: ExpressionKind): ChildElement {
    const type = expression.type;
    if (
      type === "JSXExpressionContainer" ||
      type === "JSXElement" ||
      type === "JSXFragment" ||
      type === "JSXText"
    )
      return expression;
    return this.j.jsxExpressionContainer(expression);
  }

  createTitleBarExpressionNode(
    hideHeaderExpression: ExpressionKind | null | undefined,
    headerExpression: ExpressionKind | null | undefined,
    titleBarAttributeNodes: JSXAttribute[] | undefined
  ): ChildElement | undefined {
    const j = this.j;

    let includeHideHeader = hideHeaderExpression !== undefined;
    let includeHeader = headerExpression !== undefined;
    let includeTitleBar = true;
    if (includeHideHeader) {
      switch (hideHeaderExpression?.type) {
        case undefined: {
          // value === null/undefined means hideHeader attribute is implicitly passed as true
          includeHideHeader = false;
          includeHeader = false;
          includeTitleBar = false;
          break;
        }
        case "BooleanLiteral": {
          if (hideHeaderExpression.value === true) {
            includeHideHeader = false;
            includeHeader = false;
            includeTitleBar = false;
          } else includeHideHeader = false;
          break;
        }
      }
    }

    if (includeHeader)
      if (headerExpression!.type === "JSXElement") includeTitleBar = false;

    hideHeaderExpression = includeHideHeader ? hideHeaderExpression : undefined;
    const negatedHideHeaderExpression = hideHeaderExpression
      ? j.unaryExpression("!", hideHeaderExpression)
      : undefined;
    headerExpression = includeHeader ? headerExpression : undefined;

    const titleBarElement = includeTitleBar
      ? this.createInnerDialogElementNode("TitleBar", titleBarAttributeNodes)
      : undefined;

    const headerOrTitleBarExpression = this.createLogicalExpressionNode(
      "||",
      headerExpression ?? undefined,
      titleBarElement
    );
    const finalExpression = this.createLogicalExpressionNode(
      "&&",
      negatedHideHeaderExpression,
      headerOrTitleBarExpression
    );

    return finalExpression
      ? this.convertToChildExpression(finalExpression)
      : undefined;
  }

  createButtonBarExpressionNode(
    footerExpression: ExpressionKind | null | undefined,
    buttonBarAttributeNodes: JSXAttribute[] | undefined,
    buttonBarChildren: JSXElement["children"]
  ): ChildElement | undefined {
    const j = this.j;

    let includeFooter = footerExpression !== undefined;
    let includeButtonBar = true;
    if (includeFooter && footerExpression)
      if (footerExpression.type === "JSXElement") includeButtonBar = false;

    footerExpression = includeFooter ? footerExpression : undefined;

    const buttonBarElement = includeButtonBar
      ? this.createInnerDialogElementNode(
          "ButtonBar",
          buttonBarAttributeNodes,
          buttonBarChildren
        )
      : undefined;

    const finalExpression = this.createLogicalExpressionNode(
      "||",
      footerExpression ?? undefined,
      buttonBarElement
    );

    return finalExpression
      ? this.convertToChildExpression(finalExpression)
      : undefined;
  }

  createBackdropExpressionNode(
    modalExpression: ExpressionKind | null | undefined,
    backdropAttributeNodes: JSXAttribute[] | undefined
  ): ChildElement | undefined {
    const j = this.j;

    let includeModal = modalExpression !== undefined;
    let includeBackdrop = true;
    if (includeModal) {
      switch (modalExpression?.type) {
        case undefined: {
          // value === null/undefined means modal attribute is implicitly passed as true
          includeModal = false;
          break;
        }
        case "BooleanLiteral": {
          if (modalExpression.value === true) includeModal = false;
          else {
            includeModal = false;
            includeBackdrop = false;
          }
          break;
        }
      }
    }

    modalExpression = includeModal ? modalExpression : undefined;

    const backdropElement = includeBackdrop
      ? this.createInnerDialogElementNode("Backdrop", backdropAttributeNodes)
      : undefined;

    const finalExpression = this.createLogicalExpressionNode(
      "&&",
      modalExpression ?? undefined,
      backdropElement
    );

    return finalExpression
      ? this.convertToChildExpression(finalExpression)
      : undefined;
  }

  createAttributeNodes(
    ...attributes: (JSXAttribute | undefined)[]
  ): JSXAttribute[] | undefined {
    const attributeNodes: JSXAttribute[] = [];
    attributes.forEach((attribute) => {
      attribute && attributeNodes.push(attribute);
    });
    return attributeNodes.length > 0 ? attributeNodes : undefined;
  }

  createPropertyNodes(
    ...properties: (ObjectExpression["properties"][number] | undefined)[]
  ): ObjectExpression["properties"] | undefined {
    const propertyNodes: ObjectExpression["properties"] = [];
    properties.forEach((property) => {
      property && propertyNodes.push(property);
    });
    return propertyNodes.length > 0 ? propertyNodes : undefined;
  }

  createChildNodes(
    ...children: (ChildElement | undefined)[]
  ): ChildElement[] | undefined {
    const childNodes: ChildElement[] = [];
    children.forEach((childNodes) => {
      childNodes && children.push(childNodes);
    });
    return childNodes.length > 0 ? childNodes : undefined;
  }
}
