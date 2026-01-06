/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
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
import { action } from "storybook/actions";

type ModalFrontstageStoryProps = Pick<
  ModalFrontstageInfo,
  "backButton" | "notifyCloseRequest" | "appBarRight"
>;

/** [openModalFrontstage](https://www.itwinjs.org/reference/appui-react/frontstage/frameworkfrontstages/#openmodalfrontstage) can be used to open a modal frontstage. */
export function ModalFrontstageStory(props: ModalFrontstageStoryProps) {
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
                  id: "my-modal-frontstage",
                  content: <>Modal frontstage content</>,
                  title: "My Modal Frontstage",
                  ...props,
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
    >
      <ModalFrontstageEvents />
    </AppUiStory>
  );
}

function ModalFrontstageEvents() {
  React.useEffect(() => {
    return UiFramework.frontstages.onModalFrontstageChangedEvent.addListener(
      action("onModalFrontstageChangedEvent")
    );
  }, []);
  React.useEffect(() => {
    return UiFramework.frontstages.onCloseModalFrontstageRequestedEvent.addListener(
      (args) => {
        action("onCloseModalFrontstageRequestedEvent (close after 2s)")(args);
        setTimeout(args.stageCloseFunc, 2000);
      }
    );
  }, []);
  React.useEffect(() => {
    return UiFramework.frontstages.onModalFrontstageClosedEvent.addListener(
      action("onModalFrontstageClosedEvent")
    );
  }, []);
  return null;
}
