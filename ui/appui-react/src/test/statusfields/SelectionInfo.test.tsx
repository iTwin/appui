/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { expect } from "chai";
import * as React from "react";
import { Provider } from "react-redux";
import * as sinon from "sinon";
import type { IModelConnection } from "@itwin/core-frontend";
import { MockRender, SelectionSet, SelectionSetEventType } from "@itwin/core-frontend";
import { render, waitFor } from "@testing-library/react";
import { SelectionInfoField, StatusBar, UiFramework } from "../../appui-react";
import TestUtils, { createBlankConnection } from "../TestUtils";

/* eslint-disable deprecation/deprecation */

describe("SelectionInfoField", () => {
  let iModel: IModelConnection;

  beforeEach(async () => {
    await MockRender.App.startup();
    await TestUtils.initializeUiFramework();

    iModel = createBlankConnection();
    const selectionSet = new SelectionSet(iModel);
    sinon.stub(iModel, "selectionSet").get(() => selectionSet);
    UiFramework.setIModelConnection(iModel);
  });

  afterEach(async () => {
    TestUtils.terminateUiFramework();
    await MockRender.App.shutdown();
  });

  it("SelectionInfoField should render with 0", () => {
    const component = render(<Provider store={TestUtils.store}>
      <StatusBar><SelectionInfoField /></StatusBar>
    </Provider>);
    expect(component).not.to.be.undefined;
    const foundText = component.getAllByText("0");
    expect(foundText).not.to.be.undefined;
  });

  it("SelectionInfoField should render with 1", () => {
    sinon.stub(iModel.selectionSet, "size").get(() => 1);
    const component = render(<Provider store={TestUtils.store}>
      <StatusBar><SelectionInfoField /></StatusBar>
    </Provider>);
    expect(component).not.to.be.undefined;
    const foundText = component.getAllByText("1");
    expect(foundText).not.to.be.undefined;
  });

  it("SelectionInfoField should update after Redux action", async () => {
    const component = render(<Provider store={TestUtils.store}>
      <StatusBar><SelectionInfoField /></StatusBar>
    </Provider>);
    expect(component).not.to.be.undefined;
    sinon.stub(iModel.selectionSet, "size").get(() => 99);
    iModel.selectionSet.onChanged.raiseEvent({ set: iModel.selectionSet, added: [], type: SelectionSetEventType.Add });
    await waitFor(() => {
      const foundText = component.getAllByText("99");
      expect(foundText).not.to.be.undefined;
    });
  });
});
