/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render, waitFor } from "@testing-library/react";
import * as React from "react";
import { withTimeout } from "../../core-react";

describe("withTimeout", () => {
  const WithTimeoutDiv = withTimeout((props) => <div {...props} />);

  it("should start timer on mount", async () => {
    const spy = vi.fn();
    render(<WithTimeoutDiv timeout={100} onTimeout={spy} />);

    await waitFor(() => expect(spy).to.have.been.called);
  });

  it("should start timer on update", async () => {
    const spy = vi.fn();
    const { rerender } = render(
      <WithTimeoutDiv timeout={100} onTimeout={spy} />
    );

    await waitFor(() => expect(spy).to.have.been.called);

    rerender(<WithTimeoutDiv timeout={50} onTimeout={spy} />);

    await waitFor(() => expect(spy).to.have.been.calledTwice);
  });

  it("should ignore update if timer running", async () => {
    const spy = vi.fn();
    const { rerender } = render(
      <WithTimeoutDiv timeout={100} onTimeout={spy} />
    );
    rerender(<WithTimeoutDiv timeout={50} onTimeout={spy} />);

    await waitFor(() => expect(spy).to.have.been.calledOnce);
    rerender(<WithTimeoutDiv timeout={60} onTimeout={spy} />);

    await waitFor(() => expect(spy).to.have.been.calledTwice);
  });
});
