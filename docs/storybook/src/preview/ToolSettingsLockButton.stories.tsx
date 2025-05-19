/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { Meta, StoryObj } from "@storybook/react";
import { AppUiDecorator } from "../Decorators";
import { Page } from "../AppUiStory";
import { PreviewStory } from "./ToolSettingsLockButton";
import { removeProperty } from "../Utils";
import {
  DialogProperty,
  PropertyDescriptionHelper,
} from "@itwin/appui-abstract";
import { LengthDescription } from "@itwin/core-frontend";

const meta = {
  title: "PreviewFeatures/ToolSettingsLockButton",
  component: PreviewStory,
  tags: ["autodocs"],
  decorators: [AppUiDecorator],
  parameters: {
    docs: {
      page: () => <Page />,
    },
  },
  argTypes: {
    propertyType: removeProperty(),
  },
  args: {
    toolSettingsLockButton: true,
    toolSettingsNewEditors: false,
  },
} satisfies Meta<typeof PreviewStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const DisplayLabel: Story = {
  args: {
    lockLabel: "Toggle myProperty lock",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Input: Story = {
  args: {
    propertyType: "number",
  },
};

export const MultipleProperties: Story = {
  args: {
    additionalProperties: (() => {
      const useRadius = new DialogProperty(
        PropertyDescriptionHelper.buildLockPropertyDescription("useRadius"),
        false
      );
      useRadius.description.displayLabel = "Lock radius property";
      const radius = new DialogProperty(
        PropertyDescriptionHelper.buildToggleDescription("radius", "Radius"),
        1
      );

      const useLength = new DialogProperty(
        PropertyDescriptionHelper.buildLockPropertyDescription("useLength"),
        false
      );
      useLength.description.displayLabel = "Lock length property";
      const length = new DialogProperty(
        new LengthDescription("length", "Length"),
        1
      );

      return [
        radius.toDialogItem(
          {
            columnIndex: 0,
            rowPriority: 1,
          },
          useRadius.toDialogItem({ columnIndex: 0, rowPriority: 1 })
        ),
        length.toDialogItem(
          {
            columnIndex: 0,
            rowPriority: 1,
          },
          useLength.toDialogItem({
            columnIndex: 0,
            rowPriority: 1,
          })
        ),
      ];
    })(),
  },
};
