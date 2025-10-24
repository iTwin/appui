/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { create } from "storybook/theming/create";

// Check system preference for initial theme
const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;

export const lightTheme = create({
  base: "light",
  brandTitle: "AppUI",
});

export const darkTheme = create({
  base: "dark",
  brandTitle: "AppUI",
});

export default prefersDark ? darkTheme : lightTheme;
