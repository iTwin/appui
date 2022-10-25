/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module StatusBar
 */

import "./Indicator.scss";
import classnames from "classnames";
import * as React from "react";
import { ConditionalStringValue, StatusBarLabelSide } from "@itwin/appui-abstract";
import { CommonProps, Icon, IconSpec } from "@itwin/core-react";
import { FooterIndicator as FooterIndicatorComponent, FooterPopup } from "@itwin/appui-layout-react";

/** Properties of [[FooterIndicator]] component.
 * @beta
 */
export interface FooterIndicatorProps extends CommonProps {
  /** Dialog to display in a popup when indicator is clicked. */
  dialog?: React.ReactChild;
  /** Specification of an icon. */
  iconSpec?: IconSpec;
  /** Indicator label. */
  label?: string;
  /** Side to display label. */
  labelSide?: StatusBarLabelSide;
  /** Function called when indicator is clicked. */
  onClick?: () => void;
  /** If dialog prop is set, used to determine initial state. */
  opened?: boolean;
  /** Tooltip text if not specified label is used */
  toolTip?: string;
}

/** General-purpose [[Footer]] indicator. Shows an icon and supports an optional popup dialog.
 * @beta
 */
export function FooterIndicator(props: FooterIndicatorProps) {
  const { className, dialog, iconSpec, label, labelSide, onClick, opened, style, toolTip } = props;
  const hasClickAction = React.useMemo(() => !!onClick || !!dialog, [dialog, onClick]);
  const [isOpen, setIsOpen] = React.useState(!!opened);
  const handleOnIndicatorClick = React.useCallback(() => {
    if (dialog) {
      setIsOpen(!isOpen);
    }
    onClick && onClick();
  }, [dialog, isOpen, onClick]);
  const target = React.useRef<HTMLDivElement>(null);
  const title = React.useMemo(() => toolTip ?? label, [toolTip, label]);
  const classNames = classnames(
    "uifw-footer-indicator",
    hasClickAction && "uifw-footer-action",
    labelSide === StatusBarLabelSide.Right && "uifw-footer-label-reversed",
    className);
  return (
    <>
      <FooterIndicatorComponent
        ref={target}
        className={classNames}
        title={title}
        style={style}
        onClick={handleOnIndicatorClick}
        {...{
          role: "button",
          tabIndex: -1,
        }}
      >
        {label && <span className="uifw-label">{ConditionalStringValue.getValue(label)}</span>}
        {iconSpec && <div className="uifw-indicator-icon"><Icon iconSpec={iconSpec} /></div>}
      </FooterIndicatorComponent>
      {dialog && <FooterPopup
        target={target.current}
        onClose={() => setIsOpen(false)}
        isOpen={isOpen}>
        {dialog}
      </FooterPopup>}
    </>
  );
}
