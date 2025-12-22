/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { useActiveFrontstageDef } from "@itwin/appui-react";
import { Button } from "@itwin/itwinui-react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { action } from "storybook/actions";
import { Page } from "../AppUiStory";
import { PanelsStory } from "./Panels";
import { createWidget, removeProperty } from "../Utils";

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
            content: <>Panel 1 content</>,
            type: "dynamic",
            placement: "left",
            label: "Dynamic panel 1",
          },
          {
            id: "panel2",
            content: <>Panel 2 content</>,
            type: "dynamic",
            placement: "right",
            label: "Dynamic panel 2",
          },
        ],
        getWidgets: () => [
          createWidget(1, {
            content: <Widget />,
          }),
          createWidget(2),
        ],
      };
    },
  },
};

function useOpenPanels() {
  const frontstageDef = useActiveFrontstageDef();
  const subscribe = React.useCallback(
    (onStoreChange: () => void) => {
      if (!frontstageDef) return () => {};
      return frontstageDef.panels.onPanelOpenChanged.addListener((args) => {
        action("onPanelOpenChanged")(args);
        onStoreChange();
      });
    },
    [frontstageDef]
  );
  const getSnapshot = React.useCallback(() => {
    return frontstageDef?.panels.getOpenPanels();
  }, [frontstageDef]);
  return React.useSyncExternalStore(subscribe, getSnapshot);
}

function Widget() {
  const frontstageDef = useActiveFrontstageDef();
  const openPanels = useOpenPanels();
  return (
    <div
      style={{
        padding: "var(--iui-size-xs)",
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}
    >
      <Button
        onClick={() => {
          const id = "panel1";
          const isActive = openPanels?.some((p) => p === id);
          if (isActive) {
            frontstageDef?.panels.close({
              id,
            });
            return;
          }
          frontstageDef?.panels.open({ id });
        }}
      >
        Toggle panel1
      </Button>
      <Button
        onClick={() => {
          const id = "panel2";
          const isActive = openPanels?.some((p) => p === id);
          if (isActive) {
            frontstageDef?.panels.close({
              id,
            });
            return;
          }
          frontstageDef?.panels.open({ id });
        }}
      >
        Toggle panel2
      </Button>
    </div>
  );
}
