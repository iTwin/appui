/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import type { CommonProps } from "@itwin/core-react";
import {
  useProximityToMouse,
  WidgetElementSet,
  WidgetOpacityContext,
} from "@itwin/core-react/internal";
import * as React from "react";
import { ToolsArea } from "../layout/widget/ToolsArea.js";
import { UiFramework } from "../UiFramework.js";

/** Properties for the [[ToolWidgetComposer]] React components
 * @public
 * @deprecated in 4.17.0. Use `React.ComponentProps<typeof ToolWidgetComposer>`
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
export interface ToolWidgetComposerProps extends CommonProps {
  /** Optional Corner Item which for most stages is the [[BackstageAppButton]] used to toggle the display of the backstage menu. */
  cornerItem?: React.ReactNode;
  /** Optional Horizontal Toolbar */
  horizontalToolbar?: React.ReactNode;
  /** Optional Vertical Toolbar */
  verticalToolbar?: React.ReactNode;
}

/**
 * ToolWidget component that supports use of ToolbarComposer-based Toolbars. The ToolWidget is shown in the top left of the content area
 * and typically holds tools to manipulate or interrogate content. The horizontal toolbar often includes context specific tools based on
 * selected items. The vertical toolbar typically contains a more fixed list of tools.
 * @public
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
export function ToolWidgetComposer(props: ToolWidgetComposerProps) {
  const { cornerItem, horizontalToolbar, verticalToolbar, ...otherProps } =
    props;
  const [elementSet] = React.useState(new WidgetElementSet());
  const proximityScale = useProximityToMouse(
    elementSet,
    UiFramework.visibility.snapWidgetOpacity
  );

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
      <ToolsArea
        button={cornerItem}
        horizontalToolbar={horizontalToolbar}
        verticalToolbar={verticalToolbar}
        {...otherProps}
        onMouseEnter={UiFramework.visibility.handleWidgetMouseEnter}
      />
    </WidgetOpacityContext.Provider>
  );
}
