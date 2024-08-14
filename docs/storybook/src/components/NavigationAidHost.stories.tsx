/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { Decorator, Meta, StoryObj } from "@storybook/react";
import {
  ConfigurableCreateInfo,
  ContentProps,
  IModelViewportControl,
  NavigationAidControl,
  NavigationAidHost,
  NavigationWidgetComposer,
  UiFramework,
} from "@itwin/appui-react";
import { AppUiStory } from "../AppUiStory";
import { createFrontstage } from "../Utils";
import { ViewportContent } from "@itwin/appui-test-providers";
import { Button } from "@itwin/itwinui-react";

function createStoryDecorator({
  contentProps,
}: {
  contentProps?: Partial<ContentProps>;
} = {}) {
  return ((Story) => {
    return (
      <AppUiStory
        demoIModel={{ default: "blank" }}
        frontstages={[
          createFrontstage({
            content: <ViewportContent />,
            contentManipulation: {
              id: "content-manipulation",
              content: (
                <NavigationWidgetComposer
                  style={{ gridColumn: 2 }} // TODO: should not be needed?
                  navigationAidHost={<Story />}
                />
              ),
            },
            contentProps,
          }),
        ]}
      />
    );
  }) satisfies Decorator;
}

const meta = {
  title: "Components/NavigationAidHost",
  component: NavigationAidHost,
  tags: ["autodocs"],
} satisfies Meta<typeof NavigationAidHost>;

export default meta;
type Story = StoryObj<typeof NavigationAidHost>;

export const Default: Story = {
  decorators: [createStoryDecorator()],
};

export const DefaultControl: Story = {
  name: "Default Control (deprecated)",
  decorators: [
    createStoryDecorator({
      contentProps: {
        content: undefined,
        classId: IModelViewportControl,
      },
    }),
  ],
};

export const EmptyControl: Story = {
  name: "Empty Control (deprecated)",
  decorators: [
    createStoryDecorator({
      contentProps: {
        content: undefined,
        classId: class extends IModelViewportControl {
          public override get navigationAidControl() {
            return ""; // no navigation aid
          }
        },
      },
    }),
  ],
};

class CustomNavigationControl extends NavigationAidControl {
  public static navigationAidId = "CustomNavigationControl";

  constructor(info: ConfigurableCreateInfo, options: unknown) {
    super(info, options);
    this.reactNode = <Button>Custom</Button>;
  }
}
UiFramework.controls.register(
  CustomNavigationControl.navigationAidId,
  CustomNavigationControl
);

export const CustomControl: Story = {
  name: "Custom Control (deprecated)",
  decorators: [
    createStoryDecorator({
      contentProps: {
        content: undefined,
        classId: class extends IModelViewportControl {
          public override get navigationAidControl() {
            return CustomNavigationControl.navigationAidId;
          }
        },
      },
    }),
  ],
};
