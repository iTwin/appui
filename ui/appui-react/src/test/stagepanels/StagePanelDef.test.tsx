/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import produce from "immer";
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
import { createNineZoneState } from "../../appui-react/layout/state/NineZoneState";
import TestUtils from "../TestUtils";

describe("StagePanelDef", () => {
  beforeEach(async () => {
    await TestUtils.initializeUiFramework();
  });

  afterEach(() => {
    TestUtils.terminateUiFramework();
  });

  it("Defaults, widgetDefs & widgetCount", () => {
    const w1 = WidgetDef.create({
      id: "w1",
    });

    const panelDef = new StagePanelDef();
    panelDef.addWidgetDef(w1);

    expect(panelDef.widgetDefs).to.have.lengthOf(1);
    expect(panelDef.widgetCount).toEqual(1);
    expect(panelDef.getSingleWidgetDef()).toBeTruthy();
  });

  it("should emit onPanelStateChangedEvent", () => {
    const spy = vi.fn();
    UiFramework.frontstages.onPanelStateChangedEvent.addListener(spy);
    const panelDef = new StagePanelDef();
    panelDef.handlePanelStateChanged(StagePanelState.Minimized);
    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({
        panelDef,
        panelState: StagePanelState.Minimized,
      })
    );
  });

  it("should default to Open state", () => {
    const panelDef = new StagePanelDef();
    expect(panelDef.panelState).toEqual(StagePanelState.Open);
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
    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({ panelDef, size: 200 })
    );
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
    panelDef.sizeSpec = 150;
    expect(panelDef.sizeSpec).toEqual(200);
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
    panelDef.sizeSpec = 200;
    expect(panelDef.sizeSpec).toEqual(200);

    const spy = vi.spyOn(
      InternalFrontstageManager.onPanelSizeChangedEvent,
      "emit"
    );
    panelDef.sizeSpec = 150;
    expect(panelDef.sizeSpec).toEqual(200);
    expect(spy).not.toBeCalled();
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

    expect(frontstageDef.nineZoneState.panels.right.collapsed).toEqual(true);
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

    expect(frontstageDef.nineZoneState.panels.right.collapsed).toEqual(true);
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

    expect(frontstageDef.nineZoneState.panels.right.collapsed).toEqual(false);
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
    expect(panelDef.widgetDefs.map((w) => w.id)).toEqual(["s1", "e1", "e2"]);
  });
});

describe("toPanelSide", () => {
  it("should return 'left'", () => {
    expect(toPanelSide(StagePanelLocation.Left)).toEqual("left");
  });

  it("should return 'right'", () => {
    expect(toPanelSide(StagePanelLocation.Right)).toEqual("right");
  });

  it("should return 'bottom'", () => {
    expect(toPanelSide(StagePanelLocation.Bottom)).toEqual("bottom");
  });

  it("should return 'top'", () => {
    expect(toPanelSide(StagePanelLocation.Top)).toEqual("top");
  });
});
