/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { render } from "@testing-library/react";
import * as React from "react";
import { describe, it } from "vitest";
import { EditorRenderer } from "../../components-react.js";

describe("EditorRenderer", () => {
  it("renders status message", () => {
    const { queryByText } = render(
      <EditorRenderer
        metadata={{ type: "string" }}
        value={{ value: "test" }}
        onChange={() => {}}
        statusMessage="Test message"
      />
    );

    expect(queryByText("Test message")).not.toBeNull();
  });

  it("renders custom status message component", () => {
    const { queryByText } = render(
      <EditorRenderer
        metadata={{ type: "string" }}
        value={{ value: "test" }}
        onChange={() => {}}
        statusMessage={
          <div>
            <div>Multiline</div>
            <div>Test message</div>
          </div>
        }
      />
    );

    expect(queryByText("Multiline Test message")).toBeNull();
    expect(queryByText("Multiline")).not.toBeNull();
    expect(queryByText("Test message")).not.toBeNull();
  });
});
