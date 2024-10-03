/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { Provider } from "react-redux";
import { render, waitFor } from "@testing-library/react";
import {
  SelectionInfoField,
  SessionStateActionId,
  UiFramework,
} from "../../appui-react.js";
import TestUtils from "../TestUtils.js";

/* eslint-disable deprecation/deprecation */

describe("SelectionInfoField", () => {
  it("SelectionInfoField should render with 0", () => {
    UiFramework.frameworkState!.sessionState.numItemsSelected = 0;
    const component = render(
      <Provider store={TestUtils.store}>
        <SelectionInfoField />
      </Provider>
    );
    expect(component).toBeTruthy();
    const foundText = component.getAllByText("0");
    expect(foundText).toBeTruthy();
  });

  it("SelectionInfoField should render with 1", () => {
    UiFramework.frameworkState!.sessionState.numItemsSelected = 1;
    const component = render(
      <Provider store={TestUtils.store}>
        <SelectionInfoField />
      </Provider>
    );
    expect(component).toBeTruthy();
    const foundText = component.getAllByText("1");
    expect(foundText).toBeTruthy();
  });

  it("SelectionInfoField should update after Redux action", async () => {
    const component = render(
      <Provider store={TestUtils.store}>
        <SelectionInfoField />
      </Provider>
    );
    expect(component).toBeTruthy();
    UiFramework.dispatchActionToStore(
      SessionStateActionId.SetNumItemsSelected,
      99
    );
    await waitFor(() => {
      const foundText = component.getAllByText("99");
      expect(foundText).toBeTruthy();
    });
  });
});
