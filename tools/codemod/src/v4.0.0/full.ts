/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import type { API, FileInfo, Options } from "jscodeshift";
import postcss, { AcceptedPlugin, Plugin } from "postcss";
import valueParser from "postcss-value-parser";
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

function renameValue(from: string, to: string): Plugin {
  return {
    postcssPlugin: `rename-value ${from} to ${to}`,
    Declaration(decl) {
      const parsed = valueParser(decl.value);
      parsed.walk((node) => {
        if (node.value === from)
          node.value = to;
        if (node.value === `#{${from}}`)
          node.value = to;
        if (node.value === `#{${from}`)
          node.value = `#{${to}`;
        if (node.value === `${from}}`)
          node.value = `${to}}`;
      });
      decl.value = parsed.toString();
    }
  };
}

export const cssPlugin: AcceptedPlugin = postcss([
  renameValue("$uicore-xxs", "var(--iui-size-3xs)"),
  renameValue("$uicore-xs", "var(--iui-size-2xs)"),
  renameValue("$uicore-s", "var(--iui-size-xs)"),
  renameValue("$uicore-sm", "var(--iui-size-s)"),
  renameValue("$uicore-m", "var(--iui-size-m)"),
  renameValue("$uicore-l", "var(--iui-size-l)"),
  renameValue("$uicore-xl", "var(--iui-size-xl)"),
  renameValue("$uicore-xxl", "var(--iui-size-2xl)"),
  renameValue("$uicore-3xl", "var(--iui-size-3xl)"),
  renameValue("$uicore-speed-fast", "var(--iui-duration-1)"),
  renameValue("$uicore-speed", "var(--iui-duration-2)"),
  renameValue("$uicore-speed-slow", "var(--iui-duration-3)"),
  renameValue("$uicore-sans", "var(--iui-font-sans)"),
  renameValue("$uicore-monospace", "var(--iui-font-mono)"),
  renameValue("$uicore-font-family", "var(--iui-font-sans)"),
  renameValue("$uicore-font-size", "var(--iui-font-size-1)"),
  renameValue("$uicore-font-size-small", "var(--iui-font-size-0)"),
  renameValue("$uicore-font-size-leading", "var(--iui-font-size-2)"),
  renameValue("$uicore-font-size-subheading", "var(--iui-font-size-3)"),
  renameValue("$uicore-font-size-title", "var(--iui-font-size-4)"),
  renameValue("$uicore-font-size-headline", "var(--iui-font-size-5)"),
  renameValue("$uicore-cap-size", "var(--iui-font-size-1)"),
  renameValue("$uicore-cap-size-small", "var(--iui-font-size-0)"),
  renameValue("$uicore-cap-size-leading", "var(--iui-font-size-2)"),
  renameValue("$uicore-cap-size-subheading", "var(--iui-font-size-3)"),
  renameValue("$uicore-cap-size-title", "var(--iui-font-size-4)"),
  renameValue("$uicore-cap-size-headline", "var(--iui-font-size-5)"),
  renameValue("$uicore-font-weight-light", "var(--iui-font-weight-light)"),
  renameValue("$uicore-font-weight-normal", "var(--iui-font-weight-normal)"),
  renameValue("$uicore-font-weight-semibold", "var(--iui-font-weight-semibold)"),
  renameValue("$uicore-font-weight-bold", "var(--iui-font-weight-bold)"),
  renameValue("$uicore-font-loaded-class", "var(--iui-font-sans)"),
  renameValue("$uicore-border-radius", "var(--iui-border-radius-1)"),
  renameValue("$uicore-component-height-small", "24px"),
  renameValue("$uicore-component-height-normal", "28px"),
  renameValue("$uicore-component-height-large", "32px"),
  {
    postcssPlugin: `replace @mixin uicore-font-family`,
    AtRule(rule) {
      if (rule.name !== "include")
        return;
      if (rule.params !== "uicore-font-family")
        return;
      const declaration = postcss.decl({
        prop: "font-family",
        value: "var(--iui-font-sans)",
      });
      rule.replaceWith(declaration);
    }
  },
]);
