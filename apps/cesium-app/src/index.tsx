/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { ConfigurableUiContent, ThemeManager } from "@itwin/appui-react";

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
}

function App() {
  return (
    <StrictMode>
      <ThemeManager>
        <ConfigurableUiContent />
      </ThemeManager>
    </StrictMode>
  );
}
