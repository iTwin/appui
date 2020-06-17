/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { expect } from "chai";
import * as faker from "faker";
import sinon from "sinon";
import * as moq from "typemoq";
import { BeEvent } from "@bentley/bentleyjs-core";
import { PropertyRecord } from "@bentley/ui-abstract";
import { MutableTreeModel, TreeModelNodeInput, VisibleTreeNodes } from "../../../ui-components/tree/controlled/TreeModel";
import { TreeModelSource } from "../../../ui-components/tree/controlled/TreeModelSource";
import { ITreeDataProvider, TreeDataChangesListener } from "../../../ui-components/tree/TreeDataProvider";

describe("TreeModelSource", () => {

  let modelSource: TreeModelSource;
  const dataProviderMock = moq.Mock.ofType<ITreeDataProvider>();
  const mutableTreeModelMock = moq.Mock.ofType<MutableTreeModel>();
  const visibleNodesMock = moq.Mock.ofType<VisibleTreeNodes>();

  let onTreeNodeChanged: BeEvent<TreeDataChangesListener>;

  beforeEach(() => {
    dataProviderMock.reset();
    mutableTreeModelMock.reset();

    onTreeNodeChanged = new BeEvent<TreeDataChangesListener>();
    // tslint:disable-next-line:deprecation
    dataProviderMock.setup((x) => x.onTreeNodeChanged).returns(() => onTreeNodeChanged);
    modelSource = new TreeModelSource();
  });

  describe("constructor", () => {

    it("listens for onModelChanged events", () => {
      (modelSource as any)._model = mutableTreeModelMock.object;
      mutableTreeModelMock.setup((x) => x.computeVisibleNodes()).returns(() => visibleNodesMock.object).verifiable(moq.Times.exactly(2));
      modelSource.getVisibleNodes();
      modelSource.onModelChanged.emit([mutableTreeModelMock.object, { addedNodeIds: [], modifiedNodeIds: [], removedNodeIds: [] }]);
      modelSource.getVisibleNodes();
      mutableTreeModelMock.verifyAll();
    });

  });

  describe("modifyModel", () => {
    let inputNode: TreeModelNodeInput;

    beforeEach(() => {
      inputNode = {
        id: faker.random.uuid(),
        isExpanded: faker.random.boolean(),
        item: { id: faker.random.uuid(), label: PropertyRecord.fromString(faker.random.word(), "label") },
        label: PropertyRecord.fromString(faker.random.word(), "label"),
        isLoading: faker.random.boolean(),
        isSelected: faker.random.boolean(),
      };

      modelSource.modifyModel((model) => { model.setChildren(undefined, [inputNode], 0); });
    });

    it("does not emit onModelChanged event if model did not change", () => {
      const spy = sinon.spy(modelSource.onModelChanged, "emit");
      modelSource.modifyModel(() => { });
      expect(spy).to.not.be.called;
    });

    it("emits onModelChanged event with added node id", () => {
      const newInput: TreeModelNodeInput = {
        id: faker.random.uuid(),
        isExpanded: faker.random.boolean(),
        item: { id: faker.random.uuid(), label: PropertyRecord.fromString(faker.random.word(), "label") },
        label: PropertyRecord.fromString(faker.random.word(), "label"),
        isLoading: faker.random.boolean(),
        isSelected: faker.random.boolean(),
      };
      const spy = sinon.spy(modelSource.onModelChanged, "emit");
      modelSource.modifyModel((model) => { model.setChildren(undefined, [newInput], 1); });
      expect(spy).to.be.called;
      const changes = spy.args[0][0][1];
      expect(changes.addedNodeIds.length).to.be.eq(1);
      expect(changes.addedNodeIds[0]).to.be.eq(newInput.id);
    });

    it("emits onModelChanged event with removed node id", () => {
      const spy = sinon.spy(modelSource.onModelChanged, "emit");
      modelSource.modifyModel((model) => { model.clearChildren(undefined); });
      expect(spy).to.be.called;
      const changes = spy.args[0][0][1];
      expect(changes.removedNodeIds.length).to.be.eq(1);
      expect(changes.removedNodeIds[0]).to.be.eq(inputNode.id);
    });

    it("emits onModelChanged event with modified node id", () => {
      const spy = sinon.spy(modelSource.onModelChanged, "emit");
      modelSource.modifyModel((model) => {
        const node = model.getNode(inputNode.id);
        node!.isSelected = !node!.isSelected;
      });
      expect(spy).to.be.called;
      const changes = spy.args[0][0][1];
      expect(changes.modifiedNodeIds.length).to.be.eq(1);
      expect(changes.modifiedNodeIds[0]).to.be.eq(inputNode.id);
    });

    it("clears model and adds new nodes", () => {
      modelSource.modifyModel((model) => {
        model.clearChildren(undefined);
      });
      expect(modelSource.getVisibleNodes().getNumNodes()).to.be.eq(0);
      const newInput: TreeModelNodeInput = {
        id: faker.random.uuid(),
        isExpanded: faker.random.boolean(),
        item: { id: faker.random.uuid(), label: PropertyRecord.fromString(faker.random.word(), "label") },
        label: PropertyRecord.fromString(faker.random.word(), "label"),
        isLoading: faker.random.boolean(),
        isSelected: faker.random.boolean(),
      };
      modelSource.modifyModel((model) => {
        model.setChildren(undefined, [newInput], 0);
      });
      expect(modelSource.getVisibleNodes().getNumNodes()).to.be.eq(1);
    });

    it("overrides existing children multiple times", () => {
      const newInput: TreeModelNodeInput = {
        id: faker.random.uuid(),
        isExpanded: faker.random.boolean(),
        item: { id: faker.random.uuid(), label: PropertyRecord.fromString(faker.random.word(), "label") },
        label: PropertyRecord.fromString(faker.random.word(), "label"),
        isLoading: faker.random.boolean(),
        isSelected: faker.random.boolean(),
      };
      modelSource.modifyModel((model) => {
        model.setNumChildren(undefined, 1);
        model.setChildren(undefined, [newInput], 0);
      });
      modelSource.modifyModel((model) => {
        model.setNumChildren(undefined, 1);
        model.setChildren(undefined, [inputNode], 0);
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

  describe("getVisibleNodes", () => {

    beforeEach(() => {
      (modelSource as any)._model = mutableTreeModelMock.object;
    });

    it("computes visible nodes", () => {
      mutableTreeModelMock.setup((x) => x.computeVisibleNodes()).returns(() => visibleNodesMock.object).verifiable(moq.Times.once());
      modelSource.getVisibleNodes();
      mutableTreeModelMock.verifyAll();
    });

    it("does not compute visible nodes second time", () => {
      mutableTreeModelMock.setup((x) => x.computeVisibleNodes()).returns(() => visibleNodesMock.object).verifiable(moq.Times.once());
      modelSource.getVisibleNodes();
      modelSource.getVisibleNodes();
      mutableTreeModelMock.verifyAll();
    });

  });

});
