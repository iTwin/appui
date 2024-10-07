/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { ResultSelector } from "../../components-react/filtering/ResultSelector.js";
import { render, screen } from "@testing-library/react";
import { userEvent } from "../TestUtils.js";

describe("ResultSelector", () => {
  let theUserTo: ReturnType<typeof userEvent.setup>;
  beforeEach(() => {
    theUserTo = userEvent.setup();
  });

  it("content is '0 of 0' and buttons are disabled when result count is 0", () => {
    render(<ResultSelector onSelectedChanged={() => {}} resultCount={0} />);
    const previousButton = screen.getByTestId("previous-button");
    expect(previousButton.outerHTML).includes("disabled");
    const nextButton = screen.getByTestId("next-button");
    expect(nextButton.outerHTML).includes("disabled");

    expect(screen.getByRole("presentation"))
      .that.have.property("innerHTML")
      .that.satisfy((innerHTML: string) =>
        innerHTML.match(/0.*general\.of.*0/gm)
      );
  });

  it("content is '1 of X' and buttons are not disabled when result count is higher than 0", () => {
    render(<ResultSelector onSelectedChanged={() => {}} resultCount={10} />);
    const previousButton = screen.getByTestId("previous-button");
    expect(previousButton.outerHTML).not.includes("disabled");
    const nextButton = screen.getByTestId("next-button");
    expect(nextButton.outerHTML).not.includes("disabled");

    expect(screen.getByRole("presentation"))
      .that.have.property("innerHTML")
      .that.satisfy((innerHTML: string) =>
        innerHTML.match(/1.*general\.of.*10/gm)
      );
  });

  it("calls onSelectedChanged after '<' or '>' button is clicked", async () => {
    let callCount = 0;

    render(
      <ResultSelector onSelectedChanged={() => callCount++} resultCount={10} />
    );

    const [prev, next] = screen.getAllByRole("button");

    await theUserTo.click(next);
    await theUserTo.click(prev);

    expect(callCount).toEqual(3); // 2 clicks and on in the start
  });

  it("nothing happens when trying to increase current selection to more than result count or less than 1", async () => {
    let callCount = 0;

    render(
      <ResultSelector onSelectedChanged={() => callCount++} resultCount={1} />
    );

    const [prev, next] = screen.getAllByRole("button");

    await theUserTo.click(prev);
    await theUserTo.click(next);

    expect(callCount).toEqual(1); // 1 in the start, not from clicking
  });

  it("current selection gets submitted after pressing 'Enter' key while in edit mode", async () => {
    render(<ResultSelector onSelectedChanged={() => {}} resultCount={2} />);

    await theUserTo.click(screen.getByRole("presentation"));

    await theUserTo.type(screen.getByRole("spinbutton"), "[Backspace]2", {
      skipAutoClose: true,
    });
    expect(screen.getByRole("spinbutton")).to.have.property("value", "2");

    await theUserTo.type(screen.getByRole("spinbutton"), "[Enter]");
    expect(screen.queryByRole("spinbutton")).toEqual(null);
  });

  it("current selection gets submitted after clicking '<' or '>' button while in edit mode", async () => {
    render(<ResultSelector onSelectedChanged={() => {}} resultCount={1} />);

    await theUserTo.click(screen.getByRole("presentation"));

    const [prev, next] = screen.getAllByRole("button");

    await theUserTo.click(prev);
    expect(screen.queryByRole("spinbutton")).toEqual(null);

    await theUserTo.click(screen.getByRole("presentation"));
    await theUserTo.click(next);

    expect(screen.queryByRole("spinbutton")).toEqual(null);
  });

  it("current selection becomes 0 after changing result count from n to 0", () => {
    let currentSelection = -1;

    const { rerender } = render(
      <ResultSelector
        onSelectedChanged={(selection) => (currentSelection = selection)}
        resultCount={1}
      />
    );

    expect(currentSelection).toEqual(1);

    rerender(
      <ResultSelector
        onSelectedChanged={(selection) => (currentSelection = selection)}
        resultCount={0}
      />
    );
    expect(currentSelection).toEqual(0);

    rerender(
      <ResultSelector
        onSelectedChanged={(selection) => (currentSelection = selection)}
        resultCount={3}
      />
    );
    expect(currentSelection).toEqual(1);
  });

  it("onSelectedChanged does not get called after changing result count to same value", () => {
    let onSelectedTriggered = false;

    const { rerender } = render(
      <ResultSelector
        onSelectedChanged={() => (onSelectedTriggered = true)}
        resultCount={10}
      />
    );

    onSelectedTriggered = false;

    rerender(
      <ResultSelector
        onSelectedChanged={() => (onSelectedTriggered = true)}
        resultCount={10}
      />
    );
    expect(onSelectedTriggered).toEqual(false);
  });

  it("current selection value gets corrected if typed number is bigger than result count or smaller than 1", async () => {
    render(<ResultSelector onSelectedChanged={() => {}} resultCount={11} />);

    await theUserTo.click(screen.getByRole("presentation"));

    await theUserTo.type(screen.getByRole("spinbutton"), "33[Enter]");

    expect(screen.getByRole("presentation"))
      .that.have.property("innerHTML")
      .that.satisfy((innerHTML: string) =>
        innerHTML.match(/11.*general\.of.*11/gm)
      );

    await theUserTo.click(screen.getByRole("presentation"));

    await theUserTo.type(
      screen.getByRole("spinbutton"),
      "[Backspace>2/]0[Enter]"
    );

    expect(screen.getByRole("presentation"))
      .that.have.property("innerHTML")
      .that.satisfy((innerHTML: string) =>
        innerHTML.match(/1.*general\.of.*11/gm)
      );
  });
});
