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

export const EditorGroup: Story = {
  args: {
    properties: (() => {
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

export const DefaultEditors: Story = {
  args: {
    properties: (() => {
      let rowPriority = 1;
      function createDialogItem<T>(dialogProperty: DialogProperty<T>) {
        rowPriority++;
        const lock = new DialogProperty(
          PropertyDescriptionHelper.buildLockPropertyDescription(
            `use${dialogProperty.name}`
          ),
          false
        );
        lock.description.displayLabel = `Lock ${dialogProperty.description.displayLabel} property`;
        return dialogProperty.toDialogItem(
          {
            columnIndex: 0,
            rowPriority,
          },
          lock.toDialogItem({
            columnIndex: 0,
            rowPriority,
          })
        );
      }

      return [
        createDialogItem(
          new DialogProperty(
            PropertyDescriptionHelper.buildTextEditorDescription(
              "text",
              "Text"
            ),
            "Hello"
          )
        ),
        createDialogItem(
          new DialogProperty(
            PropertyDescriptionHelper.buildNumberEditorDescription(
              "numeric",
              "Numeric"
            ),
            10
          )
        ),
        createDialogItem(
          new DialogProperty(
            new LengthDescription("customNumber", "Custom number"),
            10
          )
        ),
      ];
    })(),
  },
};
