/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { Preview } from "@storybook/react";
import { withDemoIModel, demoIModelGlobalType } from "./addons/DemoIModel";
import { resizerGlobalType, withResizer } from "./addons/Resizer";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    backgrounds: {
      default: "background",
      values: [
        {
          name: "background",
          value: "white",
        },
        {
          name: "background-backdrop",
          value: "#eef0f1",
        },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    options: {
      storySort: {
        order: [
          "Components",
          "Frontstage",
          "Widget",
          "Hooks",
          "Preview Features",
        ],
      },
    },
  },
  globalTypes: {
    iModel: demoIModelGlobalType,
    resizer: resizerGlobalType,
  },
  decorators: [withDemoIModel, withResizer],
};

export default preview;
