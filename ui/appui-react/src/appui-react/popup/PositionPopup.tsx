/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Popup
 */

import "./PositionPopup.scss";
import classnames from "classnames";
import * as React from "react";
import type { XAndY } from "@itwin/core-geometry";
import type { CommonDivProps, CommonProps } from "@itwin/core-react";
import { Div } from "@itwin/core-react";
import type { SizeProps } from "../utils/SizeProps.js";

/** Props for popup at screen position
 * @beta */
// eslint-disable-next-line @typescript-eslint/no-deprecated
export interface PositionPopupProps extends CommonProps {
  /** Center point */
  point: XAndY;
  /** Function called when size is known. */
  onSizeKnown?: (size: SizeProps) => void;
  /** Content */
  children?: React.ReactNode;
}

/** Popup component at screen position
 * @beta */
export class PositionPopup extends React.PureComponent<PositionPopupProps> {
  constructor(props: PositionPopupProps) {
    super(props);
  }

  public override render() {
    const { point, className, style, onSizeKnown, ...props } = this.props;

    const divStyle: React.CSSProperties = {
      ...style,
      top: point.y,
      left: point.x,
    };

    return (
      <div
        {...props}
        className={classnames("uifw-position-popup", className)}
        style={divStyle}
        ref={(e) => this.setDivRef(e)}
      >
        {this.props.children}
      </div>
    );
  }

  private setDivRef(div: HTMLDivElement | null) {
    if (div) {
      const rect = div.getBoundingClientRect();
      this.props.onSizeKnown?.({
        width: rect.width,
        height: rect.height,
      });
    }
  }
}

/** PositionPopup content with padding
 * @beta
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
export function PositionPopupContent(props: CommonDivProps) {
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  return <Div {...props} mainClassName="uifw-position-popup-content" />;
}
