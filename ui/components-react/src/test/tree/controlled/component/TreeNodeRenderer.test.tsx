/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import * as moq from "typemoq";
import { CheckBoxState } from "@itwin/core-react";
import { fireEvent, render } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { TreeNodeRenderer } from "../../../../components-react/tree/controlled/component/TreeNodeRenderer.js";
import { createRandomMutableTreeModelNode } from "../TreeHelpers.js";

import type { TreeActions } from "../../../../components-react/tree/controlled/TreeActions.js";
import type { MutableTreeModelNode } from "../../../../components-react/tree/controlled/TreeModel.js";
import type { ITreeImageLoader } from "../../../../components-react/tree/ImageLoader.js";

describe("TreeNodeRenderer", () => {
  const treeActionsMock = moq.Mock.ofType<TreeActions>();
  let nodeLabel: string;
  let node: MutableTreeModelNode;

  beforeEach(() => {
    treeActionsMock.reset();
    nodeLabel = "test node";
    node = createRandomMutableTreeModelNode({
      label: nodeLabel,
      numChildren: 2,
    });
    node.isLoading = false;
  });

  it("renders tree node", () => {
    const renderedNode = render(
      <TreeNodeRenderer treeActions={treeActionsMock.object} node={node} />
    );

    renderedNode.getByText(nodeLabel);
  });

  it("renders tree node with checkbox", () => {
    node.checkbox.isVisible = true;

    const { container } = render(
      <TreeNodeRenderer treeActions={treeActionsMock.object} node={node} />
    );

    const inputNode = container.querySelector("input");
    expect(inputNode).toBeTruthy();
  });

  it("renders tree node with icon", () => {
    const imageLoaderMock = moq.Mock.ofType<ITreeImageLoader>();
    imageLoaderMock
      .setup((x) => x.load(moq.It.isAny()))
      .returns(() => ({ sourceType: "core-icon", value: "test-icon" }));
    const { container } = render(
      <TreeNodeRenderer
        treeActions={treeActionsMock.object}
        node={node}
        imageLoader={imageLoaderMock.object}
      />
    );

    const inputNode = container.querySelector(".test-icon");
    expect(inputNode).toBeTruthy();
  });

  it("renders tree node without loaded icon", () => {
    const imageLoaderMock = moq.Mock.ofType<ITreeImageLoader>();
    imageLoaderMock
      .setup((x) => x.load(moq.It.isAny()))
      .returns(() => undefined);
    const { getByText } = render(
      <TreeNodeRenderer
        treeActions={treeActionsMock.object}
        node={node}
        imageLoader={imageLoaderMock.object}
      />
    );

    getByText(nodeLabel);
  });

  it("invokes `onContextMenu` when node is right clicked", async () => {
    const spy = vi.fn();
    const { getByText } = render(
      <TreeNodeRenderer
        treeActions={treeActionsMock.object}
        node={node}
        onContextMenu={spy}
      />
    );

    const nodeElement = getByText(nodeLabel);
    await userEvent.pointer({ keys: "[MouseRight>]", target: nodeElement });

    expect(spy).toHaveBeenCalledOnce();
  });

  describe("events", () => {
    it("fires tree event when checkbox is clicked", () => {
      node.checkbox.isVisible = true;
      node.checkbox.isDisabled = false;
      node.checkbox.state = CheckBoxState.Off;

      treeActionsMock
        .setup((x) => x.onNodeCheckboxClicked(node.id, CheckBoxState.On))
        .verifiable(moq.Times.once());

      const { container } = render(
        <TreeNodeRenderer treeActions={treeActionsMock.object} node={node} />
      );

      const inputNode: HTMLElement = container.querySelector("input")!;
      inputNode.click();

      treeActionsMock.verifyAll();
    });

    it("fires tree event when node is expanded", () => {
      node.isLoading = false;
      node.isExpanded = false;

      treeActionsMock
        .setup((x) => x.onNodeExpanded(node.id))
        .verifiable(moq.Times.once());

      const { container } = render(
        <TreeNodeRenderer treeActions={treeActionsMock.object} node={node} />
      );

      const expansionToggle: HTMLElement = container.querySelector(
        ".core-tree-expansionToggle"
      )!;
      expansionToggle.click();

      treeActionsMock.verifyAll();
    });

    it("fires tree event when node is collapsed", () => {
      node.isLoading = false;
      node.isExpanded = true;

      treeActionsMock
        .setup((x) => x.onNodeCollapsed(node.id))
        .verifiable(moq.Times.once());

      const { container } = render(
        <TreeNodeRenderer treeActions={treeActionsMock.object} node={node} />
      );

      const expansionToggle: HTMLElement = container.querySelector(
        ".core-tree-expansionToggle"
      )!;
      expansionToggle.click();

      treeActionsMock.verifyAll();
    });

    it("fires tree event when node is clicked", () => {
      treeActionsMock
        .setup((x) => x.onNodeClicked(node.id, moq.It.isAny()))
        .verifiable(moq.Times.once());

      const { container } = render(
        <TreeNodeRenderer treeActions={treeActionsMock.object} node={node} />
      );

      const treeNode: HTMLElement = container.querySelector(".core-tree-node")!;
      treeNode.click();

      treeActionsMock.verifyAll();
    });

    it("fires tree event on mouse down", () => {
      treeActionsMock
        .setup((x) => x.onNodeMouseDown(node.id))
        .verifiable(moq.Times.once());

      const { container } = render(
        <TreeNodeRenderer treeActions={treeActionsMock.object} node={node} />
      );

      const treeNode: HTMLElement = container.querySelector(".core-tree-node")!;
      fireEvent.mouseDown(treeNode);

      treeActionsMock.verifyAll();
    });

    it("fires tree event mouse move", () => {
      treeActionsMock
        .setup((x) => x.onNodeMouseMove(node.id))
        .verifiable(moq.Times.once());

      const { container } = render(
        <TreeNodeRenderer treeActions={treeActionsMock.object} node={node} />
      );

      const treeNode: HTMLElement = container.querySelector(".core-tree-node")!;
      fireEvent.mouseMove(treeNode);

      treeActionsMock.verifyAll();
    });
  });
});
