/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module ToolSettings
 */

import "./Panel.scss";
import classnames from "classnames";
import * as React from "react";
import type { CommonProps } from "@itwin/core-react";
import { Popup } from "@itwin/core-react";

/** Properties of [[ToolSettingsOverflowPanel]] component.
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
export interface ToolSettingsOverflowPanelProps extends CommonProps {
  /** Panel content. */
  children?: React.ReactNode;
  onClose: () => void;
  target: HTMLElement | undefined;
  open: boolean;
}

/** Displays overflown tool settings.
 * @internal
 */
export function ToolSettingsOverflowPanel(
  props: ToolSettingsOverflowPanelProps
) {
  const className = classnames("nz-toolSettings-panel", props.className);
  return (
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    <Popup
      className={className}
      isOpen={props.open}
      offset={0}
      onClose={props.onClose}
      style={props.style}
      showShadow
      target={props.target}
    >
      {props.children}
    </Popup>
  );
}
