/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Footer
 */

import * as classnames from "classnames";
import * as React from "react";
import { CommonProps, Popup, Position } from "@bentley/ui-core";
import "./Popup.scss";

/** Properties of [[ToolSettingsPopup]] component.
 * @beta
 */
export interface ToolSettingsPopupProps extends CommonProps {
  /** Popup content. */
  children?: React.ReactNode;
  /** Describes if the popup is open. */
  isOpen?: boolean;
  /** Function called when the popup is closed. */
  onClose?: () => void;
  /** Popup target. */
  target?: HTMLElement | null;
}

/** Popup component used in [[ToolSettings]] component.
 * @beta
 */
export class ToolSettingsPopup extends React.PureComponent<ToolSettingsPopupProps> {
  public render() {
    const { className, ...props } = this.props;
    return (
      <Popup
        className={classnames(
          "nz-widget-toolSettings-popup",
          className,
        )}
        position={Position.Bottom}
        showArrow
        showShadow={false}
        {...props}
      >
        <div className="nz-content">
          {this.props.children}
        </div>
      </Popup>
    );
  }
}
