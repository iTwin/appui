/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Frontstage
 */

import produce, { Draft } from "immer";
import { UiEvent } from "@itwin/appui-abstract";
import { NineZoneState, PanelSide } from "@itwin/appui-layout-react";
import { WidgetDef } from "../widgets/WidgetDef";
import { WidgetHost } from "../widgets/WidgetHost";
import { StagePanelConfig, StagePanelMaxSizeSpec, StagePanelSectionConfig } from "./StagePanelConfig";
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

/** Panel State Changed Event Args interface.
 * @public
 */
export interface PanelStateChangedEventArgs {
  panelDef: StagePanelDef;
  panelState: StagePanelState;
}

/** Panel State Changed Event class.
 * @beta
 */
export class PanelStateChangedEvent extends UiEvent<PanelStateChangedEventArgs> { }

/** @internal */
export interface PanelSizeChangedEventArgs {
  panelDef: StagePanelDef;
  size: number | undefined;
}

/** @internal */
export class PanelSizeChangedEvent extends UiEvent<PanelSizeChangedEventArgs> { }

export interface PanelPinnedChangedEvent {
  panelDef: StagePanelDef;
  pinned: boolean;
}

/**
 * A StagePanelDef represents each Stage Panel within a Frontstage.
 * @public
 */
export class StagePanelDef extends WidgetHost {
  private _panelState = StagePanelState.Open;
  private _defaultState = StagePanelState.Open;
  private _maxSizeSpec: StagePanelMaxSizeSpec | undefined;
  private _minSize: number | undefined;
  private _size: number | undefined;
  private _defaultSize: number | undefined;
  private _resizable = true;
  private _pinned = true;
  private _location: StagePanelLocation = StagePanelLocation.Left;
  private _start = new StagePanelSectionDef();
  private _end = new StagePanelSectionDef();

  /** Constructor for PanelDef.
   */
  constructor() {
    super();
  }

  /** @internal */
  public get maxSizeSpec() { return this._maxSizeSpec; }

  /** @internal */
  public get minSize() { return this._minSize; }

  /** Default size of the panel */
  public get size() {
    // istanbul ignore else
    if (UiFramework.frontstages.activeFrontstageDef) {
      const [_, size] = UiFramework.frontstages.activeFrontstageDef.getPanelCurrentState(this);
      return size;
    }
    // istanbul ignore next
    return this._defaultSize;
  }

  public set size(size) {
    if (this._size === size)
      return;

    // istanbul ignore else
    const frontstageDef = UiFramework.frontstages.activeFrontstageDef;
    // istanbul ignore else
    if (frontstageDef && frontstageDef.nineZoneState) {
      const side = toPanelSide(this.location);
      frontstageDef.nineZoneState = setPanelSize(frontstageDef.nineZoneState, side, size);
    }
    this._size = size;
    InternalFrontstageManager.onPanelSizeChangedEvent.emit({
      panelDef: this,
      size,
    });
  }

  /** Indicates whether the panel is resizable. */
  // istanbul ignore next
  public get resizable(): boolean { return this._resizable; }

  /** Indicates whether the panel is pinned. */
  public get pinned(): boolean {
    if (UiFramework.frontstages.activeFrontstageDef) {
      const state = UiFramework.frontstages.activeFrontstageDef.getPanelCurrentState(this);
      return state[2];
    }
    // istanbul ignore next
    return false;
  }

  public set pinned(pinned: boolean) {
    if (this._pinned === pinned)
      return;

    // istanbul ignore else
    const frontstageDef = UiFramework.frontstages.activeFrontstageDef;
    // istanbul ignore else
    if (frontstageDef && frontstageDef.nineZoneState) {
      const side = toPanelSide(this.location);
      frontstageDef.nineZoneState = setPanelPinned(frontstageDef.nineZoneState, side, pinned);
    }
    this._pinned = pinned;
    UiFramework.frontstages.onPanelPinnedChangedEvent.emit({
      panelDef: this,
      pinned,
    });
  }

  /** Location of panel. */
  public get location(): StagePanelLocation { return this._location; }

  /** Panel state. Defaults to PanelState.Open. */
  public get panelState() {
    // istanbul ignore else
    if (UiFramework.frontstages.activeFrontstageDef) {
      const [state] = UiFramework.frontstages.activeFrontstageDef?.getPanelCurrentState(this);
      return state;
    }
    // istanbul ignore next
    return this.defaultState;
  }

  public set panelState(panelState: StagePanelState) {
    if (panelState === this._panelState)
      return;
    const frontstageDef = UiFramework.frontstages.activeFrontstageDef;
    if (frontstageDef && frontstageDef.nineZoneState) {
      const side = toPanelSide(this.location);
      frontstageDef.nineZoneState = produce(frontstageDef.nineZoneState, (nineZone) => {
        const panel = nineZone.panels[side];
        switch (panelState) {
          case StagePanelState.Minimized: {
            panel.collapsed = true;
            break;
          }
          case StagePanelState.Open: {
            panel.collapsed = false;
            break;
          }
          case StagePanelState.Off: {
            panel.collapsed = true;
            break;
          }
        }
      });
    }
    this._panelState = panelState;
    UiFramework.frontstages.onPanelStateChangedEvent.emit({
      panelDef: this,
      panelState,
    });
  }

  /** @internal */
  public get defaultState() { return this._defaultState; }

  /** @internal */
  public get defaultSize() { return this._defaultSize; }

  /** @internal */
  public static create(config: StagePanelConfig, location: StagePanelLocation) {
    const def = new StagePanelDef();
    def.initializeFromConfig(config, location);
    return def;
  }

  /** @internal */
  public initializeFromConfig(config: StagePanelConfig | undefined, location: StagePanelLocation): void {
    this._location = location;

    if (!config)
      return;
    this._size = config.size;
    this._defaultSize = config.size;
    this._maxSizeSpec = config.maxSize;
    this._minSize = config.minSize;
    if (config.defaultState !== undefined) {
      this._panelState = config.defaultState;
      this._defaultState = config.defaultState;
    }
    this._resizable = config.resizable ?? true;
    if (config.pinned !== undefined)
      this._pinned = config.pinned;

    const sections = config.sections;
    this._start.initializeFromConfig(sections?.start);
    this._end.initializeFromConfig(sections?.end);
  }

  /** Gets the list of Widgets. */
  public override get widgetDefs(): ReadonlyArray<WidgetDef> {
    return [...super.widgetDefs, ...this._start.widgetDefs, ...this._end.widgetDefs];
  }

  /** @internal */
  public override updateDynamicWidgetDefs(stageId: string, stageUsage: string, location: StagePanelLocation, _section: StagePanelSection | undefined,
    allStageWidgetDefs: WidgetDef[]) {
    this._start.updateDynamicWidgetDefs(stageId, stageUsage, location, StagePanelSection.Start, allStageWidgetDefs);
    this._end.updateDynamicWidgetDefs(stageId, stageUsage, location, StagePanelSection.End, allStageWidgetDefs);
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
export const setPanelSize = produce((
  nineZone: Draft<NineZoneState>,
  side: PanelSide,
  size: number | undefined,
) => {
  const panel = nineZone.panels[side];
  panel.size = size === undefined ? size : Math.min(Math.max(size, panel.minSize), panel.maxSize);
});

/** @internal */
export const setPanelPinned = produce((
  nineZone: Draft<NineZoneState>,
  side: PanelSide,
  pinned: boolean,
) => {
  const panel = nineZone.panels[side];
  panel.pinned = pinned;
});