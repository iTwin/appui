/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

// cSpell:ignore popout

import * as React from "react";
import { NineZoneDispatchContext, useLabel } from "../base/NineZone";
import { useActiveTabId } from "./Widget";
import { Button } from "@itwin/itwinui-react";
import { SvgWindowPopout } from "@itwin/itwinui-icons-react";

/** @internal */
export function PopoutToggle() {
  const dispatch = React.useContext(NineZoneDispatchContext);
  const activeTabId = useActiveTabId();
  const popoutTitle = useLabel("popoutActiveTab");

  return (
    <Button
      className="nz-widget-popoutToggle"
      styleType="borderless"
      size="small"
      onClick={() => {
        dispatch({
          id: activeTabId,
          type: "WIDGET_TAB_POPOUT",
        });
      }}
      title={popoutTitle}
    >
      <SvgWindowPopout />
    </Button>
  );
}
