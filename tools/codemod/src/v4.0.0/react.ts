/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { API, FileInfo } from "jscodeshift";
import changeImports from "../utils/changeImports";

const importChanges = new Map<string, string>([
  ["@itwin/appui-react.CommonWidgetProps", "@itwin/appui-react.Widget"],
  ["@itwin/appui-react.WidgetProps", "@itwin/appui-react.Widget"],
]);

export default function transformer(file: FileInfo, api: API) {
  const j = api.jscodeshift;

  const root = j(file.source);

  changeImports(j, root, importChanges);

  return root.toSource();
}
