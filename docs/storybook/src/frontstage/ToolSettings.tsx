/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { createFrontstage } from "../Utils";
import { AppUiStory, AppUiStoryProps } from "../AppUiStory";
import {
  IModelViewportControl,
  StagePanelLocation,
  StagePanelSection,
  StandardContentLayouts,
  StandardLayout,
  WidgetState,
} from "@itwin/appui-react";

interface Props
  extends Pick<
    AppUiStoryProps,
    "onInitialize" | "frontstages" | "onFrontstageActivated"
  > {
  mode?: "widget" | "floating";
}

/** [FrontstageProvider](https://www.itwinjs.org/reference/appui-react/frontstage/frontstageprovider/) can be used to configure a frontstage. */
export function ToolSettingsStory(props: Props) {
  const { mode, ...rest } = props;
  return (
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
          toolSettings: {
            id: "toolSettings",
            defaultState:
              mode === "floating" ? WidgetState.Floating : undefined,
          },
          layout: (
            <StandardLayout
              toolSettings={{
                defaultLocation:
                  mode === undefined
                    ? undefined
                    : {
                        location: StagePanelLocation.Right,
                        section: StagePanelSection.Start,
                      },
              }}
            />
          ),
        }),
      ]}
      {...rest}
    />
  );
}
