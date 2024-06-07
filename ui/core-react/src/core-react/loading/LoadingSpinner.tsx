/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Loading
 */

import "./LoadingSpinner.scss";
import * as React from "react";
import { ProgressRadial } from "@itwin/itwinui-react";

/* eslint-disable deprecation/deprecation */

type ProgressRadialProps = React.ComponentPropsWithoutRef<
  typeof ProgressRadial
>;

/** Type for ProgressRadialProps.size
 * @public
 * @deprecated in 4.12.0. Type used in a deprecated component {@link LoadingSpinner}.
 */
export type RadialSizeType = ProgressRadialProps["size"];

/** Properties for [[LoadingSpinner]] component
 * @public
 * @deprecated in 4.12.0. Props of deprecated component {@link LoadingSpinner}.
 */
export interface LoadingSpinnerProps extends Omit<ProgressRadialProps, "size"> {
  /** Message (text) displayed */
  message?: string;
  /** Position the message above or below the spinner (defaults to bottom) */
  messageOnTop?: boolean;
  /**
   * Size of the progress indicator. Defaults to medium size.
   * @default ''
   */
  size?: RadialSizeType;
}

/** A loading spinner component that optionally shows a text message.
 * @public
 * @deprecated in 4.12.0. Use {@link https://itwinui.bentley.com/docs/progressindicator#progress-radial iTwinUI progress indicator} instead.
 */
export class LoadingSpinner extends React.PureComponent<LoadingSpinnerProps> {
  public static defaultProps: Partial<LoadingSpinnerProps> = {
    messageOnTop: false,
  };

  public override render() {
    const { message, messageOnTop, size, ...rest } = this.props;
    return (
      <div className="core-ls">
        {message && messageOnTop && (
          <span className="ls-message-top">{message}</span>
        )}
        <ProgressRadial size={size} {...rest} indeterminate />
        {message && !messageOnTop && (
          <span className="ls-message-bottom">{message}</span>
        )}
      </div>
    );
  }
}
