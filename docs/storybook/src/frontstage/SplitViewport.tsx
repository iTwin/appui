/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { AppUiStory, AppUiStoryProps } from "../AppUiStory";

/** This story shows two separate views. Depending on which view is active, the tools in the toolbars will change*/
export function SplitViewportStory(
  props: Pick<AppUiStoryProps, "frontstages" | "itemProviders">
) {
  return <AppUiStory layout="fullscreen" {...props} />;
}
