/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { AppUiDecorator } from "../Decorators";
import { Page } from "../AppUiStory";
import { AppUiStory } from "../AppUiStory";
import {
  ConfigurableUiContent,
  StagePanelLocation,
  StagePanelSection,
  WidgetState,
} from "@itwin/appui-react";
import { createFrontstage, createWidget } from "../Utils";

// This story focuses on showcasing the top-level ConfigurableUiContent component props
// (widgetOpacity, toolbarOpacity, widgetIcon, etc.) independent of other frontstage examples.
// ConfigurableUiContent is normally rendered by AppUiStory, but here we expose its props directly
// so consumers can experiment with visual settings while a minimal frontstage is active.

function StoryComponent(
  props: React.ComponentProps<typeof ConfigurableUiContent>
) {
  return (
    <AppUiStory
      frontstages={[createFrontstage()]}
      itemProviders={[
        {
          id: "widgets",
          getWidgets: () => {
            const layouts = {
              standard: {
                location: StagePanelLocation.Right,
                section: StagePanelSection.Start,
              },
            };
            return [
              createWidget(1, {
                defaultState: WidgetState.Floating,
                canFloat: {
                  defaultPosition: { x: 20, y: 50 },
                  defaultSize: { width: 300, height: 200 },
                  isResizable: true,
                },
                layouts,
              }),
              createWidget(2, { layouts }),
              createWidget(3, { layouts }),
              createWidget(4, { layouts }),
            ];
          },
        },
      ]}
      displayChildrenOnly={true}
      // Provide custom children so we can adjust ConfigurableUiContent props directly.
    >
      <ConfigurableUiContent
        style={{ height: "calc(100vh - 2rem)" }}
        widgetOpacity={props.widgetOpacity}
        toolbarOpacity={props.toolbarOpacity}
        widgetIcon={props.widgetIcon}
        showActiveWidgetLabel={props.showActiveWidgetLabel}
      />
    </AppUiStory>
  );
}

const meta = {
  title: "Frontstage/ConfigurableUiContent",
  component: StoryComponent,
  tags: ["autodocs"],
  decorators: [AppUiDecorator],
  parameters: {
    docs: {
      page: () => <Page />,
    },
    layout: "fullscreen",
  },
} satisfies Meta<typeof StoryComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    widgetIcon: true,
    showActiveWidgetLabel: false,
    widgetOpacity: 1,
  },
};

export const SemiTransparentWidgets: Story = {
  args: {
    widgetOpacity: 0.5,
  },
};

export const ShowActiveWidgetLabel: Story = {
  args: {
    showActiveWidgetLabel: true,
  },
};

export const HideWidgetIcons: Story = {
  args: {
    widgetIcon: false,
  },
};

// Combined example altering multiple props at once.
export const MixedStyles: Story = {
  args: {
    widgetOpacity: 0.7,
    showActiveWidgetLabel: true,
    widgetIcon: true,
  },
};
