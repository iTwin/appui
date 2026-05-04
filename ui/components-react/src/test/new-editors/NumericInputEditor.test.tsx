/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { render } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import * as React from "react";
import { describe, expect, it, vi } from "vitest";
import { NumericInputEditor } from "../../components-react/new-editors/interop/old-editors/NumericInput.js";
import type { WithConstraints } from "../../components-react/new-editors/ConstraintUtils.js";
import type { OldEditorMetadata } from "../../components-react/new-editors/interop/Metadata.js";

function createMetadata(constraints?: {
  minimumValue?: number;
  maximumValue?: number;
}): WithConstraints<OldEditorMetadata> {
  return {
    type: "number",
    typename: "number",
    preferredEditor: "NumericInput",
    constraints,
  };
}

describe("NumericInputEditor", () => {
  it("renders input with value", () => {
    const { getByDisplayValue } = render(
      <NumericInputEditor
        metadata={createMetadata()}
        value={{ rawValue: 42, displayValue: "42" }}
        onChange={() => {}}
      />
    );

    getByDisplayValue("42");
  });

  it("calls onChange on input change", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const { getByRole } = render(
      <NumericInputEditor
        metadata={createMetadata()}
        value={undefined}
        onChange={onChange}
      />
    );

    await user.type(getByRole("spinbutton"), "25");

    expect(onChange).toHaveBeenLastCalledWith(
      expect.objectContaining({ rawValue: 25 })
    );
  });

  it("sets min and max attributes from constraints", () => {
    const { getByRole } = render(
      <NumericInputEditor
        metadata={createMetadata({ minimumValue: 0, maximumValue: 100 })}
        value={{ rawValue: 50, displayValue: "50" }}
        onChange={() => {}}
      />
    );

    const input = getByRole("spinbutton");
    expect(input).toHaveProperty("min", "0");
    expect(input).toHaveProperty("max", "100");
  });

  it("passes value unchanged when within constraints", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const { getByRole } = render(
      <NumericInputEditor
        metadata={createMetadata({ minimumValue: 0, maximumValue: 100 })}
        value={undefined}
        onChange={onChange}
      />
    );

    await user.type(getByRole("spinbutton"), "50");

    expect(onChange).toHaveBeenLastCalledWith(
      expect.objectContaining({ rawValue: 50 })
    );
  });

  it("passes value unchanged when no constraints", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const { getByRole } = render(
      <NumericInputEditor
        metadata={createMetadata()}
        value={undefined}
        onChange={onChange}
      />
    );

    await user.type(getByRole("spinbutton"), "999");

    expect(onChange).toHaveBeenLastCalledWith(
      expect.objectContaining({ rawValue: 999 })
    );
  });
});
