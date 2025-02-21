/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { describe, it } from "vitest";
import { render, waitFor } from "@testing-library/react";
import { createEditorSpec } from "../../components-react/new-editors/Types.js";
import type { ValueMetadata } from "../../components-react/new-editors/values/Metadata.js";
import type {
  TextValue,
  Value,
} from "../../components-react/new-editors/values/Values.js";
import { EditorsRegistryProvider } from "../../components-react/new-editors/editors-registry/EditorsRegistryProvider.js";
import { EditorRenderer } from "../../components-react/new-editors/EditorRenderer.js";

describe("EditorsRegistryProvider", () => {
  const testMetadata: ValueMetadata = {
    type: "string",
  };
  const value: TextValue = {
    value: "test",
  };

  it("should render using custom editor editor", async () => {
    const editorsSpec = createEditorSpec({
      isMetadataSupported: (_metadata): _metadata is ValueMetadata => true,
      isValueSupported: (_value): _value is Value => true,
      Editor: () => <div>Custom Editor</div>,
    });

    const rendered = render(
      <EditorsRegistryProvider editors={[editorsSpec]}>
        <EditorRenderer
          metadata={testMetadata}
          value={value}
          onChange={() => {}}
        />
      </EditorsRegistryProvider>
    );

    await waitFor(() => rendered.getByText("Custom Editor"));
  });

  it("should render using higher priority custom editor editor", async () => {
    const lowEditorsSpec = createEditorSpec({
      isMetadataSupported: (_metadata): _metadata is ValueMetadata => true,
      isValueSupported: (_value): _value is Value => true,
      Editor: () => <div>Low priority Custom Editor</div>,
    });

    const highEditorsSpec = createEditorSpec({
      isMetadataSupported: (_metadata): _metadata is ValueMetadata => true,
      isValueSupported: (_value): _value is Value => true,
      Editor: () => <div>High priority Custom Editor</div>,
    });

    const rendered = render(
      <EditorsRegistryProvider editors={[lowEditorsSpec]}>
        <EditorsRegistryProvider editors={[highEditorsSpec]}>
          <EditorRenderer
            metadata={testMetadata}
            value={value}
            onChange={() => {}}
          />
        </EditorsRegistryProvider>
      </EditorsRegistryProvider>
    );

    await waitFor(() => rendered.getByText("High priority Custom Editor"));
  });

  it("should render lower priority custom editor editor if no higher priority editors match", async () => {
    const lowEditorsSpec = createEditorSpec({
      isMetadataSupported: (_metadata): _metadata is ValueMetadata => true,
      isValueSupported: (_value): _value is Value => true,
      Editor: () => <div>Low priority Custom Editor</div>,
    });

    const highEditorsSpec = createEditorSpec({
      isMetadataSupported: (metadata): metadata is ValueMetadata =>
        metadata.type === "number",
      isValueSupported: (_value): _value is Value => true,
      Editor: () => <div>High priority Custom Editor</div>,
    });

    const rendered = render(
      <EditorsRegistryProvider editors={[lowEditorsSpec]}>
        <EditorsRegistryProvider editors={[highEditorsSpec]}>
          <EditorRenderer
            metadata={testMetadata}
            value={value}
            onChange={() => {}}
          />
        </EditorsRegistryProvider>
      </EditorsRegistryProvider>
    );

    await waitFor(() => rendered.getByText("Low priority Custom Editor"));
  });
});
