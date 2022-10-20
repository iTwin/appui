/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/* eslint-disable deprecation/deprecation */
import * as React from "react";
import { expect } from "chai";
import produce from "immer";
import * as sinon from "sinon";
import { FrontstageManager, PanelSectionDef, setPanelSize, StagePanelDef, StagePanelState, toPanelSide, Widget, WidgetDef } from "../../appui-react";
import TestUtils from "../TestUtils";
import { StagePanelLocation, StagePanelSection } from "@itwin/appui-abstract";
import { createNineZoneState } from "@itwin/appui-layout-react";
import { FrontstageDef } from "../../appui-react/frontstage/FrontstageDef";

describe("StagePanelDef", () => {

  before(async () => {
    await TestUtils.initializeUiFramework();
  });

  after(() => {
    TestUtils.terminateUiFramework();
  });

  it("Defaults, widgetDefs & widgetCount", () => {
    const panelDef = new StagePanelDef();
    panelDef.addWidgetDef(new WidgetDef({
      classId: "Test",
    }));

    expect(panelDef.applicationData).to.be.undefined;
    expect(panelDef.widgetDefs).to.have.lengthOf(1);
    expect(panelDef.widgetCount).to.eq(1);
    expect(panelDef.getSingleWidgetDef()).to.not.be.undefined;
  });

  it("applicationData", () => {
    const panelDef = new StagePanelDef();
    panelDef.panelState = StagePanelState.Open;
    panelDef.initializeFromProps({ resizable: false, applicationData: "AppData" });
    expect(panelDef.applicationData).to.eq("AppData");
  });

  it("should emit onPanelStateChangedEvent", () => {
    const spy = sinon.spy();
    FrontstageManager.onPanelStateChangedEvent.addListener(spy);
    const panelDef = new StagePanelDef();
    panelDef.panelState = StagePanelState.Minimized;
    expect(spy).to.be.calledOnceWithExactly(sinon.match({ panelDef, panelState: StagePanelState.Minimized }));
  });

  it("should default to Open state", () => {
    const panelDef = new StagePanelDef();
    expect(panelDef.panelState).to.eq(StagePanelState.Open);
  });

  it("should initialize pinned", () => {
    const panelDef = new StagePanelDef();
    panelDef.initializeFromProps({ resizable: false, pinned: false });
    expect(panelDef.pinned).to.false;
  });

  it("should emit onPanelSizeChangedEvent", () => {
    const spy = sinon.spy();
    FrontstageManager.onPanelSizeChangedEvent.addListener(spy);
    const panelDef = new StagePanelDef();
    panelDef.size = 200;
    expect(spy).to.be.calledOnceWithExactly(sinon.match({ panelDef, size: 200 }));
  });

  it("should respect min/max size", () => {
    const frontstageDef = new FrontstageDef();
    const nineZoneState = createNineZoneState();
    frontstageDef.nineZoneState = nineZoneState;
    sinon.stub(FrontstageManager, "activeFrontstageDef").get(() => frontstageDef);
    const panelDef = new StagePanelDef();
    panelDef.size = 150;
    panelDef.size.should.eq(200);
  });

  it("should not invoke onPanelSizeChangedEvent", () => {
    const frontstageDef = new FrontstageDef();
    const nineZoneState = createNineZoneState();
    frontstageDef.nineZoneState = nineZoneState;
    sinon.stub(FrontstageManager, "activeFrontstageDef").get(() => frontstageDef);
    const panelDef = new StagePanelDef();
    panelDef.size = 200;
    panelDef.size.should.eq(200);

    const spy = sinon.spy(FrontstageManager.onPanelSizeChangedEvent, "emit");
    panelDef.size = 150;
    panelDef.size.should.eq(200);
    sinon.assert.notCalled(spy);
  });

  it("should collapse panel when panelState is Minimized", () => {
    const frontstageDef = new FrontstageDef();
    const nineZoneState = createNineZoneState();
    frontstageDef.nineZoneState = nineZoneState;
    sinon.stub(FrontstageManager, "activeFrontstageDef").get(() => frontstageDef);
    const panelDef = new StagePanelDef();
    sinon.stub(panelDef, "location").get(() => StagePanelLocation.Right);
    panelDef.panelState = StagePanelState.Minimized;

    frontstageDef.nineZoneState.panels.right.collapsed.should.true;
  });

  it("should collapse panel when panelState is Off", () => {
    const frontstageDef = new FrontstageDef();
    const nineZoneState = createNineZoneState();
    frontstageDef.nineZoneState = nineZoneState;
    sinon.stub(FrontstageManager, "activeFrontstageDef").get(() => frontstageDef);
    const panelDef = new StagePanelDef();
    sinon.stub(panelDef, "location").get(() => StagePanelLocation.Right);
    panelDef.panelState = StagePanelState.Off;

    frontstageDef.nineZoneState.panels.right.collapsed.should.true;
  });

  it("should expand panel when panelState is Open", () => {
    const frontstageDef = new FrontstageDef();
    const nineZoneState = produce(createNineZoneState(), (draft) => {
      draft.panels.right.collapsed = true;
    });
    frontstageDef.nineZoneState = nineZoneState;
    sinon.stub(FrontstageManager, "activeFrontstageDef").get(() => frontstageDef);
    const panelDef = new StagePanelDef();
    panelDef.initializeFromProps({
      resizable: true,
      defaultState: StagePanelState.Minimized,
    });
    sinon.stub(panelDef, "location").get(() => StagePanelLocation.Right);
    panelDef.panelState = StagePanelState.Open;

    frontstageDef.nineZoneState.panels.right.collapsed.should.false;
  });

  it("should returns panel zone widgets", () => {
    const panelDef = new StagePanelDef();
    panelDef.initializeFromProps({
      sections: {
        start: {
          widgets: [
            <Widget key={0} id="s1" />,
          ],
        },
        end: {
          widgets: [
            <Widget key={0} id="e1" />,
            <Widget key={1} id="e2" />,
          ],
        },
      },
    });
    panelDef.widgetDefs.map((w) => w.id).should.eql(["s1", "e1", "e2"]);
  });
});

describe("PanelSectionDef", () => {
  it("should initialize stable widgets", () => {
    const sut = new PanelSectionDef();
    sut.initializeFromProps({
      widgets: [<Widget key={0} />],
    }, StagePanelLocation.Left, StagePanelSection.Start);
    expect(sut.widgetCount).to.eq(1);
    expect(sut.widgetDefs[0].id).to.eq("uifw-ps-Left-0-0");
  });
});

describe("toPanelSide", () => {
  it("should return 'left'", () => {
    toPanelSide(StagePanelLocation.Left).should.eq("left");
  });

  it("should return 'right'", () => {
    toPanelSide(StagePanelLocation.Right).should.eq("right");
  });

  it("should return 'bottom'", () => {
    toPanelSide(StagePanelLocation.Bottom).should.eq("bottom");
  });

  it("should return 'top'", () => {
    toPanelSide(StagePanelLocation.Top).should.eq("top");
  });
});

describe("setPanelSize", () => {
  it("should reset size", () => {
    let nineZone = createNineZoneState();
    nineZone = produce(nineZone, (draft) => {
      draft.panels.left.size = 200;
    });
    const sut = setPanelSize(nineZone, "left", undefined);
    (sut.panels.left.size === undefined).should.true;
  });
});
