/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { Meta, StoryObj } from "@storybook/react";
import { QuantityType } from "@itwin/core-frontend";
import { AppUiDecorator, InitializerDecorator } from "../Decorators";
import { enumArgType } from "../Utils";
import { QuantityFormatStory } from "./QuantityFormat";

const meta = {
  title: "Components/QuantityFormat",
  component: QuantityFormatStory,
  tags: ["autodocs"],
  decorators: [AppUiDecorator, InitializerDecorator],
  args: {
    initialQuantityType: QuantityType.Length,
    availableUnitSystems: ["metric", "imperial", "usCustomary", "usSurvey"],
  },
  argTypes: {
    initialQuantityType: enumArgType(QuantityType),
  },
} satisfies Meta<typeof QuantityFormatStory>;

export default meta;
type Story = StoryObj<typeof QuantityFormatStory>;

export const Default: Story = {};
