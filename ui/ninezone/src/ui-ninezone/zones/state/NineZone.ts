/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
/** @module Zone */

import { CellProps } from "../../utilities/Cell";
import { SizeProps } from "../../utilities/Size";
import { NineZoneRoot as Root } from "./layout/Layouts";
import { Target, TargetZoneProps } from "./Target";
import { Widget, DraggingWidgetProps, DraggingWidget } from "./Widget";
import { ZoneManager, getDefaultZoneProps, ZonePropsBase, ContentZone, WidgetZone, StatusZoneManager, StatusZoneManagerProps, getDefaultStatusZoneProps } from "./Zone";

/** @alpha */
export type ContentZoneIndex = 5;
/** @alpha */
export type StatusZoneIndex = 8;
/** @alpha */
export type WidgetZoneIndex = 1 | 2 | 3 | 4 | 6 | 7 | StatusZoneIndex | 9;
/** @alpha */
export type ZoneIndex = WidgetZoneIndex | ContentZoneIndex;

/** @alpha */
export type ZonesType =
  { [id in Exclude<WidgetZoneIndex, StatusZoneIndex>]: ZonePropsBase } &
  { [id in StatusZoneIndex]: StatusZoneManagerProps };

/** @alpha */
export interface NineZoneProps {
  readonly zones: Readonly<ZonesType>;
  readonly size: SizeProps;
  readonly draggingWidget?: DraggingWidgetProps;
  readonly target?: TargetZoneProps;
}

/** @alpha */
export const getDefaultZonesProps = (): Readonly<ZonesType> => {
  return {
    1: getDefaultZoneProps(1),
    2: getDefaultZoneProps(2),
    3: getDefaultZoneProps(3),
    4: getDefaultZoneProps(4),
    6: getDefaultZoneProps(6),
    7: getDefaultZoneProps(7),
    8: getDefaultStatusZoneProps(),
    9: getDefaultZoneProps(9),
  };
};

/** @alpha */
export const getDefaultNineZoneProps = (): NineZoneProps => (
  {
    zones: getDefaultZonesProps(),
    size: {
      width: 0,
      height: 0,
    },
  }
);

/** @alpha */
export class NineZone implements Iterable<ZoneManager> {
  private _zones: { [id: number]: ZoneManager } = {};
  private _root: Root | undefined;
  private _target?: Target;
  private _draggingWidget?: DraggingWidget;

  public constructor(public readonly props: NineZoneProps) {
  }

  public [Symbol.iterator]() {
    let currentId = 1;
    const zones = this;
    return {
      next(): IteratorResult<ZoneManager> {
        if (currentId > 10)
          return {
            done: true,
            value: {} as ZoneManager,
          };

        return {
          done: false,
          value: zones.getZone(currentId++ as ZoneIndex),
        };
      },
    };
  }

  public get root() {
    if (!this._root)
      this._root = new Root(this);
    return this._root;
  }

  public getZone(zoneId: ZoneIndex): ZoneManager {
    if (this._zones[zoneId])
      return this._zones[zoneId];

    if (zoneId === 5)
      this._zones[zoneId] = new ContentZone(this);
    else if (zoneId === 8)
      this._zones[zoneId] = new StatusZoneManager(this, this.props.zones[zoneId]);
    else
      this._zones[zoneId] = new WidgetZone(this, this.props.zones[zoneId]);
    return this._zones[zoneId];
  }

  public getWidgetZone(zoneId: WidgetZoneIndex): WidgetZone {
    return this.getZone(zoneId) as WidgetZone;
  }

  public getStatusZone(): StatusZoneManager {
    return this.getZone(StatusZoneManager.id) as StatusZoneManager;
  }

  public getContentZone(): ContentZone {
    return this.getZone(ContentZone.id) as ContentZone;
  }

  public getWidget(widgetId: number): Widget {
    for (const zone of this) {
      if (!zone.isWidgetZone())
        continue;

      const widget = zone.getWidgets().find((w) => w.props.id === widgetId);
      if (widget)
        return widget;
    }

    throw new RangeError();
  }

  public findZone(cell: CellProps): ZoneManager {
    for (const zone of this) {
      if (zone.cell.equals(cell))
        return zone;
    }

    throw new RangeError();
  }

  public get draggingWidget(): DraggingWidget | undefined {
    if (!this._draggingWidget && this.props.draggingWidget)
      this._draggingWidget = new DraggingWidget(this, this.props.draggingWidget);
    return this._draggingWidget;
  }

  public get target(): Target | undefined {
    if (!this._target && this.props.target)
      this._target = new Target(this, this.props.target);
    return this._target;
  }
}
