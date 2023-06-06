/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { expect } from "chai";
import * as React from "react";
import { Provider } from "react-redux";
import { MockRender } from "@itwin/core-frontend";
import TestUtils, { userEvent } from "../TestUtils";
import { render, screen } from "@testing-library/react";
import { SectionsStatusField } from "../../appui-react";

describe(`SectionsField`, () => {
  let theUserTo: ReturnType<typeof userEvent.setup>;
  beforeEach(() => {
    theUserTo = userEvent.setup();
  });

  before(async () => {
    await TestUtils.initializeUiFramework();
    await MockRender.App.startup();
  });

  after(async () => {
    await MockRender.App.shutdown();
    TestUtils.terminateUiFramework();
  });

  it("should open/close on click", async () => {
    render(
      <Provider store={TestUtils.store}>
        <SectionsStatusField />
      </Provider>
    );

    await theUserTo.click(
      screen.getByTitle("tools.sectionTools").firstElementChild!
    );

    expect(screen.getByText("tools.sectionTools", { selector: ".nz-title" })).to
      .exist;

    await theUserTo.click(
      screen.getByTitle("tools.sectionTools").firstElementChild!
    );

    expect(screen.queryByText("tools.sectionTools")).to.be.null;
  });
});
