/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { Decorator, Meta, StoryObj } from "@storybook/react";
import { AppUiDecorator, InitializerDecorator } from "../Decorators";
import { SolarTimeline } from "@itwin/imodel-components-react-internal/src/imodel-components-react/timeline/SolarTimeline";
import { BaseSolarDataProvider } from "@itwin/imodel-components-react";

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
  title: "Components/SolarTimeline",
  component: SolarTimeline,
  tags: ["autodocs"],
  decorators: [
    AlignComponent,
    InitializerDecorator,
    AppUiDecorator,
    PageLayout,
  ],
  parameters: {
    layout: "fullscreen",
    backgrounds: { default: "background-backdrop" },
  },
} satisfies Meta<typeof SolarTimeline>;

export default meta;
type Story = StoryObj<typeof SolarTimeline>;

export const Basic: Story = {
  args: {
    dataProvider: new BaseSolarDataProvider(),
  },
};
