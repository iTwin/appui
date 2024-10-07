/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Tabs
 */

import * as React from "react";
import type { TabsProps } from "./Tabs.js";
import { Tabs } from "./Tabs.js";
import { Orientation } from "../enums/Orientation.js";

/* eslint-disable deprecation/deprecation */

/** Vertical tabs meant to represent the current position in a page/section
 * @public
 * @deprecated in 4.12.0. Use {@link https://itwinui.bentley.com/docs/tabs#vertical iTwinUI Tabs} instead.
 */
export function VerticalTabs(props: TabsProps) {
  return (
    <Tabs
      mainClassName="uicore-tabs-vertical"
      orientation={Orientation.Vertical}
      {...props}
    />
  );
}
