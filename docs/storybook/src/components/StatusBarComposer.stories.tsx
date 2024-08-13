/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { Decorator, Meta, StoryObj } from "@storybook/react";
import { AppUiDecorator } from "../Decorators";
import {
  MessageCenterField,
  SelectionCountField,
  SnapModeField,
  StatusBarItemUtilities,
  StatusBarSection,
} from "@itwin/appui-react";
import { action } from "@storybook/addon-actions";
import {
  Svg2D,
  Svg3D,
  SvgActivity,
  SvgAdd,
  SvgAirplane,
  SvgAndroid,
  SvgAttach,
  SvgBolt,
  SvgCamera,
} from "@itwin/itwinui-icons-react";
import { withResizer } from "../../.storybook/addons/Resizer";
import { StatusBarComposerStory } from "./StatusBarComposer";
import { SnapMode } from "@itwin/core-frontend";

const PageLayout: Decorator = (Story) => {
  return (
    <div style={{ height: "60vh" }}>
      <Story />
    </div>
  );
};

const AlignComponent: Decorator = (Story) => {
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "end",
        paddingInline: "5%",
        paddingBlock: "2em",
        boxSizing: "border-box",
        minWidth: "200px",
      }}
    >
      <Story />
    </div>
  );
};

const meta = {
  title: "Components/StatusBarComposer",
  component: StatusBarComposerStory,
  tags: ["autodocs"],
  decorators: [AlignComponent, AppUiDecorator, PageLayout, withResizer],
} satisfies Meta<typeof StatusBarComposerStory>;

export default meta;
type Story = StoryObj<typeof meta>;

const items = createItems();

export const ActionItem: Story = {
  args: {
    items: [items.action1, items.action2, items.action3],
  },
};

export const LabelItem: Story = {
  args: {
    items: [items.label1, items.label2, items.label3],
  },
};

export const CustomItem: Story = {
  args: {
    items: [items.custom1, items.custom2, items.custom4],
  },
};

export const Full: Story = {
  args: {
    items: [
      items.action1,
      items.action2,
      items.action3,
      items.label1,
      items.label2,
      items.label3,
      items.custom1,
      items.custom2,
      items.custom3,
    ],
  },
};

const itemsForOverflow = createItemsForOverflow();

export const Overflow: Story = {
  args: {
    items: [
      items.action1,
      items.action2,
      items.action3,
      items.label1,
      items.label2,
      items.label3,
      items.custom1,
      items.custom2,
      items.custom3,
      itemsForOverflow.label1,
      itemsForOverflow.label2,
      itemsForOverflow.label3,
    ],
  },
  parameters: {
    layout: "centered",
  },
};

function createItems() {
  const action1 = StatusBarItemUtilities.createActionItem(
    "item1",
    StatusBarSection.Left,
    100,
    <Svg2D />,
    "Item 1",
    action("Item 1")
  );
  const action2 = StatusBarItemUtilities.createActionItem(
    "item2",
    StatusBarSection.Center,
    120,
    <Svg3D />,
    "Item 2",
    action("Item 2")
  );
  const action3 = StatusBarItemUtilities.createActionItem(
    "item3",
    StatusBarSection.Right,
    150,
    <SvgAndroid />,
    "Item 3",
    action("Item 3")
  );

  const label1 = StatusBarItemUtilities.createLabelItem(
    "item4",
    StatusBarSection.Left,
    110,
    <SvgAttach />,
    "Label 1"
  );

  const label2 = StatusBarItemUtilities.createLabelItem(
    "item5",
    StatusBarSection.Center,
    130,
    <SvgActivity />,
    "Label 2"
  );

  const label3 = StatusBarItemUtilities.createLabelItem(
    "item6",
    StatusBarSection.Right,
    160,
    <SvgAirplane />,
    "Label 3"
  );

  const custom1 = StatusBarItemUtilities.createCustomItem(
    "item7",
    StatusBarSection.Left,
    10,
    <MessageCenterField />
  );

  const custom2 = StatusBarItemUtilities.createCustomItem(
    "item8",
    StatusBarSection.Center,
    30,
    <SelectionCountField count={5} />
  );

  const custom3 = StatusBarItemUtilities.createCustomItem(
    "item9",
    StatusBarSection.Right,
    10,
    <SnapModeField snapMode={SnapMode.Center} />
  );

  const availableSnapModes = [SnapMode.NearestKeypoint, SnapMode.Intersection, SnapMode.Center, SnapMode.Nearest];
  const custom4 = StatusBarItemUtilities.createCustomItem(
    "item10",
    StatusBarSection.Right,
    10,
    <SnapModeField availableSnapModes={availableSnapModes} />
  );

  return {
    action1,
    action2,
    action3,
    label1,
    label2,
    label3,
    custom1,
    custom2,
    custom3,
    custom4
  };
}

function createItemsForOverflow() {
  const label1 = StatusBarItemUtilities.createLabelItem(
    "item101",
    StatusBarSection.Left,
    200,
    <SvgAdd />,
    "Long label 1"
  );

  const label2 = StatusBarItemUtilities.createLabelItem(
    "item102",
    StatusBarSection.Center,
    200,
    <SvgBolt />,
    "Long label 2"
  );

  const label3 = StatusBarItemUtilities.createLabelItem(
    "item103",
    StatusBarSection.Right,
    200,
    <SvgCamera />,
    "Long label 3"
  );

  return {
    label1,
    label2,
    label3,
  };
}
