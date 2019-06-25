/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
/** @module Zone */

import { NineZone, WidgetZoneIndex } from "./Zones";

/** @alpha */
export enum TargetType {
  Back,
  Merge,
}

/** @alpha */
export interface TargetZoneProps {
  readonly zoneId: WidgetZoneIndex;
  readonly type: TargetType;
}

/** @alpha */
export class Target {
  public constructor(
    public readonly nineZone: NineZone,
    public readonly props: TargetZoneProps,
  ) {
  }

  public get zone() {
    return this.nineZone.getWidgetZone(this.props.zoneId);
  }

  public get type() {
    return this.props.type;
  }
}
