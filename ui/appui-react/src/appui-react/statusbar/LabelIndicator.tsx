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
import type { StatusBarIndicatorProps } from "./Indicator";
import { StatusBarIndicator } from "./Indicator";
import type { IconSpec } from "@itwin/core-react";
import { Icon } from "@itwin/core-react";
import { StatusBarLabelSide } from "./StatusBarItem";
import { Label } from "@itwin/itwinui-react";

/** Properties of [[StatusBarLabelIndicator]] component.
 * @beta
 * @deprecated in 4.14.0. Props of deprecated component {@link StatusBarLabelIndicator}.
 */
export interface StatusBarLabelIndicatorProps
  // eslint-disable-next-line deprecation/deprecation
  extends Omit<StatusBarIndicatorProps, "children"> {
  /** Specification of an icon. */
  // eslint-disable-next-line deprecation/deprecation
  iconSpec?: IconSpec;
  /** Indicator label. */
  label?: string;
  /** Side to display label. */
  labelSide?: StatusBarLabelSide;
}

/** [[StatusBar]] indicator that shows a label with an icon.
 * @beta
 * @deprecated in 4.14.0. Use [iTwinUI Label](https://itwinui.bentley.com/docs/typography#label) and {@link Icon AppUI Icon} instead.
 */
// eslint-disable-next-line deprecation/deprecation
export function StatusBarLabelIndicator(props: StatusBarLabelIndicatorProps) {
  const { className, iconSpec, label, labelSide, ...other } = props;
  const classNames = classnames(
    "uifw-statusbar-labelIndicator",
    labelSide === StatusBarLabelSide.Right && "uifw-reversed",
    className
  );
  return (
    // eslint-disable-next-line deprecation/deprecation
    <StatusBarIndicator className={classNames} {...other}>
      {label && <Label className="uifw-label">{label}</Label>}
      {/* eslint-disable-next-line deprecation/deprecation */}
      {iconSpec && <Icon iconSpec={iconSpec} />}
    </StatusBarIndicator>
  );
}
