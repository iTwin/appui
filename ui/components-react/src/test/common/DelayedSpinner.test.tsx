/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { expect } from "chai";
import * as sinon from "sinon";
import { render } from "@testing-library/react";
import { DelayedSpinner } from "../../components-react/common/DelayedSpinner";

describe("<DelayedSpinner />", () => {
  const sandbox = sinon.createSandbox();

  afterEach(() => {
    sandbox.restore();
  });

  it("renders spinner without delay", () => {
    const component = render(<DelayedSpinner delay={0} />);
    component.getByTestId("components-delayed-spinner");
  });

  it("renders spinner with delay", () => {
    const clock = sandbox.useFakeTimers(Date.now());

    const component = render(<DelayedSpinner delay={100} />);
    expect(component.queryByTestId("components-delayed-spinner")).to.be.null;

    clock.tick(100);

    component.getByTestId("components-delayed-spinner");
  });

  it("renders spinner with specified size", () => {
    const component = render(<DelayedSpinner delay={0} size="small" />);
    const spinner = component.getByTestId("components-delayed-spinner");
    expect(spinner.getAttribute("data-iui-size")).to.eq("small");
  });
});
