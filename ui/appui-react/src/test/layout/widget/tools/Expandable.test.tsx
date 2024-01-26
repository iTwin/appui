/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render } from "@testing-library/react";
import { expect } from "chai";
import * as React from "react";
import { ExpandableButton } from "../../../../appui-react/layout/widget/tools/button/Expandable";
import { childStructure, selectorMatches } from "../../Utils";

describe("<ExpandableButton  />", () => {
  it("renders correctly", () => {
    const { container } = render(<ExpandableButton />);

    expect(container.firstElementChild)
      .satisfy(selectorMatches(".nz-widget-tools-button-expandable"))
      .satisfy(childStructure(".nz-triangle"));
  });
});
