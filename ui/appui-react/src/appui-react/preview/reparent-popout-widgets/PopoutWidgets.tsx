/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import * as React from "react";
import { useLayout } from "../../layout/base/LayoutStore";
import { WidgetProvider } from "../../layout/widget/Widget";
import { PopoutWidget } from "./PopoutWidget";

/** This component renders all popout widgets.
 * @internal
 */
export function PopoutWidgets() {
  const ids = useLayout((state) => state.popoutWidgets.allIds);
  return (
    <>
      {ids.map((id) => {
        return (
          <WidgetProvider key={id} id={id}>
            <PopoutWidget />
          </WidgetProvider>
        );
      })}
    </>
  );
}
