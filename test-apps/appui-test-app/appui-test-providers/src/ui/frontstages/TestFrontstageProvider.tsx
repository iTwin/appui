/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import {
  ConfigurableCreateInfo,
  ContentControl,
  ContentGroup,
} from "@itwin/appui-react";
import { StandardContentLayouts } from "@itwin/appui-abstract";

class CustomContentControl extends ContentControl {
  constructor(info: ConfigurableCreateInfo, options: any) {
    super(info, options);

    this.reactNode = (
      <h1
        style={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Custom content!
      </h1>
    );
  }
}

/** Used in e2e tests to test different configurations. */
export const testFrontstageProvider = (() => {
  {
    const id = "appui-test-providers:TestFrontstage";
    const contentGroup = new ContentGroup({
      id: "test-group",
      layout: StandardContentLayouts.singleView,
      contents: [{ id: "custom-content", classId: CustomContentControl }],
    });

    const urlParams = new URLSearchParams(window.location.search);
    const size = urlParams.get("size");
    const defaultState = urlParams.get("defaultState");
    const resizable = urlParams.get("resizable");
    return {
      id,
      version: Math.random(),
      contentGroup,
      leftPanel: {
        sizeSpec: size ? Number(size) : undefined,
        defaultState: defaultState ? Number(defaultState) : undefined,
        resizable: resizable ? Boolean(Number(resizable)) : undefined,
        sections: {
          start: [
            {
              id: "widget-1",
              label: "Widget 1",
              content: (
                <>
                  Frontstage provided widget: <b>widget-1</b>
                </>
              ),
            },
          ],
        },
      },
    };
  }
})();
