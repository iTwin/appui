/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import type { Node } from "../../../../components-react/tree/controlled/internal/SparseTree.js";
import {
  SparseArray,
  SparseTree,
} from "../../../../components-react/tree/controlled/internal/SparseTree.js";
import {
  createTestMutableTreeModelNode,
  createTestMutableTreeModelNodes,
} from "../TreeHelpers.js";

describe("SparseTree", () => {
  interface TestNode extends Node {
    data?: number;
  }

  let sparseTree: SparseTree<TestNode>;
  let rootNode: Node;

  beforeEach(() => {
    sparseTree = new SparseTree<Node>();
    rootNode = { id: "root-1" };
  });

  function verifyNodes<T extends Node>(
    actual: SparseArray<string>,
    expected: T[]
  ) {
    const actualIds: string[] = [];
    for (const [item] of actual.iterateValues()) actualIds.push(item);

    const expectedIds = expected.map((node) => node.id);
    expect(actualIds).to.deep.eq(expectedIds);
  }

  describe("getNode", () => {
    it("gets node", () => {
      const nodes = createTestMutableTreeModelNodes();
      sparseTree.setChildren(undefined, nodes, 0);
      const result = sparseTree.getNode(nodes[0].id);
      expect(result).to.deep.eq(nodes[0]);
    });
  });

  describe("getChildOffset", () => {
    it("returns undefined if node is not found", () => {
      expect(sparseTree.getChildOffset(undefined, "childId")).toEqual(
        undefined
      );
    });

    it("returns undefined if parent does not have children at all", () => {
      sparseTree.setChildren(undefined, [rootNode], 0);
      expect(sparseTree.getChildOffset(rootNode.id, "childId"));
    });

    it("returns offset", () => {
      const node = createTestMutableTreeModelNode();
      const offset = 5;
      sparseTree.setChildren(undefined, [node], offset);
      expect(sparseTree.getChildOffset(undefined, node.id)).toEqual(offset);
    });
  });

  describe("setChildren", () => {
    describe("setting root nodes", () => {
      const rootNodes = createTestMutableTreeModelNodes();

      it("sets root nodes", () => {
        sparseTree.setChildren(undefined, rootNodes, 0);
        const result = sparseTree.getChildren(undefined)!;
        expect(result.getLength()).toEqual(rootNodes.length);
        verifyNodes(result, rootNodes);
      });
    });

    describe("setting child nodes", () => {
      let firstChildrenPage: Node[];
      let secondChildrenPage: Node[];

      beforeEach(() => {
        firstChildrenPage = createTestMutableTreeModelNodes(3, "page-1");
        secondChildrenPage = createTestMutableTreeModelNodes(3, "page-2");

        sparseTree.setChildren(undefined, [rootNode], 0);
      });

      it("sets child nodes", () => {
        sparseTree.setNumChildren(rootNode.id, firstChildrenPage.length);
        sparseTree.setChildren(rootNode.id, firstChildrenPage, 0);
        const result = sparseTree.getChildren(rootNode.id)!;
        expect(result.getLength()).toEqual(firstChildrenPage.length);
        verifyNodes(result, firstChildrenPage);
      });

      it("sets second array of child nodes", () => {
        sparseTree.setNumChildren(rootNode.id, firstChildrenPage.length);
        sparseTree.setChildren(rootNode.id, firstChildrenPage, 0);
        sparseTree.setChildren(
          rootNode.id,
          secondChildrenPage,
          firstChildrenPage.length
        );
        const result = sparseTree.getChildren(rootNode.id)!;
        expect(result.getLength()).toEqual(
          firstChildrenPage.length + secondChildrenPage.length
        );
        verifyNodes(result, [...firstChildrenPage, ...secondChildrenPage]);
      });

      it("overrides existing children", () => {
        sparseTree.setNumChildren(rootNode.id, firstChildrenPage.length);
        sparseTree.setChildren(rootNode.id, firstChildrenPage, 0);
        sparseTree.setChildren(rootNode.id, secondChildrenPage, 1);
        const result = sparseTree.getChildren(rootNode.id)!;
        const expectedChildren = [firstChildrenPage[0], ...secondChildrenPage];
        expect(result.getLength()).toEqual(expectedChildren.length);
        verifyNodes(result, expectedChildren);
      });
    });
  });

  describe("insertChild", () => {
    it("inserts root node", () => {
      sparseTree.insertChild(undefined, rootNode, 0);
      const result = sparseTree.getChildren(undefined)!;
      expect(result.getLength()).toEqual(1);
      verifyNodes(result, [rootNode]);
    });

    it("inserts child node", () => {
      const childNode = createTestMutableTreeModelNode();
      sparseTree.setChildren(undefined, [rootNode], 0);
      sparseTree.insertChild(rootNode.id, childNode, 0);
      const result = sparseTree.getChildren(rootNode.id)!;
      expect(result.getLength()).toEqual(1);
      verifyNodes(result, [childNode]);
    });

    it("inserts child node between existing children", () => {
      const childNodes = createTestMutableTreeModelNodes(2);
      sparseTree.setChildren(undefined, [rootNode], 0);
      sparseTree.setChildren(rootNode.id, childNodes, 0);

      const newNode = createTestMutableTreeModelNode();
      sparseTree.insertChild(rootNode.id, newNode, 1);

      const result = sparseTree.getChildren(rootNode.id)!;
      expect(result.getLength()).toEqual(3);
      verifyNodes(result, [childNodes[0], newNode, childNodes[1]]);
    });
  });

  describe("setNodeId", () => {
    it("does nothing when target node does not exist and returns `false`", () => {
      const resultStatus = sparseTree.setNodeId("test", 0, "newId");
      expect(resultStatus).toEqual(false);
      expect(sparseTree.getNode("newId")).toEqual(undefined);
    });

    it("does nothing when node with the same id already exists and returns `false`", () => {
      sparseTree.setChildren(
        undefined,
        [{ id: "existingId", data: 1 }, { id: "oldId" }],
        0
      );
      const resultStatus = sparseTree.setNodeId(undefined, 1, "existingId");
      expect(resultStatus).toEqual(false);
      verifyNodes(sparseTree.getChildren(undefined)!, [
        { id: "existingId", data: 1 },
        { id: "oldId" },
      ]);
    });

    it("does nothing if the new id matches current", () => {
      sparseTree.setChildren(undefined, [{ id: "existingId", data: 1 }], 0);
      const resultStatus = sparseTree.setNodeId(undefined, 0, "existingId");
      expect(resultStatus).toEqual(true);
      verifyNodes(sparseTree.getChildren(undefined)!, [
        { id: "existingId", data: 1 },
      ]);
    });

    it("changes node id", () => {
      sparseTree.setChildren(undefined, [{ id: "oldId", data: 1 }], 0);
      const resultStatus = sparseTree.setNodeId(undefined, 0, "newId");
      expect(resultStatus).toEqual(true);
      expect(sparseTree.getNode("oldId")).toEqual(undefined);
      verifyNodes(sparseTree.getChildren(undefined)!, [
        { id: "newId", data: 1 },
      ]);
    });

    it("updates hierarchy with new id", () => {
      sparseTree.setChildren(undefined, [{ id: "root" }], 0);
      sparseTree.setChildren("root", [{ id: "oldId" }], 0);
      sparseTree.setChildren("oldId", [{ id: "grandchild" }], 0);

      const resultStatus = sparseTree.setNodeId("root", 0, "newId");

      expect(resultStatus).toEqual(true);
      expect(sparseTree.getChildren("child1")).toEqual(undefined);
      verifyNodes(sparseTree.getChildren(undefined)!, [{ id: "root" }]);
      verifyNodes(sparseTree.getChildren("root")!, [{ id: "newId" }]);
      verifyNodes(sparseTree.getChildren("newId")!, [{ id: "grandchild" }]);
    });
  });

  describe("moveNode", () => {
    beforeEach(() => {
      sparseTree.setChildren(undefined, [{ id: "root1" }, { id: "root2" }], 0);
      sparseTree.setChildren("root1", [{ id: "child1" }, { id: "child2" }], 0);
    });

    describe("when moving node inside another", () => {
      it("moves root node", () => {
        sparseTree.moveNode(undefined, "root1", "root2", 0);
        expect([...sparseTree.getChildren(undefined)!]).to.be.deep.equal([
          "root2",
        ]);
        expect([...sparseTree.getChildren("root2")!]).to.be.deep.equal([
          "root1",
        ]);
        expect([...sparseTree.getChildren("root1")!]).to.be.deep.equal([
          "child1",
          "child2",
        ]);
      });

      it("moves non-root node", () => {
        sparseTree.moveNode("root1", "child1", "child2", 0);
        expect([...sparseTree.getChildren("root1")!]).to.be.deep.equal([
          "child2",
        ]);
        expect([...sparseTree.getChildren("child2")!]).to.be.deep.equal([
          "child1",
        ]);
      });
    });

    describe("when moving node into hierarchy root", () => {
      it("moves root node", () => {
        sparseTree.moveNode(undefined, "root1", undefined, 2);
        expect([...sparseTree.getChildren(undefined)!]).to.be.deep.equal([
          "root2",
          "root1",
        ]);
        expect([...sparseTree.getChildren("root1")!]).to.be.deep.equal([
          "child1",
          "child2",
        ]);
      });

      it("moves non-root node", () => {
        sparseTree.moveNode("root1", "child1", undefined, 1);
        expect([...sparseTree.getChildren(undefined)!]).to.be.deep.equal([
          "root1",
          "child1",
          "root2",
        ]);
        expect([...sparseTree.getChildren("root1")!]).to.be.deep.equal([
          "child2",
        ]);
      });
    });

    describe("when moving node among siblings", () => {
      it("does nothing when target position is same as source", () => {
        sparseTree.moveNode("root1", "child1", "root1", 0);
        expect([...sparseTree.getChildren("root1")!]).to.be.deep.equal([
          "child1",
          "child2",
        ]);
      });

      it("does nothing when target position is just past source node", () => {
        sparseTree.moveNode("root1", "child1", "root1", 1);
        expect([...sparseTree.getChildren("root1")!]).to.be.deep.equal([
          "child1",
          "child2",
        ]);
      });

      it("moves node into correct position towards beginning", () => {
        sparseTree.moveNode("root1", "child2", "root1", 0);
        expect([...sparseTree.getChildren("root1")!]).to.be.deep.equal([
          "child2",
          "child1",
        ]);
      });

      it("moves node into correct position towards ending", () => {
        sparseTree.moveNode("root1", "child1", "root1", 2);
        expect([...sparseTree.getChildren("root1")!]).to.be.deep.equal([
          "child2",
          "child1",
        ]);
      });
    });
  });

  describe("setNumChildren", () => {
    it("sets count for root nodes", () => {
      sparseTree.setNumChildren(undefined, 10);
      const rootNodes = sparseTree.getChildren(undefined)!;
      expect(rootNodes.getLength()).toEqual(10);
    });

    it("sets count for non-root nodes", () => {
      sparseTree.setChildren(undefined, [rootNode], 0);
      sparseTree.setNumChildren(rootNode.id, 10);
      const childNodes = sparseTree.getChildren(rootNode.id)!;
      expect(childNodes.getLength()).toEqual(10);
    });

    it("clears subtree when setting root node children count", () => {
      sparseTree.setChildren(undefined, [rootNode], 0);
      const childNodes = createTestMutableTreeModelNodes();
      sparseTree.setChildren(rootNode.id, childNodes, 0);
      sparseTree.setNumChildren(undefined, 10);
      const children = sparseTree.getChildren(rootNode.id);
      expect(children).toEqual(undefined);
    });
  });

  describe("removeChild", () => {
    describe("by child id", () => {
      it("removes root node", () => {
        const rootNodes = createTestMutableTreeModelNodes(3);
        sparseTree.setChildren(undefined, rootNodes, 0);
        sparseTree.removeChild(undefined, rootNodes[1].id);
        const children = sparseTree.getChildren(undefined)!;
        expect(children.getLength()).toEqual(2);
        verifyNodes(children, [rootNodes[0], rootNodes[2]]);
      });

      it("removes child node", () => {
        const childNodes = createTestMutableTreeModelNodes(3);
        sparseTree.setChildren(undefined, [rootNode], 0);
        sparseTree.setChildren(rootNode.id, childNodes, 0);
        sparseTree.removeChild(rootNode.id, childNodes[1].id);
        const children = sparseTree.getChildren(rootNode.id)!;
        expect(children.getLength()).toEqual(2);
        verifyNodes(children, [childNodes[0], childNodes[2]]);
      });

      it("does not remove child if it is not found", () => {
        sparseTree.setChildren(undefined, [rootNode], 0);
        sparseTree.removeChild(undefined, "nonExisting");
        const children = sparseTree.getChildren(undefined)!;
        expect(children.getLength()).toEqual(1);
        verifyNodes(children, [rootNode]);
      });

      it("does not throw when parent does not have children", () => {
        sparseTree.setChildren(undefined, [rootNode], 0);
        sparseTree.removeChild(rootNode.id, "childId");
        const children = sparseTree.getChildren(rootNode.id);
        expect(children).toEqual(undefined);
      });

      it("removes child subtree", () => {
        const childNodes = createTestMutableTreeModelNodes();
        sparseTree.setChildren(undefined, [rootNode], 0);
        sparseTree.setChildren(rootNode.id, childNodes, 0);
        sparseTree.removeChild(undefined, rootNode.id);
        const children = sparseTree.getChildren(rootNode.id);
        expect(children).toEqual(undefined);
      });
    });

    describe("by child index", () => {
      it("removes root node", () => {
        const rootNodes = createTestMutableTreeModelNodes(3);
        sparseTree.setChildren(undefined, rootNodes, 0);
        sparseTree.removeChild(undefined, 1);
        const children = sparseTree.getChildren(undefined)!;
        expect(children.getLength()).toEqual(2);
        verifyNodes(children, [rootNodes[0], rootNodes[2]]);
      });

      it("removes child node", () => {
        const childNodes = createTestMutableTreeModelNodes(3);
        sparseTree.setChildren(undefined, [rootNode], 0);
        sparseTree.setChildren(rootNode.id, childNodes, 0);
        sparseTree.removeChild(rootNode.id, 1);
        const children = sparseTree.getChildren(rootNode.id)!;
        expect(children.getLength()).toEqual(2);
        verifyNodes(children, [childNodes[0], childNodes[2]]);
      });

      it("does not remove child if it is not found", () => {
        sparseTree.setChildren(undefined, [rootNode], 0);
        sparseTree.removeChild(undefined, 123);
        const children = sparseTree.getChildren(undefined)!;
        expect(children.getLength()).toEqual(1);
        verifyNodes(children, [rootNode]);
      });

      it("does not throw when parent does not have children", () => {
        sparseTree.setChildren(undefined, [rootNode], 0);
        sparseTree.removeChild(rootNode.id, 0);
        const children = sparseTree.getChildren(rootNode.id);
        expect(children).toEqual(undefined);
      });

      it("removes child subtree", () => {
        const childNodes = createTestMutableTreeModelNodes();
        sparseTree.setChildren(undefined, [rootNode], 0);
        sparseTree.setChildren(rootNode.id, childNodes, 0);
        sparseTree.removeChild(undefined, 0);
        const children = sparseTree.getChildren(rootNode.id);
        expect(children).toEqual(undefined);
      });
    });
  });

  describe("deleteSubtree", () => {
    beforeEach(() => {
      sparseTree.setChildren(undefined, [rootNode], 0);
    });

    it("deletes root nodes", () => {
      sparseTree.deleteSubtree(undefined);
      const rootNodes = sparseTree.getChildren(undefined)!;
      expect(rootNodes.getLength()).toEqual(0);
      verifyNodes(rootNodes, []);
    });

    it("deletes child nodes", () => {
      const childNodes = createTestMutableTreeModelNodes();
      sparseTree.setChildren(rootNode.id, childNodes, 0);
      sparseTree.deleteSubtree(rootNode.id);
      const children = sparseTree.getChildren(rootNode.id);
      expect(children).toEqual(undefined);
    });

    it("does not attempt to remove child subtrees if parent subtree is deleted", () => {
      sparseTree.deleteSubtree(rootNode.id);
      const spy = vi.spyOn(sparseTree, "deleteSubtree");
      sparseTree.deleteSubtree(rootNode.id);
      const children = sparseTree.getChildren(rootNode.id);
      expect(children).toEqual(undefined);
      expect(spy).toHaveBeenCalledOnce();
    });

    it("does not remove parent node of subtree", () => {
      sparseTree.setNumChildren(rootNode.id, 1);
      expect(sparseTree.getChildren(rootNode.id)!.getLength()).toEqual(1);
      sparseTree.deleteSubtree(rootNode.id, false);
      expect(sparseTree.getChildren(rootNode.id)).toEqual(undefined);
      expect(sparseTree.getNode(rootNode.id)).toBeTruthy();
    });
  });
});

describe("SparseArray", () => {
  let sparseArray: SparseArray<number>;

  interface TestItem {
    index: number;
    value: number;
  }

  let testItems: TestItem[] = [];

  beforeEach(() => {
    sparseArray = new SparseArray<number>();
    testItems = [
      { index: 5, value: 10 },
      {
        index: 7,
        value: 14,
      },
    ];
  });

  describe("getLength", () => {
    it("gets length of empty array", () => {
      expect(sparseArray.getLength()).toEqual(0);
    });

    it("gets length of array with items", () => {
      sparseArray.set(0, 1);
      sparseArray.set(1, 2);
      expect(sparseArray.getLength()).toEqual(2);
    });
  });

  describe("setLength", () => {
    it("sets length", () => {
      const length = 3;
      sparseArray.setLength(length);
      expect(sparseArray.getLength()).toEqual(length);
    });
  });

  describe("get", () => {
    it("gets undefined if value is not set", () => {
      expect(sparseArray.get(10)).toEqual(undefined);
    });

    it("gets values for specific index", () => {
      sparseArray.set(testItems[0].index, testItems[0].value);

      const item = sparseArray.get(testItems[0].index);
      expect(item).toBeTruthy();
    });
  });

  describe("getIndex", () => {
    it("gets undefined if value is not found", () => {
      expect(sparseArray.getIndex(5)).toEqual(undefined);
    });

    it("gets index of specified value", () => {
      sparseArray.set(testItems[0].index, testItems[0].value);

      const index = sparseArray.getIndex(testItems[0].value);
      expect(index).toEqual(testItems[0].index);
    });
  });

  describe("set", () => {
    it("sets value at specific index", () => {
      sparseArray.set(testItems[0].index, testItems[0].value);
      const item = sparseArray.get(testItems[0].index);
      expect(item).toEqual(testItems[0].value);
    });

    it("sets new value for same index", () => {
      sparseArray.set(testItems[0].index, testItems[0].value);
      const newValue = 123;
      sparseArray.set(testItems[0].index, newValue);
      const item = sparseArray.get(testItems[0].index);
      expect(item).toEqual(newValue);
    });
  });

  describe("insert", () => {
    it("inserts into empty array at first position", () => {
      sparseArray.insert(0, testItems[0].value);
      expect(sparseArray.getLength()).toEqual(1);
      const item = sparseArray.get(0);
      expect(item).toEqual(testItems[0].value);
    });

    it("inserts into empty array at random position", () => {
      const position = 7;
      sparseArray.insert(position, testItems[0].value);
      expect(sparseArray.getLength()).toEqual(position + 1);
      const item = sparseArray.get(position);
      expect(item).toEqual(testItems[0].value);
    });

    it("inserts into not empty array at first position", () => {
      sparseArray.set(0, testItems[0].value);
      const insertValue = 123;
      sparseArray.insert(0, insertValue);
      expect(sparseArray.getLength()).toEqual(2);
      expect(sparseArray.get(0)).toEqual(insertValue);
      expect(sparseArray.get(1)).toEqual(testItems[0].value);
    });

    it("inserts into not empty array at random position", () => {
      sparseArray.set(0, testItems[0].value);
      const position = 7;
      const insertValue = 123;
      sparseArray.insert(position, insertValue);
      expect(sparseArray.getLength()).toEqual(position + 1);
      expect(sparseArray.get(0)).toEqual(testItems[0].value);
      expect(sparseArray.get(position)).toEqual(insertValue);
    });

    it("inserts into array between items", () => {
      sparseArray.set(0, testItems[0].value);
      sparseArray.set(1, testItems[1].value);
      const insertValue = 123;
      sparseArray.insert(1, insertValue);
      expect(sparseArray.getLength()).toEqual(3);
      expect(sparseArray.get(0)).toEqual(testItems[0].value);
      expect(sparseArray.get(1)).toEqual(insertValue);
      expect(sparseArray.get(2)).toEqual(testItems[1].value);
    });
  });

  describe("remove", () => {
    it("tries to remove from empty array", () => {
      sparseArray.remove(0);
      expect(sparseArray.getLength()).toEqual(0);
    });

    it("removes first element from array", () => {
      sparseArray.set(0, testItems[0].value);
      sparseArray.set(1, testItems[1].value);
      sparseArray.remove(0);
      expect(sparseArray.getLength()).toEqual(1);
      expect(sparseArray.get(0)).toEqual(testItems[1].value);
      expect(sparseArray.get(1)).toEqual(undefined);
    });

    it("removes last element from array", () => {
      sparseArray.set(0, testItems[0].value);
      sparseArray.set(1, testItems[1].value);
      sparseArray.remove(1);
      expect(sparseArray.getLength()).toEqual(1);
      expect(sparseArray.get(0)).toEqual(testItems[0].value);
      expect(sparseArray.get(1)).toEqual(undefined);
    });

    it("removes middle element from array", () => {
      const middleValue = 123;
      sparseArray.set(0, testItems[0].value);
      sparseArray.set(1, middleValue);
      sparseArray.set(2, testItems[1].value);
      sparseArray.remove(1);
      expect(sparseArray.getLength()).toEqual(2);
      expect(sparseArray.get(0)).toEqual(testItems[0].value);
      expect(sparseArray.get(1)).toEqual(testItems[1].value);
      expect(sparseArray.get(2)).toEqual(undefined);
    });

    it("removes missing value from middle front", () => {
      sparseArray.set(1, testItems[0].value);
      expect(sparseArray.getLength()).toEqual(2);
      sparseArray.remove(0);
      expect(sparseArray.getLength()).toEqual(1);
      expect(sparseArray.get(0)).toEqual(testItems[0].value);
    });

    it("removes missing value from array middle", () => {
      const lastItemIndex = 5;
      sparseArray.set(0, testItems[0].value);
      sparseArray.set(lastItemIndex, testItems[1].value);
      expect(sparseArray.getLength()).toEqual(lastItemIndex + 1);
      sparseArray.remove(2);
      expect(sparseArray.getLength()).toEqual(lastItemIndex);
      expect(sparseArray.get(0)).toEqual(testItems[0].value);
      expect(sparseArray.get(lastItemIndex - 1)).toEqual(testItems[1].value);
      expect(sparseArray.get(lastItemIndex)).toEqual(undefined);
    });

    it("removes missing value from array end", () => {
      sparseArray.setLength(8);
      sparseArray.set(0, testItems[0].value);
      sparseArray.remove(7);
      expect(sparseArray.getLength()).toEqual(7);
      expect(sparseArray.get(0)).toEqual(testItems[0].value);
    });

    it("does nothing when attempting to remove at position past the end", () => {
      sparseArray.insert(0, 0);
      sparseArray.insert(1, 1);
      sparseArray.remove(2);
      expect(sparseArray.getLength()).toEqual(2);
      expect(sparseArray.get(0)).toEqual(0);
      expect(sparseArray.get(1)).toEqual(1);
    });
  });

  describe("iterateValues", () => {
    it("iterates through existing values", () => {
      testItems.forEach((item) => sparseArray.set(item.index, item.value));
      for (const [value, index] of sparseArray.iterateValues()) {
        const expectedItem = testItems.find((item) => item.index === index);
        expect(expectedItem).toBeTruthy();
        expect(value).toEqual(expectedItem!.value);
      }
    });
  });

  describe("indexer", () => {
    it("iterates over all values", () => {
      const firstItem = testItems[0];
      sparseArray.set(firstItem.index, firstItem.value);

      const secondItem = testItems[1];
      sparseArray.set(secondItem.index, secondItem.value);

      sparseArray.setLength(secondItem.index + 5);

      let current = 0;
      for (const item of sparseArray) {
        if (current === firstItem.index) expect(item).toEqual(firstItem.value);
        else if (current === secondItem.index)
          expect(item).toEqual(secondItem.value);
        else expect(item).toEqual(undefined);

        current++;
      }
    });
  });
});
