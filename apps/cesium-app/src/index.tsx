/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import {
  ConfigurableUiContent,
  FrontstageUtilities,
  StageUsage,
  StandardContentLayouts,
  ThemeManager,
  UiFramework,
  UiItemsManager,
} from "@itwin/appui-react";
import { CesiumViewer } from "./CesiumViewer";
import { Ion } from "cesium";
import { createCesiumUIItemsProvider } from "./CesiumUiItemsProvider";

// Set up the application
(() => {
  const ionToken = import.meta.env.VITE_ION_TOKEN;
  Ion.defaultAccessToken = ionToken;

  UiFramework.frontstages.addFrontstage(
    FrontstageUtilities.createStandardFrontstage({
      id: "cesium-frontstage",
      usage: StageUsage.General,
      contentGroupProps: {
        id: "cesium-content",
        layout: StandardContentLayouts.singleView,
        contents: [
          {
            id: "cesium-content-view",
            classId: "",
            content: <CesiumViewer />,
          },
        ],
      },
      // TODO: tool settings rely on IModelApp
      hideToolSettings: true,
    })
  );

  UiItemsManager.register(createCesiumUIItemsProvider());

  UiFramework.frontstages.setActiveFrontstage("cesium-frontstage");
})();

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
}

function App() {
  return (
    <React.StrictMode>
      <ThemeManager>
        <ConfigurableUiContent />
      </ThemeManager>
    </React.StrictMode>
  );
}
