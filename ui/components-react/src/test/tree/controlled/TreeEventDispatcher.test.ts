/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { expect } from "chai";
import * as sinon from "sinon";
import { SelectionMode } from "../../../components-react/common/selection/SelectionModes";
import { toRxjsObservable } from "../../../components-react/tree/controlled/Observable";
import { TreeEventDispatcher } from "../../../components-react/tree/controlled/TreeEventDispatcher";
import type { TreeEvents } from "../../../components-react/tree/controlled/TreeEvents";
import type {
  TreeModelNode,
  TreeModelRootNode,
} from "../../../components-react/tree/controlled/TreeModel";
import {
  computeVisibleNodes,
  isTreeModelNode,
  MutableTreeModel,
} from "../../../components-react/tree/controlled/TreeModel";
import type {
  ITreeNodeLoader,
  TreeNodeLoadResult,
} from "../../../components-react/tree/controlled/TreeNodeLoader";
import {
  extractSequence,
  startExtractingSequence,
} from "../../common/ObservableTestHelpers";
import type { SinonSpy } from "../../TestUtils";
import { createTreeNodeInput } from "./TreeHelpers";
import { fireEvent, waitFor } from "@testing-library/react";
import { asyncScheduler, from, of, scheduled, Subject } from "rxjs";
import { CheckBoxState } from "@itwin/core-react";
import type { TreeSelectionManager } from "../../../components-react/tree/controlled/internal/TreeSelectionManager";

describe("TreeEventDispatcher", () => {
  const treeEvents = {
    onSelectionModified: sinon.fake() as SinonSpy<
      Required<TreeEvents>["onSelectionModified"]
    >,
    onSelectionReplaced: sinon.fake() as SinonSpy<
      Required<TreeEvents>["onSelectionReplaced"]
    >,
    onNodeExpanded: sinon.fake() as SinonSpy<
      Required<TreeEvents>["onNodeExpanded"]
    >,
    onNodeCollapsed: sinon.fake() as SinonSpy<
      Required<TreeEvents>["onNodeCollapsed"]
    >,
    onDelayedNodeClick: sinon.fake() as SinonSpy<
      Required<TreeEvents>["onDelayedNodeClick"]
    >,
    onNodeEditorActivated: sinon.fake() as SinonSpy<
      Required<TreeEvents>["onNodeEditorActivated"]
    >,
    onCheckboxStateChanged: sinon.fake() as SinonSpy<
      Required<TreeEvents>["onCheckboxStateChanged"]
    >,
    onNodeDoubleClick: sinon.fake() as SinonSpy<
      Required<TreeEvents>["onNodeDoubleClick"]
    >,
  };

  beforeEach(() => {
    treeEvents.onSelectionModified.resetHistory();
    treeEvents.onSelectionReplaced.resetHistory();
    treeEvents.onNodeExpanded.resetHistory();
    treeEvents.onNodeCollapsed.resetHistory();
    treeEvents.onDelayedNodeClick.resetHistory();
    treeEvents.onNodeEditorActivated.resetHistory();
    treeEvents.onCheckboxStateChanged.resetHistory();
    treeEvents.onNodeDoubleClick.resetHistory();
  });

  function setupTreeEventDispatcher(
    selectionMode: SelectionMode,
    setupModel: (model: MutableTreeModel) => void,
    nodeLoader?: ITreeNodeLoader
  ) {
    const treeModel = new MutableTreeModel();
    setupModel(treeModel);

    const eventDispatcher = new TreeEventDispatcher(
      treeEvents,
      nodeLoader ?? { loadNode: sinon.fake() },
      selectionMode,
      () => computeVisibleNodes(treeModel)
    );
    return {
      dispatcher: eventDispatcher,
      treeModel,
    };
  }

  describe("single selection", () => {
    it("selects node", async () => {
      const { dispatcher } = setupTreeEventDispatcher(
        SelectionMode.Single,
        (model) => {
          model.setChildren(
            undefined,
            [createTreeNodeInput("A"), createTreeNodeInput("B")],
            0
          );
        }
      );

      dispatcher.onNodeClicked("A", {} as any);

      expect(treeEvents.onSelectionReplaced).to.be.calledOnce;
      const [args0] = treeEvents.onSelectionReplaced.args[0];
      expect(await extractSequence(toRxjsObservable(args0.replacements)))
        .to.have.lengthOf(1)
        .and.containSubset([{ selectedNodeItems: [{ id: "A" }] }]);

      dispatcher.onNodeClicked("B", {} as any);

      expect(treeEvents.onSelectionReplaced).to.be.calledTwice;
      const [args1] = treeEvents.onSelectionReplaced.args[1];
      expect(await extractSequence(toRxjsObservable(args1.replacements)))
        .to.have.lengthOf(1)
        .and.containSubset([{ selectedNodeItems: [{ id: "B" }] }]);
    });
  });

  describe("extended selection", () => {
    it("selects multiple nodes with CTRL", async () => {
      const { dispatcher } = setupTreeEventDispatcher(
        SelectionMode.Extended,
        (model) => {
          model.setChildren(
            undefined,
            [createTreeNodeInput("A"), createTreeNodeInput("B")],
            0
          );
        }
      );

      dispatcher.onNodeClicked("A", {} as any);
      expect(treeEvents.onSelectionReplaced).to.be.calledOnce;
      const [args0] = treeEvents.onSelectionReplaced.args[0];
      expect(await extractSequence(toRxjsObservable(args0.replacements)))
        .to.have.lengthOf(1)
        .and.containSubset([
          {
            selectedNodeItems: [{ id: "A" }],
          },
        ]);

      dispatcher.onNodeClicked("B", { ctrlKey: true } as any);
      expect(treeEvents.onSelectionModified).to.be.calledOnce;
      const [args1] = treeEvents.onSelectionModified.args[0];
      expect(await extractSequence(toRxjsObservable(args1.modifications)))
        .to.have.lengthOf(1)
        .and.containSubset([
          {
            selectedNodeItems: [{ id: "B" }],
          },
        ]);
    });

    it("deselects node with CTRL", async () => {
      const { dispatcher } = setupTreeEventDispatcher(
        SelectionMode.Extended,
        (model) => {
          model.setChildren(
            undefined,
            [
              createTreeNodeInput("A", { isSelected: true }),
              createTreeNodeInput("B"),
            ],
            0
          );
        }
      );

      dispatcher.onNodeClicked("A", { ctrlKey: true } as any);
      expect(treeEvents.onSelectionModified).to.be.calledOnce;
      const [args0] = treeEvents.onSelectionModified.args[0];
      expect(await extractSequence(toRxjsObservable(args0.modifications)))
        .to.have.lengthOf(1)
        .and.containSubset([
          {
            deselectedNodeItems: [{ id: "A" }],
          },
        ]);
    });

    it("selects multiple nodes with SHIFT", async () => {
      const { dispatcher } = setupTreeEventDispatcher(
        SelectionMode.Extended,
        (model) => {
          model.setChildren(
            undefined,
            [
              createTreeNodeInput("A"),
              createTreeNodeInput("B"),
              createTreeNodeInput("C"),
              createTreeNodeInput("D"),
            ],
            0
          );
        }
      );

      dispatcher.onNodeClicked("A", {} as any);
      expect(treeEvents.onSelectionReplaced).to.be.calledOnce;
      const [args0] = treeEvents.onSelectionReplaced.args[0];
      expect(await extractSequence(toRxjsObservable(args0.replacements)))
        .to.have.lengthOf(1)
        .and.containSubset([
          {
            selectedNodeItems: [{ id: "A" }],
          },
        ]);

      dispatcher.onNodeClicked("D", { shiftKey: true } as any);
      expect(treeEvents.onSelectionReplaced).to.be.calledTwice;
      const [args1] = treeEvents.onSelectionReplaced.args[1];
      expect(await extractSequence(toRxjsObservable(args1.replacements)))
        .to.have.lengthOf(1)
        .and.containSubset([
          {
            selectedNodeItems: [
              { id: "A" },
              { id: "B" },
              { id: "C" },
              { id: "D" },
            ],
          },
        ]);
    });

    it("selects multiple nodes with SHIFT and loads missing nodes", async () => {
      const { dispatcher } = setupTreeEventDispatcher(
        SelectionMode.Extended,
        (model) => {
          model.setNumChildren(undefined, 3);
          model.setChildren(undefined, [createTreeNodeInput("A")], 0);
          model.setChildren(undefined, [createTreeNodeInput("C")], 2);
        },
        {
          loadNode: sinon.fake(() => {
            // use async scheduler to simulate request
            return scheduled(
              [{ loadedNodes: [createTreeNodeInput("B").item] }],
              asyncScheduler
            );
          }),
        }
      );

      dispatcher.onNodeClicked("A", {} as any);
      expect(treeEvents.onSelectionReplaced).to.be.calledOnce;

      dispatcher.onNodeClicked("C", { shiftKey: true } as any);
      expect(treeEvents.onSelectionReplaced).to.be.calledTwice;
      const [args1] = treeEvents.onSelectionReplaced.args[1];
      expect(await extractSequence(toRxjsObservable(args1.replacements)))
        .to.have.lengthOf(2)
        .and.containSubset([
          {
            selectedNodeItems: [{ id: "A" }, { id: "C" }],
          },
          {
            selectedNodeItems: [{ id: "B" }],
          },
        ]);
    });

    it("selects multiple nodes with SHIFT in different hierarchy levels", async () => {
      const { dispatcher } = setupTreeEventDispatcher(
        SelectionMode.Extended,
        (model) => {
          model.setChildren(
            undefined,
            [
              createTreeNodeInput("A", { isExpanded: true }),
              createTreeNodeInput("B"),
              createTreeNodeInput("C"),
            ],
            0
          );
          model.setChildren("A", [createTreeNodeInput("A-A")], 0);
        }
      );

      dispatcher.onNodeClicked("A", {} as any);
      expect(treeEvents.onSelectionReplaced).to.be.calledOnce;

      dispatcher.onNodeClicked("C", { shiftKey: true } as any);
      expect(treeEvents.onSelectionReplaced).to.be.calledTwice;
      const [args1] = treeEvents.onSelectionReplaced.args[1];
      expect(await extractSequence(toRxjsObservable(args1.replacements)))
        .to.have.lengthOf(1)
        .and.containSubset([
          {
            selectedNodeItems: [
              { id: "A" },
              { id: "A-A" },
              { id: "B" },
              { id: "C" },
            ],
          },
        ]);
    });

    it("selects multiple nodes with SHIFT in different hierarchy levels and loads missing nodes", async () => {
      const { dispatcher } = setupTreeEventDispatcher(
        SelectionMode.Extended,
        (model) => {
          model.setChildren(
            undefined,
            [
              createTreeNodeInput("A", { isExpanded: true }),
              createTreeNodeInput("B"),
              createTreeNodeInput("C"),
            ],
            0
          );
          model.setNumChildren("A", 2);
          model.setChildren("A", [createTreeNodeInput("A-A")], 0);
        },
        {
          loadNode: sinon.fake((parent: TreeModelNode | TreeModelRootNode) => {
            expect(isTreeModelNode(parent));
            return scheduled(
              [{ loadedNodes: [createTreeNodeInput("A-B").item] }],
              asyncScheduler
            );
          }),
        }
      );

      dispatcher.onNodeClicked("A", {} as any);
      expect(treeEvents.onSelectionReplaced).to.be.calledOnce;

      dispatcher.onNodeClicked("C", { shiftKey: true } as any);
      expect(treeEvents.onSelectionReplaced).to.be.calledTwice;
      const [args1] = treeEvents.onSelectionReplaced.args[1];
      expect(await extractSequence(toRxjsObservable(args1.replacements)))
        .to.have.lengthOf(2)
        .and.containSubset([
          {
            selectedNodeItems: [
              { id: "A" },
              { id: "A-A" },
              { id: "B" },
              { id: "C" },
            ],
          },
          {
            selectedNodeItems: [{ id: "A-B" }],
          },
        ]);
    });

    it("selects single node with SHIFT", async () => {
      const { dispatcher } = setupTreeEventDispatcher(
        SelectionMode.Extended,
        (model) => {
          model.setChildren(undefined, [createTreeNodeInput("A")], 0);
        }
      );

      dispatcher.onNodeClicked("A", {} as any);
      expect(treeEvents.onSelectionReplaced).to.be.calledOnce;

      dispatcher.onNodeClicked("A", { shiftKey: true } as any);
      expect(treeEvents.onSelectionReplaced).to.be.calledTwice;
      const [args1] = treeEvents.onSelectionReplaced.args[1];
      expect(await extractSequence(toRxjsObservable(args1.replacements)))
        .to.have.lengthOf(1)
        .and.containSubset([
          {
            selectedNodeItems: [{ id: "A" }],
          },
        ]);
    });
  });

  describe("drag selection", () => {
    it("selects nodes", async () => {
      const { dispatcher } = setupTreeEventDispatcher(
        SelectionMode.Multiple,
        (model) => {
          model.setChildren(
            undefined,
            [
              createTreeNodeInput("A"),
              createTreeNodeInput("B"),
              createTreeNodeInput("C"),
            ],
            0
          );
        }
      );

      dispatcher.onNodeMouseDown("A");
      expect(treeEvents.onSelectionModified).to.be.calledOnce;
      const [args0] = treeEvents.onSelectionModified.args[0];
      const result0 = startExtractingSequence(
        toRxjsObservable(args0.modifications)
      );

      dispatcher.onNodeMouseMove("A");
      dispatcher.onNodeMouseMove("B");
      dispatcher.onNodeMouseMove("C");
      fireEvent.mouseUp(window);

      await result0.waitForComplete;
      expect(result0.current.sequence)
        .to.have.lengthOf(2)
        .and.containSubset([
          {
            selectedNodeItems: [{ id: "A" }, { id: "B" }],
            deselectedNodeItems: [],
          },
          {
            selectedNodeItems: [{ id: "C" }],
            deselectedNodeItems: [],
          },
        ]);

      // `onSelectionModified` is called second time with selected items when drag operation is completed
      expect(treeEvents.onSelectionModified).to.be.calledTwice;
      const [args1] = treeEvents.onSelectionModified.args[1];
      expect(await extractSequence(toRxjsObservable(args1.modifications)))
        .to.have.lengthOf(1)
        .and.containSubset([
          { selectedNodeItems: [{ id: "A" }, { id: "B" }, { id: "C" }] },
        ]);
    });

    it("deselects selected nodes", async () => {
      const { dispatcher } = setupTreeEventDispatcher(
        SelectionMode.Multiple,
        (model) => {
          model.setChildren(
            undefined,
            [
              createTreeNodeInput("A"),
              createTreeNodeInput("B", { isSelected: true }),
              createTreeNodeInput("C"),
            ],
            0
          );
        }
      );

      dispatcher.onNodeMouseDown("A");
      expect(treeEvents.onSelectionModified).to.be.calledOnce;
      const [args0] = treeEvents.onSelectionModified.args[0];
      const result0 = startExtractingSequence(
        toRxjsObservable(args0.modifications)
      );

      dispatcher.onNodeMouseMove("A");
      dispatcher.onNodeMouseMove("B");
      dispatcher.onNodeMouseMove("C");

      fireEvent.mouseUp(window);

      await result0.waitForComplete;
      expect(result0.current.sequence)
        .to.have.lengthOf(2)
        .and.containSubset([
          {
            selectedNodeItems: [{ id: "A" }],
            deselectedNodeItems: [{ id: "B" }],
          },
          {
            selectedNodeItems: [{ id: "C" }],
            deselectedNodeItems: [],
          },
        ]);

      // `onSelectionModified` is called two more times when drag operation is completed:
      // - first call has all the items that were selected during drag operation
      // - second call has all the items that were deselected during drag operation
      expect(treeEvents.onSelectionModified).to.be.calledThrice;
      const [args1] = treeEvents.onSelectionModified.args[1];
      expect(await extractSequence(toRxjsObservable(args1.modifications)))
        .to.have.lengthOf(1)
        .and.containSubset([
          {
            selectedNodeItems: [{ id: "A" }, { id: "C" }],
          },
        ]);

      const [args2] = treeEvents.onSelectionModified.args[2];
      expect(await extractSequence(toRxjsObservable(args2.modifications)))
        .to.have.lengthOf(1)
        .and.containSubset([
          {
            deselectedNodeItems: [{ id: "B" }],
          },
        ]);
    });
  });

  describe("checkbox click", () => {
    it("does not raise event if non-existing node is clicked", async () => {
      const { dispatcher } = setupTreeEventDispatcher(
        SelectionMode.Multiple,
        (model) => {
          model.setChildren(undefined, [createTreeNodeInput("A")], 0);
        }
      );

      dispatcher.onNodeCheckboxClicked("B", CheckBoxState.On);
      expect(treeEvents.onCheckboxStateChanged).to.not.be.called;
    });

    it("checks checkbox state", async () => {
      const { dispatcher } = setupTreeEventDispatcher(
        SelectionMode.Multiple,
        (model) => {
          model.setChildren(undefined, [createTreeNodeInput("A")], 0);
        }
      );

      dispatcher.onNodeCheckboxClicked("A", CheckBoxState.On);

      expect(treeEvents.onCheckboxStateChanged).to.be.calledOnce;
      const [args] = treeEvents.onCheckboxStateChanged.args[0];
      expect(await extractSequence(toRxjsObservable(args.stateChanges)))
        .to.have.lengthOf(1)
        .and.containSubset([
          [{ nodeItem: { id: "A" }, newState: CheckBoxState.On }],
        ]);
    });

    it("unchecks checkbox state", async () => {
      const { dispatcher } = setupTreeEventDispatcher(
        SelectionMode.Multiple,
        (model) => {
          model.setChildren(undefined, [createTreeNodeInput("A")], 0);
        }
      );

      dispatcher.onNodeCheckboxClicked("A", CheckBoxState.Off);

      expect(treeEvents.onCheckboxStateChanged).to.be.calledOnce;
      const [args] = treeEvents.onCheckboxStateChanged.args[0];
      expect(await extractSequence(toRxjsObservable(args.stateChanges)))
        .to.have.lengthOf(1)
        .and.containSubset([
          [{ nodeItem: { id: "A" }, newState: CheckBoxState.Off }],
        ]);
    });

    it("checks selected nodes checkboxes", async () => {
      const { dispatcher } = setupTreeEventDispatcher(
        SelectionMode.Multiple,
        (model) => {
          model.setChildren(
            undefined,
            [
              createTreeNodeInput("A", { isSelected: true }),
              createTreeNodeInput("B"),
              createTreeNodeInput("C", { isSelected: true }),
            ],
            0
          );
        }
      );

      dispatcher.onNodeCheckboxClicked("A", CheckBoxState.On);
      expect(treeEvents.onCheckboxStateChanged).to.be.calledOnce;
      const [args] = treeEvents.onCheckboxStateChanged.args[0];
      expect(await extractSequence(toRxjsObservable(args.stateChanges)))
        .to.have.lengthOf(1)
        .and.containSubset([
          [
            { nodeItem: { id: "A" }, newState: CheckBoxState.On },
            { nodeItem: { id: "C" }, newState: CheckBoxState.On },
          ],
        ]);
    });

    it("checks only unchecked selected nodes checkboxes", async () => {
      const { dispatcher } = setupTreeEventDispatcher(
        SelectionMode.Multiple,
        (model) => {
          model.setChildren(
            undefined,
            [
              createTreeNodeInput("A", { isSelected: true }),
              createTreeNodeInput("B", { isSelected: true }),
              createTreeNodeInput("C", { isSelected: true }),
            ],
            0
          );
          model.getNode("B")!.checkbox.state = CheckBoxState.On;
        }
      );

      dispatcher.onNodeCheckboxClicked("A", CheckBoxState.On);
      expect(treeEvents.onCheckboxStateChanged).to.be.calledOnce;
      const [args] = treeEvents.onCheckboxStateChanged.args[0];
      expect(await extractSequence(toRxjsObservable(args.stateChanges)))
        .to.have.lengthOf(1)
        .and.containSubset([
          [
            { nodeItem: { id: "A" }, newState: CheckBoxState.On },
            { nodeItem: { id: "C" }, newState: CheckBoxState.On },
          ],
        ]);
    });

    it("checks selected node checkbox when node is loaded", async () => {
      const nodeLoadSubject = new Subject<TreeNodeLoadResult>();
      const { dispatcher, treeModel } = setupTreeEventDispatcher(
        SelectionMode.Extended,
        (model) => {
          model.setNumChildren(undefined, 3);
          model.setChildren(undefined, [createTreeNodeInput("A")], 0);
          model.setChildren(undefined, [createTreeNodeInput("C")], 2);
        },
        {
          loadNode: sinon.fake(() => nodeLoadSubject),
        }
      );

      // make range selection over unloaded node
      dispatcher.onNodeClicked("A", {} as any);
      dispatcher.onNodeClicked("C", { shiftKey: true } as any);
      expect(treeEvents.onSelectionReplaced).to.be.calledTwice;
      const [selectionArgs] = treeEvents.onSelectionReplaced.args[1];
      const selectionResult = startExtractingSequence(
        toRxjsObservable(selectionArgs.replacements)
      );

      // wait for notification that A and C nodes were selected
      await waitFor(() => {
        expect(selectionResult.current.sequence)
          .to.have.lengthOf(1)
          .and.containSubset([
            { selectedNodeItems: [{ id: "A" }, { id: "C" }] },
          ]);
      });

      // select nodes in the model
      treeModel.getNode("A")!.isSelected = true;
      treeModel.getNode("C")!.isSelected = true;

      dispatcher.onNodeCheckboxClicked("A", CheckBoxState.On);
      expect(treeEvents.onCheckboxStateChanged).to.be.calledOnce;
      const [checkboxArgs] = treeEvents.onCheckboxStateChanged.args[0];
      const checkboxResult = startExtractingSequence(
        toRxjsObservable(checkboxArgs.stateChanges)
      );

      // finish node loading
      of({
        loadedNodes: [createTreeNodeInput("B").item],
      }).subscribe(nodeLoadSubject);

      await selectionResult.waitForComplete;
      await checkboxResult.waitForComplete;
      expect(checkboxResult.current.sequence)
        .to.have.lengthOf(3)
        .and.containSubset([
          // first notification about A and C checkbox state from immediate click
          [
            { nodeItem: { id: "A" }, newState: CheckBoxState.On },
            { nodeItem: { id: "C" }, newState: CheckBoxState.On },
          ],
          // second notification about A and C checkbox state from range selection
          [
            { nodeItem: { id: "A" }, newState: CheckBoxState.On },
            { nodeItem: { id: "C" }, newState: CheckBoxState.On },
          ],
          // notification about B checkbox state after it was loaded
          [{ nodeItem: { id: "B" }, newState: CheckBoxState.On }],
        ]);
    });
  });

  describe("editor activation", () => {
    it("does not raise tree event if node is not selected", () => {
      const { dispatcher } = setupTreeEventDispatcher(
        SelectionMode.Extended,
        (model) => {
          model.setChildren(undefined, [createTreeNodeInput("A")], 0);
        }
      );

      dispatcher.onNodeEditorActivated("A");
      expect(treeEvents.onNodeEditorActivated).to.not.be.called;
    });

    it("does not raise tree event if node id in invalid", () => {
      const { dispatcher } = setupTreeEventDispatcher(
        SelectionMode.Extended,
        (model) => {
          model.setChildren(
            undefined,
            [createTreeNodeInput("A", { isSelected: true })],
            0
          );
        }
      );

      dispatcher.onNodeEditorActivated("B");
      expect(treeEvents.onNodeEditorActivated).to.not.be.called;
    });

    it("raises tree event if node is selected", () => {
      const { dispatcher } = setupTreeEventDispatcher(
        SelectionMode.Extended,
        (model) => {
          model.setChildren(
            undefined,
            [createTreeNodeInput("A", { isSelected: true })],
            0
          );
        }
      );

      dispatcher.onNodeEditorActivated("A");
      expect(treeEvents.onNodeEditorActivated).to.be.calledOnceWith({
        nodeId: "A",
      });
    });
  });

  describe("delayed click", () => {
    it("does not raise tree event when clicked node is not selected", () => {
      const { dispatcher } = setupTreeEventDispatcher(
        SelectionMode.Extended,
        (model) => {
          model.setChildren(undefined, [createTreeNodeInput("A")], 0);
        }
      );

      dispatcher.onNodeClicked("A", {} as any);
      expect(treeEvents.onDelayedNodeClick).to.not.be.called;
    });

    it("does not raise tree event when clicked node does not exist", () => {
      const { dispatcher } = setupTreeEventDispatcher(
        SelectionMode.Extended,
        (model) => {
          model.setChildren(
            undefined,
            [createTreeNodeInput("A", { isSelected: true })],
            0
          );
        }
      );

      dispatcher.onNodeClicked("B", {} as any);
      expect(treeEvents.onDelayedNodeClick).to.not.be.called;
    });

    it("raises tree event when clicked node is selected", () => {
      const { dispatcher } = setupTreeEventDispatcher(
        SelectionMode.Extended,
        (model) => {
          model.setChildren(
            undefined,
            [createTreeNodeInput("A", { isSelected: true })],
            0
          );
        }
      );

      dispatcher.onNodeClicked("A", {} as any);
      expect(treeEvents.onDelayedNodeClick).to.be.calledOnceWith({
        nodeId: "A",
      });
    });
  });

  it("raises tree event when node is expanded", () => {
    const { dispatcher } = setupTreeEventDispatcher(
      SelectionMode.Extended,
      (model) => {
        model.setChildren(undefined, [createTreeNodeInput("A")], 0);
      }
    );
    dispatcher.onNodeExpanded("A");
    expect(treeEvents.onNodeExpanded).to.be.calledOnceWith({ nodeId: "A" });
  });

  it("raises tree event when node is collapsed", () => {
    const { dispatcher } = setupTreeEventDispatcher(
      SelectionMode.Extended,
      (model) => {
        model.setChildren(undefined, [createTreeNodeInput("A")], 0);
      }
    );
    dispatcher.onNodeCollapsed("A");
    expect(treeEvents.onNodeCollapsed).to.be.calledOnceWith({ nodeId: "A" });
  });

  describe("double-click", () => {
    it("calls onNodeDoubleClicked when node is double-clicked", () => {
      const { dispatcher } = setupTreeEventDispatcher(
        SelectionMode.Extended,
        (model) => {
          model.setChildren(
            undefined,
            [createTreeNodeInput("A", { isSelected: true })],
            0
          );
        }
      );

      dispatcher.onNodeClicked("A", { detail: 2 } as any);
      expect(treeEvents.onNodeDoubleClick).to.be.called;
      expect(treeEvents.onSelectionReplaced).to.not.be.called;
    });

    it("calls onNodeDoubleClicked and onSelectionReplaced when a node that is not selected is double-clicked", () => {
      const { dispatcher } = setupTreeEventDispatcher(
        SelectionMode.Extended,
        (model) => {
          model.setChildren(
            undefined,
            [createTreeNodeInput("A", { isSelected: false })],
            0
          );
        }
      );

      dispatcher.onNodeClicked("A", { detail: 2 } as any);
      expect(treeEvents.onNodeDoubleClick).to.be.called;
      expect(treeEvents.onSelectionReplaced).to.be.called;
    });
  });

  describe("keyboard navigation", () => {
    it("forwards events to `TreeSelectionManager`", () => {
      const { dispatcher } = setupTreeEventDispatcher(
        SelectionMode.Extended,
        (model) => {
          model.setChildren(undefined, [createTreeNodeInput("A")], 0);
        }
      );
      const selectionManager = (dispatcher as any)
        ._selectionManager as TreeSelectionManager;
      const onKeyDownStub = sinon.stub(selectionManager, "onTreeKeyDown");
      const onKeyUpStub = sinon.stub(selectionManager, "onTreeKeyUp");

      dispatcher.onTreeKeyDown({} as any);
      expect(onKeyDownStub).to.be.calledOnce;

      dispatcher.onTreeKeyUp({} as any);
      expect(onKeyUpStub).to.be.calledOnce;
    });
  });

  describe("non-selectable node", () => {
    describe("when clicked", () => {
      it("does not select the clicked node", async () => {
        const { dispatcher } = setupTreeEventDispatcher(
          SelectionMode.Extended,
          (model) => {
            model.setChildren(
              undefined,
              [
                createTreeNodeInput("A"),
                createTreeNodeInput("B"),
                createTreeNodeInput("C"),
              ],
              0
            );
            model.getNode("B")!.isSelectionDisabled = true;
          }
        );

        dispatcher.onNodeClicked("B", {} as any);

        expect(treeEvents.onSelectionModified).not.to.have.been.called;
        expect(treeEvents.onSelectionReplaced).to.have.been.calledOnce;
        const changes = await extractSequence(
          toRxjsObservable(
            treeEvents.onSelectionReplaced.firstCall.args[0].replacements
          )
        );
        expect(changes).to.be.deep.equal([
          { selectedNodeItems: [], deselectedNodeItems: [] },
        ]);
      });

      it("performs range selection without selecting the clicked node", async () => {
        const { dispatcher } = setupTreeEventDispatcher(
          SelectionMode.Extended,
          (model) => {
            model.setChildren(
              undefined,
              [
                createTreeNodeInput("A"),
                createTreeNodeInput("B"),
                createTreeNodeInput("C"),
                createTreeNodeInput("D"),
              ],
              0
            );
            model.getNode("B")!.isSelectionDisabled = true;
          }
        );
        dispatcher.onNodeClicked("D", {} as any);
        dispatcher.onNodeClicked("B", { shiftKey: true } as any);

        expect(treeEvents.onSelectionModified).not.to.have.been.called;
        expect(treeEvents.onSelectionReplaced).to.have.been.calledTwice;
        const changes = await extractSequence(
          toRxjsObservable(
            treeEvents.onSelectionReplaced.secondCall.args[0].replacements
          )
        );
        expect(changes.length).to.be.equal(1);
        expect(changes[0].selectedNodeItems).to.containSubset([
          { id: "C" },
          { id: "D" },
        ]);
      });
    });

    describe("when a non-selectable node is inside selection range", () => {
      it("does not get selected when it is already loaded", async () => {
        const { dispatcher } = setupTreeEventDispatcher(
          SelectionMode.Extended,
          (model) => {
            model.setChildren(
              undefined,
              [
                createTreeNodeInput("A"),
                createTreeNodeInput("B"),
                createTreeNodeInput("C"),
                createTreeNodeInput("D"),
              ],
              0
            );
            model.getNode("B")!.isSelectionDisabled = true;
          }
        );
        dispatcher.onNodeClicked("A", {} as any);
        dispatcher.onNodeClicked("C", { shiftKey: true } as any);

        expect(treeEvents.onSelectionModified).not.to.have.been.called;
        expect(treeEvents.onSelectionReplaced).to.have.been.calledTwice;
        const changes = await extractSequence(
          toRxjsObservable(
            treeEvents.onSelectionReplaced.secondCall.args[0].replacements
          )
        );
        expect(changes.length).to.be.equal(1);
        expect(changes[0].selectedNodeItems).to.containSubset([
          { id: "A" },
          { id: "C" },
        ]);
      });

      it("gets loaded but does not get selected", async () => {
        const nodeLoader: ITreeNodeLoader = {
          loadNode: sinon.fake(() => {
            const nodeItem = createTreeNodeInput("B").item;
            nodeItem.isSelectionDisabled = true;
            return from([{ loadedNodes: [nodeItem] }]);
          }),
        };
        const { dispatcher } = setupTreeEventDispatcher(
          SelectionMode.Extended,
          (model) => {
            model.setNumChildren(undefined, 3);
            model.insertChild(undefined, createTreeNodeInput("A"), 0);
            model.insertChild(undefined, createTreeNodeInput("C"), 2);
          },
          nodeLoader
        );

        dispatcher.onNodeClicked("A", {} as any);
        dispatcher.onNodeClicked("C", { shiftKey: true } as any);

        expect(treeEvents.onSelectionModified).not.to.have.been.called;
        expect(treeEvents.onSelectionReplaced).to.have.been.calledTwice;
        expect(nodeLoader.loadNode).to.have.been.calledOnce;
        const changes = await extractSequence(
          toRxjsObservable(
            treeEvents.onSelectionReplaced.secondCall.args[0].replacements
          )
        );
        expect(changes.length).to.be.equal(1);
        expect(changes).to.containSubset([
          { selectedNodeItems: [{ id: "A" }, { id: "C" }] },
          {},
        ]);
      });
    });
  });
});
