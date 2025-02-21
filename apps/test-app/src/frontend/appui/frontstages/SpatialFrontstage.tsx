/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import {
  BackstageItemUtilities,
  Frontstage,
  FrontstageUtilities,
  StageUsage,
  StandardContentLayouts,
  UiItemsProvider,
} from "@itwin/appui-react";
import {
  SvgClose,
  SvgMapInfo,
  SvgPlaceholder,
  SvgWindowMaximize,
} from "@itwin/itwinui-icons-react";
import { ViewportContent } from "@itwin/appui-test-providers";
import styles from "./SpatialFrontstage.module.scss";
import {
  ButtonGroup,
  Flex,
  IconButton,
  Surface,
  Text,
} from "@itwin/itwinui-react";

export function createSpatialFrontstage(): Frontstage {
  const frontstage = FrontstageUtilities.createStandardFrontstage({
    id: createSpatialFrontstage.stageId,
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
    usage: StageUsage.General,
  });
  return {
    ...frontstage,
    layout: <SpatialLayout />,
  };
}
createSpatialFrontstage.stageId = "appui-test-app:spatial-frontstage";

export function createSpatialFrontstageProvider(): UiItemsProvider {
  const id = "appui-test-app:spatial-items";
  return {
    id,
    getBackstageItems: () => [
      BackstageItemUtilities.createStageLauncher({
        stageId: createSpatialFrontstage.stageId,
        groupPriority: 200,
        itemPriority: 10,
        label: "Spatial",
        icon: <SvgMapInfo />,
      }),
    ],
  };
}

function SpatialLayout() {
  const [panelSize, setPanelSize] = React.useState(300);
  return (
    <div className={styles.spatialLayout}>
      <div className={styles.toolbar}>
        <ButtonGroup>
          <IconButton label="Add">
            <SvgPlaceholder />
          </IconButton>
          <IconButton label="Edit" isActive>
            <SvgPlaceholder />
          </IconButton>
          <IconButton label="Delete">
            <SvgPlaceholder />
          </IconButton>
          <IconButton label="Undo">
            <SvgPlaceholder />
          </IconButton>
        </ButtonGroup>
      </div>
      <Surface
        className={styles.panel}
        elevation={4}
        style={{
          width: panelSize,
        }}
      >
        <Surface.Header as={Flex} justifyContent="space-between">
          <Text variant="subheading" as="h2">
            Label
          </Text>
          <div>
            <IconButton
              size="small"
              styleType="borderless"
              onClick={() => {
                if (panelSize === 300) setPanelSize(500);
                else setPanelSize(300);
              }}
              aria-label="Expand"
            >
              <SvgWindowMaximize />
            </IconButton>
            <IconButton
              size="small"
              styleType="borderless"
              onClick={() => {}}
              aria-label="Close"
            >
              <SvgClose />
            </IconButton>
          </div>
        </Surface.Header>
        <Surface.Body isPadded={true}>Content</Surface.Body>
      </Surface>
    </div>
  );
}
