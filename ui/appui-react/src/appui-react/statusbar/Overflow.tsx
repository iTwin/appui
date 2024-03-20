/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module StatusBar
 */

import type { CommonProps } from "@itwin/core-react";
import { useRefs, useResizeObserver } from "@itwin/core-react";
import classnames from "classnames";
import * as React from "react";
import { Ellipsis } from "../layout/base/Ellipsis";
import "./Overflow.scss";
import { useTranslation } from "../Translation";

/** Properties of [[StatusBarOverflow]] component.
 * @internal
 */
export interface StatusBarOverflowProps extends CommonProps {
  /** Function called when button is clicked. */
  onClick?: () => void;
  /** Function called when button is resized. */
  onResize?: (w: number) => void;
}

/** Entry point to overflow status bar items of [[StatusBarComposer]] component.
 * @internal
 */
export const StatusBarOverflow = React.forwardRef<
  HTMLDivElement,
  StatusBarOverflowProps
>(function StatusBarOverflow(props, ref) {
  const { translate } = useTranslation();

  const roRef = useResizeObserver<HTMLDivElement>(props.onResize);
  const refs = useRefs(roRef, ref);
  const className = classnames("uifw-statusbar-overflow", props.className);

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div
      className={className}
      onClick={props.onClick}
      ref={refs}
      style={props.style}
      role="button"
      tabIndex={-1}
      title={translate("statusBar.overflow")}
    >
      <Ellipsis />
    </div>
  );
});
