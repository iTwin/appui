/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { Orientation, Tabs, VerticalTabs } from "../../core-react";
import { classesFromElement } from "../TestUtils";

/* eslint-disable deprecation/deprecation */

describe("<Tabs />", () => {
  let theUserTo: ReturnType<typeof userEvent.setup>;
  beforeEach(() => {
    theUserTo = userEvent.setup();
  });
  it("labels render correctly", () => {
    render(<VerticalTabs labels={["label 1", "label 2", "label 3"]} />);
    expect(screen.getByRole("tab", { name: "label 1" })).to.exist;
    expect(screen.getByRole("tab", { name: "label 2" })).to.exist;
    expect(screen.getByRole("tab", { name: "label 3" })).to.exist;
  });

  it("activeIndex sets correctly", () => {
    render(<VerticalTabs labels={["label 1"]} activeIndex={0} />);
    expect(
      classesFromElement(screen.getByRole("tab", { name: "label 1" }))
    ).to.include("core-active");
  });

  it("green sets correctly", () => {
    render(<VerticalTabs labels={["label 1"]} green={true} />);
    expect(classesFromElement(screen.getByRole("tablist"))).to.include(
      "uicore-tabs-green"
    );
  });

  it("onActivateTab triggers correctly", async () => {
    const spyActivate = vi.fn();
    render(
      <VerticalTabs
        labels={["label 1", "label 2"]}
        onActivateTab={spyActivate}
      />
    );
    await theUserTo.click(screen.getByRole("button", { name: "label 2" }));
    expect(spyActivate).toHaveBeenCalledOnce();
  });

  it("Home key puts focus on 1st tab", async () => {
    const { getAllByRole } = render(
      <VerticalTabs
        labels={["label 1", "label 2", "label 3"]}
        activeIndex={1}
      />
    );
    const label = screen.getByText("label 1");
    await theUserTo.type(label, "{home}");
    const first = getAllByRole("button")[0];
    expect(document.activeElement).toEqual(first);
  });

  it("End key puts focus on last tab", async () => {
    const { getAllByRole } = render(
      <VerticalTabs
        labels={["label 1", "label 2", "label 3"]}
        activeIndex={1}
      />
    );
    const label = screen.getByText("label 1");
    await theUserTo.type(label, "{end}");
    const last = getAllByRole("button")[2];
    expect(document.activeElement).toEqual(last);
  });

  it("Up key in Vertical puts focus on previous tab", async () => {
    const { getAllByRole } = render(
      <VerticalTabs
        labels={["label 1", "label 2", "label 3"]}
        activeIndex={1}
      />
    );
    const label = screen.getByText("label 2");
    await theUserTo.type(label, "{arrowup}");
    const previous = getAllByRole("button")[0];
    expect(document.activeElement).toEqual(previous);
  });

  it("Down key in Vertical puts focus on next tab", async () => {
    const { getAllByRole } = render(
      <VerticalTabs
        labels={["label 1", "label 2", "label 3"]}
        activeIndex={1}
      />
    );
    const label = screen.getByText("label 2");
    await theUserTo.type(label, "{arrowdown}");
    const nextTab = getAllByRole("button")[2];
    expect(document.activeElement).toEqual(nextTab);
  });

  it("Up key in Vertical puts focus on last tab when on first", async () => {
    const { getAllByRole } = render(
      <VerticalTabs
        labels={["label 1", "label 2", "label 3"]}
        activeIndex={1}
      />
    );
    const label = screen.getByText("label 1");
    await theUserTo.type(label, "{arrowup}");
    const last = getAllByRole("button")[2];
    expect(document.activeElement).toEqual(last);
  });

  it("Down key in Vertical puts focus on first tab when on last", async () => {
    const { getAllByRole } = render(
      <VerticalTabs
        labels={["label 1", "label 2", "label 3"]}
        activeIndex={1}
      />
    );
    const label = screen.getByText("label 3");
    await theUserTo.type(label, "{arrowdown}");
    const first = getAllByRole("button")[0];
    expect(document.activeElement).toEqual(first);
  });

  it("Left/Right key in Vertical does nothing", async () => {
    const { getAllByRole } = render(
      <VerticalTabs
        labels={["label 1", "label 2", "label 3"]}
        activeIndex={1}
      />
    );
    const label = screen.getByText("label 2");
    await theUserTo.type(label, "{arrowleft}");
    const first = getAllByRole("button")[0];
    expect(document.activeElement).to.not.eq(first);
    await theUserTo.type(label, "{arrowleft}");
    const last = getAllByRole("button")[2];
    expect(document.activeElement).to.not.eq(last);
  });

  it("Enter key in activates tab", async () => {
    const spyActivate = vi.fn();
    render(
      <VerticalTabs
        labels={["label 1", "label 2", "label 3"]}
        activeIndex={1}
        onActivateTab={spyActivate}
      />
    );
    const label = screen.getByRole("button", { name: "label 2" });
    await theUserTo.type(label, "{arrowup}");
    spyActivate.mockReset();

    await theUserTo.keyboard("{enter}");
    expect(
      classesFromElement(screen.getByRole("tab", { name: "label 1" }))
    ).to.include("core-active");
    expect(spyActivate).toHaveBeenCalledOnce();
  });

  it("Space key in activates tab", async () => {
    const spyActivate = vi.fn();
    render(
      <VerticalTabs
        labels={["label 1", "label 2", "label 3"]}
        activeIndex={1}
        onActivateTab={spyActivate}
      />
    );
    const label = screen.getByRole("button", { name: "label 2" });
    await theUserTo.type(label, "{arrowup}");
    spyActivate.mockReset();

    await theUserTo.keyboard(" ");
    expect(
      classesFromElement(screen.getByRole("tab", { name: "label 1" }))
    ).to.include("core-active");
    expect(spyActivate).toHaveBeenCalledOnce();
  });

  it("Supports updating labels & orientation", async () => {
    const { container, getAllByRole, rerender } = render(
      <Tabs
        orientation={Orientation.Vertical}
        mainClassName=""
        labels={["label 1", "label 2", "label 3"]}
        activeIndex={1}
      />
    );
    container.focus();
    let tabButtons = getAllByRole("button");
    expect(tabButtons.length).toEqual(3);
    let label = screen.getByText("label 2");
    // verify they're vertical by using arrow up to change focus
    await theUserTo.type(label, "{arrowup}");
    expect(document.activeElement).toEqual(tabButtons[0]);

    rerender(
      <Tabs
        orientation={Orientation.Horizontal}
        mainClassName=""
        labels={["label 1", "label 2", "label 3", "label 4"]}
        activeIndex={1}
      />
    );
    tabButtons = getAllByRole("button");
    expect(tabButtons.length).toEqual(4);
    label = screen.getByText("label 2");
    await theUserTo.type(label, "{enter}"); // focus in the tab
    await theUserTo.type(label, "{arrowup}");
    // arrow up does not change focus because they're horizontal
    expect(document.activeElement).toEqual(tabButtons[1]);
  });

  it("Supports updating activeIndex", async () => {
    const { getByText, rerender } = render(
      <Tabs
        orientation={Orientation.Vertical}
        mainClassName=""
        labels={["label 1", "label 2", "label 3"]}
        activeIndex={0}
      />
    );

    const label = getByText("label 1");
    await theUserTo.type(label, "{home}");
    expect(document.activeElement).toEqual(
      screen.getByRole("button", { name: "label 1" })
    );

    rerender(
      <Tabs
        orientation={Orientation.Vertical}
        mainClassName=""
        labels={["label 1", "label 2", "label 3"]}
        activeIndex={1}
      />
    );
    expect(document.activeElement).toEqual(
      screen.getByRole("button", { name: "label 2" })
    );

    rerender(
      <Tabs
        orientation={Orientation.Vertical}
        mainClassName=""
        labels={["label 1", "label 2", "label 3"]}
      />
    );
    expect(document.activeElement).toEqual(
      screen.getByRole("button", { name: "label 1" })
    );

    rerender(
      <Tabs
        orientation={Orientation.Vertical}
        mainClassName=""
        labels={["label 1", "label 2", "label 3"]}
        activeIndex={2}
      />
    );
    expect(document.activeElement).toEqual(
      screen.getByRole("button", { name: "label 3" })
    );

    rerender(
      <Tabs
        orientation={Orientation.Vertical}
        mainClassName=""
        labels={["label 1", "label 2", "label 3"]}
        activeIndex={3}
      />
    );
    expect(document.activeElement).toEqual(
      screen.getByRole("button", { name: "label 1" })
    );
  });
});
