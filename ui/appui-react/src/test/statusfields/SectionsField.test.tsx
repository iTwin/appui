/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { Provider } from "react-redux";
import TestUtils, { userEvent } from "../TestUtils.js";
import { render, screen } from "@testing-library/react";
import { SectionsStatusField } from "../../appui-react.js";

describe(`SectionsField`, () => {
  let theUserTo: ReturnType<typeof userEvent.setup>;
  beforeEach(() => {
    theUserTo = userEvent.setup();
  });

  it("should open/close on click", async () => {
    render(
      <Provider store={TestUtils.store}>
        <SectionsStatusField />
      </Provider>
    );

    await theUserTo.click(screen.getByTestId("sections-status-field-button"));

    expect(screen.getByText("tools.sectionTools", { selector: ".nz-title" })).to
      .exist;

    await theUserTo.click(screen.getByTestId("sections-status-field-button"));

    expect(
      screen.queryByText("tools.sectionTools", { selector: ".nz-title" })
    ).toEqual(null);
  });
});
