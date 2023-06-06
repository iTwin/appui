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

/** Properties of [[StatusBarLabelIndicator]] component.
 * @beta
 */
export interface StatusBarLabelIndicatorProps
  extends Omit<StatusBarIndicatorProps, "children"> {
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
export function StatusBarLabelIndicator(props: StatusBarLabelIndicatorProps) {
  const { className, iconSpec, label, labelSide, ...other } = props;
  const classNames = classnames(
    "uifw-statusbar-labelIndicator",
    labelSide === StatusBarLabelSide.Right && "uifw-reversed",
    className
  );
  return (
    <StatusBarIndicator className={classNames} {...other}>
      {label && <span className="uifw-label">{label}</span>}
      {iconSpec && (
        <div className="uifw-icon">
          <Icon iconSpec={iconSpec} />
        </div>
      )}
    </StatusBarIndicator>
  );
}
