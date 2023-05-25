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

function removeImport(importParam: string): Plugin {
  return {
    postcssPlugin: `remove-import ${importParam}`,
    AtRule(rule) {
      if (rule.name !== "import")
        return;
      const noQuotes = rule.params.slice(1, -1);
      if (noQuotes !== importParam)
        return;
      rule.remove();
    }
  };
}

function toModulePaths(getPath: (module: string) => string) {
  return ["cjs", "esm"].map((module) => getPath(module));
}

const importPathsToRemove = [
  ...toModulePaths((module) => `~@itwin/core-react/lib/${module}/core-react/button/blue-large`),
  ...toModulePaths((module) => `~@itwin/core-react/lib/${module}/core-react/button/blue`),
  ...toModulePaths((module) => `~@itwin/core-react/lib/${module}/core-react/button/button`),
  ...toModulePaths((module) => `~@itwin/core-react/lib/${module}/core-react/button/disabled-large`),
  ...toModulePaths((module) => `~@itwin/core-react/lib/${module}/core-react/button/disabled`),
  ...toModulePaths((module) => `~@itwin/core-react/lib/${module}/core-react/button/hollow-large`),
  ...toModulePaths((module) => `~@itwin/core-react/lib/${module}/core-react/button/hollow`),
  ...toModulePaths((module) => `~@itwin/core-react/lib/${module}/core-react/button`),
  ...toModulePaths((module) => `~@itwin/core-react/lib/${module}/core-react/button/primary-large`),
  ...toModulePaths((module) => `~@itwin/core-react/lib/${module}/core-react/button/primary`),
  ...toModulePaths((module) => `~@itwin/core-react/lib/${module}/core-react/button/variables`),
  ...toModulePaths((module) => `~@itwin/core-react/lib/${module}/core-react/checkbox/checkbox`),
  ...toModulePaths((module) => `~@itwin/core-react/lib/${module}/core-react/inputs/labeled-input`),
  ...toModulePaths((module) => `~@itwin/core-react/lib/${module}/core-react/inputs/labeled-textarea`),
  ...toModulePaths((module) => `~@itwin/core-react/lib/${module}/core-react/inputs/textarea`),
  ...toModulePaths((module) => `~@itwin/core-react/lib/${module}/core-react/progress-indicators`),
  ...toModulePaths((module) => `~@itwin/core-react/lib/${module}/core-react/progress-indicators/progress-bar`),
  ...toModulePaths((module) => `~@itwin/core-react/lib/${module}/core-react/progress-indicators/progress-spinner`),
  ...toModulePaths((module) => `~@itwin/core-react/lib/${module}/core-react/radio`),
  ...toModulePaths((module) => `~@itwin/core-react/lib/${module}/core-react/radio/radio`),
  ...toModulePaths((module) => `~@itwin/core-react/lib/${module}/core-react/select`),
  ...toModulePaths((module) => `~@itwin/core-react/lib/${module}/core-react/select/labeled-select`),
  ...toModulePaths((module) => `~@itwin/core-react/lib/${module}/core-react/select/labeled-themed-select`),
  ...toModulePaths((module) => `~@itwin/core-react/lib/${module}/core-react/select/select`),
  ...toModulePaths((module) => `~@itwin/core-react/lib/${module}/core-react/select/themed-select`),
  ...toModulePaths((module) => `~@itwin/core-react/lib/${module}/core-react/select`),
  ...toModulePaths((module) => `~@itwin/core-react/lib/${module}/core-react/style/data-viz`),
  ...toModulePaths((module) => `~@itwin/core-react/lib/${module}/core-react/style/itwinui-overrides`),
  ...toModulePaths((module) => `~@itwin/core-react/lib/${module}/core-react/style/space`),
  ...toModulePaths((module) => `~@itwin/core-react/lib/${module}/core-react/style/speed`),
  ...toModulePaths((module) => `~@itwin/core-react/lib/${module}/core-react/style/typography`),
  ...toModulePaths((module) => `~@itwin/core-react/lib/${module}/core-react/style/variables`),
  ...toModulePaths((module) => `~@itwin/core-react/lib/${module}/core-react/tabs/horizontal`),
  ...toModulePaths((module) => `~@itwin/core-react/lib/${module}/core-react/text/headline`),
  ...toModulePaths((module) => `~@itwin/core-react/lib/${module}/core-react/text/headline-2`),
  ...toModulePaths((module) => `~@itwin/core-react/lib/${module}/core-react/text/leading`),
  ...toModulePaths((module) => `~@itwin/core-react/lib/${module}/core-react/text/small`),
  ...toModulePaths((module) => `~@itwin/core-react/lib/${module}/core-react/text/subheading-2`),
  ...toModulePaths((module) => `~@itwin/core-react/lib/${module}/core-react/text/subheading`),
  ...toModulePaths((module) => `~@itwin/core-react/lib/${module}/core-react/text/title-2`),
  ...toModulePaths((module) => `~@itwin/core-react/lib/${module}/core-react/text/title`),
  ...toModulePaths((module) => `~@itwin/core-react/lib/${module}/core-react/tiles/tile`),
];

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
    },
  },
  ...importPathsToRemove.map((importPath) => removeImport(importPath)),
]);
