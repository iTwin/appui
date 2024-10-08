/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render, waitFor } from "@testing-library/react";
import * as React from "react";
import { withTimeout } from "../../core-react.js";

describe("withTimeout", () => {
  const WithTimeoutDiv = withTimeout((props) => <div {...props} />);

  it("should start timer on mount", async () => {
    const spy = vi.fn();
    render(<WithTimeoutDiv timeout={100} onTimeout={spy} />);

    await waitFor(() => expect(spy).toHaveBeenCalled());
  });

  it("should start timer on update", async () => {
    const spy = vi.fn();
    const { rerender } = render(
      <WithTimeoutDiv timeout={100} onTimeout={spy} />
    );

    await waitFor(() => expect(spy).toHaveBeenCalled());

    rerender(<WithTimeoutDiv timeout={50} onTimeout={spy} />);

    await waitFor(() => expect(spy).toHaveBeenCalledTimes(2));
  });

  it("should ignore update if timer running", async () => {
    const spy = vi.fn();
    const { rerender } = render(
      <WithTimeoutDiv timeout={100} onTimeout={spy} />
    );
    rerender(<WithTimeoutDiv timeout={50} onTimeout={spy} />);

    await waitFor(() => expect(spy).toHaveBeenCalledOnce());
    rerender(<WithTimeoutDiv timeout={60} onTimeout={spy} />);

    await waitFor(() => expect(spy).toHaveBeenCalledTimes(2));
  });
});
