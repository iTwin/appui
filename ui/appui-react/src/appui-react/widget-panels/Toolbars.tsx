/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Item
 */

import "./Toolbars.scss";
import * as React from "react";
import { useActiveFrontstageDef } from "../frontstage/Frontstage";

/** @internal */
export function WidgetPanelsToolbars() {
  const frontstageDef = useActiveFrontstageDef();
  const tools = frontstageDef?.contentManipulation?.reactNode;
  const navigation = frontstageDef?.viewNavigation?.reactNode;
  return (
    <div className="uifw-widgetPanels-toolbars">
      {tools}
      {navigation}
    </div>
  );
}
