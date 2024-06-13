/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { StandardFrontstageProps } from "@itwin/appui-react";
import { AppUiStory, AppUiStoryProps } from "../AppUiStory";
import { createFrontstage } from "../Utils";

type FrontstageStoryProps = Pick<AppUiStoryProps, "itemProviders"> &
  Pick<StandardFrontstageProps, "hideStatusBar" | "hideToolSettings"> & {
    frontstage?: Partial<StandardFrontstageProps>;
  };

/** [FrontstageProvider](https://www.itwinjs.org/reference/appui-react/frontstage/frontstageprovider/) can be used to configure a frontstage. */
export function FrontstageStory(props: FrontstageStoryProps) {
  const frontstage = createFrontstage({
    ...props.frontstage,
    hideStatusBar: props.hideStatusBar,
    hideToolSettings: props.hideToolSettings,
  });
  return (
    <AppUiStory layout="fullscreen" frontstages={[frontstage]} {...props} />
  );
}
