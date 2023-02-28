/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { ASTPath, API, ExpressionStatement, FileInfo, match, JSCodeshift, ObjectProperty, JSXAttribute, JSXIdentifier, JSXExpressionContainer, Property, JSXEmptyExpression, Expression, JSXElement } from "jscodeshift";

const frontstageAttrNames = {
  "key": "",
  "id": "id",
  "version": "version",
  "defaultTool": "",
  "contentGroup": "contentGroup",
  "isInFooterMode": "",
  "usage": "usage",
  "applicationData": "",
  "contentManipulationTools": "contentManipulation",
  "viewNavigationTools": "viewNavigation",
  "toolSettings": "toolSettings",
  "statusBar": "statusBar",
  "leftPanel": "leftPanel",
  "topPanel": "topPanel",
  "rightPanel": "rightPanel",
  "bottomPanel": "bottomPanel"
}

export default function transformer(file: FileInfo, api: API) {
  const j = api.jscodeshift;

  const root = j(file.source);

  const frontstages = root.findJSXElements("Frontstage");
  frontstages.forEach((path) => {
    const properties: ObjectProperty[] = [];
    path.node.openingElement.attributes.forEach((attribute) => {
      if (!isJSXAttribute(j, attribute))
        return;

      const name: string | undefined = isJSXIdentifier(j, attribute.name) ? frontstageAttrNames[attribute.name.name] : "";
      if (!name || name === "")
        return;

      const expressionContainer = j(attribute).find(j.JSXExpressionContainer).get().value;
      let exprVal: any;
      if (isJSXExpressionContainer(j, expressionContainer)) {
        const expression = j(expressionContainer).find(j.Expression).get().value;
        exprVal = isJSXElement(j, expression) ? expressionContainer : expression;
      }
      else {
        exprVal = attribute.value;
      }

      const property = j.objectProperty(
        j.identifier(name),
        exprVal,
      );
      properties.push(property);
    });
    path.replace(j.objectExpression(properties));
  });

  return root.toSource();
}

function isJSXElement(j: JSCodeshift, path: any): path is JSXElement {
  return j(path).isOfType(j.JSXElement);
}

function isJSXEmptyExpression(j: JSCodeshift, path: any): path is JSXEmptyExpression {
  return j(path).isOfType(j.JSXEmptyExpression);
}

function isJSXExpressionContainer(j: JSCodeshift, path: any): path is JSXExpressionContainer {
  return j(path).isOfType(j.JSXExpressionContainer);
}

function isJSXIdentifier(j: JSCodeshift, path: any): path is JSXIdentifier {
  return j(path).isOfType(j.JSXIdentifier);
}

function isJSXAttribute(j: JSCodeshift, path: any): path is JSXAttribute {
  return j(path).isOfType(j.JSXAttribute);
}

