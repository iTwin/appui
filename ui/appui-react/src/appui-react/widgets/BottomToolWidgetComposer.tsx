/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import {
  useProximityToMouse,
  WidgetElementSet,
  WidgetOpacityContext,
} from "@itwin/core-react/internal";
import * as React from "react";
import { UiFramework } from "../UiFramework.js";
import { useUiVisibility } from "../hooks/useUiVisibility.js";

/** Properties for [[BottomToolWidgetComposer]].
 * @public
 */
export interface BottomToolWidgetComposerProps {
  /** Optional Horizontal Toolbar */
  horizontalToolbar?: React.ReactNode;
  /** Optional Vertical Toolbar */
  verticalToolbar?: React.ReactNode;
}

/**
 * BottomToolWidgetComposer renders an L-shaped toolbar area at the bottom of the content area,
 * with a vertical toolbar on the left and a horizontal toolbar along the bottom.
 * @public
 */
export function BottomToolWidgetComposer(props: BottomToolWidgetComposerProps) {
  const { horizontalToolbar, verticalToolbar } = props;
  const [elementSet] = React.useState(new WidgetElementSet());
  const proximityScale = useProximityToMouse(
    elementSet,
    UiFramework.visibility.snapWidgetOpacity
  );
  const uiIsVisible = useUiVisibility();

  const addRef = React.useCallback<
    React.ContextType<typeof WidgetOpacityContext>["addRef"]
  >(
    (ref) => {
      elementSet.add(ref);
    },
    [elementSet]
  );
  const removeRef = React.useCallback<
    React.ContextType<typeof WidgetOpacityContext>["removeRef"]
  >(
    (ref) => {
      elementSet.delete(ref);
    },
    [elementSet]
  );

  return (
    <WidgetOpacityContext.Provider
      value={{
        addRef,
        removeRef,
        proximityScale,
      }}
    >
      <div
        className="uifw-bottom-toolArea"
        style={{
          opacity: uiIsVisible ? 1 : 0,
          transition: "opacity 0.4s ease-in-out",
        }}
        onMouseEnter={UiFramework.visibility.handleWidgetMouseEnter}
      >
        {verticalToolbar && (
          <div className="uifw-bottom-toolArea_vertical">{verticalToolbar}</div>
        )}
        {horizontalToolbar && (
          <div className="uifw-bottom-toolArea_horizontal">
            {horizontalToolbar}
          </div>
        )}
      </div>
    </WidgetOpacityContext.Provider>
  );
}
