/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
/** @module Zone */

import * as React from "react";

import { ZoneState, ZoneDef } from "./ZoneDef";
import { WidgetDef } from "../widgets/WidgetDef";
import { ConfigurableUiControlType } from "../configurableui/ConfigurableUiControl";
import { FrameworkZone } from "./FrameworkZone";
import { StatusBarWidgetControl } from "../widgets/StatusBarWidgetControl";
import { WidgetProps } from "../widgets/Widget";
import { WidgetChangeHandler, TargetChangeHandler, ZoneDefProvider } from "../frontstage/FrontstageComposer";
import { ToolSettingsZone } from "./toolsettings/ToolSettingsZone";
import { StatusBarZone } from "./StatusBarZone";

import { isStatusZone, DropTarget, RectangleProps, ZoneManagerProps, ZonesManagerWidgets, WidgetZoneIndex, DraggingWidgetProps } from "@bentley/ui-ninezone";
import { CommonProps } from "@bentley/ui-core";

/** Enum for [[Zone]] Location.
 * @public
 */
export enum ZoneLocation {
  TopLeft = 1,
  TopCenter = 2,
  TopRight = 3,
  CenterLeft = 4,
  CenterRight = 6,
  BottomLeft = 7,
  BottomCenter = 8,
  BottomRight = 9,
}

/** Properties of a [[Zone]] component
 * @public
 */
export interface ZoneProps extends CommonProps {
  /** Default Zone state. Controls how the Zone is initially displayed. Defaults to ZoneState.Open. */
  defaultState?: ZoneState;
  /** Indicates if other Zones may be merged with this Zone. Defaults to false.  */
  allowsMerging?: boolean;
  /** Any application data to attach to this Zone. */
  applicationData?: any;
  /** Indicates with which other zone to merge. */
  mergeWithZone?: ZoneLocation;

  /** Properties for the Widgets in this Zone. */
  widgets?: Array<React.ReactElement<WidgetProps>>;

  /** @internal */
  runtimeProps?: ZoneRuntimeProps;
}

/** Runtime Properties for the [[Zone]] component.
 * @internal
 */
export interface ZoneRuntimeProps {
  draggingWidget: DraggingWidgetProps | undefined;
  getWidgetContentRef: (id: WidgetZoneIndex) => React.Ref<HTMLDivElement>;
  zoneDef: ZoneDef;
  zoneProps: ZoneManagerProps;
  widgetChangeHandler: WidgetChangeHandler;
  targetChangeHandler: TargetChangeHandler;
  zoneDefProvider: ZoneDefProvider;
  ghostOutline: RectangleProps | undefined;
  dropTarget: DropTarget;
  isHidden: boolean;
  widgets: ZonesManagerWidgets;
}

/** Zone React component.
 * A Zone is a standard area on the screen for users to read and interact with data applicable to the current task. Each Zone has a defined purpose.
 * @public
 */
export class Zone extends React.Component<ZoneProps> {

  constructor(props: ZoneProps) {
    super(props);
  }

  public static initializeZoneDef(zoneDef: ZoneDef, props: ZoneProps): void {
    if (props.defaultState)
      zoneDef.zoneState = props.defaultState;
    if (props.allowsMerging !== undefined)
      zoneDef.allowsMerging = props.allowsMerging;
    if (props.applicationData !== undefined)
      zoneDef.applicationData = props.applicationData;
    if (props.mergeWithZone !== undefined)
      zoneDef.mergeWithZone = props.mergeWithZone;

    // istanbul ignore else
    if (props.widgets) {
      props.widgets.forEach((widgetNode: React.ReactElement<WidgetProps>) => {
        const widgetDef = Zone.createWidgetDef(widgetNode);
        // istanbul ignore else
        if (widgetDef) {
          zoneDef.addWidgetDef(widgetDef);
        }
      });
    }
  }

  private static createWidgetDef(widgetNode: React.ReactElement<WidgetProps>): WidgetDef | undefined {
    let widgetDef: WidgetDef | undefined;

    // istanbul ignore else
    if (React.isValidElement(widgetNode))
      widgetDef = new WidgetDef(widgetNode.props);

    return widgetDef;
  }

  public render(): React.ReactNode {
    const { runtimeProps } = this.props;

    if (!runtimeProps)
      return null;

    const { zoneDef } = runtimeProps;

    // istanbul ignore else
    if (runtimeProps.zoneProps.widgets.length === 1) {
      if (zoneDef.isToolSettings) {
        return (
          <ToolSettingsZone
            className={this.props.className}
            style={this.props.style}
            bounds={runtimeProps.zoneProps.bounds}
            isHidden={runtimeProps.isHidden} />
        );
      } else if (zoneDef.isStatusBar) {
        if (!isStatusZone(runtimeProps.zoneProps))
          throw new TypeError();

        let widgetControl: StatusBarWidgetControl | undefined;
        const widgetDef = zoneDef.getSingleWidgetDef();

        // istanbul ignore else
        if (widgetDef)
          widgetControl = widgetDef.getWidgetControl(ConfigurableUiControlType.StatusBarWidget) as StatusBarWidgetControl;

        return (
          <StatusBarZone
            className={this.props.className}
            style={this.props.style}
            widgetControl={widgetControl}
            zoneProps={runtimeProps.zoneProps}
            widgetChangeHandler={runtimeProps.widgetChangeHandler}
            targetChangeHandler={runtimeProps.targetChangeHandler}
            targetedBounds={runtimeProps.ghostOutline}
            dropTarget={runtimeProps.dropTarget}
            isHidden={runtimeProps.isHidden}
          />
        );
      }
    }

    return (
      <FrameworkZone
        className={this.props.className}
        draggingWidget={runtimeProps.draggingWidget}
        getWidgetContentRef={runtimeProps.getWidgetContentRef}
        style={this.props.style}
        zoneProps={runtimeProps.zoneProps}
        widgetChangeHandler={runtimeProps.widgetChangeHandler}
        targetedBounds={runtimeProps.ghostOutline}
        targetChangeHandler={runtimeProps.targetChangeHandler}
        zoneDefProvider={runtimeProps.zoneDefProvider}
        dropTarget={runtimeProps.dropTarget}
        fillZone={zoneDef.shouldFillZone}
        isHidden={runtimeProps.isHidden}
        widgets={runtimeProps.widgets}
      />
    );
  }
}
