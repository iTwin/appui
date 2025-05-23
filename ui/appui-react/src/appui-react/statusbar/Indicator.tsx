/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module StatusBar
 */

import * as React from "react";
import type { CommonProps } from "@itwin/core-react";
import { StatusBarPopup } from "./popup/Popup.js";
import { StatusBarField } from "./Field.js";
import { StatusBarPopover } from "./popup/StatusBarPopover.js";

/** Properties of [[StatusBarIndicator]] component.
 * @beta
 * @deprecated in 4.14.0. Props of deprecated component {@link StatusBarIndicator}.
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
export interface StatusBarIndicatorProps extends CommonProps {
  /** Indicator content. */
  children?: React.ReactNode;
  /** Content to display in a popup when indicator is clicked. */
  popup?: React.ReactNode;
  /** Function called when indicator is clicked. */
  onClick?: () => void;
  /** Default state of an indicator popup. */
  defaultIsOpen?: boolean;
  /** Title of an indicator. */
  title?: string;
}

/** General-purpose [[StatusBar]] indicator.
 * @beta
 * @deprecated in 4.14.0. Use [iTwinUI Button](https://itwinui.bentley.com/docs/button) (or other components) and {@link StatusBarPopover AppUI StatusBarPopover} instead.
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
export function StatusBarIndicator(props: StatusBarIndicatorProps) {
  const hasClickAction = !!props.onClick || !!props.popup;
  const [isOpen, setIsOpen] = React.useState(!!props.defaultIsOpen);
  const handleOnIndicatorClick = () => {
    setIsOpen(!isOpen);
    props.onClick?.();
  };
  const target = React.useRef<HTMLDivElement>(null);
  return (
    <>
      {/* eslint-disable-next-line @typescript-eslint/no-deprecated */}
      <StatusBarField
        ref={target}
        className={props.className}
        title={props.title}
        style={props.style}
        onClick={hasClickAction ? handleOnIndicatorClick : undefined}
      >
        {props.children}
      </StatusBarField>
      {props.popup && (
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        <StatusBarPopup
          target={target.current}
          onClose={() => setIsOpen(false)}
          isOpen={isOpen}
        >
          {props.popup}
        </StatusBarPopup>
      )}
    </>
  );
}
