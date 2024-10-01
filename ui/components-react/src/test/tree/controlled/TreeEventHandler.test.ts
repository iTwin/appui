/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { Subject } from "rxjs";
import * as moq from "typemoq";
import { CheckBoxState } from "@itwin/core-react";
import type { TreeModelMutator } from "../../../components-react/tree/controlled/internal/TreeModelMutator.js";
import { from } from "../../../components-react/tree/controlled/Observable.js";
import type { TreeEventHandlerParams } from "../../../components-react/tree/controlled/TreeEventHandler.js";
import { TreeEventHandler } from "../../../components-react/tree/controlled/TreeEventHandler.js";
import type {
  CheckboxStateChange,
  TreeEvents,
  TreeSelectionChange,
} from "../../../components-react/tree/controlled/TreeEvents.js";
import type {
  MutableTreeModelNode,
  TreeModel,
} from "../../../components-react/tree/controlled/TreeModel.js";
import type { TreeModelSource } from "../../../components-react/tree/controlled/TreeModelSource.js";
import type { ITreeNodeLoader } from "../../../components-react/tree/controlled/TreeNodeLoader.js";
import { createRandomMutableTreeModelNode } from "./TreeHelpers.js";

describe("TreeEventHandler", () => {
  let eventHandler: TreeEventHandler;
  const modelSourceMock = moq.Mock.ofType<TreeModelSource>();
  const treeNodeLoaderMock = moq.Mock.ofType<ITreeNodeLoader>();
  const treeEventsMock = moq.Mock.ofType<TreeEvents>();
  const treeModelMock = moq.Mock.ofType<TreeModel>();
  const params: TreeEventHandlerParams = {
    modelSource: modelSourceMock.object,
    nodeLoader: treeNodeLoaderMock.object,
  };

  let modelMutator: TreeModelMutator;
  let testNode: MutableTreeModelNode;

  beforeEach(() => {
    modelSourceMock.reset();
    treeEventsMock.reset();

    modelSourceMock
      .setup((x) => x.getModel())
      .returns(() => treeModelMock.object);
    testNode = createRandomMutableTreeModelNode();

    eventHandler = new TreeEventHandler(params);
    modelMutator = (eventHandler as any)._modelMutator;
  });

  describe("dispose", () => {
    it("calls next on disposed subject", () => {
      const subject: Subject<unknown> = (eventHandler as any)._disposed;
      const spy = vi.spyOn(subject, "next");
      eventHandler.dispose();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe("modelSource", () => {
    it("returns modelSource", () => {
      expect(eventHandler.modelSource).to.be.deep.eq(modelSourceMock.object);
    });
  });

  describe("onNodeExpanded", () => {
    it("calls TreeMutator expandNode", () => {
      const spy = vi.spyOn(modelMutator, "expandNode");
      eventHandler.onNodeExpanded({ nodeId: testNode.id });
      expect(spy).toHaveBeenCalledWith(testNode.id);
    });
  });

  describe("onNodeCollapsed", () => {
    it("calls TreeMutator collapseNode", () => {
      const spy = vi.spyOn(modelMutator, "collapseNode");
      eventHandler.onNodeCollapsed({ nodeId: testNode.id });
      expect(spy).toHaveBeenCalledWith(testNode.id);
    });
  });

  describe("onSelectionModified", () => {
    it("calls TreeMutator modifySelection", () => {
      const change: TreeSelectionChange = {
        selectedNodeItems: [testNode.item],
        deselectedNodeItems: [],
      };
      const spy = vi.spyOn(modelMutator, "modifySelection");
      eventHandler.onSelectionModified({ modifications: from([change]) });
      expect(spy).toHaveBeenCalledWith([testNode.item], []);
    });
  });

  describe("onSelectionReplaced", () => {
    it("calls TreeMutator replaceSelection on first value", () => {
      const change = {
        selectedNodeItems: [testNode.item],
      };
      const spy = vi.spyOn(modelMutator, "replaceSelection");
      eventHandler.onSelectionReplaced({ replacements: from([change]) });
      expect(spy).toHaveBeenCalledWith([testNode.item]);
    });

    it("calls TreeMutator modifySelection on second value", () => {
      const change1 = {
        selectedNodeItems: [testNode.item],
      };
      const secondNode = createRandomMutableTreeModelNode();
      const change2 = {
        selectedNodeItems: [secondNode.item],
      };
      const replaceSpy = vi.spyOn(modelMutator, "replaceSelection");
      const modifySpy = vi.spyOn(modelMutator, "modifySelection");
      eventHandler.onSelectionReplaced({
        replacements: from([change1, change2]),
      });
      expect(replaceSpy).toHaveBeenCalledWith(change1.selectedNodeItems);
      expect(modifySpy).toHaveBeenCalledWith(change2.selectedNodeItems, []);
    });
  });

  describe("onCheckboxStateChanged", () => {
    it("calls TreeMutator setCheckboxStates", () => {
      const changes: CheckboxStateChange[] = [
        {
          nodeItem: testNode.item,
          newState: CheckBoxState.On,
        },
      ];
      const spy = vi.spyOn(modelMutator, "setCheckboxStates");
      eventHandler.onCheckboxStateChanged({ stateChanges: from([changes]) });
      expect(spy).toHaveBeenCalledWith(changes);
    });
  });

  describe("onDelayedNodeClick", () => {
    it("calls TreeMutator activateEditing", () => {
      const onNodeUpdated = () => {};
      const eventHandlerWithEditing = new TreeEventHandler({
        ...params,
        editingParams: { onNodeUpdated },
      });
      const modelMutatorWithEditing = (eventHandlerWithEditing as any)
        ._modelMutator;
      const spy = vi.spyOn(modelMutatorWithEditing, "activateEditing");
      eventHandlerWithEditing.onDelayedNodeClick({ nodeId: testNode.id });
      expect(spy).toHaveBeenCalledWith(testNode.id, onNodeUpdated);
    });

    it("does not call TreeMutator activateEditing if editing params are not set", () => {
      const spy = vi.spyOn(modelMutator, "activateEditing");
      eventHandler.onDelayedNodeClick({ nodeId: testNode.id });
      expect(spy).not.toBeCalled();
    });
  });

  describe("onNodeEditorActivated", () => {
    it("calls TreeMutator activateEditing", () => {
      const onNodeUpdated = () => {};
      const eventHandlerWithEditing = new TreeEventHandler({
        ...params,
        editingParams: { onNodeUpdated },
      });
      const modelMutatorWithEditing = (eventHandlerWithEditing as any)
        ._modelMutator;
      const spy = vi.spyOn(modelMutatorWithEditing, "activateEditing");
      eventHandlerWithEditing.onNodeEditorActivated({ nodeId: testNode.id });
      expect(spy).toHaveBeenCalledWith(testNode.id, onNodeUpdated);
    });

    it("does not call TreeMutator activateEditing if editing params are not set", () => {
      const spy = vi.spyOn(modelMutator, "activateEditing");
      eventHandler.onNodeEditorActivated({ nodeId: testNode.id });
      expect(spy).not.toBeCalled();
    });
  });

  describe("onNodeDoubleClick", () => {
    it("calls onNodeDoubleClick", () => {
      eventHandler.onNodeDoubleClick({ nodeId: testNode.id });
    });
  });
});
