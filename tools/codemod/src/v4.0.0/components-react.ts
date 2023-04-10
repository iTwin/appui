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

  root.rename("@itwin/components-react:ToolbarProps", "@itwin/appui-react:ToolbarProps")
  root.rename("@itwin/components-react:Toolbar", "@itwin/appui-react:Toolbar")
  root.rename("@itwin/components-react:CustomToolbarItem", "@itwin/appui-react:ToolbarCustomItem")
  root.rename("@itwin/components-react:ToolbarItem", "@itwin/appui-react:ToolbarItem")
  root.rename("@itwin/components-react:ToolbarWithOverflowProps", "@itwin/appui-react:ToolbarWithOverflowProps")
  root.rename("@itwin/components-react:ToolbarWithOverflow", "@itwin/appui-react:ToolbarWithOverflow")

  return root.toSource(options.printOptions);
}
