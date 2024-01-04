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

type ProgressRadialProps = React.ComponentPropsWithoutRef<typeof ProgressRadial>;

/** Type for ProgressRadialProps.size
 * @public
 */
export type RadialSizeType = ProgressRadialProps["size"];

/** Properties for [[LoadingSpinner]] component
 * @public
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

/**
 * A loading spinner component that optionally shows a text message.
 * @public
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