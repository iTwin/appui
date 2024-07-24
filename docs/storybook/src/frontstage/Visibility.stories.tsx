/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { action } from "@storybook/addon-actions";
import type { Decorator, Meta, StoryObj } from "@storybook/react";
import {
  StagePanelState,
  ToolbarItemUtilities,
  ToolbarOrientation,
  ToolbarUsage,
  UiFramework,
  WidgetState,
} from "@itwin/appui-react";
import { SvgPlaceholder } from "@itwin/itwinui-icons-react";
import { AppUiStory, Page } from "../AppUiStory";
import { createFrontstage, createWidget } from "../Utils";

function Component(
  _props: Pick<typeof UiFramework.visibility, "autoHideUi" | "inactivityTime">
) {
  return null;
}

const StoryDecorator: Decorator<React.ComponentProps<typeof Component>> = (
  _Story,
  context
) => {
  return (
    <AppUiStory
      onInitialize={async () => {
        UiFramework.visibility.autoHideUi = context.args.autoHideUi;
        UiFramework.visibility.inactivityTime = context.args.inactivityTime;
      }}
      frontstages={[
        createFrontstage({
          leftPanelProps: {
            pinned: true,
            defaultState: StagePanelState.Open,
          },
        }),
      ]}
      itemProviders={[
        {
          id: "p1",
          getToolbarItems: () => {
            const item = ToolbarItemUtilities.createActionItem(
              "item1",
              100,
              <SvgPlaceholder />,
              "Item",
              action("Item"),
              {
                layouts: {
                  standard: {
                    orientation: ToolbarOrientation.Horizontal,
                    usage: ToolbarUsage.ContentManipulation,
                  },
                },
              }
            );
            return [
              item,
              {
                ...item,
                id: "item2",
                layouts: {
                  standard: {
                    orientation: ToolbarOrientation.Horizontal,
                    usage: ToolbarUsage.ViewNavigation,
                  },
                },
              },
            ];
          },
          getWidgets: () => [
            createWidget(1),
            createWidget(2, { defaultState: WidgetState.Floating }),
          ],
        },
      ]}
    />
  );
};

const meta = {
  title: "Frontstage/Visibility",
  component: Component,
  tags: ["autodocs"],
  decorators: [StoryDecorator],
  parameters: {
    docs: {
      page: () => <Page />,
    },
    layout: "fullscreen",
  },
  args: {
    autoHideUi: UiFramework.visibility.autoHideUi,
    inactivityTime: UiFramework.visibility.inactivityTime,
  },
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AutoHideUI: Story = {
  args: {
    autoHideUi: true,
  },
};

export const InactivityTime: Story = {
  args: {
    autoHideUi: true,
    inactivityTime: 1000,
  },
};
