/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import {
  Title,
  Subtitle,
  Description,
  Primary,
  Controls,
} from "@storybook/blocks";
import type { Meta, StoryObj } from "@storybook/react";
import { AppUiDecorator } from "../AppUiDecorator";
import { CanFloatOptions } from "./CanFloatOptions";

const meta = {
  title: "Widget/canFloat Options",
  component: CanFloatOptions,
  tags: ["autodocs"],
  decorators: [AppUiDecorator],
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Primary />
          <Controls />
        </>
      ),
    },
  },
} satisfies Meta<typeof CanFloatOptions>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Resizable: Story = {
  args: {
    isResizable: true,
  },
};

export const Position: Story = {
  args: {
    defaultPosition: {
      x: 10,
      y: 200,
    },
  },
};

export const Size: Story = {
  args: {
    defaultSize: {
      height: 100,
      width: 100,
    },
  },
};

export const HideWithUI: Story = {
  args: {
    hideWithUi: true,
  },
};

export const ContainerId: Story = {
  args: {
    containerId: "container-1",
  },
};

export const MultipleOptions: Story = {
  args: {
    ...Resizable.args,
    ...Position.args,
    ...Size.args,
    ...HideWithUI.args,
    ...ContainerId.args,
  },
};
