/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module State
 */

import type { ThemeManager } from "./ThemeManager";

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

/** Describe valid themes.
 * See {@link ThemeManager} for more information.
 * @public
 */
export type ThemeId = `${ColorTheme}` | (string & {});

/** The default widget opacity.
 * @public
 */
export const WIDGET_OPACITY_DEFAULT = 0.9;

/** The default widget opacity.
 * @public
 */
export const TOOLBAR_OPACITY_DEFAULT = 0.5;
