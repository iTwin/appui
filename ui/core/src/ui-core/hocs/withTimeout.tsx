/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
/** @module Common */

import * as React from "react";
import { Timer } from "../utils/Timer";

/** Properties for [[withTimeout]] React higher-order component
 * @public
 */
export interface WithTimeoutProps {
  /** Timeout duration in milliseconds */
  timeout: number;
  /** Callback function for timeout */
  onTimeout?: () => void;
}

/** withTimeout is a React higher-order component that adds timeout support.
 * @public
 */
export const withTimeout = <ComponentProps extends {}>(
  // tslint:disable-next-line:variable-name
  Component: React.ComponentType<ComponentProps>,
) => {
  return class WithTimeout extends React.PureComponent<ComponentProps & WithTimeoutProps> {
    public timer: Timer = new Timer(0);

    public componentDidMount(): void {
      this.timer.setOnExecute(() => this.props.onTimeout && this.props.onTimeout());
      this.startTimer(this.props.timeout);
    }

    public componentDidUpdate(_prevProps: Readonly<ComponentProps & WithTimeoutProps>): void {
      this.startTimer(this.props.timeout);
    }

    public componentWillUnmount(): void {
      this.timer.stop();
    }

    public render() {
      const { timeout, onTimeout, ...props } = this.props;
      return (
        <Component {...props as ComponentProps} {...this.state} />
      );
    }

    public startTimer(timeout: number) {
      if (this.timer.isRunning)
        return;

      this.timer.delay = timeout;
      this.timer.start();
    }
  };
};
