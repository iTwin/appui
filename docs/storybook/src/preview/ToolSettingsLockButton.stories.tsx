/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { UiFramework } from "@itwin/appui-react";
import { IModelApp } from "@itwin/core-frontend";
import type { Meta, StoryObj } from "@storybook/react";
import { AppUiDecorator } from "../Decorators";
import { Page } from "../AppUiStory";
import { PreviewStory } from "./ToolSettingsLockButton";
import {
  LockPropertyTool,
  createLockPropertyTool,
} from "../tools/LockPropertyTool";
import { removeProperty } from "../Utils";

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
    onFrontstageActivated: removeProperty(),
    onInitialize: removeProperty(),
  },
  args: {
    toolSettingsLockButton: true,
  },
} satisfies Meta<typeof PreviewStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
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

export const DisplayLabel: Story = {
  args: {
    onInitialize: async () => {
      IModelApp.tools.register(
        createLockPropertyTool({
          lockLabel: "Toggle myProperty lock",
        }),
        UiFramework.localizationNamespace
      );
    },
    onFrontstageActivated: async () => {
      await IModelApp.tools.run(LockPropertyTool.toolId);
    },
  },
};

export const Disabled: Story = {
  args: {
    onInitialize: async () => {
      IModelApp.tools.register(
        createLockPropertyTool({ disabled: true }),
        UiFramework.localizationNamespace
      );
    },
    onFrontstageActivated: async () => {
      await IModelApp.tools.run(LockPropertyTool.toolId);
    },
  },
};
