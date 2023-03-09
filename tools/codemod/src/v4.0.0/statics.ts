/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { API, FileInfo } from "jscodeshift";
import { useCallExpression } from "../utils/CallExpression";
import changeImports from "../utils/changeImports";

export default function transformer(file: FileInfo, api: API) {
  const j = api.jscodeshift;
  useCallExpression(j);

  const root = j(file.source);
  root.findCallExpressions("FrontstageManager.initialize").remove();
  root.findCallExpressions("FrontstageManager.setActiveLayout").renameTo("UiFramework.content.layouts.setActive");
  root.findCallExpressions("FrontstageManager.setActiveContentGroup").renameTo("UiFramework.content.layouts.setActiveContentGroup");

  root.findCallExpressions("ConfigurableUiManager.addFrontstageProvider").renameTo("UiFramework.frontstages.addFrontstageProvider");
  root.findCallExpressions("ConfigurableUiManager.loadKeyboardShortcuts").renameTo("UiFramework.keyboardShortcuts.loadKeyboardShortcuts");
  root.findCallExpressions("ConfigurableUiManager.registerControl").renameTo("UiFramework.controls.register");
  root.findCallExpressions("ConfigurableUiManager.isControlRegistered").renameTo("UiFramework.controls.isRegistered");
  root.findCallExpressions("ConfigurableUiManager.createControl").renameTo("UiFramework.controls.create");
  root.findCallExpressions("ConfigurableUiManager.unregisterControl").renameTo("UiFramework.controls.unregister");
  root.findCallExpressions("ConfigurableUiManager.initialize").remove();
  root.findCallExpressions("ConfigurableUiManager.loadTasks").remove();
  root.findCallExpressions("ConfigurableUiManager.loadWorkflow").remove();
  root.findCallExpressions("ConfigurableUiManager.loadWorkflows").remove();
  root.findCallExpressions("KeyboardShortcutManager.initialize").remove();
  root.findCallExpressions("ToolSettingsManager.initialize").remove();
  root.findCallExpressions("ContentLayoutManager.getLayoutKey").renameTo("UiFramework.content.layouts.getKey");
  root.findCallExpressions("ContentLayoutManager.getLayoutForGroup").renameTo("UiFramework.content.layouts.getForGroup");
  root.findCallExpressions("ContentLayoutManager.findLayout").renameTo("UiFramework.content.layouts.find");
  root.findCallExpressions("ContentLayoutManager.addLayout").renameTo("UiFramework.content.layouts.add");
  root.findCallExpressions("ContentLayoutManager.setActiveLayout").renameTo("UiFramework.content.layouts.setActive");
  root.findCallExpressions("ContentLayoutManager.refreshActiveLayout").renameTo("UiFramework.content.layouts.refreshActive");
  root.findCallExpressions("ContentDialogManager.initialize").remove();
  root.findCallExpressions("ContentDialogManager.openDialog").renameTo("UiFramework.content.dialogs.open");
  root.findCallExpressions("ContentDialogManager.closeDialog").renameTo("UiFramework.content.dialogs.close");
  root.findCallExpressions("ContentDialogManager.activeDialog").renameTo("UiFramework.content.dialogs.active");
  root.findCallExpressions("ContentDialogManager.dialogCount").renameTo("UiFramework.content.dialogs.count");
  root.findCallExpressions("ContentDialogManager.getDialogZIndex").renameTo("UiFramework.content.dialogs.getZIndex");
  root.findCallExpressions("ContentDialogManager.getDialogInfo").renameTo("UiFramework.content.dialogs.getInfo");
  root.findCallExpressions("ModalDialogManager.openDialog").renameTo("UiFramework.dialogs.modal.open");
  root.findCallExpressions("ModalDialogManager.closeDialog").renameTo("UiFramework.dialogs.modal.close");
  root.findCallExpressions("ModalDialogManager.activeDialog").renameTo("UiFramework.dialogs.modal.active");
  root.findCallExpressions("ModalDialogManager.dialogCount").renameTo("UiFramework.dialogs.modal.count");
  root.findCallExpressions("ModalDialogManager.dialogCount").renameTo("UiFramework.dialogs.modal.count");
  root.findCallExpressions("ModelessDialogManager.initialize").remove();
  root.findCallExpressions("ModelessDialogManager.openDialog").renameTo("UiFramework.dialogs.modeless.open");
  root.findCallExpressions("ModelessDialogManager.closeDialog").renameTo("UiFramework.dialogs.modeless.close");
  root.findCallExpressions("ModelessDialogManager.activeDialog").renameTo("UiFramework.dialogs.modeless.active");
  root.findCallExpressions("ModelessDialogManager.dialogCount").renameTo("UiFramework.dialogs.modeless.count");
  root.findCallExpressions("ModelessDialogManager.getDialogZIndex").renameTo("UiFramework.dialogs.modeless.getZIndex");
  root.findCallExpressions("ModelessDialogManager.getDialogInfo").renameTo("UiFramework.dialogs.modeless.getInfo");
  root.findCallExpressions("UiFramework.childWindowManager.openChildWindow").renameTo("UiFramework.childWindows.open");
  root.findCallExpressions("UiFramework.childWindowManager.findChildWindowId").renameTo("UiFramework.childWindows.findId");
  root.findCallExpressions("UiFramework.childWindowManager.closeAllChildWindows").renameTo("UiFramework.childWindows.closeAll");
  root.findCallExpressions("UiFramework.childWindowManager.closeChildWindow").renameTo("UiFramework.childWindows.close");

  changeImports(j, root, new Map<string, string>([
    ["@itwin/appui-react.FrontstageManager", "@itwin/appui-react.UiFramework.frontstages"],
    ["@itwin/appui-react.ConfigurableUiManager", "@itwin/appui-react.UiFramework.controls"],
    ["@itwin/appui-react.KeyboardShortcutManager", "@itwin/appui-react.UiFramework.keyboardShortcuts"],
    ["@itwin/appui-react.ToolSettingsManager", "@itwin/appui-react.UiFramework.toolSettings"],
    ["@itwin/appui-react.ContentLayoutManager", "@itwin/appui-react.UiFramework.content.layouts"],
    ["@itwin/appui-react.ContentDialogManager", "@itwin/appui-react.UiFramework.content.dialogs"],
    ["@itwin/appui-react.ContentViewManager", "@itwin/appui-react.UiFramework.content"],
    ["@itwin/appui-react.ModalDialogManager", "@itwin/appui-react.UiFramework.dialogs.modal"],
    ["@itwin/appui-react.ModelessDialogManager", "@itwin/appui-react.UiFramework.dialogs.modeless"],
    ["@itwin/appui-react.UiShowHideManager", "@itwin/appui-react.UiFramework.visibility"],
    ["@itwin/appui-react.UiFramework.backstageManager", "@itwin/appui-react.UiFramework.backstage"],
  ]));

  return root.toSource();
}
