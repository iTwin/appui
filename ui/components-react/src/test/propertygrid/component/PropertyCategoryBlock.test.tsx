/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { expect } from "chai";
import * as React from "react";
import sinon from "sinon";
import { PropertyCategoryBlock } from "../../../components-react/propertygrid/component/PropertyCategoryBlock";
import { PropertyCategory } from "../../../components-react/propertygrid/PropertyDataProvider";
import { render, screen } from "@testing-library/react";
import { selectorMatches, userEvent } from "../../TestUtils";

describe("PropertyCategoryBlock", () => {
  let theUserTo: ReturnType<typeof userEvent.setup>;
  let category: PropertyCategory;

  beforeEach(() => {
    theUserTo = userEvent.setup();
    category = { name: "Group_1", label: "Group 1", expand: false };
  });

  it("renders content correctly when collapsed", () => {
    category.expand = false;

    const { container } = render(
      <PropertyCategoryBlock category={category} >
        <div className="test-content" />
      </PropertyCategoryBlock>);

    expect(container.firstElementChild)
      .satisfy(selectorMatches(".iui-expandable-block:not(.iui-expanded)"));
  });

  it("renders content correctly when expanded", () => {
    category.expand = true;

    const { container } = render (
      <PropertyCategoryBlock category={category} >
        <div>My Content</div>
      </PropertyCategoryBlock>);

    expect(screen.getByText("My Content")).to.exist;
    expect(container.firstElementChild)
      .satisfy(selectorMatches(".iui-expandable-block.iui-expanded"));
  });

  it("does not expand if header gets clicked, but callback is not provided", async () => {
    render(<PropertyCategoryBlock category={category}>
      <div>My Content</div>
    </PropertyCategoryBlock>);

    await theUserTo.click(screen.getByText("Group 1"));

    expect(screen.queryByText("My Content")).to.be.null;
    // #511: We dont provide the content, but the block is still expanded but empty
    // Probably not what we want.
    // expect(container.firstElementChild)
    //   .satisfy(selectorMatches(".iui-expandable-block:not(.iui-expanded)"));
  });

  it("expands when header gets clicked", async () => {
    const toggleSpy = sinon.spy();

    const { container } = render(<PropertyCategoryBlock category={category} onExpansionToggled={toggleSpy} />);

    await theUserTo.click(screen.getByText("Group 1"));

    expect(container.firstElementChild)
      .satisfy(selectorMatches(".iui-expandable-block.iui-expanded"));
    expect(toggleSpy).to.have.been.calledWith("Group_1");
  });

  it("expands when \"Enter\" or \"Space\" key gets pressed", async () => {
    const toggleSpy = sinon.spy();

    render(<PropertyCategoryBlock category={category} onExpansionToggled={toggleSpy} />);

    await theUserTo.keyboard("{tab} ");
    expect(toggleSpy).to.have.been.calledOnceWith("Group_1");
    toggleSpy.resetHistory();
    await theUserTo.keyboard("{Enter}");
    expect(toggleSpy).to.have.been.calledOnceWith("Group_1");
  });

  it("does not expand when wrong key gets pressed", async () => {
    const toggleSpy = sinon.spy();

    render(<PropertyCategoryBlock category={category} onExpansionToggled={toggleSpy} />);

    screen.getByText("Group 1").focus();
    await theUserTo.keyboard("a");
    expect(toggleSpy).to.not.have.been.called;
  });
});
