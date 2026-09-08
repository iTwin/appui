/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { ThemeProvider } from "@itwin/itwinui-react";
import { Root } from "@stratakit/mui";
import { ThemeBridgeContext } from "./ThemeBridge";

type ThemeProviderProps = React.ComponentProps<typeof ThemeProvider>;

export function ThemeBridgeRoot(props: React.PropsWithChildren) {
  const prefersDark = useMediaQuery("(prefers-color-scheme: dark)");

  return (
    <ThemeBridgeContext value={true}>
      <Root
        colorScheme={prefersDark ? "dark" : "light"}
        render={(props: unknown) => (
          <ThemeProvider
            future={{ themeBridge: true }}
            {...(props as ThemeProviderProps)}
          />
        )}
      >
        {props.children}
      </Root>
    </ThemeBridgeContext>
  );
}

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
