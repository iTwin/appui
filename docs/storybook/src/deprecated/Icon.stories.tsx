/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from "react";
import type { Decorator, Meta, StoryObj } from "@storybook/react";
import placeholderSvg from "@bentley/icons-generic/icons/placeholder.svg";
import { useConditionalValue } from "@itwin/appui-react/lib/esm/appui-react/hooks/useConditionalValue";
import { ImageRenderer } from "@itwin/components-react/src/components-react/common/ImageRenderer";
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

export const ConditionalCSSIcon: Story = {
  args: {
    iconSpec: new ConditionalIconItem(
      () => (getVal() % 2 === 0 ? "icon-app-1" : "icon-app-2"),
      [eventId]
    ),
  },
  render: (args) => {
    const icon = useConditionalValue(args.iconSpec);
    return <Icon iconSpec={icon} />;
  },
  decorators: [ToggleConditionals],
};
