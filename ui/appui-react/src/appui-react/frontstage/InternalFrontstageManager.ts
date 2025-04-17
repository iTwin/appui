/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Frontstage
 */

import { BeUiEvent, Logger } from "@itwin/core-bentley";
import type { IModelConnection, Tool } from "@itwin/core-frontend";
import { IModelApp, InteractiveTool } from "@itwin/core-frontend";
import type { ListenerType } from "@itwin/core-react/internal";
import type { ContentControlActivatedEventArgs } from "../content/ContentControl.js";
import type { ContentGroup } from "../content/ContentGroup.js";
import type {
  ContentLayoutActivatedEventArgs,
  ContentLayoutDef,
} from "../content/ContentLayout.js";
import type { NavigationAidActivatedEventArgs } from "../navigationaids/NavigationAidControl.js";
import type {
  PanelPinnedChangedEventArgs,
  PanelSizeChangedEventArgs,
  PanelStateChangedEventArgs,
} from "../stagepanels/StagePanelDef.js";
import { UiFramework } from "../UiFramework.js";
import type {
  WidgetDef,
  WidgetStateChangedEventArgs,
} from "../widgets/WidgetDef.js";
import { ToolInformation } from "../toolsettings/ToolInformation.js";
import type { ToolUiProvider } from "../toolsettings/ToolUiProvider.js";
import { FrontstageDef } from "./FrontstageDef.js";
import { FrontstageProvider } from "./FrontstageProvider.js";
import { TimeTracker } from "../configurableui/TimeTracker.js";
import type { WidgetState } from "../widgets/WidgetState.js";
import type {
  FrontstageActivatedEventArgs,
  FrontstageDeactivatedEventArgs,
  FrontstageReadyEventArgs,
  ModalFrontstageChangedEventArgs,
  ModalFrontstageClosedEventArgs,
  ModalFrontstageInfo,
  ModalFrontstageItem,
  ModalFrontstageRequestedCloseEventArgs,
  ToolActivatedEventArgs,
  ToolIconChangedEventArgs,
} from "../framework/FrameworkFrontstages.js";
import { UiItemsManager } from "../ui-items-provider/UiItemsManager.js";
import type { Frontstage } from "./Frontstage.js";
import type { NineZoneState } from "../layout/state/NineZoneState.js";
import type { SizeProps } from "../utils/SizeProps.js";

/** Frontstage Manager class.
 * @internal
 */
export class InternalFrontstageManager {
  private static _initialized = false;
  private static _isLoading = false;
  private static _activeToolId = "";
  private static _activeFrontstageDef: FrontstageDef | undefined;
  private static _frontstageDefs = new Map<string, FrontstageDef>();
  private static _modalFrontstages: ModalFrontstageItem[] =
    new Array<ModalFrontstageItem>();
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  private static _frontstageProviders = new Map<string, FrontstageProvider>();
  private static _frontstages = new Map<string, Frontstage>();
  private static _nineZoneSize: SizeProps | undefined = undefined;

  private static _nestedFrontstages: FrontstageDef[] =
    new Array<FrontstageDef>();
  private static _activePrimaryFrontstageDef: FrontstageDef | undefined;
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  private static _toolInformationMap: Map<string, ToolInformation> = new Map<
    string,
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    ToolInformation
  >();

  /** This should only be called within InternalFrontstageManager and its tests.
   *  @internal
   */
  public static ensureToolInformationIsSet(toolId: string): void {
    if (this._toolInformationMap.has(toolId)) return;
    this._toolInformationMap.set(
      toolId,
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      new ToolInformation(toolId)
    );
  }

  private static _handleSyncToolSettingsPropertiesEvent: ListenerType<
    typeof UiFramework.toolSettings.onSyncToolSettingsProperties
  > = (args) => {
    const provider = this.activeToolSettingsProvider;
    if (!provider) return;
    provider.syncToolSettingsProperties(args);
  };

  // pass on ReloadToolSettingsEvent from ToolAdmin so they are treated by UiProviders
  private static _handleReloadToolSettingsEvent: ListenerType<
    typeof UiFramework.toolSettings.onReloadToolSettingsProperties
  > = () => {
    const provider = this.activeToolSettingsProvider;
    if (!provider) return;
    provider.reloadPropertiesFromTool();
  };

  /** Initializes the InternalFrontstageManager
   * @internal
   */
  public static initialize() {
    if (this._initialized) return;

    IModelApp.toolAdmin.activeToolChanged.addListener((tool) => {
      // make sure tool settings properties are cached before creating ToolInformation
      UiFramework.toolSettings.clearToolSettingsData();
      if (tool instanceof InteractiveTool)
        UiFramework.toolSettings.initializeDataForTool(tool);

      // if the tool data is not already cached then see if there is data to cache
      this.ensureToolInformationIsSet(tool.toolId);
      UiFramework.frontstages.setActiveTool(tool);
    });
    UiFramework.toolSettings.onSyncToolSettingsProperties.addListener(
      this._handleSyncToolSettingsPropertiesEvent
    );
    UiFramework.toolSettings.onReloadToolSettingsProperties.addListener(
      this._handleReloadToolSettingsEvent
    );
    IModelApp.viewManager.onSelectedViewportChanged.addListener(
      this._handleSelectedViewportChanged
    );
    UiItemsManager.onUiProviderRegisteredEvent.addListener(() => {
      const frontstageDef = UiFramework.frontstages.activeFrontstageDef;
      if (!frontstageDef) return;
      frontstageDef.updateWidgetDefs();
    });

    this._initialized = true;
  }

  /** Handles a Viewport change & sets the active view accordingly */
  private static _handleSelectedViewportChanged: ListenerType<
    typeof IModelApp.viewManager.onSelectedViewportChanged
  > = (args) => {
    const frontstageDef = this.activeFrontstageDef;
    if (!args.current || !frontstageDef || UiFramework.frontstages.isLoading)
      return;
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    frontstageDef.setActiveViewFromViewport(args.current);
  };

  /** @internal */
  public static get isInitialized(): boolean {
    return this._initialized;
  }
  public static set isInitialized(v: boolean) {
    this._initialized = v;
  }

  /** Returns true if Frontstage is loading its controls. If false the Frontstage content and controls have been created. */
  public static get isLoading(): boolean {
    return this._isLoading;
  }

  /** @internal */
  public static get nineZoneSize() {
    return this._nineZoneSize;
  }

  public static set nineZoneSize(size) {
    this._nineZoneSize = size;
  }

  /** @internal */
  public static get frontstageDefs(): ReadonlyMap<string, FrontstageDef> {
    return this._frontstageDefs;
  }

  /** Get Frontstage Deactivated event. */
  public static readonly onFrontstageDeactivatedEvent =
    new BeUiEvent<FrontstageDeactivatedEventArgs>(); // eslint-disable-line @typescript-eslint/no-deprecated

  /** Get Frontstage Activated event. */
  public static readonly onFrontstageActivatedEvent =
    new BeUiEvent<FrontstageActivatedEventArgs>(); // eslint-disable-line @typescript-eslint/no-deprecated

  /** Get Frontstage Activated event. */
  public static readonly onFrontstageReadyEvent =
    new BeUiEvent<FrontstageReadyEventArgs>(); // eslint-disable-line @typescript-eslint/no-deprecated

  /** Get Modal Frontstage Changed event. */
  public static readonly onModalFrontstageChangedEvent =
    new BeUiEvent<ModalFrontstageChangedEventArgs>(); // eslint-disable-line @typescript-eslint/no-deprecated

  /** Get Modal Frontstage Closed event. */
  public static readonly onModalFrontstageClosedEvent =
    new BeUiEvent<ModalFrontstageClosedEventArgs>(); // eslint-disable-line @typescript-eslint/no-deprecated

  /** Get Modal Frontstage Requested Closed event.
   * @alpha
   */
  public static readonly onCloseModalFrontstageRequestedEvent =
    new BeUiEvent<ModalFrontstageRequestedCloseEventArgs>(); // eslint-disable-line @typescript-eslint/no-deprecated

  /** Get Tool Activated event. */
  public static readonly onToolActivatedEvent =
    new BeUiEvent<ToolActivatedEventArgs>(); // eslint-disable-line @typescript-eslint/no-deprecated

  /** Get ToolSetting Reload event. */
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  public static readonly onToolSettingsReloadEvent = new BeUiEvent<void>();

  /** Get Tool Panel Opened event.
   * @internal
   */
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  public static readonly onToolPanelOpenedEvent = new BeUiEvent<void>();

  /** Get Tool Icon Changed event. */
  public static readonly onToolIconChangedEvent =
    new BeUiEvent<ToolIconChangedEventArgs>(); // eslint-disable-line @typescript-eslint/no-deprecated

  /** Get Content Layout Activated event. */
  public static readonly onContentLayoutActivatedEvent =
    new BeUiEvent<ContentLayoutActivatedEventArgs>(); // eslint-disable-line @typescript-eslint/no-deprecated

  /** Get Content Control Activated event. */
  public static readonly onContentControlActivatedEvent =
    new BeUiEvent<ContentControlActivatedEventArgs>(); // eslint-disable-line @typescript-eslint/no-deprecated

  /** Get Navigation Aid Activated event. */
  public static readonly onNavigationAidActivatedEvent =
    new BeUiEvent<NavigationAidActivatedEventArgs>(); // eslint-disable-line @typescript-eslint/no-deprecated

  /** Get Widget State Changed event. */
  public static readonly onWidgetStateChangedEvent =
    new BeUiEvent<WidgetStateChangedEventArgs>(); // eslint-disable-line @typescript-eslint/no-deprecated

  /** @internal */
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  public static readonly onWidgetDefsUpdatedEvent = new BeUiEvent<void>();

  /** @internal */
  public static readonly onFrontstageNineZoneStateChangedEvent =
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    new BeUiEvent<{
      frontstageDef: FrontstageDef;
      state: NineZoneState | undefined;
    }>();

  /** @internal */
  public static readonly onFrontstageRestoreLayoutEvent =
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    new BeUiEvent<{
      frontstageDef: FrontstageDef;
    }>();

  /** @internal */
  public static readonly onFrontstageWidgetsChangedEvent =
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    new BeUiEvent<{
      frontstageDef: FrontstageDef;
    }>();

  /** Get panel state changed event.
   * @alpha
   */
  public static readonly onPanelStateChangedEvent =
    new BeUiEvent<PanelStateChangedEventArgs>(); // eslint-disable-line @typescript-eslint/no-deprecated

  /** Get panel pinned changed event.
   * @alpha
   */
  public static readonly onPanelPinnedChangedEvent =
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    new BeUiEvent<PanelPinnedChangedEventArgs>();

  /** @internal */
  public static readonly onPanelSizeChangedEvent =
    new BeUiEvent<PanelSizeChangedEventArgs>();

  /** Clears the Frontstage map.
   */
  public static clearFrontstageDefs(): void {
    this._frontstageDefs.clear();
    this._activeFrontstageDef = undefined;
  }

  /** Clears the Frontstage Providers and the defs that may have been created from them.
   */
  public static clearFrontstageProviders(): void {
    this._frontstageProviders.clear();
    UiFramework.frontstages.clearFrontstageDefs();
  }

  /** Clears the Frontstages, Frontstage Providers and the defs that may have been created from them. */
  public static clearFrontstages(): void {
    this._frontstages.clear();
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    UiFramework.frontstages.clearFrontstageProviders();
  }

  private static getFrontstageKey(frontstageId: string) {
    return frontstageId;
  }

  /** @internal */
  public static clearFrontstageDefsForIModelId(iModelId: string | undefined) {
    if (!iModelId) return;
    const keysToRemove: string[] = [];
    this._frontstageDefs.forEach((_: FrontstageDef, key: string) => {
      if (key.startsWith(`[${iModelId}]`)) keysToRemove.push(key);
    });
    keysToRemove.forEach((keyValue) => {
      this._frontstageDefs.delete(keyValue);
    });
  }

  public static addFrontstageProvider(
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    frontstageProvider: FrontstageProvider
  ): void {
    const key = this.getFrontstageKey(frontstageProvider.id);
    key && this._frontstageDefs.delete(key);
    this._frontstageProviders.set(frontstageProvider.id, frontstageProvider);
  }

  public static addFrontstage(frontstage: Frontstage) {
    const key = this.getFrontstageKey(frontstage.id);
    key && this._frontstageDefs.delete(key);
    this._frontstages.set(frontstage.id, frontstage);
  }

  /** Find a loaded Frontstage with a given id. If the id is not provided, the active Frontstage is returned.
   * If the FrontstageDef has not been cached by FrontstageDef then it will not be found. See async function
   * `getFrontstageDef` to get a FrontstageDef.
   * @param id  Id of the Frontstage to find
   * @returns  FrontstageDef with a given id if found, or undefined if not found.
   */
  private static findFrontstageDef(id: string): FrontstageDef | undefined {
    const key = this.getFrontstageKey(id);
    const frontstageDef = this._frontstageDefs.get(key);
    if (frontstageDef instanceof FrontstageDef) return frontstageDef;
    return undefined;
  }

  private static findFrontstageProvider(
    id?: string
    // eslint-disable-next-line @typescript-eslint/no-deprecated
  ): FrontstageProvider | undefined {
    if (!id) {
      return undefined;
    }

    const provider = this._frontstageProviders.get(id);
    if (provider) {
      return provider;
    }

    const frontstage = this._frontstages.get(id);
    if (frontstage) {
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      return new (class extends FrontstageProvider {
        public get id() {
          return frontstage?.id ?? "";
        }

        public frontstageConfig() {
          return frontstage;
        }
      })();
    }

    return undefined;
  }

  /** Find a loaded Frontstage with a given id. If the id is not provided, the active Frontstage is returned. If
   * no cached FrontstageDef is found but a FrontstageProvider is registered a FrontstageDef will be created, cached, and
   * returned.
   * @param id  Id of the Frontstage to find
   * @returns  FrontstageDef with a given id if found, or undefined if not found.
   */
  public static async getFrontstageDef(
    id?: string
  ): Promise<FrontstageDef | undefined> {
    if (!id) return UiFramework.frontstages.activeFrontstageDef;

    let frontstageDef = this.findFrontstageDef(id);
    if (frontstageDef) return frontstageDef;

    const frontstageProvider = this.findFrontstageProvider(id);
    if (frontstageProvider) {
      frontstageDef = await FrontstageDef.create(frontstageProvider);
      if (frontstageDef) {
        const key = this.getFrontstageKey(frontstageDef.id);
        this._frontstageDefs.set(key, frontstageDef);
      }
      return frontstageDef;
    }

    return undefined;
  }

  /** Gets the active FrontstageDef. If a Frontstage is not active, undefined is returned.
   * @return  Active FrontstageDef, or undefined if one is not active.
   */
  public static get activeFrontstageDef(): FrontstageDef | undefined {
    return this._activeFrontstageDef;
  }

  /** Gets the Id of the active FrontstageDef. If a Frontstage is not active, blank is returned.
   * @return  Id of the active FrontstageDef, or blank if one is not active.
   */
  public static get activeFrontstageId(): string {
    const activeFrontstage = this._activeFrontstageDef;
    return activeFrontstage ? activeFrontstage.id : "";
  }

  public static hasFrontstage(frontstageId: string) {
    if (this.findFrontstageDef(frontstageId)) return true;
    if (this.findFrontstageProvider(frontstageId)) return true;
    return false;
  }

  /** Sets the active FrontstageDef give the stageId.
   * @param  frontstageId  Id of the Frontstage to set active.
   * @returns A Promise that is fulfilled when the Frontstage is ready.
   */
  public static async setActiveFrontstage(frontstageId: string): Promise<void> {
    const frontstageDef = await UiFramework.frontstages.getFrontstageDef(
      frontstageId
    );
    if (!frontstageDef) {
      Logger.logError(
        UiFramework.loggerCategory("InternalFrontstageManager"),
        `setActiveFrontstage: Could not load a FrontstageDef with id of '${frontstageId}'`
      );
      return;
    }

    return UiFramework.frontstages.setActiveFrontstageDef(frontstageDef);
  }

  /** Sets the active FrontstageDef.
   * @param  frontstageDef  FrontstageDef to set active.
   * @returns A Promise that is fulfilled when the [[FrontstageDef]] is ready.
   */
  public static async setActiveFrontstageDef(
    frontstageDef: FrontstageDef | undefined
  ): Promise<void> {
    if (this._activeFrontstageDef === frontstageDef) return;

    this._isLoading = true;

    const deactivatedFrontstageDef = this._activeFrontstageDef;
    if (deactivatedFrontstageDef) {
      await deactivatedFrontstageDef.onDeactivated();

      const timeTracker = deactivatedFrontstageDef.timeTracker;
      UiFramework.frontstages.onFrontstageDeactivatedEvent.emit({
        deactivatedFrontstageDef,
        activatedFrontstageDef: frontstageDef,
        totalTime: timeTracker.getTotalTimeSeconds(),
        engagementTime: timeTracker.getEngagementTimeSeconds(),
        idleTime: timeTracker.getIdleTimeSeconds(),
      });
    }

    this._activeFrontstageDef = frontstageDef;

    if (frontstageDef) {
      await frontstageDef.onActivated();

      UiFramework.frontstages.onFrontstageActivatedEvent.emit({
        activatedFrontstageDef: frontstageDef,
        deactivatedFrontstageDef,
      });

      await frontstageDef.waitUntilReady();
      this._isLoading = false;
      frontstageDef.onFrontstageReady();
      UiFramework.frontstages.onFrontstageReadyEvent.emit({ frontstageDef });
      UiFramework.visibility.handleFrontstageReady();

      await frontstageDef.setActiveContent();
    }

    this._isLoading = false;
  }

  /** Deactivates the active FrontstageDef.
   */
  public static async deactivateFrontstageDef(): Promise<void> {
    await UiFramework.frontstages.setActiveFrontstageDef(undefined);
  }

  /** Gets the Id of the active tool. If a tool is not active, blank is returned.
   * @return  Id of the active tool, or blank if one is not active.
   */
  public static get activeToolId(): string {
    return this._activeToolId;
  }

  /** Sets the active tool id */
  public static setActiveToolId(toolId: string): void {
    this._activeToolId = toolId;
    const toolSettingsProvider = this.activeToolSettingsProvider;
    // ensure the toolSettingsProvider is initialized before emitting onToolActivatedEvent
    if (toolSettingsProvider) toolSettingsProvider.initialize();
    UiFramework.frontstages.onToolActivatedEvent.emit({ toolId });
  }

  /** Sets the active tool */
  public static setActiveTool(tool: Tool): void {
    UiFramework.frontstages.setActiveToolId(tool.toolId);
    UiFramework.frontstages.onToolIconChangedEvent.emit({
      iconSpec: tool.iconSpec,
    });
  }

  /** Gets the active tool's [[ToolInformation]] */
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  public static get activeToolInformation(): ToolInformation | undefined {
    return this._toolInformationMap.get(UiFramework.frontstages.activeToolId);
  }

  /** Gets the Tool Setting React node of the active tool.
   * @return  Tool Setting React node of the active tool, or undefined if there is no active tool or Tool Settings for the active tool.
   * @internal
   */
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  public static get activeToolSettingsProvider(): ToolUiProvider | undefined {
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    const activeToolInformation = UiFramework.frontstages.activeToolInformation;
    return activeToolInformation?.toolUiProvider;
  }

  /** Sets the active layout, content group and active content.
   * @param contentLayoutDef  Content layout to make active
   * @param contentGroup  Content Group to make active
   */
  public static async setActiveLayout(
    contentLayoutDef: ContentLayoutDef,
    contentGroup: ContentGroup
  ): Promise<void> {
    const activeFrontstageDef = UiFramework.frontstages.activeFrontstageDef;
    if (activeFrontstageDef) {
      this._isLoading = false;

      activeFrontstageDef.setContentLayoutAndGroup(
        contentLayoutDef,
        contentGroup
      );
      UiFramework.frontstages.onContentLayoutActivatedEvent.emit({
        contentLayout: contentLayoutDef,
        contentGroup,
      });

      await activeFrontstageDef.waitUntilReady();
      this._isLoading = false;

      await activeFrontstageDef.setActiveContent();
    }
  }

  /** Sets the active layout, content group and active content.
   * @param contentGroup  Content Group to make active
   */
  public static async setActiveContentGroup(
    contentGroup: ContentGroup
  ): Promise<void> {
    const contentLayoutDef =
      UiFramework.content.layouts.getForGroup(contentGroup);
    await this.setActiveLayout(contentLayoutDef, contentGroup);
  }

  /** Opens a modal Frontstage. Modal Frontstages can be stacked.
   * @param modalFrontstage  Information about the modal Frontstage
   */
  public static openModalFrontstage(
    modalFrontstage: ModalFrontstageInfo
  ): void {
    this.pushModalFrontstage(modalFrontstage);
  }

  private static pushModalFrontstage(
    modalFrontstage: ModalFrontstageInfo
  ): void {
    const timeTracker = new TimeTracker();
    timeTracker.startTiming();
    const frontstageItem: ModalFrontstageItem = {
      modalFrontstage,
      timeTracker,
    };
    this._modalFrontstages.push(frontstageItem);
    this.emitModalFrontstageChangedEvent();
  }

  /** Closes the top-most modal Frontstage.
   */
  public static closeModalFrontstage(): void {
    if (this._modalFrontstages.length > 0) {
      const topMostStageItem =
        this._modalFrontstages[this._modalFrontstages.length - 1];
      if (topMostStageItem.modalFrontstage.notifyCloseRequest)
        UiFramework.frontstages.onCloseModalFrontstageRequestedEvent.emit({
          modalFrontstage: topMostStageItem.modalFrontstage,
          stageCloseFunc: () => this.popModalFrontstage(),
        });
      else this.popModalFrontstage();
    }
  }

  private static popModalFrontstage(): void {
    const frontstageItem = this._modalFrontstages.pop();
    if (frontstageItem) {
      const modalFrontstage = frontstageItem.modalFrontstage;
      const timeTracker = frontstageItem.timeTracker;
      timeTracker.stopTiming();
      UiFramework.frontstages.onModalFrontstageClosedEvent.emit({
        modalFrontstage,
        totalTime: timeTracker.getTotalTimeSeconds(),
        engagementTime: timeTracker.getEngagementTimeSeconds(),
        idleTime: timeTracker.getIdleTimeSeconds(),
      });
    }

    this.emitModalFrontstageChangedEvent();

    UiFramework.visibility.handleFrontstageReady();
  }

  private static emitModalFrontstageChangedEvent(): void {
    UiFramework.frontstages.onModalFrontstageChangedEvent.emit({
      modalFrontstageCount: UiFramework.frontstages.modalFrontstageCount,
    });
  }

  /** Updates the top-most modal Frontstage.
   */
  public static updateModalFrontstage(): void {
    this.emitModalFrontstageChangedEvent();
  }

  /** Gets the top-most modal Frontstage.
   * @returns Top-most modal Frontstage, or undefined if there is none.
   */
  public static get activeModalFrontstage(): ModalFrontstageInfo | undefined {
    if (this._modalFrontstages.length > 0) {
      const frontstageItem =
        this._modalFrontstages[this._modalFrontstages.length - 1];
      const modalFrontstage = frontstageItem.modalFrontstage;
      return modalFrontstage;
    } else {
      return undefined;
    }
  }

  /** Gets the number of modal Frontstages.
   * @returns Modal Frontstage count
   */
  public static get modalFrontstageCount(): number {
    return this._modalFrontstages.length;
  }

  /** Sets the active Navigation Aid via its Id.
   * @param navigationAidId  Id of the Navigation Aid to set as active
   * @param iModelConnection IModelConnection to query for view data
   */
  public static setActiveNavigationAid(
    navigationAidId: string,
    iModelConnection: IModelConnection
  ) {
    UiFramework.frontstages.onNavigationAidActivatedEvent.emit({
      navigationAidId,
      iModelConnection,
    });
  }

  /** Sets the state of the widget with the given id
   * @param widgetId  Id of the Widget for which to set the state
   * @param state     New state of the widget
   * @returns true if the widget state was set successfully, or false if not.
   */
  public static setWidgetState(widgetId: string, state: WidgetState): boolean {
    const widgetDef = UiFramework.frontstages.findWidget(widgetId);
    if (widgetDef) {
      widgetDef.setWidgetState(state);
      return true;
    } else {
      Logger.logError(
        UiFramework.loggerCategory("InternalFrontstageManager"),
        `setWidgetState: Could not find Widget with id of '${widgetId}'`
      );
    }

    return false;
  }

  /** Finds a widget with the given id in the active frontstage
   * @param widgetId  Id of the Widget to find
   * @returns The WidgetDef with the given id, or undefined if not found.
   */
  public static findWidget(widgetId: string): WidgetDef | undefined {
    const activeFrontstageDef = UiFramework.frontstages.activeFrontstageDef;
    if (!activeFrontstageDef) return undefined;

    return activeFrontstageDef.findWidgetDef(widgetId);
  }

  /** Opens a nested Frontstage. Nested Frontstages can be stacked.
   * @param nestedFrontstage  Information about the nested Frontstage
   */
  public static async openNestedFrontstage(
    nestedFrontstage: FrontstageDef
  ): Promise<void> {
    if (UiFramework.frontstages.nestedFrontstageCount === 0)
      this._activePrimaryFrontstageDef = this._activeFrontstageDef;

    this.pushNestedFrontstage(nestedFrontstage);

    await UiFramework.frontstages.setActiveFrontstageDef(nestedFrontstage);
  }

  private static pushNestedFrontstage(nestedFrontstage: FrontstageDef): void {
    this._nestedFrontstages.push(nestedFrontstage);
  }

  /** Closes the top-most nested Frontstage.
   */
  public static async closeNestedFrontstage(): Promise<void> {
    this.popNestedFrontstage();

    if (UiFramework.frontstages.nestedFrontstageCount > 0) {
      await UiFramework.frontstages.setActiveFrontstageDef(
        UiFramework.frontstages.activeNestedFrontstage
      );
    } else {
      await UiFramework.frontstages.setActiveFrontstageDef(
        this._activePrimaryFrontstageDef
      );
      this._activePrimaryFrontstageDef = undefined;
    }
  }

  private static popNestedFrontstage(): void {
    this._nestedFrontstages.pop();
  }

  /** Gets the top-most nested Frontstage.
   * @returns Top-most nested Frontstage, or undefined if there is none.
   */
  public static get activeNestedFrontstage(): FrontstageDef | undefined {
    if (this._nestedFrontstages.length > 0)
      return this._nestedFrontstages[this._nestedFrontstages.length - 1];

    return undefined;
  }

  /** Gets the number of nested Frontstages.
   * @returns Nested Frontstage count
   */
  public static get nestedFrontstageCount(): number {
    return this._nestedFrontstages.length;
  }
}
