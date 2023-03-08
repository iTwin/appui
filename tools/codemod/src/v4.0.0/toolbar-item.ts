/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { API, FileInfo } from "jscodeshift";
import { useExtensions } from "../utils/Extensions";
import { objectExpressionFilter, useCallExpression } from "../utils/CallExpression";
import { useObjectExpression } from "../utils/ObjectExpression";

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
    .concat(root.findCallExpressions("ToolbarItemUtilities.createActionItem").getArguments(5, objectExpressionFilter(j)))
    .concat(root.findCallExpressions("ToolbarItemUtilities.createGroupItem").getArguments(5, objectExpressionFilter(j)))
    .concat(root.findCallExpressions("ToolbarItemUtilities.createCustomItem").getArguments(5, objectExpressionFilter(j)));

  items
    .removeProperty("applicationData")
    .removeProperty("internalData")
    .removeProperty("isPressed");

  return root.toSource();
}
