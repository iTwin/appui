/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Frontstage
 */

import * as React from "react";
import { StagePanelLocation } from "@bentley/ui-abstract";
import {
  NestedStagePanelKey, NestedStagePanelsManagerProps, NineZoneStagePanelManagerProps, StagePanelType as NZ_StagePanelType, WidgetZoneId,
  ZonesManagerWidgetsProps,
} from "@bentley/ui-ninezone";
import { StagePanelChangeHandler, WidgetChangeHandler, ZoneDefProvider } from "../frontstage/FrontstageComposer";
import { FrontstageManager } from "../frontstage/FrontstageManager";
import { WidgetProps } from "../widgets/WidgetProps";
import { WidgetTabs } from "../widgets/WidgetStack";
import { ZoneLocation } from "../zones/Zone";
import { FrameworkStagePanel } from "./FrameworkStagePanel";
import { PanelStateChangedEventArgs, StagePanelDef, StagePanelState as StagePanelState } from "./StagePanelDef";

/** Available StagePanel locations.
 * ------------------------------------------------------------------------------------
 * TopMost
 * ------------------------------------------------------------------------------------
 * Left     | Top                                                           | Right
 *          |---------------------------------------------------------------|
 *          | Nine-zone                                                     |
 *          |                                                               |
 *          |                                                               |
 *          |                                                               |
 *          |                                                               |
 *          |                                                               |
 *          |---------------------------------------------------------------|
 *          | Bottom                                                        |
 * ------------------------------------------------------------------------------------
 * BottomMost
 * ------------------------------------------------------------------------------------
 */

/** Properties of a Stage Panel Zone
 * @alpha
 */
export interface StagePanelZoneProps {
  /** Properties for the Widgets in this Zone. */
  widgets: Array<React.ReactElement<WidgetProps>>;
  /** Any application data to attach to this Zone. */
  applicationData?: any;
}

/** Properties of the Stage Panel Zones
 * @alpha
 */
export interface StagePanelZonesProps {
  /** Properties for the Widgets in the Start section. */
  start?: StagePanelZoneProps;
  /** Properties for the Widgets in the Middle section. */
  middle?: StagePanelZoneProps;
  /** Properties for the Widgets in the End section. */
  end?: StagePanelZoneProps;
}

/** Properties of a [[StagePanel]] component
 * @alpha
 */
export interface StagePanelProps {
  /** Describes which zones are allowed in this stage panel. */
  allowedZones?: ZoneLocation[];
  /** Any application data to attach to this Panel. */
  applicationData?: any;
  /** Default Panel state. Controls how the panel is initially displayed. Defaults to StagePanelState.Open. */
  defaultState?: StagePanelState;
  /** Stage panel header. */
  header?: React.ReactNode;
  /** Maximum size of the panel. */
  maxSize?: number;
  /** Minimum size of the panel. */
  minSize?: number;
  /** Indicates whether the panel is resizable. Defaults to true. */
  resizable: boolean;
  /** Default size of the panel. */
  size?: number;
  /** Properties for the Widgets in this Panel. */
  widgets?: Array<React.ReactElement<WidgetProps>>;

  /** Properties for the Panel Zones in this Panel. @alpha */
  panelZones?: StagePanelZonesProps;

  /** @internal */
  runtimeProps?: StagePanelRuntimeProps;
}

/** Default properties of [[StagePanel]] component.
 * @alpha
 */
export type StagePanelDefaultProps = Pick<StagePanelProps, "resizable">;

/** Runtime Properties for the [[StagePanel]] component.
 * @internal
 */
export interface StagePanelRuntimeProps {
  draggedWidgetId: WidgetZoneId | undefined;
  getWidgetContentRef: (id: WidgetZoneId) => React.Ref<HTMLDivElement>;
  isInFooterMode: boolean;
  isTargeted: boolean;
  panel: NineZoneStagePanelManagerProps;
  panelDef: StagePanelDef;
  stagePanelChangeHandler: StagePanelChangeHandler;
  widgetChangeHandler: WidgetChangeHandler;
  widgets: ZonesManagerWidgetsProps;
  widgetTabs: WidgetTabs;
  zoneDefProvider: ZoneDefProvider;
}

interface StagePanelComponentState {
  panelState: StagePanelState;
}

/** Frontstage Panel React component.
 * @alpha
 */
export class StagePanel extends React.Component<StagePanelProps, StagePanelComponentState> {
  public static readonly defaultProps: StagePanelDefaultProps = {
    resizable: true,
  };

  public constructor(props: StagePanelProps) {
    super(props);

    this.state = {
      panelState: this.props.runtimeProps?.panelDef.panelState || StagePanelState.Open,
    };
  }

  public static initializeStagePanelDef(panelDef: StagePanelDef, props: StagePanelProps, panelLocation: StagePanelLocation): void {
    panelDef.initializeFromProps(props, panelLocation);
  }

  public componentDidMount() {
    FrontstageManager.onPanelStateChangedEvent.addListener(this._handlePanelStateChangedEvent);
  }

  public componentWillUnmount() {
    FrontstageManager.onPanelStateChangedEvent.removeListener(this._handlePanelStateChangedEvent);
  }

  public render(): React.ReactNode {
    const { applicationData, defaultState, runtimeProps, size, ...props } = this.props;
    if (!runtimeProps)
      return null;

    const { stagePanelChangeHandler, panelDef, ...otherRuntimeProps } = runtimeProps;
    return (
      <FrameworkStagePanel
        changeHandler={stagePanelChangeHandler}
        initialSize={size}
        location={panelDef.location}
        renderPane={this._handleRenderPane}
        widgetCount={panelDef.widgetCount}
        panelState={this.state.panelState}
        {...props}
        {...otherRuntimeProps}
      />
    );
  }

  private _handleRenderPane = (index: number): React.ReactNode => {
    const runtimeProps = this.props.runtimeProps;
    if (!runtimeProps)
      return null;
    const widgetDef = runtimeProps.panelDef.widgetDefs[index];
    if (!widgetDef.isVisible)
      return null;
    return (
      <div
        key={`wd-${index}`}
        style={{
          height: "100%",
          display: runtimeProps.panel.isCollapsed ? "none" : "block",
        }}
      >
        {widgetDef.reactNode}
      </div>
    );
  }

  private _handlePanelStateChangedEvent = ({ panelDef, panelState }: PanelStateChangedEventArgs) => {
    if (panelDef !== this.props.runtimeProps?.panelDef)
      return;
    this.setState({
      panelState,
    });
  }
}

/** @internal */
export const getStagePanelType = (location: StagePanelLocation): NZ_StagePanelType => {
  switch (location) {
    case StagePanelLocation.Bottom:
    case StagePanelLocation.BottomMost:
      return NZ_StagePanelType.Bottom;
    case StagePanelLocation.Left:
      return NZ_StagePanelType.Left;
    case StagePanelLocation.Right:
      return NZ_StagePanelType.Right;
    case StagePanelLocation.Top:
    case StagePanelLocation.TopMost:
      return NZ_StagePanelType.Top;
  }
};

/** @internal */
export const getNestedStagePanelKey = (location: StagePanelLocation): NestedStagePanelKey<NestedStagePanelsManagerProps> => {
  switch (location) {
    case StagePanelLocation.Bottom:
      return {
        id: "inner",
        type: NZ_StagePanelType.Bottom,
      };
    case StagePanelLocation.BottomMost:
      return {
        id: "outer",
        type: NZ_StagePanelType.Bottom,
      };
    case StagePanelLocation.Left:
      return {
        id: "inner",
        type: NZ_StagePanelType.Left,
      };
    case StagePanelLocation.Right:
      return {
        id: "inner",
        type: NZ_StagePanelType.Right,
      };
    case StagePanelLocation.Top:
      return {
        id: "inner",
        type: NZ_StagePanelType.Top,
      };
    case StagePanelLocation.TopMost:
      return {
        id: "outer",
        type: NZ_StagePanelType.Top,
      };
  }
};
