/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import * as React from "react";
import { ExpansionToggle } from "../../core-react.js";
import TestUtils, { classesFromElement } from "../TestUtils.js";

describe("<ExpansionToggle />", () => {
  let theUserTo: ReturnType<typeof userEvent.setup>;
  beforeEach(async () => {
    theUserTo = userEvent.setup();
    await TestUtils.initializeUiCore();
  });

  afterEach(() => {
    TestUtils.terminateUiCore();
  });

  it("renders collapsed correctly", () => {
    render(<ExpansionToggle />);

    expect(classesFromElement(screen.getByRole("button"))).to.include(
      "core-tree-expansionToggle"
    );
    expect(screen.getByLabelText("tree.expand")).to.exist;
  });

  it("should render expanded", () => {
    render(<ExpansionToggle isExpanded />);

    expect(classesFromElement(screen.getByRole("button"))).to.include(
      "is-expanded"
    );
    screen.getByLabelText("tree.collapse");
  });

  it("should handle click events", async () => {
    const handler = vi.fn();
    render(<ExpansionToggle onClick={handler} />);

    await theUserTo.click(screen.getByRole("button"));
    expect(handler).toHaveBeenCalledOnce();
  });
});
