/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as moq from "typemoq";
import { PropertyRecord } from "@itwin/appui-abstract";
import { CheckBoxState } from "@itwin/core-react";
import type { SparseTree } from "../../../components-react/tree/controlled/internal/SparseTree.js";
import { SparseArray } from "../../../components-react/tree/controlled/internal/SparseTree.js";
import type {
  MutableTreeModelNode,
  TreeModel,
  TreeModelNode,
  TreeModelNodeInput,
  TreeModelNodePlaceholder,
  TreeModelRootNode,
} from "../../../components-react/tree/controlled/TreeModel.js";
import {
  computeVisibleNodes,
  isTreeModelNode,
  isTreeModelNodePlaceholder,
  isTreeModelRootNode,
  MutableTreeModel,
} from "../../../components-react/tree/controlled/TreeModel.js";
import { createTestMutableTreeModelNode } from "./TreeHelpers.js";

const createTreeModelNode = (
  parentNode: TreeModelNode | TreeModelRootNode,
  input: TreeModelNodeInput
): MutableTreeModelNode => {
  return {
    id: input.id,
    parentId: parentNode.id,
    depth: parentNode.depth + 1,

    isLoading: input.isLoading,
    numChildren: input.numChildren,

    description: input.description || "",
    isExpanded: input.isExpanded,
    label: input.label,
    isSelected: input.isSelected,
    isSelectionDisabled: input.item.isSelectionDisabled,

    checkbox: {
      state: input.item.checkBoxState || CheckBoxState.Off,
      isDisabled: !!input.item.isCheckboxDisabled,
      isVisible: !!input.item.isCheckboxVisible,
    },

    item: input.item,
  };
};

function createTreeModelNodeInput(id: string): TreeModelNodeInput {
  return {
    id,
    isExpanded: false,
    isLoading: false,
    isSelected: false,
    item: { id } as any,
    label: {} as any,
  };
}

describe("MutableTreeModel", () => {
  let treeModel: MutableTreeModel;
  const treeMock = moq.Mock.ofType<SparseTree<MutableTreeModelNode>>();
  const sparseArrayMock = moq.Mock.ofType<SparseArray<string>>();

  let rootNode: MutableTreeModelNode;
  let childNode: MutableTreeModelNode;
  let rootNodesArray: SparseArray<string>;
  let childNodesArray: SparseArray<string>;

  beforeEach(() => {
    treeMock.reset();
    sparseArrayMock.reset();
    treeModel = new MutableTreeModel();
    (treeModel as any)._tree = treeMock.object;

    rootNode = createTestMutableTreeModelNode({ label: "Root-1" });
    childNode = createTestMutableTreeModelNode({
      parentNodeId: rootNode.id,
      label: "Child-1",
    });
    rootNodesArray = new SparseArray<string>();
    rootNodesArray.set(0, rootNode.id);
    childNodesArray = new SparseArray<string>();
    childNodesArray.set(0, childNode.id);
  });

  describe("constructor", () => {
    it("clones empty seed model", () => {
      const seedModel = new MutableTreeModel();
      seedModel.setNumChildren(undefined, 0);
      treeModel = new MutableTreeModel(seedModel);
      expect(treeModel.getRootNode().numChildren).toEqual(0);
      expect(treeModel.getChildren(undefined)?.getLength()).toEqual(0);
    });

    it("clones populated seed model", () => {
      const seedModel = new MutableTreeModel();
      seedModel.setChildren(
        undefined,
        [createTreeModelNodeInput("root1"), createTreeModelNodeInput("root2")],
        0
      );
      seedModel.setNumChildren("root1", 1);
      seedModel.setChildren(
        "root1",
        [{ ...createTreeModelNodeInput("child1"), numChildren: 0 }],
        0
      );
      treeModel = new MutableTreeModel(seedModel);
      expect(treeModel.getRootNode().numChildren).toEqual(2);
      expect(treeModel.getNode("root1")?.numChildren).toEqual(1);
      expect(treeModel.getNode("root2")?.numChildren).toEqual(undefined);
      expect(treeModel.getNode("child1")?.numChildren).toEqual(0);
    });
  });

  describe("getRootNode", () => {
    it("returns empty root node", () => {
      const node = treeModel.getRootNode();
      expect(node).toBeTruthy();
      expect(node.depth).toEqual(-1);
      expect(node.numChildren).toEqual(undefined);
      expect(node.id).toEqual(undefined);
    });
  });

  describe("getNode", () => {
    it("returns root node", () => {
      treeMock
        .setup((x) => x.getNode(rootNode.id))
        .returns(() => rootNode)
        .verifiable(moq.Times.once());
      const node = treeModel.getNode(rootNode.id);
      treeMock.verifyAll();
      expect(node).to.deep.eq(rootNode);
    });

    it("returns child node", () => {
      treeMock
        .setup((x) => x.getChildren(rootNode.id))
        .returns(() => childNodesArray)
        .verifiable(moq.Times.once());
      treeMock
        .setup((x) => x.getNode(childNode.id))
        .returns(() => childNode)
        .verifiable(moq.Times.once());
      const node = treeModel.getNode(rootNode.id, 0);
      treeMock.verifyAll();
      expect(node).to.deep.eq(childNode);
    });

    it("returns placeholder child node", () => {
      treeMock
        .setup((x) => x.getChildren(rootNode.id))
        .returns(() => undefined)
        .verifiable(moq.Times.once());
      treeMock
        .setup((x) => x.getNode(rootNode.id))
        .returns(() => rootNode)
        .verifiable(moq.Times.once());
      const node = treeModel.getNode(rootNode.id, 1);
      treeMock.verifyAll();
      expect(isTreeModelNodePlaceholder(node)).toEqual(true);
    });

    it("returns placeholder root node", () => {
      treeMock
        .setup((x) => x.getChildren(undefined))
        .returns(() => new SparseArray<string>())
        .verifiable(moq.Times.once());
      const node = treeModel.getNode(undefined, 0);
      treeMock.verifyAll();
      expect(isTreeModelNodePlaceholder(node)).toEqual(true);
    });

    it("returns undefined if node cannot be found", () => {
      treeMock
        .setup((x) => x.getChildren(rootNode.id))
        .returns(() => new SparseArray<string>())
        .verifiable(moq.Times.once());
      const node = treeModel.getNode(rootNode.id, 0);
      treeMock.verifyAll();
      expect(node).toEqual(undefined);
    });
  });

  describe("getChildren", () => {
    it("call tree for children", () => {
      const parentId = "parent-1";
      treeMock
        .setup((x) => x.getChildren(parentId))
        .verifiable(moq.Times.once());
      treeModel.getChildren(parentId);
      treeMock.verifyAll();
    });
  });

  describe("getChildOffset", () => {
    it("calls tree for child offset", () => {
      const parentId = "parent-1";
      const childId = "child-1";
      treeMock
        .setup((x) => x.getChildOffset(parentId, childId))
        .verifiable(moq.Times.once());
      treeModel.getChildOffset(parentId, childId);
      treeMock.verifyAll();
    });
  });

  describe("setChildren", () => {
    it("sets root nodes", () => {
      treeMock
        .setup((x) =>
          x.setChildren(
            undefined,
            [createTreeModelNode(treeModel.getRootNode(), rootNode)],
            0
          )
        )
        .verifiable(moq.Times.once());
      treeModel.setChildren(undefined, [rootNode], 0);
      treeMock.verifyAll();
    });

    it("sets children for root node", () => {
      const children = [childNode];
      treeMock
        .setup((x) => x.getNode(rootNode.id))
        .returns(() => rootNode)
        .verifiable(moq.Times.once());
      treeMock
        .setup((x) =>
          x.setChildren(
            rootNode.id,
            [createTreeModelNode(rootNode, childNode)],
            0
          )
        )
        .verifiable(moq.Times.once());
      treeModel.setChildren(rootNode.id, children, 0);
      treeMock.verifyAll();
    });

    it("sets children from TreeModelNodeInput", () => {
      const input: TreeModelNodeInput = {
        id: "root-1",
        isExpanded: true,
        label: PropertyRecord.fromString("Root 1", "label"),
        isLoading: true,
        isSelected: false,
        item: {
          id: "root-1",
          label: PropertyRecord.fromString("Root 1", "label"),
        },
      };

      treeMock
        .setup((x) =>
          x.setChildren(
            undefined,
            [createTreeModelNode(treeModel.getRootNode(), input)],
            0
          )
        )
        .verifiable(moq.Times.once());
      treeModel.setChildren(undefined, [input], 0);
      treeMock.verifyAll();
    });

    it("does not set children if parent does not exist", () => {
      const children = [childNode];
      treeMock
        .setup((x) => x.getNode(rootNode.id))
        .returns(() => undefined)
        .verifiable(moq.Times.once());
      treeMock
        .setup((x) =>
          x.setChildren(
            rootNode.id,
            [createTreeModelNode(rootNode, childNode)],
            0
          )
        )
        .verifiable(moq.Times.never());
      treeModel.setChildren(rootNode.id, children, 0);
      treeMock.verifyAll();
    });
  });

  describe("insertChild", () => {
    it("inserts root node", () => {
      const childCountBefore = 5;
      treeModel.setNumChildren(undefined, childCountBefore);
      treeMock
        .setup((x) =>
          x.insertChild(
            undefined,
            createTreeModelNode(treeModel.getRootNode(), rootNode),
            0
          )
        )
        .verifiable(moq.Times.once());
      treeMock
        .setup((x) => x.getChildren(undefined))
        .returns(() => sparseArrayMock.object);
      sparseArrayMock
        .setup((x) => x.getLength())
        .returns(() => childCountBefore + 1);

      treeModel.insertChild(undefined, rootNode, 0);
      treeMock.verifyAll();
      expect(treeModel.getRootNode().numChildren!).toEqual(
        childCountBefore + 1
      );
    });

    it("inserts child for root node", () => {
      const childCountBefore = rootNode.numChildren!;
      treeMock
        .setup((x) => x.getNode(rootNode.id))
        .returns(() => rootNode)
        .verifiable(moq.Times.once());
      treeMock
        .setup((x) =>
          x.insertChild(
            rootNode.id,
            createTreeModelNode(rootNode, childNode),
            0
          )
        )
        .verifiable(moq.Times.once());
      treeMock
        .setup((x) => x.getChildren(rootNode.id))
        .returns(() => sparseArrayMock.object);
      sparseArrayMock
        .setup((x) => x.getLength())
        .returns(() => childCountBefore + 1);

      treeModel.insertChild(rootNode.id, childNode, 0);
      treeMock.verifyAll();
      expect(rootNode.numChildren).toEqual(childCountBefore + 1);
    });

    it("inserts children from TreeModelNodeInput", () => {
      const input: TreeModelNodeInput = {
        id: "root-1",
        isExpanded: false,
        label: PropertyRecord.fromString("Root 1", "label"),
        isLoading: false,
        isSelected: true,
        item: {
          id: "root-1",
          label: PropertyRecord.fromString("Root 1", "label"),
        },
      };

      treeMock
        .setup((x) =>
          x.insertChild(
            undefined,
            createTreeModelNode(treeModel.getRootNode(), input),
            0
          )
        )
        .verifiable(moq.Times.once());
      treeModel.insertChild(undefined, input, 0);
      treeMock.verifyAll();
    });

    it("does not insert child if parent does not exist", () => {
      treeMock
        .setup((x) => x.getNode(rootNode.id))
        .returns(() => undefined)
        .verifiable(moq.Times.once());
      treeMock
        .setup((x) =>
          x.insertChild(
            rootNode.id,
            createTreeModelNode(rootNode, childNode),
            0
          )
        )
        .verifiable(moq.Times.never());
      treeModel.insertChild(rootNode.id, childNode, 0);
      treeMock.verifyAll();
    });
  });

  describe("changeNodeId", () => {
    beforeEach(() => {
      treeModel = new MutableTreeModel();
    });

    it("does nothing when target node does not exist and returns `false`", () => {
      const resultStatus = treeModel.changeNodeId("testId", "newId");
      expect(resultStatus).toEqual(false);
      expect(treeModel.getNode("newId")).toEqual(undefined);
    });

    it("does nothing when node with the same id already exists and returns `false`", () => {
      const existingNode = createTreeModelNodeInput("existingNode");
      treeModel.insertChild(undefined, existingNode, 0);
      const targetNode = createTreeModelNodeInput("targetNode");
      treeModel.insertChild(undefined, targetNode, 1);

      const resultStatus = treeModel.changeNodeId("targetNode", "existingNode");

      expect(resultStatus).toEqual(false);
      expect(treeModel.getNode("existingNode")!.item).to.be.deep.equal(
        existingNode.item
      );
      expect(treeModel.getNode("targetNode")!.item).to.be.deep.equal(
        targetNode.item
      );
    });

    it("does nothing if equal ids are passed", () => {
      const nodeInput = createTreeModelNodeInput("testId");
      treeModel.insertChild(undefined, nodeInput, 0);
      const resultStatus = treeModel.changeNodeId("testId", "testId");

      expect(resultStatus).toEqual(true);
      expect(treeModel.getNode("testId")!.item).to.be.deep.equal(
        nodeInput.item
      );
    });

    it("changes node id", () => {
      const nodeInput = createTreeModelNodeInput("testId");
      treeModel.insertChild(undefined, nodeInput, 0);
      const resultStatus = treeModel.changeNodeId("testId", "newId");

      expect(resultStatus).toEqual(true);
      expect(treeModel.getNode("testId")).toEqual(undefined);
      expect(treeModel.getNode("newId")!.item).to.be.deep.equal(nodeInput.item);
      expect(treeModel.getNode("newId")!.id).toEqual("newId");
    });

    it("updates hierarchy", () => {
      treeModel.setChildren(undefined, [createTreeModelNodeInput("root1")], 0);
      treeModel.setChildren("root1", [createTreeModelNodeInput("child1")], 0);
      treeModel.setChildren(
        "child1",
        [createTreeModelNodeInput("grandchild1")],
        0
      );

      const resultStatus = treeModel.changeNodeId("child1", "updated_id");

      expect(resultStatus).toEqual(true);
      expect(treeModel.getChildren("child1")).toEqual(undefined);
      expect([...treeModel.getChildren(undefined)!]).to.be.deep.equal([
        "root1",
      ]);
      expect([...treeModel.getChildren("root1")!]).to.be.deep.equal([
        "updated_id",
      ]);
      expect([...treeModel.getChildren("updated_id")!]).to.be.deep.equal([
        "grandchild1",
      ]);
      expect(treeModel.getNode("grandchild1")!.parentId).toEqual("updated_id");
    });
  });

  describe("moveNode", () => {
    beforeEach(() => {
      treeModel = new MutableTreeModel();
      treeModel.setChildren(
        undefined,
        [createTreeModelNodeInput("root1"), createTreeModelNodeInput("root2")],
        0
      );
      treeModel.setChildren(
        "root1",
        [
          createTreeModelNodeInput("child1"),
          createTreeModelNodeInput("child2"),
        ],
        0
      );
      treeModel.setChildren("root2", [], 0);
    });

    it("does nothing when source node does not exist and returns `false`", () => {
      const resultStatus = treeModel.moveNode(
        "not_existing_node_id",
        "root1",
        1
      );
      expect(resultStatus).toEqual(false);
      expect([...treeModel.getChildren("root1")!]).to.be.deep.equal([
        "child1",
        "child2",
      ]);
    });

    it("does nothing when target parent node does not exist and returns `false`", () => {
      const resultStatus = treeModel.moveNode(
        "child1",
        "not_existing_node_id",
        0
      );
      expect(resultStatus).toEqual(false);
      expect([...treeModel.getChildren("root1")!]).to.be.deep.equal([
        "child1",
        "child2",
      ]);
    });

    it("does nothing when target parent node has `undefined` child count and returns `false`", () => {
      treeModel.setNumChildren("root2", undefined);

      const resultStatus = treeModel.moveNode("root1", "root2", 0);

      expect(resultStatus).toEqual(false);
      expect([...treeModel.getChildren(undefined)!]).to.be.deep.equal([
        "root1",
        "root2",
      ]);
      expect([...treeModel.getChildren("root2")!]).to.be.deep.equal([]);
    });

    it("does nothing when attempting to create a cycle and returns `false`", () => {
      // Make hierarchy deeper so that ancestry is not direct and thus requires more work to detect
      treeModel.insertChild(
        "child2",
        createTreeModelNodeInput("grandchild1"),
        0
      );
      treeModel.setChildren("grandchild1", [], 0);

      const resultStatus = treeModel.moveNode("root1", "grandchild1", 0);

      expect(resultStatus).toEqual(false);
      expect([...treeModel.getChildren(undefined)!]).to.be.deep.equal([
        "root1",
        "root2",
      ]);
      expect([...treeModel.getChildren("grandchild1")!]).to.be.deep.equal([]);
    });

    it("moves to hierarchy root", () => {
      const resultStatus = treeModel.moveNode("child1", undefined, 0);

      expect(resultStatus).toEqual(true);

      expect(treeModel.getRootNode().numChildren).toEqual(3);
      expect([...treeModel.getChildren(undefined)!]).to.be.deep.equal([
        "child1",
        "root1",
        "root2",
      ]);

      expect(treeModel.getNode("root1")!.numChildren).toEqual(1);
      expect([...treeModel.getChildren("root1")!]).to.be.deep.equal(["child2"]);

      expect(treeModel.getNode("child1")!.depth).toEqual(0);
      expect(treeModel.getNode("child1")!.parentId).toEqual(undefined);
    });

    it("moves to non-hierarchy root", () => {
      const resultStatus = treeModel.moveNode("root1", "root2", 0);

      expect(resultStatus).toEqual(true);
      expect(treeModel.getRootNode().numChildren).toEqual(1);
      expect([...treeModel.getChildren(undefined)!]).to.be.deep.equal([
        "root2",
      ]);

      expect(treeModel.getNode("root2")!.numChildren).toEqual(1);
      expect([...treeModel.getChildren("root2")!]).to.be.deep.equal(["root1"]);

      expect(treeModel.getNode("root1")!.depth).toEqual(1);
      expect(treeModel.getNode("root1")!.parentId).toEqual("root2");
      expect([...treeModel.getChildren("root1")!]).to.be.deep.equal([
        "child1",
        "child2",
      ]);

      expect(treeModel.getNode("child1")!.depth).toEqual(2);
      expect(treeModel.getNode("child2")!.depth).toEqual(2);
    });

    it("moves to position beyond last one", () => {
      const resultStatus = treeModel.moveNode("child1", "root1", 3);

      expect(resultStatus).toEqual(true);
      expect(treeModel.getNode("root1")!.numChildren).toEqual(3);
      expect([...treeModel.getChildren("root1")!]).to.be.deep.equal([
        "child2",
        undefined,
        "child1",
      ]);
    });
  });

  describe("setNumChildren", () => {
    beforeEach(() => {
      treeModel = new MutableTreeModel();
      treeModel.setChildren(
        undefined,
        [createTreeModelNodeInput("root1"), createTreeModelNodeInput("root2")],
        0
      );
      treeModel.setChildren(
        "root1",
        [
          createTreeModelNodeInput("child1"),
          createTreeModelNodeInput("child2"),
        ],
        0
      );
    });

    it("does nothing if node with given id does not exist", () => {
      treeModel.setNumChildren("notExistingNode", 10);
      expect(treeModel.getNode("notExistingNode")).toEqual(undefined);
      expect(treeModel.getChildren("notExistingNode")).toEqual(undefined);
    });

    describe("when `numChildren` is a number", () => {
      it("removes all children", () => {
        treeModel.setNumChildren("root1", 10);
        expect(treeModel.getChildren("root1")?.getLength()).toEqual(10);
        expect(treeModel.getNode("child1")).toEqual(undefined);
        expect(treeModel.getNode("child2")).toEqual(undefined);
      });

      it("changes child count of root node", () => {
        treeModel.setNumChildren(undefined, 10);
        const children = treeModel.getChildren(undefined)!;
        expect(children.getLength()).toEqual(10);
        expect(treeModel.getRootNode().numChildren).to.equal(10);
      });

      it("changes child count of parent node", () => {
        treeModel.setNumChildren("root1", 10);
        const children = treeModel.getChildren("root1")!;
        expect(children.getLength()).toEqual(10);
        expect(treeModel.getNode("root1")!.numChildren).to.equal(10);
      });
    });

    describe("when `numChildren` is `undefined`", () => {
      it("sets child count and removes all root nodes", () => {
        treeModel.setNumChildren(undefined, undefined);
        expect(treeModel.getChildren(undefined)?.getLength()).toEqual(0);
        expect(treeModel.getRootNode().numChildren).toEqual(undefined);
        expect(treeModel.getNode("root1")).toEqual(undefined);
        expect(treeModel.getNode("root2")).toEqual(undefined);
      });

      it("sets child count and removes all child nodes", () => {
        treeModel.setNumChildren("root1", undefined);
        expect(treeModel.getChildren("root1")?.getLength()).toEqual(0);
        expect(treeModel.getNode("root1")!.numChildren).toEqual(undefined);
        expect(treeModel.getNode("child1")).toEqual(undefined);
        expect(treeModel.getNode("child2")).toEqual(undefined);
      });
    });
  });

  describe("removeChild", () => {
    it("removes root node", () => {
      const childCountBefore = 5;
      treeModel.setNumChildren(undefined, childCountBefore);
      treeMock
        .setup((x) => x.removeChild(undefined, rootNode.id))
        .verifiable(moq.Times.once());
      treeMock
        .setup((x) => x.getChildren(undefined))
        .returns(() => sparseArrayMock.object);
      sparseArrayMock
        .setup((x) => x.getLength())
        .returns(() => childCountBefore - 1);

      treeModel.removeChild(undefined, rootNode.id);
      treeMock.verifyAll();
      expect(treeModel.getRootNode().numChildren!).toEqual(
        childCountBefore - 1
      );
    });

    it("removes root node child", () => {
      const childCountBefore = rootNode.numChildren!;
      treeMock
        .setup((x) => x.getNode(rootNode.id))
        .returns(() => rootNode)
        .verifiable(moq.Times.once());
      treeMock
        .setup((x) => x.removeChild(rootNode.id, childNode.id))
        .verifiable(moq.Times.once());
      treeMock
        .setup((x) => x.getChildren(rootNode.id))
        .returns(() => sparseArrayMock.object);
      sparseArrayMock
        .setup((x) => x.getLength())
        .returns(() => childCountBefore - 1);

      treeModel.removeChild(rootNode.id, childNode.id);
      treeMock.verifyAll();
      expect(rootNode.numChildren).toEqual(childCountBefore - 1);
    });

    it("removes node by index", () => {
      treeModel = new MutableTreeModel();
      treeModel.setChildren(
        undefined,
        [createTreeModelNodeInput("root1"), createTreeModelNodeInput("root2")],
        0
      );

      treeModel.removeChild(undefined, 0);
      expect([...treeModel.getChildren(undefined)!]).to.be.deep.equal([
        "root2",
      ]);
    });
  });

  describe("clearChildren", () => {
    it("clears root nodes", () => {
      treeMock
        .setup((x) => x.deleteSubtree(undefined, false))
        .verifiable(moq.Times.once());
      treeModel.clearChildren(undefined);
      treeMock.verifyAll();
    });

    it("clears root node children", () => {
      treeMock
        .setup((x) => x.getNode(rootNode.id))
        .returns(() => rootNode)
        .verifiable(moq.Times.once());
      treeMock
        .setup((x) => x.deleteSubtree(rootNode.id, false))
        .verifiable(moq.Times.once());
      treeModel.clearChildren(rootNode.id);
      treeMock.verifyAll();
    });

    it("clears children for removed root node", () => {
      treeMock
        .setup((x) => x.getNode(rootNode.id))
        .returns(() => undefined)
        .verifiable(moq.Times.once());
      treeMock
        .setup((x) => x.deleteSubtree(rootNode.id, false))
        .verifiable(moq.Times.once());
      treeModel.clearChildren(rootNode.id);
      treeMock.verifyAll();
    });
  });

  describe("iterateTreeModelNodes", () => {
    it("iterates nodes", () => {
      treeMock
        .setup((x) => x.getChildren(undefined))
        .returns(() => rootNodesArray)
        .verifiable(moq.Times.once());
      treeMock
        .setup((x) => x.getNode(rootNode.id))
        .returns(() => rootNode)
        .verifiable(moq.Times.once());
      treeMock
        .setup((x) => x.getChildren(rootNode.id))
        .returns(() => childNodesArray)
        .verifiable(moq.Times.once());
      treeMock
        .setup((x) => x.getNode(childNode.id))
        .returns(() => childNode)
        .verifiable(moq.Times.once());
      treeMock
        .setup((x) => x.getChildren(childNode.id))
        .returns(() => undefined)
        .verifiable(moq.Times.once());

      let index = 0;
      const expectedNodes = [rootNode, childNode];
      for (const node of treeModel.iterateTreeModelNodes()) {
        expect(node).to.deep.eq(expectedNodes[index]);
        index++;
      }
      treeMock.verifyAll();
    });

    it("tries to iterate over removed node", () => {
      treeMock
        .setup((x) => x.getChildren(undefined))
        .returns(() => rootNodesArray)
        .verifiable(moq.Times.once());
      treeMock
        .setup((x) => x.getNode(rootNode.id))
        .returns(() => undefined)
        .verifiable(moq.Times.once());
      let index = 0;
      for (const _ of treeModel.iterateTreeModelNodes()) {
        index++;
      }
      expect(index).toEqual(0);
    });
  });
});

describe("computeVisibleNodes", () => {
  const treeModelMock = moq.Mock.ofType<TreeModel>();
  let rootNode: MutableTreeModelNode;
  let rootNodesArray: SparseArray<string>;
  let childNode: MutableTreeModelNode;
  let childNodesArray: SparseArray<string>;

  beforeEach(() => {
    treeModelMock.reset();
    treeModelMock
      .setup((x) => x.getRootNode())
      .returns(() => ({
        id: undefined,
        depth: -1,
        numChildren: rootNodesArray.getLength(),
      }));

    rootNode = createTestMutableTreeModelNode({ label: "Root-1" });
    rootNodesArray = new SparseArray<string>();
    rootNodesArray.set(0, rootNode.id);

    childNode = createTestMutableTreeModelNode({
      parentNodeId: rootNode.id,
      label: "Child-1",
    });
    childNodesArray = new SparseArray<string>();
    childNodesArray.set(0, childNode.id);
  });

  describe("visible nodes callbacks", () => {
    beforeEach(() => {
      treeModelMock
        .setup((x) => x.getNode(rootNode.id))
        .returns(() => rootNode);
      treeModelMock
        .setup((x) => x.getChildren(undefined))
        .returns(() => rootNodesArray);
      rootNode = { ...rootNode, isExpanded: false };
    });

    it("getNumNodes", () => {
      const visibleNodes = computeVisibleNodes(treeModelMock.object);
      expect(visibleNodes.getNumNodes()).toEqual(1);
    });

    it("getAtIndex with number index", () => {
      const visibleNodes = computeVisibleNodes(treeModelMock.object);
      expect(visibleNodes.getAtIndex(0)).to.deep.eq(rootNode);
    });

    it("getModel", () => {
      const visibleNodes = computeVisibleNodes(treeModelMock.object);
      expect(visibleNodes.getModel()).to.deep.eq(treeModelMock.object);
    });

    it("getNumRootNodes", () => {
      rootNodesArray.setLength(5);
      const visibleNodes = computeVisibleNodes(treeModelMock.object);
      expect(visibleNodes.getNumRootNodes()).toEqual(5);
    });

    it("getIndexOfNode", () => {
      const visibleNodes = computeVisibleNodes(treeModelMock.object);
      expect(visibleNodes.getIndexOfNode(rootNode.id)).toEqual(0);
    });

    it("iterator", () => {
      const visibleNodes = computeVisibleNodes(treeModelMock.object);
      for (const node of visibleNodes) expect(node).to.deep.eq(rootNode);
    });
  });

  it("returns visible collapsed root node", () => {
    rootNode = { ...rootNode, isExpanded: false };
    treeModelMock
      .setup((x) => x.getChildren(undefined))
      .returns(() => rootNodesArray)
      .verifiable(moq.Times.once());
    treeModelMock
      .setup((x) => x.getNode(rootNode.id))
      .returns(() => rootNode)
      .verifiable(moq.Times.once());

    const result = computeVisibleNodes(treeModelMock.object);
    treeModelMock.verifyAll();

    expect(result.getNumNodes()).toEqual(1);
    const visibleNode = result.getAtIndex(0);
    expect((visibleNode as TreeModelNode).id).toEqual(rootNode.id);
    expect(result.getModel()).toEqual(treeModelMock.object);
  });

  it("returns visible expanded root node without children", () => {
    rootNode = { ...rootNode, isExpanded: true };
    treeModelMock
      .setup((x) => x.getChildren(undefined))
      .returns(() => rootNodesArray)
      .verifiable(moq.Times.once());
    treeModelMock
      .setup((x) => x.getNode(rootNode.id))
      .returns(() => rootNode)
      .verifiable(moq.Times.once());
    treeModelMock
      .setup((x) => x.getChildren(rootNode.id))
      .returns(() => new SparseArray<string>())
      .verifiable(moq.Times.once());

    const result = computeVisibleNodes(treeModelMock.object);
    treeModelMock.verifyAll();
    expect(result.getNumNodes()).toEqual(1);
  });

  it("returns visible expanded root node and child node", () => {
    rootNode = { ...rootNode, isExpanded: true, numChildren: 1 };
    childNode = { ...childNode, isExpanded: false };
    treeModelMock
      .setup((x) => x.getChildren(undefined))
      .returns(() => rootNodesArray)
      .verifiable(moq.Times.once());
    treeModelMock
      .setup((x) => x.getNode(rootNode.id))
      .returns(() => rootNode)
      .verifiable(moq.Times.once());
    treeModelMock
      .setup((x) => x.getChildren(rootNode.id))
      .returns(() => childNodesArray)
      .verifiable(moq.Times.once());
    treeModelMock
      .setup((x) => x.getNode(childNode.id))
      .returns(() => childNode)
      .verifiable(moq.Times.once());

    const result = computeVisibleNodes(treeModelMock.object);
    treeModelMock.verifyAll();
    expect(result.getNumNodes()).toEqual(2);
  });

  it("returns visible expanded root node and placeholder child node if child node was disposed", () => {
    rootNode = { ...rootNode, isExpanded: true, numChildren: 1 };
    childNode = { ...childNode, isExpanded: false };
    treeModelMock
      .setup((x) => x.getChildren(undefined))
      .returns(() => rootNodesArray)
      .verifiable(moq.Times.once());
    treeModelMock
      .setup((x) => x.getNode(rootNode.id))
      .returns(() => rootNode)
      .verifiable(moq.Times.once());
    treeModelMock
      .setup((x) => x.getChildren(rootNode.id))
      .returns(() => childNodesArray)
      .verifiable(moq.Times.once());
    treeModelMock
      .setup((x) => x.getNode(childNode.id))
      .returns(() => undefined)
      .verifiable(moq.Times.once());

    const result = computeVisibleNodes(treeModelMock.object);
    treeModelMock.verifyAll();
    expect(result.getNumNodes()).toEqual(2);
    expect(isTreeModelNode(result.getAtIndex(0))).toEqual(true);
    expect(isTreeModelNodePlaceholder(result.getAtIndex(1))).toEqual(true);
  });

  it("returns visible placeholder node", () => {
    const placeholderNodesArray = new SparseArray<string>();
    placeholderNodesArray.setLength(1);
    treeModelMock
      .setup((x) => x.getChildren(undefined))
      .returns(() => placeholderNodesArray)
      .verifiable(moq.Times.once());

    const result = computeVisibleNodes(treeModelMock.object);
    treeModelMock.verifyAll();
    expect(result.getNumNodes()).toEqual(1);
    expect(isTreeModelNodePlaceholder(result.getAtIndex(0))).toEqual(true);
  });

  it("returns only root node if children does not exist", () => {
    rootNode = { ...rootNode, isExpanded: true, numChildren: 1 };
    treeModelMock
      .setup((x) => x.getChildren(undefined))
      .returns(() => rootNodesArray)
      .verifiable(moq.Times.once());
    treeModelMock
      .setup((x) => x.getNode(rootNode.id))
      .returns(() => rootNode)
      .verifiable(moq.Times.once());
    treeModelMock
      .setup((x) => x.getChildren(rootNode.id))
      .returns(() => undefined!)
      .verifiable(moq.Times.once());

    const result = computeVisibleNodes(treeModelMock.object);
    treeModelMock.verifyAll();
    expect(result.getNumNodes()).toEqual(1);
    expect(result.getAtIndex(0)).to.be.deep.eq(rootNode);
  });
});

describe("isTreeModelNode", () => {
  it("returns true for TreeModelNode", () => {
    const node: TreeModelNode = createTestMutableTreeModelNode();
    expect(isTreeModelNode(node)).toEqual(true);
  });

  it("returns false for TreeModelNodePlaceholder", () => {
    const node: TreeModelNodePlaceholder = { depth: 0, childIndex: 0 };
    expect(isTreeModelNode(node)).toEqual(false);
  });

  it("returns false for TreeModelRootNode", () => {
    const node: TreeModelRootNode = {
      depth: -1,
      id: undefined,
      numChildren: undefined,
    };
    expect(isTreeModelNode(node)).toEqual(false);
  });
});

describe("isTreeModelRootNode", () => {
  it("returns true for TreeModelRootNode", () => {
    const node: TreeModelRootNode = {
      depth: -1,
      id: undefined,
      numChildren: undefined,
    };
    expect(isTreeModelRootNode(node)).toEqual(true);
  });

  it("returns false for TreeModelNode", () => {
    const node: TreeModelNode = createTestMutableTreeModelNode();
    expect(isTreeModelRootNode(node)).toEqual(false);
  });

  it("returns false for TreeModelNodePlaceholder", () => {
    const node: TreeModelNodePlaceholder = { depth: 0, childIndex: 0 };
    expect(isTreeModelRootNode(node)).toEqual(false);
  });
});
