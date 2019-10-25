/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/

// cSpell:ignore safearea cursormenu clientservices oidc Textbox Modeless configurableui stagepanels dragdrop uiadmin

export * from "./ui-framework/UiFramework";  // Please ensure that this line comes before all other exports.

export * from "./ui-framework/CoreToolDefinitions";
export * from "./ui-framework/MarkupToolDefinitions";

export * from "./ui-framework/redux/SessionState";
export * from "./ui-framework/redux/FrameworkState";
export * from "./ui-framework/redux/connectIModel";

export * from "./ui-framework/clientservices/IModelServices";
export * from "./ui-framework/clientservices/ProjectServices";

export * from "./ui-framework/feedback/ValidationTextbox";
export * from "./ui-framework/feedback/ElementTooltip";

export * from "./ui-framework/messages/AppNotificationManager";
export * from "./ui-framework/messages/MessageManager";
export * from "./ui-framework/messages/InputField";
export * from "./ui-framework/messages/Pointer";

export * from "./ui-framework/oidc/SignIn";
export * from "./ui-framework/oidc/SignOut";

export * from "./ui-framework/imodel-components/spatial-tree/SpatialContainmentTree";
export * from "./ui-framework/imodel-components/category-tree/CategoriesTree";
export * from "./ui-framework/imodel-components/visibility-tree/VisibilityTree";

export * from "./ui-framework/pickers/ListPicker";
export * from "./ui-framework/pickers/ModelSelector/ModelSelector";
export * from "./ui-framework/pickers/ViewSelector";

export * from "./ui-framework/safearea/SafeAreaContext";

export * from "./ui-framework/configurableui/ConfigurableUiContent";
export * from "./ui-framework/configurableui/ConfigurableUiControl";
export * from "./ui-framework/configurableui/ConfigurableUiManager";
export * from "./ui-framework/configurableui/state";

export * from "./ui-framework/content/ContentControl";
export * from "./ui-framework/content/ContentGroup";
export * from "./ui-framework/content/ContentLayout";
export * from "./ui-framework/content/ContentLayoutProps";
export * from "./ui-framework/content/ContentLayoutManager";
export * from "./ui-framework/content/ContentViewManager";
export * from "./ui-framework/content/SavedView";
export * from "./ui-framework/content/SavedViewLayout";
export * from "./ui-framework/content/ViewportContentControl";
export * from "./ui-framework/content/IModelViewport";
export * from "./ui-framework/content/DefaultViewOverlay";

export * from "./ui-framework/dialog/DialogManagerBase";
export * from "./ui-framework/dialog/ModalDialogManager";
export * from "./ui-framework/dialog/ModelessDialog";
export * from "./ui-framework/dialog/ModelessDialogManager";
export * from "./ui-framework/dialog/StandardMessageBox";

export * from "./ui-framework/keyinbrowser/KeyinBrowser";

export * from "./ui-framework/dragdrop/DragDropLayerManager";
export * from "./ui-framework/dragdrop/ZoneTargets";

export * from "./ui-framework/frontstage/Frontstage";
export * from "./ui-framework/frontstage/FrontstageComposer";
export * from "./ui-framework/frontstage/FrontstageDef";
export * from "./ui-framework/frontstage/FrontstageManager";
export * from "./ui-framework/frontstage/FrontstageProvider";
export * from "./ui-framework/frontstage/NestedFrontstage";
export * from "./ui-framework/frontstage/ModalFrontstage";

export * from "./ui-framework/shared/ActionButtonItemDef";
export * from "./ui-framework/shared/AnyItemDef";
export * from "./ui-framework/shared/CommandItemDef";
export * from "./ui-framework/shared/ConditionalItemDef";
export * from "./ui-framework/shared/ConditionalItemProps";
export * from "./ui-framework/shared/CustomItemDef";
export * from "./ui-framework/shared/CustomItemProps";
export * from "./ui-framework/shared/GroupItemProps";
export * from "./ui-framework/shared/IconComponent";
export * from "./ui-framework/shared/ItemDefBase";
export * from "./ui-framework/shared/ItemMap";
export * from "./ui-framework/shared/ItemProps";
export * from "./ui-framework/shared/MenuItem";
export * from "./ui-framework/shared/ToolItemDef";

export * from "./ui-framework/keyboardshortcut/KeyboardShortcut";
export * from "./ui-framework/keyboardshortcut/KeyboardShortcutMenu";

export * from "./ui-framework/widgets/NavigationWidget";
export * from "./ui-framework/widgets/StatusBar";
export * from "./ui-framework/widgets/StatusBarWidgetControl";
export * from "./ui-framework/widgets/ToolbarWidgetBase";
export * from "./ui-framework/widgets/ToolWidget";
export * from "./ui-framework/widgets/Widget";
export * from "./ui-framework/widgets/WidgetControl";
export * from "./ui-framework/widgets/WidgetDef";
export * from "./ui-framework/widgets/WidgetHost";
export * from "./ui-framework/widgets/WidgetFactory";
export * from "./ui-framework/widgets/WidgetStack";
export * from "./ui-framework/widgets/realitydata/RealityDataPicker";
export * from "./ui-framework/widgets/VisibilityWidget";
export * from "./ui-framework/widgets/DefaultNavigationWidget";

export * from "./ui-framework/workflow/Task";
export * from "./ui-framework/workflow/Workflow";

export * from "./ui-framework/zones/FrameworkZone";
export * from "./ui-framework/zones/StatusBarZone";
export * from "./ui-framework/zones/toolsettings/ToolSettingsZone";
export * from "./ui-framework/zones/toolsettings/ToolInformation";
export * from "./ui-framework/zones/toolsettings/ToolUiManager";
export * from "./ui-framework/zones/toolsettings/ToolUiProvider";
export * from "./ui-framework/zones/toolsettings/DefaultToolSettingsProvider";

export * from "./ui-framework/tileloading/TileLoadingIndicator";

export * from "./ui-framework/zones/Zone";
export * from "./ui-framework/zones/ZoneDef";

export * from "./ui-framework/stagepanels/FrameworkStagePanel";
export * from "./ui-framework/stagepanels/StagePanel";
export * from "./ui-framework/stagepanels/StagePanelDef";
export * from "./ui-framework/stagepanels/StagePanelHeader";

export * from "./ui-framework/toolbar/ActionItemButton";
export * from "./ui-framework/toolbar/GroupItem";
export * from "./ui-framework/toolbar/PopupButton";
export * from "./ui-framework/toolbar/Toolbar";
export * from "./ui-framework/toolbar/ToolButton";

export * from "./ui-framework/cursor/CursorInformation";
export * from "./ui-framework/cursor/cursorprompt/CursorPrompt";
export * from "./ui-framework/cursor/cursorpopup/CursorPopup";
export * from "./ui-framework/cursor/cursorpopup/CursorPopupManager";
export * from "./ui-framework/cursor/cursormenu/CursorMenu";

export * from "./ui-framework/timeline/ScheduleAnimationProvider";
export * from "./ui-framework/timeline/AnalysisAnimationProvider";
export * from "./ui-framework/timeline/SolarTimelineDataProvider";

export * from "./ui-framework/backstage/Backstage";
export * from "./ui-framework/backstage/BackstageComposer";
export * from "./ui-framework/backstage/BackstageComposerItem";
export * from "./ui-framework/backstage/BackstageItem";
export * from "./ui-framework/backstage/BackstageItemsManager";
export * from "./ui-framework/backstage/BackstageItemUtilities";
export * from "./ui-framework/backstage/BackstageManager";
export * from "./ui-framework/backstage/CommandLaunch";
export * from "./ui-framework/backstage/FrontstageLaunch";
export * from "./ui-framework/backstage/Separator";
export * from "./ui-framework/backstage/TaskLaunch";
export * from "./ui-framework/backstage/UserProfile";

export * from "./ui-framework/navigationaids/NavigationAidControl";
export * from "./ui-framework/navigationaids/CubeNavigationAid";
export * from "./ui-framework/navigationaids/SheetNavigationAid";
export * from "./ui-framework/navigationaids/DrawingNavigationAid";
export * from "./ui-framework/navigationaids/SheetsModalFrontstage";
export * from "./ui-framework/navigationaids/StandardRotationNavigationAid";

export * from "./ui-framework/statusfields/ActivityCenter";
export * from "./ui-framework/statusfields/MessageCenter";
export * from "./ui-framework/statusfields/SnapMode";
export * from "./ui-framework/statusfields/PromptField";
export * from "./ui-framework/statusfields/SelectionInfo";
export * from "./ui-framework/statusfields/StatusFieldProps";
export * from "./ui-framework/statusfields/SelectionScope";
export * from "./ui-framework/statusfields/toolassistance/ToolAssistanceField";
export * from "./ui-framework/statusfields/Indicator";
export * from "./ui-framework/statusfields/SectionsField";
export * from "./ui-framework/statusfields/ViewAttributes";

export * from "./ui-framework/theme/ThemeManager";

export * from "./ui-framework/uiadmin/FrameworkUiAdmin";

export * from "./ui-framework/utils/ViewUtilities";
export * from "./ui-framework/utils/redux-ts";
export * from "./ui-framework/utils/PropsHelper";
export * from "./ui-framework/utils/UiShowHideManager";
export * from "./ui-framework/utils/ToolbarButtonHelper";

export * from "./ui-framework/syncui/SyncUiEventDispatcher";
export * from "./ui-framework/syncui/BooleanListener";

export * from "./ui-framework/accudraw/Calculator";
export * from "./ui-framework/accudraw/CalculatorEngine";
export * from "./ui-framework/accudraw/MenuButton";

export * from "./ui-framework/popup/PopupManager";
export * from "./ui-framework/popup/PositionPopup";

// Set the version number so it can be found at runtime. BUILD_SEMVER is replaced at build time by the webpack DefinePlugin.
declare var BUILD_SEMVER: string;
// istanbul ignore next
if ((typeof (BUILD_SEMVER) !== "undefined") && (typeof window !== "undefined") && window) {
  if (!(window as any).iModelJsVersions)
    (window as any).iModelJsVersions = new Map<string, string>();
  (window as any).iModelJsVersions.set("ui-framework", BUILD_SEMVER);
}

/** @docs-package-description
 * The ui-framework package contains application fragments for Login, Project, iModel and View selection,
 * and configuration of the application UI with the Backstage, Frontstages, Widgets, etc.
 * For more information, see [learning about ui-framework]($docs/learning/ui/framework/index.md).
 */
/**
 * @docs-group-description Admin
 * APIs for various UI components, such as toolbars, buttons and menus.
 */
/**
 * @docs-group-description Backstage
 * Classes for working with a Backstage
 */
/**
 * @docs-group-description ConfigurableUi
 * Classes for working with the Application UI Configuration
 */
/**
 * @docs-group-description ContentView
 * Classes for working with a Content View, Group, Layout or Control
 */
/**
 * @docs-group-description Cursor
 * Cursor related information, components and events
 */
/**
 * @docs-group-description Dialog
 * Classes for working with a dialog
 */
/**
 * @docs-group-description DragDrop
 * Classes for managing DragDrop API drag layers
 */
/**
 * @docs-group-description Frontstage
 * Classes for working with a Frontstage
 */
/**
 * @docs-group-description IModelComponents
 * Classes for displaying information about an iModel
 */
/**
 * @docs-group-description Item
 * Classes for working with an Item in a Tool Widget, Navigation Widget or Backstage
 */
/**
 * @docs-group-description KeyboardShortcut
 * Classes for working with Keyboard Shortcuts
 */
/**
 * @docs-group-description NavigationAids
 * Classes for working with Navigation Aids
 */
/**
 * @docs-group-description Notification
 * Classes for working with a Notification or Message
 */
/**
 * @docs-group-description OIDC
 * Classes for working with the OpenID Connect (OIDC) protocol
 */
/**
 * @docs-group-description Picker
 * Classes for working with various pickers
 */
/**
 * @docs-group-description State
 * Classes for maintaining state
 */
/**
 * @docs-group-description StatusBar
 * Classes for defining a StatusBar
 */
/**
 * @docs-group-description SyncUi
 * Classes for informing UI components to sync/refresh their display
 */

/**
 * @docs-group-description WorkflowTask
 * Classes for working a Workflow or Task
 */
/**
 * @docs-group-description Tools
 * Core Tool definitions
 */
/**
 * @docs-group-description ToolSettings
 * Classes for working Tool Settings
 */
/**
 * @docs-group-description Utilities
 * Various utility classes for working with a UI and Redux.
 */
/**
 * @docs-group-description Widget
 * Classes for working with a Widget
 */
/**
 * @docs-group-description Zone
 * Classes for working with a Zone
 */
