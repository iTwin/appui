/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { API, FileInfo } from "jscodeshift";
import { useExtensions } from "../utils/Extensions";
import { useObjectExpression } from "../utils/objectExpression";

export default function transformer(file: FileInfo, api: API) {
  const j = api.jscodeshift;
  useExtensions(j);
  useObjectExpression(j);

  const root = j(file.source);

  const items = root.findObjectExpressions("CommonToolbarItem")
    .concat(root.findObjectExpressions("ToolbarItem"))
    .concat(root.findObjectExpressions("ToolbarActionItem"))
    .concat(root.findObjectExpressions("ToolbarGroupItem"))
    .concat(root.findObjectExpressions("ToolbarCustomItem"));

  items
    .removeProperty("applicationData")
    .removeProperty("internalData")
    .removeProperty("isPressed");

  return root.toSource();
}
