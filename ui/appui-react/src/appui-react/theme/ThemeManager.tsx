/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module State
 */

import "./ThemeManager.scss";
import * as React from "react";
import type { ThemeType } from "@itwin/itwinui-react";
import { ThemeProvider } from "@itwin/itwinui-react";
import type { ThemeId } from "./ThemeId.js";
import { ColorTheme, SYSTEM_PREFERRED_COLOR_THEME } from "./ThemeId.js";
import { useReduxFrameworkState } from "../uistate/useReduxFrameworkState.js";
import type { ConfigurableUiContent } from "../configurableui/ConfigurableUiContent.js";

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

interface ThemeManagerProps {
  children?: React.ReactNode;
  /** Uses redux store as a fallback. Defaults to {@link SYSTEM_PREFERRED_COLOR_THEME}. */
  theme?: ThemeId;
}

/** `ThemeManager` handles setting color themes. Note that this component will
 * affect the entire application by setting the internal `data-theme` attribute.
 * Component children are wrapped with `v2` and `v3` iTwinUI `ThemeProvider` components, so all nodes within the tree will have the same theme, and should be using iTwinUI 2.x or later.
 * Specified `ThemeId` will be mapped to iTwinUI `theme` accordingly.
 * Any other string will only apply the `data-theme` attribute to the underlying `html` element
 * and `ThemeProvider` theme will be set to `inherit`, in this case the application is
 * responsible for setting the theme, i.e. by using iTwinUI css variables.
 *
 * This component should wrap {@link ConfigurableUiContent}.
 *
 * ```tsx
 * <ThemeManager>
 *   <ConfigurableUiContent />
 * </ThemeManager>
 * ```
 * @public
 */
export function ThemeManager({ children, ...props }: ThemeManagerProps) {
  const reduxTheme = useReduxFrameworkState((state) => {
    // eslint-disable-next-line deprecation/deprecation
    return state?.configurableUiState.theme;
  });
  const theme = props.theme ?? reduxTheme ?? SYSTEM_PREFERRED_COLOR_THEME;

  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

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
      {children}
    </ThemeProvider>
  );
}
