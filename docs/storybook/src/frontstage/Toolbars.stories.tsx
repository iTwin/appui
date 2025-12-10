/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  ToolbarUsage,
  ToolbarOrientation,
  ToolbarItemLayouts,
  WidgetState,
} from "@itwin/appui-react";
import { Page } from "../AppUiStory";
import { ToolbarsStory } from "./Toolbars";
import {
  createToolbarItemFactory,
  createWidget,
  enumArgType,
  removeProperty,
} from "../Utils";

function getWidgets() {
  return [createWidget(1, { defaultState: WidgetState.Hidden })];
}

const meta = {
  title: "Frontstage/Toolbars",
  component: ToolbarsStory,
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
    length: 4,
    hideNavigationAid: true,
    cornerButton: false,
    getItemProvider: ({ usage, orientation, length }) => {
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
          return Array.from({ length }).map((_, index) => {
            if (index === 1) {
              return factory.createGroupItem({
                layouts,
                items: [factory.createActionItem(), factory.createActionItem()],
              });
            }
            return factory.createActionItem({ layouts });
          });
        },
        getWidgets,
      };
    },
    controlWidgetVisibility: false,
  },
  argTypes: {
    usage: enumArgType(ToolbarUsage),
    orientation: enumArgType(ToolbarOrientation),
    getItemProvider: removeProperty(),
    contentManipulationHorizontalLength: removeProperty(),
    contentManipulationVerticalLength: removeProperty(),
    viewNavigationHorizontalLength: removeProperty(),
    viewNavigationVerticalLength: removeProperty(),
    viewSettingsHorizontalLength: removeProperty(),
    viewSettingsVerticalLength: removeProperty(),
  },
} satisfies Meta<typeof ToolbarsStory>;

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
    getItemProvider: ({ usage, orientation, length }) => {
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
          return Array.from({ length }).map((_, index) => {
            if (index === 1) {
              return factory.createGroupItem({
                layouts,
                items: [factory.createActionItem(), factory.createActionItem()],
              });
            }
            return factory.createActionItem({ layouts });
          });
        },
        getWidgets,
      };
    },
  },
  argTypes: {
    usage: removeProperty(),
  },
};

export const ViewSettingsVertical: Story = {
  name: "View Settings (vertical)",
  ...ViewSettings,
  args: {
    ...ViewSettings.args,
    orientation: ToolbarOrientation.Vertical,
  },
};

export const All: Story = {
  args: {
    getItemProvider: ({
      length,
      contentManipulationHorizontalLength,
      contentManipulationVerticalLength,
      viewSettingsHorizontalLength,
      viewSettingsVerticalLength,
      viewNavigationHorizontalLength,
      viewNavigationVerticalLength,
    }) => {
      return {
        id: "items",
        getToolbarItems: () => {
          const factory = createToolbarItemFactory();
          const toolbars: {
            layouts: ToolbarItemLayouts;
            length: number;
          }[] = [
            {
              layouts: {
                standard: {
                  usage: ToolbarUsage.ContentManipulation,
                  orientation: ToolbarOrientation.Horizontal,
                },
              },
              length: contentManipulationHorizontalLength ?? length,
            },
            {
              layouts: {
                standard: {
                  usage: ToolbarUsage.ContentManipulation,
                  orientation: ToolbarOrientation.Vertical,
                },
              },
              length: contentManipulationVerticalLength ?? length,
            },
            {
              layouts: {
                standard: {
                  usage: ToolbarUsage.ViewNavigation,
                  orientation: ToolbarOrientation.Horizontal,
                },
              },
              length: viewNavigationHorizontalLength ?? length,
            },
            {
              layouts: {
                standard: {
                  usage: ToolbarUsage.ViewNavigation,
                  orientation: ToolbarOrientation.Vertical,
                },
              },
              length: viewNavigationVerticalLength ?? length,
            },
            {
              layouts: {
                standard: {
                  usage: ToolbarUsage.ViewNavigation,
                  orientation: ToolbarOrientation.Horizontal,
                  advancedUsage: "view-settings",
                },
              },
              length: viewSettingsHorizontalLength ?? length,
            },
            {
              layouts: {
                standard: {
                  usage: ToolbarUsage.ViewNavigation,
                  orientation: ToolbarOrientation.Vertical,
                  advancedUsage: "view-settings",
                },
              },
              length: viewSettingsVerticalLength ?? length,
            },
          ];
          return toolbars.flatMap((toolbar) => {
            return Array.from({ length: toolbar.length }).map((_, index) => {
              if (index === 1)
                return factory.createGroupItem({
                  layouts: toolbar.layouts,
                  items: [
                    factory.createActionItem(),
                    factory.createActionItem(),
                  ],
                });
              return factory.createActionItem({ layouts: toolbar.layouts });
            });
          });
        },
        getWidgets,
      };
    },
  },
  argTypes: {
    usage: removeProperty(),
    orientation: removeProperty(),
  },
};

export const AllCustom: Story = {
  name: "All (custom)",
  ...All,
  args: {
    ...All.args,
    viewSettingsVerticalLength: 8,
  },
  argTypes: {
    ...All.argTypes,
    contentManipulationHorizontalLength: {
      table: {
        disable: false,
      },
    },
    contentManipulationVerticalLength: {
      table: {
        disable: false,
      },
    },
    viewNavigationHorizontalLength: {
      table: {
        disable: false,
      },
    },
    viewNavigationVerticalLength: {
      table: {
        disable: false,
      },
    },
    viewSettingsHorizontalLength: {
      table: {
        disable: false,
      },
    },
    viewSettingsVerticalLength: {
      table: {
        disable: false,
      },
    },
  },
};
