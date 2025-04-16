/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as moq from "typemoq";
import { Key } from "ts-key-enum";
import type { SelectionHandler } from "../../../../components-react/common/selection/SelectionHandler.js";
import { SelectionMode } from "../../../../components-react/common/selection/SelectionModes.js";
import type {
  IndividualSelection,
  RangeSelection,
} from "../../../../components-react/tree/controlled/internal/TreeSelectionManager.js";
import {
  isRangeSelection,
  TreeSelectionManager,
} from "../../../../components-react/tree/controlled/internal/TreeSelectionManager.js";
import type { TreeActions } from "../../../../components-react/tree/controlled/TreeActions.js";
import type {
  TreeModel,
  TreeModelNode,
  TreeModelNodePlaceholder,
  VisibleTreeNodes,
} from "../../../../components-react/tree/controlled/TreeModel.js";
import { isTreeModelNode } from "../../../../components-react/tree/controlled/TreeModel.js";
import { createTestMutableTreeModelNode } from "../TreeHelpers.js";

type Selection = string | RangeSelection;

describe("TreeSelectionManager", () => {
  let multipleSelectionManager: TreeSelectionManager;
  const visibleNodesMock = moq.Mock.ofType<VisibleTreeNodes>();
  const eventMock = moq.Mock.ofType<React.MouseEvent>();
  const treeModelMock = moq.Mock.ofType<TreeModel>();
  const keyEventMock = moq.Mock.ofType<React.KeyboardEvent>();
  const treeActionsMock = moq.Mock.ofType<TreeActions>();
  let selectionHandler: SelectionHandler<Selection>;

  beforeEach(() => {
    visibleNodesMock.reset();
    eventMock.reset();
    treeModelMock.reset();
    keyEventMock.reset();
    multipleSelectionManager = new TreeSelectionManager(
      SelectionMode.Multiple,
      () => visibleNodesMock.object
    );
    selectionHandler = (multipleSelectionManager as any)._selectionHandler;
  });

  function createTreeModelNode(props?: Partial<TreeModelNode>) {
    return {
      ...createTestMutableTreeModelNode({ label: props?.id }),
      isLoading: false,
      isSelected: false,
      ...props,
    };
  }

  function setupModelWithNodes(
    nodes: Array<TreeModelNode | TreeModelNodePlaceholder>
  ) {
    visibleNodesMock.reset();
    treeModelMock.reset();

    visibleNodesMock
      .setup((x) => x.getModel())
      .returns(() => treeModelMock.object);
    visibleNodesMock.setup((x) => x.getNumNodes()).returns(() => nodes.length);
    nodes.forEach((node, index) => {
      visibleNodesMock.setup((x) => x.getAtIndex(index)).returns(() => node);
      if (isTreeModelNode(node)) {
        visibleNodesMock
          .setup((x) => x.getIndexOfNode(node.id))
          .returns(() => index);
        treeModelMock.setup((x) => x.getNode(node.id)).returns(() => node);
      }
    });
  }

  describe("onNodeClicked", () => {
    let extendedSelectionManager: TreeSelectionManager;

    beforeEach(() => {
      extendedSelectionManager = new TreeSelectionManager(
        SelectionMode.Extended,
        () => visibleNodesMock.object
      );
    });

    it("selects node", () => {
      const node = createTreeModelNode();
      setupModelWithNodes([node]);
      const spy = vi.spyOn(
        extendedSelectionManager.onSelectionReplaced,
        "emit"
      );
      eventMock.setup((x) => x.shiftKey).returns(() => false);
      eventMock.setup((x) => x.ctrlKey).returns(() => false);
      eventMock.setup((x) => x.metaKey).returns(() => false);
      extendedSelectionManager.onNodeClicked(node.id, eventMock.object);
      expect(spy).toHaveBeenCalledOnce();
      expect(spy).toHaveBeenCalledWith({
        selectedNodeIds: [node.id],
      });
    });

    it("ctrl deselects node", () => {
      const node = createTreeModelNode({ isSelected: true });
      setupModelWithNodes([node]);
      const spy = vi.spyOn(extendedSelectionManager.onSelectionChanged, "emit");
      eventMock.setup((x) => x.shiftKey).returns(() => false);
      eventMock.setup((x) => x.ctrlKey).returns(() => true);
      eventMock.setup((x) => x.metaKey).returns(() => false);
      extendedSelectionManager.onNodeClicked(node.id, eventMock.object);
      expect(spy).toHaveBeenCalledOnce();
      expect(spy).toHaveBeenCalledWith({
        selectedNodes: [],
        deselectedNodes: [node.id],
      });
    });

    it("ctrl selects nodes", () => {
      const nodes = [
        createTreeModelNode({ id: "node-1" }),
        createTreeModelNode({ id: "node-2" }),
      ];
      setupModelWithNodes(nodes);
      const spy = vi.spyOn(extendedSelectionManager.onSelectionChanged, "emit");
      eventMock.setup((x) => x.shiftKey).returns(() => false);
      eventMock.setup((x) => x.ctrlKey).returns(() => true);
      eventMock.setup((x) => x.metaKey).returns(() => false);
      extendedSelectionManager.onNodeClicked(nodes[0].id, eventMock.object);
      extendedSelectionManager.onNodeClicked(nodes[1].id, eventMock.object);
      expect(spy).toHaveBeenCalledTimes(2);
      expect(spy).toHaveBeenCalledWith({
        selectedNodes: [nodes[0].id],
        deselectedNodes: [],
      });
      expect(spy).toHaveBeenCalledWith({
        selectedNodes: [nodes[1].id],
        deselectedNodes: [],
      });
    });

    it("shift selects nodes", () => {
      const nodes = [
        createTreeModelNode({ id: "node-1" }),
        createTreeModelNode({ id: "node-2" }),
      ];
      setupModelWithNodes(nodes);
      const spy = vi.spyOn(
        extendedSelectionManager.onSelectionReplaced,
        "emit"
      );
      eventMock.setup((x) => x.shiftKey).returns(() => true);
      eventMock.setup((x) => x.ctrlKey).returns(() => false);
      eventMock.setup((x) => x.metaKey).returns(() => false);
      extendedSelectionManager.onNodeClicked(nodes[0].id, eventMock.object);
      extendedSelectionManager.onNodeClicked(nodes[1].id, eventMock.object);
      expect(spy).toHaveBeenCalledTimes(2);
      expect(spy).toHaveBeenCalledWith({
        selectedNodeIds: [nodes[0].id],
      });
      expect(spy).toHaveBeenCalledWith({
        selectedNodeIds: { from: nodes[0].id, to: nodes[1].id },
      });
    });

    it("shift + ctrl selects nodes", () => {
      const nodes = [
        createTreeModelNode({ id: "node-1" }),
        createTreeModelNode({ id: "node-2" }),
      ];
      setupModelWithNodes(nodes);
      const spy = vi.spyOn(extendedSelectionManager.onSelectionChanged, "emit");
      eventMock.setup((x) => x.shiftKey).returns(() => true);
      eventMock.setup((x) => x.ctrlKey).returns(() => true);
      eventMock.setup((x) => x.metaKey).returns(() => false);
      extendedSelectionManager.onNodeClicked(nodes[0].id, eventMock.object);
      extendedSelectionManager.onNodeClicked(nodes[1].id, eventMock.object);
      expect(spy).toHaveBeenCalledTimes(2);
      expect(spy).toHaveBeenCalledWith({
        selectedNodes: [nodes[0].id],
        deselectedNodes: [],
      });
      expect(spy).toHaveBeenCalledWith({
        selectedNodes: { from: nodes[0].id, to: nodes[1].id },
        deselectedNodes: [],
      });
    });

    it("cmd selects nodes", () => {
      const nodes = [
        createTreeModelNode({ id: "node-1" }),
        createTreeModelNode({ id: "node-2" }),
      ];
      setupModelWithNodes(nodes);
      const spy = vi.spyOn(extendedSelectionManager.onSelectionChanged, "emit");
      eventMock.setup((x) => x.shiftKey).returns(() => false);
      eventMock.setup((x) => x.ctrlKey).returns(() => false);
      eventMock.setup((x) => x.metaKey).returns(() => true);
      extendedSelectionManager.onNodeClicked(nodes[0].id, eventMock.object);
      extendedSelectionManager.onNodeClicked(nodes[1].id, eventMock.object);
      expect(spy).toHaveBeenCalledTimes(2);
      expect(spy).toHaveBeenCalledWith({
        selectedNodes: [nodes[0].id],
        deselectedNodes: [],
      });
      expect(spy).toHaveBeenCalledWith({
        selectedNodes: [nodes[1].id],
        deselectedNodes: [],
      });
    });
  });

  describe("onNodeMouseDown", () => {
    it("selects nodes by dragging", () => {
      const nodes = [
        createTreeModelNode({ id: "node-1" }),
        createTreeModelNode({ id: "node-2" }),
      ];
      setupModelWithNodes(nodes);
      const spy = vi.spyOn(selectionHandler, "completeDragAction");
      const changeSpy = vi.spyOn(
        multipleSelectionManager.onSelectionChanged,
        "emit"
      );
      multipleSelectionManager.onNodeMouseDown(nodes[0].id);
      multipleSelectionManager.onNodeMouseMove(nodes[1].id);
      window.dispatchEvent(new Event("mouseup"));
      expect(spy).toHaveBeenCalled();
      expect(changeSpy).toHaveBeenCalledWith({
        selectedNodes: [nodes[0].id, nodes[1].id],
        deselectedNodes: [],
      });
    });

    it("selects nodes when there are placeholder visible nodes", () => {
      const placeholder = { childIndex: 0, depth: 0 };
      const node = createTreeModelNode();
      setupModelWithNodes([placeholder, node]);
      const spy = vi.spyOn(selectionHandler, "completeDragAction");
      const changeSpy = vi.spyOn(
        multipleSelectionManager.onSelectionChanged,
        "emit"
      );
      multipleSelectionManager.onNodeMouseDown(node.id);
      window.dispatchEvent(new Event("mouseup"));
      multipleSelectionManager.onNodeClicked(node.id, eventMock.object);
      expect(spy).toHaveBeenCalled();
      expect(changeSpy).toHaveBeenCalledWith({
        selectedNodes: [node.id],
        deselectedNodes: [],
      });
    });
  });

  describe("onNodeMouseMove", () => {
    it("updates drag action", () => {
      const node = createTreeModelNode();
      setupModelWithNodes([node]);
      const spy = vi.spyOn(selectionHandler, "updateDragAction");
      multipleSelectionManager.onNodeMouseMove(node.id);
      expect(spy).toHaveBeenCalled();
    });
  });

  describe("Keyboard Events", () => {
    let extendedSelectionManager: TreeSelectionManager;

    beforeEach(() => {
      extendedSelectionManager = new TreeSelectionManager(
        SelectionMode.Extended,
        () => visibleNodesMock.object
      );
      eventMock.setup((x) => x.shiftKey).returns(() => false);
      eventMock.setup((x) => x.ctrlKey).returns(() => false);
      treeActionsMock.reset();
    });

    it("does nothing on non-navigation key", () => {
      const node = createTreeModelNode();
      setupModelWithNodes([node]);
      extendedSelectionManager.onNodeClicked(node.id, eventMock.object);
      const spy = vi.spyOn(
        extendedSelectionManager.onSelectionReplaced,
        "emit"
      );
      keyEventMock.setup((x) => x.key).returns(() => Key.Divide);
      keyEventMock.setup((x) => x.shiftKey).returns(() => false);
      keyEventMock.setup((x) => x.ctrlKey).returns(() => false);
      extendedSelectionManager.onTreeKeyDown(
        keyEventMock.object,
        treeActionsMock.object
      );
      extendedSelectionManager.onTreeKeyUp(
        keyEventMock.object,
        treeActionsMock.object
      );
      expect(spy).not.toBeCalled();
    });

    it("selects node", () => {
      const nodes = [
        createTreeModelNode({ id: "node-1", isSelected: false }),
        createTreeModelNode({ id: "node-2", isSelected: false }),
      ];
      setupModelWithNodes(nodes);
      extendedSelectionManager.onNodeClicked(nodes[0].id, eventMock.object);
      const spy = vi.spyOn(
        extendedSelectionManager.onSelectionReplaced,
        "emit"
      );
      keyEventMock.setup((x) => x.key).returns(() => Key.ArrowDown);
      keyEventMock.setup((x) => x.shiftKey).returns(() => false);
      keyEventMock.setup((x) => x.ctrlKey).returns(() => false);
      extendedSelectionManager.onTreeKeyDown(
        keyEventMock.object,
        treeActionsMock.object
      );
      extendedSelectionManager.onTreeKeyUp(
        keyEventMock.object,
        treeActionsMock.object
      );
      expect(spy).toHaveBeenCalledWith({ selectedNodeIds: [nodes[1].id] });
    });

    it("shift selects nodes", () => {
      const nodes = [
        createTreeModelNode({ id: "node-1", isSelected: false }),
        createTreeModelNode({ id: "node-2", isSelected: false }),
      ];
      setupModelWithNodes(nodes);
      extendedSelectionManager.onNodeClicked(nodes[0].id, eventMock.object);
      const spy = vi.spyOn(
        extendedSelectionManager.onSelectionReplaced,
        "emit"
      );
      keyEventMock.setup((x) => x.key).returns(() => Key.ArrowDown);
      keyEventMock.setup((x) => x.shiftKey).returns(() => true);
      keyEventMock.setup((x) => x.ctrlKey).returns(() => false);
      extendedSelectionManager.onTreeKeyDown(
        keyEventMock.object,
        treeActionsMock.object
      );
      extendedSelectionManager.onTreeKeyUp(
        keyEventMock.object,
        treeActionsMock.object
      );
      expect(spy).toHaveBeenCalledWith({
        selectedNodeIds: { from: nodes[0].id, to: nodes[1].id },
      });
    });

    it("Home should select top node", () => {
      const nodes = [
        createTreeModelNode({ id: "node-1" }),
        createTreeModelNode({ id: "node-2" }),
      ];
      setupModelWithNodes(nodes);
      extendedSelectionManager.onNodeClicked(nodes[1].id, eventMock.object);
      const spy = vi.spyOn(
        extendedSelectionManager.onSelectionReplaced,
        "emit"
      );
      keyEventMock.setup((x) => x.key).returns(() => Key.Home);
      keyEventMock.setup((x) => x.shiftKey).returns(() => false);
      keyEventMock.setup((x) => x.ctrlKey).returns(() => false);
      extendedSelectionManager.onTreeKeyDown(
        keyEventMock.object,
        treeActionsMock.object
      );
      extendedSelectionManager.onTreeKeyUp(
        keyEventMock.object,
        treeActionsMock.object
      );
      expect(spy).toHaveBeenCalledWith({ selectedNodeIds: [nodes[0].id] });
    });

    it("End should select bottom node", () => {
      const nodes = [
        createTreeModelNode({ id: "node-1" }),
        createTreeModelNode({ id: "node-2" }),
      ];
      setupModelWithNodes(nodes);
      extendedSelectionManager.onNodeClicked(nodes[0].id, eventMock.object);
      const spy = vi.spyOn(
        extendedSelectionManager.onSelectionReplaced,
        "emit"
      );
      keyEventMock.setup((x) => x.key).returns(() => Key.End);
      keyEventMock.setup((x) => x.shiftKey).returns(() => false);
      keyEventMock.setup((x) => x.ctrlKey).returns(() => false);
      extendedSelectionManager.onTreeKeyDown(
        keyEventMock.object,
        treeActionsMock.object
      );
      extendedSelectionManager.onTreeKeyUp(
        keyEventMock.object,
        treeActionsMock.object
      );
      expect(spy).toHaveBeenCalledWith({ selectedNodeIds: [nodes[1].id] });
    });

    it("Right should expand node", () => {
      const node = createTreeModelNode({ numChildren: 1, isExpanded: false });
      setupModelWithNodes([node]);
      extendedSelectionManager.onNodeClicked(node.id, eventMock.object);
      keyEventMock.setup((x) => x.key).returns(() => Key.ArrowRight);
      keyEventMock.setup((x) => x.shiftKey).returns(() => false);
      keyEventMock.setup((x) => x.ctrlKey).returns(() => false);
      const spy = vi.fn();
      treeActionsMock.setup((x) => x.onNodeExpanded).returns(() => spy);
      extendedSelectionManager.onTreeKeyDown(
        keyEventMock.object,
        treeActionsMock.object
      );
      extendedSelectionManager.onTreeKeyUp(
        keyEventMock.object,
        treeActionsMock.object
      );
      expect(spy).toHaveBeenCalledWith(node.id);
    });

    it("Right should not expand node if already expanded", () => {
      const node = createTreeModelNode({ numChildren: 1, isExpanded: true });
      setupModelWithNodes([node]);
      extendedSelectionManager.onNodeClicked(node.id, eventMock.object);
      keyEventMock.setup((x) => x.key).returns(() => Key.ArrowRight);
      keyEventMock.setup((x) => x.shiftKey).returns(() => false);
      keyEventMock.setup((x) => x.ctrlKey).returns(() => false);
      const spy = vi.fn();
      treeActionsMock.setup((x) => x.onNodeExpanded).returns(() => spy);
      extendedSelectionManager.onTreeKeyDown(
        keyEventMock.object,
        treeActionsMock.object
      );
      extendedSelectionManager.onTreeKeyUp(
        keyEventMock.object,
        treeActionsMock.object
      );
      expect(spy).not.toBeCalled();
    });

    it("Left should collapse node", () => {
      const node = createTreeModelNode({ numChildren: 1, isExpanded: true });
      setupModelWithNodes([node]);
      extendedSelectionManager.onNodeClicked(node.id, eventMock.object);
      keyEventMock.setup((x) => x.key).returns(() => Key.ArrowLeft);
      keyEventMock.setup((x) => x.shiftKey).returns(() => false);
      keyEventMock.setup((x) => x.ctrlKey).returns(() => false);
      const spy = vi.fn();
      treeActionsMock.setup((x) => x.onNodeCollapsed).returns(() => spy);
      extendedSelectionManager.onTreeKeyDown(
        keyEventMock.object,
        treeActionsMock.object
      );
      extendedSelectionManager.onTreeKeyUp(
        keyEventMock.object,
        treeActionsMock.object
      );
      expect(spy).toHaveBeenCalledWith(node.id);
    });

    it("Left should not collapse node if already collapsed", () => {
      const node = createTreeModelNode({ numChildren: 1, isExpanded: false });
      setupModelWithNodes([node]);
      extendedSelectionManager.onNodeClicked(node.id, eventMock.object);
      keyEventMock.setup((x) => x.key).returns(() => Key.ArrowLeft);
      keyEventMock.setup((x) => x.shiftKey).returns(() => false);
      keyEventMock.setup((x) => x.ctrlKey).returns(() => false);
      const spy = vi.fn();
      treeActionsMock.setup((x) => x.onNodeCollapsed).returns(() => spy);
      extendedSelectionManager.onTreeKeyDown(
        keyEventMock.object,
        treeActionsMock.object
      );
      extendedSelectionManager.onTreeKeyUp(
        keyEventMock.object,
        treeActionsMock.object
      );
      expect(spy).not.toBeCalled();
    });

    it("Space should expand node if collapsed", () => {
      const node = createTreeModelNode({ numChildren: 1, isExpanded: false });
      setupModelWithNodes([node]);
      extendedSelectionManager.onNodeClicked(node.id, eventMock.object);
      keyEventMock.setup((x) => x.key).returns(() => " ");
      keyEventMock.setup((x) => x.shiftKey).returns(() => false);
      keyEventMock.setup((x) => x.ctrlKey).returns(() => false);
      const spy = vi.fn();
      treeActionsMock.setup((x) => x.onNodeExpanded).returns(() => spy);
      extendedSelectionManager.onTreeKeyDown(
        keyEventMock.object,
        treeActionsMock.object
      );
      extendedSelectionManager.onTreeKeyUp(
        keyEventMock.object,
        treeActionsMock.object
      );
      expect(spy).toHaveBeenCalledWith(node.id);
    });

    it("Space should collapse node if expanded", () => {
      const node = createTreeModelNode({ numChildren: 1, isExpanded: true });
      setupModelWithNodes([node]);
      extendedSelectionManager.onNodeClicked(node.id, eventMock.object);
      keyEventMock.setup((x) => x.key).returns(() => " ");
      keyEventMock.setup((x) => x.shiftKey).returns(() => false);
      keyEventMock.setup((x) => x.ctrlKey).returns(() => false);
      const spy = vi.fn();
      treeActionsMock.setup((x) => x.onNodeCollapsed).returns(() => spy);
      extendedSelectionManager.onTreeKeyDown(
        keyEventMock.object,
        treeActionsMock.object
      );
      extendedSelectionManager.onTreeKeyUp(
        keyEventMock.object,
        treeActionsMock.object
      );
      expect(spy).toHaveBeenCalledWith(node.id);
    });

    it("Right should not do anything on a leaf node", () => {
      const node = createTreeModelNode({ numChildren: 0, isExpanded: false });
      setupModelWithNodes([node]);
      extendedSelectionManager.onNodeClicked(node.id, eventMock.object);
      keyEventMock.setup((x) => x.key).returns(() => Key.ArrowRight);
      keyEventMock.setup((x) => x.shiftKey).returns(() => false);
      keyEventMock.setup((x) => x.ctrlKey).returns(() => false);
      const spyExpanded = vi.fn();
      const spyCollapsed = vi.fn();
      treeActionsMock.setup((x) => x.onNodeExpanded).returns(() => spyExpanded);
      treeActionsMock
        .setup((x) => x.onNodeCollapsed)
        .returns(() => spyCollapsed);
      extendedSelectionManager.onTreeKeyDown(
        keyEventMock.object,
        treeActionsMock.object
      );
      extendedSelectionManager.onTreeKeyUp(
        keyEventMock.object,
        treeActionsMock.object
      );
      expect(spyExpanded).not.toBeCalled();
      expect(spyCollapsed).not.toBeCalled();
    });

    it("Space should start editing on a leaf node", () => {
      const node = createTreeModelNode({ numChildren: 0, isExpanded: false });
      setupModelWithNodes([node]);
      extendedSelectionManager.onNodeClicked(node.id, eventMock.object);
      keyEventMock.setup((x) => x.key).returns(() => " ");
      keyEventMock.setup((x) => x.shiftKey).returns(() => false);
      keyEventMock.setup((x) => x.ctrlKey).returns(() => false);
      const spyEditorActivated = vi.fn();
      treeActionsMock
        .setup((x) => x.onNodeEditorActivated)
        .returns(() => spyEditorActivated);
      extendedSelectionManager.onTreeKeyDown(
        keyEventMock.object,
        treeActionsMock.object
      );
      extendedSelectionManager.onTreeKeyUp(
        keyEventMock.object,
        treeActionsMock.object
      );
      expect(spyEditorActivated).toHaveBeenCalledWith(node.id);
    });
  });
});

describe("isRangeSelection", () => {
  it("returns true for RangeSelection", () => {
    const rangeSelection: RangeSelection = {
      from: "node-1",
      to: "node-5",
    };
    expect(isRangeSelection(rangeSelection)).toEqual(true);
  });

  it("returns false for IndividualSelection", () => {
    const individualSelection: IndividualSelection = ["node-1"];
    expect(isRangeSelection(individualSelection)).toEqual(false);
  });
});
