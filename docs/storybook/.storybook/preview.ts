/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { Preview } from "@storybook/react";
import { withDemoIModel, demoIModelGlobalType } from "./addons/DemoIModel";

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
  },
  decorators: [withDemoIModel],
};

export default preview;
