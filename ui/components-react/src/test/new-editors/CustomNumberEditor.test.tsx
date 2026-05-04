/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { fireEvent, render, screen } from "@testing-library/react";
import * as React from "react";
import { describe, expect, it, vi } from "vitest";
import type { CustomFormattedNumberParams } from "@itwin/appui-abstract";
import { PropertyEditorParamTypes } from "@itwin/appui-abstract";
import { CustomNumberEditor } from "../../components-react/new-editors/interop/old-editors/CustomNumber.js";
import type { WithConstraints } from "../../components-react/new-editors/ConstraintUtils.js";
import type { OldEditorMetadata } from "../../components-react/new-editors/interop/Metadata.js";

function createMetadata(constraints?: {
  minimumValue?: number;
  maximumValue?: number;
}): Omit<WithConstraints<OldEditorMetadata>, "params"> & {
  params: CustomFormattedNumberParams[];
} {
  return {
    type: "number",
    typename: "number",
    preferredEditor: "NumberCustom",
    params: [
      {
        type: PropertyEditorParamTypes.CustomFormattedNumber,
        formatFunction: (value: number) => `${value}`,
        parseFunction: (str: string) => {
          const val = parseFloat(str);
          if (Number.isNaN(val)) {
            return { parseError: "not a number" };
          }
          return { value: val };
        },
      },
    ],
    constraints,
  };
}

describe("CustomNumberEditor", () => {
  it("renders input with formatted value", () => {
    render(
      <CustomNumberEditor
        metadata={createMetadata()}
        value={{ rawValue: 42, displayValue: "42" }}
        onChange={() => {}}
      />
    );

    expect(screen.getByRole("textbox")).toHaveProperty("value", "42");
  });

  it("calls onChange with value on input change", () => {
    const onChange = vi.fn();

    render(
      <CustomNumberEditor
        metadata={createMetadata()}
        value={{ rawValue: 0, displayValue: "0" }}
        onChange={onChange}
      />
    );

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "25" },
    });

    expect(onChange).toHaveBeenCalledWith({
      rawValue: 25,
      displayValue: "25",
    });
  });

  it("clamps value below minimum at onChange", () => {
    const onChange = vi.fn();

    render(
      <CustomNumberEditor
        metadata={createMetadata({ minimumValue: 0, maximumValue: 100 })}
        value={{ rawValue: 0, displayValue: "0" }}
        onChange={onChange}
      />
    );

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "-10" },
    });

    expect(onChange).toHaveBeenCalledWith({
      rawValue: 0,
      displayValue: "-10",
    });
  });

  it("clamps value above maximum at onChange", () => {
    const onChange = vi.fn();

    render(
      <CustomNumberEditor
        metadata={createMetadata({ minimumValue: 0, maximumValue: 100 })}
        value={{ rawValue: 0, displayValue: "0" }}
        onChange={onChange}
      />
    );

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "200" },
    });

    expect(onChange).toHaveBeenCalledWith({
      rawValue: 100,
      displayValue: "200",
    });
  });

  it("passes value unchanged when within constraints", () => {
    const onChange = vi.fn();

    render(
      <CustomNumberEditor
        metadata={createMetadata({ minimumValue: 0, maximumValue: 100 })}
        value={{ rawValue: 0, displayValue: "0" }}
        onChange={onChange}
      />
    );

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "50" },
    });

    expect(onChange).toHaveBeenCalledWith({
      rawValue: 50,
      displayValue: "50",
    });
  });

  it("passes value unchanged when no constraints", () => {
    const onChange = vi.fn();

    render(
      <CustomNumberEditor
        metadata={createMetadata()}
        value={{ rawValue: 0, displayValue: "0" }}
        onChange={onChange}
      />
    );

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "999" },
    });

    expect(onChange).toHaveBeenCalledWith({
      rawValue: 999,
      displayValue: "999",
    });
  });

  it("sets rawValue to undefined for non-numeric input", () => {
    const onChange = vi.fn();

    render(
      <CustomNumberEditor
        metadata={createMetadata({ minimumValue: 0, maximumValue: 100 })}
        value={{ rawValue: 0, displayValue: "0" }}
        onChange={onChange}
      />
    );

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "abc" },
    });

    expect(onChange).toHaveBeenCalledWith({
      rawValue: undefined,
      displayValue: "abc",
    });
  });
});
