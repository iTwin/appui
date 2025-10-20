/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import type { ArgTypes, Decorator } from "@storybook/react-vite";
import {
  ContentProps,
  Frontstage,
  FrontstageUtilities,
  MessageManager,
  StagePanelLocation,
  StagePanelSection,
  StageUsage,
  StandardContentLayouts,
  StandardFrontstageProps,
  Widget,
} from "@itwin/appui-react";
import {
  NotifyMessageDetails,
  OutputMessagePriority,
} from "@itwin/core-frontend";

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
    layouts: {
      standard: {
        location: StagePanelLocation.Left,
        section: StagePanelSection.Start,
      },
    },
    ...overrides,
  };
}

export function createMessageDecorator({
  priority,
  briefMessage = "Message",
  detailedMessage,
}: {
  priority: OutputMessagePriority;
  briefMessage?: string;
  detailedMessage?: string;
}): Decorator {
  return (Story) => {
    React.useEffect(() => {
      MessageManager.clearMessages();
      Array.from({ length: 4 }).forEach((_, index) => {
        const id = index + 1;
        briefMessage = briefMessage ?? "Message";
        MessageManager.addToMessageCenter(
          new NotifyMessageDetails(
            priority,
            `${briefMessage} ${id}`,
            detailedMessage ? `${detailedMessage} ${id}` : undefined
          )
        );
      });
    }, []);
    return <Story />;
  };
}
