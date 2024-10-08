/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { render, waitFor } from "@testing-library/react";
import { DelayedSpinner } from "../../components-react/common/DelayedSpinner.js";

describe("<DelayedSpinner />", () => {
  it("renders spinner without delay", () => {
    const component = render(<DelayedSpinner delay={0} />);
    component.getByTestId("components-delayed-spinner");
  });

  it("renders spinner with delay", async () => {
    const component = render(<DelayedSpinner delay={100} />);
    expect(component.queryByTestId("components-delayed-spinner")).toEqual(null);

    await waitFor(() => component.getByTestId("components-delayed-spinner"));
  });

  it("renders spinner with specified size", () => {
    const component = render(<DelayedSpinner delay={0} size="small" />);
    const spinner = component.getByTestId("components-delayed-spinner");
    expect(spinner.getAttribute("data-iui-size")).toEqual("small");
  });
});
