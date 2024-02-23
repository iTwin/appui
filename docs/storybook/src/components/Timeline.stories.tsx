/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { TimelineComponent } from "@itwin/imodel-components-react/src/imodel-components-react/timeline/TimelineComponentFn";
import { action } from "@storybook/addon-actions";
import type { Decorator, Meta, StoryObj } from "@storybook/react";
import { AppUiDecorator, InitializerDecorator } from "../Decorators";

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

// Sb date control returns a UNIX timestamp: https://storybook.js.org/docs/api/arg-types#controltype
const DateDecorator: Decorator = (Story, context) => {
  if (typeof context.args.startDate === "number") {
    context.args.startDate = new Date(context.args.startDate * 1000);
  }
  if (typeof context.args.endDate === "number") {
    context.args.endDate = new Date(context.args.endDate * 1000);
  }
  return <Story />;
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
    DateDecorator,
  ],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof TimelineComponent>;

export default meta;
type Story = StoryObj<typeof TimelineComponent>;

export const Basic: Story = {
  args: {
    totalDuration: 3000,
    onChange: action("onChange"),
    onSettingsChange: action("onSettingsChange"),
    onPlayPause: action("onPlayPause"),
  },
};

export const WithDates: Story = {
  args: {
    ...Basic.args,
    startDate: new Date(2023, 4, 1),
    endDate: new Date(2023, 4, 17),
  },
};

export const ShowDuration: Story = {
  args: {
    ...Basic.args,
    showDuration: true,
  },
};

export const HideRepeatButton: Story = {
  args: {
    ...Basic.args,
    includeRepeat: false,
  },
};

export const Repeat: Story = {
  args: {
    ...Basic.args,
    repeat: true,
  },
};
