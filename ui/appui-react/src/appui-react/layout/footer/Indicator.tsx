/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Footer
 */

import "./Indicator.scss";
import classnames from "classnames";
import * as React from "react";
import type { CommonProps } from "@itwin/core-react";

/** Properties of [[FooterIndicator]] component.
 * @internal
 */
// eslint-disable-next-line deprecation/deprecation
export interface FooterIndicatorProps extends CommonProps {
  /** Indicator content. */
  children?: React.ReactNode;
  /** Title for the indicator */
  title?: string;
  /** Function called when the indicator is clicked */
  onClick?: (event: React.MouseEvent) => void;
}

/** Indicator used in [[Footer]] component.
 * @note Use [StatusBarIndicator]($appui-react) instead
 * @internal
 */
export const FooterIndicator = React.forwardRef<
  HTMLDivElement,
  FooterIndicatorProps
>(function FooterIndicator(props, ref) {
  const { children, ...attributes } = props;

  const className = classnames("nz-footer-indicator", props.className);

  return (
    <div ref={ref} {...{ ...attributes, className }}>
      {children}
    </div>
  );
});
