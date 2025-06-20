/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { Meta, StoryObj } from "@storybook/react-vite";
import { UiFramework } from "@itwin/appui-react";
import { IModelApp } from "@itwin/core-frontend";
import { AppUiDecorator } from "../Decorators";
import { Page } from "../AppUiStory";
import { removeProperty } from "../Utils";
import { ToolSettingsStory } from "./ToolSettings";
import { CustomTool } from "../tools/CustomTool";
import { LockPropertyTool } from "../tools/LockPropertyTool";
import {
  CustomEditorTool,
  CustomTagsPropertyEditor,
} from "src/tools/CustomEditorTool";
import { PropertyEditorManager } from "@itwin/components-react";

const meta = {
  title: "Frontstage/ToolSettings",
  component: ToolSettingsStory,
  tags: ["autodocs"],
  decorators: [AppUiDecorator],
  parameters: {
    docs: {
      page: () => <Page />,
    },
    layout: "fullscreen",
  },
  args: {
    onInitialize: async () => {
      IModelApp.tools.register(CustomTool, UiFramework.localizationNamespace);
    },
    onFrontstageActivated: async () => {
      await IModelApp.tools.run(CustomTool.toolId);
    },
  },
  argTypes: {
    mode: removeProperty(),
    onFrontstageActivated: removeProperty(),
    onInitialize: removeProperty(),
  },
} satisfies Meta<typeof ToolSettingsStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const LockProperty: Story = {
  args: {
    onInitialize: async () => {
      IModelApp.tools.register(
        LockPropertyTool,
        UiFramework.localizationNamespace
      );
    },
    onFrontstageActivated: async () => {
      await IModelApp.tools.run(LockPropertyTool.toolId);
    },
  },
};

export const CustomEditor: Story = {
  args: {
    onInitialize: async () => {
      PropertyEditorManager.registerEditor(
        "custom-tags",
        CustomTagsPropertyEditor
      );
      IModelApp.tools.register(
        CustomEditorTool,
        UiFramework.localizationNamespace
      );
    },
    onFrontstageActivated: async () => {
      await IModelApp.tools.run(CustomEditorTool.toolId);
    },
  },
};

export const Widget: Story = {
  args: {
    mode: "widget",
  },
};

export const Floating: Story = {
  args: {
    mode: "floating",
  },
};
