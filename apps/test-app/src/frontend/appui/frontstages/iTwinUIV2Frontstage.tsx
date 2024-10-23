/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import {
  BackstageAppButton,
  Frontstage,
  FrontstageUtilities,
  StagePanelLocation,
  StagePanelSection,
  StageUsage,
  StandardContentLayouts,
  UiItemsProvider,
} from "@itwin/appui-react";
import { ViewportContent } from "@itwin/appui-test-providers";
import { MeasureDistanceTool } from "@itwin/core-frontend";
import { SvgMore } from "@itwin/itwinui-icons-react";
import {
  Button,
  Checkbox,
  DropdownMenu,
  IconButton,
  MenuItem,
  Radio,
} from "@itwin/itwinui-react-v2";

export function createITwinUIV2Frontstage(): Frontstage {
  return FrontstageUtilities.createStandardFrontstage({
    id: createITwinUIV2Frontstage.stageId,
    contentGroupProps: {
      id: "content-group",
      layout: StandardContentLayouts.singleView,
      contents: [
        {
          id: "viewport",
          classId: "",
          content: <ViewportContent />,
        },
      ],
    },
    cornerButton: <BackstageAppButton />,
    defaultTool: MeasureDistanceTool.toolId,
    usage: StageUsage.General,
  });
}
createITwinUIV2Frontstage.stageId = "itwinui-v2";

export function createITwinUIV2FrontstageProvider() {
  return {
    id: "itwinui-v2-provider",
    getWidgets: () => {
      return [
        {
          id: "iTwinUIv2",
          label: "iTwinUI v2",
          canPopout: true,
          content: <ITwinUIv2Widget />,
          layouts: {
            standard: {
              location: StagePanelLocation.Right,
              section: StagePanelSection.Start,
            },
          },
        },
      ];
    },
  } satisfies UiItemsProvider;
}

function ITwinUIv2Widget() {
  const [count, setCount] = React.useState(0);
  return (
    <div style={{ padding: "0.5rem" }}>
      <Button
        onClick={() => {
          setCount((prev) => ++prev);
        }}
      >
        {count}++
      </Button>
      <Checkbox label="Checkbox" />
      <Radio label="Radio" />
      <DropdownMenu
        menuItems={(close) =>
          [...Array(6)].map((_, index) => (
            <MenuItem key={index + 1} onClick={close}>
              Item {index + 1}
            </MenuItem>
          ))
        }
      >
        <IconButton label="Actions">
          <SvgMore />
        </IconButton>
      </DropdownMenu>
    </div>
  );
}
