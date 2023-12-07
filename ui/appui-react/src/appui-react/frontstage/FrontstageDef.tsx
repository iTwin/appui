/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Frontstage
 */

// cSpell:ignore popout

import * as React from "react";
import type { ScreenViewport } from "@itwin/core-frontend";
import {
  IModelApp,
  NotifyMessageDetails,
  OutputMessagePriority,
  OutputMessageType,
} from "@itwin/core-frontend";
import { UiError } from "@itwin/appui-abstract";
import type { RectangleProps, SizeProps } from "@itwin/core-react";
import { Rectangle, Size } from "@itwin/core-react";
import type {
  NineZoneDispatch,
  NineZoneState,
  PanelSide,
} from "@itwin/appui-layout-react";
import {
  getTabLocation,
  getWidgetLocation,
  isFloatingTabLocation,
  isFloatingWidgetLocation,
  isPanelTabLocation,
  isPopoutTabLocation,
  isPopoutWidgetLocation,
  NineZoneStateReducer,
  panelSides,
} from "@itwin/appui-layout-react";
import type { ContentControl } from "../content/ContentControl";
import type { ContentGroup } from "../content/ContentGroup";
import { ContentGroupProvider } from "../content/ContentGroup";
import type { ContentLayoutDef } from "../content/ContentLayout";
import { StagePanelDef, StagePanelState } from "../stagepanels/StagePanelDef";
import { UiFramework } from "../UiFramework";
import type { WidgetControl } from "../widgets/WidgetControl";
import { WidgetDef, WidgetType } from "../widgets/WidgetDef";
import type { FrontstageProvider } from "./FrontstageProvider";
import { TimeTracker } from "../configurableui/TimeTracker";
import type { ChildWindowLocationProps } from "../framework/FrameworkChildWindows";
import { PopoutWidget } from "../childwindow/PopoutWidget";
import { BentleyStatus } from "@itwin/core-bentley";
import type { FrontstageConfig } from "./FrontstageConfig";
import type { StagePanelConfig } from "../stagepanels/StagePanelConfig";
import type { WidgetConfig } from "../widgets/WidgetConfig";
import { StageUsage } from "./StageUsage";
import { StagePanelLocation } from "../stagepanels/StagePanelLocation";
import { WidgetState } from "../widgets/WidgetState";
import { InternalFrontstageManager } from "./InternalFrontstageManager";
import { InternalContentDialogManager } from "../dialog/InternalContentDialogManager";
import type { XAndY } from "@itwin/core-geometry";
import type { ChildWindow } from "../childwindow/ChildWindowConfig";

/** @internal */
export interface FrontstageEventArgs {
  frontstageDef: FrontstageDef;
}

/** @internal */
export interface FrontstageNineZoneStateChangedEventArgs
  extends FrontstageEventArgs {
  state: NineZoneState | undefined;
}

/** FrontstageDef class provides an API for a Frontstage.
 * @public
 */
export class FrontstageDef {
  private _id: string = "";
  private _initialConfig?: FrontstageConfig;
  private _isStageClosing = false;
  private _isReady = false;
  private _isApplicationClosing = false;
  private _usage?: string;
  private _version: number = 0;
  private _toolSettings?: WidgetDef;
  private _statusBar?: WidgetDef;
  private _contentManipulation?: WidgetDef;
  private _viewNavigation?: WidgetDef;
  private _topPanel?: StagePanelDef;
  private _leftPanel?: StagePanelDef;
  private _rightPanel?: StagePanelDef;
  private _bottomPanel?: StagePanelDef;
  private _contentLayoutDef?: ContentLayoutDef;
  private _contentGroup?: ContentGroup;
  private _frontstageProvider?: FrontstageProvider;
  private _timeTracker = new TimeTracker();
  private _nineZoneState?: NineZoneState;
  private _contentGroupProvider?: ContentGroupProvider;
  private _floatingContentControls?: ContentControl[];
  private _toolAdminDefaultToolId?: string;
  private _dispatch?: NineZoneDispatch;

  public get id(): string {
    return this._id;
  }
  public get usage(): string {
    return this._usage !== undefined ? this._usage : StageUsage.General;
  }
  public get version(): number {
    return this._version;
  }
  public get contentGroupProvider(): ContentGroupProvider | undefined {
    return this._contentGroupProvider;
  }
  public get floatingContentControls() {
    return this._floatingContentControls;
  }

  public get toolSettings(): WidgetDef | undefined {
    return this._toolSettings;
  }
  public get statusBar(): WidgetDef | undefined {
    return this._statusBar;
  }
  public get contentManipulation(): WidgetDef | undefined {
    return this._contentManipulation;
  }
  public get viewNavigation(): WidgetDef | undefined {
    return this._viewNavigation;
  }

  public get topPanel(): StagePanelDef | undefined {
    return this._topPanel;
  }
  public get leftPanel(): StagePanelDef | undefined {
    return this._leftPanel;
  }
  public get rightPanel(): StagePanelDef | undefined {
    return this._rightPanel;
  }
  public get bottomPanel(): StagePanelDef | undefined {
    return this._bottomPanel;
  }

  public get contentLayoutDef(): ContentLayoutDef | undefined {
    return this._contentLayoutDef;
  }
  public get contentGroup(): ContentGroup | undefined {
    return this._contentGroup;
  }
  public get frontstageProvider(): FrontstageProvider | undefined {
    return this._frontstageProvider;
  }

  private toStagePanelLocation(side: PanelSide): StagePanelLocation {
    switch (side) {
      case "bottom":
        return StagePanelLocation.Bottom;
      case "left":
        return StagePanelLocation.Left;
      case "right":
        return StagePanelLocation.Right;
      case "top":
        return StagePanelLocation.Top;
    }
  }

  private populateStateMaps(
    nineZone: NineZoneState,
    panelMap: Map<StagePanelDef, StagePanelState>,
    widgetMap: Map<WidgetDef, WidgetState>
  ) {
    for (const panelSide of panelSides) {
      const panel = nineZone.panels[panelSide];
      const location = this.toStagePanelLocation(panelSide);
      const panelDef = this.getStagePanelDef(location);
      if (!panelDef) continue;
      const panelState = panel.collapsed
        ? StagePanelState.Minimized
        : StagePanelState.Open;
      panelMap.set(panelDef, panelState);
    }

    for (const widgetDef of this.widgetDefs) {
      const widgetId = widgetDef.id;
      if (widgetDef === this.toolSettings) {
        if (!nineZone.toolSettings) {
          widgetMap.set(widgetDef, WidgetState.Hidden);
          continue;
        } else if (nineZone.toolSettings.type === "docked") {
          widgetMap.set(widgetDef, WidgetState.Open);
          continue;
        }
      }

      if (nineZone.draggedTab?.tabId === widgetId) {
        widgetMap.set(widgetDef, WidgetState.Closed);
        continue;
      }

      const tabLocation = getTabLocation(nineZone, widgetId);
      if (!tabLocation) {
        widgetMap.set(widgetDef, WidgetState.Hidden);
        continue;
      }

      const widget = nineZone.widgets[tabLocation.widgetId];
      let widgetState = WidgetState.Open;
      if (widget.minimized || widgetId !== widget.activeTabId)
        widgetState = WidgetState.Closed;
      widgetMap.set(widgetDef, widgetState);
    }
  }

  private triggerStateChangeEvents(oldState: NineZoneState) {
    const newState = this.nineZoneState;
    if (!newState) return;

    if (this._isStageClosing || this._isApplicationClosing) return;

    const originalPanelStateMap = new Map<StagePanelDef, StagePanelState>();
    const originalWidgetStateMap = new Map<WidgetDef, WidgetState>();
    const newPanelStateMap = new Map<StagePanelDef, StagePanelState>();
    const newWidgetStateMap = new Map<WidgetDef, WidgetState>();
    this.populateStateMaps(
      oldState,
      originalPanelStateMap,
      originalWidgetStateMap
    );
    this.populateStateMaps(newState, newPanelStateMap, newWidgetStateMap);

    // Now walk and trigger set state events
    newWidgetStateMap.forEach((newWidgetState, widgetDef) => {
      const originalState = originalWidgetStateMap.get(widgetDef);
      if (originalState === newWidgetState) return;
      widgetDef.handleWidgetStateChanged(newWidgetState);
    });
    newPanelStateMap.forEach((newPanelState, panelDef) => {
      const originalState = originalPanelStateMap.get(panelDef);
      if (originalState === newPanelState) return;
      panelDef.handlePanelStateChanged(newPanelState);
    });

    for (const panelSide of panelSides) {
      const panel = newState.panels[panelSide];
      const oldPanel = oldState.panels[panelSide];
      const location = this.toStagePanelLocation(panelSide);
      const panelDef = this.getStagePanelDef(location);
      if (!panelDef) continue;

      if (panel.size !== oldPanel.size) {
        panelDef.handleSizeChanged(panel.size);
      }

      if (panel.pinned !== oldPanel.pinned) {
        panelDef.handlePinnedChanged(panel.pinned);
      }
    }
  }

  private handlePopouts(oldState: NineZoneState | undefined) {
    const newState = this.nineZoneState;

    const oldPopouts = oldState?.popoutWidgets.allIds || [];
    const newPopouts = newState?.popoutWidgets.allIds || [];
    const popoutsToClose = oldPopouts.filter((p) => !newPopouts.includes(p));
    const popoutsToOpen = newPopouts.filter((p) => !oldPopouts.includes(p));

    for (const popoutId of popoutsToClose) {
      UiFramework.childWindows.close(popoutId, true);
    }

    for (const popoutId of popoutsToOpen) {
      const result = this.openPopoutWidgetContainer(popoutId, oldState);
      if (!result) return result;
    }

    return true;
  }

  /** @internal */
  public get nineZoneState(): NineZoneState | undefined {
    return this._nineZoneState;
  }
  public set nineZoneState(state: NineZoneState | undefined) {
    if (this._nineZoneState === state) return;

    const oldState = this._nineZoneState;
    this._nineZoneState = state;
    const popoutResult = this.handlePopouts(oldState);
    if (oldState) {
      this.triggerStateChangeEvents(oldState);
    }

    const isClosing = this._isStageClosing || this._isApplicationClosing;
    if (isClosing && !this.isReady) return;
    if (popoutResult === false) {
      IModelApp.notifications.outputMessage(
        new NotifyMessageDetails(
          OutputMessagePriority.Error,
          "Widget Failed To Popout",
          undefined,
          OutputMessageType.Toast
        )
      );
      return;
    }
    InternalFrontstageManager.onFrontstageNineZoneStateChangedEvent.emit({
      frontstageDef: this,
      state,
    });
  }

  /** @internal */
  public get dispatch(): NineZoneDispatch {
    return (this._dispatch ??= (action) => {
      if (action.type === "RESIZE") {
        InternalFrontstageManager.nineZoneSize = Size.create(action.size);
      }

      const state = this.nineZoneState;
      if (!state) return;
      this.nineZoneState = NineZoneStateReducer(state, action);
    });
  }

  /** @internal */
  public get timeTracker(): TimeTracker {
    return this._timeTracker;
  }

  /** Created a [[FrontstageDef]] and initialize it */
  public static async create(provider: FrontstageProvider) {
    const def = new FrontstageDef();
    def._frontstageProvider = provider;

    const config = provider.frontstageConfig();
    await def.initializeFromConfig(config);

    return def;
  }

  /** Handles when the Frontstage becomes activated */
  protected async _onActivated() {}

  /** Handles when the Frontstage becomes activated */
  public async onActivated() {
    this.updateWidgetDefs();

    const provider = this._contentGroupProvider;
    if (provider && this._initialConfig) {
      this._contentGroup = await provider.contentGroup(this._initialConfig);
    }

    // istanbul ignore next
    if (!this._contentGroup)
      throw new UiError(
        UiFramework.loggerCategory(this),
        `onActivated: Content Group not defined`
      );

    this._contentLayoutDef = UiFramework.content.layouts.getForGroup(
      this._contentGroup
    );
    UiFramework.frontstages.onContentLayoutActivatedEvent.emit({
      contentLayout: this._contentLayoutDef,
      contentGroup: this._contentGroup,
    });

    this._timeTracker.startTiming();
    await this._onActivated();
  }

  /** Handles when the Frontstage becomes inactive */
  protected async _onDeactivated() {}

  /** Handles when the Frontstage becomes inactive */
  public async onDeactivated() {
    for (const control of this._widgetControls) {
      control.onFrontstageDeactivated();
    }

    for (const control of this.contentControls) {
      control.onFrontstageDeactivated();
    }

    // istanbul ignore else
    if (this.contentGroup) this.contentGroup.onFrontstageDeactivated();
    // istanbul ignore next
    if (this.contentGroupProvider)
      await this.contentGroupProvider.onFrontstageDeactivated();

    this._timeTracker.stopTiming();

    this._isStageClosing = true; // this keeps widgets in child windows from automatically re-docking
    UiFramework.childWindows.closeAll();

    if (this._floatingContentControls) {
      InternalContentDialogManager.closeAll();
      this._floatingContentControls = undefined;
    }

    if (this._toolAdminDefaultToolId) {
      IModelApp.toolAdmin.defaultToolId = this._toolAdminDefaultToolId;
      this._toolAdminDefaultToolId = undefined;
    }

    await this._onDeactivated();
    this._isStageClosing = false;
  }

  /** @internal */
  public setIsApplicationClosing(value: boolean) {
    this._isApplicationClosing = value;
  }

  /** Returns once the contained widgets and content controls are ready to use */
  public async waitUntilReady(): Promise<void> {
    this._isReady = false;
    // create an array of control-ready promises
    const controlReadyPromises = new Array<Promise<void>>();
    this._widgetControls.forEach((control: WidgetControl) => {
      controlReadyPromises.push(control.isReady);
    });

    // istanbul ignore else
    if (this.contentLayoutDef) {
      const usedContentIndexes = this.contentLayoutDef.getUsedContentIndexes();
      this.contentControls.forEach((control: ContentControl, index: number) => {
        // istanbul ignore else
        if (usedContentIndexes.includes(index))
          controlReadyPromises.push(control.isReady);
      });
    }

    await Promise.all(controlReadyPromises);
    // Frontstage ready
    this._isReady = true;
  }

  /** Handles when the Frontstage becomes active */
  protected _onFrontstageReady(): void {}

  /** Handles when the Frontstage becomes active */
  public onFrontstageReady(): void {
    for (const control of this._widgetControls) {
      control.onFrontstageReady();
    }

    for (const control of this.contentControls) {
      control.onFrontstageReady();
    }

    // istanbul ignore else
    if (this.contentGroup) this.contentGroup.onFrontstageReady();

    if (IModelApp.toolAdmin && IModelApp.viewManager && this._initialConfig) {
      const defaultTool = this._initialConfig.defaultTool;
      if (defaultTool) {
        this._toolAdminDefaultToolId = IModelApp.toolAdmin.defaultToolId;
        IModelApp.toolAdmin.defaultToolId = defaultTool;
        void IModelApp.tools.run(defaultTool);
      } else {
        void IModelApp.toolAdmin.startDefaultTool();
      }
    }

    this._onFrontstageReady();
  }

  /** Sets the Content Layout and Content Group */
  public setContentLayoutAndGroup(
    contentLayoutDef: ContentLayoutDef,
    contentGroup: ContentGroup
  ): void {
    this._contentLayoutDef = contentLayoutDef;
    this._contentGroup = contentGroup;
  }

  /** Sets the active view content control to the default or first */
  public async setActiveContent(): Promise<boolean> {
    let contentControl: ContentControl | undefined;
    let activated = false;

    // istanbul ignore else
    if (!contentControl && this.contentControls.length >= 0) {
      contentControl = this.contentControls[0];
    }

    if (contentControl) {
      UiFramework.content.setActive(contentControl.reactNode, true);
      if (contentControl.viewport) {
        const status = await IModelApp.viewManager.setSelectedView(
          contentControl.viewport
        );
        activated = status === BentleyStatus.SUCCESS;
      }
    }

    return activated;
  }

  /** Sets the active view content control */
  public setActiveView(
    newContent: ContentControl,
    oldContent?: ContentControl
  ): void {
    if (oldContent) oldContent.onDeactivated();
    newContent.onActivated();
    UiFramework.frontstages.onContentControlActivatedEvent.emit({
      activeContentControl: newContent,
      oldContentControl: oldContent,
    });
  }

  /** Sets the active view content control based on the selected viewport. */
  public setActiveViewFromViewport(viewport: ScreenViewport): boolean {
    const contentControl = this.contentControls.find(
      (control: ContentControl) => control.viewport === viewport
    );
    // istanbul ignore else
    if (contentControl) {
      UiFramework.content.setActive(contentControl.reactNode, true);
      return true;
    }

    // istanbul ignore next
    return false;
  }

  /** Gets a [[StagePanelDef]] based on a given panel location
   * @beta
   */
  public getStagePanelDef(
    location: StagePanelLocation
  ): StagePanelDef | undefined {
    let panelDef: StagePanelDef | undefined;

    switch (location) {
      case StagePanelLocation.Top:
        panelDef = this.topPanel;
        break;
      case StagePanelLocation.Left:
        panelDef = this.leftPanel;
        break;
      case StagePanelLocation.Right:
        panelDef = this.rightPanel;
        break;
      case StagePanelLocation.Bottom:
        panelDef = this.bottomPanel;
        break;
    }

    // Panels can be undefined in a Frontstage
    return panelDef;
  }

  /** Gets a list of [[StagePanelDef]]s
   * @beta
   */
  public get panelDefs(): StagePanelDef[] {
    const locations = [
      StagePanelLocation.Left,
      StagePanelLocation.Right,
      StagePanelLocation.Top,
      StagePanelLocation.Bottom,
    ];
    const panels: StagePanelDef[] = [];

    locations.forEach((location: StagePanelLocation) => {
      const panel = this.getStagePanelDef(location);
      if (panel) panels.push(panel);
    });

    return panels;
  }

  /** Finds a [[WidgetDef]] based on a given id */
  public findWidgetDef(id: string): WidgetDef | undefined {
    for (const widgetDef of this.widgetDefs) {
      if (widgetDef.id === id) return widgetDef;
    }
    return undefined;
  }

  /** Gets the list of [[WidgetControl]]s */
  private get _widgetControls(): WidgetControl[] {
    const widgetControls = new Array<WidgetControl>();

    this.panelDefs.forEach((panelDef: StagePanelDef) => {
      panelDef.widgetDefs.forEach((widgetDef: WidgetDef) => {
        const widgetControl = widgetDef.widgetControl;
        // istanbul ignore if
        if (widgetControl) widgetControls.push(widgetControl);
      });
    });

    return widgetControls;
  }

  public addFloatingContentControl(contentControl?: ContentControl) {
    // istanbul ignore next
    if (!contentControl) return;
    if (!this._floatingContentControls)
      this._floatingContentControls = new Array<ContentControl>();

    this._floatingContentControls.push(contentControl);
    UiFramework.content.onAvailableContentChangedEvent.emit({
      contentId: contentControl.uniqueId,
    });
  }

  public dropFloatingContentControl(contentControl?: ContentControl) {
    // istanbul ignore next
    if (!contentControl || !this._floatingContentControls) return;

    const index = this._floatingContentControls.indexOf(contentControl);
    // istanbul ignore else
    if (index > -1) {
      this._floatingContentControls.splice(index, 1);
      UiFramework.content.onAvailableContentChangedEvent.emit({
        contentId: contentControl.uniqueId,
      });
    }
  }

  /** Gets the list of [[ContentControl]]s */
  public get contentControls(): ContentControl[] {
    const contentControls = new Array<ContentControl>();
    // istanbul ignore else
    if (this.contentGroup) {
      contentControls.push(...this.contentGroup.getContentControls());
    }
    if (this._floatingContentControls) {
      contentControls.push(...this._floatingContentControls);
    }
    return contentControls;
  }

  /** Initializes a FrontstageDef from FrontstageConfig.
   * @internal
   */
  public async initializeFromConfig(config: FrontstageConfig): Promise<void> {
    this._id = config.id;
    this._initialConfig = config;

    if (config.contentGroup instanceof ContentGroupProvider) {
      this._contentGroupProvider = config.contentGroup;
    } else {
      this._contentGroup = config.contentGroup;
    }

    this._usage = config.usage;
    this._version = config.version;

    this._toolSettings = createWidgetDef(
      config.toolSettings,
      WidgetType.ToolSettings
    );
    this._statusBar = createWidgetDef(config.statusBar, WidgetType.StatusBar);
    this._contentManipulation = createWidgetDef(
      config.contentManipulation,
      WidgetType.Tool
    );
    this._viewNavigation = createWidgetDef(
      config.viewNavigation,
      WidgetType.Navigation
    );
    this._topPanel = createStagePanelDef(config, StagePanelLocation.Top);
    this._leftPanel = createStagePanelDef(config, StagePanelLocation.Left);
    this._rightPanel = createStagePanelDef(config, StagePanelLocation.Right);
    this._bottomPanel = createStagePanelDef(config, StagePanelLocation.Bottom);
  }

  /** @internal */
  public updateWidgetDefs(): void {
    // Tracks provided widgets to prevent duplicates.
    const allStageWidgetDefs: WidgetDef[] = [];

    // Process panels before zones so extension can explicitly target a widget for a StagePanelSection
    this.panelDefs.forEach((stagePanelDef: StagePanelDef) => {
      stagePanelDef.updateDynamicWidgetDefs(
        this.id,
        this.usage,
        stagePanelDef.location,
        undefined,
        allStageWidgetDefs
      );
    });

    InternalFrontstageManager.onFrontstageWidgetsChangedEvent.emit({
      frontstageDef: this,
    });
  }

  /** Restores frontstage layout to initial configuration.
   * @beta
   */
  public restoreLayout() {
    for (const panelDef of this.panelDefs) {
      panelDef.size = panelDef.defaultSize;
      panelDef.panelState = panelDef.defaultState;
    }
    for (const widgetDef of this.widgetDefs) {
      widgetDef.setWidgetState(widgetDef.defaultState);
    }
    InternalFrontstageManager.onFrontstageRestoreLayoutEvent.emit({
      frontstageDef: this,
    });
  }

  /** Used to determine WidgetState from NinezoneState
   *  @internal
   */
  public getWidgetCurrentState(widgetDef: WidgetDef): WidgetState | undefined {
    const state = this.nineZoneState;
    if (!state) return widgetDef.defaultState;

    const tab = state.tabs[widgetDef.id];
    if (tab && tab.unloaded) {
      return WidgetState.Unloaded;
    }

    const toolSettingsTabId = state.toolSettings?.tabId;
    if (
      toolSettingsTabId === widgetDef.id &&
      state.toolSettings?.type === "docked"
    ) {
      return WidgetState.Open;
    }

    const location = getTabLocation(state, widgetDef.id);

    // istanbul ignore next
    if (!location) return WidgetState.Hidden;

    if (isFloatingTabLocation(location)) {
      return WidgetState.Floating;
    }

    let collapsedPanel = false;
    // istanbul ignore else
    if ("side" in location) {
      const panel = state.panels[location.side];
      collapsedPanel =
        panel.collapsed || undefined === panel.size || 0 === panel.size;
    }
    const widgetContainer = state.widgets[location.widgetId];
    if (widgetDef.id === widgetContainer.activeTabId && !collapsedPanel)
      return WidgetState.Open;
    return WidgetState.Closed;
  }

  public isPopoutWidget(widgetId: string) {
    // istanbul ignore else
    if (this.nineZoneState) {
      const location = getTabLocation(this.nineZoneState, widgetId);
      // istanbul ignore else
      if (location) return isPopoutTabLocation(location);
    }

    return false;
  }

  public isFloatingWidget(widgetId: string) {
    // istanbul ignore else
    if (this.nineZoneState) {
      const location = getTabLocation(this.nineZoneState, widgetId);
      // istanbul ignore else
      if (location) return isFloatingTabLocation(location);
    }

    return false;
  }

  /** Create a new floating panel that contains the widget specified by its Id.
   * @param widgetId case sensitive Widget Id
   * @param position Position of top left corner of floating panel in pixels. If undefined {x:50, y:100} is used.
   * @param size defines the width and height of the floating panel. If undefined and widget has been floated before
   * the previous size is used, else {height:400, width:400} is used.
   * @beta
   */
  public floatWidget(widgetId: string, position?: XAndY, size?: SizeProps) {
    const state = this.nineZoneState;
    if (!state) return;
    const widgetDef = this.findWidgetDef(widgetId);
    if (!widgetDef) return;

    this.dispatch({
      type: "WIDGET_TAB_FLOAT",
      id: widgetId,
      position,
      size,
    });
  }

  /** Check widget and panel state to determine whether the widget is currently displayed
   * @param widgetId case-sensitive Widget Id
   * @public
   */
  public isWidgetDisplayed(widgetId: string): boolean {
    if (!this.nineZoneState) return false;

    const tabLocation = getTabLocation(this.nineZoneState, widgetId);
    if (!tabLocation) return false;

    if (isPanelTabLocation(tabLocation)) {
      const panel = this.nineZoneState.panels[tabLocation.side];
      const widgetDef = this.findWidgetDef(widgetId);
      const isVisible =
        !!widgetDef && widgetDef.state === WidgetState.Open && !panel.collapsed;
      return isVisible;
    }

    return true;
  }

  /** Opens window for specified PopoutWidget container. Used to reopen popout when running in Electron.
   * @internal
   */
  public openPopoutWidgetContainer(
    widgetContainerId: string,
    oldState: NineZoneState | undefined
  ): boolean {
    const state = this.nineZoneState;
    if (!state) return false;

    const location = getWidgetLocation(state, widgetContainerId);
    if (!location) return false;
    if (!isPopoutWidgetLocation(location)) return false;

    const widget = state.widgets[widgetContainerId];
    // Popout widget should only contain a single tab.
    if (widget.tabs.length !== 1) return false;

    const tabId = widget.tabs[0];
    const widgetDef = this.findWidgetDef(tabId);
    if (!widgetDef) return false;

    const popoutContent = (
      <PopoutWidget widgetContainerId={widgetContainerId} />
    );

    const popoutWidget = state.popoutWidgets.byId[location.popoutWidgetId];
    const bounds = Rectangle.create(popoutWidget.bounds);
    const position: ChildWindowLocationProps = {
      width: bounds.getWidth(),
      height: bounds.getHeight(),
      left: bounds.left,
      top: bounds.top,
    };

    const result = UiFramework.childWindows.open(
      widgetContainerId,
      widgetDef.label,
      popoutContent,
      position,
      UiFramework.useDefaultPopoutUrl
    );

    if (!result && oldState) {
      this.nineZoneState = oldState;
      return false;
    }

    return true;
  }

  /** Create a new popout/child window that contains the widget specified by its Id.
   * @param widgetId case sensitive Widget Id
   * @param position Position of top left corner of floating panel in pixels. If undefined {x:0, y:0} is used.
   * @param size defines the width and height of the floating panel. If undefined and widget has been floated before
   * the previous size is used, else {height:800, width:600} is used.
   * @beta
   */
  public popoutWidget(widgetId: string, position?: XAndY, size?: SizeProps) {
    const state = this.nineZoneState;
    if (!state) return;
    const widgetDef = this.findWidgetDef(widgetId);
    if (!widgetDef) return;

    this.dispatch({
      type: "WIDGET_TAB_POPOUT",
      id: widgetId,
      position,
      size,
    });
  }

  public get isStageClosing() {
    return this._isStageClosing;
  }

  public get isApplicationClosing() {
    return this._isApplicationClosing;
  }

  public get isReady() {
    return this._isReady;
  }

  /** @internal */
  public saveChildWindowSizeAndPosition(
    childWindowId: string,
    childWindow: ChildWindow
  ) {
    const state = this.nineZoneState;
    if (!state) return;

    const location = getWidgetLocation(state, childWindowId);
    if (!location || !isPopoutWidgetLocation(location)) return;

    const widget = state.widgets[location.popoutWidgetId];
    const tabId = widget.tabs[0];
    const widgetDef = this.findWidgetDef(tabId);
    if (!widgetDef) return;

    let width =
      childWindow.currentBrowser === "chromium based edge"
        ? childWindow.outerWidth
        : childWindow.innerWidth;
    let height =
      childWindow.currentBrowser === "chromium based edge"
        ? childWindow.outerHeight
        : childWindow.innerHeight;
    if (childWindow.deltaHeight) {
      height = height + childWindow.deltaHeight;
      if (height < 1) height = 100;
    }
    if (childWindow.deltaWidth) {
      width = width + childWindow.deltaWidth;
      if (width < 1) width = 100;
    }

    const bounds = Rectangle.createFromSize({ width, height }).offset({
      x: childWindow.screenX,
      y: childWindow.screenY,
    });

    this.dispatch({
      type: "WIDGET_TAB_SET_POPOUT_BOUNDS",
      id: tabId,
      bounds,
    });
  }

  /** @internal */
  public dockWidgetContainerByContainerId(widgetContainerId: string) {
    const state = this.nineZoneState;
    if (!state) return;

    const location = getWidgetLocation(state, widgetContainerId);
    if (!location) return;

    if (isFloatingWidgetLocation(location)) {
      this.dispatch({
        type: "FLOATING_WIDGET_SEND_BACK",
        id: location.floatingWidgetId,
      });
      return;
    }
    if (isPopoutWidgetLocation(location)) {
      this.dispatch({
        type: "POPOUT_WIDGET_SEND_BACK",
        id: location.popoutWidgetId,
      });
      return;
    }
  }

  /** Finds the container with the specified widget and re-docks all widgets
   * back to the panel zone location that was used when the floating container
   * was generated.
   * @param widgetId  case sensitive Widget Id.
   * @beta
   */
  public dockWidgetContainer(widgetId: string) {
    const state = this.nineZoneState;
    if (!state) return;

    const location = getTabLocation(state, widgetId);
    if (!location) return;

    this.dockWidgetContainerByContainerId(location.widgetId);
  }

  public setFloatingWidgetContainerBounds(
    floatingWidgetId: string,
    bounds: RectangleProps
  ) {
    if (
      !this.nineZoneState ||
      !(floatingWidgetId in this.nineZoneState.floatingWidgets.byId)
    )
      return false;

    this.dispatch({
      type: "FLOATING_WIDGET_SET_BOUNDS",
      id: floatingWidgetId,
      bounds,
    });
    this.dispatch({
      type: "FLOATING_WIDGET_SET_USER_SIZED",
      id: floatingWidgetId,
      userSized: true,
    });
    return true;
  }

  public getFloatingWidgetContainerIds(): string[] {
    if (!this.nineZoneState) return [];

    return [...this.nineZoneState.floatingWidgets.allIds];
  }

  public getFloatingWidgetContainerIdByWidgetId(
    widgetId: string
  ): string | undefined {
    if (!this.nineZoneState) return undefined;

    const location = getTabLocation(this.nineZoneState, widgetId);
    // istanbul ignore else
    if (location && isFloatingTabLocation(location)) {
      return location.floatingWidgetId;
    }
    // istanbul ignore next
    return undefined;
  }

  public getFloatingWidgetContainerBounds(
    floatingWidgetId: string | undefined
  ) {
    if (!floatingWidgetId) return undefined;

    // istanbul ignore else
    if (
      this.nineZoneState &&
      floatingWidgetId in this.nineZoneState.floatingWidgets.byId
    ) {
      const foundWidget = document.querySelector(
        `div.nz-widget-floatingWidget[data-widget-id='${floatingWidgetId}']`
      );
      // istanbul ignore next
      if (foundWidget) {
        const domRect = foundWidget.getBoundingClientRect();
        return {
          left: domRect.left,
          right: domRect.right,
          top: domRect.top,
          bottom: domRect.bottom,
        };
      }
      return this.nineZoneState.floatingWidgets.byId[floatingWidgetId].bounds;
    }
    return undefined;
  }

  private *_widgetDefs(): Iterator<WidgetDef> {
    for (const panelDef of this.panelDefs) {
      for (const widgetDef of panelDef.widgetDefs) {
        yield widgetDef;
      }
    }
    if (this.toolSettings) yield this.toolSettings;
    if (this.statusBar) yield this.statusBar;
    return undefined;
  }

  /** Iterable of all widget definitions in a frontstage.
   * @internal
   */
  public get widgetDefs() {
    const defs = this._widgetDefs();
    return {
      [Symbol.iterator]() {
        return defs;
      },
    };
  }
}

function createWidgetDef(
  config: WidgetConfig | undefined,
  type: WidgetType
): WidgetDef | undefined {
  if (!config) return undefined;

  const widgetDef = WidgetDef.create(config, type);
  return widgetDef;
}

function createStagePanelDef(
  frontstageConfig: FrontstageConfig,
  location: StagePanelLocation
): StagePanelDef {
  const config = getStagePanel(location, frontstageConfig);

  const panelDef = new StagePanelDef();
  panelDef.initializeFromConfig(config, location);
  return panelDef;
}

function getStagePanel(
  location: StagePanelLocation,
  config: FrontstageConfig
): StagePanelConfig | undefined {
  switch (location) {
    case StagePanelLocation.Top:
      return config.topPanel;
    case StagePanelLocation.Left:
      return config.leftPanel;
    case StagePanelLocation.Right:
      return config.rightPanel;
    case StagePanelLocation.Bottom:
      return config.bottomPanel;
  }
}

/** Hook that returns active frontstage id.
 * @public
 */
export const useActiveFrontstageId = () => {
  const def = useActiveFrontstageDef();
  const id = React.useMemo(
    () => (def ? /* istanbul ignore next */ def.id : ""),
    [def]
  );
  return id;
};

/** Hook to return the active Frontstage def.
 *  @public
 */
export function useActiveFrontstageDef() {
  const [def, setDef] = React.useState(
    UiFramework.frontstages.activeFrontstageDef
  );
  React.useEffect(() => {
    return UiFramework.frontstages.onFrontstageActivatedEvent.addListener(
      (args) => {
        setDef(args.activatedFrontstageDef);
      }
    );
  }, []);
  return def;
}

/** Hook that returns the widgetDef for a specific widgetId within the active frontstage.
 * @public
 */
export function useSpecificWidgetDef(widgetId: string) {
  const frontstageDef = useActiveFrontstageDef();
  const [widgetDef, setWidgetDef] = React.useState(() =>
    frontstageDef?.findWidgetDef(widgetId)
  );
  React.useEffect(() => {
    setWidgetDef(frontstageDef?.findWidgetDef(widgetId));
    return InternalFrontstageManager.onFrontstageWidgetsChangedEvent.addListener(
      (args) => {
        if (args.frontstageDef !== frontstageDef) return;
        setWidgetDef(frontstageDef.findWidgetDef(widgetId));
      }
    );
  }, [frontstageDef, widgetId]);
  return widgetDef;
}
