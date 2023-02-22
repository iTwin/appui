/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { expect } from "chai";
import * as React from "react";
import * as moq from "typemoq";
import { DrawingViewState, IModelConnection, MockRender, SheetViewState, SpatialViewState } from "@itwin/core-frontend";
import { ViewSelector } from "../../appui-react";
import TestUtils, { userEvent } from "../TestUtils";
import { Provider } from "react-redux";
import { ToolbarItemContext } from "@itwin/components-react";
import { render, screen, waitFor } from "@testing-library/react";
import { EmptyLocalization } from "@itwin/core-common";

// cSpell:ignore Spatials

describe("ViewSelector", () => {
  let theUserTo: ReturnType<typeof userEvent.setup>;
  const viewsMock = moq.Mock.ofType(IModelConnection.Views);
  viewsMock.setup(async (m) => m.getViewList(moq.It.isAny())).returns(async () => {
    return [
      {id: "spatial1", name: "spatial1", class: SpatialViewState.classFullName},
      {id: "drawing1", name: "drawing1", class: DrawingViewState.classFullName},
      {id: "sheet1", name: "sheet1", class: SheetViewState.classFullName},
      {id: "unknown1", name: "unknown1", class: "unknown"},
    ];
  });
  const imodelMock = moq.Mock.ofType<IModelConnection>();
  imodelMock.setup((x) => x.views).returns(() => {
    return viewsMock.object;
  });
  const viewsMock2 = moq.Mock.ofType(IModelConnection.Views);
  viewsMock2.setup(async (m) => m.getViewList(moq.It.isAny())).returns(async () => {
    return [
      {id: "spatial2", name: "spatial2", class: SpatialViewState.classFullName},
    ];
  });
  const imodelMock2 = moq.Mock.ofType<IModelConnection>();
  imodelMock2.setup((x) => x.views).returns(() => {
    return viewsMock2.object;
  });
  beforeEach(()=>{
    theUserTo = userEvent.setup();
  });

  before(async () => {
    await TestUtils.initializeUiFramework();
    await MockRender.App.startup({localization: new EmptyLocalization()});
    await TestUtils.flushAsyncOperations();
  });

  after(async () => {
    await MockRender.App.shutdown();
    await TestUtils.flushAsyncOperations();
    TestUtils.terminateUiFramework();
  });

  it("should support empty props", async () => {
    render(
      <Provider store={TestUtils.store}>
        <ToolbarItemContext.Provider
          value={{
            hasOverflow: false,
            useHeight: false,
            onResize: () => { },
          }}
        >
          <ViewSelector />
        </ToolbarItemContext.Provider>
      </Provider>
    );
    await waitFor(async () => theUserTo.click(screen.getByRole("button")));

    expect(screen.getByText("viewTypes.views")).to.exist;
    expect(screen.queryByText("viewTypes.spatialViews")).to.be.null;
    expect(screen.queryByText("viewTypes.drawings")).to.be.null;
    expect(screen.queryByText("viewTypes.sheets")).to.be.null;
    expect(screen.queryByText("viewTypes.others")).to.be.null;
  });

  it("should set Show settings by ViewSelector.updateShowSettings", async () => {
    render(
      <Provider store={TestUtils.store}>
        <ToolbarItemContext.Provider
          value={{
            hasOverflow: false,
            useHeight: false,
            onResize: () => { },
          }}
        >
          <ViewSelector imodel={imodelMock.object} listenForShowUpdates={true} />
        </ToolbarItemContext.Provider>
      </Provider>
    );
    await waitFor(async () => theUserTo.click(screen.getByRole("button")));

    expect(screen.getByText("viewTypes.spatialViews")).to.exist;
    expect(screen.getByText("viewTypes.drawings")).to.exist;
    expect(screen.getByText("viewTypes.sheets")).to.exist;
    expect(screen.getByText("viewTypes.others")).to.exist;

    ViewSelector.updateShowSettings(false, false, false, false);

    await waitFor(() => expect(screen.queryByText("viewTypes.spatialViews")).to.be.null);
    expect(screen.queryByText("viewTypes.drawings")).to.be.null;
    expect(screen.queryByText("viewTypes.sheets")).to.be.null;
    expect(screen.queryByText("viewTypes.others")).to.be.null;
  });

  it("should trigger componentDidUpdate processing", async () => {
    const { rerender } = render(
      <Provider store={TestUtils.store}>
        <ToolbarItemContext.Provider
          value={{
            hasOverflow: false,
            useHeight: false,
            onResize: () => { },
          }}
        >
          <ViewSelector imodel={imodelMock.object} />
        </ToolbarItemContext.Provider>
      </Provider>
    );

    await waitFor(async () => theUserTo.click(screen.getByRole("button")));
    await theUserTo.click(screen.getByText("viewTypes.spatialViews"));

    expect(screen.getByText("spatial1")).to.exist;

    rerender(
      <Provider store={TestUtils.store}>
        <ToolbarItemContext.Provider
          value={{
            hasOverflow: false,
            useHeight: false,
            onResize: () => { },
          }}
        >
          <ViewSelector imodel={imodelMock2.object} />
        </ToolbarItemContext.Provider>
      </Provider>
    );

    await waitFor(() => expect(screen.getByText("spatial2")).to.exist);
  });
  it("should filter views based on search input",async () => {
    render(
      <Provider store={TestUtils.store}>
        <ToolbarItemContext.Provider
          value={{
            hasOverflow: false,
            useHeight: false,
            onResize: () => { },
          }}
        >
          <ViewSelector imodel={imodelMock.object} />
        </ToolbarItemContext.Provider>
      </Provider>
    );
    await waitFor(async () => theUserTo.click(screen.getByRole("button")));
    await theUserTo.type(screen.getByRole("searchbox"), "none");

    expect(screen.queryByText("viewTypes.spatialViews")).to.be.null;
    expect(screen.queryByText("viewTypes.drawings")).to.be.null;
    expect(screen.queryByText("viewTypes.sheets")).to.be.null;
    expect(screen.queryByText("viewTypes.others")).to.be.null;

  });
});
