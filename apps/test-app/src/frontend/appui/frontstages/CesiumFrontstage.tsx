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
import { create } from "zustand";
import ReactDOM from "react-dom";

const cesiumContainer = "cesiumContainer";
const code = "code";

interface CesiumStore {
  iFrameKey: number;
}

const useCesiumStore = create<CesiumStore>(() => {
  return {
    iFrameKey: 0,
  };
});

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
    hideToolSettings: true,
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
  const iFrameKey = useCesiumStore((state) => state.iFrameKey);
  React.useEffect(() => {
    // Workaround to run initial code
    const timeout = setTimeout(() => {
      run();
    }, 1);
    return () => {
      clearTimeout(timeout);
    };
  }, []);
  return (
    <div id="bucketFrame" key={iFrameKey} className={styles.bucket}>
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
      run();
    },
    layouts: {
      standard: {
        orientation: ToolbarOrientation.Horizontal,
        usage: ToolbarUsage.ContentManipulation,
      },
    },
  });
}

function run() {
  ReactDOM.flushSync(() => {
    useCesiumStore.setState((state) => {
      return {
        ...state,
        iFrameKey: state.iFrameKey + 1,
      };
    });
  });
  const codeEl = document.getElementById(code);
  if (!(codeEl instanceof HTMLTextAreaElement)) return;
  window.eval(codeEl.value); // TODO: this is a bad idea, but for now it works.
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
