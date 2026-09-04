/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { Meta, StoryObj } from "@storybook/react-vite";
import { WidgetState } from "@itwin/appui-react";
import { BadgeType } from "@itwin/core-react";
import { SvgPlaceholder } from "@itwin/itwinui-icons-react";
import { Icon as SKIcon } from "@stratakit/foundations";
import { useThemeBridge } from "../../.storybook/addons/ThemeBridge";
import { AppUiDecorator } from "../Decorators";
import { Page } from "../AppUiStory";
import { WidgetStory } from "./Widget";

import placeholderIcon from "@stratakit/icons/placeholder.svg";

const meta = {
  title: "Widget/Widget",
  component: WidgetStory,
  tags: ["autodocs"],
  decorators: [AppUiDecorator],
  parameters: {
    docs: {
      page: () => <Page />,
    },
  },
  args: {
    widgetTabActions: false,
    widgets: [{}, {}],
  },
} satisfies Meta<typeof WidgetStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Unloaded: Story = {
  args: {
    widgets: [{ defaultState: WidgetState.Unloaded }, {}],
  },
};

export const Floating: Story = {
  args: {
    widgets: [{ defaultState: WidgetState.Floating }, {}],
  },
};

export const Badge: Story = {
  args: {
    widgets: [
      { badge: BadgeType.TechnicalPreview },
      { badgeKind: "deprecated" },
      {},
    ],
  },
};

export const Icons: Story = {
  args: {
    widgets: [
      { iconNode: <SvgPlaceholder />, label: "iTwinUI" },
      {
        iconNode: <StrataKitIcon href={placeholderIcon} />,
        label: "StrataKit",
      },
      { iconNode: <i className="icon icon-placeholder" />, label: "CSS Icon" },
      { icon: "icon-placeholder", label: "iconSpec (deprecated)" },
      { icon: <SvgPlaceholder />, label: "iconSpec node (deprecated)" },
    ],
  },
};

interface StrataKitIconProps {
  href: string;
}

function StrataKitIcon(props: StrataKitIconProps) {
  const themeBridge = useThemeBridge();
  if (!themeBridge) {
    return <SvgPlaceholder />;
  }

  return <SKIcon href={props.href} />;
}
