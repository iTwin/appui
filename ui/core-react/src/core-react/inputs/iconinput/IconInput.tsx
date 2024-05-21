/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Inputs
 */

import "./IconInput.scss";
import classnames from "classnames";
import * as React from "react";
import type { InputProps } from "../Input";
import { Input } from "../Input"; // NEEDSWORK - for nativeKeyHandler

/** Properties for the [[IconInput]] component
 * @public
 * @deprecated in 4.12.x. Props of deprecated component {@link IconInput}.
 */
export interface IconInputProps extends Omit<InputProps, "size"> {
  /** Icon displayed to the left of the Input field within the IconInput component */
  icon: React.ReactNode;
  /** CSS class name for the IconInput component container div */
  containerClassName?: string;
  /** Provides ability to return reference to HTMLInputElement */
  ref?: React.Ref<HTMLInputElement>;
  /** Modify size of the input. */
  size?: "small" | "large";
}

/** Input component with icon to the left of the input field
 * @public
 */
// eslint-disable-next-line deprecation/deprecation
const ForwardRefIconInput = React.forwardRef<HTMLInputElement, IconInputProps>(
  function ForwardRefIconInput(props, ref) {
    const { className, icon, containerClassName, size, ...otherProps } = props;

    // NEEDSWORK: still using core-react Input component because of `nativeKeyHandler` prop
    return (
      <div
        className={classnames("core-iconInput-container", containerClassName)}
      >
        <Input
          ref={ref}
          className={classnames("core-input", className)}
          {...otherProps}
        />
        <div className="core-iconInput-icon">{icon}</div>
      </div>
    );
  }
);

/** Input component with icon to the left of the input field
 * @public
 * @deprecated in 4.12.x. Use {@link https://itwinui.bentley.com/docs/inputwithdecorations iTwinUI input decorations} instead.
 */
// eslint-disable-next-line deprecation/deprecation
export const IconInput: (props: IconInputProps) => React.ReactNode =
  ForwardRefIconInput;
