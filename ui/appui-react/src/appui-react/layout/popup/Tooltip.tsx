/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Popup
 */

import "./Tooltip.scss";
import classnames from "classnames";
import * as React from "react";
import type { CommonProps, RectangleProps } from "@itwin/core-react";
import { Point, Rectangle, Size } from "@itwin/core-react";
import type { XAndY } from "../state/internal/NineZoneStateHelpers";
import type { SizeProps } from "../../utils/SizeProps";

/** Properties of [[Tooltip]] component.
 * @internal
 */
// eslint-disable-next-line deprecation/deprecation
export interface TooltipProps extends CommonProps {
  /** Tooltip content. */
  children?: React.ReactNode;
  /** Tooltip icon. */
  icon?: React.ReactNode;
  /** Function called when the bounds of the tooltip changes. */
  onSizeChanged?: (size: SizeProps) => void;
  /** Position of the tooltip. */
  position: XAndY;
}

/** Default properties of [[Tooltip]] component.
 * @internal
 */
export type TooltipDefaultProps = Pick<TooltipProps, "position">;

/** Positionable tooltip component.
 * @internal
 */
export class Tooltip extends React.PureComponent<TooltipProps> {
  public static readonly defaultProps: TooltipDefaultProps = {
    position: {
      x: 0,
      y: 0,
    },
  };

  private _lastSize = new Size();
  private _tooltip = React.createRef<HTMLDivElement>();

  public override render() {
    const className = classnames("nz-popup-tooltip", this.props.className);

    const style: React.CSSProperties = {
      ...this.props.style,
      left: this.props.position.x,
      top: this.props.position.y,
    };

    return (
      <div className={className} ref={this._tooltip} style={style}>
        {this.props.icon !== undefined ? (
          <div>{this.props.icon}</div>
        ) : undefined}
        <div className="nz-content">{this.props.children}</div>
      </div>
    );
  }

  public override componentDidMount() {
    this.onSizeChanged();
  }

  public override componentDidUpdate(): void {
    this.onSizeChanged();
  }

  private onSizeChanged() {
    const tooltip = this._tooltip.current!;

    const rect = tooltip.getBoundingClientRect();
    const size = {
      height: rect.height,
      width: rect.width,
    };

    if (this._lastSize.equals(size)) return;

    this._lastSize = Size.create(size);
    this.props.onSizeChanged && this.props.onSizeChanged(size);
  }
}

/** Function to apply offset and contain tooltip bounds in container.
 * @internal
 */
export const offsetAndContainInContainer = (
  tooltipBounds: RectangleProps,
  containerSize: SizeProps,
  offset: XAndY = new Point(20, 20)
): Point => {
  let newBounds = Rectangle.create(tooltipBounds).offset(offset);
  const containerBounds = Rectangle.createFromSize(containerSize);
  if (containerBounds.contains(newBounds)) return newBounds.topLeft();

  newBounds = newBounds.containIn(containerBounds);
  return newBounds.topLeft();
};
