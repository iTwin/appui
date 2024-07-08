/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module ContentView
 */

import "./ContentOverlay.scss";
import classnames from "classnames";
import * as React from "react";

// eslint-disable-next-line deprecation/deprecation
interface ContentOverlayProps extends React.ComponentProps<"div"> {
  /** Describes if the content is active. */
  active?: boolean;
}

/** Overlay used to identify active content views.
 * @beta
 */
export function ContentOverlay({
  className,
  children,
  active,
  ...other
}: ContentOverlayProps) {
  return (
    <div
      className={classnames("uifw-content-contentOverlay", className)}
      {...other}
    >
      {children}
      <div
        className={classnames(
          "uifw-content-contentOverlay_activeStrip",
          active && "uifw-active"
        )}
      />
    </div>
  );
}
