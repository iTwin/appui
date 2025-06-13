/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { Meta, StoryObj } from "@storybook/react-vite";
import { AppUiDecorator } from "../Decorators";
import { Page } from "../AppUiStory";
import { PreviewStory } from "./ToolSettingsKeyPressCommit";
import { removeProperty } from "../Utils";
import { StoryPrimitiveTool } from "src/tools/StoryTool";
import { IModelApp, LengthDescription } from "@itwin/core-frontend";
import { UiFramework } from "@itwin/appui-react";
import {
  DialogProperty,
  DialogPropertySyncItem,
  PropertyDescriptionHelper,
} from "@itwin/appui-abstract";
import { action } from "storybook/actions";

const meta = {
  title: "PreviewFeatures/ToolSettingsKeyPressCommit",
  component: PreviewStory,
  tags: ["autodocs"],
  decorators: [AppUiDecorator],
  parameters: {
    docs: {
      page: () => <Page />,
    },
  },
  argTypes: {
    onInitialize: removeProperty(),
    onFrontstageActivated: removeProperty(),
  },
  args: {
    toolSettingsKeyPressCommit: true,
    toolSettingsNewEditors: false,
  },
} satisfies Meta<typeof PreviewStory>;

export default meta;
type Story = StoryObj<typeof meta>;

class DefaultTool extends StoryPrimitiveTool {
  public static override toolId = "DefaultStoryTool";

  private _text = "Hello";
  private _number = 2;
  private _customNumber = 4;

  public override supplyToolSettingsProperties() {
    return [
      new DialogProperty(
        PropertyDescriptionHelper.buildTextEditorDescription("text", "Text"),
        this._text
      ).toDialogItem({
        columnIndex: 0,
        rowPriority: 0,
      }),
      new DialogProperty(
        PropertyDescriptionHelper.buildNumberEditorDescription(
          "numeric",
          "Numeric"
        ),
        this._number
      ).toDialogItem({
        columnIndex: 0,
        rowPriority: 1,
      }),
      new DialogProperty(
        new LengthDescription("customNumber", "Custom number"),
        this._customNumber
      ).toDialogItem({
        columnIndex: 0,
        rowPriority: 2,
      }),
    ];
  }

  public override async applyToolSettingPropertyChange(
    updatedValue: DialogPropertySyncItem
  ) {
    action("applyToolSettingPropertyChange")(updatedValue);
    if (updatedValue.propertyName === "text") {
      this._text = updatedValue.value.value as string;
      return true;
    }
    if (updatedValue.propertyName === "numeric") {
      this._number = updatedValue.value.value as number;
      return true;
    }
    if (updatedValue.propertyName === "customNumber") {
      this._customNumber = updatedValue.value.value as number;
      return true;
    }

    return false;
  }
}

export const Default: Story = {
  args: {
    onInitialize: async () => {
      IModelApp.tools.register(DefaultTool, UiFramework.localizationNamespace);
    },
    onFrontstageActivated: async () => {
      await IModelApp.tools.run(DefaultTool.toolId);
    },
  },
};
