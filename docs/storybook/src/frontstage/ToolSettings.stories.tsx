/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { Meta, StoryObj } from "@storybook/react";
import { StandardContentLayouts } from "@itwin/appui-abstract";
import { IModelViewportControl, UiFramework } from "@itwin/appui-react";
import { IModelApp } from "@itwin/core-frontend";
import { AppUiDecorator } from "../Decorators";
import { Page } from "../AppUiStory";
import { createFrontstage, removeProperty } from "../Utils";
import { ToolSettingsStory } from "./ToolSettings";
import { CustomTool } from "../tools/ToolSettingsProperties";

const meta = {
  title: "Frontstage/ToolSettings",
  component: ToolSettingsStory,
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
    onFrontstageActivated: removeProperty(),
  },
} satisfies Meta<typeof ToolSettingsStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    frontstages: [
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
      }),
    ],
    onFrontstageActivated: async () => {
      IModelApp.tools.register(CustomTool, UiFramework.localizationNamespace);
      IModelApp.tools.run(CustomTool.toolId);
    },
  },
};
