/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module State
 */

import * as React from "react";
import type { CommonProps } from "@itwin/core-react";
import { useSpatialLayoutEvents } from "./useSpatialLayoutEvents";

/** @internal */
export interface SpatialFrontstageProps extends CommonProps {
  content?: React.ReactNode;
  contextNavigation?: React.ReactNode;
  viewNavigation?: React.ReactNode;
  contentManipulation?: React.ReactNode;
  panel?: React.ReactNode;
}

/** @internal */
export function SpatialFrontstage(props: SpatialFrontstageProps) {
  useSpatialLayoutEvents();
  return (
    <div style={props.style}>
      <div style={{ position: "absolute", height: "100%", width: "100%" }}>
        {props.content}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          padding: "0.5em",
          boxSizing: "border-box",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {props.contextNavigation}
          {props.viewNavigation}
        </div>
        {props.panel}
        {props.contentManipulation}
      </div>
    </div>
  );
}
