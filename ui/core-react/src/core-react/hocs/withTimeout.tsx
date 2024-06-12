/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Common
 */

import * as React from "react";
import { Timer } from "../utils/Timer";

/** Properties for [[withTimeout]] React higher-order component
 * @public
 * @deprecated in 4.15.0. Props of deprecated {@link withTimeout} HOC.
 */
export interface WithTimeoutProps {
  /** Timeout duration in milliseconds */
  timeout: number;
  /** Callback function for timeout */
  onTimeout?: () => void;
}

/** withTimeout is a React higher-order component that adds timeout support.
 * @public
 * @deprecated in 4.15.0. Not used by AppUI.
 */
export const withTimeout = <ComponentProps extends {}>(
  Component: React.ComponentType<ComponentProps>
) => {
  return class WithTimeout extends React.PureComponent<
    ComponentProps & WithTimeoutProps // eslint-disable-line deprecation/deprecation
  > {
    // eslint-disable-next-line deprecation/deprecation
    public timer: Timer = new Timer(0);

    public override componentDidMount(): void {
      this.timer.setOnExecute(
        () => this.props.onTimeout && this.props.onTimeout()
      );
      this.startTimer(this.props.timeout);
    }

    public override componentDidUpdate(
      _prevProps: Readonly<ComponentProps & WithTimeoutProps> // eslint-disable-line deprecation/deprecation
    ): void {
      this.startTimer(this.props.timeout);
    }

    public override componentWillUnmount(): void {
      this.timer.stop();
    }

    public override render() {
      const { timeout, onTimeout, ...props } = this.props;
      return <Component {...(props as any)} {...this.state} />;
    }

    public startTimer(timeout: number) {
      if (this.timer.isRunning) return;

      this.timer.delay = timeout;
      this.timer.start();
    }
  };
};
