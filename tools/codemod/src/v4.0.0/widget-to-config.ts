/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { ASTPath, API, ExpressionStatement, FileInfo, match, JSCodeshift, ObjectProperty, JSXAttribute, JSXIdentifier } from "jscodeshift";

export default function transformer(file: FileInfo, api: API) {
  const j = api.jscodeshift;

  const root = j(file.source);

  const widgets = root.findJSXElements("Widget");
  widgets.forEach((path) => {
    const properties: ObjectProperty[] = [];
    path.node.openingElement.attributes.forEach((attribute) => {
      if (!isJSXAttribute(j, attribute))
        return;
      const name = isJSXIdentifier(j, attribute.name) ? attribute.name.name : "";
      const property = j.objectProperty(
        j.identifier(name),
        attribute.value,
      );
      properties.push(property);
    });
    path.replace(j.objectExpression(properties));
  });

  return root.toSource();
}

function isExpressionsStatement(j: JSCodeshift, path: any): path is ASTPath<ExpressionStatement> {
  return j(path).isOfType(j.ExpressionStatement);
}

function isJSXIdentifier(j: JSCodeshift, path: any): path is JSXIdentifier {
  return j(path).isOfType(j.JSXIdentifier);
}

function isJSXAttribute(j: JSCodeshift, path: any): path is JSXAttribute {
  return j(path).isOfType(j.JSXAttribute);
}
