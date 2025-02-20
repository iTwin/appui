/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { AppUiStory, AppUiStoryProps } from "../AppUiStory";

/** [FrontstageProvider](https://www.itwinjs.org/reference/appui-react/frontstage/frontstageprovider/) can be used to configure a frontstage. */
export function ToolSettingsStory(
  props: Pick<
    AppUiStoryProps,
    "onInitialize" | "frontstages" | "onFrontstageActivated"
  >
) {
  return (
    <AppUiStory
      layout="fullscreen"
      demoIModel={{ default: "blank" }}
      {...props}
    />
  );
}
