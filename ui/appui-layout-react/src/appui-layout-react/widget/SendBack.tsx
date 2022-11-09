/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import "./SendBack.scss";
import classnames from "classnames";
import * as React from "react";
import { NineZoneDispatchContext, useLabel } from "../base/NineZone";
import { assert } from "@itwin/core-bentley";
import { useLayout } from "../base/LayoutStore";
import { FloatingWidgetIdContext } from "./FloatingWidget";

/** @internal */
export function SendBack() {
  const id = React.useContext(FloatingWidgetIdContext);
  assert(!!id);
  const side = useLayout((state) => state.floatingWidgets.byId[id].home.side);
  const dispatch = React.useContext(NineZoneDispatchContext);
  const title = useLabel("sendWidgetHomeTitle");
  const className = classnames(
    "nz-widget-sendBack",
    `nz-${side}`,
  );
  return (
    <button
      className={className}
      onClick={() => {
        dispatch({
          type: "FLOATING_WIDGET_SEND_BACK",
          id,
        });
      }}
      title={title}
    >
      <i />
    </button >
  );
}
