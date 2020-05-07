/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module State
 */

import * as React from "react";
import { Subtract } from "@bentley/presentation-common";
import { SafeAreaInsets } from "@bentley/ui-ninezone";

/**
 * Context used to manage safe area (feature used by devices with non-rectangular screens).
 * @alpha
 */
// tslint:disable-next-line: variable-name
export const SafeAreaContext = React.createContext<SafeAreaInsets>(SafeAreaInsets.None);

interface InjectedWithSafeAreaProps {
  readonly safeAreaInsets?: SafeAreaInsets;
}

/** HOC that injects SafeAreaInsets.
 * @alpha
 */
export const withSafeArea = <P extends InjectedWithSafeAreaProps, C>(
  // tslint:disable-next-line: variable-name
  Component: React.JSXElementConstructor<P> & C,
) => {
  type Props = JSX.LibraryManagedAttributes<C, Subtract<P, InjectedWithSafeAreaProps>>;

  return class WithSafeArea extends React.PureComponent<Props> {
    public render() {
      const { ...props } = this.props;
      return (
        <SafeAreaContext.Consumer>
          {(safeAreaInsets) => (
            <Component
              {...props as any}
              safeAreaInsets={safeAreaInsets}
            />
          )}
        </SafeAreaContext.Consumer>
      );
    }
  };
};
