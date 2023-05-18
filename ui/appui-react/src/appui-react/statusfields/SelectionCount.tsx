/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module StatusBar
 */

import "./SelectionCount.scss";
import classnames from "classnames";
import * as React from "react";
import type { CommonProps } from "@itwin/core-react";
import { Icon } from "@itwin/core-react";
import { FooterIndicator } from "@itwin/appui-layout-react";
import { SvgCursor } from "@itwin/itwinui-icons-react";

/** Properties for the [[SelectionCountField]] component.
 * @beta
 */
export interface SelectionCountFieldProps extends CommonProps {
  count: number;
}

/** Status field component used to display the number of selected items.
 * @beta
 */
export function SelectionCountField(props: SelectionCountFieldProps) {
  const className = classnames(
    "uifw-statusFields-selectionCount",
    props.className,
  );
  return (
    <FooterIndicator
      className={className}
      style={props.style}
    >
      <Icon iconSpec={<SvgCursor />} />
      {props.count}
    </FooterIndicator>
  );
}
