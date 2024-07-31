/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import type { Decorator, Meta, StoryObj } from "@storybook/react";
import { AppUiStory } from "../../AppUiStory";
import { MessageManager } from "@itwin/appui-react";
import { createFrontstage } from "../../Utils";

function Component() {
  return null;
}

function Content() {
  const targetRef = React.useRef<HTMLDivElement | undefined>(undefined);
  React.useEffect(() => {
    const target = targetRef.current;
    if (!target) return;
    MessageManager.displayInputFieldMessage(
      target,
      "My message",
      "My detailed message"
    );
  }, []);
  return (
    <div
      ref={(el) => {
        targetRef.current = el ?? undefined;
      }}
      style={{ position: "absolute", top: 200, left: 300 }}
    >
      Message target
    </div>
  );
}

const StoryDecorator: Decorator = (_Story) => {
  return (
    <AppUiStory
      frontstages={[
        createFrontstage({
          content: <Content />,
        }),
      ]}
    />
  );
};

const meta = {
  title: "Frontstage/Notifications/InputField",
  component: Component,
  tags: ["autodocs"],
  decorators: [StoryDecorator],
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof Component>;

export const Default: Story = {};
