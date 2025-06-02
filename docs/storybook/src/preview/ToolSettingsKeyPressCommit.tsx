/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import {
  IModelViewportControl,
  PreviewFeatures,
  PreviewFeaturesProvider,
  StandardContentLayouts,
} from "@itwin/appui-react";
import { AppUiStory, AppUiStoryProps } from "../AppUiStory";
import { createFrontstage } from "../Utils";

type PreviewStoryProps = Pick<
  Required<PreviewFeatures>,
  "toolSettingsKeyPressCommit" | "toolSettingsNewEditors"
> &
  Pick<AppUiStoryProps, "onInitialize" | "onFrontstageActivated">;

/** `toolSettingsKeyPressCommit` preview feature. When enabled the input-like editors rendered in the tool settings will commit the entered value on key press. */
export function PreviewStory(props: PreviewStoryProps) {
  return (
    <PreviewFeaturesProvider
      features={{
        toolSettingsKeyPressCommit: props.toolSettingsKeyPressCommit,
        toolSettingsNewEditors: props.toolSettingsNewEditors,
      }}
    >
      <AppUiStory
        layout="fullscreen"
        demoIModel={{ default: "blank" }}
        frontstages={[
          createFrontstage({
            contentGroupProps: {
              id: "ViewportContentGroup",
              layout: StandardContentLayouts.singleView,
              contents: [
                {
                  id: "ViewportContent",
                  classId: IModelViewportControl,
                },
              ],
            },
            hideToolSettings: false,
          }),
        ]}
        onInitialize={props.onInitialize}
        onFrontstageActivated={props.onFrontstageActivated}
      />
    </PreviewFeaturesProvider>
  );
}
