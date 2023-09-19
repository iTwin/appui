/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
// TODO: use https://vitejs.dev/config/server-options.html#server-fs-allow instead
import "../lib/webfont/bentley-icons-generic-webfont.css";
import { Provider } from "react-redux";
import type { Decorator } from "@storybook/react";
import { StateManager, ThemeManager } from "@itwin/appui-react";

export const AppUiDecorator: Decorator = (Story) => {
  new StateManager();
  return (
    <Provider store={StateManager.store}>
      <ThemeManager>
        <Story />
      </ThemeManager>
    </Provider>
  );
};
