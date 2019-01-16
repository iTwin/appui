/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
/** @module Utilities */

import * as React from "react";
import { PointProps } from "../utilities/Point";

/** Properties of [[MouseTracker]] component. */
export interface MouseTrackerProps {
  /** Function called when mouse coordinates changes. */
  onPositionChange?: (position: PointProps) => void;
}

/**
 * This component listens and reports the mousemove events.
 * @note Does not render.
 */
export class MouseTracker extends React.PureComponent<MouseTrackerProps> {
  public componentDidMount() {
    document.addEventListener("mousemove", this._handleMouseMove);
  }

  public componentWillUnmount() {
    document.removeEventListener("mousemove", this._handleMouseMove);
  }

  public render() {
    return null;
  }

  private _handleMouseMove = (e: MouseEvent) => {
    this.props.onPositionChange && this.props.onPositionChange({
      x: e.clientX,
      y: e.clientY,
    });
  }
}
