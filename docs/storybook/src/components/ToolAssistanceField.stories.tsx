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
  ToolAssistanceInstructions,
} from "@itwin/core-frontend";
import { AppUiStory } from "src/AppUiStory";
import { createFrontstage } from "src/Utils";
import { ToggleSwitch } from "@itwin/itwinui-react";
import { BeEvent } from "@itwin/core-bentley";
import { action } from "storybook/actions";
import { SvgPlaceholder } from "@itwin/itwinui-icons-react";

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
              content: <Story />,
            }),
          ],
        },
      ]}
    />
  );
};

function Instructions(props: { instructions?: ToolAssistanceInstructions }) {
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
    MessageManager.setToolAssistance(props.instructions ?? instructions);

    // Icon for the tool assistance
    UiFramework.frontstages.setActiveTool(
      new (class extends Tool {
        get iconSpec(): string {
          return "icon-placeholder";
        }
      })()
    );
  }, [props.instructions]);
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
  render: (props) => {
    return (
      <>
        <ToolAssistanceField {...props} />
        <Instructions />
      </>
    );
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
    return (
      <>
        <ControlledField {...props} />
        <Instructions />
      </>
    );
  },
};

export const Icons: Story = {
  args: {
    cursorPromptTimeout: Number.POSITIVE_INFINITY,
    defaultPromptAtCursor: false,
  },
  render: (props) => {
    const mainInstruction = ToolAssistance.createInstruction(
      ToolAssistanceImage.CursorClick,
      "Main instruction of a tool"
    );

    const customIcon = ToolAssistance.createInstruction(
      "",
      "React iconElement"
    );
    customIcon.iconElement = <SvgPlaceholder />;
    const iconsSection = ToolAssistance.createSection(
      [
        ToolAssistance.createInstruction(
          ToolAssistanceImage.LeftClick,
          "ToolAssistanceImage enum"
        ),
        ToolAssistance.createInstruction("icon-placeholder", "CSS icon"),
        customIcon,
      ],
      "Icons"
    );

    const instructions = ToolAssistance.createInstructions(mainInstruction, [
      iconsSection,
    ]);
    return (
      <>
        <ToolAssistanceField {...props} />
        <Instructions instructions={instructions} />
      </>
    );
  },
};
