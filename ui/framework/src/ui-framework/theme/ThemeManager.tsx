/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
/** @module State */

import * as React from "react";
import { connect } from "react-redux";
import { UiFramework } from "../UiFramework";
import { FrameworkState } from "../redux/FrameworkState";

/** Enum for the Color Theme string.
 * @beta
 */
export enum ColorTheme {
  Light = "light",
  Dark = "dark",
}

/** The default color theme.
 * @beta
 */
export const COLOR_THEME_DEFAULT = ColorTheme.Light;

/** The default widget opacity.
 * @beta
 */
export const WIDGET_OPACITY_DEFAULT = 0.90;

/** Properties of [[ThemeManagerComponent]].
 */
interface ThemeProps {
  /** theme ("light", "dark", etc.) */
  theme: string;
  /** Widget Opacity */
  widgetOpacity: number;
}

function mapStateToProps(state: any) {
  const frameworkState = state[UiFramework.frameworkStateKey] as FrameworkState;  // since app sets up key, don't hard-code name
  // istanbul ignore if
  if (!frameworkState)
    return undefined;

  return { theme: frameworkState.configurableUiState.theme, widgetOpacity: frameworkState.configurableUiState.widgetOpacity };
}

/** ThemeManagerComponent handles setting themes.
 */
class ThemeManagerComponent extends React.Component<ThemeProps> {

  public componentDidMount() {
    this._setTheme(this.props.theme);
  }

  public componentDidUpdate(prevProps: ThemeProps) {
    if (this.props.theme !== prevProps.theme)
      this._setTheme(this.props.theme);
    if (this.props.widgetOpacity !== prevProps.widgetOpacity)
      this._setWidgetOpacity(this.props.widgetOpacity);

  }

  private _setTheme = (theme: string) => {
    document.documentElement.classList.add("theme-transition");
    document.documentElement.setAttribute("data-theme", theme);
    window.setTimeout(() => document.documentElement.classList.remove("theme-transition"), 1000);
  }

  private _setWidgetOpacity = (opacity: number) => {
    document.documentElement.style.setProperty("--buic-widget-opacity", opacity.toString());
  }

  public render(): React.ReactNode {
    return this.props.children;
  }
}

/**
 * ThemeManager handles setting color themes.
 * This React component is Redux connected.
 * @beta
 */
export const ThemeManager = connect(mapStateToProps)(ThemeManagerComponent); // tslint:disable-line:variable-name
