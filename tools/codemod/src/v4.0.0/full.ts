/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import type { API, FileInfo, Options } from "jscodeshift";
import abstract from "./abstract";
import backstageItem from "./backstage-item";
import componentsReact from "./components-react";
import frontstageToConfig from "./element-to-config";
import layoutReact from "./layout-react";
import react from "./react";
import statics from "./statics";
import statusBarItem from "./status-bar-item";
import toolbarItem from "./toolbar-item";
import uiItemsProvider from "./ui-items-provider";
import widget from "./widget";

const transforms = [
  layoutReact,
  abstract,
  componentsReact,
  frontstageToConfig,
  react,
  statusBarItem,
  toolbarItem,
  backstageItem,
  uiItemsProvider,
  widget,
  statics,
];

export default function transformer(file: FileInfo, api: API, options: Options) {
  let src = file.source;
  transforms.forEach((transform) => {
    if (!src)
      return;
    src = transform({ ...file, source: src }, api, options);
  });

  return src;
}
