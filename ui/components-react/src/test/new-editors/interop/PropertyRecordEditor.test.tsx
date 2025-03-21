/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { describe, it } from "vitest";
import { render, waitFor } from "@testing-library/react";
import { PropertyRecordEditor } from "../../../components-react.js";
import { PropertyRecord } from "@itwin/appui-abstract";

describe("PropertyRecordEditor", () => {
  const propertyRecord = PropertyRecord.fromString("test");

  it("should render using old editor system by default", async () => {
    const rendered = render(
      <PropertyRecordEditor
        propertyRecord={propertyRecord}
        onCommit={() => {}}
        onCancel={() => {}}
      />
    );

    await waitFor(() => rendered.getByDisplayValue("test"));
    expect(
      rendered.container.querySelector(".components-editor-container")
    ).not.toBeNull();
  });

  it("should render using new editor system", async () => {
    const rendered = render(
      <PropertyRecordEditor
        propertyRecord={propertyRecord}
        onCommit={() => {}}
        onCancel={() => {}}
        editorSystem="new"
      />
    );

    await waitFor(() => rendered.getByDisplayValue("test"));
    expect(
      rendered.container.querySelector(".components-editor-container")
    ).toBeNull();
  });
});
