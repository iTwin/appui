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
      expect.objectContaining({ rawValue: 25 }),
      expect.any(Function)
    );
  });

  it("prepareForCommit clamps value below minimum", () => {
    const onChange = vi.fn();
    renderNumericInput(
      createMetadata({ minimumValue: 0, maximumValue: 100 }),
      { rawValue: 0, displayValue: "0" },
      onChange
    );

    fireEvent.change(screen.getByRole("spinbutton"), {
      target: { value: "-10" },
    });

    const prepareForCommit = onChange.mock.calls[0][1];
    const result = prepareForCommit();
    expect(result.rawValue).toBe(0);
  });

  it("prepareForCommit clamps value above maximum", () => {
    const onChange = vi.fn();
    renderNumericInput(
      createMetadata({ minimumValue: 0, maximumValue: 100 }),
      { rawValue: 0, displayValue: "0" },
      onChange
    );

    fireEvent.change(screen.getByRole("spinbutton"), {
      target: { value: "200" },
    });

    const prepareForCommit = onChange.mock.calls[0][1];
    const result = prepareForCommit();
    expect(result.rawValue).toBe(100);
  });

  it("prepareForCommit returns value unchanged when within constraints", () => {
    const onChange = vi.fn();
    renderNumericInput(
      createMetadata({ minimumValue: 0, maximumValue: 100 }),
      { rawValue: 0, displayValue: "0" },
      onChange
    );

    fireEvent.change(screen.getByRole("spinbutton"), {
      target: { value: "50" },
    });

    const prepareForCommit = onChange.mock.calls[0][1];
    const result = prepareForCommit();
    expect(result.rawValue).toBe(50);
  });

  it("prepareForCommit returns value unchanged when no constraints", () => {
    const onChange = vi.fn();
    renderNumericInput(
      createMetadata(),
      { rawValue: 0, displayValue: "0" },
      onChange
    );

    fireEvent.change(screen.getByRole("spinbutton"), {
      target: { value: "999" },
    });

    const prepareForCommit = onChange.mock.calls[0][1];
    const result = prepareForCommit();
    expect(result.rawValue).toBe(999);
  });
});
