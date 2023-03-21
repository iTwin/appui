/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import type { API, FileInfo, Options } from "jscodeshift";
import { useCallExpression } from "../utils/CallExpression";
import { useExtensions } from "../utils/Extensions";

export default function transformer(file: FileInfo, api: API, options: Options) {
  const j = api.jscodeshift;
  useExtensions(j);
  useCallExpression(j);

  const root = j(file.source);
  root.findCallExpressions("FrontstageManager.initialize").remove();
  root.rename("FrontstageManager.setActiveLayout", "UiFramework.content.layouts.setActive");
  root.rename("FrontstageManager.setActiveContentGroup", "UiFramework.content.layouts.setActiveContentGroup");

  root.rename("ConfigurableUiManager.addFrontstageProvider", "UiFramework.frontstages.addFrontstageProvider");
  root.rename("ConfigurableUiManager.loadKeyboardShortcuts", "UiFramework.keyboardShortcuts.loadKeyboardShortcuts");
  root.rename("ConfigurableUiManager.registerControl", "UiFramework.controls.register");
  root.rename("ConfigurableUiManager.isControlRegistered", "UiFramework.controls.isRegistered");
  root.rename("ConfigurableUiManager.createControl", "UiFramework.controls.create");
  root.rename("ConfigurableUiManager.unregisterControl", "UiFramework.controls.unregister");
  root.findCallExpressions("ConfigurableUiManager.initialize").remove();
  root.findCallExpressions("ConfigurableUiManager.loadTasks").remove();
  root.findCallExpressions("ConfigurableUiManager.loadWorkflow").remove();
  root.findCallExpressions("ConfigurableUiManager.loadWorkflows").remove();
  root.findCallExpressions("KeyboardShortcutManager.initialize").remove();
  root.findCallExpressions("ToolSettingsManager.initialize").remove();
  root.rename("ContentLayoutManager.getLayoutKey", "UiFramework.content.layouts.getKey");
  root.rename("ContentLayoutManager.getLayoutForGroup", "UiFramework.content.layouts.getForGroup");
  root.rename("ContentLayoutManager.findLayout", "UiFramework.content.layouts.find");
  root.rename("ContentLayoutManager.addLayout", "UiFramework.content.layouts.add");
  root.rename("ContentLayoutManager.setActiveLayout", "UiFramework.content.layouts.setActive");
  root.rename("ContentLayoutManager.refreshActiveLayout", "UiFramework.content.layouts.refreshActive");
  root.findCallExpressions("ContentDialogManager.initialize").remove();
  root.rename("ContentDialogManager.openDialog", "UiFramework.content.dialogs.open");
  root.rename("ContentDialogManager.closeDialog", "UiFramework.content.dialogs.close");
  root.rename("ContentDialogManager.activeDialog", "UiFramework.content.dialogs.active");
  root.rename("ContentDialogManager.dialogCount", "UiFramework.content.dialogs.count");
  root.rename("ContentDialogManager.getDialogZIndex", "UiFramework.content.dialogs.getZIndex");
  root.rename("ContentDialogManager.getDialogInfo", "UiFramework.content.dialogs.getInfo");
  root.rename("ModalDialogManager.openDialog", "UiFramework.dialogs.modal.open");
  root.rename("ModalDialogManager.closeDialog", "UiFramework.dialogs.modal.close");
  root.rename("ModalDialogManager.activeDialog", "UiFramework.dialogs.modal.active");
  root.rename("ModalDialogManager.dialogCount", "UiFramework.dialogs.modal.count");
  root.rename("ModalDialogManager.dialogCount", "UiFramework.dialogs.modal.count");
  root.findCallExpressions("ModelessDialogManager.initialize").remove();
  root.rename("ModelessDialogManager.openDialog", "UiFramework.dialogs.modeless.open");
  root.rename("ModelessDialogManager.closeDialog", "UiFramework.dialogs.modeless.close");
  root.rename("ModelessDialogManager.activeDialog", "UiFramework.dialogs.modeless.active");
  root.rename("ModelessDialogManager.dialogCount", "UiFramework.dialogs.modeless.count");
  root.rename("ModelessDialogManager.getDialogZIndex", "UiFramework.dialogs.modeless.getZIndex");
  root.rename("ModelessDialogManager.getDialogInfo", "UiFramework.dialogs.modeless.getInfo");
  root.rename("UiFramework.childWindowManager.openChildWindow", "UiFramework.childWindows.open");
  root.rename("UiFramework.childWindowManager.findChildWindowId", "UiFramework.childWindows.findId");
  root.rename("UiFramework.childWindowManager.closeAllChildWindows", "UiFramework.childWindows.closeAll");
  root.rename("UiFramework.childWindowManager.closeChildWindow", "UiFramework.childWindows.close");
  root.rename("@itwin/appui-react:FrontstageManager", "@itwin/appui-react:UiFramework.frontstages");
  root.rename("@itwin/appui-react:ConfigurableUiManager", "@itwin/appui-react:UiFramework.controls");
  root.rename("@itwin/appui-react:KeyboardShortcutManager", "@itwin/appui-react:UiFramework.keyboardShortcuts");
  root.rename("@itwin/appui-react:ToolSettingsManager", "@itwin/appui-react:UiFramework.toolSettings");
  root.rename("@itwin/appui-react:ContentLayoutManager", "@itwin/appui-react:UiFramework.content.layouts");
  root.rename("@itwin/appui-react:ContentDialogManager", "@itwin/appui-react:UiFramework.content.dialogs");
  root.rename("@itwin/appui-react:ContentViewManager", "@itwin/appui-react:UiFramework.content");
  root.rename("@itwin/appui-react:ModalDialogManager", "@itwin/appui-react:UiFramework.dialogs.modal");
  root.rename("@itwin/appui-react:ModelessDialogManager", "@itwin/appui-react:UiFramework.dialogs.modeless");
  root.rename("@itwin/appui-react:UiShowHideManager", "@itwin/appui-react:UiFramework.visibility");
  root.rename("@itwin/appui-react:UiFramework.backstageManager", "@itwin/appui:react.UiFramework.backstage");

  return root.toSource(options.printOptions);
}
