/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { fireEvent, render, screen } from "@testing-library/react";
import * as React from "react";
import { describe, expect, it, vi } from "vitest";
import { StandardEditorNames } from "@itwin/appui-abstract";
import { EditorRenderer } from "../../components-react/new-editors/EditorRenderer.js";
import { EditorsRegistryProvider } from "../../components-react/new-editors/editors-registry/EditorsRegistryProvider.js";
import { NumericInputEditorSpec } from "../../components-react/new-editors/interop/old-editors/NumericInput.js";
import type { WithConstraints } from "../../components-react/new-editors/ConstraintUtils.js";
import type { OldEditorMetadata } from "../../components-react/new-editors/interop/Metadata.js";

function createMetadata(constraints?: {
  minimumValue?: number;
  maximumValue?: number;
}): WithConstraints<OldEditorMetadata> {
  return {
    type: "number",
    typename: "number",
    preferredEditor: StandardEditorNames.NumericInput,
    constraints,
  };
}

function renderNumericInput(
  metadata: WithConstraints<OldEditorMetadata>,
  value: { rawValue: number | undefined; displayValue: string },
  onChange: (...args: any[]) => void
) {
  return render(
    <EditorsRegistryProvider editors={[NumericInputEditorSpec]}>
      <EditorRenderer metadata={metadata} value={value} onChange={onChange} />
    </EditorsRegistryProvider>
  );
}

describe("NumericInputEditor", () => {
  it("renders input with value", () => {
    renderNumericInput(
      createMetadata(),
      { rawValue: 42, displayValue: "42" },
      () => {}
    );

    expect(screen.getByRole("spinbutton")).toHaveProperty("value", "42");
  });

  it("calls onChange on input change", () => {
    const onChange = vi.fn();
    renderNumericInput(
      createMetadata(),
      { rawValue: 0, displayValue: "0" },
      onChange
    );

    fireEvent.change(screen.getByRole("spinbutton"), {
      target: { value: "25" },
    });

    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ rawValue: 25 })
    );
  });

  it("sets min and max attributes from constraints", () => {
    renderNumericInput(
      createMetadata({ minimumValue: 0, maximumValue: 100 }),
      { rawValue: 50, displayValue: "50" },
      () => {}
    );

    const input = screen.getByRole("spinbutton");
    expect(input).toHaveProperty("min", "0");
    expect(input).toHaveProperty("max", "100");
  });

  it("passes value unchanged when within constraints", () => {
    const onChange = vi.fn();
    renderNumericInput(
      createMetadata({ minimumValue: 0, maximumValue: 100 }),
      { rawValue: 0, displayValue: "0" },
      onChange
    );

    fireEvent.change(screen.getByRole("spinbutton"), {
      target: { value: "50" },
    });

    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ rawValue: 50 })
    );
  });

  it("passes value unchanged when no constraints", () => {
    const onChange = vi.fn();
    renderNumericInput(
      createMetadata(),
      { rawValue: 0, displayValue: "0" },
      onChange
    );

    fireEvent.change(screen.getByRole("spinbutton"), {
      target: { value: "999" },
    });

    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ rawValue: 999 })
    );
  });
});
