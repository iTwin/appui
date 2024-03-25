/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { expect } from "chai";
import * as React from "react";
import * as sinon from "sinon";
import { Provider } from "react-redux";
import { IModelApp, NoRenderApp } from "@itwin/core-frontend";
import { render, screen } from "@testing-library/react";
import { StatusBar, ViewAttributesStatusField } from "../../appui-react";
import TestUtils, { userEvent } from "../TestUtils";

describe(`ViewAttributes`, () => {
  let theUserTo: ReturnType<typeof userEvent.setup>;
  beforeEach(() => {
    theUserTo = userEvent.setup();
  });

  before(async () => {
    await TestUtils.initializeUiFramework();
    await NoRenderApp.startup();
  });

  after(async () => {
    await IModelApp.shutdown();
    TestUtils.terminateUiFramework();
  });

  it("should open/close on click", async () => {
    render(
      <Provider store={TestUtils.store}>
        <StatusBar>
          <ViewAttributesStatusField />
        </StatusBar>
      </Provider>
    );

    await theUserTo.click(screen.getByRole("button"));

    expect(
      screen.getByText("listTools.viewAttributes", { selector: ".nz-title" })
    ).to.exist;

    await theUserTo.click(screen.getAllByRole("button")[0]);

    expect(screen.queryByText("listTools.viewAttributes")).to.be.null;
  });

  it("should process Checkbox clicks", async () => {
    render(
      <Provider store={TestUtils.store}>
        <StatusBar>
          <ViewAttributesStatusField />
        </StatusBar>
      </Provider>
    );

    await theUserTo.click(screen.getByRole("button"));
    expect(
      screen.getByText("listTools.acs").previousElementSibling
    ).to.have.property("checked", false);

    await theUserTo.click(screen.getByText("listTools.acs"));
    expect(
      screen.getByText("listTools.acs").previousElementSibling
    ).to.have.property("checked", true);

    const spy = vi.spyOn(IModelApp.tools, "run");
    await theUserTo.click(screen.getByText("listTools.camera"));
    expect(
      screen.getByText("listTools.camera").previousElementSibling
    ).to.have.property("checked", true);
    expect(spy).toHaveBeenCalledWith("View.ToggleCamera", sinon.match.any);

    await theUserTo.click(screen.getAllByRole("button")[0]);
  });
});
