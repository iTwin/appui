/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Meta, StoryObj } from "@storybook/react";
import { StandardContentLayouts } from "@itwin/appui-abstract";
import {
  BackstageAppButton,
  BackstageComposer,
  IModelViewportControl,
  UiFramework,
  useBackstageManager,
  useIsBackstageOpen,
} from "@itwin/appui-react";
import { AppUiStory } from "../AppUiStory";
import { createFrontstageProvider } from "../Utils";

function HookStory() {
  return (
    <AppUiStory
      appBackstage={<BackstageComposer />}
      frontstageProviders={() => [
        createFrontstageProvider({
          contentGroupProps: {
            id: "ViewportContentGroup",
            layout: StandardContentLayouts.singleView,
            contents: [
              {
                id: "ViewportContent",
                classId: IModelViewportControl,
              },
            ],
          },
          cornerButton: (
            <BackstageAppButton
              label="Toggle Backstage"
              icon="icon-bentley-systems"
              execute={() => {
                UiFramework.backstage.getBackstageToggleCommand().execute();
              }}
            />
          ),
        }),
      ]}
    >
      <Initialized />
    </AppUiStory>
  );
}

function Initialized() {
  const manager = useBackstageManager();
  const isOpen = useIsBackstageOpen(manager);
  return (
    <pre>
      <code>isOpen: {String(isOpen)}</code>
    </pre>
  );
}

const meta: Meta = {
  title: "Hooks/useIsBackstageOpen",
  component: HookStory,
} satisfies Meta<typeof HookStory>;

export default meta;

type Story = StoryObj<typeof HookStory>;

export const Basic: Story = {};
