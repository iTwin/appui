/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
/** @module Utilities */

import * as React from "react";
import { Badge } from "./Badge";
import { CommonProps } from "../utils/Props";

import betaBadgeIcon from "./technical-preview-badge.svg";

/** Beta Badge React component
 * @internal
 */
// tslint:disable-next-line:variable-name
export const BetaBadge: React.FunctionComponent<CommonProps> = (props: CommonProps) => {
  return <Badge {...props} svg={betaBadgeIcon} />;
};
