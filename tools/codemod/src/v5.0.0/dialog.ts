/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import {
  FileInfo,
  API,
  Options,
  JSCodeshift,
  JSXElement,
  ASTPath,
  JSXIdentifier,
  JSXAttribute,
  ObjectExpression,
  JSXText,
  JSXMemberExpression,
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
import { FileCollection, useFile } from "../utils/File";
import { ExpressionKind } from "ast-types/gen/kinds";

/* Potential problems:
  - Duplicate identifier imports (like DivWithOutsideClick)
  - Dialog import can not be found due to namespaced import (import * as x from "@itwin/core-react")
*/

export default function transformer(
  file: FileInfo,
  api: API,
  options: Options
) {
  const j = api.jscodeshift;
  useExtensions(j);
  useImportDeclaration(j);
  useImportSpecifier(j);
  useFile(j);

  const root = j(file.source) as FileCollection;
  const coreReactImportDec = root.findImportDeclarations("@itwin/core-react");

  const dialogSpecifier = coreReactImportDec.findSpecifiers("Dialog");

  if (dialogSpecifier.single()) {
    const dialogName = dialogSpecifier.getLocalName();

    root
      .findOrCreateImportDeclaration("@itwin/itwinui-react")
      .addSpecifier(dialogSpecifier.node())
      .sortSpecifiers();
    coreReactImportDec.removeSpecifier("Dialog");

    const dialogTransformer = new DialogTransformer(j);
    root
      .findJSXElements(dialogName)
      .forEach((path) => dialogTransformer.transform(path));
  }

  return root.toSource(options.printOptions);
}

class DialogTransformer {
  constructor(private j: JSCodeshift) {
    this.j = j;
    useExtensions(j);
    useFile(j);
    useJSXElement(j);
    useJSXAttribute(j);
  }

  transform(dialogPath: ASTPath<JSXElement>): void {
    new DialogTransformer.PathTransformer(this, dialogPath).execute();
  }

  private static PathTransformer = class {
    private _root: FileCollection;
    private _dialog: JSXElementCollection;
    private _dialogNameNode: JSXIdentifier | JSXMemberExpression;
    private _initialIndentSize: number;
    private _indentSize: number;

    constructor(
      private superThis: DialogTransformer,
      dialogPath: ASTPath<JSXElement>
    ) {
      const j = superThis.j;
      this._dialog = j(dialogPath) as JSXElementCollection;
      this._root = this._dialog.closest(j.File) as FileCollection;
      this._dialogNameNode = (dialogPath.node.name ??
        j.jsxIdentifier("Dialog")) as JSXIdentifier | JSXMemberExpression;
      this._initialIndentSize = dialogPath.node.loc?.start.column ?? 0;
      this._indentSize = this.calculateIndentationSizeOrReturnDefault();
    }

    private get root(): FileCollection {
      return this._root;
    }
    private get dialog(): JSXElementCollection {
      return this._dialog;
    }
    private get dialogNameNode() {
      return this._dialogNameNode;
    }
    private get initialIndentSize() {
      return this._initialIndentSize;
    }
    private get indentSize() {
      return this._indentSize;
    }

    execute() {
      void this.transformAttributes();
      void this.transformToStyle();

      const titleBarExpression = this.transformToTitleBar();
      const contentElement = this.transformToContent();
      const buttonBarExpression = this.transformToButtonBar();

      const mainElement = this.transformToMain(
        titleBarExpression,
        contentElement,
        buttonBarExpression
      );

      const outsideClickElement = this.transformToOutsideClick(mainElement);
      const backdropExpression = this.transformToBackdrop();

      void this.transformChildren(
        backdropExpression,
        outsideClickElement ?? mainElement
      );
    }

    transformAttributes() {
      const dialog = this.dialog;
      const j = this.superThis.j;
      const t = this.superThis;

      dialog.getAttribute("opened")?.renameAttribute("isOpen");
      dialog.getAttribute("resizable")?.renameAttribute("isResizable");
      dialog.getAttribute("movable")?.renameAttribute("isDraggable");

      const closeOnEscAttributeNode = t.createAttributeNode(
        "closeOnEsc",
        j.jsxExpressionContainer(j.booleanLiteral(false))
      );
      dialog.appendAttributes(
        j(closeOnEscAttributeNode) as JSXAttributeCollection
      );
    }

    transformChildren(
      backdropExpressionNode: ChildElement | undefined,
      mainElementNode: ChildElement | undefined
    ) {
      const dialog = this.dialog;
      const j = this.superThis.j;
      const t = this.superThis;

      const children = t.createChildNodes(
        backdropExpressionNode,
        mainElementNode
      ) ?? [j.jsxText(" ")];
      const closingElementName = this.dialogNameNode;
      const closingElement = j.jsxClosingElement(closingElementName);

      const node = dialog.node();
      node.openingElement.selfClosing = false;
      node.closingElement = closingElement;
      node.children = children;
    }

    transformToTitleBar() {
      const dialog = this.dialog;
      const t = this.superThis;

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
      const titleBarAttributeNodes = t.createAttributeNodes(
        titleAttributeNode,
        titleStyleAttributeNode
      );

      return this.createTitleBarExpressionNode(
        hideHeaderExpressionNode,
        headerExpressionNode,
        titleBarAttributeNodes
      );
    }

    transformToContent() {
      const dialog = this.dialog;
      const j = this.superThis.j;
      const t = this.superThis;

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
      const contentAttributeNodes = t.createAttributeNodes(
        contentClassNameAttributeNode,
        contentStyleAttributeNode
      );
      const dialogChildren = this.dialog.node().children;

      return contentAttributeNodes ||
        (dialogChildren && dialogChildren.length > 0)
        ? this.createInnerDialogElementNode(
            "Content",
            contentAttributeNodes,
            dialogChildren ?? [j.jsxText(" ")]
          )
        : undefined;
    }

    transformToButtonBar() {
      const dialog = this.dialog;
      const j = this.superThis.j;
      const t = this.superThis;

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
      const buttonBarAttributeNodes = t.createAttributeNodes(
        footerStyleAttributeNode
      );

      const buttonClusterExpressionNode = dialog
        .getAttribute("buttonCluster")
        ?.removeFromParentPath()
        .extractAttributeValue()
        ?.node();

      const parseButtonIdentifierNode = j.identifier("parseButtonCluster");
      const buttonClusterChildren = buttonClusterExpressionNode
        ? t.createChildNodes(
            this.convertToChildExpression(
              j.callExpression(parseButtonIdentifierNode, [
                buttonClusterExpressionNode,
              ])
            )
          )
        : undefined;

      if (buttonClusterExpressionNode)
        this.root
          .findOrCreateImportDeclaration("@itwin/core-react")
          .addSpecifier(j.importSpecifier(parseButtonIdentifierNode))
          .sortSpecifiers();

      return this.createButtonBarExpressionNode(
        footerExpressionNode,
        buttonBarAttributeNodes,
        buttonClusterChildren
      );
    }

    transformToMain(
      titleBarExpressionNode: ChildElement | undefined,
      contentElementNode: ChildElement | undefined,
      buttonBarExpressionNode: ChildElement | undefined
    ) {
      const dialog = this.dialog;
      const j = this.superThis.j;
      const t = this.superThis;

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

      const mainStyleProperties = t.createPropertyNodes(
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
        ? t.createAttributeNode(
            "style",
            j.jsxExpressionContainer(mainStyleObjectExpressionNode)
          )
        : undefined;

      const mainAttributeNodes = t.createAttributeNodes(
        mainStyleExpressionNode
      );

      const mainChildren = t.createChildNodes(
        titleBarExpressionNode,
        contentElementNode,
        buttonBarExpressionNode
      );

      return (
        (mainAttributeNodes || mainChildren) &&
        this.createInnerDialogElementNode(
          "Main",
          mainAttributeNodes,
          mainChildren ?? [j.jsxText(" ")]
        )
      );
    }

    transformToOutsideClick(mainElementNode: ChildElement | undefined) {
      const dialog = this.dialog;
      const j = this.superThis.j;
      const t = this.superThis;

      const onOutsideClickAttributeNode = dialog
        .getAttribute("onOutsideClick")
        ?.removeFromParentPath()
        .node();

      const divWithOutsideClickAttributeNodes = t.createAttributeNodes(
        onOutsideClickAttributeNode
      );
      const divWithOutsideClickChildren = t.createChildNodes(mainElementNode);

      const divWithOutsideClickElementNode = divWithOutsideClickAttributeNodes
        ? this.createInnerDialogElementNode(
            "DivWithOutsideClick",
            divWithOutsideClickAttributeNodes,
            divWithOutsideClickChildren,
            false
          )
        : undefined;

      divWithOutsideClickElementNode &&
        this.root
          .findOrCreateImportDeclaration("@itwin/core-react")
          .addSpecifier(j.importSpecifier(j.identifier("DivWithOutsideClick")))
          .sortSpecifiers();

      return divWithOutsideClickElementNode;
    }

    transformToBackdrop() {
      const dialog = this.dialog;
      const j = this.superThis.j;
      const t = this.superThis;

      const modalExpressionNode = dialog
        .getAttribute("modal")
        ?.removeFromParentPath()
        .extractAttributeValue()
        ?.node();

      const preventDocumentScrollAttributeNode = t.createAttributeNode(
        "preventDocumentScroll",
        modalExpressionNode
          ? j.jsxExpressionContainer(modalExpressionNode)
          : j.jsxExpressionContainer(j.booleanLiteral(true))
      );
      dialog.appendAttributes(
        j(preventDocumentScrollAttributeNode) as JSXAttributeCollection
      );

      const backgroundStyleAttributeNode = dialog
        .getAttribute("backgroundStyle")
        ?.removeFromParentPath()
        .renameAttribute("style")
        ?.node();
      const backdropAttributeNodes = t.createAttributeNodes(
        backgroundStyleAttributeNode
      );

      return this.createBackdropExpressionNode(
        modalExpressionNode,
        backdropAttributeNodes
      );
    }

    transformToStyle() {
      const dialog = this.dialog;
      const j = this.superThis.j;
      const t = this.superThis;

      let styleAttribute = dialog.getAttribute("style");
      if (!styleAttribute) {
        const newStyleAttributeNode = t.createAttributeNode(
          "style",
          j.jsxExpressionContainer(j.objectExpression([]))
        );
        const newStyleAttributePath = new j.types.NodePath(
          newStyleAttributeNode,
          dialog.navigatePath("attributes").path()
        );
        styleAttribute = j(newStyleAttributePath) as JSXAttributeCollection;
        dialog.appendAttributes(styleAttribute);
      }
      const styleValueExpression = styleAttribute.extractAttributeValue();
      const styleExpressionNode = styleValueExpression?.node();
      if (styleExpressionNode) {
        const zIndexValue = j.literal("var(--uicore-z-index-dialog)");

        if (styleExpressionNode.type === "ObjectExpression") {
          const zIndexProperty = styleExpressionNode.properties.find((prop) => {
            if (prop.type !== "Property" && prop.type !== "ObjectProperty")
              return false;
            if (prop.key.type !== "Identifier") return false;
            return prop.key.name === "zIndex";
          });
          if (!zIndexProperty) {
            styleExpressionNode.properties.unshift(
              j.property("init", j.identifier("zIndex"), zIndexValue)
            );
          }
        } else {
          const newStyleValue = j.objectExpression([
            j.property("init", j.identifier("zIndex"), zIndexValue),
            j.spreadElement(styleExpressionNode),
          ]);
          styleValueExpression!.path().replace(newStyleValue);
        }
      }
    }

    calculateIndentationSizeOrReturnDefault(): number {
      const node = this.dialog.node();
      const indentStart = node.loc?.start.column ?? 0;
      const indentEnd = node.attributes?.[0].loc?.start.column ?? 0;
      const indentSize = indentEnd - indentStart;
      const defaultIndentSize = 2;
      return indentSize > 0 ? indentSize : defaultIndentSize;
    }

    createInnerDialogElementNode(
      elementName: string,
      attributes?: JSXElement["attributes"],
      children?: JSXElement["children"],
      useDialogName: boolean = true
    ): JSXElement {
      const j = this.superThis.j;

      const object = this.dialogNameNode;
      const property = j.jsxIdentifier(elementName);
      const name = useDialogName
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
      const j = this.superThis.j;

      if (left) {
        if (right) return j.logicalExpression(operator, left, right);
        else return left;
      } else if (right) return right;
      else return undefined;
    }

    convertToChildExpression(expression: ExpressionKind): ChildElement {
      const j = this.superThis.j;
      const type = expression.type;
      if (
        type === "JSXExpressionContainer" ||
        type === "JSXElement" ||
        type === "JSXFragment" ||
        type === "JSXText"
      )
        return expression;
      return j.jsxExpressionContainer(expression);
    }

    createTitleBarExpressionNode(
      hideHeaderExpression: ExpressionKind | null | undefined,
      headerExpression: ExpressionKind | null | undefined,
      titleBarAttributeNodes: JSXAttribute[] | undefined
    ): ChildElement | undefined {
      const j = this.superThis.j;

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

      hideHeaderExpression = includeHideHeader
        ? hideHeaderExpression
        : undefined;
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
      const j = this.superThis.j;

      let includeFooter = footerExpression !== undefined;
      let includeButtonBar =
        buttonBarAttributeNodes !== undefined ||
        buttonBarChildren !== undefined;
      if (includeFooter && footerExpression)
        if (footerExpression.type === "JSXElement") includeButtonBar = false;

      footerExpression = includeFooter ? footerExpression : undefined;

      const buttonBarElement = includeButtonBar
        ? this.createInnerDialogElementNode(
            "ButtonBar",
            buttonBarAttributeNodes,
            buttonBarChildren ?? [j.jsxText(" ")]
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
      const j = this.superThis.j;

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
  };

  createNewLineJSXTextNode() {
    return this.j.jsxText("\n", "\n");
  }

  createAttributeNode(
    name: string,
    value?: JSXAttribute["value"]
  ): JSXAttribute {
    const j = this.j;
    return j.jsxAttribute(j.jsxIdentifier(name), value);
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
    children.forEach((childNode) => {
      if (childNode) {
        childNodes.push(this.createNewLineJSXTextNode());
        childNodes.push(childNode);
      }
    });

    if (childNodes.length === 0) return undefined;

    childNodes.push(this.createNewLineJSXTextNode());
    return childNodes;
  }
}