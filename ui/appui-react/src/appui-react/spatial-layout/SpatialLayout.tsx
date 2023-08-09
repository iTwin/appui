/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module State
 */

import * as React from "react";
import type { CommonProps } from "@itwin/core-react";
import type { Dispatch } from "../layout/Action";
import { SpatialLayoutStateReducer } from "./SpatialLayoutStateReducer";
import { useActiveFrontstageDef } from "../frontstage/FrontstageDef";
import { useSpatialLayoutStore } from "./SpatialLayoutStore";

// TODO: need to emit WidgetDef events, handle setters & getters.
function useSetupSpatialLayout() {
  const frontstageDef = useActiveFrontstageDef();
  const dispatch = React.useCallback<Dispatch>((action) => {
    let state = useSpatialLayoutStore.getState();
    state = SpatialLayoutStateReducer(state, action);
    useSpatialLayoutStore.setState(state, true);
  }, []);
  React.useEffect(() => {
    if (!frontstageDef) return;
    frontstageDef.dispatch = dispatch;
  }, [frontstageDef, dispatch]);
}

/** @internal */
export interface SpatialLayoutProps extends CommonProps {
  content?: React.ReactNode;
  children?: React.ReactNode;
}

/** @internal */
export function SpatialLayout(props: SpatialLayoutProps) {
  useSetupSpatialLayout();
  return (
    <div style={props.style}>
      <div style={{ position: "absolute", height: "100%", width: "100%" }}>
        {props.content}
      </div>
      {props.children}
    </div>
  );
}
