/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import * as React from "react";
import { FloatingWidgetProvider } from "./FloatingWidget";
import { FloatingTabProvider } from "./FloatingTab";
import { useLayout } from "../base/LayoutStore";

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
