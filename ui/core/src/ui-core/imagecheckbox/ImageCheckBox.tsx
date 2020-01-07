/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @module Inputs */

import * as React from "react";
import * as classnames from "classnames";
import { CommonProps } from "../utils/Props";
import "./ImageCheckBox.scss";

/** Properties for the [[ImageCheckBox]] component
 * @beta
 */
export interface ImageCheckBoxProps extends CommonProps {
  /** Image for the "checked" state */
  imageOn: string;
  /** Image for the "unchecked" (default) state */
  imageOff: string;
  /** Determine if the item is checked or not */
  checked?: boolean;
  /** Determine if the item is disabled or not */
  disabled?: boolean;
  /** Function called when item is clicked. */
  onClick?: (checked: boolean) => any;
  /** Custom CSS class name for the checkbox input element */
  inputClassName?: string;
  /** Custom CSS Style for the checkbox input element */
  inputStyle?: React.CSSProperties;
  /** Tooltip to be displayed when mouse is hovered over the checkbox */
  tooltip?: string;
}

/**
 * ImageCheckBox React component shows a checked or unchecked image
 * @beta
 */
export class ImageCheckBox extends React.PureComponent<ImageCheckBoxProps> {

  private _onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // istanbul ignore next
    if (e && e.stopPropagation)
      e.stopPropagation();

    // istanbul ignore else
    if (this.props.onClick) {
      this.props.onClick(e.target.checked);
    }
  }

  private _onInputClick = (e: React.MouseEvent<HTMLInputElement>) => {
    // istanbul ignore next
    if (e && e.stopPropagation)
      e.stopPropagation();
  }

  private _onLabelClick = (e: React.MouseEvent<HTMLLabelElement>) => {
    // istanbul ignore next
    if (e && e.stopPropagation)
      e.stopPropagation();
  }

  /** @internal */
  public render() {
    const checkBoxClass = classnames("core-image-checkbox", this.props.className);
    const imageClass = classnames("image icon", this.props.checked ? this.props.imageOn : this.props.imageOff);
    return (
      <label className={checkBoxClass} style={this.props.style} onClick={this._onLabelClick} title={this.props.tooltip}>
        <input type="checkbox" className={this.props.inputClassName} style={this.props.inputStyle}
          checked={this.props.checked} disabled={this.props.disabled} onChange={this._onChange} onClick={this._onInputClick} />
        <span className={imageClass} />
      </label>
    );
  }
}
