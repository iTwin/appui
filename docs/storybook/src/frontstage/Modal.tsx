/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import {
  ToolbarItemUtilities,
  ToolbarOrientation,
  ToolbarUsage,
  UiFramework,
} from "@itwin/appui-react";
import { SvgPlaceholder } from "@itwin/itwinui-icons-react";
import { AppUiStory } from "../AppUiStory";
import { createFrontstage } from "../Utils";

/** [openModalFrontstage](https://www.itwinjs.org/reference/appui-react/frontstage/frameworkfrontstages/#openmodalfrontstage) can be used to open a modal frontstage. */
export function ModalFrontstageStory() {
  return (
    <AppUiStory
      layout="fullscreen"
      frontstages={() => [createFrontstage()]}
      itemProviders={[
        {
          id: "toolbar",
          getToolbarItems: () => [
            ToolbarItemUtilities.createActionItem(
              "open",
              10,
              <SvgPlaceholder />,
              "Open modal frontstage",
              () => {
                UiFramework.frontstages.openModalFrontstage({
                  content: <>Modal frontstage content</>,
                  title: "My Modal Frontstage",
                });
              },
              {
                layouts: {
                  standard: {
                    orientation: ToolbarOrientation.Horizontal,
                    usage: ToolbarUsage.ContentManipulation,
                  },
                },
              }
            ),
          ],
        },
      ]}
    />
  );
}
