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

  const items = root
    .findObjectExpressions("CommonBackstageItem")
    .concat(root.findObjectExpressions("BackstageItem"))
    .concat(root.findObjectExpressions("BackstageActionItem"))
    .concat(root.findObjectExpressions("BackstageStageLauncher"))
    .concat(
      root
        .findCallExpressions("BackstageItemUtilities.createStageLauncher")
        .getArguments(6, (arg) => arg.type === "ObjectExpression")
    )
    .concat(
      root
        .findCallExpressions("BackstageItemUtilities.createActionItem")
        .getArguments(7, (arg) => arg.type === "ObjectExpression")
    );

  items
    .removeProperty("applicationData")
    .removeProperty("internalData")
    .renameProperty("badgeType", "badge");

  return root.toSource(options.printOptions);
}
