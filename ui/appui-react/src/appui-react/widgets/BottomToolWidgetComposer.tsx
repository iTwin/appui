/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import "../widget-panels/Toolbars.scss";
import * as React from "react";
import {
  useProximityToMouse,
  WidgetElementSet,
  WidgetOpacityContext,
} from "@itwin/core-react/internal";
import { UiFramework } from "../UiFramework.js";
import { useUiVisibility } from "../hooks/useUiVisibility.js";

/** Properties for {@link BottomToolWidgetComposer}.
 * @public
 */
export interface BottomToolWidgetComposerProps {
  /** Optional Horizontal Toolbar */
  horizontalToolbar?: React.ReactNode;
  /** Optional Vertical Toolbar */
  verticalToolbar?: React.ReactNode;
}

/**
 * BottomToolWidgetComposer renders an L-shaped toolbar area anchored to the bottom of the content area.
 * The vertical toolbar grows upward and the horizontal toolbar is positioned at the bottom,
 * offset by the vertical toolbar's width.
 * @public
 */
export function BottomToolWidgetComposer(
  props: BottomToolWidgetComposerProps
) {
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

  if (!uiIsVisible) return null;

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
        onMouseEnter={UiFramework.visibility.handleWidgetMouseEnter}
      >
        <div className="uifw-bottom-toolArea_vertical">
          {verticalToolbar}
        </div>
        <div className="uifw-bottom-toolArea_horizontal">
          {horizontalToolbar}
        </div>
      </div>
    </WidgetOpacityContext.Provider>
  );
}
