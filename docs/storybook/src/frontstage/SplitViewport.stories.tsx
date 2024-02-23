/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { Meta, StoryObj } from "@storybook/react";
import {
  ConditionalBooleanValue,
  ConditionalStringValue,
  StandardContentLayouts,
} from "@itwin/appui-abstract";
import {
  ContentProps,
  IModelViewportControl,
  SyncUiEventId,
  ToolbarItemUtilities,
  UiFramework,
} from "@itwin/appui-react";
import { ConditionalIconItem } from "@itwin/core-react";
import {
  Svg2D,
  Svg3D,
  SvgAirplane,
  SvgClipboard,
  SvgWindow,
  SvgWindowSplitVertical,
} from "@itwin/itwinui-icons-react";
import { AppUiDecorator } from "../Decorators";
import { Page } from "../AppUiStory";
import { createFrontstageProvider, removeProperty } from "../Utils";
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
    frontstageProviders: removeProperty(),
    itemProviders: removeProperty(),
  },
} satisfies Meta<typeof SplitViewportStory>;

export default meta;
type Story = StoryObj<typeof meta>;

const contentPropsArray: ContentProps[] = [];
contentPropsArray.push({
  id: "imodel-view-0",
  classId: IModelViewportControl.id,
});
contentPropsArray.push({
  id: "imodel-view-1",
  classId: IModelViewportControl.id,
});

let leftViewportActive = false;
const testIcon1 = () => {
  return leftViewportActive ? <SvgWindowSplitVertical /> : <SvgWindow />;
};
const testIcon2 = () => {
  return leftViewportActive ? <Svg2D /> : <Svg3D />;
};
const testIcon3 = () => {
  return leftViewportActive ? <SvgClipboard /> : <SvgAirplane />;
};

UiFramework.content.onActiveContentChangedEvent.addListener(() => {
  leftViewportActive = !leftViewportActive;
});

export const Default: Story = {
  args: {
    frontstageProviders: [
      createFrontstageProvider({
        contentGroupProps: {
          id: "split-vertical-group",
          layout: StandardContentLayouts.twoVerticalSplit,
          contents: contentPropsArray,
        },
      }),
    ],
    itemProviders: [
      {
        id: "toolbar",
        provideToolbarItems: () => [
          ToolbarItemUtilities.createActionItem(
            `Test1and2`,
            0,
            new ConditionalIconItem(testIcon1, [
              SyncUiEventId.ActiveContentChanged,
            ]),
            new ConditionalStringValue(
              () => (leftViewportActive ? "Test 1" : "Test 2"),
              [SyncUiEventId.ActiveContentChanged]
            ),
            () => undefined
          ),
          ToolbarItemUtilities.createActionItem(
            `Test3and4`,
            1,
            new ConditionalIconItem(testIcon2, [
              SyncUiEventId.ActiveContentChanged,
            ]),
            new ConditionalStringValue(
              () => (leftViewportActive ? "Test 3" : "Test 4"),
              [SyncUiEventId.ActiveContentChanged]
            ),
            () => undefined,
            {
              isDisabled: new ConditionalBooleanValue(
                () => (leftViewportActive ? true : false),
                [SyncUiEventId.ActiveContentChanged]
              ),
            }
          ),
          ToolbarItemUtilities.createActionItem(
            `Test5and6`,
            2,
            new ConditionalIconItem(testIcon3, [
              SyncUiEventId.ActiveContentChanged,
            ]),
            new ConditionalStringValue(
              () => (leftViewportActive ? "Test 5" : "Test 6"),
              [SyncUiEventId.ActiveContentChanged]
            ),
            () => undefined,
            {
              isHidden: new ConditionalBooleanValue(
                () => (leftViewportActive ? true : false),
                [SyncUiEventId.ActiveContentChanged]
              ),
            }
          ),
        ],
      },
    ],
  },
};
