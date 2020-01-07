/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @module Inputs */

import * as React from "react";
import * as classnames from "classnames";
import { CommonProps } from "../utils/Props";

/** Properties for the [[Input]] component
 * @public
 */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>, CommonProps {
  /** Indicates whether to set focus to the input element */
  setFocus?: boolean;
}

/** Basic text input
 * @public
 */
export class Input extends React.PureComponent<InputProps> {
  private _inputElement = React.createRef<HTMLInputElement>();

  public componentDidMount() {
    if (this.props.setFocus && this._inputElement.current) {
      this._inputElement.current.focus();
      this._inputElement.current.select();
    }
  }

  public render(): JSX.Element {
    const { className, style, setFocus, ...props } = this.props;
    return (
      <input ref={this._inputElement} type="text" {...props}
        className={classnames("uicore-inputs-input", className)} style={style} />
    );
  }
}
