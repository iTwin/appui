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
import popoutToggleSvg from "./window-popout.svg";
import { Icon } from "@itwin/core-react";
import { useActiveTabId } from "./Widget";

type WEB_COMPONENT_PREFIX = "webSvg:";
type WebComponentIconSpec = `${WEB_COMPONENT_PREFIX}${string}`;

/** @internal */
export function PopoutToggle() {
  const dispatch = React.useContext(NineZoneDispatchContext);
  const activeTabId = useActiveTabId();
  const iconSpec: WebComponentIconSpec = `webSvg:${popoutToggleSvg}`;
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
      <Icon iconSpec={iconSpec} />
    </button>
  );
}
