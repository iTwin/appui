/*---------------------------------------------------------------------------------------------
|  $Copyright: (c) 2018 Bentley Systems, Incorporated. All rights reserved. $
 *--------------------------------------------------------------------------------------------*/
/** @module Zone */

import NineZone, { WidgetZoneIndex } from "./NineZone";

export enum TargetType {
  Merge,
  Back,
}

export interface TargetProps {
  readonly widgetId: WidgetZoneIndex;
  readonly type: TargetType;
}

export default class Target {
  public constructor(
    public readonly nineZone: NineZone,
    public readonly props: TargetProps,
  ) {
  }

  public get widget() {
    return this.nineZone.getWidget(this.props.widgetId);
  }

  public get type() {
    return this.props.type;
  }
}
