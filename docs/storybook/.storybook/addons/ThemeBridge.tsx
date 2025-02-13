/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from "react";
import type { Decorator } from "@storybook/react";
import { ThemeProvider } from "@itwin/itwinui-react";
import { Root } from "@itwin/itwinui-react-v5/bricks";

export const withThemeBridge: Decorator = (Story, context) => {
  const themeBridge = !!context.globals.themeBridge;
  const prefersDark = useMediaQuery("(prefers-color-scheme: dark)");
  return (
    <Root
      colorScheme={prefersDark ? "dark" : "light"}
      density="dense"
      synchronizeColorScheme
      render={(props: any) => (
        <ThemeProvider future={{ themeBridge }} {...props} />
      )}
    >
      <Story />
    </Root>
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
