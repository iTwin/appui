/*---------------------------------------------------------------------------------------------
* Copyright (c) 2018 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
/** @module Zone */

import * as classnames from "classnames";
import * as React from "react";
import Target, { TargetProps } from "./Target";
import Arrow from "./Arrow";
import "./Back.scss";
import { WidgetZoneIndex } from "../state/NineZone";

/** Properties of [[Back]] component. */
export interface BackProps extends TargetProps {
  /** Rotation of back arrow depends on specified zone index. */
  zoneIndex: WidgetZoneIndex;
}

/** Back home target. */
// tslint:disable-next-line:variable-name
export const Back: React.StatelessComponent<BackProps> = (props: BackProps) => {
  const mergeClassName = classnames(
    "nz-zones-target-back",
    `nz-zone-${props.zoneIndex}`,
    props.className);

  return (
    <Target
      className={mergeClassName}
      {...props}
    >
      <Arrow className="nz-arrow" />
    </Target>
  );
};

export default Back;
