/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from "react";
import type { Decorator, Meta, StoryObj } from "@storybook/react";
import { AccuDrawWidget, FrameworkAccuDraw } from "@itwin/appui-react";
import { AppUiStory } from "../AppUiStory";
import { createFrontstage } from "../Utils";
import { CompassMode, IModelApp } from "@itwin/core-frontend";
import { SvgPlaceholder } from "@itwin/itwinui-icons-react";

function StoryWrapper(props: React.PropsWithChildren) {
  React.useEffect(() => {
    IModelApp.accuDraw.setCompassMode(CompassMode.Rectangular);
    FrameworkAccuDraw.uiStateStorage = {
      ...FrameworkAccuDraw.uiStateStorage,
      xIcon: "icon-placeholder",
      xIconNode: <SvgPlaceholder />,
    };
  }, []);
  return <>{props.children}</>;
}

const StoryDecorator: Decorator = (Story) => {
  return (
    <AppUiStory
      frontstages={[
        createFrontstage({
          content: (
            <StoryWrapper>
              <Story />
            </StoryWrapper>
          ),
        }),
      ]}
    />
  );
};

const meta = {
  title: "Components/AccuDrawWidget",
  component: AccuDrawWidget,
  tags: ["autodocs"],
  decorators: [StoryDecorator],
} satisfies Meta<typeof AccuDrawWidget>;

export default meta;
type Story = StoryObj<typeof AccuDrawWidget>;

export const Basic: Story = {};
