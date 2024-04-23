/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { ExpandableBlock } from "@itwin/itwinui-react";
import { ExpandableList } from "../../core-react";
import TestUtils from "../TestUtils";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

/* eslint-disable deprecation/deprecation */

describe("ExpandableList", () => {
  let theUserTo: ReturnType<typeof userEvent.setup>;
  beforeEach(() => {
    theUserTo = userEvent.setup();
  });

  beforeEach(async () => {
    await TestUtils.initializeUiCore();
  });

  it("renders correctly", () => {
    const { container } = render(<ExpandableList />);

    expect(container.querySelector(".uicore-expandable-blocks-list")).to.exist;
  });

  it("should support singleExpandOnly & defaultActiveBlock props", () => {
    render(
      <ExpandableList singleExpandOnly={true} defaultActiveBlock={1}>
        <ExpandableBlock title="Test0" isExpanded={true}>
          Hello0
        </ExpandableBlock>
        <ExpandableBlock title="Test1" isExpanded={true}>
          Hello1
        </ExpandableBlock>
      </ExpandableList>
    );

    expect(
      screen
        .getByRole("button", { name: "Test0" })
        .getAttribute("aria-expanded")
    ).to.equal("false");
    expect(
      screen
        .getByRole("button", { name: "Test1" })
        .getAttribute("aria-expanded")
    ).to.equal("true");

    screen.getByText("Hello1");
  });

  it("should handle block click", async () => {
    const toggleSpy = vi.fn();
    render(
      <ExpandableList>
        <ExpandableBlock title="Test" isExpanded={true} onToggle={toggleSpy}>
          <div>Hello</div>
        </ExpandableBlock>
      </ExpandableList>
    );

    await theUserTo.click(screen.getByText("Test"));
    expect(toggleSpy).toHaveBeenCalledOnce();
  });

  it("should support singleExpandOnly & singleIsCollapsible props", async () => {
    render(
      <ExpandableList
        singleExpandOnly={true}
        singleIsCollapsible={true}
        defaultActiveBlock={1}
      >
        <ExpandableBlock title="Test0" isExpanded={true}>
          Hello0
        </ExpandableBlock>
        <ExpandableBlock title="Test1" isExpanded={true}>
          Hello1
        </ExpandableBlock>
      </ExpandableList>
    );

    expect(
      screen
        .getByRole("button", { name: "Test0" })
        .getAttribute("aria-expanded")
    ).to.equal("false");
    expect(
      screen
        .getByRole("button", { name: "Test1" })
        .getAttribute("aria-expanded")
    ).to.equal("true");

    await theUserTo.click(screen.getByText("Test0"));

    expect(
      screen
        .getByRole("button", { name: "Test0" })
        .getAttribute("aria-expanded")
    ).to.equal("true");
    expect(
      screen
        .getByRole("button", { name: "Test1" })
        .getAttribute("aria-expanded")
    ).to.equal("false");

    await theUserTo.click(screen.getByText("Test0"));

    expect(
      screen
        .getByRole("button", { name: "Test0" })
        .getAttribute("aria-expanded")
    ).to.equal("false");
    expect(
      screen
        .getByRole("button", { name: "Test1" })
        .getAttribute("aria-expanded")
    ).to.equal("false");
  });

  it("should support changing defaultActiveBlock in update", () => {
    const { rerender } = render(
      <ExpandableList
        singleExpandOnly={true}
        singleIsCollapsible={true}
        defaultActiveBlock={1}
      >
        <ExpandableBlock title="Test0" isExpanded={true}>
          Hello0
        </ExpandableBlock>
        <ExpandableBlock title="Test1" isExpanded={true}>
          Hello1
        </ExpandableBlock>
      </ExpandableList>
    );

    expect(
      screen
        .getByRole("button", { name: "Test1" })
        .getAttribute("aria-expanded")
    ).to.equal("true");

    rerender(
      <ExpandableList
        singleExpandOnly={true}
        singleIsCollapsible={true}
        defaultActiveBlock={0}
      >
        <ExpandableBlock title="Test0" isExpanded={true}>
          Hello0
        </ExpandableBlock>
        <ExpandableBlock title="Test1" isExpanded={true}>
          Hello1
        </ExpandableBlock>
      </ExpandableList>
    );

    expect(
      screen
        .getByRole("button", { name: "Test0" })
        .getAttribute("aria-expanded")
    ).to.equal("true");
    expect(
      screen
        .getByRole("button", { name: "Test1" })
        .getAttribute("aria-expanded")
    ).to.equal("false");
  });
});
