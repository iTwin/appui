/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { SelectableContent } from "../../components-react/selectable-content/SelectableContent.js";

describe("<SelectableContent />", () => {
  it("lists all given content components in select box", async () => {
    const { getByText, queryAllByText, getByRole } = render(
      <div data-testid="selectable-content">
        <SelectableContent defaultSelectedContentId={""}>
          {[
            { id: "a", label: "A", render: () => <div /> },
            { id: "b", label: "B", render: () => <div /> },
            { id: "c", label: "C", render: () => <div /> },
          ]}
        </SelectableContent>
      </div>
    );

    const select = getByRole("combobox");
    fireEvent.click(select);

    expect(queryAllByText("A")).to.have.length(2);
    getByText("B");
    getByText("C");
  });

  it("renders with default selected content", () => {
    const { getByTestId } = render(
      <SelectableContent defaultSelectedContentId={"b"}>
        {[
          { id: "a", label: "A", render: () => <div data-testid="a" /> },
          { id: "b", label: "B", render: () => <div data-testid="b" /> },
          { id: "c", label: "C", render: () => <div data-testid="c" /> },
        ]}
      </SelectableContent>
    );
    getByTestId("b");
  });

  it("renders the first content in children list if `defaultSelectedContentId` doesn't match provided content definitions", () => {
    const { getByTestId } = render(
      <SelectableContent defaultSelectedContentId={"b"}>
        {[{ id: "a", label: "A", render: () => <div data-testid="a" /> }]}
      </SelectableContent>
    );
    getByTestId("a");
  });

  it("renders without content when provided an empty children list", () => {
    const { container } = render(
      <SelectableContent defaultSelectedContentId={""}>{[]}</SelectableContent>
    );
    expect(
      container.getElementsByClassName(
        "components-selectable-content-wrapper"
      )[0].innerHTML
    ).to.be.empty;
  });

  it("changes displayed content based on selected item in select box", async () => {
    const { getByText, getByRole, queryByText } = render(
      <div data-testid="selectable-content">
        <SelectableContent defaultSelectedContentId={"a"}>
          {[
            { id: "a", label: "A", render: () => <div data-testid="a" /> },
            { id: "b", label: "B", render: () => <div data-testid="b" /> },
            { id: "c", label: "C", render: () => <div data-testid="c" /> },
          ]}
        </SelectableContent>
      </div>
    );
    getByText("A");

    const select = getByRole("combobox");
    fireEvent.click(select);

    fireEvent.click(getByText("B"));

    expect(queryByText("A")).toEqual(null);
    getByText("B");
  });
});
