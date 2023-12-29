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
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
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
