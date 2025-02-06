/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import type { Decorator, Meta, StoryObj } from "@storybook/react";
import {
  MessageManager,
  ToolAssistanceField,
  UiFramework,
} from "@itwin/appui-react";
import { AppUiDecorator, InitializerDecorator } from "../Decorators";
import {
  Tool,
  ToolAssistance,
  ToolAssistanceImage,
} from "@itwin/core-frontend";

const AlignComponent: Decorator = (Story) => {
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingBlock: "2em",
        gap: "10",
      }}
    >
      <Story />
    </div>
  );
};

const SetupToolAssistance: Decorator = (Story) => {
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
  return <Story />;
};

const meta = {
  title: "Components/ToolAssistanceField",
  component: ToolAssistanceField,
  tags: ["autodocs"],
  decorators: [
    AlignComponent,
    SetupToolAssistance,
    InitializerDecorator,
    AppUiDecorator,
  ],
  args: {
    includePromptAtCursor: true,
    cursorPromptTimeout: 5000,
    fadeOutCursorPrompt: true,
    defaultPromptAtCursor: false,
  },
} satisfies Meta<typeof ToolAssistanceField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
