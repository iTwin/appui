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
    const { container } = render(<DelayedSpinner delay={0} />);
    const spinnerNode = container.querySelector(".iui-large");
    expect(spinnerNode).to.not.be.null;
  });

  it("renders spinner with delay", async () => {
    const { container } = render(<DelayedSpinner delay={100} />);
    expect(container.children.length).to.be.eq(0);
    expect(container.querySelector(".iui-large")).to.be.null;

    clock.tick(100);

    await waitFor(() => expect(container.children.length).to.be.eq(1));
    expect(container.querySelector(".iui-large")).to.not.be.null;
  });

  it("renders spinner with specified size", () => {
    const { container } = render(<DelayedSpinner delay={0} size="small" />);
    const spinnerNode = container.querySelector(".iui-small");
    expect(spinnerNode).to.not.be.null;
  });
});
