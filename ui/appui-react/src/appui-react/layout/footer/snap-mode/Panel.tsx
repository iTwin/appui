/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module SnapMode
 */

import "./Panel.scss";
import classnames from "classnames";
import * as React from "react";
import type { CommonProps } from "@itwin/core-react";
import { TitleBar } from "../dialog/TitleBar.js";

/** Properties of [[SnapModePanel]] component.
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
export interface SnapModePanelProps extends CommonProps {
  /** Snap rows. I.e. [[Snap]] */
  children?: React.ReactNode;
  /** Dialog title. */
  title?: string;
}

/** Snap mode panel used with [[SnapMode]] component.
 * @note This is a presentational component and should be aligned with [[SnapMode]] component.
 * I.e. use [[FooterPopup]] to handle alignment.
 * @internal
 */
export class SnapModePanel extends React.PureComponent<SnapModePanelProps> {
  public override render() {
    const className = classnames(
      "nz-footer-snapMode-panel",
      this.props.className
    );

    return (
      <div className={className} style={this.props.style}>
        <TitleBar title={this.props.title} />
        <div className="nz-snaps">{this.props.children}</div>
      </div>
    );
  }
}
