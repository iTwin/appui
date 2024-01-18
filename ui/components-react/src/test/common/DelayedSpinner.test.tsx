/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { expect } from "chai";
import { render, waitFor } from "@testing-library/react";
import { DelayedSpinner } from "../../components-react/common/DelayedSpinner";
import sinon from "sinon";

describe("<DelayedSpinner />", () => {
  let clock: sinon.SinonFakeTimers;

  before(() => {
    clock = sinon.useFakeTimers(Date.now());
  });

  after(() => {
    clock.restore();
  });

  it("renders spinner without delay", () => {
    const component = render(<DelayedSpinner delay={0} />);
    component.getByTestId("components-delayed-spinner");
  });

  it("renders spinner with delay", async () => {
    const clock = sinon.useFakeTimers({ now: Date.now() });
    const delay = 100;
    const component = render(<DelayedSpinner delay={delay} />);
    expect(component.queryByTestId("components-delayed-spinner")).to.be.null;

    clock.tick(100);

    component.getByTestId("components-delayed-spinner");

    await waitFor(() => component.getByTestId("components-delayed-spinner"));
  });

  it("renders spinner with specified size", () => {
    const component = render(<DelayedSpinner delay={0} size="small" />);
    const spinner = component.getByTestId("components-delayed-spinner");
    expect(spinner.getAttribute("data-iui-size")).to.eq("small");
  });
});
