/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Frontstage
 */

import { UiEvent } from "@itwin/appui-abstract";
import type { Draft } from "immer";
import { produce } from "immer";
import { UiFramework } from "../UiFramework.js";
import { InternalFrontstageManager } from "../frontstage/InternalFrontstageManager.js";
import type { NineZoneState } from "../layout/state/NineZoneState.js";
import type { PanelSide } from "../layout/widget-panels/PanelTypes.js";
import { WidgetDef } from "../widgets/WidgetDef.js";
import { WidgetHost } from "../widgets/WidgetHost.js";
import type {
  StagePanelConfig,
  StagePanelSectionConfig,
  StagePanelSizeSpec,
} from "./StagePanelConfig.js";
import { StagePanelLocation } from "./StagePanelLocation.js";
import { StagePanelSection } from "./StagePanelSection.js";
import { StagePanelState } from "./StagePanelState.js";

/** Panel state changed event args interface.
 * @public
 * @deprecated in 4.13.0. Event args are inferred from a listener. If explicit type is needed use a type helper.
 */
export interface PanelStateChangedEventArgs {
  panelDef: StagePanelDef;
  panelState: StagePanelState;
}

/** Panel state changed event class.
 * @beta
 * @deprecated in 4.13.0. This class should not be used by applications to instantiate objects.
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
export class PanelStateChangedEvent extends UiEvent<PanelStateChangedEventArgs> {}

/** @internal */
export interface PanelSizeChangedEventArgs {
  panelDef: StagePanelDef;
  size: number | undefined;
}

/** Panel pinned changed event args interface.
 * @public
 * @deprecated in 4.13.0. Event args are inferred from a listener. If explicit type is needed use a type helper.
 */
export interface PanelPinnedChangedEventArgs {
  panelDef: StagePanelDef;
  pinned: boolean;
}

/**
 * A StagePanelDef represents each Stage Panel within a Frontstage.
 * @public
 */
export class StagePanelDef extends WidgetHost {
  private _initialConfig?: StagePanelConfig;
  private _location: StagePanelLocation = StagePanelLocation.Left;
  private _start = new StagePanelSectionDef();
  private _end = new StagePanelSectionDef();

  /** Constructor for PanelDef. */
  constructor() {
    super();
  }

  /** @internal */
  public static create(config: StagePanelConfig, location: StagePanelLocation) {
    const def = new StagePanelDef();
    def.initializeFromConfig(config, location);
    return def;
  }

  /** @internal */
  public initializeFromConfig(
    config: StagePanelConfig | undefined,
    location: StagePanelLocation
  ) {
    this._location = location;
    this._initialConfig = config;
    this._start.initializeFromConfig(config?.sections?.start);
    this._end.initializeFromConfig(config?.sections?.end);
  }

  /** @internal */
  public get initialConfig() {
    return this._initialConfig;
  }

  /** Current size of the panel.
   * @deprecated in 4.12.0. Use {@link StagePanelDef.sizeSpec} instead.
   */
  public get size(): number | undefined {
    const frontstageDef = UiFramework.frontstages.activeFrontstageDef;
    const state = frontstageDef?.nineZoneState;
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    if (!state) return this.initialConfig?.size;

    const side = toPanelSide(this.location);
    const panel = state.panels[side];
    return panel.size;
  }

  public set size(size) {
    const frontstageDef = UiFramework.frontstages.activeFrontstageDef;
    if (!frontstageDef) return;

    const side = toPanelSide(this.location);
    frontstageDef.dispatch({
      type: "PANEL_SET_SIZE",
      side,
      size,
    });
  }

  /** Current size of the panel */
  public get sizeSpec(): StagePanelSizeSpec | undefined {
    const frontstageDef = UiFramework.frontstages.activeFrontstageDef;
    const state = frontstageDef?.nineZoneState;
    if (!state) return this.initialConfig?.sizeSpec;

    const side = toPanelSide(this.location);
    const panel = state.panels[side];
    return panel.size;
  }

  public set sizeSpec(size) {
    const frontstageDef = UiFramework.frontstages.activeFrontstageDef;
    if (!frontstageDef) return;

    const side = toPanelSide(this.location);
    frontstageDef.dispatch({
      type: "PANEL_SET_SIZE",
      side,
      size,
    });
  }

  /** @internal */
  public handleSizeChanged(size: number | undefined) {
    InternalFrontstageManager.onPanelSizeChangedEvent.emit({
      panelDef: this,
      size,
    });
  }

  /** Indicates whether the panel is resizable. */
  public get resizable(): boolean {
    return this.defaultResizable;
  }

  /** Indicates whether the panel is pinned. */
  public get pinned(): boolean {
    const frontstageDef = UiFramework.frontstages.activeFrontstageDef;
    const state = frontstageDef?.nineZoneState;
    if (!state) return this.defaultPinned;

    const side = toPanelSide(this.location);
    const panel = state.panels[side];
    return panel.pinned;
  }

  public set pinned(pinned: boolean) {
    const frontstageDef = UiFramework.frontstages.activeFrontstageDef;
    if (!frontstageDef) return;

    const side = toPanelSide(this.location);
    frontstageDef.dispatch({
      type: "PANEL_SET_PINNED",
      side,
      pinned,
    });
  }

  /** @internal */
  public handlePinnedChanged(pinned: boolean) {
    UiFramework.frontstages.onPanelPinnedChangedEvent.emit({
      panelDef: this,
      pinned,
    });
  }

  /** Location of panel. */
  public get location(): StagePanelLocation {
    return this._location;
  }

  /** Panel state. Defaults to PanelState.Open. */
  public get panelState(): StagePanelState {
    const frontstageDef = UiFramework.frontstages.activeFrontstageDef;
    const state = frontstageDef?.nineZoneState;
    if (!state) return this.defaultState;
    const side = toPanelSide(this.location);
    return getPanelState(state, side);
  }

  public set panelState(panelState: StagePanelState) {
    const frontstageDef = UiFramework.frontstages.activeFrontstageDef;
    if (!frontstageDef) return;

    const side = toPanelSide(this.location);
    const collapsed = panelState === StagePanelState.Open ? false : true;
    frontstageDef.dispatch({
      type: "PANEL_SET_COLLAPSED",
      collapsed,
      side,
    });
  }

  /** @internal */
  public handlePanelStateChanged(panelState: StagePanelState) {
    UiFramework.frontstages.onPanelStateChangedEvent.emit({
      panelDef: this,
      panelState,
    });
  }

  /** @internal */
  public get defaultState() {
    const defaultState = this._initialConfig?.defaultState;
    return defaultState ?? StagePanelState.Open;
  }

  /** @internal */
  public get defaultPinned() {
    return this._initialConfig?.pinned ?? true;
  }

  /** @internal */
  public get defaultResizable() {
    return this._initialConfig?.resizable ?? true;
  }

  /** Gets the list of Widgets. */
  public override get widgetDefs(): ReadonlyArray<WidgetDef> {
    return [
      ...super.widgetDefs,
      ...this._start.widgetDefs,
      ...this._end.widgetDefs,
    ];
  }

  public override updateDynamicWidgetDefs(
    stageId: string,
    stageUsage: string,
    location: StagePanelLocation,
    _section: StagePanelSection | undefined,
    allStageWidgetDefs: WidgetDef[]
  ) {
    this._start.updateDynamicWidgetDefs(
      stageId,
      stageUsage,
      location,
      StagePanelSection.Start,
      allStageWidgetDefs
    );
    this._end.updateDynamicWidgetDefs(
      stageId,
      stageUsage,
      location,
      StagePanelSection.End,
      allStageWidgetDefs
    );
  }

  /** @internal */
  public getPanelSectionDef(section: StagePanelSection) {
    switch (section) {
      case StagePanelSection.Start: {
        return this._start;
      }
      case StagePanelSection.End: {
        return this._end;
      }
    }
  }
}

/** @internal */
export class StagePanelSectionDef extends WidgetHost {
  /** @internal */
  public initializeFromConfig(config: StagePanelSectionConfig | undefined) {
    config?.forEach((widgetConfig) => {
      const widgetDef = WidgetDef.create(widgetConfig);
      this.addWidgetDef(widgetDef);
    });
  }
}

/** @internal */
export function toPanelSide(location: StagePanelLocation): PanelSide {
  switch (location) {
    case StagePanelLocation.Bottom:
      return "bottom";
    case StagePanelLocation.Left:
      return "left";
    case StagePanelLocation.Right:
      return "right";
    case StagePanelLocation.Top:
      return "top";
  }
}

/** @internal */
export const setPanelPinned: (
  nineZone: NineZoneState,
  side: PanelSide,
  pinned: boolean
) => NineZoneState = produce(
  (nineZone: Draft<NineZoneState>, side: PanelSide, pinned: boolean) => {
    const panel = nineZone.panels[side];
    panel.pinned = pinned;
  }
);

/** @internal */
export function getPanelState(state: NineZoneState, side: PanelSide) {
  const panel = state.panels[side];
  return panel.collapsed ? StagePanelState.Minimized : StagePanelState.Open;
}
