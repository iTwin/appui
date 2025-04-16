/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { VariableSizeList } from "react-window";
import { Observable } from "rxjs";
import * as moq from "typemoq";
import type { PrimitiveValue } from "@itwin/appui-abstract";
import { fireEvent, render } from "@testing-library/react";
import type { TreeNodeRendererProps } from "../../../../components-react/tree/controlled/component/TreeNodeRenderer.js";
import type { TreeRendererProps } from "../../../../components-react/tree/controlled/component/TreeRenderer.js";
import { TreeRenderer } from "../../../../components-react/tree/controlled/component/TreeRenderer.js";
import { from } from "../../../../components-react/tree/controlled/Observable.js";
import type { TreeActions } from "../../../../components-react/tree/controlled/TreeActions.js";
import type {
  TreeModel,
  TreeModelNode,
  TreeModelNodePlaceholder,
  TreeModelRootNode,
  VisibleTreeNodes,
} from "../../../../components-react/tree/controlled/TreeModel.js";
import {
  computeVisibleNodes,
  MutableTreeModel,
} from "../../../../components-react/tree/controlled/TreeModel.js";
import type { ITreeNodeLoader } from "../../../../components-react/tree/controlled/TreeNodeLoader.js";
import type { HighlightableTreeProps } from "../../../../components-react/tree/HighlightingEngine.js";
import { HighlightingEngine } from "../../../../components-react/tree/HighlightingEngine.js";
import { createTestMutableTreeModelNode } from "../TreeHelpers.js";

describe("TreeRenderer", () => {
  const visibleNodesMock = moq.Mock.ofType<VisibleTreeNodes>();
  const treeActionsMock = moq.Mock.ofType<TreeActions>();
  const nodeLoaderMock = moq.Mock.ofType<ITreeNodeLoader>();
  const defaultProps: TreeRendererProps = {
    nodeLoader: nodeLoaderMock.object,
    treeActions: treeActionsMock.object,
    visibleNodes: visibleNodesMock.object,
    nodeHeight: () => 50,
    width: 200,
    height: 200,
  };

  beforeEach(async () => {
    HTMLElement.prototype.scrollIntoView = () => {};
  });

  afterEach(() => {
    delete (HTMLElement.prototype as any).scrollIntoView;
  });

  afterEach(() => {
    visibleNodesMock.reset();
    treeActionsMock.reset();
    nodeLoaderMock.reset();
  });

  it("renders without nodes", () => {
    visibleNodesMock.setup((x) => x.getNumNodes()).returns(() => 0);
    const renderNode = render(<TreeRenderer {...defaultProps} />);
    expect(renderNode).toBeTruthy();
  });

  it("renders with loaded node", () => {
    const label = "test node";
    const node = createTestMutableTreeModelNode({ label });
    visibleNodesMock.setup((x) => x.getNumNodes()).returns(() => 1);
    visibleNodesMock.setup((x) => x.getAtIndex(0)).returns(() => node);

    const { getByText } = render(<TreeRenderer {...defaultProps} />);

    getByText(label);
  });

  describe("node loading", () => {
    it("renders placeholder and starts loading root node", () => {
      const treeRoot: TreeModelRootNode = {
        depth: -1,
        id: undefined,
        numChildren: 1,
      };
      const node: TreeModelNodePlaceholder = {
        childIndex: 0,
        depth: 0,
      };
      const modelMock = moq.Mock.ofType<TreeModel>();
      modelMock.setup((x) => x.getRootNode()).returns(() => treeRoot);
      nodeLoaderMock
        .setup((x) => x.loadNode(treeRoot, 0))
        .returns(() => from([]));
      visibleNodesMock
        .setup((x) => x.getModel())
        .returns(() => modelMock.object);
      visibleNodesMock.setup((x) => x.getNumNodes()).returns(() => 1);
      visibleNodesMock.setup((x) => x.getAtIndex(0)).returns(() => node);

      const { container } = render(<TreeRenderer {...defaultProps} />);

      expect(container).toBeTruthy();
      nodeLoaderMock.verify((x) => x.loadNode(treeRoot, 0), moq.Times.once());
    });

    it("renders placeholder and starts loading node with parent", () => {
      const parentNode = createTestMutableTreeModelNode();
      const node: TreeModelNodePlaceholder = {
        parentId: parentNode.id,
        childIndex: 0,
        depth: 0,
      };
      const modelMock = moq.Mock.ofType<TreeModel>();
      modelMock
        .setup((x) => x.getNode(parentNode.id))
        .returns(() => parentNode);
      nodeLoaderMock
        .setup((x) => x.loadNode(parentNode, 0))
        .returns(() => from([]));
      visibleNodesMock
        .setup((x) => x.getModel())
        .returns(() => modelMock.object);
      visibleNodesMock.setup((x) => x.getNumNodes()).returns(() => 1);
      visibleNodesMock.setup((x) => x.getAtIndex(0)).returns(() => node);

      const { container } = render(<TreeRenderer {...defaultProps} />);

      expect(container).toBeTruthy();
      nodeLoaderMock.verify((x) => x.loadNode(parentNode, 0), moq.Times.once());
    });

    it("renders placeholder node but does not start loading if parent node is not found", () => {
      const parentNode = createTestMutableTreeModelNode();
      const node: TreeModelNodePlaceholder = {
        parentId: parentNode.id,
        childIndex: 0,
        depth: 0,
      };
      const modelMock = moq.Mock.ofType<TreeModel>();
      modelMock.setup((x) => x.getNode(parentNode.id)).returns(() => undefined);
      visibleNodesMock
        .setup((x) => x.getModel())
        .returns(() => modelMock.object);
      visibleNodesMock.setup((x) => x.getNumNodes()).returns(() => 1);
      visibleNodesMock.setup((x) => x.getAtIndex(0)).returns(() => node);

      const { container } = render(<TreeRenderer {...defaultProps} />);

      expect(container).toBeTruthy();
      nodeLoaderMock.verify(
        (x) => x.loadNode(moq.It.isAny(), moq.It.isAny()),
        moq.Times.never()
      );
    });

    it("does not request to load a node again if visibleNodes changes while the node is still loading", async () => {
      const treeModel = new MutableTreeModel();
      treeModel.setNumChildren(undefined, 1);

      nodeLoaderMock
        .setup((x) => x.loadNode(treeModel.getRootNode(), 0))
        .returns(() => new Observable(() => {}))
        .verifiable(moq.Times.once());

      const { rerender } = render(
        <TreeRenderer
          {...defaultProps}
          visibleNodes={computeVisibleNodes(treeModel)}
        />
      );
      nodeLoaderMock.verifyAll();

      rerender(
        <TreeRenderer
          {...defaultProps}
          visibleNodes={computeVisibleNodes(treeModel)}
        />
      );
      nodeLoaderMock.verifyAll();
    });
  });

  it("rerenders with loaded node", () => {
    const label = "test node";
    const node = createTestMutableTreeModelNode({ label });
    visibleNodesMock.setup((x) => x.getNumNodes()).returns(() => 1);
    visibleNodesMock.setup((x) => x.getAtIndex(0)).returns(() => node);

    const { getByText, rerender } = render(<TreeRenderer {...defaultProps} />);

    getByText(label);

    const newLabel = "test node";
    const newNode = createTestMutableTreeModelNode({ label: newLabel });
    const newVisibleNodesMock = moq.Mock.ofType<VisibleTreeNodes>();
    newVisibleNodesMock.setup((x) => x.getNumNodes()).returns(() => 1);
    newVisibleNodesMock.setup((x) => x.getAtIndex(0)).returns(() => newNode);

    rerender(
      <TreeRenderer
        {...defaultProps}
        visibleNodes={newVisibleNodesMock.object}
      />
    );

    getByText(newLabel);
  });

  it("rerenders when node height changes", () => {
    const node1 = createTestMutableTreeModelNode({ label: "test_node_1" });
    const node2 = createTestMutableTreeModelNode({ label: "test_node_2" });
    visibleNodesMock.setup((x) => x.getNumNodes()).returns(() => 2);
    visibleNodesMock.setup((x) => x.getAtIndex(0)).returns(() => node1);
    visibleNodesMock.setup((x) => x.getAtIndex(1)).returns(() => node2);

    const NodeRenderer: React.FC<TreeNodeRendererProps> = (props) => {
      return <>{(props.node.label.value as PrimitiveValue).value as string}</>;
    };

    const { rerender, getByText } = render(
      <TreeRenderer {...defaultProps} nodeRenderer={NodeRenderer} />
    );

    const nodeBefore = getByText("test_node_2");
    expect(nodeBefore.style.height).toEqual("50px");
    expect(nodeBefore.style.top).toEqual("50px");

    rerender(
      <TreeRenderer
        {...defaultProps}
        nodeHeight={() => 20}
        nodeRenderer={NodeRenderer}
      />
    );

    const nodeAfter = getByText("test_node_2");
    expect(nodeAfter.style.height).toEqual("20px");
    expect(nodeAfter.style.top).toEqual("20px");
  });

  it("calls 'onItemRendered' callback when nodes are rendered", () => {
    visibleNodesMock.setup((x) => x.getNumNodes()).returns(() => 2);
    visibleNodesMock
      .setup((x) => x.getAtIndex(0))
      .returns(() => createTestMutableTreeModelNode({ label: "test node" }));
    visibleNodesMock
      .setup((x) => x.getAtIndex(1))
      .returns(() => createTestMutableTreeModelNode({ label: "test node 1" }));

    const spy = vi.fn();

    const { getByText } = render(
      <TreeRenderer {...defaultProps} onItemsRendered={spy} />
    );

    getByText("test node 1");
    expect(spy).toHaveBeenCalledWith({
      overscanStartIndex: 0,
      visibleStartIndex: 0,
      overscanStopIndex: 1,
      visibleStopIndex: 1,
    });
  });

  it("scrolls to highlighted node", () => {
    const node2label = "Node 2";
    const node1 = createTestMutableTreeModelNode();
    const node2 = createTestMutableTreeModelNode({
      label: node2label,
    });
    visibleNodesMock.setup((x) => x.getNumNodes()).returns(() => 2);
    visibleNodesMock.setup((x) => x.getAtIndex(0)).returns(() => node1);
    visibleNodesMock.setup((x) => x.getAtIndex(1)).returns(() => node2);
    visibleNodesMock
      .setup((x) => x[Symbol.iterator]())
      .returns(() => [node1, node2][Symbol.iterator]());

    const highlightProps: HighlightableTreeProps = {
      searchText: node2label,
      activeMatch: {
        matchIndex: 0,
        nodeId: node2.id,
      },
    };

    let onLabelRendered: ((node: TreeModelNode) => void) | undefined;
    const nodeRenderer = (props: TreeNodeRendererProps) => {
      onLabelRendered = props.onLabelRendered;
      return <div className={HighlightingEngine.ACTIVE_CLASS_NAME} />;
    };

    const verticalScrollSpy = vi.fn();
    vi.spyOn(VariableSizeList.prototype, "scrollToItem").mockImplementation(
      verticalScrollSpy
    );
    const horizontalScrollSpy = vi.fn();
    vi.spyOn(HTMLElement.prototype, "scrollIntoView").mockImplementation(
      horizontalScrollSpy
    );

    const { rerender } = render(<TreeRenderer {...defaultProps} />);

    // need to rerender because after first render VariableSizeList ref is not set
    rerender(
      <TreeRenderer
        {...defaultProps}
        nodeHighlightingProps={highlightProps}
        nodeRenderer={nodeRenderer}
      />
    );
    onLabelRendered!(node2);

    expect(verticalScrollSpy).toHaveBeenCalledWith(1);
    expect(horizontalScrollSpy).toHaveBeenCalled();
  });

  it("calls treeActions.onTreeKeyDown & onTreeKeyUp", () => {
    const label = "test node";
    const node = createTestMutableTreeModelNode({ label });
    visibleNodesMock.setup((x) => x.getNumNodes()).returns(() => 1);
    visibleNodesMock.setup((x) => x.getAtIndex(0)).returns(() => node);

    const spyKeyDown = vi.fn();
    const spyKeyUp = vi.fn();
    treeActionsMock.setup((x) => x.onTreeKeyDown).returns(() => spyKeyDown);
    treeActionsMock.setup((x) => x.onTreeKeyUp).returns(() => spyKeyUp);

    const renderNode = render(<TreeRenderer {...defaultProps} />);

    expect(renderNode).toBeTruthy();

    const treeNode: HTMLElement =
      renderNode.container.querySelector(".core-tree-node")!;
    fireEvent.keyDown(treeNode, { key: " " });
    fireEvent.keyUp(treeNode, { key: " " });
    expect(spyKeyDown).toHaveBeenCalled();
    expect(spyKeyUp).toHaveBeenCalled();
  });

  it("calls onNodeEditorClosed when node.editingInfo changes to undefined", () => {
    const spy = vi.fn();
    const label = "test node";
    const node = createTestMutableTreeModelNode({ label });
    visibleNodesMock.setup((x) => x.getNumNodes()).returns(() => 1);
    visibleNodesMock.setup((x) => x.getAtIndex(0)).returns(() => node);

    const { rerender } = render(
      <TreeRenderer {...defaultProps} onNodeEditorClosed={spy} />
    );

    expect(spy).not.toBeCalled();
    node.editingInfo = { onCommit: () => {}, onCancel: () => {} };

    const nodeRenderer = (_props: TreeNodeRendererProps) => {
      return <div className={HighlightingEngine.ACTIVE_CLASS_NAME} />;
    };

    rerender(
      <TreeRenderer
        {...defaultProps}
        onNodeEditorClosed={spy}
        nodeRenderer={nodeRenderer}
      />
    );

    expect(spy).not.toBeCalled();
    node.editingInfo = undefined;

    rerender(<TreeRenderer {...defaultProps} onNodeEditorClosed={spy} />);

    expect(spy).toHaveBeenCalled();
  });

  describe("scrollToNode", () => {
    beforeEach(() => {
      visibleNodesMock.setup((x) => x.getNumNodes()).returns(() => 20);
      visibleNodesMock
        .setup((x) => x.getAtIndex(moq.It.isAnyNumber()))
        .returns((index) =>
          createTestMutableTreeModelNode({
            selected: false,
            label: `Node ${index}`,
          })
        );
      visibleNodesMock
        .setup((x) => x.getIndexOfNode("test_id"))
        .returns(() => 15);
    });

    it("scrolls to the specified node", () => {
      const spy = vi.spyOn(VariableSizeList.prototype, "scrollToItem");
      const treeRendererRef: React.RefObject<TreeRenderer> = { current: null };
      render(<TreeRenderer ref={treeRendererRef} {...defaultProps} />);

      treeRendererRef.current!.scrollToNode("test_id", "smart");
      expect(spy).toHaveBeenCalledWith(15, "smart");
    });

    it("does not throw if called early", () => {
      const spy = vi.spyOn(VariableSizeList.prototype, "scrollToItem");
      render(
        React.createElement(() => {
          const treeRendererRef = React.useRef<TreeRenderer>(null);

          React.useEffect(() => {
            treeRendererRef.current?.scrollToNode("test_id", "smart");
          }, []);

          return <TreeRenderer ref={treeRendererRef} {...defaultProps} />;
        })
      );

      expect(spy).toHaveBeenCalledWith(15, "smart");
    });
  });
});
