/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Utilities
 */

// cSpell:ignore configurableui clientservices

import type { Store } from "redux";
import { Logger, ProcessDetector } from "@itwin/core-bentley";
import type { TranslationOptions } from "@itwin/core-common";
import type { IModelConnection, ViewState } from "@itwin/core-frontend";
import { IModelApp, SnapMode } from "@itwin/core-frontend";
import type {
  DialogLayoutDataProvider,
  DialogProps,
  Primitives,
  PropertyDescription,
  PropertyRecord,
} from "@itwin/appui-abstract";
import { UiAdmin, UiError, UiEvent } from "@itwin/appui-abstract";
import type { UiStateStorage } from "@itwin/core-react";
import { LocalStateStorage, SettingsManager } from "@itwin/core-react";
import { getObjectClassName } from "@itwin/core-react";
import { UiIModelComponents } from "@itwin/imodel-components-react";
import { BackstageManager } from "./backstage/BackstageManager";
import { InternalChildWindowManager } from "./childwindow/InternalChildWindowManager";
import { InternalConfigurableUiManager } from "./configurableui/InternalConfigurableUiManager";
import { ConfigurableUiActionId } from "./configurableui/state";
import type { FrameworkState } from "./redux/FrameworkState";
import type {
  CursorMenuData,
  CursorMenuPayload,
  PresentationSelectionScope,
} from "./redux/SessionState";
import { SessionStateActionId } from "./redux/SessionState";
import { StateManager } from "./redux/StateManager";
import type { HideIsolateEmphasizeActionHandler } from "./selection/HideIsolateEmphasizeManager";
import { HideIsolateEmphasizeManager } from "./selection/HideIsolateEmphasizeManager";
import type { ThemeId } from "./theme/ThemeManager";
import {
  SYSTEM_PREFERRED_COLOR_THEME,
  TOOLBAR_OPACITY_DEFAULT,
  WIDGET_OPACITY_DEFAULT,
} from "./theme/ThemeManager";
import * as keyinPaletteTools from "./tools/KeyinPaletteTools";
import * as openSettingTools from "./tools/OpenSettingsTool";
import * as restoreLayoutTools from "./tools/RestoreLayoutTool";
import * as toolSettingTools from "./tools/ToolSettingsTools";
import {
  InternalUiShowHideManager,
  UiShowHideSettingsProvider,
} from "./utils/InternalUiShowHideManager";
import { WidgetManager } from "./widgets/WidgetManager";
import { InternalFrontstageManager } from "./frontstage/InternalFrontstageManager";
import { InternalContentViewManager } from "./content/InternalContentViewManager";
import { InternalModalDialogManager } from "./dialog/InternalModalDialogManager";
import { InternalModelessDialogManager } from "./dialog/InternalModelessDialogManager";
import { InternalKeyboardShortcutManager } from "./keyboardshortcut/InternalKeyboardShortcut";
import { InternalToolSettingsManager } from "./toolsettings/InternalToolSettingsManager";
import type { FrameworkBackstage } from "./framework/FrameworkBackstage";
import type { FrameworkChildWindows } from "./framework/FrameworkChildWindows";
import type { FrameworkControls } from "./framework/FrameworkControls";
import type { FrameworkFrontstages } from "./framework/FrameworkFrontstages";
import type { FrameworkToolSettings } from "./framework/FrameworkToolSettings";
import type { FrameworkContent } from "./framework/FrameworkContent";
import type { FrameworkDialogs } from "./framework/FrameworkDialogs";
import type { FrameworkKeyboardShortcuts } from "./framework/FrameworkKeyboardShortcuts";
import type { FrameworkVisibility } from "./framework/FrameworkVisibility";
import {
  SyncUiEventDispatcher,
  SyncUiEventId,
} from "./syncui/SyncUiEventDispatcher";
import type { XAndY } from "@itwin/core-geometry";
import { PopupManager } from "./popup/PopupManager";
import { AccuDrawPopupManager } from "./accudraw/AccuDrawPopupManager";
import { UiDataProvidedDialog } from "./dialog/UiDataProvidedDialog";
import type { RefObject } from "react";
import { createElement } from "react";
import type { DialogInfo } from "./dialog/DialogManagerBase";
import type { KeyinEntry } from "./keyins/Keyins";
import { mapToRelativePosition, type Placement } from "./utils/Placement";
import type { ToolbarProps } from "./toolbar/Toolbar";
import type { CursorMenuItemProps } from "./shared/MenuItem";

interface ShowInputEditorOptions {
  location: XAndY;
  anchorElement?: HTMLElement;
  initialValue: Primitives.Value; // need strategy for replacing (appui-abstract)
  propertyDescription: PropertyDescription;
  onCommit: (value: Primitives.Value) => void;
  onCancel: () => void;
}

// cSpell:ignore Mobi

/** Interface to be implemented but any classes that wants to load their user settings when the UiStateEntry storage class is set.
 * @public
 */
export interface UserSettingsProvider {
  /** Unique provider Id */
  providerId: string;
  /** Function to load settings from settings storage */
  loadUserSettings(storage: UiStateStorage): Promise<void>;
}

/** UiVisibility Event Args interface.
 * @public
 * @deprecated in 4.13.x. Event args are inferred from a listener. If explicit type is needed use a type helper.
 */
export interface UiVisibilityEventArgs {
  visible: boolean;
}

/** UiVisibility Event class.
 * @public
 * @deprecated in 4.13.x. This class should not be used by applications to instantiate objects.
 */
// eslint-disable-next-line deprecation/deprecation
export class UiVisibilityChangedEvent extends UiEvent<UiVisibilityEventArgs> {}

/** TrackingTime time argument used by our feature tracking manager as an option argument to the TelemetryClient
 * @internal
 */
export interface TrackingTime {
  startTime: Date;
  endTime: Date;
}

type fn = typeof PopupManager.showComponent;
type ShowComponentParams = Parameters<fn>;
type OptionalShowComponentParams = [
  ShowComponentParams[0],
  Partial<
    Exclude<ShowComponentParams[1], "anchor"> & {
      anchorRef?: RefObject<HTMLElement>;
    }
  >?
];

/** Main entry point to configure and interact with the features provided by the AppUi-react package.
 * @public
 */
export class UiFramework {
  /**
   * Operation on the backstage component.
   * @public
   */
  public static get backstage(): FrameworkBackstage {
    if (!UiFramework._backstageManager)
      // eslint-disable-next-line deprecation/deprecation
      throw new UiError(
        UiFramework.loggerCategory(this),
        UiFramework._complaint
      );
    return UiFramework._backstageManager;
  }

  /**
   * Manage access to the child windows.
   * @public
   */
  public static get childWindows(): FrameworkChildWindows {
    return this._childWindowManager;
  }

  /**
   * Manage registered controls
   * @public
   */
  public static get controls(): FrameworkControls {
    return InternalConfigurableUiManager;
  }

  /**
   * Manage access to frontstages and related helper methods.
   * @public
   */
  public static get frontstages(): FrameworkFrontstages {
    return InternalFrontstageManager;
  }

  /**
   * Manage access and behavior of the tool settings.
   * @public
   */
  public static get toolSettings(): FrameworkToolSettings {
    return InternalToolSettingsManager;
  }

  /**
   * Manage content presented by the frontstages.
   * @public
   */
  public static get content(): FrameworkContent {
    return InternalContentViewManager;
  }

  /**
   * Manage displayed dialogs.
   * @public
   */
  public static get dialogs(): FrameworkDialogs {
    return {
      modal: InternalModalDialogManager,
      modeless: InternalModelessDialogManager,
    };
  }

  /**
   * Manages global keyboard shortcuts
   *
   * Note: This only manages the list of available shortcuts registered with it. It does not listens to the actual
   * keyboard events. In order for these shortcuts to be called upon a keyboard event, the application can
   * override the `IModelApp.toolAdmin` and assign it [[FrameworkToolAdmin]] or create an event listener
   * and call `UiFramework.keyboardShortcuts.processKey`.
   * @public
   */
  public static get keyboardShortcuts(): FrameworkKeyboardShortcuts {
    return InternalKeyboardShortcutManager;
  }

  /**
   * Manages UI visibility (Show/Hide)
   * @public
   */
  public static get visibility(): FrameworkVisibility {
    return InternalUiShowHideManager;
  }

  private static _initialized = false;
  private static _store?: Store<any>;
  private static _complaint = "UiFramework not initialized";
  private static _frameworkStateKeyInStore: string = "frameworkState"; // default name
  private static _backstageManager?: BackstageManager;
  private static _widgetManager?: WidgetManager;
  private static _hideIsolateEmphasizeActionHandler?: HideIsolateEmphasizeActionHandler;
  /** this provides a default state storage handler */
  private static _uiStateStorage: UiStateStorage = new LocalStateStorage();
  private static _settingsManager?: SettingsManager;
  private static _uiSettingsProviderRegistry: Map<
    string,
    UserSettingsProvider
  > = new Map<string, UserSettingsProvider>();
  private static _childWindowManager = new InternalChildWindowManager();
  public static useDefaultPopoutUrl = false;
  private static readonly CONTEXT_MENU_OFFSET = -8;

  /** Registers class that will be informed when the UserSettingsStorage location has been set or changed. This allows
   * classes to load any previously saved settings from the new storage location. Common storage locations are the browser's
   * local storage, or the iTwin Product Settings cloud storage available via the SettingsAdmin see `IModelApp.settingsAdmin`.
   * @public
   */
  public static registerUserSettingsProvider(entry: UserSettingsProvider) {
    if (this._uiSettingsProviderRegistry.has(entry.providerId)) return false;

    this._uiSettingsProviderRegistry.set(entry.providerId, entry);
    return true;
  }

  /** Get Show Ui event.
   * @public
   */
  // eslint-disable-next-line deprecation/deprecation
  public static readonly onUiVisibilityChanged = new UiVisibilityChangedEvent();

  /**
   * Called by the application to initialize the UiFramework. Also initializes UIIModelComponents, UiComponents, UiCore.
   * @param store The single Redux store created by the host application. If this is `undefined` then it is assumed that the [[StateManager]] is being used to provide the Redux store.
   * @param frameworkStateKey The name of the key used by the app when adding the UiFramework state into the Redux store. If not defined "frameworkState" is assumed. This value is ignored if [[StateManager]] is being used. The StateManager use "frameworkState".
   */
  public static async initialize(
    store: Store<any> | undefined,
    frameworkStateKey?: string
  ): Promise<void> {
    if (UiFramework._initialized) {
      Logger.logInfo(
        UiFramework.loggerCategory(UiFramework),
        `UiFramework.initialize already called`
      );
      return;
    }

    /* if store is undefined then the StateManager class should have been initialized by parent app and the apps default set of reducers registered with it.
      If the app has no reducers to add and does not initialize a StateManager then just initialize the StateManager with the default framework reducer now */
    if (undefined === store && !StateManager.isInitialized(true))
      new StateManager();

    UiFramework._store = store;
    // ignore setting _frameworkStateKeyInStore if not using store
    if (frameworkStateKey && store)
      UiFramework._frameworkStateKeyInStore = frameworkStateKey;

    // set up namespace and register all tools from package
    const frameworkNamespace = IModelApp.localization?.registerNamespace(
      UiFramework.localizationNamespace
    );
    [
      restoreLayoutTools,
      keyinPaletteTools,
      openSettingTools,
      toolSettingTools,
    ].forEach((tool) =>
      IModelApp.tools.registerModule(tool, this.localizationNamespace)
    );

    UiFramework._backstageManager = new BackstageManager();
    UiFramework._hideIsolateEmphasizeActionHandler =
      new HideIsolateEmphasizeManager(); // this allows user to override the default HideIsolateEmphasizeManager implementation.
    UiFramework._widgetManager = new WidgetManager();

    // Initialize ui-imodel-components, ui-components, ui-core & ui-abstract
    await UiIModelComponents.initialize();

    UiFramework.settingsManager.onSettingsProvidersChanged.addListener(() => {
      SyncUiEventDispatcher.dispatchSyncUiEvent(
        SyncUiEventId.SettingsProvidersChanged
      );
    });

    // Initialize the MessagePresenter interface in UiAdmin for Editor notifications
    UiAdmin.messagePresenter = IModelApp.notifications;

    UiFramework._initialized = true;

    // initialize any standalone settings providers that don't need to have defaults set by iModelApp
    UiShowHideSettingsProvider.initialize();

    InternalConfigurableUiManager.initialize();

    return frameworkNamespace;
  }

  /** Un-registers the UiFramework internationalization service namespace */
  public static terminate() {
    UiFramework._store = undefined;
    UiFramework._frameworkStateKeyInStore = "frameworkState";
    if (StateManager.isInitialized(true)) StateManager.clearStore();
    IModelApp.localization?.unregisterNamespace(
      UiFramework.localizationNamespace
    );
    UiFramework._backstageManager = undefined;
    UiFramework._widgetManager = undefined;
    UiFramework._hideIsolateEmphasizeActionHandler = undefined;
    UiFramework._settingsManager = undefined;

    UiIModelComponents.terminate();
    InternalUiShowHideManager.terminate();
    UiFramework._initialized = false;
  }

  /** Determines if UiFramework has been initialized */
  public static get initialized(): boolean {
    return UiFramework._initialized;
  }

  /** Property that returns the SettingManager used by AppUI-based applications.
   * @public
   */
  public static get settingsManager() {
    if (undefined === UiFramework._settingsManager)
      UiFramework._settingsManager = new SettingsManager();
    return UiFramework._settingsManager;
  }

  /** @public */
  public static get frameworkStateKey(): string {
    return UiFramework._frameworkStateKeyInStore;
  }

  /** The UiFramework state maintained by Redux
   * @public
   */
  public static get frameworkState(): FrameworkState | undefined {
    try {
      return UiFramework.store.getState()[UiFramework.frameworkStateKey];
    } catch (_e) {
      return undefined;
    }
  }

  /** The Redux store */
  public static get store(): Store<any> {
    if (UiFramework._store) return UiFramework._store;

    if (!StateManager.isInitialized(true))
      // eslint-disable-next-line deprecation/deprecation
      throw new UiError(
        UiFramework.loggerCategory(this),
        `Error trying to access redux store before either store or StateManager has been initialized.`
      );

    return StateManager.store;
  }

  /** The internationalization service namespace. */
  public static get localizationNamespace(): string {
    return "UiFramework";
  }

  /** @public */
  public static get hideIsolateEmphasizeActionHandler(): HideIsolateEmphasizeActionHandler {
    if (!UiFramework._hideIsolateEmphasizeActionHandler)
      // eslint-disable-next-line deprecation/deprecation
      throw new UiError(
        UiFramework.loggerCategory(this),
        UiFramework._complaint
      );
    return UiFramework._hideIsolateEmphasizeActionHandler;
  }

  /** @public */
  public static setHideIsolateEmphasizeActionHandler(
    handler: HideIsolateEmphasizeActionHandler | undefined
  ) {
    if (handler) UiFramework._hideIsolateEmphasizeActionHandler = handler;
    else
      UiFramework._hideIsolateEmphasizeActionHandler =
        new HideIsolateEmphasizeManager();
  }

  /** @alpha */
  public static get widgetManager(): WidgetManager {
    if (!UiFramework._widgetManager)
      // eslint-disable-next-line deprecation/deprecation
      throw new UiError(
        UiFramework.loggerCategory(this),
        UiFramework._complaint
      );
    return UiFramework._widgetManager;
  }

  /** Calls localization.getLocalizedString with the "UiFramework" namespace. Do NOT include the namespace in the key.
   * @internal
   */
  public static translate(
    key: string | string[],
    options?: TranslationOptions
  ): string {
    return IModelApp.localization.getLocalizedString(
      `${UiFramework.localizationNamespace}:${key}`,
      options
    );
  }

  /** @internal */
  public static get packageName(): string {
    return "appui-react";
  }

  /** @internal */
  public static loggerCategory(obj: any): string {
    const className = getObjectClassName(obj);
    const category =
      UiFramework.packageName + (className ? `.${className}` : "");
    return category;
  }

  public static dispatchActionToStore(
    type: string,
    payload: any,
    immediateSync = false
  ) {
    UiFramework.store.dispatch({ type, payload });
    if (immediateSync) SyncUiEventDispatcher.dispatchImmediateSyncUiEvent(type);
    else SyncUiEventDispatcher.dispatchSyncUiEvent(type);
  }

  public static setAccudrawSnapMode(snapMode: SnapMode) {
    UiFramework.dispatchActionToStore(
      ConfigurableUiActionId.SetSnapMode,
      snapMode,
      true
    );
  }

  public static getAccudrawSnapMode(): SnapMode {
    return UiFramework.frameworkState
      ? UiFramework.frameworkState.configurableUiState.snapMode
      : SnapMode.NearestKeypoint;
  }

  /**
   * Returns the stored active selection scope id.
   */
  public static getActiveSelectionScope(): string {
    return UiFramework.frameworkState
      ? UiFramework.frameworkState.sessionState.activeSelectionScope
      : "element";
  }

  /**
   * This method stores the active selection scope to the supplied scope id, and triggers
   * a `SessionStateActionId.SetSelectionScope` event in the `SyncUiEventDispatcher`.
   * Note: As of 4.0, this method *does not change* the active selection scope in the `Presentation.selection.scopes.activeScope` property.
   * This event should be listened to and the change should typically be applied to
   * `Presentation.selection.scopes.activeScope` property from the `@itwin/presentation-frontend` package.
   */
  public static setActiveSelectionScope(selectionScopeId: string): void {
    if (UiFramework.frameworkState) {
      const foundIndex =
        UiFramework.frameworkState.sessionState.availableSelectionScopes.findIndex(
          (selectionScope: PresentationSelectionScope) =>
            selectionScope.id === selectionScopeId
        );
      if (-1 !== foundIndex) {
        const scope =
          UiFramework.frameworkState.sessionState.availableSelectionScopes[
            foundIndex
          ];
        UiFramework.dispatchActionToStore(
          SessionStateActionId.SetSelectionScope,
          scope.id
        );
      }
    }
  }

  /** Show a context menu at a particular location.
   * @param items Properties of the menu items to display.
   * @param location Location of the context menu, relative to the origin of anchorElement or the overall window.
   * @param anchorElement The HTMLElement that anchors the context menu. If undefined, the location is relative to the overall window.
   * @return true if the menu was displayed, false if the menu could not be displayed.
   */
  public static openContextMenu(
    items: CursorMenuItemProps[],
    location: XAndY,
    anchorElement?: HTMLElement
  ): boolean {
    let position = location;
    let childWindowId: string | undefined;

    if (anchorElement) {
      const anchorOffset = anchorElement.getBoundingClientRect();

      position = {
        x: anchorOffset.left + location.x,
        y: anchorOffset.top + location.y,
      };

      childWindowId = UiFramework.childWindows.findId(
        anchorElement.ownerDocument.defaultView
      );
    }

    position = {
      x: position.x + UiFramework.CONTEXT_MENU_OFFSET,
      y: position.y + UiFramework.CONTEXT_MENU_OFFSET,
    };

    const cursorMenuData: CursorMenuPayload = {
      position,
      items,
      childWindowId,
    };
    UiFramework.openCursorMenu(cursorMenuData);

    return true;
  }

  /** @public */
  public static openCursorMenu(
    // eslint-disable-next-line deprecation/deprecation
    menuData: CursorMenuData | CursorMenuPayload | undefined
  ): void {
    UiFramework.dispatchActionToStore(
      SessionStateActionId.UpdateCursorMenu,
      menuData
    );
  }

  /** @public */
  public static closeCursorMenu(): void {
    UiFramework.dispatchActionToStore(
      SessionStateActionId.UpdateCursorMenu,
      undefined
    );
  }

  /** @public */
  public static getCursorMenuData(): // eslint-disable-next-line deprecation/deprecation
  CursorMenuData | CursorMenuPayload | undefined {
    return UiFramework.frameworkState
      ? UiFramework.frameworkState.sessionState.cursorMenuPayload ??
          UiFramework.frameworkState.sessionState.cursorMenuData
      : undefined;
  }

  public static getActiveIModelId(): string {
    return UiFramework.frameworkState
      ? UiFramework.frameworkState.sessionState.iModelId
      : "";
  }

  public static setActiveIModelId(iModelId: string): void {
    UiFramework.dispatchActionToStore(
      SessionStateActionId.SetActiveIModelId,
      iModelId
    );
  }

  public static setIModelConnection(
    iModelConnection: IModelConnection | undefined,
    immediateSync = false
  ) {
    const oldConnection = UiFramework.getIModelConnection();
    if (oldConnection === iModelConnection) return;

    InternalFrontstageManager.clearFrontstageDefsForIModelId(
      oldConnection?.iModelId
    );

    oldConnection && SyncUiEventDispatcher.clearConnectionEvents(oldConnection);
    iModelConnection &&
      SyncUiEventDispatcher.initializeConnectionEvents(iModelConnection);
    UiFramework.dispatchActionToStore(
      SessionStateActionId.SetIModelConnection,
      iModelConnection,
      immediateSync
    );
    const itemsSelected = iModelConnection
      ? iModelConnection.selectionSet.elements.size
      : 0;
    UiFramework.dispatchActionToStore(
      SessionStateActionId.SetNumItemsSelected,
      itemsSelected
    );
    UiFramework.setActiveIModelId(iModelConnection?.iModelId ?? "");
  }

  public static getIModelConnection(): IModelConnection | undefined {
    return UiFramework.frameworkState
      ? UiFramework.frameworkState.sessionState.iModelConnection
      : undefined;
  }

  /** Called by iModelApp to initialize saved UI state from registered UseSettingsProviders
   * @public
   */
  public static async initializeStateFromUserSettingsProviders(
    immediateSync = false
  ) {
    // let any registered providers to load values from the new storage location
    const providerKeys = [...this._uiSettingsProviderRegistry.keys()];
    for await (const key of providerKeys) {
      await this._uiSettingsProviderRegistry
        .get(key)!
        .loadUserSettings(UiFramework._uiStateStorage);
    }

    if (immediateSync)
      SyncUiEventDispatcher.dispatchImmediateSyncUiEvent(
        SyncUiEventId.UiStateStorageChanged
      );
    else
      SyncUiEventDispatcher.dispatchSyncUiEvent(
        SyncUiEventId.UiStateStorageChanged
      );
  }

  /** @public */
  public static async setUiStateStorage(
    storage: UiStateStorage,
    immediateSync = false
  ) {
    if (UiFramework._uiStateStorage === storage) return;

    UiFramework._uiStateStorage = storage;
    await this.initializeStateFromUserSettingsProviders(immediateSync);
  }

  /** The UI Settings Storage is a convenient wrapper around Local Storage to assist in caching state information across user sessions.
   * It was previously used to conflate both the state information across session and the information driven directly from user explicit action,
   * which are now handled with user preferences.
   * @public
   */
  public static getUiStateStorage(): UiStateStorage {
    return UiFramework._uiStateStorage;
  }

  public static setDefaultIModelViewportControlId(
    iModelViewportControlId: string,
    immediateSync = false
  ) {
    UiFramework.dispatchActionToStore(
      SessionStateActionId.SetDefaultIModelViewportControlId,
      iModelViewportControlId,
      immediateSync
    );
  }

  public static getDefaultIModelViewportControlId(): string | undefined {
    return UiFramework.frameworkState
      ? UiFramework.frameworkState.sessionState.defaultIModelViewportControlId
      : undefined;
  }

  public static setDefaultViewId(viewId: string, immediateSync = false) {
    UiFramework.dispatchActionToStore(
      SessionStateActionId.SetDefaultViewId,
      viewId,
      immediateSync
    );
  }

  public static getDefaultViewId(): string | undefined {
    return UiFramework.frameworkState
      ? UiFramework.frameworkState.sessionState.defaultViewId
      : undefined;
  }

  public static setDefaultViewState(
    viewState: ViewState,
    immediateSync = false
  ) {
    UiFramework.dispatchActionToStore(
      SessionStateActionId.SetDefaultViewState,
      viewState,
      immediateSync
    );
  }
  public static getDefaultViewState(): ViewState | undefined {
    return UiFramework.frameworkState
      ? UiFramework.frameworkState.sessionState.defaultViewState
      : undefined;
  }

  /**
   * Returns the stored list of available selection scopes. This list should be set by the application
   * by dispatching the `setAvailableSelectionScopes` action.
   * The value for this action typically come from `Presentation.selection.scopes.getSelectionScopes()`
   * method found in the `@itwin/presentation-frontend` package.
   * @public */
  public static getAvailableSelectionScopes(): PresentationSelectionScope[] {
    return UiFramework.frameworkState
      ? UiFramework.frameworkState.sessionState.availableSelectionScopes
      : [{ id: "element", label: "Element" } as PresentationSelectionScope];
  }

  public static getIsUiVisible() {
    return UiFramework.visibility.isUiVisible;
  }

  public static setIsUiVisible(visible: boolean) {
    if (UiFramework.visibility.isUiVisible !== visible) {
      UiFramework.visibility.isUiVisible = visible;
      UiFramework.onUiVisibilityChanged.emit({ visible });
    }
  }

  /**
   * Set the theme value used by the [[ThemeManager]] component.
   */
  public static setColorTheme(theme: ThemeId) {
    if (UiFramework.getColorTheme() === theme) return;

    UiFramework.dispatchActionToStore(
      ConfigurableUiActionId.SetTheme,
      theme,
      true
    );
  }

  public static getColorTheme(): ThemeId {
    return UiFramework.frameworkState
      ? UiFramework.frameworkState.configurableUiState.theme
      : SYSTEM_PREFERRED_COLOR_THEME;
  }

  /** UiFramework.setToolbarOpacity() sets the non-hovered opacity to the value specified.
   * @param opacity a value between 0 and 1. The default value is 0.5. IT IS NOT ADVISED TO USE A VALUE BELOW 0.2
   * @public
   */
  public static setToolbarOpacity(opacity: number) {
    if (UiFramework.getToolbarOpacity() === opacity) return;

    UiFramework.dispatchActionToStore(
      ConfigurableUiActionId.SetToolbarOpacity,
      opacity,
      true
    );
  }

  /** UiFramework.getToolbarOpacity() returns a number between 0 and 1 that is the non-hovered opacity for toolbars.
   * @public
   */
  public static getToolbarOpacity(): number {
    return UiFramework.frameworkState
      ? UiFramework.frameworkState.configurableUiState.toolbarOpacity
      : TOOLBAR_OPACITY_DEFAULT;
  }

  public static setWidgetOpacity(opacity: number) {
    if (UiFramework.getWidgetOpacity() === opacity) return;

    UiFramework.dispatchActionToStore(
      ConfigurableUiActionId.SetWidgetOpacity,
      opacity,
      true
    );
  }

  public static getWidgetOpacity(): number {
    return UiFramework.frameworkState
      ? UiFramework.frameworkState.configurableUiState.widgetOpacity
      : WIDGET_OPACITY_DEFAULT;
  }

  /** @deprecated in 4.13.x. Use {@link @itwin/core-bentley#ProcessDetector.isMobileBrowser} instead. */
  // eslint-disable-next-line @itwin/prefer-get
  public static isMobile() {
    return ProcessDetector.isMobileBrowser;
  }

  public static get showWidgetIcon(): boolean {
    return UiFramework.frameworkState
      ? UiFramework.frameworkState.configurableUiState.showWidgetIcon
      : false;
  }

  public static setShowWidgetIcon(value: boolean) {
    if (UiFramework.showWidgetIcon === value) return;

    UiFramework.dispatchActionToStore(
      ConfigurableUiActionId.SetShowWidgetIcon,
      value,
      true
    );
  }
  /** Animate Tool Settings on appear  */
  public static get animateToolSettings(): boolean {
    return UiFramework.frameworkState
      ? UiFramework.frameworkState.configurableUiState.animateToolSettings
      : false;
  }
  public static setAnimateToolSettings(value: boolean) {
    if (UiFramework.animateToolSettings === value) return;
    UiFramework.dispatchActionToStore(
      ConfigurableUiActionId.AnimateToolSettings,
      value,
      true
    );
  }

  /** Use Tool Name As Tool Settings Widget Tab Label */
  public static get useToolAsToolSettingsLabel(): boolean {
    return UiFramework.frameworkState
      ? UiFramework.frameworkState.configurableUiState
          .useToolAsToolSettingsLabel
      : false;
  }
  public static setUseToolAsToolSettingsLabel(value: boolean) {
    if (UiFramework.useToolAsToolSettingsLabel === value) return;
    UiFramework.dispatchActionToStore(
      ConfigurableUiActionId.UseToolAsToolSettingsLabel,
      value,
      true
    );
  }

  /** When `true`, panels will close as soon as the mouse leave the panel.
   * When `false` (default), panels will close on next click outside the panel.
   * @public */
  public static get autoCollapseUnpinnedPanels(): boolean {
    return UiFramework.frameworkState
      ? UiFramework.frameworkState.configurableUiState
          .autoCollapseUnpinnedPanels
      : false;
  }

  /** Method used to enable the automatic closing of an unpinned widget panel as soon as the
   * mouse leaves the widget panel. The default behavior is to require a mouse click outside
   * the panel before it is closed.
   * @public */

  public static setAutoCollapseUnpinnedPanels(value: boolean) {
    if (UiFramework.autoCollapseUnpinnedPanels === value) return;

    UiFramework.dispatchActionToStore(
      ConfigurableUiActionId.AutoCollapseUnpinnedPanels,
      value,
      true
    );
  }

  public static get useDragInteraction(): boolean {
    return UiFramework.frameworkState
      ? UiFramework.frameworkState.configurableUiState.useDragInteraction
      : false;
  }

  public static setUseDragInteraction(useDragInteraction: boolean) {
    UiFramework.dispatchActionToStore(
      ConfigurableUiActionId.SetDragInteraction,
      useDragInteraction,
      true
    );
  }

  /** Returns the variable controlling whether the overlay is displayed in a Viewport
   * @public
   */
  public static get viewOverlayDisplay() {
    return UiFramework.frameworkState
      ? UiFramework.frameworkState.configurableUiState.viewOverlayDisplay
      : true;
  }
  /** Set the variable that controls display of the view overlay. Applies to all viewports in the app
   * @public
   */
  public static setViewOverlayDisplay(display: boolean) {
    if (UiFramework.viewOverlayDisplay === display) return;
    UiFramework.dispatchActionToStore(
      ConfigurableUiActionId.SetViewOverlayDisplay,
      display
    );
  }

  /** Determines whether a ContextMenu is open
   * @alpha
   * */
  public static get isContextMenuOpen(): boolean {
    const contextMenu = document.querySelector("div.core-context-menu-opened");
    return contextMenu !== null && contextMenu !== undefined;
  }

  /** Show a Card containing content, a title and a toolbar at a particular location.
   * @param content The React component of the content to display
   * @param title Title to display at the top of the card.
   * @param toolbarProps Properties of the Toolbar to display.
   * @param location Location of the Card, relative to the origin of anchorElement or the window.
   * @param offset Offset of the Card from the location.
   * @param onItemExecuted Function invoked after a Toolbar item is executed
   * @param onCancel Function invoked when the Escape key is pressed or a click occurs outside the Card
   * @param placement {@link Placement} relative to the given location. Defaults to top-end.
   * @param anchorElement The HTMLElement that anchors the Card. If undefined, the location is relative to the overall window.
   * @return true if the Card was displayed, false if the Card could not be displayed.
   * @internal
   */
  public static showCard(
    content: React.ReactNode,
    title: string | PropertyRecord | undefined,
    toolbarProps: ToolbarProps,
    location: XAndY,
    offset: XAndY,
    onItemExecuted: (item: any) => void,
    onCancel: () => void,
    placement: Placement = "top-end",
    anchorElement?: HTMLElement
  ): boolean {
    const anchor = this.resolveHtmlElement(anchorElement);

    return PopupManager.displayCard(content, {
      title,
      toolbarProps,
      location,
      offset,
      onItemExecuted,
      onCancel,
      placement,
      anchor,
    });
  }

  /**
   * Hides a Card displayed with {@link UiFramework.showCard}
   * @internal
   */
  public static hideCard() {
    return PopupManager.hideCard();
  }

  /** Opens a Tool Settings Ui popup at a particular location.
   * @param dataProvider The DialogLayoutDataProvider for the tool settings popup dialog.
   * @param location Location of the tool settings, relative to the origin of anchorElement or the window
   * @param offset Offset of the tool settings from the location
   * @param onCancel Function invoked when the Escape key is pressed or a click occurs outside the tool settings
   * @param placement {@link Placement} relative to the given location. Defaults to top-end.
   * @param anchorElement The HTMLElement that anchors the tool settings. If undefined, the location is relative to the overall window.
   * @return true if the tool settings were displayed, false if the tool settings could not be displayed.
   * @internal
   */
  public static openToolSettingsPopup(
    dataProvider: DialogLayoutDataProvider,
    location: XAndY,
    offset: XAndY,
    onCancel: () => void,
    placement: Placement = "top-end",
    anchorElement?: HTMLElement
  ): boolean {
    const el = this.resolveHtmlElement(anchorElement);
    const relativePosition = mapToRelativePosition(placement);

    return PopupManager.openToolSettings(
      dataProvider,
      el,
      location,
      offset,
      onCancel,
      relativePosition
    );
  }

  /**
   * Closes the Tool Settings Ui popup.
   * @internal
   */
  public static closeToolSettingsPopup() {
    return PopupManager.closeToolSettings();
  }

  /** Show a Toolbar at a particular location.
   * @param toolbarProps Properties of the Toolbar to display.
   * @param location Location of the Toolbar, relative to the origin of anchorElement or the overall window.
   * @param offset Offset of the Toolbar from the location.
   * @param onItemExecuted Function invoked after a Toolbar item is executed
   * @param onCancel Function invoked when the Escape key is pressed or a click occurs outside the Toolbar
   * @param placement {@link Placement} relative to the given location. Defaults to top-end.
   * @param anchorElement The HTMLElement that anchors the Toolbar. If undefined, the location is relative to the overall window.
   * @return true if the Toolbar was displayed, false if the Toolbar could not be displayed.
   */
  public static showToolbar(
    toolbarProps: ToolbarProps,
    location: XAndY,
    offset: XAndY,
    onItemExecuted: (item: any) => void,
    onCancel: () => void,
    placement: Placement = "top-end",
    anchorElement?: HTMLElement
  ): boolean {
    const anchor = UiFramework.resolveHtmlElement(anchorElement);

    return PopupManager.displayToolbar(toolbarProps.items, {
      anchor,
      location,
      offset,
      onItemExecuted,
      onCancel,
      placement,
    });
  }

  /** Hides a toolbar displayed via {@link UiFramework.showToolbar} */
  public static hideToolbar() {
    return PopupManager.hideToolbar();
  }

  /** Show a menu button at a particular location. A menu button opens a context menu.
   * @param id Id of the menu button. Multiple menu buttons may be displayed.
   * @param menuItemsProps Properties of the menu items to display.
   * @param location Location of the context menu, relative to the origin of anchorElement or the window.
   * @param anchorElement The HTMLElement that anchors the context menu. If undefined, the location is relative to the overall window.
   * @return true if the menu was displayed, false if the menu could not be displayed.
   */
  public static showMenuButton(
    id: string,
    menuItemsProps: CursorMenuItemProps[],
    location: XAndY,
    anchorElement?: HTMLElement
  ): boolean {
    const el = this.resolveHtmlElement(anchorElement);
    return AccuDrawPopupManager.showMenuButton(
      id,
      el,
      location,
      menuItemsProps
    );
  }

  /** Hides a menu button.
   * @param id Id of the menu button. Multiple menu buttons may be displayed.
   * @return true if the menu was hidden, false if the menu could not be hidden.
   */
  public static hideMenuButton(id: string) {
    return AccuDrawPopupManager.hideMenuButton(id);
  }
  /** Show a calculator at a particular location.
   * @param initialValue Value initially displayed in the calculator.
   * @param resultIcon Icon displayed to the left of the value.
   * @param location Location of the calculator, relative to the origin of anchorElement or the window.
   * @param onOk Function called when the OK button or the Enter key is pressed.
   * @param onCancel Function called when the Cancel button or the Escape key  is pressed.
   * @param anchorElement The HTMLElement that anchors the context menu. If undefined, the location is relative to the overall window.
   * @return true if the menu was displayed, false if the menu could not be displayed.
   */
  public static showCalculator(
    initialValue: number,
    resultIcon: string,
    location: XAndY,
    onOk: (value: number) => void,
    onCancel: () => void,
    anchorElement?: HTMLElement
  ): boolean {
    const el = this.resolveHtmlElement(anchorElement);

    return AccuDrawPopupManager.showCalculator(
      el,
      location,
      initialValue,
      resultIcon,
      onOk,
      onCancel
    );
  }

  /** Hides the calculator. */
  public static hideCalculator(): boolean {
    return AccuDrawPopupManager.hideCalculator();
  }

  /** Show a React Element at a particular location.
   * @param component The ReactElement to display
   * @param options - Optional {@link: ShowComponentParams}
   */

  public static showComponent(...params: OptionalShowComponentParams): boolean {
    const options: (typeof params)[1] = params[1] || {};
    const component = params[0];
    const { anchorRef, id } = options;

    let { location, offset, onCancel, placement } = options;

    if (!location) location = { x: 0, y: 0 };
    if (!offset) offset = { x: 0, y: 0 };
    if (!placement) placement = "top-end";
    if (!onCancel) onCancel = () => UiFramework.hideComponent(id);

    return PopupManager.showComponent(component, {
      location,
      offset,
      onCancel,
      placement,
      anchor: anchorRef?.current ?? undefined,
      id,
    });
  }

  /**
   * Hides the Component previously shown with {@link UiFramework.showComponent}
   */
  public static hideComponent(id?: string): boolean {
    return PopupManager.hideComponent(id);
  }

  /** Show an input editor for an angle value at a particular location.
   * @param initialValue Value initially displayed in the editor.
   * @param location Location of the editor, relative to the origin of anchorElement or the window.
   * @param onCommit Function called when the OK button or the Enter key is pressed.
   * @param onCancel Function called when the Cancel button or the Escape key  is pressed.
   * @param anchorElement The HTMLElement that anchors the context menu. If undefined, the location is relative to the overall window.
   * @return true if the editor was displayed, false if the editor could not be displayed.
   */
  public static showAngleEditor(
    initialValue: number,
    location: XAndY,
    onCommit: (value: number) => void,
    onCancel: () => void,
    anchorElement?: HTMLElement
  ): boolean {
    const el = this.resolveHtmlElement(anchorElement);

    return AccuDrawPopupManager.showAngleEditor(
      el,
      location,
      initialValue,
      onCommit,
      onCancel
    );
  }

  /** Show an input editor for a length value at a particular location.
   * @param ShowInputEditorOptions Options detailed below for the input editor
   * @param ShowInputEditorOptions.anchorElement The HTMLElement that anchors the context menu. If undefined, the location is relative to the overall window.
   * @param ShowInputEditorOptions.propertyDescription Description of the primitive value property
   * @param ShowInputEditorOptions.initialValue Value initially displayed in the editor.
   * @param ShowInputEditorOptions.location Location of the editor, relative to the origin of anchorElement or the window.
   * @param ShowInputEditorOptions.onCommit Function called when the OK button or the Enter key is pressed.
   * @param ShowInputEditorOptions.onCancel Function called when the Cancel button or the Escape key is pressed.
   * @return true if the editor was displayed, false if the editor could not be displayed.
   * @internal
   */
  public static showInputEditor({
    anchorElement,
    initialValue,
    location,
    onCancel,
    onCommit,
    propertyDescription,
  }: ShowInputEditorOptions): boolean {
    const el = this.resolveHtmlElement(anchorElement);
    PopupManager.showInputEditor(
      el,
      location,
      initialValue,
      propertyDescription,
      onCommit,
      onCancel
    );
    return true;
  }

  /** Show an input editor for a length value at a particular location.
   * @param dimension Dimension determining which editor to display.
   * @param initialValue Value initially displayed in the editor.
   * @param location Location of the editor, relative to the origin of anchorElement or the window.
   * @param onCommit Function called when the OK button or the Enter key is pressed.
   * @param onCancel Function called when the Cancel button or the Escape key  is pressed.
   * @param anchorElement The HTMLElement that anchors the context menu. If undefined, the location is relative to the overall window.
   * @return true if the editor was displayed, false if the editor could not be displayed.
   */
  public static showDimensionEditor(
    dimension: "height" | "length",
    initialValue: number,
    location: XAndY,
    onCommit: (value: number) => void,
    onCancel: () => void,
    anchorElement?: HTMLElement
  ) {
    const el = this.resolveHtmlElement(anchorElement);
    return AccuDrawPopupManager.showDimensionEditor(
      dimension,
      el,
      location,
      initialValue,
      onCommit,
      onCancel
    );
  }

  /** Hides the input editor.
   * @internal
   */
  public static hideInputEditor(): boolean {
    return PopupManager.hideInputEditor();
  }

  /** Opens a Dialog and automatically populates it using the properties defined by the UiDataProvider.
   * @param uiDataProvider The UiDataProvider for the tool settings
   * @param title Specify title for dialog.
   * @param isModal Specify if the dialog is opened as a modal or modeless.
   * @param id Id of the dialog that is used to close it.
   * @param optionalProps Optional props for Dialog construction.
   * @return true if the tool settings were displayed, false if the tool settings could not be displayed.
   * @internal
   */
  public static openDialog(
    uiDataProvider: DialogLayoutDataProvider,
    title: string,
    isModal: boolean,
    id: string,
    optionalProps?: DialogProps
  ): boolean {
    const dialog = createElement(UiDataProvidedDialog, {
      uiDataProvider,
      title,
      isModal,
      id,
      ...optionalProps,
    });
    const modalType = isModal ? "modal" : "modeless";
    UiFramework.dialogs[modalType].open(dialog, id);
    return true;
  }

  /** Closes the Dialog with the specified dialogId.
   * @param dialogId Id of the dialog to close.
   * @internal
   */
  public static closeDialog(dialogId: string): boolean {
    const findFn = (info: DialogInfo) => info.id === dialogId;
    if (UiFramework.dialogs.modeless.dialogs.findIndex(findFn) !== -1) {
      UiFramework.dialogs.modeless.close(dialogId);
      return true;
    }

    if (UiFramework.dialogs.modal.dialogs.findIndex(findFn) !== -1) {
      UiFramework.dialogs.modal.close();
      return true;
    }

    return false;
  }

  /** Show the Key-in Palette to display key-in from all registered Tools.
   * @param keyinEntries A list of KeyinEntry to display in the palette. These can be gathered and filtered from iModelApp.tools.getToolList()
   * @param htmlElement The HTMLElement that anchors the Popup. If undefined, the location is relative to the overall window.
   * @return true if the Command Palette was displayed, false if it could not be displayed.
   */
  public static showKeyinPalette(
    keyinEntries: KeyinEntry[],
    htmlElement?: HTMLElement
  ): boolean {
    return PopupManager.showKeyinPalette(
      keyinEntries,
      UiFramework.resolveHtmlElement(htmlElement)
    );
  }

  /** Hides the Key-in Palette. */
  public static hideKeyinPalette(): boolean {
    return PopupManager.hideKeyinPalette();
  }

  private static resolveHtmlElement(htmlElement?: HTMLElement): HTMLElement {
    const el = htmlElement ?? UiFramework.controls.getWrapperElement();
    return el;
  }
}
