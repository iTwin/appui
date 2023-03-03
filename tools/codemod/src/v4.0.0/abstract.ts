/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { API, FileInfo } from "jscodeshift";
import changeImports from "../utils/changeImports";

const importChanges = new Map<string, string>([
  ["@itwin/appui-abstract.BackstageItem", "@itwin/appui-react.BackstageItem"],
  ["@itwin/appui-abstract.BackstageItemType", ""],
  ["@itwin/appui-abstract.isActionItem", "@itwin/appui-react.isBackstageActionItem"],
  ["@itwin/appui-abstract.isStageLauncher", "@itwin/appui-react.isBackstageStageLauncher"],
  ["@itwin/appui-abstract.BackstageItemUtilities", "@itwin/appui-react.BackstageItemUtilities"],
  ["@itwin/appui-abstract.ProvidedItem", "@itwin/appui-react.ProviderItem"],
  ["@itwin/appui-abstract.StatusBarSection", "@itwin/appui-react.StatusBarSection"],
  ["@itwin/appui-abstract.StatusBarLabelSide", "@itwin/appui-react.StatusBarLabelSide"],
  ["@itwin/appui-abstract.StatusBarItemId", "@itwin/appui-react.StatusBarItem[\"id\"]"],
  ["@itwin/appui-abstract.AbstractStatusBarItem", "@itwin/appui-react.CommonStatusBarItem"],
  ["@itwin/appui-abstract.AbstractStatusBarActionItem", "@itwin/appui-react.StatusBarActionItem"],
  ["@itwin/appui-abstract.AbstractStatusBarLabelItem", "@itwin/appui-react.StatusBarLabelItem"],
  ["@itwin/appui-abstract.AbstractStatusBarCustomItem", "@itwin/appui-react.AbstractStatusBarCustomItem"],
  ["@itwin/appui-abstract.CommonStatusBarItem", "@itwin/appui-react.StatusBarItem"],
  ["@itwin/appui-abstract.isAbstractStatusBarActionItem", "@itwin/appui-react.isStatusBarActionItem"],
  ["@itwin/appui-abstract.isAbstractStatusBarLabelItem", "@itwin/appui-react.isStatusBarLabelItem"],
  ["@itwin/appui-abstract.isAbstractStatusBarCustomItem", "@itwin/appui-react.isStatusBarCustomItem"],
  ["@itwin/appui-abstract.AbstractStatusBarItemUtilities", "@itwin/appui-react.StatusBarItemUtilities"],
  ["@itwin/appui-abstract.AbstractWidgetProps", "@itwin/appui-react.Widget"],
  ["@itwin/appui-abstract.WidgetState", "@itwin/appui-react.WidgetState"],
  ["@itwin/appui-abstract.StagePanelLocation", "@itwin/appui-react.StagePanelLocation"],
  ["@itwin/appui-abstract.StagePanelSection", "@itwin/appui-react.StagePanelSection"],
  ["@itwin/appui-abstract.ToolbarUsage", "@itwin/appui-react.ToolbarUsage"],
  ["@itwin/appui-abstract.ToolbarOrientation", "@itwin/appui-react.ToolbarOrientation"],
  ["@itwin/appui-abstract.ToolbarItem", "@itwin/appui-react.CommonToolbarItem"],
  ["@itwin/appui-abstract.ActionButton", "@itwin/appui-react.ToolbarActionItem"],
  ["@itwin/appui-abstract.GroupButton", "@itwin/appui-react.ToolbarGroupItem"],
  ["@itwin/appui-abstract.CommonToolbarItem", "@itwin/appui-react.ToolbarItem"],
  ["@itwin/appui-abstract.ToolbarItemId", "@itwin/appui-react.ToolbarItem[\"id\"]"],
  ["@itwin/appui-abstract.ToolbarItemUtilities", "@itwin/appui-react.ToolbarItemUtilities"],
  ["@itwin/appui-abstract.ToolbarItemUtilities.createActionButton", "@itwin/appui-react.ToolbarItemUtilities.createActionItem"],
  ["@itwin/appui-abstract.ToolbarItemUtilities.createGroupButton", "@itwin/appui-react.ToolbarItemUtilities.createGroupItem"],
  ["@itwin/appui-abstract.ToolbarItemUtilities.isActionButton", "@itwin/appui-react.isToolbarActionItem"],
  ["@itwin/appui-abstract.ToolbarItemUtilities.isGroupButton", "@itwin/appui-react.isToolbarGroupItem"],
  ["@itwin/appui-abstract.ToolbarItemUtilities.isCustomDefinition", "@itwin/appui-react.isToolbarCustomItem"],
  ["@itwin/appui-abstract.UiItemsProvider", "@itwin/appui-react.UiItemsProvider"],
  ["@itwin/appui-abstract.BaseUiItemsProvider", "@itwin/appui-react.BaseUiItemsProvider"],
  ["@itwin/appui-abstract.UiItemProviderRegisteredEventArgs", "@itwin/appui-react.UiItemsProviderRegisteredEventArgs"],
  ["@itwin/appui-abstract.AllowedUiItemProviderOverrides", "@itwin/appui-react.AllowedUiItemsProviderOverrides"],
  ["@itwin/appui-abstract.UiItemProviderOverrides", "@itwin/appui-react.UiItemsProviderOverrides"],
  ["@itwin/appui-abstract.UiItemsManager", "@itwin/appui-react.UiItemsManager"],
  ["@itwin/appui-abstract.StageUsage", "@itwin/appui-react.StageUsage"],
]);

export default function transformer(file: FileInfo, api: API) {
  const j = api.jscodeshift;

  const root = j(file.source);

  changeImports(j, root, importChanges);

  return root.toSource();
}
