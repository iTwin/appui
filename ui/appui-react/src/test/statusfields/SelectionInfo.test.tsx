/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { expect } from "chai";
import * as React from "react";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import { SelectionInfoField, SessionStateActionId, StatusBar, UiFramework } from "../../appui-react";
import TestUtils from "../TestUtils";

describe(`SelectionInfoField`, () => {
  before(async () => {
    await TestUtils.initializeUiFramework();
  });

  after(() => {
    TestUtils.terminateUiFramework();
  });

  it("SelectionInfoField should render with 0", () => {
    UiFramework.frameworkState!.sessionState.numItemsSelected = 0;
    const component = render(<Provider store={TestUtils.store}>
      <StatusBar><SelectionInfoField /></StatusBar>
    </Provider>);
    expect(component).not.to.be.undefined;
    const foundText = component.getAllByText("0");
    expect(foundText).not.to.be.undefined;
  });

  it("SelectionInfoField should render with 1", () => {
    UiFramework.frameworkState!.sessionState.numItemsSelected = 1;
    const component = render(<Provider store={TestUtils.store}>
      <StatusBar><SelectionInfoField /></StatusBar>
    </Provider>);
    expect(component).not.to.be.undefined;
    const foundText = component.getAllByText("1");
    expect(foundText).not.to.be.undefined;
  });

  it("SelectionInfoField should update after Redux action", () => {
    const component = render(<Provider store={TestUtils.store}>
      <StatusBar><SelectionInfoField /></StatusBar>
    </Provider>);
    expect(component).not.to.be.undefined;
    UiFramework.dispatchActionToStore(SessionStateActionId.SetNumItemsSelected, 99);
    const foundText = component.getAllByText("99");
    expect(foundText).not.to.be.undefined;
  });
});
