/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module StatusBar
 */

import * as React from "react";
import { StatusFieldProps } from "../statusfields/StatusFieldProps";
import { StatusBarContext } from "./StatusBar";

/** HOC that injects values for [[StatusFieldProps]].
 * @beta
 */
export const withStatusFieldProps = <P extends StatusFieldProps, C>(
  // tslint:disable-next-line: variable-name
  Component: React.JSXElementConstructor<P> & C,
) => {
  type InjectedProps = Pick<StatusFieldProps, "isInFooterMode" | "onOpenWidget" | "openWidget">;
  type Props = JSX.LibraryManagedAttributes<C, Omit<P, keyof InjectedProps>>;
  return function WithStatusFieldProps(props: Props) {
    const statusBarContext = React.useContext(StatusBarContext);
    const { toastTargetRef, ...args } = statusBarContext;
    return (
      <Component
        {...props as any}
        {...args}
      />
    );
  };
};
