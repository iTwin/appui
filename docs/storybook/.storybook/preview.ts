/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { Preview } from "@storybook/react";
import { withDemoIModel, demoIModelGlobalType } from "./addons/DemoIModel";
import { resizerGlobalType } from "./addons/Resizer";
import { themeBridgeGlobalType, withThemeBridge } from "./addons/ThemeBridge";

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
          "Introduction",
          "Components",
          "Frontstage",
          "Widget",
          "Hooks",
          "PreviewFeatures",
          "Deprecated",
        ],
      },
    },
  },
  globalTypes: {
    iModel: demoIModelGlobalType,
    resizer: resizerGlobalType,
    themeBridge: themeBridgeGlobalType,
  },
  decorators: [withDemoIModel, withThemeBridge],
};

export default preview;
