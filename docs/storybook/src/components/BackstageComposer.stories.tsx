/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { Decorator, Meta, StoryObj } from "@storybook/react";
import {
  BackstageComposer,
  BackstageItemUtilities,
  UiFramework,
  UiItemsProvider,
} from "@itwin/appui-react";
import { action } from "@storybook/addon-actions";
import { AppUiStory } from "../AppUiStory";
import { SvgPlaceholder } from "@itwin/itwinui-icons-react";
import { Icon } from "@itwin/itwinui-react";

function createOpenBackstage(itemProvider: UiItemsProvider): Decorator {
  return (Story) => {
    return (
      <AppUiStory
        onFrontstageActivated={() => {
          UiFramework.backstage.open();
        }}
        appBackstage={<Story />}
        itemProviders={[itemProvider]}
      />
    );
  };
}

const meta = {
  title: "Components/BackstageComposer",
  component: BackstageComposer,
  tags: ["autodocs"],
} satisfies Meta<typeof BackstageComposer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Icons: Story = {
  args: {},
  decorators: [
    createOpenBackstage({
      id: "p1",
      getBackstageItems: () => [
        BackstageItemUtilities.createActionItem(
          "item1",
          0,
          0,
          action("item1"),
          "CSS Icon (deprecated)",
          undefined,
          "icon-placeholder"
        ),
        BackstageItemUtilities.createActionItem(
          "item2",
          0,
          0,
          action("item2"),
          "IconSpec ReactNode (deprecated)",
          undefined,
          <SvgPlaceholder />
        ),
        BackstageItemUtilities.createActionItem(
          "item3",
          0,
          0,
          action("item3"),
          "`iconNode` property (deprecated helper)",
          undefined,
          undefined,
          {
            iconNode: <SvgPlaceholder />,
          }
        ),
        BackstageItemUtilities.createActionItem({
          id: "item4",
          execute: action("item4"),
          label: "`iconNode` property",
          icon: <SvgPlaceholder />,
        }),
        BackstageItemUtilities.createActionItem({
          id: "item5",
          execute: action("item5"),
          label: "`iconNode` property",
          icon: "X",
        }),
        BackstageItemUtilities.createActionItem({
          id: "item6",
          execute: action("item6"),
          label: "No icon",
        }),
      ],
    }),
  ],
};

export const Subtitle: Story = {
  args: {},
  decorators: [
    createOpenBackstage({
      id: "p1",
      getBackstageItems: () => [
        BackstageItemUtilities.createActionItem({
          id: "item1",
          execute: action("item1"),
          label: "Item 1",
          subtitle: "Item 1 subtitle",
          icon: <SvgPlaceholder />,
        }),
        BackstageItemUtilities.createActionItem({
          id: "item2",
          execute: action("item2"),
          label: "Item 2",
          subtitle: "Item 2 subtitle",
        }),
      ],
    }),
  ],
};
