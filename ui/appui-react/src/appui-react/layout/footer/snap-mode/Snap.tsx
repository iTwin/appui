/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module SnapMode
 */

import "./Snap.scss";
import classnames from "classnames";
import * as React from "react";
import type { CommonProps } from "@itwin/core-react";

/** Properties of [[Snap]] component.
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
export interface SnapProps extends CommonProps {
  /** Label of snap row. */
  children?: string;
  /** Snap row icon. */
  icon?: React.ReactNode;
  /** Describes if the snap row is active. */
  isActive?: boolean;
  /** Function called when the Snap component is clicked. */
  onClick?: () => void;
}

/** Snap row used in [[SnapModePanel]] component.
 * @internal
 */
export class Snap extends React.PureComponent<SnapProps> {
  public override render() {
    const dialogClassName = classnames(
      "nz-footer-snapMode-snap",
      this.props.isActive && "nz-active",
      this.props.className
    );

    return (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events
      <div
        onClick={this.props.onClick}
        className={dialogClassName}
        style={this.props.style}
        role="button"
        tabIndex={-1}
      >
        {this.props.icon}
        {this.props.children}
      </div>
    );
  }
}
