/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { Meta, StoryObj } from "@storybook/react";
import { AppUiDecorator, InitializerDecorator } from "../Decorators";
import { SolarTimeline } from "@itwin/imodel-components-react/src/imodel-components-react/timeline/SolarTimeline";
import { BaseSolarDataProvider } from "@itwin/imodel-components-react";

const meta = {
  title: "Components/SolarTimeline",
  component: SolarTimeline,
  tags: ["autodocs"],
  decorators: [InitializerDecorator, AppUiDecorator],
  parameters: {
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
