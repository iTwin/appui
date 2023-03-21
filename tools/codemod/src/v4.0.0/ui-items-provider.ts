/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import type { API, FileInfo, Options } from "jscodeshift";
import { isIdentifier } from "../utils/typeGuards";

export default function transformer(file: FileInfo, api: API, options: Options) {
  const j = api.jscodeshift;

  const root = j(file.source);

  root.find(j.ClassMethod).forEach((path) => {
    const key = path.value.key;
    if (isIdentifier(key) && key.name === "provideToolbarButtonItems") {
      key.name = "provideToolbarItems";
    }
  });

  return root.toSource(options.printOptions);
}
