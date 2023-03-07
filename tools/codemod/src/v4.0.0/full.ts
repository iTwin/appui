/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { API, FileInfo } from "jscodeshift";
import abstract from "./abstract";
import layoutReact from "./layout-react";
import react from "./react";
import frontstageToConfig from "./frontstage-to-config";
import widget from "./widget";

const transforms = [
  layoutReact,
  abstract,
  frontstageToConfig,
  react,
  widget,
];

export default function transformer(file: FileInfo, api: API) {
  let src = file.source;
  transforms.forEach((transform) => {
    if (!src)
      return;
    src = transform({ ...file, source: src }, api);
  });

  return src;
}
