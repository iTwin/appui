/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import * as React from "react";
import { AbstractWidgetProps, BadgeType, ConditionalStringValue, PointProps, StringGetter, UiError, UiEvent, WidgetState } from "@itwin/appui-abstract";
import { FloatingWidgetState, PanelSide } from "@itwin/appui-layout-react";
import { ConfigurableCreateInfo, ConfigurableUiControlConstructor, ConfigurableUiControlType } from "../configurableui/ConfigurableUiControl";
import { ConfigurableUiManager } from "../configurableui/ConfigurableUiManager";
import { FrontstageManager } from "../frontstage/FrontstageManager";
import { CommandItemDef } from "../shared/CommandItemDef";
import { ItemList } from "../shared/ItemMap";
import { UiFramework } from "../UiFramework";
import { PropsHelper } from "../utils/PropsHelper";
import { WidgetControl } from "./WidgetControl";
import { WidgetProps } from "./WidgetProps";
import { StatusBarWidgetComposerControl } from "./StatusBarWidgetComposerControl";
import { IconHelper, IconSpec, Rectangle, SizeProps } from "@itwin/core-react";

const widgetStateNameMap = new Map<WidgetState, string>([
  [WidgetState.Closed, "Closed"],
  [WidgetState.Floating, "Floating"],
  [WidgetState.Hidden, "Hidden"],
  [WidgetState.Open, "Open"],
  [WidgetState.Unloaded, "Unloaded"],
]);

/** Widget State Changed Event Args interface.
 * @public
 */
export interface WidgetStateChangedEventArgs {
  widgetDef: WidgetDef;
  widgetState: WidgetState;
}

/** Widget State Changed Event class.
 * @public
 */
export class WidgetStateChangedEvent extends UiEvent<WidgetStateChangedEventArgs> { }

/** @internal */
export interface WidgetChangedEventArgs {
  widgetDef: WidgetDef;
}

/** @internal */
export interface WidgetEventArgs {
  widgetDef: WidgetDef;
}

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

/** Properties for a Toolbar Widget.
 * @public
 */
export interface ToolbarWidgetProps extends WidgetProps {
  horizontalItems?: ItemList;
  verticalItems?: ItemList;
}

/** Properties for a Tool Widget.
 * @public
 */
export interface ToolWidgetProps extends ToolbarWidgetProps {
  appButton?: CommandItemDef;
}

/** Properties for a Navigation Widget.
 * @public
 */
export interface NavigationWidgetProps extends ToolbarWidgetProps {
  navigationAidId?: string;
}

/** Union of all Widget properties.
 * @public
 */
export type AnyWidgetProps = WidgetProps | ToolWidgetProps | NavigationWidgetProps;

/** Prototype for WidgetDef StateFunc (UI 1.0 only deprecate ???)
 * @public
 */
export type WidgetStateFunc = (state: Readonly<WidgetState>) => WidgetState;

/** @internal */
export interface TabLocation {
  widgetId: string;
  widgetIndex: number;
  side: PanelSide;
  tabIndex: number;
  floatingWidget?: FloatingWidgetState;
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
  private _widgetControl!: WidgetControl;
  private _defaultState: WidgetState = WidgetState.Unloaded;
  private _id: string;
  private _classId: string | ConfigurableUiControlConstructor | undefined = undefined;
  private _priority: number = 0;
  private _isFloatingStateSupported: boolean = false;
  private _isFloatingStateWindowResizable: boolean = true;
  private _stateChanged: boolean = false;
  private _widgetType: WidgetType = WidgetType.Rectangular;
  private _applicationData?: any;
  private _iconSpec?: string | ConditionalStringValue | React.ReactNode;
  private _internalData?: Map<string, any>;
  private _badgeType?: BadgeType;
  private _onWidgetStateChanged?: () => void;
  private _saveTransientState?: () => void;
  private _restoreTransientState?: () => boolean;
  private _preferredPanelSize: "fit-content" | undefined;
  private _defaultFloatingSize: SizeProps | undefined;
  private _canPopout?: boolean;
  private _floatingContainerId?: string;
  private _defaultFloatingPosition: PointProps | undefined;

  private _hideWithUiWhenFloating?: boolean;
  private _allowedPanelTargets?: ReadonlyArray<"left" | "right" | "bottom" | "top">;
  private _initialProps?: WidgetProps;

  private _tabLocation?: TabLocation;
  private _defaultTabLocation: TabLocation = {
    side: "left",
    tabIndex: 0,
    widgetId: "",
    widgetIndex: 0,
  };
  private _popoutBounds?: Rectangle;

  public get state(): WidgetState {
    const frontstageDef = FrontstageManager.activeFrontstageDef;
    if (frontstageDef && frontstageDef.findWidgetDef(this.id)) {
      const currentState = frontstageDef.getWidgetCurrentState(this);
      // istanbul ignore else
      if (undefined !== currentState)
        return currentState;
    }
    return this.defaultState;
  }

  public get id(): string { return this._id; }
  public get classId(): string | ConfigurableUiControlConstructor | undefined { return this._classId; }
  public get priority(): number { return this._priority; }
  public get isFloatingStateSupported(): boolean { return this._isFloatingStateSupported; }
  public get isFloatingStateWindowResizable(): boolean { return this._isFloatingStateWindowResizable; }
  public get isToolSettings(): boolean { return this._widgetType === WidgetType.ToolSettings; }
  public get isStatusBar(): boolean { return this._widgetType === WidgetType.StatusBar; }
  public get stateChanged(): boolean { return this._stateChanged; }
  public get applicationData(): any | undefined { return this._applicationData; }
  public get isFloating(): boolean { return this.state === WidgetState.Floating; }
  public get iconSpec(): IconSpec { return this._iconSpec === IconHelper.reactIconKey ? IconHelper.getIconReactNode(this._iconSpec, this._internalData) : this._iconSpec; }
  public set iconSpec(spec: IconSpec) { this._iconSpec = this._internalData ? IconHelper.getIconData(spec, this._internalData) : spec; }
  public get badgeType(): BadgeType | undefined { return this._badgeType; }
  public get initialProps(): WidgetProps | undefined { return this._initialProps; }

  public get widgetType(): WidgetType { return this._widgetType; }
  public set widgetType(type: WidgetType) { this._widgetType = type; }

  /** @internal */
  public get tabLocation() { return this._tabLocation; }
  public set tabLocation(tabLocation: TabLocation | undefined) { this._tabLocation = tabLocation; }

  /** @internal */
  public get defaultTabLocation() { return this._defaultTabLocation; }

  /** @internal */
  public get defaultFloatingPosition() { return this._defaultFloatingPosition; }
  public set defaultFloatingPosition(position: PointProps | undefined) { this._defaultFloatingPosition = position; }

  /** @internal */
  public get defaultFloatingSize() { return this._defaultFloatingSize; }
  public set defaultFloatingSize(size: SizeProps | undefined) { this._defaultFloatingSize = size; }

  /** @internal */
  public get defaultState() { return this._defaultState; }

  /** @internal */
  public get popoutBounds() { return this._popoutBounds; }
  public set popoutBounds(bounds: Rectangle | undefined) { this._popoutBounds = bounds; }

  constructor(widgetProps: WidgetProps, type?: WidgetType) {
    if (widgetProps.id !== undefined)
      this._id = widgetProps.id;
    else {
      WidgetDef._sId++;
      this._id = `Widget-${WidgetDef._sId}`;
    }

    if (type !== undefined)
      this._widgetType = type;

    this._initialProps = widgetProps;
    if (widgetProps.label)
      this.setLabel(widgetProps.label);
    else if (widgetProps.labelKey)
      this._label = UiFramework.localization.getLocalizedString(widgetProps.labelKey);

    this.setCanPopout(widgetProps.canPopout);
    this.setFloatingContainerId(widgetProps.floatingContainerId);
    this.defaultFloatingPosition = widgetProps.defaultFloatingPosition ? widgetProps.defaultFloatingPosition as PointProps : undefined;

    this._hideWithUiWhenFloating = !!widgetProps.hideWithUiWhenFloating;

    this.allowedPanelTargets = widgetProps.allowedPanelTargets;

    if (widgetProps.priority !== undefined)
      this._priority = widgetProps.priority;

    if (widgetProps.tooltip)
      this.setTooltip(widgetProps.tooltip);
    else if (widgetProps.tooltipKey)
      this._tooltip = UiFramework.localization.getLocalizedString(widgetProps.tooltipKey);

    if (widgetProps.control !== undefined)
      this._classId = widgetProps.control;
    else if (widgetProps.classId !== undefined)
      this._classId = widgetProps.classId;

    if (widgetProps.defaultState !== undefined) {
      this._defaultState = widgetProps.defaultState;
    }

    if (widgetProps.isFloatingStateSupported !== undefined)
      this._isFloatingStateSupported = widgetProps.isFloatingStateSupported;
    if (widgetProps.isFloatingStateWindowResizable !== undefined)
      this._isFloatingStateWindowResizable = widgetProps.isFloatingStateWindowResizable;

    if (widgetProps.applicationData !== undefined)
      this._applicationData = widgetProps.applicationData;

    if (widgetProps.element !== undefined)
      this._widgetReactNode = widgetProps.element;

    if (widgetProps.iconSpec !== undefined)
      this._iconSpec = widgetProps.iconSpec;
    if (widgetProps.internalData)
      this._internalData = widgetProps.internalData;
    // istanbul ignore next
    if (widgetProps.icon !== undefined && this._iconSpec === undefined)
      this._iconSpec = widgetProps.icon;

    if (widgetProps.badgeType !== undefined)
      this._badgeType = widgetProps.badgeType;

    this._preferredPanelSize = widgetProps.preferredPanelSize;
    this._defaultFloatingSize = widgetProps.defaultFloatingSize;
    this._onWidgetStateChanged = widgetProps.onWidgetStateChanged;
    this._saveTransientState = widgetProps.saveTransientState;
    this._restoreTransientState = widgetProps.restoreTransientState;
  }

  public static createWidgetPropsFromAbstractProps(abstractWidgetProps: AbstractWidgetProps): WidgetProps {
    const widgetProps: WidgetProps = abstractWidgetProps;
    widgetProps.element = abstractWidgetProps.getWidgetContent();
    return widgetProps;
  }

  /** @alpha */
  public get preferredPanelSize() {
    return this._preferredPanelSize;
  }

  /** Get the label string */
  public get label(): string {
    return PropsHelper.getStringFromSpec(this._label);
  }

  /** Set the label.
   * @param v A string or a function to get the string.
   */
  public setLabel(v: string | ConditionalStringValue | StringGetter) {
    if (this._label === v)
      return;
    this._label = v;
    FrontstageManager.onWidgetLabelChangedEvent.emit({ widgetDef: this });
  }

  /** Get the tooltip string */
  public get tooltip(): string {
    return PropsHelper.getStringFromSpec(this._tooltip);
  }

  /** Set the tooltip.
   * @param v A string or a function to get the string.
   */
  public setTooltip(v: string | ConditionalStringValue | StringGetter) {
    this._tooltip = v;
  }

  public get widgetControl(): WidgetControl | undefined {
    return this._widgetControl;
  }

  public getWidgetControl(type: ConfigurableUiControlType): WidgetControl | undefined {
    if (!this._widgetControl && this.classId) {
      let usedClassId: string = "";

      if (typeof this.classId === "string") {
        // istanbul ignore else
        if (this.classId)
          this._widgetControl = ConfigurableUiManager.createControl(this.classId, this.id, this.applicationData) as WidgetControl;
        usedClassId = this.classId;
      } else {
        const info = new ConfigurableCreateInfo(this.classId.name, this.id, this.id);
        usedClassId = this.classId.name;
        this._widgetControl = new this.classId(info, this.applicationData) as WidgetControl;
      }

      // istanbul ignore else
      if (this._widgetControl) {
        if (this._widgetControl.getType() !== type) {
          throw new UiError(UiFramework.loggerCategory(this), `getWidgetControl: '${usedClassId}' is NOT a ${type}; it is a ${this._widgetControl.getType()}`);
        }

        this._widgetControl.widgetDef = this;
        this._widgetControl.initialize();
      }
    }

    // istanbul ignore next - To avoid breaking API changes, if a WidgetControl is not specified for a status bar use Default one.
    if (!this._widgetControl && this.isStatusBar) {
      const info = new ConfigurableCreateInfo("StatusBarWidgetComposerControl", StatusBarWidgetComposerControl.controlId, StatusBarWidgetComposerControl.controlId);
      this._widgetControl = new StatusBarWidgetComposerControl(info, undefined);
      this._widgetControl.widgetDef = this;
      this._widgetControl.initialize();
    }

    return this._widgetControl;
  }

  public get reactNode(): React.ReactNode {
    if (!this._widgetReactNode) {
      const widgetControl = this.getWidgetControl(ConfigurableUiControlType.Widget);

      // istanbul ignore else
      if (widgetControl && widgetControl.reactNode)
        this._widgetReactNode = widgetControl.reactNode;
    }

    return this._widgetReactNode;
  }

  public set reactNode(node: React.ReactNode) {
    this._widgetReactNode = node;
  }

  public setWidgetState(newState: WidgetState): void {
    if (this.state === newState)
      return;
    this._stateChanged = true;
    FrontstageManager.onWidgetStateChangedEvent.emit({ widgetDef: this, widgetState: newState });
    this.onWidgetStateChanged();
  }

  public setCanPopout(value: boolean | undefined) {
    this._canPopout = value;
  }

  public get canPopout(): boolean | undefined {
    return (this._canPopout);
  }

  public setFloatingContainerId(value: string | undefined) {
    this._floatingContainerId = value;
  }

  public get floatingContainerId(): string | undefined {
    return (this._floatingContainerId);
  }

  public canOpen(): boolean {
    return (this.isFloating || this.isActive);
  }

  public get isVisible(): boolean {
    return WidgetState.Hidden !== this.state;
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

  public get allowedPanelTargets(): ReadonlyArray<"left" | "right" | "bottom" | "top"> | undefined {
    return this._allowedPanelTargets;
  }

  public set allowedPanelTargets(targets: ReadonlyArray<"left" | "right" | "bottom" | "top"> | undefined) {

    this._allowedPanelTargets = (targets && targets?.length > 0) ? targets : undefined;
  }

  public onWidgetStateChanged(): void {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this.widgetControl && UiFramework.postTelemetry(`Widget ${this.widgetControl.classId} state set to ${widgetStateNameMap.get(this.state)}`, "35402486-9839-441E-A5C7-46D546142D11");
    this.widgetControl && this.widgetControl.onWidgetStateChanged();
    // istanbul ignore next
    this._onWidgetStateChanged && this._onWidgetStateChanged();
  }

  /** Overwrite to save transient DOM state (i.e. scroll offset). */
  public saveTransientState(): void {
    this.widgetControl && this.widgetControl.saveTransientState();
    this._saveTransientState && this._saveTransientState();
  }

  /** Overwrite to restore transient DOM state.
   * @note Return true if the state is restored or the Widget will remount.
   */
  public restoreTransientState(): boolean {
    let result = true;
    if (this.widgetControl || this._restoreTransientState) {
      let result1 = false, result2 = false;
      if (this.widgetControl)
        result1 = this.widgetControl.restoreTransientState();
      if (this._restoreTransientState)
        result2 = this._restoreTransientState();
      result = !(result1 || result2);
    }
    return result;
  }

  /** Opens the widget and makes it visible to the user.
   * I.e. opens the stage panel or brings the floating widget to front of the screen.
   * @alpha
   */
  public show() {
    FrontstageManager.onWidgetShowEvent.emit({ widgetDef: this });
  }

  /** Opens the widget and expands it to fill full size of the stage panel.
   * @alpha
   */
  public expand() {
    FrontstageManager.onWidgetExpandEvent.emit({ widgetDef: this });
  }
}
