/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Inputs
 */

import classnames from "classnames";
import * as React from "react";
import { LabeledComponentProps, MessagedComponentProps } from "./LabeledComponentProps";
import { Textarea, TextareaProps } from "./Textarea";

/** Properties for [[LabeledTextarea]] component
 * @public
 */
export interface LabeledTextareaProps extends TextareaProps, LabeledComponentProps, MessagedComponentProps { }

/** Textarea wrapper that allows for additional styling and labelling
 * @public
 */
export class LabeledTextarea extends React.PureComponent<LabeledTextareaProps> {
  public render(): JSX.Element {
    const { label, status, className, style,
      inputClassName, inputStyle,
      labelClassName, labelStyle,
      message, messageClassName, messageStyle,
      ...props } = this.props;

    return (
      <label style={this.props.style} className={classnames(
        "uicore-inputs-labeled-textarea",
        this.props.disabled && "uicore-disabled",
        this.props.status,
        this.props.className,
      )}>
        {label &&
          <div className={classnames("uicore-label", labelClassName)} style={labelStyle}> {label} </div>
        }
        <Textarea disabled={this.props.disabled} className={inputClassName} style={inputStyle} {...props} />
        {message &&
          <div className={classnames("uicore-message", messageClassName)} style={messageStyle}>{message}</div>
        }
      </label>
    );
  }
}
