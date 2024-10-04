/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Frontstage
 */

import { UiError } from "@itwin/appui-abstract";
import { BentleyStatus } from "@itwin/core-bentley";
import type { ScreenViewport } from "@itwin/core-frontend";
import {
  IModelApp,
  NotifyMessageDetails,
  OutputMessagePriority,
  OutputMessageType,
} from "@itwin/core-frontend";
import type { XAndY } from "@itwin/core-geometry";
import { Rectangle } from "@itwin/core-react/internal";
import * as React from "react";
import { appUi, UiFramework } from "../UiFramework.js";
import { ChildWindowWidget } from "../childwindow/ChildWindowWidget.js";
import { TimeTracker } from "../configurableui/TimeTracker.js";
import type { ContentControl } from "../content/ContentControl.js";
import type { ContentGroup } from "../content/ContentGroup.js";
import { ContentGroupProvider } from "../content/ContentGroup.js";
import type { ContentLayoutDef } from "../content/ContentLayout.js";
import { InternalContentDialogManager } from "../dialog/InternalContentDialogManager.js";
import type { ChildWindowLocationProps } from "../framework/FrameworkChildWindows.js";
import type { NineZoneDispatch } from "../layout/base/NineZone.js";
import type { NineZoneState } from "../layout/state/NineZoneState.js";
import { NineZoneStateReducer } from "../layout/state/NineZoneStateReducer.js";
import {
  getTabLocation,
  isFloatingTabLocation,
  isPanelTabLocation,
  isPopoutTabLocation,
} from "../layout/state/TabLocation.js";
import {
  getWidgetLocation,
  isFloatingWidgetLocation,
  isPopoutWidgetLocation,
} from "../layout/state/WidgetLocation.js";
import type { PanelSide } from "../layout/widget-panels/PanelTypes.js";
import { panelSides } from "../layout/widget-panels/Panel.js";
import type { StagePanelConfig } from "../stagepanels/StagePanelConfig.js";
import { StagePanelDef } from "../stagepanels/StagePanelDef.js";
import { StagePanelLocation } from "../stagepanels/StagePanelLocation.js";
import { StagePanelState } from "../stagepanels/StagePanelState.js";
import type { WidgetConfig } from "../widgets/WidgetConfig.js";
import type { WidgetControl } from "../widgets/WidgetControl.js";
import { getWidgetState, WidgetDef, WidgetType } from "../widgets/WidgetDef.js";
import { WidgetState } from "../widgets/WidgetState.js";
import type { FrontstageProvider } from "./FrontstageProvider.js";
import { InternalFrontstageManager } from "./InternalFrontstageManager.js";
import { StageUsage } from "./StageUsage.js";
import type { Frontstage } from "./Frontstage.js";
import { UiItemsProvider } from "../ui-items-provider/UiItemsProvider.js";
import { FrameworkContent } from "../framework/FrameworkContent.js";
import type { SizeProps } from "../utils/SizeProps.js";
import type { RectangleProps } from "../utils/RectangleProps.js";

/** FrontstageDef class provides an API for a Frontstage.
 * @public
 */
export class FrontstageDef {
  private _id: string = "";
  private _initialConfig?: Frontstage;
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
  // eslint-disable-next-line deprecation/deprecation
  private _frontstageProvider?: FrontstageProvider;
  private _timeTracker = new TimeTracker();
  private _nineZoneState?: NineZoneState;
  private _contentGroupProvider?: ContentGroupProvider;
  // eslint-disable-next-line deprecation/deprecation
  private _floatingContentControls?: ContentControl[];
  private _toolAdminDefaultToolId?: string;
  private _dispatch?: NineZoneDispatch;
  private _batching = false;

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
  /** @deprecated in 4.17.0. Returns instances of a deprecated {@link ContentControl} type. */
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

  private populateStateMaps(nineZone: NineZoneState) {
    const panelMap = new Map<StagePanelDef, StagePanelState>();
    const widgetMap = new Map<WidgetDef, WidgetState>();

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
      const widgetState = getWidgetState(widgetDef.id, nineZone);
      widgetMap.set(widgetDef, widgetState);
    }
    return { panelMap, widgetMap };
  }

  private triggerStateChangeEvents(oldState: NineZoneState) {
    const newState = this.nineZoneState;
    if (!newState) return;

    if (this._isStageClosing || this._isApplicationClosing) return;

    const { panelMap, widgetMap } = this.populateStateMaps(oldState);
    const { panelMap: newPanelMap, widgetMap: newWidgetMap } =
      this.populateStateMaps(newState);

    // Now walk and trigger set state events
    newWidgetMap.forEach((newWidgetState, widgetDef) => {
      const originalState = widgetMap.get(widgetDef);
      if (originalState === newWidgetState) return;
      widgetDef.handleWidgetStateChanged(newWidgetState);
    });
    newPanelMap.forEach((newPanelState, panelDef) => {
      const originalState = panelMap.get(panelDef);
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

    if (this._batching) return;

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
          UiFramework.translate("widget.errorMessage.widgetPopoutFail"),
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
      const state = this.nineZoneState;
      if (!state) return;
      this.nineZoneState = NineZoneStateReducer(state, action);
    });
  }
  public set dispatch(dispatch: NineZoneDispatch) {
    this._dispatch = dispatch;
  }

  /** Dispatch multiple actions inside `fn`, but trigger events once.
   * @internal
   */
  public batch(fn: () => void): void {
    const initialState = this._nineZoneState;

    this._batching = true;
    fn();
    this._batching = false;

    const updatedState = this._nineZoneState;
    this._nineZoneState = initialState;
    this.nineZoneState = updatedState;
  }

  /** @internal */
  public get timeTracker(): TimeTracker {
    return this._timeTracker;
  }

  /** Creates a [[FrontstageDef]] and initializes it. */
  public static async create(
    // eslint-disable-next-line deprecation/deprecation
    providerOrFrontstage: FrontstageProvider | Frontstage
  ) {
    const def = new FrontstageDef();

    let config;
    if ("frontstageConfig" in providerOrFrontstage) {
      def._frontstageProvider = providerOrFrontstage;
      config = providerOrFrontstage.frontstageConfig();
    } else {
      config = providerOrFrontstage;
    }

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

    if (!this._contentGroup)
      // eslint-disable-next-line deprecation/deprecation
      throw new UiError(
        UiFramework.loggerCategory("FrontstageDef"),
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

    // eslint-disable-next-line deprecation/deprecation
    for (const control of this.contentControls) {
      control.onFrontstageDeactivated();
    }

    if (this.contentGroup) this.contentGroup.onFrontstageDeactivated();
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
    this._widgetControls.forEach((control) => {
      controlReadyPromises.push(control.isReady);
    });

    if (this.contentLayoutDef) {
      const usedContentIndexes = this.contentLayoutDef.getUsedContentIndexes();
      // eslint-disable-next-line deprecation/deprecation
      this.contentControls.forEach((control, index) => {
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

    // eslint-disable-next-line deprecation/deprecation
    for (const control of this.contentControls) {
      control.onFrontstageReady();
    }

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

  /** Sets the active view content to the default or first. */
  public async setActiveContent(): Promise<boolean> {
    const content = this.contentGroup?.contentPropsList?.[0];
    if (!content) return false;

    let contentReactNode = content.content;
    // eslint-disable-next-line deprecation/deprecation
    let control: ContentControl | undefined;
    if (!contentReactNode) {
      // eslint-disable-next-line deprecation/deprecation
      control = this.contentGroup.getContentControl(content, 0);
      contentReactNode = control?.reactNode;
    }

    if (!contentReactNode) return false;

    // eslint-disable-next-line deprecation/deprecation
    UiFramework.content.setActive(contentReactNode, true);
    if (!control?.viewport) return true;

    const status = await IModelApp.viewManager.setSelectedView(
      control.viewport
    );
    return status === BentleyStatus.SUCCESS;
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
  // eslint-disable-next-line deprecation/deprecation
  private get _widgetControls(): WidgetControl[] {
    // eslint-disable-next-line deprecation/deprecation
    const widgetControls = new Array<WidgetControl>();

    this.panelDefs.forEach((panelDef) => {
      panelDef.widgetDefs.forEach((widgetDef) => {
        // eslint-disable-next-line deprecation/deprecation
        const widgetControl = widgetDef.widgetControl;
        if (widgetControl) widgetControls.push(widgetControl);
      });
    });

    return widgetControls;
  }

  /** Initializes a FrontstageDef from frontstage.
   * @internal
   */
  public async initializeFromConfig(config: Frontstage): Promise<void> {
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
      // eslint-disable-next-line deprecation/deprecation
      panelDef.size = panelDef.initialConfig?.size;
      panelDef.sizeSpec = panelDef.initialConfig?.sizeSpec;
      panelDef.panelState = panelDef.defaultState;
      panelDef.pinned = panelDef.initialConfig?.pinned ?? true;
    }
    for (const widgetDef of this.widgetDefs) {
      widgetDef.setWidgetState(widgetDef.defaultState);
    }
    InternalFrontstageManager.onFrontstageRestoreLayoutEvent.emit({
      frontstageDef: this,
    });
  }

  public isPopoutWidget(widgetId: string) {
    if (this.nineZoneState) {
      const location = getTabLocation(this.nineZoneState, widgetId);
      if (location) return isPopoutTabLocation(location);
    }

    return false;
  }

  public isFloatingWidget(widgetId: string) {
    if (this.nineZoneState) {
      const location = getTabLocation(this.nineZoneState, widgetId);
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
      <ChildWindowWidget
        widgetContainerId={widgetContainerId}
        widgetDef={widgetDef}
      />
    );

    const popoutWidget = state.popoutWidgets.byId[location.popoutWidgetId];
    const bounds = Rectangle.create(popoutWidget.bounds);
    const position: ChildWindowLocationProps = {
      width: bounds.getWidth(),
      height: bounds.getHeight(),
      left: bounds.left,
      top: bounds.top,
    };

    const result = appUi.windowManager.openWindow({
      childWindowId: widgetContainerId,
      title: widgetDef.label,
      content: popoutContent,
      location: position,
      useDefaultPopoutUrl: UiFramework.useDefaultPopoutUrl,
    });

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
    childWindow: Window
  ) {
    const state = this.nineZoneState;
    if (!state) return;

    const location = getWidgetLocation(state, childWindowId);
    if (!location || !isPopoutWidgetLocation(location)) return;

    const widget = state.widgets[location.popoutWidgetId];
    const tabId = widget.tabs[0];
    const widgetDef = this.findWidgetDef(tabId);
    if (!widgetDef) return;

    this.dispatch({
      type: "WIDGET_TAB_SET_POPOUT_BOUNDS",
      id: tabId,
      position: {
        x: childWindow.screenLeft,
        y: childWindow.screenTop,
      },
      size: {
        height: childWindow.outerHeight,
        width: childWindow.outerWidth,
      },
      contentSize: {
        height: childWindow.innerHeight,
        width: childWindow.innerWidth,
      },
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
    if (location && isFloatingTabLocation(location)) {
      return location.floatingWidgetId;
    }
    return undefined;
  }

  public getFloatingWidgetContainerBounds(
    floatingWidgetId: string | undefined
  ) {
    if (!floatingWidgetId) return undefined;

    if (
      this.nineZoneState &&
      floatingWidgetId in this.nineZoneState.floatingWidgets.byId
    ) {
      const foundWidget = document.querySelector(
        `div.nz-widget-floatingWidget[data-widget-id='${floatingWidgetId}']`
      );
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

  /* eslint-disable deprecation/deprecation */

  /** @deprecated in 4.15.0. Use {@link FrontstageDef.id} to look up a frontstage. */
  public get frontstageProvider(): FrontstageProvider | undefined {
    return this._frontstageProvider;
  }

  /** Sets the active view content control.
   * @deprecated in 4.16.0. Uses a deprecated class {@link ContentControl}.
   */
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

  /** @deprecated in 4.16.0. Use {@link UiItemsProvider} to provide a floating widget. */
  public addFloatingContentControl(contentControl?: ContentControl) {
    if (!contentControl) return;
    if (!this._floatingContentControls)
      // eslint-disable-next-line deprecation/deprecation
      this._floatingContentControls = new Array<ContentControl>();

    this._floatingContentControls.push(contentControl);
    UiFramework.content.onAvailableContentChangedEvent.emit({
      contentId: contentControl.uniqueId,
    });
  }

  /** @deprecated in 4.16.0. Unregister {@link UiItemsProvider} to remove a floating widget. */
  public dropFloatingContentControl(contentControl?: ContentControl) {
    if (!contentControl || !this._floatingContentControls) return;

    const index = this._floatingContentControls.indexOf(contentControl);
    if (index > -1) {
      this._floatingContentControls.splice(index, 1);
      UiFramework.content.onAvailableContentChangedEvent.emit({
        contentId: contentControl.uniqueId,
      });
    }
  }

  /** Gets the list of {@link ContentControl}s.
   * @deprecated in 4.16.0. Uses a deprecated class {@link ContentControl}.
   */
  public get contentControls(): ContentControl[] {
    const contentControls = new Array<ContentControl>();
    if (this.contentGroup) {
      contentControls.push(...this.contentGroup.getContentControls());
    }
    if (this._floatingContentControls) {
      contentControls.push(...this._floatingContentControls);
    }
    return contentControls;
  }

  /** Sets the active view content control based on the selected viewport.
   * @deprecated in 4.16.0. Use {@link FrameworkContent.setActiveId} instead.
   */
  public setActiveViewFromViewport(viewport: ScreenViewport): boolean {
    // eslint-disable-next-line deprecation/deprecation
    const contentControl = this.contentControls.find(
      (control) => control.viewport === viewport
    );
    if (contentControl) {
      // eslint-disable-next-line deprecation/deprecation
      UiFramework.content.setActive(contentControl.reactNode, true);
      return true;
    }

    return false;
  }

  /* eslint-enable deprecation/deprecation */
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
  frontstage: Frontstage,
  location: StagePanelLocation
): StagePanelDef {
  const config = getStagePanel(location, frontstage);

  const panelDef = new StagePanelDef();
  panelDef.initializeFromConfig(config, location);
  return panelDef;
}

function getStagePanel(
  location: StagePanelLocation,
  config: Frontstage
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
  const id = React.useMemo(() => (def ? def.id : ""), [def]);
  return id;
};

/** Hook to return the active Frontstage def.
 * @public
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
