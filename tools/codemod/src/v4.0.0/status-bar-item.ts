/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { API, FileInfo, ObjectExpression } from "jscodeshift";
import { registerCallExpression } from "../utils/CallExpression";
import { findObjects } from "../utils/objectExpression";
import { renameProperty } from "../utils/objectProperty";
import { isObjectExpression } from "../utils/typeGuards";

export default function transformer(file: FileInfo, api: API) {
  const j = api.jscodeshift;
  registerCallExpression(j);

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

  const items = findObjects(j, root, "StatusBarItem");
  const actionItems = findObjects(j, root, "StatusBarActionItem");
  const labelItems = findObjects(j, root, "StatusBarLabelItem");
  const customItems = findObjects(j, root, "StatusBarCustomItem");

  const allCustomItems = j([
    ...customItems.paths(),
    ...createCustomItemOverrides.paths(),
  ]);
  const allItems = j([
    ...items.paths(),
    ...actionItems.paths(),
    ...labelItems.paths(),
    ...createActionItemOverrides.paths(),
    ...createLabelItemOverrides.paths(),
    ...allCustomItems.paths(),
  ]);

  allItems.find(j.ObjectProperty).forEach((path) => {
    renameProperty(j, path, "badgeType", "badge")
  });
  allCustomItems.find(j.ObjectProperty).forEach((path) => {
    renameProperty(j, path, "reactNode", "content")
  });
  return root.toSource();
}
