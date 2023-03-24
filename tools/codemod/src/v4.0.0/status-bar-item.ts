/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import type { API, FileInfo, Options } from "jscodeshift";
import { useCallExpression } from "../utils/CallExpression";
import { useExtensions } from "../utils/Extensions";
import { useObjectExpression } from "../utils/ObjectExpression";

export default function transformer(file: FileInfo, api: API, options: Options) {
  const j = api.jscodeshift;
  useExtensions(j);
  useCallExpression(j);
  useObjectExpression(j);

  const root = j(file.source);

  const customItems = root.findObjectExpressions("StatusBarCustomItem")
    .concat(root.findCallExpressions("StatusBarItemUtilities.createCustomItem").getArguments(4, (arg) => arg.type === "ObjectExpression"));

  const items = root.findObjectExpressions("StatusBarItem")
    .concat(root.findObjectExpressions("StatusBarActionItem"))
    .concat(root.findObjectExpressions("StatusBarLabelItem"))
    .concat(root.findCallExpressions("StatusBarItemUtilities.createActionItem").getArguments(6, (arg) => arg.type === "ObjectExpression"))
    .concat(root.findCallExpressions("StatusBarItemUtilities.createLabelItem").getArguments(6, (arg) => arg.type === "ObjectExpression"))
    .concat(customItems);

  items.renameProperty("badgeType", "badge");
  customItems.renameProperty("reactNode", "content");

  return root.toSource(options.printOptions);
}
