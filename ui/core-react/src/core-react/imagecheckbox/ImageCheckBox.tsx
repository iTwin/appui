/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Checkbox
 */

import "./ImageCheckBox.scss";
import classnames from "classnames";
import * as React from "react";
import { Icon } from "../icons/IconComponent.js";
import type { CommonProps } from "../utils/Props.js";

/* eslint-disable @typescript-eslint/no-deprecated */

/** Properties for the [[ImageCheckBox]] component
 * @public
 * @deprecated in 4.12.0. Props of deprecated component {@link ImageCheckBox}.
 */
export interface ImageCheckBoxProps extends CommonProps {
  /** Image for the "checked" state */
  imageOn: string | React.ReactNode;
  /** Image for the "unchecked" (default) state */
  imageOff: string | React.ReactNode;
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
  /** If true, draw a border around the image checkbox */
  border?: boolean;
  /** Provides ability to return reference to HTMLInputElement */
  inputRef?: React.Ref<HTMLInputElement>;
}

/** ImageCheckBox React component shows a checked or unchecked image
 * @public
 * @deprecated in 4.12.0. Use {@link https://itwinui.bentley.com/docs/checkbox iTwinUI checkbox} instead (custom icons are not supported at the moment, but feel free to submit your use cases).
 */
export class ImageCheckBox extends React.PureComponent<ImageCheckBoxProps> {
  private _onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e && e.stopPropagation) e.stopPropagation();

    if (this.props.onClick) {
      this.props.onClick(e.target.checked);
    }
  };

  private _onInputClick = (e: React.MouseEvent<HTMLInputElement>) => {
    if (e && e.stopPropagation) e.stopPropagation();
  };

  private _onLabelClick = (e: React.MouseEvent<HTMLLabelElement>) => {
    if (e && e.stopPropagation) e.stopPropagation();
  };

  public override render() {
    const checkBoxClass = classnames(
      "core-image-checkbox",
      this.props.className
    );
    const imageClass = classnames(
      "image",
      this.props.border && "image-checkbox-border"
    );
    const iconSpec = this.props.checked
      ? this.props.imageOn
      : this.props.imageOff;

    return (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/label-has-associated-control, jsx-a11y/no-noninteractive-element-interactions
      <label
        className={checkBoxClass}
        style={this.props.style}
        onClick={this._onLabelClick}
        title={this.props.tooltip}
      >
        <input
          type="checkbox"
          className={this.props.inputClassName}
          style={this.props.inputStyle}
          checked={this.props.checked}
          disabled={this.props.disabled}
          onChange={this._onChange}
          onClick={this._onInputClick}
          ref={this.props.inputRef}
        />
        <span className={imageClass}>
          <Icon iconSpec={iconSpec} />
        </span>
      </label>
    );
  }
}
