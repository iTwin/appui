/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  StagePanelState,
  UiItemsProvider,
  WidgetSizeProvider,
  useWidgetSize,
} from "@itwin/appui-react";
import { AppUiDecorator, InitializerDecorator } from "../Decorators";
import { Page, AppUiStory } from "../AppUiStory";
import { createFrontstage, createWidget } from "src/Utils";
import { defaultBreakpoints } from "@itwin/appui-react-internal/lib/appui-react/hooks/useElementSize";

interface WidgetSizeProviderStoryProps {
  id?: string;
  breakpoints?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    "2xl"?: number;
  };
  width?: string;
  height?: string;
}

function WidgetSizeProviderStory(props: WidgetSizeProviderStoryProps) {
  const { id = "widget-size-demo", breakpoints } = props;

  const provider: UiItemsProvider = {
    id: "widget-layout-provider",
    getWidgets: () => [
      createWidget(1, {
        content: (
          <WidgetSizeProvider id={id} breakpoints={breakpoints}>
            <WidgetContent breakpoints={breakpoints} />
          </WidgetSizeProvider>
        ),
        label: "Widget Layout Demo",
      }),
    ],
  };

  return (
    <AppUiStory
      itemProviders={[provider]}
      frontstages={[
        createFrontstage({
          leftPanelProps: {
            defaultState: StagePanelState.Open,
            pinned: true,
          },
        }),
      ]}
    />
    // <div style={{ padding: "20px" }}>
    //   <h3>Widget Size Provider Demo</h3>
    //   <p>Resize the container to see the size change.</p>

    //   <div
    //     style={{
    //       width,
    //       height,
    //       resize: "both",
    //       overflow: "auto",
    //       border: "2px solid #ccc",
    //       borderRadius: "4px",
    //       padding: "10px",
    //       backgroundColor: "#f5f5f5",
    //     }}
    //   >
    //     <WidgetSizeProvider id={id} breakpoints={breakpoints}>
    //       <WidgetContent />
    //     </WidgetSizeProvider>
    //   </div>
    // </div>
  );
}

function WidgetContent({
  breakpoints,
}: {
  breakpoints?: Record<string, number>;
}) {
  const { size, dimension } = useWidgetSize();

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        padding: "16px",
        borderRadius: "4px",
      }}
    >
      <div
        style={{
          padding: "16px",
          backgroundColor: getSizeColor(size),
          color: "white",
          borderRadius: "4px",
          fontWeight: "bold",
          fontSize: "24px",
          textAlign: "center",
        }}
      >
        Current Size: {size}
      </div>

      <div
        style={{
          padding: "16px",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      >
        <h4 style={{ marginTop: 0 }}>Dimensions</h4>
        <pre style={{ margin: 0 }}>
          Width: {dimension.width}px{"\n"}
          Height: {dimension.height}px
        </pre>
      </div>

      <div
        style={{
          padding: "16px",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      >
        <h4 style={{ marginTop: 0 }}>Breakpoint Info</h4>
        <ul style={{ margin: 0, paddingLeft: "20px" }}>
          <li>xs: 0px - {(breakpoints?.sm ?? defaultBreakpoints.sm) - 1}px</li>
          <li>
            sm: 300px - {(breakpoints?.md ?? defaultBreakpoints.md) - 1}px
          </li>
          <li>
            md: 600px - {(breakpoints?.lg ?? defaultBreakpoints.lg) - 1}px
          </li>
          <li>
            lg: 1024px - {(breakpoints?.xl ?? defaultBreakpoints.xl) - 1}px
          </li>
          <li>
            xl: 1280px -{" "}
            {(breakpoints?.["2xl"] ?? defaultBreakpoints["2xl"]) - 1}px
          </li>
          <li>2xl: 1536px+</li>
        </ul>
      </div>

      <ResponsiveContent />
    </div>
  );
}

function ResponsiveContent() {
  const { size } = useWidgetSize();

  return (
    <div
      style={{
        padding: "16px",
        borderRadius: "4px",
        border: "1px solid #ccc",
        flex: 1,
      }}
    >
      <h4 style={{ marginTop: 0 }}>Responsive Content</h4>
      {size === "xs" && (
        <p>
          <strong>Extra Small:</strong> Minimal content displayed for very
          narrow widgets.
        </p>
      )}
      {size === "sm" && (
        <p>
          <strong>Small:</strong> Compact layout with essential information
          only.
        </p>
      )}
      {size === "md" && (
        <p>
          <strong>Medium:</strong> Standard layout with balanced content and
          spacing.
        </p>
      )}
      {size === "lg" && (
        <p>
          <strong>Large:</strong> Expanded layout with additional details and
          features.
        </p>
      )}
      {size === "xl" && (
        <p>
          <strong>Extra Large:</strong> Full-featured layout with maximum
          content visibility.
        </p>
      )}
      {size === "2xl" && (
        <p>
          <strong>2X Large:</strong> Ultra-wide layout optimized for large
          displays.
        </p>
      )}
    </div>
  );
}

function getSizeColor(size: string): string {
  const colors: Record<string, string> = {
    xs: "#dc2626",
    sm: "#ea580c",
    md: "#ca8a04",
    lg: "#16a34a",
    xl: "#2563eb",
    "2xl": "#7c3aed",
  };
  return colors[size] || "#6b7280";
}

const meta = {
  title: "Widget/WidgetSizeProvider",
  component: WidgetSizeProviderStory,
  tags: ["autodocs"],
  decorators: [InitializerDecorator, AppUiDecorator],
  parameters: {
    docs: {
      page: () => <Page />,
    },
  },
  argTypes: {
    width: {
      control: "text",
      description: "Width of the container",
    },
    height: {
      control: "text",
      description: "Height of the container",
    },
  },
} satisfies Meta<typeof WidgetSizeProviderStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomBreakpoints: Story = {
  args: {
    breakpoints: {
      sm: 200,
      md: 300,
      lg: 400,
      xl: 500,
      "2xl": 600,
    },
  },
};
