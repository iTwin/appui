/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from "react";
import {
  PreviewFeatures,
  PreviewFeaturesProvider,
  ToolbarComposer,
  UiFramework,
} from "@itwin/appui-react";

interface StoryProps
  extends React.ComponentProps<typeof ToolbarComposer>,
    Pick<Required<PreviewFeatures>, "useStrataKit"> {
  /** Storybook only prop to simulate the active tool id. */
  activeToolId?: string;
}

export function ToolbarComposerStory(props: StoryProps) {
  const { activeToolId, useStrataKit, ...rest } = props;
  React.useEffect(() => {
    if (!activeToolId) return;
    UiFramework.frontstages.setActiveToolId(activeToolId);
  }, [activeToolId]);
  return (
    <PreviewFeaturesProvider features={{ useStrataKit }}>
      <ToolbarComposer {...rest} />
    </PreviewFeaturesProvider>
  );
}
