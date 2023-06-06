/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { API, FileInfo, Options } from "jscodeshift";
import { useExtensions } from "../utils/Extensions";
import { useCallExpression } from "../utils/CallExpression";
import { useObjectExpression } from "../utils/ObjectExpression";

export default function transformer(
  file: FileInfo,
  api: API,
  options: Options
) {
  const j = api.jscodeshift;
  useExtensions(j);
  useObjectExpression(j);
  useCallExpression(j);

  const root = j(file.source);

  const groupItems = root
    .findObjectExpressions("ToolbarActionItem")
    .concat(root.findObjectExpressions("ToolbarGroupItem"))
    .concat(
      root
        .findCallExpressions("ToolbarItemUtilities.createActionItem")
        .getArguments(5, (arg) => arg.type === "ObjectExpression")
    )
    .concat(
      root
        .findCallExpressions("ToolbarItemUtilities.createGroupItem")
        .getArguments(5, (arg) => arg.type === "ObjectExpression")
    );

  const items = root
    .findObjectExpressions("CommonToolbarItem")
    .concat(root.findObjectExpressions("ToolbarItem"))
    .concat(groupItems)
    .concat(root.findObjectExpressions("ToolbarCustomItem"))
    .concat(
      root
        .findCallExpressions("ToolbarItemUtilities.createCustomItem")
        .getArguments(5, (arg) => arg.type === "ObjectExpression")
    );

  items
    .removeProperty("applicationData")
    .removeProperty("internalData")
    .removeProperty("isPressed")
    .renameProperty("badgeType", "badge");

  groupItems.renameProperty("parentToolGroupId", "parentGroupItemId");

  return root.toSource(options.printOptions);
}
