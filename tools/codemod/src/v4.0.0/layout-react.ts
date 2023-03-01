/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { API, FileInfo } from "jscodeshift";
import changeImports from "../utils/changeImports";

const importChanges = new Map<string, string>([
  ["@itwin/appui-layout-react.SafeAreaInsets", "@itwin/appui-react.SafeAreaInsets"],
  ["@itwin/appui-layout-react.Dialog", "@itwin/appui-react.StatusBarDialog"],
]);

export default function transformer(file: FileInfo, api: API) {
  const j = api.jscodeshift;

  const root = j(file.source);

  changeImports(j, root, importChanges);

  return root.toSource();
}
