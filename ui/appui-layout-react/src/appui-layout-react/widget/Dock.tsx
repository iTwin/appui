/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import * as React from "react";
import { NineZoneDispatchContext, useLabel } from "../base/NineZone";
import { Button } from "@itwin/itwinui-react";
import { SvgDockTop } from "@itwin/itwinui-icons-react";

/** @internal */
export function Dock() {
  const dispatch = React.useContext(NineZoneDispatchContext);
  const title = useLabel("dockToolSettingsTitle");
  return (
    <Button
      className="nz-widget-dock"
      styleType="borderless"
      size="small"
      onClick={() => {
        dispatch({
          type: "TOOL_SETTINGS_DOCK",
        });
      }}
      title={title}
    >
      <SvgDockTop />
    </Button>
  );
}
