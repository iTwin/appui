/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { API, FileInfo, ObjectExpression } from "jscodeshift";
import { useCallExpression } from "../utils/CallExpression";
import { useExtensions } from "../utils/Extensions";
import { useObjectExpression } from "../utils/objectExpression";
import { isObjectExpression } from "../utils/typeGuards";

export default function transformer(file: FileInfo, api: API) {
  const j = api.jscodeshift;
  useExtensions(j);
  useCallExpression(j);
  useObjectExpression(j);

  const root = j(file.source);
  const createActionItemOverrides = root.findCallExpressions("StatusBarItemUtilities.createActionItem")
    .map<ObjectExpression>((path) => {
      const overrides = path.value.arguments[6];
      if (!isObjectExpression(j, overrides))
        return undefined;

      return j(overrides).paths();
    });
  const createLabelItemOverrides = root.findCallExpressions("StatusBarItemUtilities.createLabelItem")
    .map<ObjectExpression>((path) => {
      const overrides = path.value.arguments[6];
      if (!isObjectExpression(j, overrides))
        return undefined;

      return j(overrides).paths();
    });
  const createCustomItemOverrides = root.findCallExpressions("StatusBarItemUtilities.createCustomItem")
    .map<ObjectExpression>((path) => {
      const overrides = path.value.arguments[4];
      if (!isObjectExpression(j, overrides))
        return undefined;

      return j(overrides).paths();
    });

  const items = root.findObjectExpressions("StatusBarItem");
  const actionItems = root.findObjectExpressions("StatusBarActionItem");
  const labelItems = root.findObjectExpressions("StatusBarLabelItem");
  const customItems = root.findObjectExpressions("StatusBarCustomItem");

  const allCustomItems = customItems
    .concat(createCustomItemOverrides);

  const allItems = items
    .concat(actionItems)
    .concat(labelItems)
    .concat(createActionItemOverrides)
    .concat(createLabelItemOverrides)
    .concat(allCustomItems);

  allItems.renameProperty("badgeType", "badge");
  allCustomItems.renameProperty("reactNode", "content");

  return root.toSource();
}
