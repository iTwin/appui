/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render } from "@testing-library/react";
import * as React from "react";
import { withContextStyle } from "../../../../components-react/properties/renderers/value/WithContextStyle.js";
import { selectorMatches, styleMatch } from "../../../TestUtils.js";

describe("withContextStyle", () => {
  it("returns given node when context is not provided", () => {
    const reactNode: React.ReactNode = <>test</>;
    const result = withContextStyle(reactNode, undefined);
    expect(result).toEqual(reactNode);
  });

  it("returns given node when context.style is not set", () => {
    const reactNode: React.ReactNode = <>test</>;
    const result = withContextStyle(reactNode, { style: undefined });
    expect(result).toEqual(reactNode);
  });

  it("returns proper node when context.style is set", () => {
    const reactNode: React.ReactNode = <>test</>;
    const style: React.CSSProperties = {
      fontSize: 123,
    };
    const result = withContextStyle(reactNode, { style });
    expect(result).to.not.eq(reactNode);

    const { container } = render(<>{result}</>);
    expect(container.firstElementChild)
      .to.satisfy(selectorMatches("span"))
      .satisfy(styleMatch({ fontSize: "123px" }))
      .have.property("innerHTML", "test");
  });
});
