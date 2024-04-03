/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { render } from "@testing-library/react";
import { HighlightedText } from "../../components-react/common/HighlightedText";

describe("<HighlightedText />", () => {
  it("renders string with highlights", () => {
    const { container } = render(
      <HighlightedText text="abcBd" searchText="b" />
    );
    const matchedNodes = container.querySelectorAll("mark");
    expect(matchedNodes.length).toEqual(2);
  });

  it("renders string with case-sensitive highlights", () => {
    const { container } = render(
      <HighlightedText text="abcBd" searchText="b" caseSensitive={true} />
    );
    const matchedNodes = container.querySelectorAll("mark");
    expect(matchedNodes.length).toEqual(1);
  });

  it("renders string with active highlights", () => {
    const { container } = render(
      <HighlightedText text="abcBd" searchText="b" activeMatchIndex={1} />
    );
    const matchedNodes = container.querySelectorAll("mark");
    expect(matchedNodes.length).toEqual(2);
    expect(
      matchedNodes[1].classList.contains("components-activehighlight")
    ).toEqual(true);
  });
});
