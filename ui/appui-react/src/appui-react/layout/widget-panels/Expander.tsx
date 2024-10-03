/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module WidgetPanels
 */

import "./Expander.scss";
import classnames from "classnames";
import * as React from "react";
import type { PanelSide } from "./PanelTypes.js";
import { panelSides } from "./Panel.js";
import { NineZoneDispatchContext } from "../base/NineZone.js";
import { Timer } from "@itwin/core-react";
import { Point } from "@itwin/core-react/internal";
import { useLayout } from "../base/LayoutStore.js";

/** @internal */
export interface WidgetPanelExpanderProps {
  side: PanelSide;
}

/** Component that is used to auto-expand unpinned widget panel.
 * @internal
 */
export function WidgetPanelExpander({ side }: WidgetPanelExpanderProps) {
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  const timer = React.useRef(new Timer(200));
  const lastPosition = React.useRef(new Point());
  const dispatch = React.useContext(NineZoneDispatchContext);
  React.useEffect(() => {
    timer.current.setOnExecute(() => {
      dispatch({
        side,
        collapsed: false,
        type: "PANEL_SET_COLLAPSED",
      });
    });
  }, [side, dispatch]);
  const className = classnames("nz-widgetPanels-expander", `nz-${side}`);
  return (
    <div
      className={className}
      onMouseOverCapture={(e) => {
        lastPosition.current = new Point(e.clientX, e.clientY);
        timer.current.start();
      }}
      onMouseOutCapture={() => {
        timer.current.stop();
      }}
      onMouseMoveCapture={(e) => {
        const newPosition = new Point(e.clientX, e.clientY);
        if (lastPosition.current.getDistanceTo(newPosition) > 5) {
          timer.current.start();
          lastPosition.current = newPosition;
        }
      }}
    />
  );
}

/** @internal */
export function WidgetPanelExpanders() {
  const expanders = useLayout((state) => {
    const panels = state.panels;
    return panelSides.filter((side) => {
      const panel = panels[side];
      return !panel.pinned && panel.collapsed;
    });
  }, true);

  return (
    <>
      {expanders.map((side) => {
        return <WidgetPanelExpander key={side} side={side} />;
      })}
    </>
  );
}
