/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { describe, it } from "vitest";
import { render, waitFor } from "@testing-library/react";
import { PropertyRecordEditor } from "../../../components-react.js";
import { PropertyRecord, PropertyValueFormat } from "@itwin/appui-abstract";

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

  describe("id / label association (a11y)", () => {
    it("sets id={property.name} on the input when using new editor system", async () => {
      const record = PropertyRecord.fromString("hello", "arcLength");
      const { container } = render(
        <PropertyRecordEditor
          propertyRecord={record}
          onCommit={() => {}}
          onCancel={() => {}}
          editorSystem="new"
        />
      );

      await waitFor(() =>
        expect(container.querySelector('[id="arcLength"]')).not.toBeNull()
      );
    });

    it("allows getByLabelText queries for text properties when using new editor system", async () => {
      const record = PropertyRecord.fromString("hello", "arcLength");
      const { getByLabelText } = render(
        <>
          <label htmlFor="arcLength">Arc Length</label>
          <PropertyRecordEditor
            propertyRecord={record}
            onCommit={() => {}}
            onCancel={() => {}}
            editorSystem="new"
          />
        </>
      );

      await waitFor(() => expect(getByLabelText("Arc Length")).toBeDefined());
    });

    it("sets id={property.name} on the select when using new editor system with enum property", async () => {
      const record = new PropertyRecord(
        { valueFormat: PropertyValueFormat.Primitive, value: 0 },
        {
          name: "arcType",
          typename: "enum",
          displayLabel: "Arc Type",
          enum: {
            choices: [
              { label: "Clockwise", value: 0 },
              { label: "Counterclockwise", value: 1 },
            ],
          },
        }
      );

      const { container } = render(
        <PropertyRecordEditor
          propertyRecord={record}
          onCommit={() => {}}
          onCancel={() => {}}
          editorSystem="new"
        />
      );

      await waitFor(() =>
        expect(container.querySelector('[id="arcType"]')).not.toBeNull()
      );
    });

    it("sets id={property.name} on the input when using legacy editor system", async () => {
      const record = PropertyRecord.fromString("hello", "arcLength");
      const { container } = render(
        <PropertyRecordEditor
          propertyRecord={record}
          onCommit={() => {}}
          onCancel={() => {}}
        />
      );

      await waitFor(() =>
        expect(container.querySelector("input")).not.toBeNull()
      );
      expect(
        container.querySelector(".components-editor-container")
      ).not.toBeNull();
      expect(container.querySelector('input[id="arcLength"]')).not.toBeNull();
    });
  });
});
