/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  ToolbarUsage,
  ToolbarOrientation,
  ToolbarItemLayouts,
} from "@itwin/appui-react";
import { Page } from "../AppUiStory";
import { ToolbarStory } from "./Toolbar";
import { createToolbarItemFactory, enumArgType } from "../Utils";

const meta = {
  title: "Frontstage/Toolbar",
  component: ToolbarStory,
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: () => <Page />,
    },
    layout: "fullscreen",
  },
  args: {
    usage: ToolbarUsage.ContentManipulation,
    orientation: ToolbarOrientation.Horizontal,
    getItemProvider: ({ usage, orientation }) => {
      return {
        id: "items",
        getToolbarItems: () => {
          const factory = createToolbarItemFactory();
          const layouts = {
            standard: {
              usage,
              orientation,
            },
          } satisfies ToolbarItemLayouts;
          return [
            factory.createActionItem({ layouts }),
            factory.createActionItem({ layouts }),
            factory.createActionItem({ layouts }),
          ];
        },
      };
    },
  },
  argTypes: {
    usage: enumArgType(ToolbarUsage),
    orientation: enumArgType(ToolbarOrientation),
  },
} satisfies Meta<typeof ToolbarStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ContentManipulation: Story = {};

export const ContentManipulationVertical: Story = {
  name: "Content Manipulation (vertical)",
  args: {
    ...ContentManipulation.args,
    orientation: ToolbarOrientation.Vertical,
  },
};

export const ViewNavigation: Story = {
  args: {
    usage: ToolbarUsage.ViewNavigation,
  },
};

export const ViewNavigationVertical: Story = {
  name: "View Navigation (vertical)",
  args: {
    ...ViewNavigation.args,
    orientation: ToolbarOrientation.Vertical,
  },
};

export const ViewSettings: Story = {
  args: {
    usage: ToolbarUsage.ViewNavigation,
    getItemProvider: ({ usage, orientation }) => {
      return {
        id: "items",
        getToolbarItems: () => {
          const factory = createToolbarItemFactory();
          const layouts = {
            standard: {
              usage,
              orientation,
              advancedUsage: "view-settings",
            },
          } satisfies ToolbarItemLayouts;
          return [
            factory.createActionItem({ layouts }),
            factory.createActionItem({ layouts }),
            factory.createActionItem({ layouts }),
          ];
        },
      };
    },
  },
};

export const ViewSettingsVertical: Story = {
  name: "View Settings (vertical)",
  args: {
    ...ViewSettings.args,
    orientation: ToolbarOrientation.Vertical,
  },
};
