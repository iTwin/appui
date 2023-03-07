/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { API, FileInfo } from "jscodeshift";
import abstract from "./abstract";
import layoutReact from "./layout-react";
import react from "./react";
import statusBarItem from "./status-bar-item";
import widgetToConfig from "./widget-to-config";
import widget from "./widget";

const transforms = [
  widgetToConfig,
  layoutReact,
  abstract,
  react,
  statusBarItem,
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
