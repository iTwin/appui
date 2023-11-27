/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { render } from "@testing-library/react";
import { PopoutWidget } from "../../appui-react/childwindow/PopoutWidget";
import TestUtils from "../TestUtils";
import {
  addFloatingWidget,
  addTab,
  createLayoutStore,
  createNineZoneState,
  NineZone,
} from "@itwin/appui-layout-react";

describe("PopoutWidget", () => {
  before(async () => {
    await TestUtils.initializeUiFramework();
  });

  after(() => {
    TestUtils.terminateUiFramework();
  });

  it("should render", () => {
    let state = createNineZoneState();
    state = addTab(state, "t1");
    state = addFloatingWidget(state, "w1", ["t1"]);
    const { container } = render(
      <NineZone layout={createLayoutStore(state)} dispatch={() => {}}>
        <PopoutWidget widgetContainerId="w1" />
      </NineZone>
    );
    container.firstChild!.should.matchSnapshot();
  });
});
