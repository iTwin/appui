/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
/** @module Widget */

import * as classnames from "classnames";
import * as React from "react";
import { CommonProps } from "@bentley/ui-core";
import { HorizontalAnchor, HorizontalAnchorHelpers, VerticalAnchor, VerticalAnchorHelpers } from "../../Stacked";
import { PointerCaptor } from "../../../base/PointerCaptor";
import { PointProps, Point } from "../../../utilities/Point";
import { Rectangle, RectangleProps } from "../../../utilities/Rectangle";

import "./Tab.scss";

/** Describes available tab modes.
 * @alpha
 */
export enum TabMode {
  Closed,
  Open,
  Active,
}

/** Helpers for [[TabMode]].
 * @alpha
 */
export class TabModeHelpers {
  /** Class name of [[TabMode.Closed]] */
  public static readonly CLOSED_CLASS_NAME = "nz-mode-closed";
  /** Class name of [[TabMode.Open]] */
  public static readonly OPEN_CLASS_NAME = "nz-mode-open";
  /** Class name of [[TabMode.Active]] */
  public static readonly ACTIVE_CLASS_NAME = "nz-mode-active";

  /** @returns Class name of specified [[TabMode]] */
  public static getCssClassName(mode: TabMode): string {
    switch (mode) {
      case TabMode.Closed:
        return TabModeHelpers.CLOSED_CLASS_NAME;
      case TabMode.Open:
        return TabModeHelpers.OPEN_CLASS_NAME;
      case TabMode.Active:
        return TabModeHelpers.ACTIVE_CLASS_NAME;
    }
  }
}

/** Properties of [[Tab]] component.
 * @alpha
 */
export interface TabProps extends CommonProps {
  /** A Beta badge to draw. */
  betaBadge?: React.ReactNode;
  /** Tab icon. */
  children?: React.ReactNode;
  /** Describes to which side the widget of this tab is anchored. */
  horizontalAnchor: HorizontalAnchor;
  /** Describes if the tab is collapsed. */
  isCollapsed?: boolean;
  /** Describes if the tab is protruded when active. */
  isProtruding: boolean;
  /** Last pointer position of draggable tab. */
  lastPosition?: PointProps;
  /** Describes current tab mode. */
  mode: TabMode;
  /** Function called when the tab is clicked. */
  onClick?: () => void;
  /** Function called when tab is dragged. */
  onDrag?: (dragged: PointProps) => void;
  /** Function called when tab drag action is started.
   * @param initialPosition Initial pointer position in window coordinates.
   */
  onDragStart?: (initialPosition: PointProps) => void;
  /** Function called when tab drag action is finished. */
  onDragEnd?: () => void;
  /** Title for the tab. */
  title?: string;
  /** Describes to which side the widget is vertically anchored. */
  verticalAnchor: VerticalAnchor;
}

/** Default properties of [[Tab]] component.
 * @alpha
 */
type TabDefaultProps = Pick<TabProps, "isProtruding">;

/** Rectangular widget tab. Used in [[Stacked]] component.
 * @alpha
 */
export class Tab extends React.PureComponent<TabProps> {
  private _initial: Point | undefined = undefined;
  private _tab = React.createRef<HTMLDivElement>();

  public static defaultProps: TabDefaultProps = {
    isProtruding: true,
  };

  public getBounds(): RectangleProps {
    if (!this._tab.current)
      return new Rectangle();
    return this._tab.current.getBoundingClientRect();
  }

  public render() {
    const className = classnames(
      "nz-widget-rectangular-tab-tab",
      this.props.isProtruding && "nz-protruding",
      this.props.isCollapsed && "nz-collapsed",
      HorizontalAnchorHelpers.getCssClassName(this.props.horizontalAnchor),
      VerticalAnchorHelpers.getCssClassName(this.props.verticalAnchor),
      TabModeHelpers.getCssClassName(this.props.mode),
      this.props.className);

    return (
      <div
        className={className}
        ref={this._tab}
        style={this.props.style}
        title={this.props.title}
      >
        {this.props.children}
        {this.props.betaBadge &&
          <div className="nz-beta-badge">
            {this.props.betaBadge}
          </div>
        }
        <PointerCaptor
          className="nz-draggable"
          isMouseDown={this.props.lastPosition ? true : undefined}
          onMouseDown={this._handleMouseDown}
          onMouseUp={this._handleMouseUp}
          onMouseMove={this._handleMouseMove}
        />
      </div>
    );
  }

  private _handleMouseDown = (e: MouseEvent) => {
    e.preventDefault();

    this._initial = new Point(e.clientX, e.clientY);
  }

  private _handleMouseMove = (e: MouseEvent) => {
    const current = new Point(e.clientX, e.clientY);
    if (this.props.lastPosition) {
      const dragged = Point.create(this.props.lastPosition).getOffsetTo(current);
      this.props.onDrag && this.props.onDrag(dragged);
      return;
    }

    if (this._initial && current.getDistanceTo(this._initial) >= 6) {
      this.props.onDragStart && this.props.onDragStart(this._initial);
    }
  }

  private _handleMouseUp = (e: MouseEvent) => {
    this._initial = undefined;
    if (this.props.lastPosition) {
      this.props.onDragEnd && this.props.onDragEnd();
      return;
    }

    if (!this._tab.current)
      return;

    const tabBounds = Rectangle.create(this._tab.current.getBoundingClientRect());
    const point = new Point(e.clientX, e.clientY);
    if (!tabBounds.containsPoint(point))
      return;
    this.props.onClick && this.props.onClick();
  }
}
