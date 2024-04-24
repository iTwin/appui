/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render, screen } from "@testing-library/react";
import * as React from "react";
import { LoadingSpinner } from "../../core-react";
import { classesFromElement } from "../TestUtils";

/* eslint-disable deprecation/deprecation */

describe("<LoadingSpinner />", () => {
  it("renders with message correctly", () => {
    render(<LoadingSpinner message="test" />);

    expect(classesFromElement(screen.getByText("test"))).to.include(
      "ls-message-bottom"
    );
  });

  it("renders with message and position correctly", () => {
    render(<LoadingSpinner message="test" messageOnTop={true} />);

    expect(classesFromElement(screen.getByText("test"))).to.include(
      "ls-message-top"
    );
  });
});
