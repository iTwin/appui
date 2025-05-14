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
import { createFrontstage } from "src/Utils";

type PreviewStoryProps = Pick<
  Required<PreviewFeatures>,
  "toolSettingsLockButton"
> &
  Pick<AppUiStoryProps, "onInitialize" | "onFrontstageActivated">;

/** `toolSettingsLockButton` preview feature. Displays the default tool settings lock editor as an icon button rather than a checkbox. */
export function PreviewStory(props: PreviewStoryProps) {
  return (
    <PreviewFeaturesProvider
      features={{
        toolSettingsLockButton: props.toolSettingsLockButton,
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
        {...props}
      />
    </PreviewFeaturesProvider>
  );
}
