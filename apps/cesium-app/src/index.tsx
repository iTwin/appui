/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import "./index.css";
import * as React from "react";
import ReactDOM from "react-dom/client";
import {
  ConfigurableUiContent,
  FrontstageUtilities,
  StageUsage,
  StandardContentLayouts,
  ThemeManager,
  UiFramework,
} from "@itwin/appui-react";

// Set up the application
(() => {
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
            content: <>Hello Cesium App</>,
          },
        ],
      },
      // TODO: tool settings rely on IModelApp
      hideToolSettings: true,
    })
  );

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
