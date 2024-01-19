/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { Meta, StoryObj } from "@storybook/react";
import { EditorExampleComponent } from "@itwin/appui-test-providers/lib/esm/ui/components/EditorExampleComponent";
import { AppUiStory } from "../AppUiStory";

const meta = {
  title: "Components/Editors",
  component: EditorExampleComponent,
  tags: ["autodocs"],
} satisfies Meta<typeof EditorExampleComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => {
    return (
      <AppUiStory displayChildrenOnly>
        <div style={{ padding: 20, position: "relative" }}>
          <EditorExampleComponent />
        </div>
      </AppUiStory>
    );
  },
};
