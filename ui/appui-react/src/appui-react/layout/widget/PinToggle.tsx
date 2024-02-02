/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import * as React from "react";
import classnames from "classnames";
import { assert } from "@itwin/core-bentley";
import { NineZoneDispatchContext, useLabel } from "../base/NineZone";
import { PanelSideContext } from "../widget-panels/Panel";
import { useLayout } from "../base/LayoutStore";
import { Button } from "@itwin/itwinui-react";
import { SvgPin, SvgPinHollow } from "@itwin/itwinui-icons-react";

/** @internal */
export function PinToggle() {
  const side = React.useContext(PanelSideContext);
  assert(!!side);
  const dispatch = React.useContext(NineZoneDispatchContext);
  const pinPanelTitle = useLabel("pinPanelTitle");
  const unpinPanelTitle = useLabel("unpinPanelTitle");
  const pinned = useLayout((state) => state.panels[side].pinned);

  const className = classnames(
    "nz-widget-pinToggle",
    pinned ? "nz-is-pinned" : "nz-is-unpinned"
  );

  return (
    <Button
      className={className}
      styleType="borderless"
      size="small"
      onClick={() => {
        dispatch({
          side,
          type: "PANEL_TOGGLE_PINNED",
        });
      }}
      title={pinned ? unpinPanelTitle : pinPanelTitle}
    >
      {pinned ? <SvgPin /> : <SvgPinHollow />}
    </Button>
  );
}
