/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
/** @module Utilities */

import * as React from "react";
import * as classnames from "classnames";

import { CommonProps } from "../utils/Props";
import { Badge } from "./Badge";

import newBadgeIcon from "./new-feature-badge.svg";
import "./NewBadge.scss";

/** New Badge React component
 * @internal
 */
// tslint:disable-next-line:variable-name
export const NewBadge: React.FunctionComponent<CommonProps> = (props: CommonProps) => {
  const { className, ...badgeProps } = props;
  return <Badge {...badgeProps} className={classnames("core-new-badge", className)} svg={newBadgeIcon} />;
};
