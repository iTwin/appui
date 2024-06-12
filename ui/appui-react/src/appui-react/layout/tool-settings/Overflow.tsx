/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module ToolSettings
 */

import "./Overflow.scss";
import classnames from "classnames";
import * as React from "react";
import type { CommonProps } from "@itwin/core-react";
import { useRefs, useResizeObserver } from "@itwin/core-react";
import { IconButton } from "@itwin/itwinui-react";
import { SvgMore } from "@itwin/itwinui-icons-react";
import { useLabel } from "../base/NineZone";

/** Properties of [[ToolSettingsOverflow]] component.
 * @internal
 */
// eslint-disable-next-line deprecation/deprecation
export interface DockedToolSettingsOverflowProps extends CommonProps {
  /** Function called when button is clicked. */
  onClick?: () => void;
  /** Function called when button is resized. */
  onResize?: (w: number) => void;
}

/** Entry point to overflown tool settings of [[DockedToolSettings]] component.
 * @internal
 */
export const DockedToolSettingsOverflow = React.forwardRef<
  HTMLDivElement,
  DockedToolSettingsOverflowProps
>(function DockedToolSettingsOverflow(props, ref) {
  const roRef = useResizeObserver<HTMLDivElement>(props.onResize);
  const refs = useRefs(roRef, ref);
  const className = classnames("nz-toolSettings-overflow", props.className);
  const moreToolSettingsTitle = useLabel("moreToolSettingsTitle");

  return (
    <IconButton
      className={className}
      onClick={props.onClick}
      ref={refs}
      style={props.style}
      styleType="borderless"
      label={moreToolSettingsTitle}
    >
      <SvgMore />
    </IconButton>
  );
});
