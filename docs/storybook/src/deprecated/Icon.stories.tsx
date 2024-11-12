/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from "react";
import type { Decorator, Meta, StoryObj } from "@storybook/react";
import placeholderSvg from "../../assets/placeholder.svg";
import { useConditionalProp } from "@itwin/appui-react-internal/lib/appui-react/hooks/useConditionalProp";
import { ImageRenderer } from "@itwin/components-react-internal/src/components-react/common/ImageRenderer";
import { ConditionalIconItem, Icon } from "@itwin/core-react";
import { SvgPlaceholder } from "@itwin/itwinui-icons-react";
import { AppUiDecorator, InitializerDecorator } from "../Decorators";
import { createBumpEvent } from "../createBumpEvent";

const meta = {
  title: "Deprecated/Icon",
  component: Icon,
  tags: ["autodocs"],
  decorators: [AppUiDecorator, InitializerDecorator],
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof Icon>;

const { getVal, bump, eventId } = createBumpEvent();

const ToggleConditionals: Decorator = (Story) => {
  React.useEffect(() => {
    const id = setInterval(() => {
      bump();
    }, 2000);
    return () => {
      clearInterval(id);
    };
  }, []);
  return <Story />;
};

export const CSSIcon: Story = {
  args: {
    iconSpec: "icon-placeholder",
  },
};

export const ReactNode: Story = {
  args: {
    iconSpec: <SvgPlaceholder />,
  },
};

export const SVGPath: Story = {
  args: {
    iconSpec: placeholderSvg,
  },
};

export const DataURI: Story = {
  render: () => {
    const renderer = new ImageRenderer();
    const img = renderer.render({
      sourceType: "svg",
      value: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
            <path d="M13,13H9V10h4ZM16,3V15a1,1,0,0,1-1,1H1a1,1,0,0,1-1-1V3A1,1,0,0,1,1,2H3V0H4V2h8V0h1V2h2A1,1,0,0,1,16,3ZM15,6H1v9H15Z" />
          </svg>`,
    });
    return <>{img}</>;
  },
};

function ConditionalIcon({
  iconSpec,
  ...props
}: React.ComponentProps<typeof Icon>) {
  const icon = useConditionalProp(iconSpec);
  return <Icon iconSpec={icon} {...props} />;
}

export const ConditionalCSSIcon: Story = {
  args: {
    iconSpec: new ConditionalIconItem(
      () => (getVal() % 2 === 0 ? "icon-app-1" : "icon-app-2"),
      [eventId]
    ),
  },
  render: (args) => {
    return <ConditionalIcon {...args} />;
  },
  decorators: [ToggleConditionals],
};
