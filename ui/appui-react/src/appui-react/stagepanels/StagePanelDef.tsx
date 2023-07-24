/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Frontstage
 */

import type { Draft } from "immer";
import produce from "immer";
import { UiEvent } from "@itwin/appui-abstract";
import {
  type NineZoneState,
  NineZoneStateReducer,
  type PanelSide,
} from "@itwin/appui-layout-react";
import { WidgetDef } from "../widgets/WidgetDef";
import { WidgetHost } from "../widgets/WidgetHost";
import type {
  StagePanelConfig,
  StagePanelSectionConfig,
} from "./StagePanelConfig";
import { StagePanelLocation } from "./StagePanelLocation";
import { StagePanelSection } from "./StagePanelSection";
import { InternalFrontstageManager } from "../frontstage/InternalFrontstageManager";
import { UiFramework } from "../UiFramework";

/** Enum for StagePanel state.
 * @public
 */
export enum StagePanelState {
  Off,
  Minimized,
  Open,
  Popup,
}

/** Panel state changed event args interface.
 * @public
 */
export interface PanelStateChangedEventArgs {
  panelDef: StagePanelDef;
  panelState: StagePanelState;
}

/** Panel state changed event class.
 * @beta
 */
export class PanelStateChangedEvent extends UiEvent<PanelStateChangedEventArgs> {}

/** @internal */
export interface PanelSizeChangedEventArgs {
  panelDef: StagePanelDef;
  size: number | undefined;
}

/** @internal */
export class PanelSizeChangedEvent extends UiEvent<PanelSizeChangedEventArgs> {}

/** Panel pinned changed event args interface.
 * @public
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

  /** Current size of the panel */
  public get size(): number | undefined {
    const frontstageDef = UiFramework.frontstages.activeFrontstageDef;
    if (!frontstageDef) return this.defaultSize;

    const [_, size] = frontstageDef.getPanelCurrentState(this);
    return size;
  }

  public set size(size) {
    const frontstageDef = UiFramework.frontstages.activeFrontstageDef;
    const state = frontstageDef?.nineZoneState;
    if (!state) return;

    const side = toPanelSide(this.location);
    frontstageDef.nineZoneState = NineZoneStateReducer(state, {
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
    return this._initialConfig?.resizable ?? true;
  }

  /** Indicates whether the panel is pinned. */
  public get pinned(): boolean {
    const frontstageDef = UiFramework.frontstages.activeFrontstageDef;
    if (!frontstageDef) return false;

    const state = frontstageDef.getPanelCurrentState(this);
    return state[2];
  }

  public set pinned(pinned: boolean) {
    const frontstageDef = UiFramework.frontstages.activeFrontstageDef;
    const state = frontstageDef?.nineZoneState;
    if (!state) return;

    const side = toPanelSide(this.location);
    frontstageDef.nineZoneState = NineZoneStateReducer(state, {
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
    if (!frontstageDef) return this.defaultState;
    const [state] = frontstageDef.getPanelCurrentState(this);
    return state;
  }

  public set panelState(panelState: StagePanelState) {
    const frontstageDef = UiFramework.frontstages.activeFrontstageDef;
    const state = frontstageDef?.nineZoneState;
    if (!state) return;

    const side = toPanelSide(this.location);
    const collapsed = panelState === StagePanelState.Open ? false : true;
    frontstageDef.nineZoneState = NineZoneStateReducer(state, {
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
  public get defaultSize() {
    return this._initialConfig?.size;
  }

  /** Gets the list of Widgets. */
  public override get widgetDefs(): ReadonlyArray<WidgetDef> {
    return [
      ...super.widgetDefs,
      ...this._start.widgetDefs,
      ...this._end.widgetDefs,
    ];
  }

  /** @internal */
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
