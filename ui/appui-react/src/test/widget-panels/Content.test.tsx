/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import * as sinon from "sinon";
import { render } from "@testing-library/react";
import {
  createLayoutStore,
  createNineZoneState,
  NineZoneProvider,
  WidgetIdContext,
} from "@itwin/appui-layout-react";
import { Rectangle } from "@itwin/core-react";
import {
  FrontstageDef,
  UiFramework,
  WidgetContent,
  WidgetDef,
} from "../../appui-react";
import TestUtils, { addPanelWidget, addTab } from "../TestUtils";

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
    sinon.stub(frontstage, "findWidgetDef").returns(widget);
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
    sinon.stub(frontstage, "findWidgetDef").returns(undefined);
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
