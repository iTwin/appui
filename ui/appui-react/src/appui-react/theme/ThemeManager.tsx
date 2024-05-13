/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module State
 */

import "./ThemeManager.scss";
import * as React from "react";
import { connect } from "react-redux";
import type { ThemeType } from "@itwin/itwinui-react";
import { ThemeProvider } from "@itwin/itwinui-react";
import { ThemeProvider as ThemeProviderV2 } from "@itwin/itwinui-react-v2";
import type { FrameworkState } from "../redux/FrameworkState";
import { UiFramework } from "../UiFramework";

/** System preferred color theme.
 * @public
 */
export const SYSTEM_PREFERRED_COLOR_THEME = "SYSTEM_PREFERRED";

/** Enum for the Color Theme string.
 * @public
 */
export enum ColorTheme {
  /** Will use iTwinUI `light` theme. */
  Light = "light",
  /** Will use iTwinUI `dark` theme. */
  Dark = "dark",
  /** Will use iTwinUI `os` theme. */
  System = SYSTEM_PREFERRED_COLOR_THEME,
  /** Will use iTwinUI wrapping `ThemeProvider` if provided, or default to 'Light' */
  Inherit = "inherit",
  /** Will use iTwinUI `light` theme with `highContrast` set to `true` */
  HighContrastLight = "high-contrast-light",
  /** Will use iTwinUI `dark` theme with `highContrast` set to `true` */
  HighContrastDark = "high-contrast-dark",
}

/**
 * Describe valid themes.
 * See [[ThemeManager]] for more information.
 * @public
 */
export type ThemeId = `${ColorTheme}` | (string & {});

/**
 * Map of ColorTheme to ThemeType
 */
const colorThemeToThemeTypeMap: { [x: string]: ThemeType } = {
  [ColorTheme.Light]: "light",
  [ColorTheme.HighContrastLight]: "light",
  [ColorTheme.Dark]: "dark",
  [ColorTheme.HighContrastDark]: "dark",
  [ColorTheme.System]: "os",
  os: "os", // handle "os" for backwards compatibility
};

/**
 * List of high contrast color themes
 */
const highContrastColorThemes: string[] = [
  ColorTheme.HighContrastDark,
  ColorTheme.HighContrastLight,
];

/** The default widget opacity.
 * @public
 */
export const WIDGET_OPACITY_DEFAULT = 0.9;

/** The default widget opacity.
 * @public
 */
export const TOOLBAR_OPACITY_DEFAULT = 0.5;

/** Properties of [[ThemeManagerComponent]].
 */
interface ThemeManagerProps {
  /** theme ("light", "dark", etc.) */
  theme: ThemeId;
  /* Widget Opacity */
  widgetOpacity: number;
  children?: React.ReactNode;
  toolbarOpacity: number;
}

function mapStateToProps(state: any) {
  const frameworkState = state[UiFramework.frameworkStateKey] as FrameworkState; // since app sets up key, don't hard-code name
  // istanbul ignore if
  if (!frameworkState) return undefined;

  return {
    theme: frameworkState.configurableUiState.theme,
    widgetOpacity: frameworkState.configurableUiState.widgetOpacity,
    toolbarOpacity: frameworkState.configurableUiState.toolbarOpacity,
  };
}

/** ThemeManagerComponent handles setting themes. */
class ThemeManagerComponent extends React.Component<ThemeManagerProps> {
  public override componentDidMount() {
    this._setTheme(this.props.theme);
    this._setWidgetOpacity(this.props.widgetOpacity);
    this._setToolbarOpacity(this.props.toolbarOpacity);
  }

  public override componentDidUpdate(prevProps: ThemeManagerProps) {
    if (this.props.theme !== prevProps.theme) this._setTheme(this.props.theme);
    if (this.props.widgetOpacity !== prevProps.widgetOpacity)
      this._setWidgetOpacity(this.props.widgetOpacity);
    if (this.props.toolbarOpacity !== prevProps.toolbarOpacity)
      this._setToolbarOpacity(this.props.toolbarOpacity);
  }

  private _setTheme = (theme: string) => {
    document.documentElement.classList.add("theme-transition");
    document.documentElement.setAttribute("data-theme", theme);
    window.setTimeout(
      () => document.documentElement.classList.remove("theme-transition"),
      1000
    );
  };

  private _setWidgetOpacity = (opacity: number) => {
    const currentWidgetOpacity =
      document.documentElement.style.getPropertyValue("--buic-widget-opacity");
    if (currentWidgetOpacity !== opacity.toString()) {
      setTimeout(() =>
        document.documentElement.style.setProperty(
          "--buic-widget-opacity",
          opacity.toString()
        )
      );
    }
  };

  private _setToolbarOpacity = (opacity: number) => {
    const currentToolbarOpacity =
      document.documentElement.style.getPropertyValue("--buic-toolbar-opacity");
    if (currentToolbarOpacity !== opacity.toString()) {
      setTimeout(() => {
        document.documentElement.style.setProperty(
          "--buic-toolbar-opacity",
          opacity.toString()
        );
      });
    }
  };

  public override render(): React.ReactNode {
    const theme = colorThemeToThemeTypeMap[this.props.theme];
    const highContrast = highContrastColorThemes.includes(this.props.theme);

    return (
      <ThemeProvider
        className="uifw-root"
        theme={theme ?? "inherit"}
        themeOptions={{ highContrast }}
        data-root-container="appui-root-id"
        includeCss={true}
      >
        <ThemeProviderV2 /* v2 ThemeProvider is required to fix popup styling issues in widget popouts. */
          style={{ height: "100%" }}
          theme={theme ?? "inherit"}
          themeOptions={{ highContrast }}
        >
          {this.props.children}
        </ThemeProviderV2>
      </ThemeProvider>
    );
  }
}

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
export const ThemeManager = connect(mapStateToProps)(ThemeManagerComponent);
