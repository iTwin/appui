/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Footer
 */

import "./Footer.scss";
import classnames from "classnames";
import * as React from "react";
import type { CommonProps } from "@itwin/core-react";
import { SafeAreaInsetsHelpers } from "../base/SafeAreaInsets";
import type { SafeAreaInsets } from "../../safearea/SafeAreaInsets";

/** Properties of [[Footer]] component.
 * @internal
 */
export interface FooterProps extends CommonProps {
  /**
   * Footer indicators, separators and status fields. I.e: [StatusBarSeparator]($appui-react), [[FooterIndicator]],
   * [[MessageCenter]], [[ToolAssistance]], [[SnapMode]]
   */
  children?: React.ReactNode;
  /** Footer messages. I.e. [[Message]], [[Toast]] */
  messages?: React.ReactNode;
  /** Handler for mouse enter */
  onMouseEnter?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  /** Handler for mouse leave */
  onMouseLeave?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  /** Describes respected safe area insets. */
  safeAreaInsets?: SafeAreaInsets;
}

/** Footer component.
 * @note Use [StatusBar]($appui-react) instead
 * @internal
 */
export class Footer extends React.PureComponent<FooterProps> {
  public override render() {
    const className = classnames(
      "nz-footer-footer",
      this.props.safeAreaInsets &&
        SafeAreaInsetsHelpers.getCssClassNames(this.props.safeAreaInsets),
      this.props.className
    );

    return (
      <div
        className={className}
        style={this.props.style}
        onMouseEnter={this.props.onMouseEnter}
        onMouseLeave={this.props.onMouseLeave}
      >
        <div>
          <div className="nz-messages">{this.props.messages}</div>
          <div className="nz-indicators">{this.props.children}</div>
        </div>
      </div>
    );
  }
}
