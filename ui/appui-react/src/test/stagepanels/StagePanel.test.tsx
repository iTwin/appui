/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/* eslint-disable deprecation/deprecation */
import { expect } from "chai";
import { shallow } from "enzyme";
import * as React from "react";
import * as sinon from "sinon";
import * as moq from "typemoq";
import { StagePanelLocation, WidgetState } from "@itwin/appui-abstract";
import {
  ConfigurableCreateInfo, ConfigurableUiManager, CoreTools, Frontstage, FrontstageComposer, FrontstageManager, FrontstageProps,
  FrontstageProvider, StagePanel, Widget, WidgetControl, WidgetDef,
} from "../../appui-react";
import { StagePanelRuntimeProps } from "../../appui-react/stagepanels/StagePanel";
import { StagePanelDef, StagePanelState } from "../../appui-react/stagepanels/StagePanelDef";
import { UiFramework } from "../../appui-react/UiFramework";
import { UiShowHideManager } from "../../appui-react/utils/UiShowHideManager";
import TestUtils, { mount } from "../TestUtils";

/* eslint-disable react/jsx-key */

describe("StagePanel", () => {
  class TestWidget extends WidgetControl {
    constructor(info: ConfigurableCreateInfo, options: any) {
      super(info, options);

      this.reactNode = <div />;
    }
  }

  before(async () => {
    await TestUtils.initializeUiFramework();
    UiFramework.setUiVersion("1");
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

  it("should not render w/o runtime props", () => {
    shallow(<StagePanel />).should.matchSnapshot();
  });

  it("should pass down maxSize number property", () => {
    const runtimeProps = moq.Mock.ofType<StagePanelRuntimeProps>();
    const panel = new StagePanelDef();
    runtimeProps.setup((x) => x.panelDef).returns(() => panel);
    const sut = shallow<StagePanel>(<StagePanel
      runtimeProps={runtimeProps.object}
      maxSize={200}
    />);
    sut.should.matchSnapshot();
  });

  it("should update stagePanelWidgets", () => {
    const runtimeProps = moq.Mock.ofType<StagePanelRuntimeProps>();
    const panel = moq.Mock.ofType<StagePanelRuntimeProps["panel"]>();
    const panelDef = new StagePanelDef();
    const w1 = new WidgetDef({ id: "w1" });
    const w2 = new WidgetDef({ id: "w2" });
    const w3 = new WidgetDef({ id: "w3" });
    runtimeProps.setup((x) => x.panel).returns(() => panel.object);
    runtimeProps.setup((x) => x.panelDef).returns(() => panelDef);
    panel.setup((x) => x.panes).returns(() => []);
    sinon.stub(panelDef, "widgetDefs").get(() => [w1, w2, w3]);
    const sut = mount<StagePanel>(<StagePanel
      runtimeProps={runtimeProps.object}
    />);
    w2.setWidgetState(WidgetState.Hidden);
    sut.state("stagePanelWidgets").should.eql(["w1", "w3"]);
  });
});
