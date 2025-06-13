/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import type { Decorator, Meta, StoryObj } from "@storybook/react-vite";
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
import { ToggleSwitch } from "@itwin/itwinui-react";
import { BeEvent } from "@itwin/core-bentley";
import { action } from "@storybook/addon-actions";

const StoryDecorator: Decorator = (Story, { parameters }) => {
  return (
    <AppUiStory
      frontstages={[
        createFrontstage({
          content: parameters.content,
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

const store = (() => {
  let state = {
    visible: false,
    pinned: false,
  };
  const onChange = new BeEvent();
  return {
    state,
    onChange,
    setVisible: (visible: boolean) => {
      state.visible = visible;
      onChange.raiseEvent();
    },
    setPinned: (pinned: boolean) => {
      state.pinned = pinned;
      onChange.raiseEvent();
    },
  };
})();

function ControlledContent() {
  const [visible, setVisible] = React.useState(store.state.visible);
  const [pinned, setPinned] = React.useState(store.state.pinned);
  React.useEffect(() => {
    return store.onChange.addListener(() => {
      setVisible(store.state.visible);
      setPinned(store.state.pinned);
    });
  }, []);
  return (
    <div>
      <ToggleSwitch
        label="Visible"
        checked={visible}
        onChange={() => {
          store.setVisible(!visible);
        }}
      />
      <ToggleSwitch
        label="Pinned"
        checked={pinned}
        onChange={() => {
          store.setPinned(!pinned);
        }}
      />
    </div>
  );
}

function ControlledField(
  props: React.ComponentProps<typeof ToolAssistanceField>
) {
  const [visible, setVisible] = React.useState(store.state.visible);
  const [pinned, setPinned] = React.useState(store.state.pinned);
  React.useEffect(() => {
    return store.onChange.addListener(() => {
      setVisible(store.state.visible);
      setPinned(store.state.pinned);
    });
  }, []);
  return (
    <ToolAssistanceField
      {...props}
      visible={visible}
      onVisibleChange={action("onVisibleChange")}
      pinned={pinned}
      onPinnedChange={action("onPinnedChange")}
    />
  );
}

export const Controlled: Story = {
  parameters: {
    content: <ControlledContent />,
  },
  render: (props) => {
    return <ControlledField {...props} />;
  },
};
