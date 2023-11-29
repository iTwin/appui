/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { Meta, StoryObj } from "@storybook/react";
import { fireEvent, within } from "@storybook/testing-library";
import { StandardContentLayouts } from "@itwin/appui-abstract";
import {
  IModelViewportControl,
  StagePanelLocation,
  StagePanelSection,
  StagePanelState,
  StageUsage,
  StandardFrontstageProvider,
  UiFramework,
  WidgetState,
} from "@itwin/appui-react";
import { Cartographic } from "@itwin/core-common";
import {
  BlankConnection,
  IModelApp,
  IModelConnection,
  SpatialViewState,
} from "@itwin/core-frontend";
import { Range3d } from "@itwin/core-geometry";
import { AppUiDecorator } from "../AppUiDecorator";
import { Page } from "../AppUiStory";
import { FrontstageStory } from "./Frontstage";
import { activateCustomFrontstage } from "./activateCustomFrontstage";
import { registerStandardFrontstage } from "./registerStandardFrontstage";
import { CustomTool } from "../docs/ToolSettingProperties";
import { createFrontstageProvider, removeProperty } from "../Utils";
import { VirtualCursorElement, createCursorEvents } from "../VirtualCursor";

const meta = {
  title: "Frontstage/FrontstageProvider",
  component: FrontstageStory,
  tags: ["autodocs"],
  decorators: [AppUiDecorator],
  parameters: {
    docs: {
      page: () => <Page />,
    },
    layout: "fullscreen",
  },
  argTypes: {
    frontstageProviders: removeProperty(),
    itemProviders: removeProperty(),
  },
} satisfies Meta<typeof FrontstageStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  args: {
    frontstageProviders: [createFrontstageProvider()],
    itemProviders: [
      {
        id: "widgets",
        provideWidgets: (_stageId, _stageUsage, location) => {
          if (location === StagePanelLocation.Right)
            return [
              {
                id: "w2",
                label: "Widget 2",
                content: <>Widget content</>,
              },
              {
                id: "w1",
                label: "Widget 1",
                content: <>Widget content</>,
                defaultState: WidgetState.Floating,
                canFloat: {
                  defaultPosition: { x: 20, y: 50 },
                  isResizable: true,
                },
              },
            ];
          return [];
        },
      },
    ],
  },
};

export const Panels: Story = {
  args: {
    frontstageProviders: [
      createFrontstageProvider({
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
      }),
    ],
    itemProviders: [
      {
        id: "widgets",
        provideWidgets: (_stageId, _stageUsage, location) => {
          if (location === StagePanelLocation.Top)
            return [
              {
                id: "w1",
                label: "Widget 1",
                content: <b>Top panel</b>,
              },
            ];
          if (location === StagePanelLocation.Left)
            return [
              {
                id: "w2",
                label: "Widget 2",
                content: <b>Left panel</b>,
              },
            ];
          if (location === StagePanelLocation.Bottom)
            return [
              {
                id: "w3",
                label: "Widget 3",
                content: <b>Bottom panel</b>,
              },
            ];
          if (location === StagePanelLocation.Right)
            return [
              {
                id: "w4",
                label: "Widget 4",
                content: <b>Right panel</b>,
              },
            ];
          return [];
        },
      },
    ],
  },
};

export const PanelSections: Story = {
  args: {
    frontstageProviders: [
      createFrontstageProvider({
        rightPanelProps: {
          minSize: 120,
          size: 150,
        },
        bottomPanelProps: {
          minSize: 90,
          size: 100,
        },
      }),
    ],
    itemProviders: [
      {
        id: "widgets",
        provideWidgets: (_stageId, _stageUsage, location, section) => {
          if (
            location === StagePanelLocation.Right &&
            section === StagePanelSection.Start
          )
            return [
              {
                id: "w3",
                label: "Widget 3",
                content: <b>Start section</b>,
              },
            ];
          if (
            location === StagePanelLocation.Right &&
            section === StagePanelSection.End
          )
            return [
              {
                id: "w4",
                label: "Widget 4",
                content: <b>End section</b>,
              },
            ];
          if (
            location === StagePanelLocation.Bottom &&
            section === StagePanelSection.Start
          )
            return [
              {
                id: "w1",
                label: "Widget 1",
                content: <b>Start section</b>,
              },
            ];
          if (
            location === StagePanelLocation.Bottom &&
            section === StagePanelSection.End
          )
            return [
              {
                id: "w2",
                label: "Widget 2",
                content: <b>End section</b>,
              },
            ];
          return [];
        },
      },
    ],
  },
};

export const FloatingWidgets: Story = {
  args: {
    frontstageProviders: [createFrontstageProvider()],
    itemProviders: [
      {
        id: "widgets",
        provideWidgets: () => {
          return [
            {
              id: "w1",
              label: "Widget 1",
              content: <b>Floating widget</b>,
              defaultState: WidgetState.Floating,
              canFloat: {
                defaultPosition: {
                  x: 20,
                  y: 20,
                },
              },
            },
            {
              id: "w2",
              label: "Widget 2",
              content: <b>Floating widget</b>,
              defaultState: WidgetState.Floating,
              canFloat: {
                defaultPosition: {
                  x: 20,
                  y: 200,
                },
              },
            },
          ];
        },
      },
    ],
  },
};

export const WidgetContainer: Story = {
  args: {
    frontstageProviders: [
      createFrontstageProvider({
        rightPanelProps: {
          size: 300,
        },
      }),
    ],
    itemProviders: [
      {
        id: "widgets",
        provideWidgets: (_stageId, _stageUsage, location) => {
          if (location !== StagePanelLocation.Right) return [];
          return [
            {
              id: "w1",
              label: "Widget 1",
              content: <b>Widget content</b>,
              defaultState: WidgetState.Floating,
              canFloat: {
                defaultPosition: {
                  x: 20,
                  y: 20,
                },
                containerId: "fw1",
              },
            },
            {
              id: "w2",
              label: "Widget 2",
              content: <b>Widget content</b>,
              defaultState: WidgetState.Floating,
              canFloat: {
                containerId: "fw1",
              },
            },
            {
              id: "w3",
              label: "Widget 3",
              content: <b>Widget content</b>,
              canFloat: {
                containerId: "fw1",
              },
            },
            {
              id: "w4",
              label: "Widget 4",
              content: <b>Widget content</b>,
              canFloat: {
                containerId: "fw1",
              },
            },
            {
              id: "w5",
              label: "Widget 5",
              content: <b>Widget content</b>,
              canFloat: {
                containerId: "fw1",
              },
            },
          ];
        },
      },
    ],
  },
};

export const Interaction: Story = {
  args: {
    frontstageProviders: () => [createFrontstageProvider()],
    itemProviders: [
      {
        id: "widgets",
        provideWidgets: (_stageId, _stageUsage, location) => {
          if (location === StagePanelLocation.Right)
            return [
              {
                id: "w1",
                label: "Widget 1",
                content: <>Widget content</>,
              },
              {
                id: "w2",
                label: "Widget 2",
                content: <>Widget content</>,
              },
            ];
          return [];
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

export const ToolSettings: Story = {
  args: {
    frontstageProviders: [],
    onInitialized: async () => {
      const iModelConnection = createBlankConnection();
      const viewState = await createBlankViewState(iModelConnection);
      UiFramework.setIModelConnection(iModelConnection, true);
      UiFramework.setDefaultViewState(viewState, true);

      UiFramework.frontstages.addFrontstageProvider(
        new StandardFrontstageProvider({
          id: "main-frontstage",
          usage: StageUsage.General,
          version: Math.random(),
          contentGroupProps: {
            id: "ContentGroup",
            layout: StandardContentLayouts.singleView,
            contents: [
              {
                id: "Content",
                classId: IModelViewportControl,
              },
            ],
          },
        })
      );
      await UiFramework.frontstages.setActiveFrontstage("main-frontstage");

      IModelApp.tools.register(CustomTool, UiFramework.localizationNamespace);
      IModelApp.tools.run(CustomTool.toolId);
    },
  },
};

export const CustomFrontstage: Story = {
  args: {
    frontstageProviders: [],
    onInitialized: () => {
      activateCustomFrontstage();
    },
  },
};

export const StandardFrontstage: Story = {
  args: {
    frontstageProviders: [],
    onInitialized: async () => {
      registerStandardFrontstage();
      void UiFramework.frontstages.setActiveFrontstage(
        "example:StandardFrontstage"
      );
    },
  },
};

async function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function createBlankConnection() {
  return BlankConnection.create({
    name: "Exton PA",
    location: Cartographic.fromDegrees({
      longitude: -75.686694,
      latitude: 40.065757,
      height: 0,
    }),
    extents: new Range3d(-1000, -1000, -100, 1000, 1000, 100),
  });
}

async function createBlankViewState(iModel: IModelConnection) {
  const ext = iModel.projectExtents;
  return SpatialViewState.createBlank(iModel, ext.low, ext.high.minus(ext.low));
}
