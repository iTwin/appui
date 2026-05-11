/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { render } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import * as React from "react";
import { describe, expect, it, vi } from "vitest";
import type { CustomFormattedNumberParams } from "@itwin/appui-abstract";
import { PropertyEditorParamTypes } from "@itwin/appui-abstract";
import { CustomNumberEditor } from "../../components-react/new-editors/interop/old-editors/CustomNumber.js";
import type { WithConstraints } from "../../components-react/new-editors/ConstraintUtils.js";
import type { PropertyRecordEditorMetadata } from "../../components-react/new-editors/interop/Metadata.js";

function createMetadata(constraints?: {
  minimumValue?: number;
  maximumValue?: number;
}): Omit<WithConstraints<PropertyRecordEditorMetadata>, "params"> & {
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
    const { getByDisplayValue } = render(
      <CustomNumberEditor
        metadata={createMetadata()}
        value={{ rawValue: 42, displayValue: "42" }}
        onChange={() => {}}
      />
    );

    getByDisplayValue("42");
  });

  it("calls onChange with value on input change", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    const { getByRole } = render(
      <CustomNumberEditor
        metadata={createMetadata()}
        value={undefined}
        onChange={onChange}
      />
    );

    await user.type(getByRole("textbox"), "25");

    expect(onChange).toHaveBeenLastCalledWith({
      rawValue: 25,
      displayValue: "25",
    });
  });

  it("clamps value below minimum at onChange", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    const { getByRole } = render(
      <CustomNumberEditor
        metadata={createMetadata({ minimumValue: 0, maximumValue: 100 })}
        value={undefined}
        onChange={onChange}
      />
    );

    await user.type(getByRole("textbox"), "-10");

    expect(onChange).toHaveBeenLastCalledWith({
      rawValue: 0,
      displayValue: "-10",
    });
  });

  it("clamps value above maximum at onChange", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    const { getByRole } = render(
      <CustomNumberEditor
        metadata={createMetadata({ minimumValue: 0, maximumValue: 100 })}
        value={undefined}
        onChange={onChange}
      />
    );

    await user.type(getByRole("textbox"), "200");

    expect(onChange).toHaveBeenLastCalledWith({
      rawValue: 100,
      displayValue: "200",
    });
  });

  it("passes value unchanged when within constraints", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    const { getByRole } = render(
      <CustomNumberEditor
        metadata={createMetadata({ minimumValue: 0, maximumValue: 100 })}
        value={undefined}
        onChange={onChange}
      />
    );

    await user.type(getByRole("textbox"), "50");

    expect(onChange).toHaveBeenLastCalledWith({
      rawValue: 50,
      displayValue: "50",
    });
  });

  it("passes value unchanged when no constraints", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    const { getByRole } = render(
      <CustomNumberEditor
        metadata={createMetadata()}
        value={undefined}
        onChange={onChange}
      />
    );

    await user.type(getByRole("textbox"), "999");

    expect(onChange).toHaveBeenLastCalledWith({
      rawValue: 999,
      displayValue: "999",
    });
  });

  it("sets rawValue to undefined for non-numeric input", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    const { getByRole } = render(
      <CustomNumberEditor
        metadata={createMetadata({ minimumValue: 0, maximumValue: 100 })}
        value={undefined}
        onChange={onChange}
      />
    );

    await user.type(getByRole("textbox"), "abc");

    expect(onChange).toHaveBeenLastCalledWith({
      rawValue: undefined,
      displayValue: "abc",
    });
  });
});
