/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { StagePanelLocation } from "@itwin/appui-abstract";
import { StagePanel } from "../../appui-react";
import { StagePanelDef } from "../../appui-react/stagepanels/StagePanelDef";
import TestUtils, { mount } from "../TestUtils";

/* eslint-disable react/jsx-key */

describe("StagePanel", () => {
  before(async () => {
    await TestUtils.initializeUiFramework();
  });

  after(() => {
    TestUtils.terminateUiFramework();
  });

  it("should initialize stage panel def location", () => {
    const sut = new StagePanelDef();
    StagePanel.initializeStagePanelDef(sut, {
      resizable: true,
    }, StagePanelLocation.BottomMost);

    sut.location.should.eq(StagePanelLocation.BottomMost);
  });

  it("should add widget definitions", () => {
    const sut = new StagePanelDef();
    StagePanel.initializeStagePanelDef(sut, {
      resizable: false,
      widgets: [
        <div />,
      ],
    }, StagePanelLocation.BottomMost);
    sut.widgetDefs.length.should.eq(1);
  });

  it("should mount", () => {
    mount(<StagePanel />);
  });
});
