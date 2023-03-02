/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { API, FileInfo, ObjectProperty } from "jscodeshift";
import { isJSXAttribute, isJSXIdentifier } from "../utils/typeGuards";

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
