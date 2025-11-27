/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { action } from "storybook/actions";
import type { ArgTypes } from "@storybook/react-vite";
import {
  ContentProps,
  Frontstage,
  FrontstageUtilities,
  StagePanelLocation,
  StagePanelSection,
  StageUsage,
  StandardContentLayouts,
  StandardFrontstageProps,
  ToolbarActionItem,
  ToolbarGroupItem,
  ToolbarItemUtilities,
  ToolbarOrientation,
  ToolbarUsage,
  Widget,
} from "@itwin/appui-react";
import { SvgPlaceholder } from "@itwin/itwinui-icons-react";

export function createFrontstage(
  overrides?: Partial<StandardFrontstageProps> &
    Pick<Frontstage, "layout" | "toolSettings"> & {
      content?: React.ReactNode;
      contentProps?: Partial<ContentProps>;
      contentManipulation?: Frontstage["contentManipulation"];
    }
): Frontstage {
  const {
    content,
    contentProps,
    contentManipulation,
    layout,
    toolSettings,
    ...rest
  } = overrides ?? {};
  const config = FrontstageUtilities.createStandardFrontstage({
    id: "main-frontstage",
    usage: StageUsage.Private,
    version: Math.random(),
    contentGroupProps: {
      id: "ContentGroup",
      layout: StandardContentLayouts.singleView,
      contents: [
        {
          id: "Content",
          classId: "",
          content: content ?? (
            <h1
              style={{
                display: "flex",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Content
            </h1>
          ),
          ...contentProps,
        },
      ],
    },
    hideStatusBar: true,
    hideToolSettings: true,
    hideNavigationAid: true,
    ...rest,
  });

  return {
    ...config,
    layout,
    contentManipulation: contentManipulation ?? config.contentManipulation,
    toolSettings: toolSettings ?? config.toolSettings,
  };
}

export function removeProperty() {
  return {
    table: {
      disable: true,
    },
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function enumArgType(_enum: any): ArgTypes[0] {
  const options = Object.values<number>(_enum).filter(
    (value) => typeof value === "number"
  );
  return {
    options,
    control: {
      type: "select",
      labels: _enum,
    },
  };
}

export function createWidget(id: number, overrides?: Partial<Widget>): Widget {
  return {
    id: `w${id}`,
    label: `Widget ${id}`,
    content: <>Widget {id} content</>,
    iconNode: <SvgPlaceholder />,
    layouts: {
      standard: {
        location: StagePanelLocation.Left,
        section: StagePanelSection.Start,
      },
    },
    ...overrides,
  };
}

export function createToolbarItemFactory() {
  let i = 0;
  function createActionItem(
    overrides?: Omit<Partial<ToolbarActionItem>, "icon">
  ) {
    const id = `item${++i}`;
    const label = `Item ${i}`;
    return ToolbarItemUtilities.createActionItem({
      id,
      label,
      icon: <SvgPlaceholder />,
      execute: () => action(label)(),
      layouts: {
        standard: {
          usage: ToolbarUsage.ContentManipulation,
          orientation: ToolbarOrientation.Horizontal,
        },
      },
      ...overrides,
    });
  }

  function createGroupItem(
    overrides?: Omit<Partial<ToolbarGroupItem>, "icon">
  ) {
    const id = `group${++i}`;
    const label = `Group ${i}`;
    return ToolbarItemUtilities.createGroupItem({
      id,
      label,
      icon: <SvgPlaceholder />,
      ...overrides,
    });
  }

  return {
    createActionItem,
    createGroupItem,
  };
}
