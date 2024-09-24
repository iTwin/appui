/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { Meta, StoryObj } from "@storybook/react";
import { fireEvent, within } from "@storybook/test";
import {
  StagePanelLocation,
  StagePanelSection,
  StagePanelState,
  WidgetState,
} from "@itwin/appui-react";
import { Page } from "../AppUiStory";
import { FrontstageStory } from "./Frontstage";
import { createWidget, removeProperty } from "../Utils";
import { VirtualCursorElement, createCursorEvents } from "../VirtualCursor";

const meta = {
  title: "Frontstage/FrontstageProvider",
  component: FrontstageStory,
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: () => <Page />,
    },
    layout: "fullscreen",
  },
  args: {
    hideStatusBar: true,
    hideToolSettings: true,
  },
  argTypes: {
    frontstage: removeProperty(),
    itemProviders: removeProperty(),
  },
} satisfies Meta<typeof FrontstageStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  args: {
    itemProviders: [
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
                isResizable: true,
              },
              layouts,
            }),
            createWidget(2, {
              layouts,
            }),
          ];
        },
      },
    ],
  },
};

export const Panels: Story = {
  args: {
    frontstage: {
      leftPanelProps: {
        defaultState: StagePanelState.Open,
        pinned: true,
        minSize: 120,
        size: 150,
      },
      rightPanelProps: {
        minSize: 120,
        size: 150,
      },
      topPanelProps: {
        defaultState: StagePanelState.Open,
        pinned: true,
        minSize: 90,
        size: 100,
      },
      bottomPanelProps: {
        minSize: 90,
        size: 100,
      },
    },
    itemProviders: [
      {
        id: "widgets",
        getWidgets: () => [
          createWidget(1, {
            content: <b>Top panel</b>,
            layouts: {
              standard: {
                location: StagePanelLocation.Top,
                section: StagePanelSection.Start,
              },
            },
          }),
          createWidget(2, {
            content: <b>Left panel</b>,
            layouts: {
              standard: {
                location: StagePanelLocation.Left,
                section: StagePanelSection.Start,
              },
            },
          }),
          createWidget(3, {
            content: <b>Bottom panel</b>,
            layouts: {
              standard: {
                location: StagePanelLocation.Bottom,
                section: StagePanelSection.Start,
              },
            },
          }),
          createWidget(4, {
            content: <b>Right panel</b>,
            layouts: {
              standard: {
                location: StagePanelLocation.Right,
                section: StagePanelSection.Start,
              },
            },
          }),
        ],
      },
    ],
  },
};

export const PanelSections: Story = {
  args: {
    frontstage: {
      rightPanelProps: {
        minSize: 120,
        size: 150,
      },
      bottomPanelProps: {
        minSize: 90,
        size: 100,
      },
    },
    itemProviders: [
      {
        id: "widgets",
        getWidgets: () => [
          createWidget(1, {
            content: <b>Start section</b>,
            layouts: {
              standard: {
                location: StagePanelLocation.Bottom,
                section: StagePanelSection.Start,
              },
            },
          }),
          createWidget(2, {
            content: <b>End section</b>,
            layouts: {
              standard: {
                location: StagePanelLocation.Bottom,
                section: StagePanelSection.End,
              },
            },
          }),
          createWidget(3, {
            content: <b>Start section</b>,
            layouts: {
              standard: {
                location: StagePanelLocation.Right,
                section: StagePanelSection.Start,
              },
            },
          }),
          createWidget(4, {
            content: <b>End section</b>,
            layouts: {
              standard: {
                location: StagePanelLocation.Right,
                section: StagePanelSection.End,
              },
            },
          }),
        ],
      },
    ],
  },
};

export const FloatingWidgets: Story = {
  args: {
    itemProviders: [
      {
        id: "widgets",
        getWidgets: () => [
          createWidget(1, {
            content: <b>Floating widget</b>,
            defaultState: WidgetState.Floating,
            canFloat: {
              defaultPosition: {
                x: 20,
                y: 20,
              },
            },
          }),
          createWidget(2, {
            content: <b>Floating widget</b>,
            defaultState: WidgetState.Floating,
            canFloat: {
              defaultPosition: {
                x: 20,
                y: 200,
              },
            },
          }),
        ],
      },
    ],
  },
};

export const WidgetContainer: Story = {
  args: {
    frontstage: {
      rightPanelProps: {
        size: 300,
      },
    },
    itemProviders: [
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
                defaultPosition: {
                  x: 20,
                  y: 20,
                },
                containerId: "fw1",
              },
              layouts,
            }),
            createWidget(2, {
              defaultState: WidgetState.Floating,
              canFloat: {
                containerId: "fw1",
              },
              layouts,
            }),
            createWidget(3, {
              canFloat: {
                containerId: "fw1",
              },
              layouts,
            }),
            createWidget(4, {
              canFloat: {
                containerId: "fw1",
              },
              layouts,
            }),
            createWidget(5, {
              canFloat: {
                containerId: "fw1",
              },
              layouts,
            }),
          ];
        },
      },
    ],
  },
};

export const Interaction: Story = {
  args: {
    itemProviders: [
      {
        id: "widgets",
        getWidgets: () => {
          const layouts = {
            standard: {
              location: StagePanelLocation.Right,
              section: StagePanelSection.Start,
            },
          };
          return [createWidget(1, { layouts }), createWidget(2, { layouts })];
        },
      },
    ],
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    const virtualMouse = new VirtualCursorElement();
    canvasElement.append(virtualMouse);

    const cursorEvents = createCursorEvents(
      { x: virtualMouse.left, y: virtualMouse.top },
      (to) => {
        fireEvent.mouseMove(canvasElement.ownerDocument, {
          clientX: to.x,
          clientY: to.y,
        });
      }
    );
    await step("test", async () => {
      const widget = await canvas.findByTitle("Widget 2", undefined, {
        timeout: 5000,
      });
      const initialBounds = widget.getBoundingClientRect();
      const startPos = {
        x: initialBounds.x + 10,
        y: initialBounds.y + 10,
      };
      const moveTo = {
        x: initialBounds.x - 300,
        y: initialBounds.y + 200,
      };

      await wait(1000);
      await cursorEvents.move(startPos);
      await wait(1000);
      fireEvent.mouseDown(widget, {
        clientX: startPos.x,
        clientY: startPos.y,
      });

      await cursorEvents.move(moveTo);
      await wait(500);
      fireEvent.mouseUp(widget.ownerDocument, {
        clientX: moveTo.x,
        clientY: moveTo.y,
      });
    });
  },
};

async function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
