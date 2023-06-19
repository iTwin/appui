/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { StorybookConfig } from "@storybook/react-vite";

// Disable warnings for CI. Look into storybook logLevel and vite createLogger.
const consoleWarn = console.warn;
console.warn = (...data) => {
  const [msg] = data;
  if (msg.includes('"requireFromString" is not exported')) return;
  if (msg.includes('"requireFromFile" is not exported')) return;
  if (msg.includes('"release" is not exported')) return;
  if (msg.includes('"type" is not exported')) return;
  if (msg.includes('"default" is not exported')) return;
  if (msg.includes("Use of eval in")) return;
  if (msg.includes("./sb-common-assets/fonts.css doesn't exist at build time"))
    return;
  consoleWarn(...data);
};

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  viteFinal: async (config) => {
    config.build!.chunkSizeWarningLimit = 5000;
    return config;
  },
};
export default config;
