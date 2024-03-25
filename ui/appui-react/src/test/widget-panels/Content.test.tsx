/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Rectangle } from "@itwin/core-react";
import { render } from "@testing-library/react";
import * as React from "react";
import * as sinon from "sinon";
import {
  FrontstageDef,
  UiFramework,
  WidgetContent,
  WidgetDef,
} from "../../appui-react";
import { createLayoutStore } from "../../appui-react/layout/base/LayoutStore";
import { NineZoneProvider } from "../../appui-react/layout/base/NineZone";
import { createNineZoneState } from "../../appui-react/layout/state/NineZoneState";
import { addPanelWidget } from "../../appui-react/layout/state/internal/PanelStateHelpers";
import { addTab } from "../../appui-react/layout/state/internal/TabStateHelpers";
import { WidgetIdContext } from "../../appui-react/layout/widget/Widget";
import TestUtils from "../TestUtils";

describe("WidgetContent", () => {
  before(async () => {
    await TestUtils.initializeUiFramework();
  });

  after(() => {
    TestUtils.terminateUiFramework();
  });

  it("should render", () => {
    let state = createNineZoneState();
    state = addTab(state, "w1");
    state = addPanelWidget(state, "left", "leftStart", ["w1"]);
    const layout = createLayoutStore(state);
    const frontstage = new FrontstageDef();
    const widget = WidgetDef.create({ id: "w1" });
    sinon
      .stub(UiFramework.frontstages, "activeFrontstageDef")
      .get(() => frontstage);
    sinon.stub(frontstage, "findWidgetDef").mockReturnValue(widget);
    sinon.stub(widget, "reactNode").get(() => <>Content</>);
    const { container } = render(
      <NineZoneProvider
        dispatch={sinon.stub()}
        layout={layout}
        measure={() => new Rectangle()}
      >
        <WidgetIdContext.Provider value="leftStart">
          <WidgetContent />
        </WidgetIdContext.Provider>
      </NineZoneProvider>
    );
    container.firstChild!.should.matchSnapshot();
  });

  it("should render w/o frontstage", () => {
    let state = createNineZoneState();
    state = addTab(state, "w1");
    state = addPanelWidget(state, "left", "leftStart", ["w1"]);
    const layout = createLayoutStore(state);
    sinon
      .stub(UiFramework.frontstages, "activeFrontstageDef")
      .get(() => undefined);
    const { container } = render(
      <NineZoneProvider
        dispatch={sinon.stub()}
        layout={layout}
        measure={() => new Rectangle()}
      >
        <WidgetIdContext.Provider value="leftStart">
          <WidgetContent />
        </WidgetIdContext.Provider>
      </NineZoneProvider>
    );
    container.firstChild!.should.matchSnapshot();
  });

  it("should render w/o widgetDef", () => {
    let state = createNineZoneState();
    state = addTab(state, "w1");
    state = addPanelWidget(state, "left", "leftStart", ["w1"]);
    const layout = createLayoutStore(state);
    const frontstage = new FrontstageDef();
    sinon
      .stub(UiFramework.frontstages, "activeFrontstageDef")
      .get(() => frontstage);
    sinon.stub(frontstage, "findWidgetDef").mockReturnValue(undefined);
    const { container } = render(
      <NineZoneProvider
        dispatch={sinon.stub()}
        layout={layout}
        measure={() => new Rectangle()}
      >
        <WidgetIdContext.Provider value="leftStart">
          <WidgetContent />
        </WidgetIdContext.Provider>
      </NineZoneProvider>
    );
    container.firstChild!.should.matchSnapshot();
  });
});
