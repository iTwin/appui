/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import type { API, FileInfo, Options } from "jscodeshift";
import { useExtensions } from "../utils/Extensions";

export default function transformer(file: FileInfo, api: API, options: Options) {
  const j = api.jscodeshift;
  useExtensions(j);

  const root = j(file.source);
  root.rename("@itwin/appui-layout-react:Dialog", "@itwin/appui-react:StatusBarDialog");
  root.rename("@itwin/appui-layout-react:DialogProps", "@itwin/appui-react:StatusBarDialogProps");
  root.rename("@itwin/appui-layout-react:FooterIndicator", "@itwin/appui-react:StatusBarIndicator");
  root.rename("@itwin/appui-layout-react:FooterIndicatorProps", "@itwin/appui-react:StatusBarIndicatorProps");
  root.rename("@itwin/appui-layout-react:FooterSeparator", "@itwin/appui-react:StatusBarSeparator");
  root.rename("@itwin/appui-layout-react:SafeAreaInsets", "@itwin/appui-react:SafeAreaInsets");
  root.rename("@itwin/appui-layout-react:TitleBar", "@itwin/appui-react:StatusBarDialog.TitleBar");
  root.rename("@itwin/appui-layout-react:TitleBarProps", "@itwin/appui-react:StatusBarDialogTitleBarProps");

  root.findImportDeclarations("@itwin/appui-layout-react")
    .removeSpecifier("FooterPopup")
    .removeSpecifier("FooterPopupProps")
    .removeSpecifier("FooterPopupContentType")
    .removeSpecifier("FooterPopupDefaultProps")
    .removeSpecifier("FooterSeparatorProps");

  return root.toSource(options.printOptions);
}
