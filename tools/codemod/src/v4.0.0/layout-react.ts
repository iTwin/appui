/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { API, FileInfo } from "jscodeshift";
import changeImports from "../utils/changeImports";

const importChanges = new Map<string, string>([
  ["@itwin/appui-layout-react.Dialog", "@itwin/appui-react.StatusBarDialog"],
  ["@itwin/appui-layout-react.DialogProps", "@itwin/appui-react.StatusBarDialogProps"],
  ["@itwin/appui-layout-react.FooterIndicator", "@itwin/appui-react.StatusBarIndicator"],
  ["@itwin/appui-layout-react.FooterIndicatorProps", "@itwin/appui-react.StatusBarIndicatorProps"],
  ["@itwin/appui-layout-react.FooterSeparator", "@itwin/appui-react.StatusBarSeparator"],
  ["@itwin/appui-layout-react.SafeAreaInsets", "@itwin/appui-react.SafeAreaInsets"],
  // ["@itwin/appui-layout-react.TitleBar", "@itwin/appui-react.StatusBarDialog.TitleBar"],
  // ["@itwin/appui-layout-react.TitleBarProps", "@itwin/appui-react.StatusBarDialogTitleBarProps"],
]);

export default function transformer(file: FileInfo, api: API) {
  const j = api.jscodeshift;

  const root = j(file.source);

  changeImports(j, root, importChanges);

  return root.toSource();
}
