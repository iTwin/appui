/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { Decorator, Meta, StoryObj } from "@storybook/react";
import { AppUiDecorator, InitializerDecorator } from "../AppUiDecorator";
import { TimelineComponent } from "@itwin/imodel-components-react";

const AlignComponent: Decorator = (Story) => {
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "end",
        paddingInline: "10%",
        paddingBlock: "2em",
        boxSizing: "border-box",
      }}
    >
      <Story />
    </div>
  );
};

const PageLayout: Decorator = (Story) => {
  return (
    <div style={{ height: "100vh" }}>
      <Story />
    </div>
  );
};

const meta = {
  title: "Components/TimelineComponent",
  component: TimelineComponent,
  tags: ["autodocs"],
  decorators: [
    AlignComponent,
    InitializerDecorator,
    AppUiDecorator,
    PageLayout,
  ],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof TimelineComponent>;

export default meta;
type Story = StoryObj<typeof TimelineComponent>;

export const Basic: Story = {
  args: {
    totalDuration: 5000,
  },
};
