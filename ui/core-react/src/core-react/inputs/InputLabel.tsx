/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Inputs
 */

import {
  SvgStatusError,
  SvgStatusSuccess,
  SvgStatusWarning,
} from "@itwin/itwinui-icons-react";
import classnames from "classnames";
import * as React from "react";
import type { IconSpec } from "../icons/IconComponent.js";
import type { CommonProps } from "../utils/Props.js";
import { InputStatus } from "./InputStatus.js";
import type {
  LabeledComponentProps,
  MessagedComponentProps,
} from "./LabeledComponentProps.js";
import { StrataKitIcon } from "../StrataKitIcon.js";

/* eslint-disable @typescript-eslint/no-deprecated */

/** Properties for [[InputLabel]] components
 * @public
 * @deprecated in 4.12.0. Props of deprecated component {@link InputLabel}.
 */
export interface InputLabelProps
  extends LabeledComponentProps,
    MessagedComponentProps,
    CommonProps {
  disabled?: boolean;
  /** Labeled content */
  children?: React.ReactNode;
}

const inputLabelIconSpec: { [key: string]: IconSpec } = {
  [InputStatus.Error]: <SvgStatusError />,
  [InputStatus.Success]: <SvgStatusSuccess />,
  [InputStatus.Warning]: <SvgStatusWarning />,
};

const inputLabelStrataKitIcon: {
  [key: string]: NonNullable<
    React.ComponentProps<typeof StrataKitIcon>["href"]
  >;
} = {
  [InputStatus.Error]: (importIcon) =>
    importIcon("@stratakit/icons/status-error").svgStatusError,
  [InputStatus.Success]: (importIcon) =>
    importIcon("@stratakit/icons/status-success").svgStatusSuccess,
  [InputStatus.Warning]: (importIcon) =>
    importIcon("@stratakit/icons/status-warning").svgStatusWarning,
};

/** Text input wrapper that provides additional styling and labeling
 * @public
 * @deprecated in 4.12.0. Use {@link https://itwinui.bentley.com/docs/input iTwinUI input} instead.
 */
export class InputLabel extends React.PureComponent<InputLabelProps> {
  public override render(): React.ReactElement {
    const {
      label,
      status,
      className,
      style,
      labelClassName,
      labelStyle,
      message,
      messageClassName,
      messageStyle,
    } = this.props;

    return (
      <label
        style={style}
        className={classnames(
          "uicore-inputs-labeled-input",
          this.props.disabled && "uicore-disabled",
          status,
          className
        )}
      >
        {label && (
          <div
            className={classnames("uicore-label", labelClassName)}
            style={labelStyle}
          >
            {label}
          </div>
        )}
        <div className={classnames("input", { "with-icon": !!status })}>
          {this.props.children}
          {status && (
            <StrataKitIcon
              className="icon"
              href={inputLabelStrataKitIcon[status]}
              iconSpec={inputLabelIconSpec[status]}
            />
          )}
        </div>
        {message && (
          <div
            className={classnames("uicore-message", messageClassName)}
            style={messageStyle}
          >
            {message}
          </div>
        )}
      </label>
    );
  }
}
