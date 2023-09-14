/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module State
 */

import * as React from "react";
import type { WidgetState } from "../widgets/WidgetState";
import type { WidgetDef } from "../widgets/WidgetDef";
import type { BeEvent } from "@itwin/core-bentley";

/** @internal */
export interface Layout {
  readonly id: string;
  readonly setWidgetState?: (id: WidgetDef["id"], state: WidgetState) => void;
  readonly getWidgetState?: (id: WidgetDef["id"]) => WidgetState;
  readonly onWidgetStateChanged?: BeEvent<
    (id: WidgetDef["id"], state: WidgetState) => void
  >;
}

/** @internal */
export const defaultLayout: Layout = { id: "panels" };

/** @internal */
export const LayoutContext = React.createContext<Layout>(defaultLayout);

/** @internal */
export function useLayout() {
  return React.useContext(LayoutContext);
}
