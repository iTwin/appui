/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { API, Collection, FileInfo, JSCodeshift, ObjectProperty } from "jscodeshift";
import { isIdentifier, isJSXAttribute, isJSXIdentifier } from "../utils/typeGuards";

function findWidgets(j: JSCodeshift, root: Collection) {
  return
}

export default function transformer(file: FileInfo, api: API) {
  const j = api.jscodeshift;
  const root = j(file.source);

  // Determine Widget objects.
  const widgets = root.find(j.ObjectExpression).filter((path) => {
    const typeIdentifier = j(path).closest(j.VariableDeclarator).find(j.TSTypeReference).find(j.Identifier).paths()[0];
    if (typeIdentifier?.value.name === "Widget") {
      return true;
    }
    return false;
  });
  const properties = widgets.find(j.ObjectProperty);

  // getWidgetContent
  properties.forEach((path) => {
    const key = path.value.key;
    if (!isIdentifier(j, key) || key.name !== "getWidgetContent")
      return;

    key.name = "content";

    const functionExpression = j(path).find(j.ArrowFunctionExpression);
    const element = functionExpression.find(j.JSXElement).nodes()[0];
    if (!element)
      return;
    functionExpression.at(0).replaceWith(element);
  });

  // badgeType
  properties.forEach((path) => {
    const key = path.value.key;
    if (!isIdentifier(j, key) || key.name !== "badgeType")
      return;

    key.name = "badge";
  });

  return root.toSource();
}
