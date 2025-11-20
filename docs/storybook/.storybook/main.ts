/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { StorybookConfig } from "@storybook/react-vite";
import tsconfigPaths from "vite-tsconfig-paths";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-docs"],

  framework: {
    name: "@storybook/react-vite",
    options: {},
  },

  viteFinal: async (config) => {
    if (!config.build) config.build = {};
    config.build.chunkSizeWarningLimit = 5000;
    // This prevents component name mangling in stories.
    config.build.minify = false;

    // Avoid bundling same module twice when using tsconfig paths.
    config.plugins = [...(config.plugins ?? []), tsconfigPaths()];
    return config;
  },
};
export default config;
