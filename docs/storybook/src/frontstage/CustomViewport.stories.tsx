/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { createThreeFrontstage, createThreeProvider } from "./CustomViewport";
import {
  ConfigurableUiContent,
  ThemeManager,
  UiFramework,
  UiItemsManager,
} from "@itwin/appui-react";

function Initializer({ children }: React.PropsWithChildren) {
  const [initialized, setInitialized] = React.useState(false);
  React.useEffect(() => {
    // TODO: get rid of static initializer
    UiFramework.initialize(undefined);
    setInitialized(true);
  }, []);
  if (!initialized) return <>Initializing...</>;
  return <>{children}</>;
}

function Initialized() {
  React.useEffect(() => {
    UiFramework.frontstages.addFrontstage(createThreeFrontstage());
    UiItemsManager.register(createThreeProvider());
    UiFramework.frontstages.setActiveFrontstage(createThreeFrontstage.id);
  }, []);
  return (
    <ThemeManager>
      <ConfigurableUiContent style={{ height: "100vh" }} />
    </ThemeManager>
  );
}

function StoryComponent() {
  return (
    <Initializer>
      <Initialized />
    </Initializer>
  );
}

const meta = {
  title: "Frontstage/CustomViewport",
  component: StoryComponent,
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: () => <StoryComponent />,
    },
    layout: "fullscreen",
  },
} satisfies Meta<typeof StoryComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};
