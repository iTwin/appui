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
    if (!InternalFrontstageManager._toolInformationMap.get(toolId))
      InternalFrontstageManager._toolInformationMap.set(
        toolId,
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        new ToolInformation(toolId)
      );
  }

  private static _handleSyncToolSettingsPropertiesEvent: ListenerType<
    typeof UiFramework.toolSettings.onSyncToolSettingsProperties
  > = (args) => {
    InternalFrontstageManager.activeToolSettingsProvider &&
      InternalFrontstageManager.activeToolSettingsProvider.syncToolSettingsProperties(
        args
      );
  };

  // pass on ReloadToolSettingsEvent from ToolAdmin so they are treated by UiProviders
  private static _handleReloadToolSettingsEvent: ListenerType<
    typeof UiFramework.toolSettings.onReloadToolSettingsProperties
  > = () => {
    if (InternalFrontstageManager.activeToolSettingsProvider) {
      InternalFrontstageManager.activeToolSettingsProvider.reloadPropertiesFromTool();
    }
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
      InternalFrontstageManager.ensureToolInformationIsSet(tool.toolId);
      InternalFrontstageManager.setActiveTool(tool);
    });
    UiFramework.toolSettings.onSyncToolSettingsProperties.addListener(
      InternalFrontstageManager._handleSyncToolSettingsPropertiesEvent
    );
    UiFramework.toolSettings.onReloadToolSettingsProperties.addListener(
      InternalFrontstageManager._handleReloadToolSettingsEvent
    );
    IModelApp.viewManager.onSelectedViewportChanged.addListener(
      InternalFrontstageManager._handleSelectedViewportChanged
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
    if (
      args.current &&
      InternalFrontstageManager.activeFrontstageDef &&
      !InternalFrontstageManager.isLoading
    ) {
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      InternalFrontstageManager.activeFrontstageDef.setActiveViewFromViewport(
        args.current
      );
    }
  };

  /** @internal */
  public static get isInitialized(): boolean {
    return InternalFrontstageManager._initialized;
  }
  public static set isInitialized(v: boolean) {
    InternalFrontstageManager._initialized = v;
  }

  /** Returns true if Frontstage is loading its controls. If false the Frontstage content and controls have been created. */
  public static get isLoading(): boolean {
    return InternalFrontstageManager._isLoading;
  }

  /** @internal */
  public static get nineZoneSize() {
    return InternalFrontstageManager._nineZoneSize;
  }

  public static set nineZoneSize(size) {
    InternalFrontstageManager._nineZoneSize = size;
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
    InternalFrontstageManager._frontstageDefs.clear();
    InternalFrontstageManager._activeFrontstageDef = undefined;
  }

  /** Clears the Frontstage Providers and the defs that may have been created from them.
   */
  public static clearFrontstageProviders(): void {
    InternalFrontstageManager._frontstageProviders.clear();
    InternalFrontstageManager.clearFrontstageDefs();
  }

  /** Clears the Frontstages, Frontstage Providers and the defs that may have been created from them. */
  public static clearFrontstages(): void {
    InternalFrontstageManager._frontstages.clear();
    InternalFrontstageManager.clearFrontstageProviders();
  }

  private static getFrontstageKey(frontstageId: string) {
    return frontstageId;
  }

  /** @internal */
  public static clearFrontstageDefsForIModelId(iModelId: string | undefined) {
    if (!iModelId) return;
    const keysToRemove: string[] = [];
    InternalFrontstageManager._frontstageDefs.forEach(
      (_: FrontstageDef, key: string) => {
        if (key.startsWith(`[${iModelId}]`)) keysToRemove.push(key);
      }
    );
    keysToRemove.forEach((keyValue) => {
      InternalFrontstageManager._frontstageDefs.delete(keyValue);
    });
  }

  public static addFrontstageProvider(
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    frontstageProvider: FrontstageProvider
  ): void {
    const key = InternalFrontstageManager.getFrontstageKey(
      frontstageProvider.id
    );
    key && InternalFrontstageManager._frontstageDefs.delete(key);
    InternalFrontstageManager._frontstageProviders.set(
      frontstageProvider.id,
      frontstageProvider
    );
  }

  public static addFrontstage(frontstage: Frontstage) {
    const key = InternalFrontstageManager.getFrontstageKey(frontstage.id);
    key && InternalFrontstageManager._frontstageDefs.delete(key);
    InternalFrontstageManager._frontstages.set(frontstage.id, frontstage);
  }

  /** Find a loaded Frontstage with a given id. If the id is not provided, the active Frontstage is returned.
   * If the FrontstageDef has not been cached by FrontstageDef then it will not be found. See async function
   * `getFrontstageDef` to get a FrontstageDef.
   * @param id  Id of the Frontstage to find
   * @returns  FrontstageDef with a given id if found, or undefined if not found.
   */
  private static findFrontstageDef(id: string): FrontstageDef | undefined {
    const key = InternalFrontstageManager.getFrontstageKey(id);
    const frontstageDef = InternalFrontstageManager._frontstageDefs.get(key);
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

    const provider = InternalFrontstageManager._frontstageProviders.get(id);
    if (provider) {
      return provider;
    }

    const frontstage = InternalFrontstageManager._frontstages.get(id);
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
    if (!id) return InternalFrontstageManager.activeFrontstageDef;

    let frontstageDef = InternalFrontstageManager.findFrontstageDef(id);
    if (frontstageDef) return frontstageDef;

    const frontstageProvider =
      InternalFrontstageManager.findFrontstageProvider(id);
    if (frontstageProvider) {
      frontstageDef = await FrontstageDef.create(frontstageProvider);
      if (frontstageDef) {
        const key = InternalFrontstageManager.getFrontstageKey(
          frontstageDef.id
        );
        InternalFrontstageManager._frontstageDefs.set(key, frontstageDef);
      }
      return frontstageDef;
    }

    return undefined;
  }

  /** Gets the active FrontstageDef. If a Frontstage is not active, undefined is returned.
   * @return  Active FrontstageDef, or undefined if one is not active.
   */
  public static get activeFrontstageDef(): FrontstageDef | undefined {
    return InternalFrontstageManager._activeFrontstageDef;
  }

  /** Gets the Id of the active FrontstageDef. If a Frontstage is not active, blank is returned.
   * @return  Id of the active FrontstageDef, or blank if one is not active.
   */
  public static get activeFrontstageId(): string {
    const activeFrontstage = InternalFrontstageManager._activeFrontstageDef;
    return activeFrontstage ? activeFrontstage.id : "";
  }

  public static hasFrontstage(frontstageId: string) {
    if (InternalFrontstageManager.findFrontstageDef(frontstageId)) return true;
    if (InternalFrontstageManager.findFrontstageProvider(frontstageId))
      return true;
    return false;
  }

  /** Sets the active FrontstageDef give the stageId.
   * @param  frontstageId  Id of the Frontstage to set active.
   * @returns A Promise that is fulfilled when the Frontstage is ready.
   */
  public static async setActiveFrontstage(frontstageId: string): Promise<void> {
    const frontstageDef = await InternalFrontstageManager.getFrontstageDef(
      frontstageId
    );
    if (!frontstageDef) {
      Logger.logError(
        UiFramework.loggerCategory("InternalFrontstageManager"),
        `setActiveFrontstage: Could not load a FrontstageDef with id of '${frontstageId}'`
      );
      return;
    }

    return InternalFrontstageManager.setActiveFrontstageDef(frontstageDef);
  }

  /** Sets the active FrontstageDef.
   * @param  frontstageDef  FrontstageDef to set active.
   * @returns A Promise that is fulfilled when the [[FrontstageDef]] is ready.
   */
  public static async setActiveFrontstageDef(
    frontstageDef: FrontstageDef | undefined
  ): Promise<void> {
    if (InternalFrontstageManager._activeFrontstageDef === frontstageDef)
      return;

    InternalFrontstageManager._isLoading = true;

    const deactivatedFrontstageDef =
      InternalFrontstageManager._activeFrontstageDef;
    if (deactivatedFrontstageDef) {
      await deactivatedFrontstageDef.onDeactivated();

      const timeTracker = deactivatedFrontstageDef.timeTracker;
      InternalFrontstageManager.onFrontstageDeactivatedEvent.emit({
        deactivatedFrontstageDef,
        activatedFrontstageDef: frontstageDef,
        totalTime: timeTracker.getTotalTimeSeconds(),
        engagementTime: timeTracker.getEngagementTimeSeconds(),
        idleTime: timeTracker.getIdleTimeSeconds(),
      });
    }

    InternalFrontstageManager._activeFrontstageDef = frontstageDef;

    if (frontstageDef) {
      await frontstageDef.onActivated();

      InternalFrontstageManager.onFrontstageActivatedEvent.emit({
        activatedFrontstageDef: frontstageDef,
        deactivatedFrontstageDef,
      });

      await frontstageDef.waitUntilReady();
      InternalFrontstageManager._isLoading = false;
      frontstageDef.onFrontstageReady();
      InternalFrontstageManager.onFrontstageReadyEvent.emit({ frontstageDef });
      UiFramework.visibility.handleFrontstageReady();

      await frontstageDef.setActiveContent();
    }

    InternalFrontstageManager._isLoading = false;
  }

  /** Deactivates the active FrontstageDef.
   */
  public static async deactivateFrontstageDef(): Promise<void> {
    await this.setActiveFrontstageDef(undefined);
  }

  /** Gets the Id of the active tool. If a tool is not active, blank is returned.
   * @return  Id of the active tool, or blank if one is not active.
   */
  public static get activeToolId(): string {
    return InternalFrontstageManager._activeToolId;
  }

  /** Sets the active tool id */
  public static setActiveToolId(toolId: string): void {
    InternalFrontstageManager._activeToolId = toolId;
    const toolSettingsProvider =
      InternalFrontstageManager.activeToolSettingsProvider;
    // ensure the toolSettingsProvider is initialized before emitting onToolActivatedEvent
    if (toolSettingsProvider) toolSettingsProvider.initialize();
    InternalFrontstageManager.onToolActivatedEvent.emit({ toolId });
  }

  /** Sets the active tool */
  public static setActiveTool(tool: Tool): void {
    InternalFrontstageManager.setActiveToolId(tool.toolId);
    InternalFrontstageManager.onToolIconChangedEvent.emit({
      iconSpec: tool.iconSpec,
    });
  }

  /** Gets the active tool's [[ToolInformation]] */
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  public static get activeToolInformation(): ToolInformation | undefined {
    return InternalFrontstageManager._toolInformationMap.get(
      InternalFrontstageManager.activeToolId
    );
  }

  /** Gets the Tool Setting React node of the active tool.
   * @return  Tool Setting React node of the active tool, or undefined if there is no active tool or Tool Settings for the active tool.
   * @internal
   */
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  public static get activeToolSettingsProvider(): ToolUiProvider | undefined {
    const activeToolInformation =
      InternalFrontstageManager.activeToolInformation;
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
    const activeFrontstageDef = InternalFrontstageManager.activeFrontstageDef;
    if (activeFrontstageDef) {
      InternalFrontstageManager._isLoading = false;

      activeFrontstageDef.setContentLayoutAndGroup(
        contentLayoutDef,
        contentGroup
      );
      InternalFrontstageManager.onContentLayoutActivatedEvent.emit({
        contentLayout: contentLayoutDef,
        contentGroup,
      });

      await activeFrontstageDef.waitUntilReady();
      InternalFrontstageManager._isLoading = false;

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
    await InternalFrontstageManager.setActiveLayout(
      contentLayoutDef,
      contentGroup
    );
  }

  /** Opens a modal Frontstage. Modal Frontstages can be stacked.
   * @param modalFrontstage  Information about the modal Frontstage
   */
  public static openModalFrontstage(
    modalFrontstage: ModalFrontstageInfo
  ): void {
    InternalFrontstageManager.pushModalFrontstage(modalFrontstage);
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
    InternalFrontstageManager._modalFrontstages.push(frontstageItem);
    InternalFrontstageManager.emitModalFrontstageChangedEvent();
  }

  /** Closes the top-most modal Frontstage.
   */
  public static closeModalFrontstage(): void {
    if (InternalFrontstageManager._modalFrontstages.length > 0) {
      const topMostStageItem =
        InternalFrontstageManager._modalFrontstages[
          InternalFrontstageManager._modalFrontstages.length - 1
        ];
      if (topMostStageItem.modalFrontstage.notifyCloseRequest)
        InternalFrontstageManager.onCloseModalFrontstageRequestedEvent.emit({
          modalFrontstage: topMostStageItem.modalFrontstage,
          stageCloseFunc: InternalFrontstageManager.popModalFrontstage,
        });
      else InternalFrontstageManager.popModalFrontstage();
    }
  }

  private static popModalFrontstage(): void {
    const frontstageItem = InternalFrontstageManager._modalFrontstages.pop();
    if (frontstageItem) {
      const modalFrontstage = frontstageItem.modalFrontstage;
      const timeTracker = frontstageItem.timeTracker;
      timeTracker.stopTiming();
      InternalFrontstageManager.onModalFrontstageClosedEvent.emit({
        modalFrontstage,
        totalTime: timeTracker.getTotalTimeSeconds(),
        engagementTime: timeTracker.getEngagementTimeSeconds(),
        idleTime: timeTracker.getIdleTimeSeconds(),
      });
    }

    InternalFrontstageManager.emitModalFrontstageChangedEvent();

    UiFramework.visibility.handleFrontstageReady();
  }

  private static emitModalFrontstageChangedEvent(): void {
    InternalFrontstageManager.onModalFrontstageChangedEvent.emit({
      modalFrontstageCount: InternalFrontstageManager.modalFrontstageCount,
    });
  }

  /** Updates the top-most modal Frontstage.
   */
  public static updateModalFrontstage(): void {
    InternalFrontstageManager.emitModalFrontstageChangedEvent();
  }

  /** Gets the top-most modal Frontstage.
   * @returns Top-most modal Frontstage, or undefined if there is none.
   */
  public static get activeModalFrontstage(): ModalFrontstageInfo | undefined {
    if (InternalFrontstageManager._modalFrontstages.length > 0) {
      const frontstageItem =
        InternalFrontstageManager._modalFrontstages[
          InternalFrontstageManager._modalFrontstages.length - 1
        ];
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
    return InternalFrontstageManager._modalFrontstages.length;
  }

  /** Sets the active Navigation Aid via its Id.
   * @param navigationAidId  Id of the Navigation Aid to set as active
   * @param iModelConnection IModelConnection to query for view data
   */
  public static setActiveNavigationAid(
    navigationAidId: string,
    iModelConnection: IModelConnection
  ) {
    InternalFrontstageManager.onNavigationAidActivatedEvent.emit({
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
    const widgetDef = InternalFrontstageManager.findWidget(widgetId);
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
    const activeFrontstageDef = InternalFrontstageManager.activeFrontstageDef;

    if (activeFrontstageDef) return activeFrontstageDef.findWidgetDef(widgetId);

    return undefined;
  }

  /** Opens a nested Frontstage. Nested Frontstages can be stacked.
   * @param nestedFrontstage  Information about the nested Frontstage
   */
  public static async openNestedFrontstage(
    nestedFrontstage: FrontstageDef
  ): Promise<void> {
    if (InternalFrontstageManager.nestedFrontstageCount === 0)
      InternalFrontstageManager._activePrimaryFrontstageDef =
        InternalFrontstageManager._activeFrontstageDef;

    InternalFrontstageManager.pushNestedFrontstage(nestedFrontstage);

    await InternalFrontstageManager.setActiveFrontstageDef(nestedFrontstage);
  }

  private static pushNestedFrontstage(nestedFrontstage: FrontstageDef): void {
    InternalFrontstageManager._nestedFrontstages.push(nestedFrontstage);
  }

  /** Closes the top-most nested Frontstage.
   */
  public static async closeNestedFrontstage(): Promise<void> {
    InternalFrontstageManager.popNestedFrontstage();

    if (InternalFrontstageManager.nestedFrontstageCount > 0) {
      await InternalFrontstageManager.setActiveFrontstageDef(
        InternalFrontstageManager.activeNestedFrontstage
      );
    } else {
      await InternalFrontstageManager.setActiveFrontstageDef(
        InternalFrontstageManager._activePrimaryFrontstageDef
      );
      InternalFrontstageManager._activePrimaryFrontstageDef = undefined;
    }
  }

  private static popNestedFrontstage(): void {
    InternalFrontstageManager._nestedFrontstages.pop();
  }

  /** Gets the top-most nested Frontstage.
   * @returns Top-most nested Frontstage, or undefined if there is none.
   */
  public static get activeNestedFrontstage(): FrontstageDef | undefined {
    if (InternalFrontstageManager._nestedFrontstages.length > 0)
      return InternalFrontstageManager._nestedFrontstages[
        InternalFrontstageManager._nestedFrontstages.length - 1
      ];

    return undefined;
  }

  /** Gets the number of nested Frontstages.
   * @returns Nested Frontstage count
   */
  public static get nestedFrontstageCount(): number {
    return InternalFrontstageManager._nestedFrontstages.length;
  }
}
