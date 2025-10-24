/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from "react";
import { useGlobals } from "@storybook/manager-api";
import { IconButton } from "@storybook/components";
import {SvgSun, SvgMoon} from "@itwin/itwinui-icons-react";

export const DarkModeToggle = () => {
  const [globals, updateGlobals] = useGlobals();
  const isDark = globals.darkMode === "dark";

  const toggleDarkMode = React.useCallback(() => {
    updateGlobals({
      darkMode: isDark ? "light" : "dark",
    });
  }, [isDark, updateGlobals]);

  return (
    <IconButton
      key="dark-mode-toggle"
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={toggleDarkMode}
    >
      {isDark ? <SvgSun /> : <SvgMoon />}
    </IconButton>
  );
};
