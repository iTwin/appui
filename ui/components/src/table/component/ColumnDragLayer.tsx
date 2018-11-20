/*---------------------------------------------------------------------------------------------
* Copyright (c) 2018 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
/** @module Table */

import * as React from "react";
import { DragLayerProps } from "../../dragdrop";

/**
 * React component used to portray a column being dragged during Table column reordering.
 */
export class ColumnDragLayer extends React.Component<DragLayerProps> {
  public render(): React.ReactNode {
    const args = this.props.args!;
    const spos = args.sourceClientOffset || { x: -1000, y: -1000 };
    const ispos = args.initialSourceClientOffset || { x: -1000, y: -1000 };

    const data = args.dataObject || {};
    const column = data.column || {};
    const width = column.width || {};

    const x = spos.x + (column && column.left);
    const y = ispos.y;

    const translate = `translate(${x}px, ${y}px)`;

    const dragLayerStyle: React.CSSProperties = {
      transform: translate,
      WebkitTransform: translate,
      width,
    };
    return (
      <div className="column-drag-layer" style={dragLayerStyle}>
        {column.name}
      </div>
    );
  }
}
