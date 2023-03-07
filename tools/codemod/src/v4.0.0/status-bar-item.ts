/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { API, FileInfo } from "jscodeshift";
import { findObjects } from "../utils/objectExpression";
import { renameProperty } from "../utils/objectProperty";

export default function transformer(file: FileInfo, api: API) {
  const j = api.jscodeshift;
  const root = j(file.source);

  const items = findObjects(j, root, "StatusBarItem");
  const customItems = findObjects(j, root, "StatusBarCustomItem");
  items.find(j.ObjectProperty).forEach((path) => {
    renameProperty(j, path, "badgeType", "badge")
  });
  customItems.find(j.ObjectProperty).forEach((path) => {
    renameProperty(j, path, "reactNode", "content")
  });
  return root.toSource();
}
