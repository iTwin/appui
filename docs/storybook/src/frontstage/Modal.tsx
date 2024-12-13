/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import {
  ModalFrontstageInfo,
  ToolbarItemUtilities,
  ToolbarOrientation,
  ToolbarUsage,
  UiFramework,
} from "@itwin/appui-react";
import { SvgPlaceholder } from "@itwin/itwinui-icons-react";
import { AppUiStory } from "../AppUiStory";
import { createFrontstage } from "../Utils";

type ModalFrontstageStoryProps = Pick<ModalFrontstageInfo, "backButton">;

/** [openModalFrontstage](https://www.itwinjs.org/reference/appui-react/frontstage/frameworkfrontstages/#openmodalfrontstage) can be used to open a modal frontstage. */
export function ModalFrontstageStory(props: ModalFrontstageStoryProps) {
  const { backButton } = props;
  return (
    <AppUiStory
      layout="fullscreen"
      frontstages={() => [createFrontstage()]}
      itemProviders={[
        {
          id: "toolbar",
          getToolbarItems: () => [
            ToolbarItemUtilities.createActionItem({
              id: "open",
              icon: <SvgPlaceholder />,
              label: "Open modal frontstage",
              execute: () => {
                UiFramework.frontstages.openModalFrontstage({
                  content: <>Modal frontstage content</>,
                  title: "My Modal Frontstage",
                  backButton,
                });
              },
              layouts: {
                standard: {
                  orientation: ToolbarOrientation.Horizontal,
                  usage: ToolbarUsage.ContentManipulation,
                },
              },
            }),
          ],
        },
      ]}
    />
  );
}
