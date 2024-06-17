/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { StandardContentLayouts } from "@itwin/appui-abstract";
import {
  Frontstage,
  FrontstageUtilities,
  StagePanelLocation,
  StagePanelSection,
  StageUsage,
  StandardFrontstageProps,
  Widget,
} from "@itwin/appui-react";
import { createContentControl } from "./createContentControl";

export function createFrontstage(
  overrides?: Partial<StandardFrontstageProps> & {
    content?: React.ReactNode;
    contentManipulation?: Frontstage["contentManipulation"];
  }
): Frontstage {
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
          classId: createContentControl(
            overrides?.content ?? (
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
            )
          ),
        },
      ],
    },
    hideStatusBar: true,
    hideToolSettings: true,
    hideNavigationAid: true,
    ...overrides,
  });

  const contentManipulation =
    overrides?.contentManipulation ?? config.contentManipulation;
  return {
    ...config,
    contentManipulation,
  };
}

export function removeProperty() {
  return {
    table: {
      disable: true,
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
