/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import * as React from "react";
import { FloatingWidgetProvider } from "./FloatingWidget";
import { FloatingTab } from "./FloatingTab";
import { useLayout } from "../base/LayoutStore";

/** This component renders all floating widgets.
 * @internal
 */
export const FloatingWidgets = React.memo(function FloatingWidgets() { // eslint-disable-line @typescript-eslint/naming-convention, no-shadow
  const floatingWidgets = useLayout((state) => state.floatingWidgets);
  const widgets = useLayout((state) => state.widgets);
  return (
    <>
      {floatingWidgets.allIds.map((floatingWidgetId) => {
        const widget = widgets[floatingWidgetId];
        const floatingWidget = floatingWidgets.byId[floatingWidgetId];
        return <FloatingWidgetProvider
          key={floatingWidgetId}
          floatingWidget={floatingWidget}
          widget={widget}
        />;
      })}
      <FloatingTab />
    </>
  );
});
