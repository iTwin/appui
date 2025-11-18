/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from "react";
import type { Decorator } from "@storybook/react-vite";
import { DarkModeBackgroundWrapper } from "./DarkModeBackgroundWrapper";

export const withDarkModeBackground: Decorator = (Story, context) => {
  const darkModeGlobal = context.globals.darkMode;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const prefersDark = useMediaQuery("(prefers-color-scheme: dark)");

  // Use custom dark mode toggle, falling back to system preference
  const isDark =
    darkModeGlobal === "dark" || (darkModeGlobal !== "light" && prefersDark);

  return (
    <DarkModeBackgroundWrapper isDark={isDark}>
      <Story />
    </DarkModeBackgroundWrapper>
  );
};

function useMediaQuery(query: string) {
  const getClientSnapshot = React.useCallback(() => {
    return window.matchMedia?.(query).matches;
  }, [query]);

  const subscribe = React.useCallback(
    (onChange: () => void) => {
      const mediaQueryList = window.matchMedia?.(query);
      mediaQueryList?.addEventListener?.("change", onChange);
      return () => mediaQueryList?.removeEventListener?.("change", onChange);
    },
    [query]
  );

  return React.useSyncExternalStore(subscribe, getClientSnapshot);
}

export const darkModeGlobalType = {
  description: "Toggle dark mode",
  defaultValue: "light",
  toolbar: {
    title: "Dark mode",
    icon: "moon",
    items: [
      { title: "Light", value: "light", icon: "sun" },
      { title: "Dark", value: "dark", icon: "moon" },
    ],
    dynamicTitle: true,
  },
};
