/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  ConditionalBooleanValue,
  StandardContentLayouts,
} from "@itwin/appui-abstract";
import {
  IModelViewportControl,
  SyncUiEventId,
  ToolbarItemUtilities,
  ToolbarOrientation,
  ToolbarUsage,
  UiFramework,
} from "@itwin/appui-react";
import { SvgWindow, SvgWindowSplitVertical } from "@itwin/itwinui-icons-react";
import { AppUiDecorator } from "../Decorators";
import { Page } from "../AppUiStory";
import { createFrontstage, removeProperty } from "../Utils";
import { SplitViewportStory } from "./SplitViewport";

const meta = {
  title: "Frontstage/SplitViewport",
  component: SplitViewportStory,
  tags: ["autodocs"],
  decorators: [AppUiDecorator],
  parameters: {
    docs: {
      page: () => <Page />,
    },
    layout: "fullscreen",
  },
  argTypes: {
    frontstages: removeProperty(),
    itemProviders: removeProperty(),
  },
} satisfies Meta<typeof SplitViewportStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    frontstages: [
      createFrontstage({
        contentGroupProps: {
          id: "split-vertical-group",
          layout: StandardContentLayouts.twoVerticalSplit,
          contents: [
            {
              id: "imodel-view-0",
              classId: IModelViewportControl.id,
            },
            {
              id: "imodel-view-1",
              classId: IModelViewportControl.id,
            },
          ],
        },
      }),
    ],
    itemProviders: [
      {
        id: "toolbar",
        getToolbarItems: () => {
          const layouts = {
            standard: {
              usage: ToolbarUsage.ContentManipulation,
              orientation: ToolbarOrientation.Horizontal,
            },
          };
          return [
            ToolbarItemUtilities.createActionItem({
              id: "action1",
              label: "Action 1",
              icon: <SvgWindow />,
              isHidden: new ConditionalBooleanValue(
                () =>
                  UiFramework.content.getActiveId() === "imodel-view-0"
                    ? false
                    : true,
                [SyncUiEventId.ActiveContentChanged]
              ),
              layouts,
            }),
            ToolbarItemUtilities.createActionItem({
              id: "action2",
              label: "Action 2",
              icon: <SvgWindowSplitVertical />,
              isHidden: new ConditionalBooleanValue(
                () =>
                  UiFramework.content.getActiveId() === "imodel-view-1"
                    ? false
                    : true,
                [SyncUiEventId.ActiveContentChanged]
              ),
              layouts,
            }),
          ];
        },
      },
    ],
  },
};
