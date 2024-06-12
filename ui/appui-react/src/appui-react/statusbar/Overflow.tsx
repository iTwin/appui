/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module StatusBar
 */

import type { CommonProps } from "@itwin/core-react";
import { useResizeObserver } from "@itwin/core-react";
import * as React from "react";
import { useTranslation } from "../hooks/useTranslation";
import { IconButton } from "@itwin/itwinui-react";
import { SvgMore } from "@itwin/itwinui-icons-react";
import { StatusBarPopover } from "./popup/StatusBarPopover";
import "./Overflow.scss";

/** Properties of [[StatusBarOverflow]] component.
 * @internal
 */
// eslint-disable-next-line deprecation/deprecation
export interface StatusBarOverflowProps extends CommonProps {
  /** Function called when button is resized. */
  onResize: (w: number) => void;
  /** Fields to be placed in the overflow panel. */
  overflowItems: React.ReactNode[];
}

/** Entry point to overflow status bar items of [[StatusBarComposer]] component.
 * @internal
 */
export function StatusBarOverflow(props: StatusBarOverflowProps) {
  const { overflowItems, onResize, ...otherProps } = props;
  const { translate } = useTranslation();

  const roRef = useResizeObserver<HTMLDivElement>(onResize);

  return (
    <StatusBarPopover
      content={
        <div
          className="uifw-statusbar-overflow-panel"
          data-testid="uifw-statusbar-overflow-panel"
        >
          {overflowItems}
        </div>
      }
    >
      <IconButton
        {...otherProps}
        ref={roRef}
        title={translate("statusBar.overflow")}
        styleType="borderless"
      >
        <SvgMore />
      </IconButton>
    </StatusBarPopover>
  );
}
