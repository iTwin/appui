/*---------------------------------------------------------------------------------------------
|  $Copyright: (c) 2018 Bentley Systems, Incorporated. All rights reserved. $
 *--------------------------------------------------------------------------------------------*/
/** @module Zone */

import { WidgetZone } from "./Zone";
import Cell from "../../utilities/Cell";
import { WidgetZoneIndex } from "./NineZone";

export enum DropTarget {
  None,
  Merge,
  Back,
}

export default interface WidgetProps {
  readonly id: WidgetZoneIndex;
  readonly defaultZoneId?: WidgetZoneIndex;
  readonly tabIndex: number;
}

export const getDefaultProps = (id: WidgetZoneIndex): WidgetProps => {
  return {
    id,
    tabIndex: -1,
  };
};

export class Widget {
  public static sort(widgets: ReadonlyArray<Widget>) {
    return widgets.slice().sort((a, b) => a.defaultZone.props.id - b.defaultZone.props.id);
  }

  public static isCellBetweenWidgets(cell: Cell, widgets: ReadonlyArray<Widget>) {
    if (widgets.length !== 2)
      return false;

    const w0 = widgets[0];
    const w1 = widgets[1];
    if (cell.isBetween(w0.defaultZone.cell, w1.defaultZone.cell))
      return true;

    return false;
  }

  private _defaultZone: WidgetZone | undefined = undefined;

  public constructor(public readonly zone: WidgetZone, public readonly props: WidgetProps) {
  }

  public get nineZone() {
    return this.zone.nineZone;
  }

  public get defaultZone(): WidgetZone {
    if (!this._defaultZone)
      this._defaultZone = this.nineZone.getWidgetZone(this.props.defaultZoneId || this.props.id);
    return this._defaultZone;
  }

  public equals(other: Widget) {
    return this.props.id === other.props.id;
  }

  public getDropTarget(): DropTarget {
    const draggingWidget = this.nineZone.draggingWidget;
    if (!draggingWidget)
      return DropTarget.None;

    const draggingZone = draggingWidget.zone;
    const targetZone = this.zone;
    if (!targetZone.isMergeable)
      return DropTarget.None;

    if (draggingZone.equals(targetZone))
      return DropTarget.Back;

    if (targetZone.props.widgets.length > 1 && !targetZone.isFirstWidget(this))
      return DropTarget.None;

    const draggingCell = draggingZone.cell;
    const targetCell = targetZone.cell;
    const cellsBetween = draggingCell.getAlignedCellsTo(targetCell);
    for (const cell of cellsBetween) {
      const zone = this.nineZone.findZone(cell);
      if (!zone.isMergeable)
        return DropTarget.None;
    }

    if (draggingCell.isRowAlignedWith(targetCell))
      if (draggingZone.isMergedHorizontally || draggingZone.props.widgets.length === 1)
        if (targetZone.isMergedHorizontally || targetZone.props.widgets.length === 1)
          return DropTarget.Merge;

    if (draggingCell.isColumnAlignedWith(targetCell))
      if (draggingZone.isMergedVertically || draggingZone.props.widgets.length === 1)
        if (targetZone.isMergedVertically || targetZone.props.widgets.length === 1)
          return DropTarget.Merge;

    return DropTarget.None;
  }
}
