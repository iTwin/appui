/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { PreviewFeaturesProvider } from "@itwin/appui-react";
import { ThemeProvider } from "@itwin/itwinui-react";
import { enable } from "@itwin/appui-react/useStrataKit";
import { Root } from "@stratakit/mui";
import { ThemeBridgeContext, ThemeBridgeValue } from "./ThemeBridge";

type ThemeProviderProps = React.ComponentProps<typeof ThemeProvider>;

interface ThemeBridgeRootProps {
  children?: React.ReactNode;
  themeBridge: NonNullable<ThemeBridgeValue>;
}

export function ThemeBridgeRoot(props: ThemeBridgeRootProps) {
  const prefersDark = useMediaQuery("(prefers-color-scheme: dark)");
  const useStrataKit = props.themeBridge === "useStrataKit";

  return (
    <ThemeBridgeContext value={props.themeBridge}>
      <PreviewFeaturesProvider
        features={{
          useStrataKit: useStrataKit ? enable() : undefined,
        }}
      >
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
      </PreviewFeaturesProvider>
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
