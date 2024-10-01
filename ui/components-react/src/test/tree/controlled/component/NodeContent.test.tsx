/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { PropertyRecord } from "@itwin/appui-abstract";
import { CheckBoxState } from "@itwin/core-react";
import { render } from "@testing-library/react";
import { TreeNodeContent } from "../../../../components-react/tree/controlled/component/NodeContent.js";
import type { MutableTreeModelNode } from "../../../../components-react/tree/controlled/TreeModel.js";
import type { HighlightableTreeNodeProps } from "../../../../components-react/tree/HighlightingEngine.js";
import { HighlightingEngine } from "../../../../components-react/tree/HighlightingEngine.js";
import { styleMatch } from "../../../TestUtils.js";

describe("NodeContent", () => {
  let node: MutableTreeModelNode;
  let nodeLabelRecord: PropertyRecord;

  beforeEach(async () => {
    nodeLabelRecord = PropertyRecord.fromString("Test label");
    node = {
      id: "0",
      label: nodeLabelRecord,
      checkbox: {
        isVisible: false,
        state: CheckBoxState.Off,
        isDisabled: false,
      },
      depth: 0,
      description: "Test Node Description",
      isExpanded: false,
      isLoading: false,
      numChildren: 0,
      isSelected: false,
      parentId: undefined,
      item: {
        id: "0",
        label: nodeLabelRecord,
        description: "Test Node Description",
      },
    };
  });

  it("renders label with synchronous function", () => {
    const renderedNode = render(<TreeNodeContent node={node} />);
    renderedNode.getByText("Test label");
  });

  it("passes highlight callback to values renderer", () => {
    const highlightingProps: HighlightableTreeNodeProps = {
      searchText: "label",
    };
    const spy = vi.spyOn(HighlightingEngine, "renderNodeLabel");

    render(<TreeNodeContent node={node} highlightProps={highlightingProps} />);

    expect(spy).toHaveBeenCalled();
  });

  it("updates label", () => {
    const { getByText, rerender } = render(<TreeNodeContent node={node} />);

    getByText("Test label");
    const newLabel = PropertyRecord.fromString("New label");
    const newNode = {
      ...node,
      label: newLabel,
      item: { ...node.item, label: newLabel },
    };

    rerender(<TreeNodeContent node={newNode} />);

    getByText("New label");
  });

  it("renders styled node", () => {
    node.item.style = {
      isBold: true,
    };

    const { getByText } = render(<TreeNodeContent node={node} />);
    expect(getByText("Test label")).to.satisfy(
      styleMatch({ fontWeight: "bold" })
    );
  });

  it("renders node with description", () => {
    const { getByText } = render(
      <TreeNodeContent node={node} showDescription={true} />
    );

    getByText(node.item.description!);
  });

  it("call onLabelRendered when label is rendered", () => {
    const spy = vi.fn();
    render(<TreeNodeContent node={node} onLabelRendered={spy} />);

    expect(spy).toHaveBeenCalledOnce();
  });

  it("renders node editor if node editing is active", () => {
    node.editingInfo = {
      onCancel: () => {},
      onCommit: () => {},
    };

    const { getByTestId } = render(<TreeNodeContent node={node} />);

    getByTestId("editor-container");
  });

  it("uses custom tree node editor renderer", () => {
    node.editingInfo = {
      onCancel: () => {},
      onCommit: () => {},
    };
    const editorRendererSpy = vi.fn();

    render(
      <TreeNodeContent node={node} nodeEditorRenderer={editorRendererSpy} />
    );

    expect(editorRendererSpy).toHaveBeenCalledOnce();
  });
});
