/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { ThemeProvider } from "@itwin/itwinui-react";
import type { Decorator } from "@storybook/react-vite";
import { ThemeBridgeRoot } from "./ThemeBridgeRoot";

export const withThemeBridge: Decorator = (Story, context) => {
  const themeBridge = !!context.globals.themeBridge;

  if (themeBridge) {
    return (
      <ThemeBridgeRoot>
        <Story />
      </ThemeBridgeRoot>
    );
  }

  return (
    <ThemeProvider>
      <></>
      <Story />
    </ThemeProvider>
  );
};

export const themeBridgeGlobalType = {
  description: "iTwinUI v5 theme bridge",
  defaultValue: undefined,
  toolbar: {
    title: "Theme bridge",
    icon: "paintbrush",
    items: [
      { title: "Enable", value: "true" },
      { title: "Disable", type: "reset" },
    ],
  },
};

export const ThemeBridgeContext = React.createContext(false);
