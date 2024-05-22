/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module StatusBar
 */

import * as React from "react";
import type { CommonProps } from "@itwin/core-react";
import { StatusBarPopup } from "./popup/Popup";
import { StatusBarField } from "./Field";

/** Properties of [[StatusBarIndicator]] component.
 * @beta
 * @deprecated in 4.13.x. Props of deprecated component {@link StatusBarIndicator}.
 */
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
 * @deprecated in 4.13.x. Use [iTwinUI Button](https://itwinui.bentley.com/docs/button) (or other components) and {@link StatusBarPopup AppUI StatusBarPopup} instead.
 */
// eslint-disable-next-line deprecation/deprecation
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
      {/* eslint-disable-next-line deprecation/deprecation */}
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
        // eslint-disable-next-line deprecation/deprecation
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
