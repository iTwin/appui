/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module State
 */

import "./ThemeManager.scss";
import * as React from "react";
import { assert } from "@itwin/core-bentley";
import type { ThemeType } from "@itwin/itwinui-react";
import { ThemeProvider } from "@itwin/itwinui-react";
import { ThemeProvider as ThemeProviderV2 } from "@itwin/itwinui-react-v2";
import { useGlobalState } from "../redux/useGlobalState";
import { ColorTheme } from "./ThemeId";

/** Map of ColorTheme to ThemeType. */
const colorThemeToThemeTypeMap: { [x: string]: ThemeType } = {
  [ColorTheme.Light]: "light",
  [ColorTheme.HighContrastLight]: "light",
  [ColorTheme.Dark]: "dark",
  [ColorTheme.HighContrastDark]: "dark",
  [ColorTheme.System]: "os",
  os: "os", // handle "os" for backwards compatibility
};

/** List of high contrast color themes. */
const highContrastColorThemes: string[] = [
  ColorTheme.HighContrastDark,
  ColorTheme.HighContrastLight,
];

/** ThemeManager handles setting color themes and element opacity management. Note that this component will
 * affect the entire application by setting the data-theme attribute to the html element.
 * It also sets an iTwinUI `ThemeProvider` element locally, so all elements
 * within the AppUI tree will have the same theme, and should be using iTwinUI 2.x or later.
 * A `ColorTheme` enum values will configure iTwinUI `ThemeProvider` accordingly.
 * Any other string will only apply the `data-theme` attribute to the `html` element
 * and `ThemeProvider` theme will be set to `inherit`, in this case the application is
 * responsible for setting the theme by overriding iTwinUI css variables.
 *
 * This React component is Redux connected and should wrap [[ConfigurableUiContent]].
 *
 * ```tsx
 * <Provider store={UiFramework.store}>
 *   <ThemeManager>
 *     <ConfigurableUiContent />
 *   </ThemeManager>
 * </Provider>
 * ```
 * @public
 */
export function ThemeManager({ children }: React.PropsWithChildren<{}>) {
  const frameworkState = useGlobalState();
  assert(!!frameworkState);
  const { theme, toolbarOpacity, widgetOpacity } =
    frameworkState.configurableUi;

  const setToolbarOpacity = (opacity: number) => {
    const currentToolbarOpacity =
      document.documentElement.style.getPropertyValue("--buic-toolbar-opacity");
    if (currentToolbarOpacity === opacity.toString()) return;
    setTimeout(() => {
      document.documentElement.style.setProperty(
        "--buic-toolbar-opacity",
        opacity.toString()
      );
    });
  };

  React.useEffect(() => {
    document.documentElement.classList.add("theme-transition");
    document.documentElement.setAttribute("data-theme", theme);
    setTimeout(
      () => document.documentElement.classList.remove("theme-transition"),
      1000
    );
  }, [theme]);

  React.useEffect(() => {
    const currentWidgetOpacity =
      document.documentElement.style.getPropertyValue("--buic-widget-opacity");
    if (currentWidgetOpacity === widgetOpacity.toString()) return;
    setTimeout(() =>
      document.documentElement.style.setProperty(
        "--buic-widget-opacity",
        widgetOpacity.toString()
      )
    );
  }, [widgetOpacity]);

  React.useEffect(() => {
    setToolbarOpacity(toolbarOpacity);
  }, [toolbarOpacity]);

  const providerTheme = colorThemeToThemeTypeMap[theme];
  const highContrast = highContrastColorThemes.includes(theme);

  return (
    <ThemeProvider
      className="uifw-root"
      theme={providerTheme ?? "inherit"}
      themeOptions={{ highContrast }}
      data-root-container="appui-root-id"
      includeCss={true}
    >
      <ThemeProviderV2 /* v2 ThemeProvider is required to fix popup styling issues in widget popouts. */
        style={{ height: "100%" }}
        theme={providerTheme ?? "inherit"}
        themeOptions={{ highContrast }}
      >
        {children}
      </ThemeProviderV2>
    </ThemeProvider>
  );
}
