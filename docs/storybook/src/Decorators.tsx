/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
// TODO: use https://vitejs.dev/config/server-options.html#server-fs-allow instead
import "../lib/webfont/bentley-icons-generic-webfont.css";
import React from "react";
import { Provider } from "react-redux";
import type { Decorator } from "@storybook/react-vite";
import { StateManager, ThemeManager, UiFramework } from "@itwin/appui-react";
import { IModelApp } from "@itwin/core-frontend";
import { UiIModelComponents } from "@itwin/imodel-components-react-internal/src/imodel-components-react/UiIModelComponents";

export const AppUiDecorator: Decorator = (Story) => {
  new StateManager();
  return (
    <Provider store={StateManager.store}>
      <ThemeManager>
        <Story />
      </ThemeManager>
    </Provider>
  );
};

export const InitializerDecorator: Decorator = (Story) => {
  const [initialized, setInitialized] = React.useState(false);
  React.useEffect(() => {
    let ignore = false;
    void (async () => {
      await IModelApp.startup({});
      await UiFramework.initialize(undefined);
      await UiIModelComponents.initialize();
      if (ignore) return;
      setInitialized(true);
    })();
    return () => {
      ignore = true;
    };
  }, []);
  if (!initialized) return <>Initializing...</>;
  return <Story />;
};
