/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { addons, types } from "@storybook/manager-api";
import theme from "./theme";
import { DarkModeToggle } from "./addons/DarkModeToggle";

addons.setConfig({
  theme,
});

addons.register("dark-mode-toggle", () => {
  addons.add("dark-mode-toggle/toolbar", {
    type: types.TOOL,
    title: "Dark mode toggle",
    render: DarkModeToggle,
  });
});
