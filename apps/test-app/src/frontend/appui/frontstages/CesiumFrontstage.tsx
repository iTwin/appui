/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import styles from "./CesiumFrontstage.module.scss";
import {
  FrontstageUtilities,
  StagePanelLocation,
  StagePanelSection,
  StageUsage,
  StandardContentLayouts,
  ToolbarItemUtilities,
  ToolbarOrientation,
  ToolbarUsage,
  UiItemsProvider,
} from "@itwin/appui-react";
import { LabeledTextarea } from "@itwin/itwinui-react";
import { SvgDeveloper, SvgScriptRun } from "@itwin/itwinui-icons-react";

const cesiumContainer = "cesiumContainer";
const code = "code";

export function createCesiumFrontstage() {
  return FrontstageUtilities.createStandardFrontstage({
    id: createCesiumFrontstage.stageId,
    contentGroupProps: {
      id: "content-group",
      layout: StandardContentLayouts.singleView,
      contents: [
        {
          id: "viewport",
          classId: "",
          content: <CesiumIFrame />,
        },
      ],
    },
    usage: StageUsage.General,
  });
}
createCesiumFrontstage.stageId = "cesium";

export function createCesiumFrontstageProvider(): UiItemsProvider {
  const id = "cesium-items";
  return {
    id,
    getToolbarItems: () => {
      return [createRunButton()];
    },
    getWidgets: () => {
      const layouts = {
        standard: {
          location: StagePanelLocation.Right,
          section: StagePanelSection.Start,
        },
      };
      return [
        {
          id: `code`,
          label: "Code",
          iconNode: <SvgDeveloper />,
          content: <CodeWidget />,
          layouts,
        },
      ];
    },
  };
}

// TODO: not really an iframe for simplicity.
function CesiumIFrame() {
  return (
    <div
      id="bucketFrame"
      className={styles.bucket}
      style={{ background: "red" }}
    >
      <div id={cesiumContainer} style={{ height: "100%" }}></div>
    </div>
  );
}

function createRunButton() {
  return ToolbarItemUtilities.createActionItem({
    id: "run",
    label: "Run",
    icon: <SvgScriptRun />,
    execute: () => {
      const codeEl = document.getElementById(code);
      if (!(codeEl instanceof HTMLTextAreaElement)) return;
      window.eval(codeEl.value); // TODO: this is a bad idea, but for now it works.
    },
    layouts: {
      standard: {
        orientation: ToolbarOrientation.Horizontal,
        usage: ToolbarUsage.ContentManipulation,
      },
    },
  });
}

function CodeWidget() {
  const defaultValue = `const viewer = new Cesium.Viewer("cesiumContainer");
  /*viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(-122.4175, 37.655, 400),
        orientation: {
          heading: Cesium.Math.toRadians(0.0),
          pitch: Cesium.Math.toRadians(-15.0),
        }
      });*/`;
  return (
    <LabeledTextarea
      id={code}
      defaultValue={defaultValue}
      label=""
      className={styles.code}
      wrapperProps={{
        className: styles.codeWrapper,
      }}
    />
  );
}
