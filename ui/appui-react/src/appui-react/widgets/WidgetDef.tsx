/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import type * as React from "react";
import type {
  ConditionalStringValue,
  StringGetter,
} from "@itwin/appui-abstract";
import { UiError, UiEvent } from "@itwin/appui-abstract";
import type { XAndY } from "@itwin/core-geometry";
import type { ConfigurableUiControlConstructor } from "../configurableui/ConfigurableUiControl.js";
import {
  ConfigurableCreateInfo,
  ConfigurableUiControlType,
} from "../configurableui/ConfigurableUiControl.js";
import { UiFramework } from "../UiFramework.js";
import { PropsHelper } from "../utils/PropsHelper.js";
import type { WidgetControl } from "./WidgetControl.js";
import type { BadgeType, IconSpec } from "@itwin/core-react";
import type { BadgeKind } from "@itwin/core-react/internal";
import { IconHelper } from "@itwin/core-react";
import type { WidgetConfig } from "./WidgetConfig.js";
import { WidgetState } from "./WidgetState.js";
import { StagePanelLocation } from "../stagepanels/StagePanelLocation.js";
import { StatusBarWidgetComposerControl } from "./StatusBarWidgetComposerControl.js";
import {
  getTabLocation,
  isFloatingTabLocation,
  isPanelTabLocation,
  isPopoutTabLocation,
} from "../layout/state/TabLocation.js";
import type { NineZoneState } from "../layout/state/NineZoneState.js";
import { IModelApp } from "@itwin/core-frontend";
import type { SizeProps } from "../utils/SizeProps.js";
import { Widget } from "./Widget.js";

/** Widget State Changed Event Args interface.
 * @public
 * @deprecated in 4.13.0. Event args are inferred from a listener. If explicit type is needed use a type helper.
 */
export interface WidgetStateChangedEventArgs {
  widgetDef: WidgetDef;
  widgetState: WidgetState;
}

/** Widget State Changed Event class.
 * @public
 * @deprecated in 4.13.0. This class should not be used by applications to instantiate objects.
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
export class WidgetStateChangedEvent extends UiEvent<WidgetStateChangedEventArgs> {}

/** Widget type enum.
 * @public
 */
export enum WidgetType {
  Tool,
  Navigation,
  Rectangular,
  ToolSettings,
  StatusBar,
}

// -----------------------------------------------------------------------------

/** A Widget Definition in the 9-Zone Layout system.
 * @public
 */
export class WidgetDef {
  private static _sId = 0;
  private _label: string | ConditionalStringValue | StringGetter = "";
  private _tooltip: string | ConditionalStringValue | StringGetter = "";
  private _widgetReactNode: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  private _widgetControl!: WidgetControl;
  private _defaultState: WidgetState = WidgetState.Closed;
  private _id: string;
  private _priority: number = 0;
  private _stateChanged: boolean = false;
  private _widgetType: WidgetType = WidgetType.Rectangular;
  private _applicationData?: any;
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  private _iconSpec?: IconSpec;
  private _internalData?: Map<string, any>;
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  private _badge?: BadgeType;
  private _badgeKind?: BadgeKind;
  private _saveTransientState?: () => void;
  private _restoreTransientState?: () => boolean;
  private _preferredPanelSize: "fit-content" | undefined;
  private _defaultFloatingSize: SizeProps | undefined;
  private _canPopout?: boolean;
  private _floatingContainerId?: string;
  private _defaultFloatingPosition: XAndY | undefined;

  private _hideWithUiWhenFloating?: boolean;
  private _allowedPanelTargets?: ReadonlyArray<StagePanelLocation>;
  private _initialConfig?: WidgetConfig;

  public get state(): WidgetState {
    const frontstageDef = UiFramework.frontstages.activeFrontstageDef;
    const nineZone = frontstageDef?.nineZoneState;
    if (!nineZone) return this.defaultState;
    if (!frontstageDef.findWidgetDef(this.id)) return this.defaultState;
    return getWidgetState(this.id, nineZone);
  }

  public get id(): string {
    return this._id;
  }

  public get priority(): number {
    return this._priority;
  }

  public get isFloatingStateSupported(): boolean {
    if (!this.initialConfig) return true;

    const allowedPanels = this.initialConfig.allowedPanels;
    if (allowedPanels && allowedPanels.length === 0) {
      return true;
    }

    const canFloat = this.initialConfig.canFloat;
    if (canFloat === undefined) return true;
    return !!canFloat;
  }

  public get isFloatingStateWindowResizable(): boolean {
    const canFloat = this.initialConfig?.canFloat;
    if (typeof canFloat === "object") {
      return canFloat.isResizable === undefined ? true : canFloat.isResizable;
    }

    return true;
  }

  public get isToolSettings(): boolean {
    return this._widgetType === WidgetType.ToolSettings;
  }
  public get isStatusBar(): boolean {
    return this._widgetType === WidgetType.StatusBar;
  }
  public get stateChanged(): boolean {
    return this._stateChanged;
  }
  public get applicationData(): any {
    return this._applicationData;
  }
  public get isFloating(): boolean {
    return this.state === WidgetState.Floating;
  }

  /** @deprecated in 4.16.0. Use {@link Widget.iconNode} instead. */
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  public get iconSpec(): IconSpec {
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    return this._iconSpec === IconHelper.reactIconKey
      ? IconHelper.getIconReactNode(this._iconSpec, this._internalData) // eslint-disable-line @typescript-eslint/no-deprecated
      : this._iconSpec;
  }

  // eslint-disable-next-line @typescript-eslint/no-deprecated
  public set iconSpec(spec: IconSpec) {
    // Setter is deprecated as well: ae-setter-with-docs.
    this._iconSpec = this._internalData
      ? IconHelper.getIconData(spec, this._internalData) // eslint-disable-line @typescript-eslint/no-deprecated
      : spec;
  }
  /** @deprecated in 4.16.0. Use `badgeKind` instead. */
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  public get badgeType(): BadgeType | undefined {
    return this._badge;
  }
  public get badgeKind(): BadgeKind | undefined {
    return this._badgeKind;
  }
  public get initialConfig(): WidgetConfig | undefined {
    return this._initialConfig;
  }

  public get widgetType(): WidgetType {
    return this._widgetType;
  }
  public set widgetType(type: WidgetType) {
    this._widgetType = type;
  }

  /** @internal */
  public get defaultFloatingPosition() {
    return this._defaultFloatingPosition;
  }
  public set defaultFloatingPosition(position: XAndY | undefined) {
    this._defaultFloatingPosition = position;
  }

  /** @internal */
  public get defaultFloatingSize() {
    return this._defaultFloatingSize;
  }
  public set defaultFloatingSize(size: SizeProps | undefined) {
    this._defaultFloatingSize = size;
  }

  public get defaultState() {
    return this._defaultState;
  }

  constructor() {
    WidgetDef._sId++;
    this._id = `Widget-${WidgetDef._sId}`;
  }

  /** @internal */
  public static create(
    config: WidgetConfig,
    type: WidgetType = WidgetType.Rectangular
  ) {
    const def = new WidgetDef();
    def.initializeFromConfig(config, type);
    return def;
  }

  private initializeFromConfig(config: WidgetConfig, type: WidgetType) {
    this._widgetType = type;
    this._initialConfig = config;
    this._id = config.id;

    if (config.label) this._label = config.label;
    else if (config.labelKey)
      this._label = IModelApp.localization.getLocalizedString(config.labelKey);
    else if (type === WidgetType.ToolSettings) this._label = "Tool Settings";

    this.setCanPopout(config.canPopout);

    const canFloat = config.canFloat;
    if (typeof canFloat === "object") {
      this.setFloatingContainerId(canFloat.containerId);
      this.defaultFloatingPosition = canFloat.defaultPosition;
      this._hideWithUiWhenFloating = !!canFloat.hideWithUi;
      this._defaultFloatingSize = canFloat.defaultSize;
    }

    if ("allowedPanels" in config) {
      this.allowedPanelTargets = config.allowedPanels;
    } else if (type === WidgetType.ToolSettings)
      this.allowedPanelTargets = [
        StagePanelLocation.Bottom,
        StagePanelLocation.Left,
        StagePanelLocation.Right,
      ];

    if (config.priority !== undefined) this._priority = config.priority;

    if (config.tooltip) this.setTooltip(config.tooltip);
    else if (config.tooltipKey)
      this._tooltip = IModelApp.localization.getLocalizedString(
        config.tooltipKey
      );

    if (config.defaultState !== undefined) {
      this._defaultState = config.defaultState;
    }

    if (
      config.allowedPanels &&
      config.allowedPanels.length === 0 &&
      config.defaultState === WidgetState.Open
    ) {
      this._defaultState = WidgetState.Floating;
    }

    this._widgetReactNode = config.content;
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    this._iconSpec = config.iconNode ?? config.icon;
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    this._badge = config.badge;
    this._badgeKind = config.badgeKind;

    this._preferredPanelSize = config.preferredPanelSize;
  }

  /** @alpha */
  public get preferredPanelSize() {
    return this._preferredPanelSize;
  }

  /** Get the label string */
  public get label(): string {
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    return PropsHelper.getStringFromSpec(this._label);
  }

  /** Set the label.
   * @param labelSpec A string or a function to get the string.
   */
  public setLabel(labelSpec: string | ConditionalStringValue | StringGetter) {
    this._label = labelSpec; // TODO: handle ConditionalStringValue

    const frontstageDef = UiFramework.frontstages.activeFrontstageDef;
    if (!frontstageDef) return;

    // eslint-disable-next-line @typescript-eslint/no-deprecated
    const label = PropsHelper.getStringFromSpec(labelSpec);
    frontstageDef.dispatch({
      type: "WIDGET_TAB_SET_LABEL",
      id: this.id,
      label,
    });
  }

  /** Get the tooltip string */
  public get tooltip(): string {
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    return PropsHelper.getStringFromSpec(this._tooltip);
  }

  /** Set the tooltip.
   * @param v A string or a function to get the string.
   */
  public setTooltip(v: string | ConditionalStringValue | StringGetter) {
    this._tooltip = v;
  }

  public get reactNode(): React.ReactNode {
    if (!this._widgetReactNode) {
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      const widgetControl = this.getWidgetControl(
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        ConfigurableUiControlType.Widget
      );

      if (widgetControl && widgetControl.reactNode)
        this._widgetReactNode = widgetControl.reactNode;
    }

    return this._widgetReactNode;
  }

  public set reactNode(node: React.ReactNode) {
    this._widgetReactNode = node;
  }

  public setWidgetState(newState: WidgetState): void {
    const frontstageDef = UiFramework.frontstages.activeFrontstageDef;
    const nineZone = frontstageDef?.nineZoneState;
    if (!nineZone || this.isStatusBar) return;
    if (!frontstageDef.findWidgetDef(this.id)) return;

    switch (newState) {
      case WidgetState.Closed: {
        frontstageDef.dispatch({
          type: "WIDGET_TAB_CLOSE",
          id: this.id,
        });
        break;
      }
      case WidgetState.Floating: {
        frontstageDef.dispatch({
          type: "WIDGET_TAB_FLOAT",
          id: this.id,
          position: this._defaultFloatingPosition,
        });
        break;
      }
      case WidgetState.Hidden: {
        frontstageDef.dispatch({
          type: "WIDGET_TAB_HIDE",
          id: this.id,
        });
        break;
      }
      case WidgetState.Open: {
        frontstageDef.dispatch({
          type: "WIDGET_TAB_OPEN",
          id: this.id,
        });
        break;
      }
      case WidgetState.Unloaded: {
        frontstageDef.dispatch({
          type: "WIDGET_TAB_UNLOAD",
          id: this.id,
        });
        break;
      }
    }
  }

  /** @internal */
  public handleWidgetStateChanged(newState: WidgetState) {
    this._stateChanged = true;
    UiFramework.frontstages.onWidgetStateChangedEvent.emit({
      widgetDef: this,
      widgetState: newState,
    });
    this.onWidgetStateChanged();
  }

  public setCanPopout(value: boolean | undefined) {
    this._canPopout = value;
  }

  public get canPopout(): boolean | undefined {
    return this._canPopout;
  }

  public setFloatingContainerId(value: string | undefined) {
    this._floatingContainerId = value;
  }

  public get floatingContainerId(): string | undefined {
    return this._floatingContainerId;
  }

  public canOpen(): boolean {
    return this.isFloating || this.isActive;
  }

  public get isVisible(): boolean {
    return (
      WidgetState.Hidden !== this.state && WidgetState.Unloaded !== this.state
    );
  }

  public get activeState(): WidgetState {
    return this.state;
  }

  public get isActive(): boolean {
    return WidgetState.Open === this.activeState;
  }

  public set hideWithUiWhenFloating(hide: boolean | undefined) {
    this._hideWithUiWhenFloating = !!hide;
  }

  public get hideWithUiWhenFloating(): boolean {
    return !!this._hideWithUiWhenFloating;
  }

  public get allowedPanelTargets():
    | ReadonlyArray<StagePanelLocation>
    | undefined {
    return this._allowedPanelTargets;
  }

  public set allowedPanelTargets(
    targets: ReadonlyArray<StagePanelLocation> | undefined
  ) {
    this._allowedPanelTargets = targets;
  }

  public onWidgetStateChanged(): void {
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    this.widgetControl && this.widgetControl.onWidgetStateChanged();
  }

  /** Overwrite to save transient DOM state (i.e. scroll offset). */
  public saveTransientState(): void {
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    this.widgetControl && this.widgetControl.saveTransientState();
    this._saveTransientState && this._saveTransientState();
  }

  /** Overwrite to restore transient DOM state.
   * @note Return true if the state is restored or the Widget will remount.
   */
  public restoreTransientState(): boolean {
    let result = true;
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    if (this.widgetControl || this._restoreTransientState) {
      let result1 = false,
        result2 = false;
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      if (this.widgetControl)
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        result1 = this.widgetControl.restoreTransientState();
      if (this._restoreTransientState) result2 = this._restoreTransientState();
      result = !(result1 || result2);
    }
    return result;
  }

  /** Opens the widget and makes it visible to the user.
   * @note Opens the stage panel if needed.
   * @note Brings the floating widget to the front.
   * @note Brings the window of the popout widget to the front (if allowed by the browser).
   * @public
   */
  public show() {
    const frontstageDef = UiFramework.frontstages.activeFrontstageDef;
    const nineZone = frontstageDef?.nineZoneState;
    if (!nineZone) return;
    if (!frontstageDef.findWidgetDef(this.id)) return;

    const tabLocation = getTabLocation(nineZone, this.id);
    if (tabLocation && isPopoutTabLocation(tabLocation)) {
      const testWindow = UiFramework.childWindows.find(
        tabLocation.popoutWidgetId
      );
      // Try to bring the window of the popout widget to the front.
      testWindow?.window.focus();
    }

    frontstageDef.dispatch({
      type: "WIDGET_TAB_SHOW",
      id: this.id,
    });
  }

  /** Opens the widget and expands it to fill full size of the stage panel.
   * @public
   */
  public expand() {
    const frontstageDef = UiFramework.frontstages.activeFrontstageDef;
    const nineZone = frontstageDef?.nineZoneState;
    if (!nineZone) return;
    if (!frontstageDef.findWidgetDef(this.id)) return;

    frontstageDef.dispatch({
      type: "WIDGET_TAB_EXPAND",
      id: this.id,
    });
  }

  /* eslint-disable @typescript-eslint/no-deprecated */

  /** @deprecated in 4.16.0. Uses a deprecated type {@link ConfigurableUiControlConstructor}. */
  public get classId(): string | ConfigurableUiControlConstructor | undefined {
    return undefined;
  }

  /** @deprecated in 4.16.0. Returns an instance of a deprecated type {@link WidgetControl}. */
  public get widgetControl(): WidgetControl | undefined {
    return this._widgetControl;
  }

  /** @deprecated in 4.16.0. Returns an instance of a deprecated type {@link WidgetControl}. */
  public getWidgetControl(
    type: ConfigurableUiControlType
  ): WidgetControl | undefined {
    if (!this._widgetControl && this.classId) {
      let usedClassId: string = "";

      if (typeof this.classId === "string") {
        if (this.classId)
          this._widgetControl = UiFramework.controls.create(
            this.classId,
            this.id,
            this.applicationData
          ) as WidgetControl;
        usedClassId = this.classId;
      } else {
        const info = new ConfigurableCreateInfo(
          this.classId.name,
          this.id,
          this.id
        );
        usedClassId = this.classId.name;
        this._widgetControl = new this.classId(
          info,
          this.applicationData
        ) as WidgetControl;
      }

      if (this._widgetControl) {
        if (this._widgetControl.getType() !== type) {
          // eslint-disable-next-line @typescript-eslint/no-deprecated
          throw new UiError(
            UiFramework.loggerCategory("WidgetDef"),
            `getWidgetControl: '${usedClassId}' is NOT a ${type}; it is a ${this._widgetControl.getType()}`
          );
        }

        this._widgetControl.widgetDef = this;
        this._widgetControl.initialize();
      }
    }

    if (!this._widgetControl && this.isStatusBar) {
      const info = new ConfigurableCreateInfo(
        "StatusBarWidgetComposerControl",
        StatusBarWidgetComposerControl.controlId,
        StatusBarWidgetComposerControl.controlId
      );
      this._widgetControl = new StatusBarWidgetComposerControl(info, undefined);
      this._widgetControl.widgetDef = this;
      this._widgetControl.initialize();
    }

    return this._widgetControl;
  }

  /* eslint-enable @typescript-eslint/no-deprecated */
}

/** @internal */
export function getWidgetState(
  widgetId: WidgetDef["id"],
  nineZone: NineZoneState
) {
  const tab = nineZone.tabs[widgetId];
  if (tab && tab.unloaded) {
    return WidgetState.Unloaded;
  }

  if (nineZone.draggedTab?.tabId === widgetId) {
    return WidgetState.Closed;
  }

  const toolSettingsTabId = nineZone.toolSettings?.tabId;
  if (
    toolSettingsTabId === widgetId &&
    nineZone.toolSettings?.type === "docked"
  ) {
    return nineZone.toolSettings.hidden ? WidgetState.Hidden : WidgetState.Open;
  }

  const location = getTabLocation(nineZone, widgetId);
  if (!location) {
    return WidgetState.Hidden;
  }

  if (isFloatingTabLocation(location)) {
    return WidgetState.Floating;
  }

  if (isPanelTabLocation(location)) {
    const panel = nineZone.panels[location.side];
    if (panel.collapsed || undefined === panel.size || 0 === panel.size)
      return WidgetState.Closed;
  }

  const widget = nineZone.widgets[location.widgetId];
  if (widget.minimized || widgetId !== widget.activeTabId)
    return WidgetState.Closed;

  return WidgetState.Open;
}
