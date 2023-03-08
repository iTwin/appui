/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { API, FileInfo, ObjectExpression } from "jscodeshift";
import { useExtensions } from "../utils/Extensions";
import { useCallExpression } from "../utils/CallExpression";
import { useObjectExpression } from "../utils/ObjectExpression";
import { isObjectExpression } from "../utils/typeGuards";

export default function transformer(file: FileInfo, api: API) {
  const j = api.jscodeshift;
  useExtensions(j);
  useObjectExpression(j);
  useCallExpression(j);

  const root = j(file.source);

  const items = root.findObjectExpressions("CommonToolbarItem")
    .concat(root.findObjectExpressions("ToolbarItem"))
    .concat(root.findObjectExpressions("ToolbarActionItem"))
    .concat(root.findObjectExpressions("ToolbarGroupItem"))
    .concat(root.findObjectExpressions("ToolbarCustomItem"))
    .concat(root.findCallExpressions("ToolbarItemUtilities.createActionItem").map<ObjectExpression>((path) => {
      const overrides = path.value.arguments[5];
      if (!isObjectExpression(j, overrides))
        return undefined;

      return j(overrides).paths();
    }))
    .concat(root.findCallExpressions("ToolbarItemUtilities.createGroupItem").map<ObjectExpression>((path) => {
      const overrides = path.value.arguments[5];
      if (!isObjectExpression(j, overrides))
        return undefined;

      return j(overrides).paths();
    }))
    .concat(root.findCallExpressions("ToolbarItemUtilities.createCustomItem").map<ObjectExpression>((path) => {
      const overrides = path.value.arguments[5];
      if (!isObjectExpression(j, overrides))
        return undefined;

      return j(overrides).paths();
    }));

  items
    .removeProperty("applicationData")
    .removeProperty("internalData")
    .removeProperty("isPressed");

  return root.toSource();
}
