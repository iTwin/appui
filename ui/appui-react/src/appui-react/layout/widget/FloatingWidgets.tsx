/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import * as React from "react";
import { FloatingWidgetProvider } from "./FloatingWidget.js";
import { FloatingTabProvider } from "./FloatingTab.js";
import { useLayout } from "../base/LayoutStore.js";

/** This component renders all floating widgets.
 * @internal
 */
export function FloatingWidgets() {
  const ids = useLayout((state) => state.floatingWidgets.allIds);
  return (
    <>
      {ids.map((id) => {
        return <FloatingWidgetProvider key={id} id={id} />;
      })}
      <FloatingTabProvider />
    </>
  );
}
