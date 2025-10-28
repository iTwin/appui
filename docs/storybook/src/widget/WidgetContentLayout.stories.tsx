/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { Meta, StoryObj } from "@storybook/react-vite";
import { WidgetContentLayoutStory } from "./WidgetContentLayout";
import { AppUiDecorator } from "../Decorators";
import { Page } from "../AppUiStory";

const meta = {
  title: "Widget/Widget Content Layout",
  component: WidgetContentLayoutStory,
  tags: ["autodocs"],
  decorators: [AppUiDecorator],
  parameters: {
    docs: {
      page: () => <Page />,
    },
  },
  args: {
    showFooter: false,
    isLoading: false,
    isContentLoading: false,
    isNonBlockingLoading: false,
    centerContent: false,
    contentType: "short",
    showToggle: false,
    nbButtons: 0,
    nbIcons: 0,
    showSearch: false,
  },
  argTypes: {
    // WidgetLayout props
    isLoading: {
      description: "WidgetLayout: Show blocking loading overlay",
      control: "boolean",
      table: { category: "WidgetLayout",  },
    },
    widgetId: {
      description: "WidgetLayout: Widget size provider ID for responsive sizing",
      control: "text",
      table: { category: "WidgetLayout" },
    },
    // Header props
    title: {
      description: "Header: Title text displayed in the header",
      control: "text",
      table: { category: "WidgetLayout.Header" },
    },
    showToggle: {
      description: "Header: Show toggle switch control",
      control: "boolean",
      table: { category: "WidgetLayout.Header" },
    },
    nbButtons: {
      description: "Header: Number of action buttons to display (cycles through Add, Edit, Delete)",
      control: { type: "number", min: 0, max: 10 },
      table: { category: "WidgetLayout.Header" },
    },
    menu: {
      description: "Header: Show menu button",
      table: { category: "WidgetLayout.Header" },
    },
    nbIcons: {
      description: "Header: Number of icon buttons to display (cycles through Refresh, Settings)",
      control: { type: "number", min: 0, max: 10 },
      table: { category: "WidgetLayout.Header" },
    },
    showSearch: {
      description: "Header: Show search input field",
      control: "boolean",
      table: { category: "WidgetLayout.Header" },
    },
    // Content props
    isContentLoading: {
      description: "Content: Show blocking loading overlay for content area",
      control: "boolean",
      table: { category: "WidgetLayout.Content" },
    },
    isNonBlockingLoading: {
      description: "Content: Show non-blocking loading indicator",
      control: "boolean",
      table: { category: "WidgetLayout.Content" },
    },
    centerContent: {
      description: "Content: Center content vertically and horizontally",
      control: "boolean",
      table: { category: "WidgetLayout.Content" },
    },
    contentType: {
      description: "Content: Type of content to display (demo purposes)",
      control: "select",
      options: ["short", "long", "custom"],
      table: { category: "WidgetLayout.Content" },
    },
    // Footer props
    showFooter: {
      description: "Footer: Display the footer section with action buttons",
      control: "boolean",
      table: { category: "WidgetLayout.Footer" },
    },
  },
} satisfies Meta<typeof WidgetContentLayoutStory>;

export default meta;
type Story = StoryObj<typeof meta>;

const hideArgsTypes = {
    isLoading: { table: { disable: true } },
    widgetId: { table: { disable: true } },
    showToggle: { table: { disable: true } },
    menu: { table: { disable: true } },
    nbIcons: { table: { disable: true } },
    showSearch: { table: { disable: true } },
    isContentLoading: { table: { disable: true } },
    isNonBlockingLoading: { table: { disable: true } },
    centerContent: { table: { disable: true } },
    contentType: { table: { disable: true } },
    showFooter: { table: { disable: true } },
    title: { table: { disable: true } },
    iconSize: { table: { disable: true } },
    nbButtons: { table: { disable: true } },
  }

// =============================================================================
// Basic Examples
// =============================================================================

/**
 * Basic widget layout with just content section (no header or footer).
 */
export const Basic: Story = {
  argTypes: {
    ...hideArgsTypes,
    contentType: {table: {disable: false}}
  },
};

/**
 * Complete widget layout showing all sections: header, content, and footer.
 */
export const Complete: Story = {
  args: {
    title: "Complete Widget",
    showFooter: true,
    contentType: "short",
    widgetId: "complete-widget"
  },
};

// =============================================================================
// WidgetLayout Props
// =============================================================================

/**
 * **WidgetLayout prop**: Shows a blocking loading overlay that covers the entire widget.
 * Use this when the widget is initially loading or when data is being refreshed.
 */
export const WithLoadingOverlay: Story = {
  args: {
    title: "Loading Widget",
    isLoading: true,
    contentType: "long",
  },
    argTypes: {
    ...hideArgsTypes,
    contentType: {table: {disable: false}},
    isLoading: {table: {disable: false}}
  },
};

/**
 * **WidgetLayout prop**: Widget with a size provider ID for responsive sizing.
 * This allows the widget to adapt its layout based on available space.
 *
 * Watch as the widget panel automatically resizes to demonstrate responsive behavior.
 * Adjust the number of buttons and icons to see how the header adapts to different sizes.
 */
export const WithSizeProvider: Story = {
  args: {
    title: "Responsive Widget",
    widgetId: "responsive-widget",
    contentType: "custom",
    showFooter: true,
  },
    argTypes: {
    ...hideArgsTypes,
    contentType: {table: {disable: false}},
    widgetId: {table: {disable: false}},
  },
};

// =============================================================================
// WidgetLayout.Header Props
// =============================================================================

/**
 * **Header prop**: Widget layout with a title in the header.
 */
export const HeaderWithTitle: Story = {
  args: {
    title: "Widget Title",
  },
    argTypes: {
    ...hideArgsTypes,
    title: { table: { disable: false } },
    }
};

/**
 * **Header prop**: Widget layout with action buttons in the header.
 * Control the number of buttons using the `nbButtons` control.
 */
export const HeaderWithButtons: Story = {
  args: {
    nbButtons: 3,
  },
   argTypes: {
    ...hideArgsTypes,
    nbButtons: { table: { disable: false } },
    }
};

/**
 * **Header prop**: Widget layout with icon buttons in the header.
 * Control the number of icons using the `nbIcons` control.
 */
export const HeaderWithIcons: Story = {
  args: {
    nbIcons: 2,
  },
  argTypes: {
    ...hideArgsTypes,
    iconSize: { table: { disable: false } },
    nbIcons: { table: { disable: false } },
    }
};

/**
 * **Header prop**: Widget layout with a search input in the header.
 */
export const HeaderWithSearch: Story = {
  args: {
    showSearch: true,
    iconSize: ""
  },
   argTypes: {
    ...hideArgsTypes,
    iconSize: { table: { disable: false } },
    showSearch: { table: { disable: false } },
  }
};

/**
 * **Header prop**: Widget layout with a toggle control in the header.
 */
export const HeaderWithToggle: Story = {
  args: {
    showToggle: true,
  },
   argTypes: {
    ...hideArgsTypes,
    showToggle: { table: { disable: false } },
  }
};

/**
 * **Header prop**: Widget layout with a menu button in the header.
 */
export const HeaderWithMenu: Story = {
  args: {
    menu: {
      title: "Dropdown Menu",
      items: [{label: "option1", onClick: () => {}}]
    }
  },
   argTypes: {
    ...hideArgsTypes,
    menu: { table: { disable: false } },
  }
};

/**
 * **Header props**: Comprehensive header with all available controls.
 * Demonstrates title, buttons, icons, search, menu, and toggle together.
 */
export const HeaderComplete: Story = {
  args: {
    title: "",
    nbButtons: 2,
    nbIcons: 2,
    showSearch: true,
    menu: {
      title: "Dropdown Menu",
      items: Array.from({ length: 5 }, (_, i) => ({ label: `Option ${i + 1}`, onClick: () => {} })),
    },
    showToggle: false,
  },
  argTypes: {
    isLoading: { table: { disable: true } },
    isContentLoading: { table: { disable: true } },
    isNonBlockingLoading: { table: { disable: true } },
    centerContent: { table: { disable: true } },
    contentType: { table: { disable: true } },
    showFooter: { table: { disable: true } },
    widgetId: { table: { disable: true } },
  },
};

// =============================================================================
// WidgetLayout.Content Props
// =============================================================================

/**
 * **Content prop**: Widget layout with centered content.
 * Useful for widgets with minimal content or loading states.
 */
export const ContentCentered: Story = {
  args: {
    title: "Centered Widget",
    centerContent: true,
    contentType: "short",
  },
   argTypes: {
    ...hideArgsTypes,
    centerContent: { table: { disable: false } },
  }
};

/**
 * **Content prop**: Shows a blocking loading overlay for the content area only.
 * Use this when the content is loading but you want to keep the header interactive.
 */
export const ContentLoading: Story = {
  args: {
    title: "Loading Content",
    isContentLoading: true,
    contentType: "long",
  },
   argTypes: {
    ...hideArgsTypes,
    isContentLoading: { table: { disable: false } },
  }
};

/**
 * **Content prop**: Shows a non-blocking loading indicator at the top of the content area.
 * Use this when content is being refreshed without blocking user interaction.
 */
export const ContentNonBlockingLoading: Story = {
  args: {
    title: "Loading Data",
    isNonBlockingLoading: true,
    contentType: "short",
  },
   argTypes: {
    ...hideArgsTypes,
    isNonBlockingLoading: { table: { disable: false } },
  }
};

// =============================================================================
// WidgetLayout.Footer Props
// =============================================================================

/**
 * **Footer prop**: Widget layout with a footer section containing action buttons.
 * Useful for forms or widgets that need primary and secondary actions.
 */
export const WithFooter: Story = {
  args: {
    title: "Widget with Footer",
    showFooter: true,
    contentType: "custom",
  },
   argTypes: {
    ...hideArgsTypes,
    showFooter: { table: { disable: false } },
  }
};
