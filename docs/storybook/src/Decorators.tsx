/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
// TODO: use https://vitejs.dev/config/server-options.html#server-fs-allow instead
import "../lib/webfont/bentley-icons-generic-webfont.css";
import React from "react";
import { action } from "@storybook/addon-actions";
import { Provider } from "react-redux";
import type { Decorator } from "@storybook/react-vite";
import {
  ColorTheme,
  StateManager,
  ThemeManager,
  UiFramework,
} from "@itwin/appui-react";
import { IModelApp } from "@itwin/core-frontend";
import { UiIModelComponents } from "@itwin/imodel-components-react-internal/src/imodel-components-react/UiIModelComponents";

export const AppUiDecorator: Decorator = (Story, context) => {
  new StateManager();

  const darkModeGlobal = context.globals.darkMode;
  const prefersDark = window.matchMedia?.(
    "(prefers-color-scheme: dark)"
  ).matches;
  const isDark =
    darkModeGlobal === "dark" || (darkModeGlobal !== "light" && prefersDark);
  const theme = isDark ? ColorTheme.Dark : ColorTheme.Light;

  return (
    <Provider store={StateManager.store}>
      <ThemeManager theme={theme}>
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

// Decorator that forwards console.* calls to the Storybook actions panel
export const ConsoleToActionsDecorator: Decorator = (Story) => {
  React.useEffect(() => {
    const originalConsole = {
      log: console.log.bind(console),
      warn: console.warn.bind(console),
      error: console.error.bind(console),
      info: console.info.bind(console),
    };

    const makeWrapper = (level: "log" | "warn" | "error" | "info") => {
      const act = action(`console.${level}`);
      return (...args: unknown[]) => {
        try {
          act(...args);
        } catch {
          // ignore action errors
        }
        // keep original behavior
        originalConsole[level](...(args as unknown[]));
      };
    };

    // replace console methods
    console.log = makeWrapper("log");
    console.warn = makeWrapper("warn");
    console.error = makeWrapper("error");
    console.info = makeWrapper("info");

    return () => {
      // restore originals
      console.log = originalConsole.log;
      console.warn = originalConsole.warn;
      console.error = originalConsole.error;
      console.info = originalConsole.info;
    };
  }, []);

  return <Story />;
};
