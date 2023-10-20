/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import produce from "immer";
import * as sinon from "sinon";
import { createNineZoneState } from "@itwin/appui-layout-react";
import {
  FrontstageDef,
  StagePanelDef,
  StagePanelLocation,
  StagePanelState,
  toPanelSide,
  UiFramework,
  WidgetDef,
} from "../../appui-react";
import { InternalFrontstageManager } from "../../appui-react/frontstage/InternalFrontstageManager";
import TestUtils from "../TestUtils";

describe("StagePanelDef", () => {
  beforeAll(async () => {
    await TestUtils.initializeUiFramework();
  });

  afterAll(() => {
    TestUtils.terminateUiFramework();
  });

  it("Defaults, widgetDefs & widgetCount", () => {
    const w1 = WidgetDef.create({
      id: "w1",
    });

    const panelDef = new StagePanelDef();
    panelDef.addWidgetDef(w1);

    expect(panelDef.widgetDefs).to.have.lengthOf(1);
    expect(panelDef.widgetCount).to.eq(1);
    expect(panelDef.getSingleWidgetDef()).to.not.be.undefined;
  });

  it("should emit onPanelStateChangedEvent", () => {
    const spy = vi.fn();
    UiFramework.frontstages.onPanelStateChangedEvent.addListener(spy);
    const panelDef = new StagePanelDef();
    panelDef.handlePanelStateChanged(StagePanelState.Minimized);
    expect(spy).toHaveBeenCalledOnce();
    expect(spy).toHaveBeenCalledWith(
      sinon.match({ panelDef, panelState: StagePanelState.Minimized })
    );
  });

  it("should default to Open state", () => {
    const panelDef = new StagePanelDef();
    expect(panelDef.panelState).to.eq(StagePanelState.Open);
  });

  it("should initialize pinned", () => {
    vi.spyOn(
      UiFramework.frontstages,
      "activeFrontstageDef",
      "get"
    ).mockImplementation(() => undefined);
    const panelDef = StagePanelDef.create(
      { resizable: false, pinned: false },
      StagePanelLocation.Left
    );
    expect(panelDef.pinned).to.false;
  });

  it("should emit onPanelSizeChangedEvent", () => {
    const spy = vi.fn();
    InternalFrontstageManager.onPanelSizeChangedEvent.addListener(spy);
    const panelDef = new StagePanelDef();
    panelDef.handleSizeChanged(200);
    expect(spy).toHaveBeenCalledOnce();
    expect(spy).toHaveBeenCalledWith(sinon.match({ panelDef, size: 200 }));
  });

  it("should respect min/max size", () => {
    const frontstageDef = new FrontstageDef();
    const nineZoneState = createNineZoneState();
    frontstageDef.nineZoneState = nineZoneState;
    vi.spyOn(
      UiFramework.frontstages,
      "activeFrontstageDef",
      "get"
    ).mockImplementation(() => frontstageDef);
    const panelDef = new StagePanelDef();
    panelDef.size = 150;
    panelDef.size.should.eq(200);
  });

  it("should not invoke onPanelSizeChangedEvent", () => {
    const frontstageDef = new FrontstageDef();
    const nineZoneState = createNineZoneState();
    frontstageDef.nineZoneState = nineZoneState;
    vi.spyOn(
      UiFramework.frontstages,
      "activeFrontstageDef",
      "get"
    ).mockImplementation(() => frontstageDef);
    const panelDef = new StagePanelDef();
    panelDef.size = 200;
    panelDef.size.should.eq(200);

    const spy = vi.spyOn(
      InternalFrontstageManager.onPanelSizeChangedEvent,
      "emit"
    );
    panelDef.size = 150;
    panelDef.size.should.eq(200);
    expect(spy).not.toHaveBeenCalled();
  });

  it("should collapse panel when panelState is Minimized", () => {
    const frontstageDef = new FrontstageDef();
    const nineZoneState = createNineZoneState();
    frontstageDef.nineZoneState = nineZoneState;
    vi.spyOn(
      UiFramework.frontstages,
      "activeFrontstageDef",
      "get"
    ).mockImplementation(() => frontstageDef);
    const panelDef = new StagePanelDef();
    vi.spyOn(panelDef, "location", "get").mockImplementation(
      () => StagePanelLocation.Right
    );
    panelDef.panelState = StagePanelState.Minimized;

    frontstageDef.nineZoneState.panels.right.collapsed.should.true;
  });

  it("should collapse panel when panelState is Off", () => {
    const frontstageDef = new FrontstageDef();
    const nineZoneState = createNineZoneState();
    frontstageDef.nineZoneState = nineZoneState;
    vi.spyOn(
      UiFramework.frontstages,
      "activeFrontstageDef",
      "get"
    ).mockImplementation(() => frontstageDef);
    const panelDef = new StagePanelDef();
    vi.spyOn(panelDef, "location", "get").mockImplementation(
      () => StagePanelLocation.Right
    );
    panelDef.panelState = StagePanelState.Off;

    frontstageDef.nineZoneState.panels.right.collapsed.should.true;
  });

  it("should expand panel when panelState is Open", () => {
    const frontstageDef = new FrontstageDef();
    const nineZoneState = produce(createNineZoneState(), (draft) => {
      draft.panels.right.collapsed = true;
    });
    frontstageDef.nineZoneState = nineZoneState;
    vi.spyOn(
      UiFramework.frontstages,
      "activeFrontstageDef",
      "get"
    ).mockImplementation(() => frontstageDef);
    const panelDef = StagePanelDef.create(
      {
        resizable: true,
        defaultState: StagePanelState.Minimized,
      },
      StagePanelLocation.Right
    );
    panelDef.panelState = StagePanelState.Open;

    frontstageDef.nineZoneState.panels.right.collapsed.should.false;
  });

  it("should returns panel zone widgets", () => {
    const panelDef = StagePanelDef.create(
      {
        sections: {
          start: [{ id: "s1" }],
          end: [{ id: "e1" }, { id: "e2" }],
        },
      },
      StagePanelLocation.Left
    );
    panelDef.widgetDefs.map((w) => w.id).should.eql(["s1", "e1", "e2"]);
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
