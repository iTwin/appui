/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import "./TestPopoutFrontstage.scss";
import * as React from "react";
import { Frontstage } from "@itwin/appui-react";
import { createTestFrontstage } from "./createTestFrontstage";
import { ProgressRadial } from "@itwin/itwinui-react";

export const createTestPopoutFrontstage = () => {
  {
    const frontstage = createTestFrontstage({
      id: "appui-test-app:TestPopout",
    });

    return {
      ...frontstage,
      leftPanel: {
        sections: {
          start: [
            {
              id: "widget-1",
              label: "Widget 1",
              canPopout: true,
              content: (
                <>
                  <div>Widget 1 content</div>
                  <div id="border-test" />
                  <ProgressRadial />
                </>
              ),
            },
          ],
        },
      },
    } satisfies Frontstage;
  }
};

(() => {
  const sheet = new CSSStyleSheet();
  // Shorthand `border` property from `adoptedStyleSheets` will not be copied to a popout widget correctly.
  sheet.replaceSync(`
    #border-test {
      --border-top-color: yellow;
      border-top: 5px solid var(--border-top-color);
      border-right: 5px solid green;
    }
  `);
  document.adoptedStyleSheets.push(sheet);
})();
