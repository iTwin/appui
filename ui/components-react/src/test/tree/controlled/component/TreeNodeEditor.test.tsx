/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { act, fireEvent, render, waitFor } from "@testing-library/react";
import { TreeNodeEditor } from "../../../../components-react/tree/controlled/component/TreeNodeEditor.js";
import type { MutableTreeModelNode } from "../../../../components-react/tree/controlled/TreeModel.js";
import { createTestMutableTreeModelNode } from "../TreeHelpers.js";

describe("TreeNodeEditor", () => {
  let testNode: MutableTreeModelNode;

  beforeEach(() => {
    testNode = createTestMutableTreeModelNode();
  });

  it("renders editor", () => {
    const { getByTestId } = render(
      <TreeNodeEditor node={testNode} onCommit={() => {}} onCancel={() => {}} />
    );

    getByTestId("editor-container");
  });

  it("calls onCommit callback when change is committed", async () => {
    const spy = vi.fn();
    const { getByTestId } = render(
      <TreeNodeEditor node={testNode} onCommit={spy} onCancel={() => {}} />
    );

    const editorContainer = getByTestId("editor-container");
    act(() => {
      fireEvent.keyDown(editorContainer, { key: "Enter", code: 13 });
    });
    await waitFor(() => {
      expect(spy).toHaveBeenCalledOnce();
    });
  });

  it("calls onCancel callback when editing is canceled", async () => {
    const spy = vi.fn();
    const { getByTestId } = render(
      <TreeNodeEditor node={testNode} onCommit={() => {}} onCancel={spy} />
    );

    const editorContainer = getByTestId("editor-container");
    act(() => {
      fireEvent.keyDown(editorContainer, { key: "Escape", code: 27 });
    });
    await waitFor(() => {
      expect(spy).toHaveBeenCalledOnce();
    });
  });

  it("renders editor with label PropertyRecord", () => {
    const { getByTestId } = render(
      <TreeNodeEditor node={testNode} onCommit={() => {}} onCancel={() => {}} />
    );

    getByTestId("editor-container");
  });
});
