/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { ThemeProvider } from "@itwin/itwinui-react";
import type { Decorator, Preview } from "@storybook/react-vite";
import { ThemeBridgeRoot } from "./ThemeBridgeRoot";

export const withThemeBridge: Decorator = (Story, context) => {
  const themeBridge = context.globals.themeBridge as ThemeBridgeValue;

  if (themeBridge) {
    return (
      <ThemeBridgeRoot themeBridge={themeBridge}>
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

type GlobalType = NonNullable<Preview["globalTypes"]>["themeBridge"];

export const themeBridgeGlobalType = {
  description: "iTwinUI theme bridge",
  defaultValue: undefined,
  toolbar: {
    title: "Theme bridge",
    icon: "paintbrush",
    items: [
      { title: "Enable", value: "true" },
      {
        title: "Enable (with useStrataKit)",
        value: "useStrataKit",
      },
      { title: "Disable", type: "reset" },
    ],
  },
} satisfies GlobalType;

export type ThemeBridgeValue = "true" | "useStrataKit" | undefined;

export const ThemeBridgeContext =
  React.createContext<ThemeBridgeValue>(undefined);
