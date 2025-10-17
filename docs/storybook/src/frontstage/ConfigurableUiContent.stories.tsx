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
        activeWidgetLabel={props.activeWidgetLabel}
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
    activeWidgetLabel: false,
    widgetOpacity: 1,
    toolbarOpacity: 1,
  },
};

export const SemiTransparentWidgets: Story = {
  args: {
    widgetOpacity: 0.5,
  },
};

export const TransparentToolbars: Story = {
  args: {
    toolbarOpacity: 0.4,
  },
};

export const ShowActiveWidgetLabel: Story = {
  args: {
    activeWidgetLabel: true,
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
    toolbarOpacity: 0.6,
    activeWidgetLabel: true,
    widgetIcon: true,
  },
};

// Example showing how props could be changed at runtime (controls re-render via state).
export const DynamicOpacity: Story = {
  render: (args) => {
    const Dynamic: React.FC = () => {
      const [widgetOpacity, setWidgetOpacity] = React.useState<number>(
        args.widgetOpacity ?? 1
      );
      const [toolbarOpacity, setToolbarOpacity] = React.useState<number>(
        args.toolbarOpacity ?? 1
      );
      return (
        <div style={{ height: "100vh" }}>
          <div style={{ padding: "0.5rem", display: "flex", gap: "0.5rem" }}>
            <label
              style={{
                display: "flex",
                flexDirection: "column",
                fontSize: "0.75rem",
              }}
            >
              Widget Opacity ({widgetOpacity.toFixed(2)})
              <input
                type="range"
                min={0.2}
                max={1}
                step={0.05}
                value={widgetOpacity}
                onChange={(e) => setWidgetOpacity(Number(e.target.value))}
              />
            </label>
            <label
              style={{
                display: "flex",
                flexDirection: "column",
                fontSize: "0.75rem",
              }}
            >
              Toolbar Opacity ({toolbarOpacity.toFixed(2)})
              <input
                type="range"
                min={0.2}
                max={1}
                step={0.05}
                value={toolbarOpacity}
                onChange={(e) => setToolbarOpacity(Number(e.target.value))}
              />
            </label>
          </div>
          <StoryComponent
            widgetOpacity={widgetOpacity}
            toolbarOpacity={toolbarOpacity}
            widgetIcon={args.widgetIcon}
            activeWidgetLabel={args.activeWidgetLabel}
          />
        </div>
      );
    };
    return <Dynamic />;
  },
};
