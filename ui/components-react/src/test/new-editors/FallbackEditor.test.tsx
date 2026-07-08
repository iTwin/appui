/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { render } from "@testing-library/react";
import * as React from "react";
import { describe, expect, it } from "vitest";
import { FallbackEditor } from "../../components-react/new-editors/editors/FallbackEditor.js";
import { MERGED_VALUE } from "../../components-react/new-editors/values/ValueUtilities.js";

describe("FallbackEditor", () => {
  it("renders the text value when one is available", () => {
    const { getByDisplayValue } = render(
      <FallbackEditor
        metadata={{ type: "string" }}
        value={{ value: "hello" }}
        onChange={() => {}}
      />
    );

    getByDisplayValue("hello");
  });

  it("renders empty string when value is undefined and metadata is not merged", () => {
    const { getByRole } = render(
      <FallbackEditor
        metadata={{ type: "string" }}
        value={undefined}
        onChange={() => {}}
      />
    );

    expect(getByRole("textbox")).toHaveProperty("value", "");
  });

  it("renders the merged placeholder when value is undefined and metadata is merged", () => {
    const { getByRole } = render(
      <FallbackEditor
        metadata={{ type: "string", isMerged: true }}
        value={undefined}
        onChange={() => {}}
      />
    );

    expect(getByRole("textbox")).toHaveProperty("value", MERGED_VALUE);
  });
});
