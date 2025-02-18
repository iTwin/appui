/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import type { Decorator, Meta, StoryObj } from "@storybook/react";
import {
  MessageManager,
  StatusBarItemUtilities,
  ToolAssistanceField,
  UiFramework,
} from "@itwin/appui-react";
import {
  Tool,
  ToolAssistance,
  ToolAssistanceImage,
} from "@itwin/core-frontend";
import { AppUiStory } from "src/AppUiStory";
import { createFrontstage } from "src/Utils";

const StoryDecorator: Decorator = (Story) => {
  return (
    <AppUiStory
      frontstages={[
        createFrontstage({
          hideStatusBar: false,
        }),
      ]}
      itemProviders={[
        {
          id: "provider-1",
          getStatusBarItems: () => [
            StatusBarItemUtilities.createCustomItem({
              id: "tool-assistance",
              content: (
                <>
                  <Story />
                  <Setup />
                </>
              ),
            }),
          ],
        },
      ]}
    />
  );
};

function Setup() {
  React.useEffect(() => {
    const mainInstruction = ToolAssistance.createInstruction(
      ToolAssistanceImage.CursorClick,
      "Main instruction of a tool"
    );

    const cursorSection = ToolAssistance.createSection(
      [
        ToolAssistance.createInstruction(
          ToolAssistanceImage.LeftClick,
          "Left click to select a point"
        ),
        ToolAssistance.createInstruction(
          ToolAssistanceImage.RightClick,
          "Right click to cancel"
        ),
      ],
      ToolAssistance.inputsLabel
    );

    const touchSection = ToolAssistance.createSection(
      [
        ToolAssistance.createInstruction(
          ToolAssistanceImage.OneTouchTap,
          "Touch to select a point"
        ),
      ],
      ToolAssistance.inputsLabel
    );

    const instructions = ToolAssistance.createInstructions(mainInstruction, [
      cursorSection,
      touchSection,
    ]);
    // Tool assistance information
    MessageManager.setToolAssistance(instructions);

    // Icon for the tool assistance
    UiFramework.frontstages.setActiveTool(
      new (class extends Tool {
        get iconSpec(): string {
          return "icon-placeholder";
        }
      })()
    );
  }, []);
  return null;
}

const meta = {
  title: "Components/Status fields/ToolAssistanceField",
  component: ToolAssistanceField,
  tags: ["autodocs"],
  decorators: [StoryDecorator],
  args: {
    includePromptAtCursor: true,
    cursorPromptTimeout: 5000,
    fadeOutCursorPrompt: true,
    defaultPromptAtCursor: true,
  },
} satisfies Meta<typeof ToolAssistanceField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AlwaysVisible: Story = {
  args: {
    cursorPromptTimeout: Number.POSITIVE_INFINITY,
  },
};

export const PromptAtContent: Story = {
  args: {
    cursorPromptTimeout: Number.POSITIVE_INFINITY,
    promptAtContent: true,
  },
};
