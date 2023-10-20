/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import * as React from "react";
import { Provider } from "react-redux";
import { IModelApp, NoRenderApp } from "@itwin/core-frontend";
import TestUtils, { userEvent } from "../TestUtils";
import { render, screen } from "@testing-library/react";
import { SectionsStatusField } from "../../appui-react";

describe(`SectionsField`, () => {
  let theUserTo: ReturnType<typeof userEvent.setup>;
  beforeEach(() => {
    theUserTo = userEvent.setup();
  });

  beforeAll(async () => {
    await TestUtils.initializeUiFramework();
    await NoRenderApp.startup();
  });

  afterAll(async () => {
    await IModelApp.shutdown();
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
