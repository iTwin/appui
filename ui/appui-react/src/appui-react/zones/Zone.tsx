/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/* eslint-disable deprecation/deprecation */
/** @packageDocumentation
 * @module Zone
 */

import * as React from "react";
import { CommonProps } from "@itwin/core-react";
import { WidgetDef } from "../widgets/WidgetDef";
import { WidgetProps } from "../widgets/WidgetProps";
import { ZoneDef, ZoneState } from "./ZoneDef";

/** Enum for [[Zone]] Location.
 * @public @deprecated
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
  /** Describes preferred initial width of the zone. */
  initialWidth?: number;

  /** Properties for the Widgets in this Zone.
   * @note Stable `WidgetProps["id"]` is generated if id is not provided to correctly save and restore App layout.
   * [[Frontstage]] version must be increased when Widget location is changed or new widgets are added/removed.
   */
  widgets?: Array<React.ReactElement<WidgetProps>>;
}

/** @internal */
export function getStableWidgetProps(widgetProps: WidgetProps, stableId: string) {
  let props = widgetProps;
  if (props.id === undefined)
    props = {
      ...props,
      id: stableId,
    };
  return props;
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
    zoneDef.initializeFromProps(props);

    // istanbul ignore else
    if (props.widgets) {
      props.widgets.forEach((widgetNode, index) => {
        // istanbul ignore if
        if (!React.isValidElement(widgetNode))
          return;

        const stableId = `uifw-z-${ZoneLocation[zoneDef.zoneLocation]}-${index}`;
        const stableProps = getStableWidgetProps(widgetNode.props, stableId);
        const widgetDef = new WidgetDef(stableProps);
        zoneDef.addWidgetDef(widgetDef);
      });
    }
  }

  public override render(): React.ReactNode {
    return null;
  }
}
