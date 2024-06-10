/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { Decorator, Meta, StoryObj } from "@storybook/react";
import { StandardContentLayouts } from "@itwin/appui-abstract";
import {
  IModelConnectedViewSelector,
  IModelViewportControl,
  UiFramework,
} from "@itwin/appui-react";
import { AppUiStory, Page } from "../AppUiStory";
import { createFrontstageProvider } from "../Utils";

const StoryDecorator: Decorator = (Story) => {
  return (
    <AppUiStory
      layout="fullscreen"
      demoIModel={{ default: "blank" }}
      onInitialize={async () => {
        UiFramework.visibility.autoHideUi = false;
      }}
      frontstageProviders={[
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
          contentManipulation: {
            id: "content-manipulation",
            content: (
              <div
                style={{
                  pointerEvents: "all",
                  width: 50,
                  height: 50,
                  background: "var(--iui-color-background)",
                  zIndex: 1,
                }}
              >
                <Story />
              </div>
            ),
          },
        }),
      ]}
    />
  );
};

const meta = {
  title: "Components/ViewSelector",
  component: IModelConnectedViewSelector,
  tags: ["autodocs"],
  decorators: [StoryDecorator],
  parameters: {
    docs: {
      page: () => <Page />,
    },
    layout: "fullscreen",
  },
} satisfies Meta<typeof IModelConnectedViewSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};
