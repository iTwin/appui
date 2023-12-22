/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from "react";
import {
  ToolbarComposer,
  UiFramework,
} from "@itwin/appui-react/src/appui-react";

export interface StoryComponentProps
  extends React.ComponentProps<typeof ToolbarComposer> {
  /** Enables `newToolbars` preview feature. */
  newToolbars: boolean;
}

export function StoryComponent(props: StoryComponentProps) {
  const { newToolbars, ...other } = props;
  React.useEffect(() => {
    UiFramework.setPreviewFeatures({
      newToolbars,
    });
  }, [newToolbars]);
  return <ToolbarComposer {...other} />;
}
