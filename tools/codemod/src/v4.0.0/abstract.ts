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

  root.rename("@itwin/appui-abstract:BackstageItem", "@itwin/appui-react:BackstageItem");
  root.rename("@itwin/appui-abstract:BackstageItemType", "");
  root.rename("@itwin/appui-abstract:isActionItem", "@itwin/appui-react:isBackstageActionItem");
  root.rename("@itwin/appui-abstract:isStageLauncher", "@itwin/appui-react:isBackstageStageLauncher");
  root.rename("@itwin/appui-abstract:BackstageItemUtilities", "@itwin/appui-react:BackstageItemUtilities");
  root.rename("@itwin/appui-abstract:ProvidedItem", "@itwin/appui-react:ProviderItem");
  root.rename("@itwin/appui-abstract:StatusBarSection", "@itwin/appui-react:StatusBarSection");
  root.rename("@itwin/appui-abstract:StatusBarLabelSide", "@itwin/appui-react:StatusBarLabelSide");
  root.rename("@itwin/appui-abstract:StatusBarItemId", "@itwin/appui-react:StatusBarItem[\"id\"]");
  root.rename("@itwin/appui-abstract:AbstractStatusBarItem", "@itwin/appui-react:CommonStatusBarItem");
  root.rename("@itwin/appui-abstract:AbstractStatusBarActionItem", "@itwin/appui-react:StatusBarActionItem");
  root.rename("@itwin/appui-abstract:AbstractStatusBarLabelItem", "@itwin/appui-react:StatusBarLabelItem");
  root.rename("@itwin/appui-abstract:AbstractStatusBarCustomItem", "@itwin/appui-react:AbstractStatusBarCustomItem");
  root.rename("@itwin/appui-abstract:CommonStatusBarItem", "@itwin/appui-react:StatusBarItem");
  root.rename("@itwin/appui-abstract:isAbstractStatusBarActionItem", "@itwin/appui-react:isStatusBarActionItem");
  root.rename("@itwin/appui-abstract:isAbstractStatusBarLabelItem", "@itwin/appui-react:isStatusBarLabelItem");
  root.rename("@itwin/appui-abstract:isAbstractStatusBarCustomItem", "@itwin/appui-react:isStatusBarCustomItem");
  root.rename("@itwin/appui-abstract:AbstractStatusBarItemUtilities", "@itwin/appui-react:StatusBarItemUtilities");
  root.rename("@itwin/appui-abstract:AbstractWidgetProps", "@itwin/appui-react:Widget");
  root.rename("@itwin/appui-abstract:WidgetState", "@itwin/appui-react:WidgetState");
  root.rename("@itwin/appui-abstract:StagePanelLocation", "@itwin/appui-react:StagePanelLocation");
  root.rename("@itwin/appui-abstract:StagePanelSection", "@itwin/appui-react:StagePanelSection");
  root.rename("@itwin/appui-abstract:ToolbarUsage", "@itwin/appui-react:ToolbarUsage");
  root.rename("@itwin/appui-abstract:ToolbarOrientation", "@itwin/appui-react:ToolbarOrientation");
  root.rename("@itwin/appui-abstract:ToolbarItem", "@itwin/appui-react:CommonToolbarItem");
  root.rename("@itwin/appui-abstract:ActionButton", "@itwin/appui-react:ToolbarActionItem");
  root.rename("@itwin/appui-abstract:GroupButton", "@itwin/appui-react:ToolbarGroupItem");
  root.rename("@itwin/appui-abstract:CommonToolbarItem", "@itwin/appui-react:ToolbarItem");
  root.rename("@itwin/appui-abstract:ToolbarItemId", "@itwin/appui-react:ToolbarItem[\"id\"]");
  root.rename("@itwin/appui-abstract:ToolbarItemUtilities", "@itwin/appui-react:ToolbarItemUtilities");
  root.rename("@itwin/appui-abstract:ToolbarItemUtilities.createActionButton", "@itwin/appui-react:ToolbarItemUtilities.createActionItem");
  root.rename("@itwin/appui-abstract:ToolbarItemUtilities.createGroupButton", "@itwin/appui-react:ToolbarItemUtilities.createGroupItem");
  root.rename("@itwin/appui-abstract:ToolbarItemUtilities.isActionButton", "@itwin/appui-react:isToolbarActionItem");
  root.rename("@itwin/appui-abstract:ToolbarItemUtilities.isGroupButton", "@itwin/appui-react:isToolbarGroupItem");
  root.rename("@itwin/appui-abstract:ToolbarItemUtilities.isCustomDefinition", "@itwin/appui-react:isToolbarCustomItem");
  root.rename("@itwin/appui-abstract:UiItemsProvider", "@itwin/appui-react:UiItemsProvider");
  root.rename("@itwin/appui-abstract:BaseUiItemsProvider", "@itwin/appui-react:BaseUiItemsProvider");
  root.rename("@itwin/appui-abstract:UiItemProviderRegisteredEventArgs", "@itwin/appui-react:UiItemsProviderRegisteredEventArgs");
  root.rename("@itwin/appui-abstract:AllowedUiItemProviderOverrides", "@itwin/appui-react:AllowedUiItemsProviderOverrides");
  root.rename("@itwin/appui-abstract:UiItemProviderOverrides", "@itwin/appui-react:UiItemsProviderOverrides");
  root.rename("@itwin/appui-abstract:UiItemsManager", "@itwin/appui-react:UiItemsManager");
  root.rename("@itwin/appui-abstract:StageUsage", "@itwin/appui-react:StageUsage");

  return root.toSource(options.printOptions);
}
