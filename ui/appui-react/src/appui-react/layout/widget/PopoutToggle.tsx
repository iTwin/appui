/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

// cSpell:ignore popout

import "./PopoutToggle.scss";
import * as React from "react";
import { NineZoneDispatchContext, useLabel } from "../base/NineZone";
import { Icon } from "@itwin/core-react";
import { useActiveTabId } from "./Widget";

function SvgPopout(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="m16 0v5.4l-1.9-2-8.4 8.4-1.5-1.5 8.3-8.4-1.9-1.9m5.4 16v-9h-1v8h-14v-14h8v-1h-9v16z" />
    </svg>
  );
}

/** @internal */
export function PopoutToggle() {
  const dispatch = React.useContext(NineZoneDispatchContext);
  const activeTabId = useActiveTabId();
  const popoutTitle = useLabel("popoutActiveTab");

  return (
    <button
      className="nz-widget-popoutToggle"
      onClick={() => {
        dispatch({
          id: activeTabId,
          type: "WIDGET_TAB_POPOUT",
        });
      }}
      title={popoutTitle}
    >
      <Icon iconSpec={<SvgPopout />} />
    </button>
  );
}
