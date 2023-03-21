/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import type { API, FileInfo, ObjectProperty, Options } from "jscodeshift";

export default function transformer(file: FileInfo, api: API, options: Options) {
  const j = api.jscodeshift;

  const root = j(file.source);

  const widgets = root.findJSXElements("Widget");
  widgets.forEach((path) => {
    const properties: ObjectProperty[] = [];
    path.node.openingElement.attributes?.forEach((attribute) => {
      if (attribute.type !== "JSXAttribute" || !attribute.value)
        return;
      const name = attribute.name.type == "JSXIdentifier" ? attribute.name.name : "";
      const property = j.objectProperty(
        j.identifier(name),
        attribute.value,
      );
      properties.push(property);
    });
    path.replace(j.objectExpression(properties));
  });

  return root.toSource(options.printOptions);
}
