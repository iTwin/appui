/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Page } from "../AppUiStory";
import { PanelsStory } from "./Panels";
import { createWidget, removeProperty } from "../Utils";
import { Button } from "@itwin/itwinui-react";
import { useActiveFrontstageDef } from "@itwin/appui-react";
import React from "react";
import { action } from "storybook/internal/actions";

const meta = {
  title: "Frontstage/Panels",
  component: PanelsStory,
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: () => <Page />,
    },
    layout: "fullscreen",
  },
  args: {
    getItemProvider: ({}) => {
      return {
        id: "items",
      };
    },
  },
  argTypes: {
    getItemProvider: removeProperty(),
  },
} satisfies Meta<typeof PanelsStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DynamicPanel: Story = {
  args: {
    getItemProvider: () => {
      return {
        id: "items",
        getPanels: () => [
          {
            id: "panel1",
            content: <>Hello world</>,
            type: "dynamic",
            placement: "left",
            label: "Dynamic panel 1",
          },
        ],
        getWidgets: () => [
          createWidget(1, {
            content: <Widget />,
          }),
        ],
      };
    },
  },
};

function Widget() {
  const frontstageDef = useActiveFrontstageDef();
  const [isActive, setIsActive] = React.useState(() => {
    if (!frontstageDef) return false;
    return frontstageDef?.panels.getOpenPanels().includes("panel1");
  });
  React.useEffect(() => {
    if (!frontstageDef) return;
    return frontstageDef.panels.onPanelOpenChanged.addListener((args) => {
      action("onPanelOpenChanged")(args);
      if (args.id !== "panel1") return;
      setIsActive(args.open);
    });
  }, [frontstageDef]);
  return (
    <div>
      Widget 1 Content
      <Button
        onClick={() => {
          if (!frontstageDef) return;

          if (isActive) {
            frontstageDef.panels.close({
              id: "panel1",
            });
            return;
          }
          frontstageDef.panels.open({ id: "panel1" });
        }}
      >
        Open panel
      </Button>
    </div>
  );
}
