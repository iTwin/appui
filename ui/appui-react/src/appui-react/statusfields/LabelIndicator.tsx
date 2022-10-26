/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module StatusBar
 */

import "./LabelIndicator.scss";
import classnames from "classnames";
import * as React from "react";
import { FooterIndicator, FooterIndicatorProps } from "./Indicator";
import { Icon, IconSpec } from "@itwin/core-react";
import { StatusBarLabelSide } from "@itwin/appui-abstract";

/** Properties of [[FooterLabelIndicator]] component.
 * @beta
 */
export interface FooterLabelIndicatorProps extends Omit<FooterIndicatorProps, "children"> {
  /** Specification of an icon. */
  iconSpec?: IconSpec;
  /** Indicator label. */
  label?: string;
  /** Side to display label. */
  labelSide?: StatusBarLabelSide;
}

/** [[StatusBar]] indicator that shows a label with an icon.
 * @beta
 */
export function FooterLabelIndicator(props: FooterLabelIndicatorProps) {
  const { className, iconSpec, label, labelSide, ...other } = props;
  const classNames = classnames(
    "uifw-statusfields-labelIndicator",
    labelSide === StatusBarLabelSide.Right && "uifw-reversed",
    className,
  );
  return (
    <FooterIndicator
      className={classNames}
      {...other}
    >
      {label && <span className="uifw-label">{label}</span>}
      {iconSpec && <div className="uifw-icon"><Icon iconSpec={iconSpec} /></div>}
    </FooterIndicator>
  );
}
