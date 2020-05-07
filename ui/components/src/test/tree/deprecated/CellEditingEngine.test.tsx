/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { expect } from "chai";
import * as sinon from "sinon";
import { PropertyRecord } from "@bentley/ui-abstract";
import { render } from "@testing-library/react";
import { CellEditingEngine, EditableTreeProps } from "../../../ui-components/tree/deprecated/CellEditingEngine";
import { BeInspireTree, BeInspireTreeNode } from "../../../ui-components/tree/deprecated/component/BeInspireTree";
import { DEPRECATED_Tree as Tree } from "../../../ui-components/tree/deprecated/component/Tree";
import { TreeNodeItem } from "../../../ui-components/tree/TreeDataProvider";

// tslint:disable:deprecation

// tslint:disable:deprecation

describe("CellEditingEngine", () => {
  const setStateSpy = sinon.spy();
  const getStateSpy = sinon.spy();

  const props: EditableTreeProps = { onCellEditing: sinon.spy(), onCellUpdated: sinon.spy() };
  let tree: BeInspireTree<TreeNodeItem>;
  let node: BeInspireTreeNode<TreeNodeItem>;
  let node2: BeInspireTreeNode<TreeNodeItem>;

  beforeEach(() => {
    tree = new BeInspireTree<TreeNodeItem>({
      dataProvider: [{ id: "0", label: PropertyRecord.fromString("0") }, { id: "1", label: PropertyRecord.fromString("1") }],
      mapPayloadToInspireNodeConfig: Tree.inspireNodeFromTreeNodeItem,
    });
    node = tree.nodes()[0];
    node2 = tree.nodes()[1];
  });

  describe("isEditingEnabled", () => {
    it("returns true when currentlyEdited node is set and callbacks registered", () => {
      const engine = new CellEditingEngine(props);
      engine.subscribe(() => node, setStateSpy);

      expect(engine.isEditingEnabled(node)).to.be.true;
    });

    it("returns false when currentlyEdited node is undefined", () => {
      const engine = new CellEditingEngine(props);
      engine.subscribe(() => undefined, setStateSpy);

      expect(engine.isEditingEnabled(node)).to.be.false;
    });
  });

  describe("renderEditor", () => {
    it("renders", () => {
      const engine = new CellEditingEngine(props);
      engine.subscribe(getStateSpy, setStateSpy);

      const editor = render(engine.renderEditor(node, { color: "red" }));

      expect((editor.container.lastChild as HTMLElement).style.color).to.equal("red");

      editor.getByTestId("editor-container");
    });
  });

  describe("subscribe", () => {
    it("subscribes callbacks to the engine", () => {
      const engine = new CellEditingEngine(props);
      expect(engine.hasSubscriptions).to.be.false;

      engine.subscribe(getStateSpy, setStateSpy);

      expect(engine.hasSubscriptions).to.be.true;
    });
  });

  describe("hasSubscriptions", () => {
    it("returns false if it has no subscription", () => {
      const engine = new CellEditingEngine(props);

      expect(engine.hasSubscriptions).to.be.false;
    });
  });

  describe("unsubscribe", () => {
    it("unsubscribes callbacks form the engine", () => {
      const engine = new CellEditingEngine(props);

      engine.subscribe(getStateSpy, setStateSpy);

      expect(engine.hasSubscriptions).to.be.true;

      engine.unsubscribe();

      expect(engine.hasSubscriptions).to.be.false;
    });
  });

  describe("activateEditor", () => {
    it("changes editor state and calls onCellEditing", () => {
      setStateSpy.resetHistory();
      const onCellEditing = sinon.spy();

      const engine = new CellEditingEngine({ ...props, onCellEditing });
      engine.subscribe(() => undefined, setStateSpy);

      engine.activateEditor(node);

      expect(setStateSpy).to.have.been.calledOnce;
      expect(onCellEditing).to.have.been.calledOnce;
    });

    it("does not change editor state if props are not defined", () => {
      const onCellEditing = sinon.spy();
      const engine = new CellEditingEngine({ ...props, onCellEditing });

      engine.activateEditor(node);

      expect(onCellEditing).to.have.not.been.called;
    });

    it("does not change editor state if node is the same", () => {
      setStateSpy.resetHistory();

      const engine = new CellEditingEngine(props);

      engine.subscribe(() => node, setStateSpy);

      engine.activateEditor(node);

      expect(setStateSpy).to.have.not.been.called;
    });

    it("dirties currentlyEnabled node if it's different from provided node", () => {
      setStateSpy.resetHistory();
      node2.setDirty(false);

      const engine = new CellEditingEngine(props);
      engine.subscribe(() => node2, setStateSpy);

      engine.activateEditor(node);

      expect(setStateSpy).to.have.been.called;
      expect(node2.isDirty()).to.be.true;
    });
  });

  describe("deactivateEditor", () => {
    it("changes editor state", () => {
      setStateSpy.resetHistory();

      const engine = new CellEditingEngine(props);
      engine.subscribe(() => node, setStateSpy);

      engine.deactivateEditor();

      expect(setStateSpy).to.have.been.calledOnce;
    });

    it("does not change editor state if engine is not subscribed to", () => {
      const setDirtySpy = sinon.spy();
      node.setDirty = setDirtySpy;

      const engine = new CellEditingEngine(props);

      engine.deactivateEditor();

      expect(setDirtySpy).to.have.not.been.called;
    });

    it("does not change editor state when it's already undefined", () => {
      setStateSpy.resetHistory();

      const engine = new CellEditingEngine(props);
      engine.subscribe(() => undefined, setStateSpy);

      engine.deactivateEditor();

      expect(setStateSpy).to.not.be.called;
    });
  });

  describe("checkStatus", () => {
    it("calls activateEditor when node is selected, clicked, has a payload and is editable", () => {
      const setStateWithArgs = sinon.spy();

      node.selected = () => true;
      node.payload = { id: "a", label: PropertyRecord.fromString("b"), isEditable: true };

      const engine = new CellEditingEngine(props);
      engine.subscribe(() => undefined, setStateWithArgs);

      engine.checkStatus(node, true);

      expect(setStateWithArgs).to.have.been.calledWith(node);
    });

    it("calls deactivateEditor when node is not selected", () => {
      const setStateWithArgs = sinon.spy();

      node.selected = () => false;
      node.payload = { id: "a", label: PropertyRecord.fromString("b"), isEditable: true };

      const engine = new CellEditingEngine(props);
      engine.subscribe(() => node, setStateWithArgs);

      engine.checkStatus(node, true);

      expect(setStateWithArgs).to.have.been.calledWith(undefined);
    });
  });
});
