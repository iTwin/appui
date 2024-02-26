/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module MessageCenter
 */

import "./Indicator.scss";
import classnames from "classnames";
import * as React from "react";
import type { FooterIndicatorProps } from "../Indicator";
import { FooterIndicator } from "../Indicator";
import { SvgChat } from "@itwin/itwinui-icons-react";
import { NotificationMarker } from "@itwin/itwinui-react";

/** Properties of [[MessageCenter]] component.
 * @internal
 */
export interface MessageCenterProps extends FooterIndicatorProps {
  /** Clickable part of the indicator. */
  indicatorRef?: React.Ref<HTMLDivElement>;
  /** Message center label. */
  label?: string;
  /** Function called when indicator is clicked. */
  onClick?: () => void;
  /** Message center dialog target. */
  targetRef?: React.Ref<HTMLDivElement>;
  /** Messages */
  messages?: number;
}

/** Message center indicator used in [[Footer]] component.
 * @note Used with [[MessageCenterDialog]] component.
 * @internal
 */
export const MessageCenter: React.FC<MessageCenterProps> = (props) => {
  const { messages, className, indicatorRef, label, onClick, targetRef } =
    props;

  return (
    <FooterIndicator
      className={classnames("nz-footer-messageCenter-indicator", className)}
      {...props}
    >
      <div // eslint-disable-line jsx-a11y/click-events-have-key-events
        className="nz-indicator"
        onClick={onClick}
        ref={indicatorRef}
        role="button"
        tabIndex={-1}
      >
        <NotificationMarker status={"primary"}>
          <SvgChat />
        </NotificationMarker>
        {label !== undefined && <span className="nz-label">{label}</span>}
        <div className="nz-container">
          <div className="nz-target" ref={targetRef} />
        </div>
      </div>
    </FooterIndicator>
  );
};
