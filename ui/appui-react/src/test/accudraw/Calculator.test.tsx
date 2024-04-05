/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { render, screen } from "@testing-library/react";
import { Calculator } from "../../appui-react/accudraw/Calculator";
import { CalculatorEngine } from "../../appui-react/accudraw/CalculatorEngine";
import { selectorMatches, userEvent } from "../TestUtils";

describe("Calculator", () => {
  let theUserTo: ReturnType<typeof userEvent.setup>;
  beforeEach(() => {
    theUserTo = userEvent.setup();
  });

  it("should render with icon", () => {
    render(<Calculator resultIcon={<div>TestIcon</div>} />);

    expect(screen.getByText("TestIcon")).to.satisfy(
      selectorMatches(".core-iconInput-icon div")
    );
  });

  it("renders correctly", () => {
    render(<Calculator />);

    // Sorting only for cleaner error output.
    expect(
      screen
        .getAllByRole("button")
        .map((e) => e.textContent)
        .filter((e) => e !== "")
        .sort()
    ).to.include.members(
      [
        "AC",
        "C",
        "÷",
        "×",
        "−",
        "+",
        "±",
        ".",
        "=",
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
      ].sort()
    );
  });

  it("should support initialValue", () => {
    render(<Calculator engine={new CalculatorEngine()} initialValue={100} />);

    expect(screen.getByRole<HTMLInputElement>("textbox").value).toEqual("100");
  });

  it("clicking on 1 button should put it in display", async () => {
    render(<Calculator engine={new CalculatorEngine()} />);

    await theUserTo.click(screen.getByRole("button", { name: "1" }));

    expect(screen.getByRole<HTMLInputElement>("textbox").value).toEqual("1");
  });

  // TODO: vitest
  it.skip("clicking on buttons, operator and equals should give correct result", async () => {
    render(<Calculator engine={new CalculatorEngine()} />);
    await theUserTo.click(screen.getByRole("button", { name: "1" }));
    expect(screen.getByRole<HTMLInputElement>("textbox").value).toEqual("1");

    await theUserTo.click(screen.getByRole("button", { name: "0" }));
    expect(screen.getByRole<HTMLInputElement>("textbox").value).toEqual("10");

    await theUserTo.click(screen.getByRole("button", { name: "×" }));
    expect(screen.getByRole<HTMLInputElement>("textbox").value).toEqual("10");

    await theUserTo.click(screen.getByRole("button", { name: "2" }));
    expect(screen.getByRole<HTMLInputElement>("textbox").value).toEqual("2");

    await theUserTo.click(screen.getByRole("button", { name: "=" }));
    expect(screen.getByRole<HTMLInputElement>("textbox").value).toEqual("20");
  });

  it("clicking on OK button should fire onOk", async () => {
    const spy = vi.fn();
    render(<Calculator engine={new CalculatorEngine()} onOk={spy} />);

    await theUserTo.click(screen.getByRole("button", { name: "5" }));
    const okButton = screen
      .getAllByRole("button")
      .find((e) => e.matches(".uifw-calculator-ok-button"));
    expect(okButton).to.exist;
    await theUserTo.click(okButton!);

    expect(spy).toHaveBeenCalledWith(5);
  });

  it("clicking on Cancel button should fire onCancel", async () => {
    const spy = vi.fn();
    render(<Calculator engine={new CalculatorEngine()} onCancel={spy} />);
    await theUserTo.click(screen.getByRole("button", { name: "5" }));

    const cancelButton = screen
      .getAllByRole("button")
      .find((e) => e.matches(".uifw-calculator-cancel-button"));
    expect(cancelButton).to.exist;
    await theUserTo.click(cancelButton!);

    expect(spy).toHaveBeenCalled();
  });

  it("Pressing Esc should fire onCancel", async () => {
    const spy = vi.fn();
    render(<Calculator engine={new CalculatorEngine()} onCancel={spy} />);

    await theUserTo.type(screen.getByRole("textbox"), "[Escape]");

    expect(spy).toHaveBeenCalled();
  });

  it("pressing keys and multiply should give correct result", async () => {
    render(<Calculator engine={new CalculatorEngine()} />);

    await theUserTo.type(screen.getByRole("textbox"), "10*");
    expect(screen.getByDisplayValue("10")).to.exist;

    await theUserTo.type(screen.getByRole("textbox"), "2");
    expect(screen.getByDisplayValue("2")).to.exist;

    await theUserTo.type(screen.getByRole("textbox"), "=");
    expect(screen.getByDisplayValue("20")).to.exist;

    await theUserTo.type(screen.getByRole("textbox"), "a");
    expect(screen.getByDisplayValue("0")).to.exist;
  });

  it("pressing keys and subtract should give correct result", async () => {
    render(<Calculator engine={new CalculatorEngine()} />);

    await theUserTo.type(screen.getByRole("textbox"), "4-");
    expect(screen.getByDisplayValue("4")).to.exist;

    await theUserTo.type(screen.getByRole("textbox"), "3");
    expect(screen.getByDisplayValue("3")).to.exist;

    await theUserTo.type(screen.getByRole("textbox"), "=");
    expect(screen.getByDisplayValue("1")).to.exist;
  });

  it("pressing keys and divide should give correct result", async () => {
    render(<Calculator engine={new CalculatorEngine()} />);

    await theUserTo.type(screen.getByRole("textbox"), "9/");
    expect(screen.getByDisplayValue("9")).to.exist;

    await theUserTo.type(screen.getByRole("textbox"), "3");
    expect(screen.getByDisplayValue("3")).to.exist;

    await theUserTo.type(screen.getByRole("textbox"), "=");
    expect(screen.getByDisplayValue("3")).to.exist;
  });

  it("pressing keys and add should give correct result", async () => {
    render(<Calculator engine={new CalculatorEngine()} />);

    await theUserTo.type(screen.getByRole("textbox"), "876.5+");
    expect(screen.getByDisplayValue("876.5")).to.exist;

    await theUserTo.type(screen.getByRole("textbox"), "4");
    expect(screen.getByDisplayValue("4")).to.exist;

    await theUserTo.type(screen.getByRole("textbox"), "=");
    expect(screen.getByDisplayValue("880.5")).to.exist;
  });

  it("pressing keys and Enter should give correct result", async () => {
    const spy = vi.fn();
    render(<Calculator engine={new CalculatorEngine()} onOk={spy} />);

    await theUserTo.type(screen.getByRole("textbox"), "8/");
    expect(screen.getByDisplayValue("8")).to.exist;

    await theUserTo.type(screen.getByRole("textbox"), "4");
    expect(screen.getByDisplayValue("4")).to.exist;

    await theUserTo.type(screen.getByRole("textbox"), "[Enter]");
    expect(screen.getByDisplayValue("2")).to.exist;
    expect(spy).toHaveBeenCalled();
  });

  it("pressing keys and Clear should give correct result", async () => {
    render(<Calculator engine={new CalculatorEngine()} />);

    await theUserTo.type(screen.getByRole("textbox"), "8");
    expect(screen.getByDisplayValue("8")).to.exist;

    await theUserTo.type(screen.getByRole("textbox"), "c");
    expect(screen.getByDisplayValue("0")).to.exist;
  });

  it("pressing keys and Backspace should give correct result", async () => {
    render(<Calculator engine={new CalculatorEngine()} />);

    await theUserTo.type(screen.getByRole("textbox"), "76");
    expect(screen.getByDisplayValue("76")).to.exist;

    await theUserTo.type(screen.getByRole("textbox"), "[Backspace>2/]");
    expect(screen.getByDisplayValue("0")).to.exist;
  });

  it("pressing keys and Equal and Enter should give correct result", async () => {
    const spy = vi.fn();
    render(<Calculator engine={new CalculatorEngine()} onOk={spy} />);

    await theUserTo.type(screen.getByRole("textbox"), "65-");
    expect(screen.getByDisplayValue("65")).to.exist;

    await theUserTo.type(screen.getByRole("textbox"), "4");
    expect(screen.getByDisplayValue("4")).to.exist;

    await theUserTo.type(screen.getByRole("textbox"), "=");
    expect(screen.getByDisplayValue("61")).to.exist;

    await theUserTo.type(screen.getByRole("textbox"), "[Enter]");
    expect(screen.getByDisplayValue("61")).to.exist;
    expect(spy).toHaveBeenCalled();
  });

  it("pressing keys and Equal and Clear should give correct result", async () => {
    render(<Calculator engine={new CalculatorEngine()} />);

    await theUserTo.type(screen.getByRole("textbox"), "4*");
    expect(screen.getByDisplayValue("4")).to.exist;

    await theUserTo.type(screen.getByRole("textbox"), "3=");
    expect(screen.getByDisplayValue("12")).to.exist;

    await theUserTo.type(screen.getByRole("textbox"), "c");
    expect(screen.getByDisplayValue("0")).to.exist;
  });

  it("(Coverage only) - Supports empty internal ref", () => {
    const ref = React.createRef<Calculator>();

    const { unmount } = render(<Calculator ref={ref} />);
    const refCopy = ref.current;
    unmount();

    expect(refCopy?.componentDidMount()).to.not.throw;
  });
});
