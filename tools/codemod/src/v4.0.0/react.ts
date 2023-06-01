/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { API, FileInfo, Options } from "jscodeshift";
import { useExtensions } from "../utils/Extensions";

export default function transformer(
  file: FileInfo,
  api: API,
  options: Options
) {
  const j = api.jscodeshift;
  useExtensions(j);

  const root = j(file.source);

  root.rename(
    "@itwin/appui-react:CommonWidgetProps",
    "@itwin/appui-react:Widget"
  );
  root.rename("@itwin/appui-react:WidgetProps", "@itwin/appui-react:Widget");

  return root.toSource(options.printOptions);
}
