/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Frontstage
 */

import produce, { Draft } from "immer";
import { StagePanelLocation, StagePanelSection, UiEvent } from "@itwin/appui-abstract";
import { NineZoneState, PanelSide } from "@itwin/appui-layout-react";
import { FrontstageManager } from "../frontstage/FrontstageManager";
import { WidgetDef } from "../widgets/WidgetDef";
import { WidgetHost } from "../widgets/WidgetHost";
import { PanelSectionProps, StagePanelMaxSizeSpec, StagePanelProps } from "./StagePanel";
import { getStableWidgetProps } from "../widgets/WidgetManager";

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
  private _applicationData?: any;
  private _location: StagePanelLocation = StagePanelLocation.Left;
  private _start = new PanelSectionDef();
  private _end = new PanelSectionDef();

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
    if (FrontstageManager.activeFrontstageDef) {
      const [_, size] = FrontstageManager.activeFrontstageDef.getPanelCurrentState(this);
      return size;
    }
    // istanbul ignore next
    return this._defaultSize;
  }

  public set size(size) {
    if (this._size === size)
      return;

    // istanbul ignore else
    const frontstageDef = FrontstageManager.activeFrontstageDef;
    // istanbul ignore else
    if (frontstageDef && frontstageDef.nineZoneState) {
      const side = toPanelSide(this.location);
      frontstageDef.nineZoneState = setPanelSize(frontstageDef.nineZoneState, side, size);
      const panel = frontstageDef.nineZoneState.panels[side];
      if (panel.size === this._size)
        return;
      size = panel.size;
    }
    this._size = size;
    FrontstageManager.onPanelSizeChangedEvent.emit({
      panelDef: this,
      size,
    });
  }

  /** Indicates whether the panel is resizable. */
  // istanbul ignore next
  public get resizable(): boolean { return this._resizable; }

  /** Indicates whether the panel is pinned. */
  public get pinned(): boolean { return this._pinned; }

  /** Any application data to attach to this Panel. */
  public get applicationData(): any | undefined { return this._applicationData; }
  /** Location of panel. */
  public get location(): StagePanelLocation { return this._location; }

  /** Panel state. Defaults to PanelState.Open. */
  public get panelState() {
    // istanbul ignore else
    if (FrontstageManager.activeFrontstageDef) {
      const [state] = FrontstageManager.activeFrontstageDef?.getPanelCurrentState(this);
      return state;
    }
    // istanbul ignore next
    return this.defaultState;
  }

  public set panelState(panelState: StagePanelState) {
    if (panelState === this._panelState)
      return;
    const frontstageDef = FrontstageManager.activeFrontstageDef;
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
    FrontstageManager.onPanelStateChangedEvent.emit({
      panelDef: this,
      panelState,
    });
  }

  /** @internal */
  public get defaultState() { return this._defaultState; }

  /** @internal */
  public get defaultSize() { return this._defaultSize; }

  /** @internal */
  public initializeFromProps(props?: StagePanelProps, location?: StagePanelLocation): void {
    if (location !== undefined)
      this._location = location;
    if (!props)
      return;
    this._size = props.size;
    this._defaultSize = props.size;
    this._maxSizeSpec = props.maxSize;
    this._minSize = props.minSize;
    if (props.defaultState !== undefined) {
      this._panelState = props.defaultState;
      this._defaultState = props.defaultState;
    }
    this._resizable = props.resizable ?? true;
    if (props.pinned !== undefined)
      this._pinned = props.pinned;
    this._applicationData = props.applicationData;

    const sections = props.sections;
    this._start.initializeFromProps(sections?.start, this._location, StagePanelSection.Start);
    this._end.initializeFromProps(sections?.end, this._location, StagePanelSection.End);
  }

  /** Gets the list of Widgets. */
  public override get widgetDefs(): ReadonlyArray<WidgetDef> {
    return [...super.widgetDefs, ...this._start.widgetDefs, ...this._end.widgetDefs];
  }

  /** @internal */
  public override updateDynamicWidgetDefs(stageId: string, stageUsage: string, location: StagePanelLocation, _section: StagePanelSection | undefined,
    allStageWidgetDefs: WidgetDef[], frontstageApplicationData?: any,
  ) {
    this._start.updateDynamicWidgetDefs(stageId, stageUsage, location, StagePanelSection.Start, allStageWidgetDefs, frontstageApplicationData);
    this._end.updateDynamicWidgetDefs(stageId, stageUsage, location, StagePanelSection.End, allStageWidgetDefs, frontstageApplicationData);
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
export class PanelSectionDef extends WidgetHost {
  /** @internal */
  public initializeFromProps(props: PanelSectionProps | undefined, location: StagePanelLocation, section: StagePanelSection) {
    props?.widgets.forEach((widgetNode, index) => {
      const stableId = `uifw-ps-${StagePanelLocation[location]}-${section}-${index}`;
      const stableProps = getStableWidgetProps(widgetNode, stableId);
      const widgetDef = new WidgetDef(stableProps);
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
