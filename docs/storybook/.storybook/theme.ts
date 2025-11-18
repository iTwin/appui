/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { create } from "storybook/theming/create";

// Check system preference for initial theme
const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;

export const lightTheme: ReturnType<typeof create> = create({
  base: "light",
  brandTitle: "AppUI",
  brandUrl: "https://github.com/iTwin/appui",
  brandImage: "https://storybook.js.org/images/placeholders/350x150.png",
});

export const darkTheme: ReturnType<typeof create> = create({
  base: "dark",
  brandTitle: "AppUI",
  brandUrl: "https://github.com/iTwin/appui",
  brandImage: "https://storybook.js.org/images/placeholders/350x150.png",
});

const defaultTheme: ReturnType<typeof create> = prefersDark
  ? darkTheme
  : lightTheme;

export default defaultTheme;
