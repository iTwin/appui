/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { expect } from "chai";
import sinon from "sinon";
import * as moq from "typemoq";
import type { MutableTreeModel } from "../../../components-react/tree/controlled/TreeModel";
import type { TreeModelChanges } from "../../../components-react/tree/controlled/TreeModelSource";
import { TreeModelSource } from "../../../components-react/tree/controlled/TreeModelSource";
import type { ITreeDataProvider } from "../../../components-react/tree/TreeDataProvider";
import TestUtils from "../../TestUtils";
import { createTreeNodeInput } from "./TreeHelpers";

describe("TreeModelSource", () => {
  let modelSource: TreeModelSource;
  const dataProviderMock = moq.Mock.ofType<ITreeDataProvider>();
  const mutableTreeModelMock = moq.Mock.ofType<MutableTreeModel>();

  before(async () => {
    await TestUtils.initializeUiComponents();
  });

  beforeEach(() => {
    dataProviderMock.reset();
    mutableTreeModelMock.reset();

    modelSource = new TreeModelSource();
  });

  describe("modifyModel", () => {
    beforeEach(() => {
      modelSource.modifyModel((model) => {
        model.setChildren(undefined, [createTreeNodeInput("root1")], 0);
      });
    });

    it("does not emit onModelChanged event if model did not change", () => {
      const spy = sinon.spy(modelSource.onModelChanged, "emit");
      modelSource.modifyModel(() => {});
      expect(spy).not.toBeCalled();
    });

    it("emits onModelChanged event with added node id", () => {
      const spy = sinon.spy(modelSource.onModelChanged, "emit");
      modelSource.modifyModel((model) => {
        model.setChildren(undefined, [createTreeNodeInput("root2")], 1);
      });
      expect(spy).toHaveBeenCalled();
      const changes = spy.args[0][0][1];
      expect(changes.addedNodeIds.length).to.be.eq(1);
      expect(changes.addedNodeIds[0]).to.be.eq("root2");
    });

    it("emits onModelChanged event with removed node id", () => {
      const spy = sinon.spy(modelSource.onModelChanged, "emit");
      modelSource.modifyModel((model) => {
        model.clearChildren(undefined);
      });
      expect(spy).toHaveBeenCalled();
      const changes = spy.args[0][0][1];
      expect(changes.removedNodeIds.length).to.be.eq(1);
      expect(changes.removedNodeIds[0]).to.be.eq("root1");
    });

    it("emits onModelChanged event with modified node id", () => {
      const spy = sinon.spy(modelSource.onModelChanged, "emit");
      modelSource.modifyModel((model) => {
        const node = model.getNode("root1");
        node!.isSelected = !node!.isSelected;
      });
      expect(spy).toHaveBeenCalled();
      const changes = spy.args[0][0][1];
      expect(changes.modifiedNodeIds.length).to.be.eq(1);
      expect(changes.modifiedNodeIds[0]).to.be.eq("root1");
    });

    it("clears model and adds new nodes", () => {
      modelSource.modifyModel((model) => {
        model.clearChildren(undefined);
      });
      expect(
        modelSource.getModel().getChildren(undefined)!.getLength()
      ).toEqual(0);
      modelSource.modifyModel((model) => {
        model.setChildren(undefined, [createTreeNodeInput("new_root1")], 0);
      });
      expect(
        modelSource.getModel().getChildren(undefined)!.getLength()
      ).toEqual(1);
    });

    it("overrides existing children multiple times", () => {
      modelSource.modifyModel((model) => {
        model.setNumChildren(undefined, 1);
        model.setChildren(undefined, [createTreeNodeInput("new_root1")], 0);
      });
      modelSource.modifyModel((model) => {
        model.setNumChildren(undefined, 1);
        model.setChildren(undefined, [createTreeNodeInput("root1")], 0);
      });
    });

    describe("node change detection", () => {
      describe("node addition", () => {
        it("does not duplicate added nodes", () => {
          const spy = sinon.spy(modelSource.onModelChanged, "emit");
          modelSource.modifyModel((model) => {
            // Add added_node twice
            expect(model.changeNodeId("root1", "added_node")).toEqual(true);
            expect(model.changeNodeId("added_node", "temp")).toEqual(true);
            expect(model.changeNodeId("temp", "added_node")).toEqual(true);
          });

          const expectedChanges: TreeModelChanges = {
            addedNodeIds: ["added_node"],
            modifiedNodeIds: [],
            removedNodeIds: ["root1"],
          };
          expect(spy).to.have.been.calledOnceWithExactly([
            modelSource.getModel(),
            expectedChanges,
          ]);
        });

        it("does not mistake attribute addition as node addtion", () => {
          const spy = sinon.spy(modelSource.onModelChanged, "emit");
          modelSource.modifyModel((model) => {
            const node = model.getNode("root1")!;
            node.checkbox.tooltip = "test tooltip";
          });

          const expectedChanges: TreeModelChanges = {
            addedNodeIds: [],
            modifiedNodeIds: ["root1"],
            removedNodeIds: [],
          };
          expect(spy).to.have.been.calledOnceWithExactly([
            modelSource.getModel(),
            expectedChanges,
          ]);
        });

        it("only notifies of node addition even when the added node is also modified", () => {
          const spy = sinon.spy(modelSource.onModelChanged, "emit");
          modelSource.modifyModel((model) => {
            model.insertChild(undefined, createTreeNodeInput("root2"), 1);
            const node = model.getNode("root2")!;
            node.isSelected = true;
          });

          const expectedChanges: TreeModelChanges = {
            addedNodeIds: ["root2"],
            modifiedNodeIds: [],
            removedNodeIds: [],
          };
          expect(spy).to.have.been.calledOnceWithExactly([
            modelSource.getModel(),
            expectedChanges,
          ]);
        });
      });

      describe("node removal", () => {
        it("does not duplicate removed nodes", () => {
          const spy = sinon.spy(modelSource.onModelChanged, "emit");
          modelSource.modifyModel((model) => {
            // Remove root1 node twice
            expect(model.changeNodeId("root1", "another_id")).toEqual(true);
            expect(model.changeNodeId("another_id", "root1")).toEqual(true);
            expect(model.changeNodeId("root1", "another_id")).toEqual(true);
          });

          const expectedChanges: TreeModelChanges = {
            addedNodeIds: ["another_id"],
            modifiedNodeIds: [],
            removedNodeIds: ["root1"],
          };
          expect(spy).to.have.been.calledOnceWithExactly([
            modelSource.getModel(),
            expectedChanges,
          ]);
        });

        it("does not mistake attribute removal as node removal", () => {
          modelSource.modifyModel((model) => {
            const node = model.getNode("root1")!;
            node.checkbox.tooltip = "test tooltip";
            node.editingInfo = { onCommit: () => {}, onCancel: () => {} };
          });

          const spy = sinon.spy(modelSource.onModelChanged, "emit");
          modelSource.modifyModel((model) => {
            const node = model.getNode("root1")!;
            delete node.checkbox.tooltip;
            delete node.editingInfo;
          });

          const expectedChanges: TreeModelChanges = {
            addedNodeIds: [],
            modifiedNodeIds: ["root1"],
            removedNodeIds: [],
          };
          expect(spy).to.have.been.calledOnceWithExactly([
            modelSource.getModel(),
            expectedChanges,
          ]);
        });
      });

      describe("node modification", () => {
        it("does not duplicate modified nodes when overwriting nodes", () => {
          const spy = sinon.spy(modelSource.onModelChanged, "emit");
          modelSource.modifyModel((model) => {
            // Reassign root1 node twice
            model.insertChild(undefined, createTreeNodeInput("root1"), 0);
            model.insertChild(undefined, createTreeNodeInput("root1"), 0);
          });

          const expectedChanges: TreeModelChanges = {
            addedNodeIds: [],
            modifiedNodeIds: ["root1"],
            removedNodeIds: [],
          };
          expect(spy).to.have.been.calledOnceWithExactly([
            modelSource.getModel(),
            expectedChanges,
          ]);
        });

        it("does not duplicate modified nodes when adding new properties", () => {
          const spy = sinon.spy(modelSource.onModelChanged, "emit");
          modelSource.modifyModel((model) => {
            const node = model.getNode("root1")!;
            node.checkbox.tooltip = "test";
            node.editingInfo = { onCommit: () => {}, onCancel: () => {} };
          });

          const expectedChanges: TreeModelChanges = {
            addedNodeIds: [],
            modifiedNodeIds: ["root1"],
            removedNodeIds: [],
          };
          expect(spy).to.have.been.calledOnceWithExactly([
            modelSource.getModel(),
            expectedChanges,
          ]);
        });
      });
    });
  });

  describe("getModel", () => {
    it("returns model", () => {
      (modelSource as any)._model = mutableTreeModelMock.object;
      const model = modelSource.getModel();
      expect(model).to.be.eq(mutableTreeModelMock.object);
    });
  });
});
