/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module AccuDraw
 */

import * as React from "react";
import { useViewports } from "../hooks/useViewports.js";
import { useListeners } from "../hooks/useListeners.js";
import { useAccuDrawStore } from "./AccuDrawStore.js";

/** @internal */
export function AccuDrawStoreProvider(props: React.PropsWithChildren) {
  const viewports = useViewports();

  // Updates `is3d` state based on last hovered viewport.
  useListeners(viewports, (viewport) => {
    const handler = () => {
      const is3d = viewport.view.is3d();
      useAccuDrawStore.setState({ is3d });
    };
    viewport.parentDiv.addEventListener("mousemove", handler);
    return () => viewport.parentDiv.removeEventListener("mousemove", handler);
  });
  return <>{props.children}</>;
}
