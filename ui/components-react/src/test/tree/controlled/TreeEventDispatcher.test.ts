/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { SelectionMode } from "../../../components-react/common/selection/SelectionModes.js";
import { toRxjsObservable } from "../../../components-react/tree/controlled/Observable.js";
import { TreeEventDispatcher } from "../../../components-react/tree/controlled/TreeEventDispatcher.js";
import type {
  TreeEvents,
  TreeSelectionModificationEventArgs,
} from "../../../components-react/tree/controlled/TreeEvents.js";
import type {
  TreeModelNode,
  TreeModelRootNode,
} from "../../../components-react/tree/controlled/TreeModel.js";
import {
  computeVisibleNodes,
  isTreeModelNode,
  MutableTreeModel,
} from "../../../components-react/tree/controlled/TreeModel.js";
import type {
  ITreeNodeLoader,
  TreeNodeLoadResult,
} from "../../../components-react/tree/controlled/TreeNodeLoader.js";
import {
  extractSequence,
  startExtractingSequence,
} from "../../common/ObservableTestHelpers.js";
import { createTreeNodeInput } from "./TreeHelpers.js";
import { fireEvent, waitFor } from "@testing-library/react";
import { asyncScheduler, from, of, scheduled, Subject } from "rxjs";
import { CheckBoxState } from "@itwin/core-react";
import type { TreeSelectionManager } from "../../../components-react/tree/controlled/internal/TreeSelectionManager.js";

describe("TreeEventDispatcher", () => {
  const treeEvents = {
    onSelectionModified: vi.fn(),
    onSelectionReplaced: vi.fn(),
    onNodeExpanded: vi.fn(),
    onNodeCollapsed: vi.fn(),
    onDelayedNodeClick: vi.fn(),
    onNodeEditorActivated: vi.fn(),
    onCheckboxStateChanged: vi.fn(),
    onNodeDoubleClick: vi.fn(),
  } satisfies TreeEvents;

  function setupTreeEventDispatcher(
    selectionMode: SelectionMode,
    setupModel: (model: MutableTreeModel) => void,
    nodeLoader?: ITreeNodeLoader
  ) {
    const treeModel = new MutableTreeModel();
    setupModel(treeModel);

    const eventDispatcher = new TreeEventDispatcher(
      treeEvents,
      nodeLoader ?? { loadNode: vi.fn() },
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

      expect(treeEvents.onSelectionReplaced).toHaveBeenCalledOnce();
      const [args0] = treeEvents.onSelectionReplaced.mock.calls[0];
      expect(await extractSequence(toRxjsObservable(args0.replacements)))
        .to.have.lengthOf(1)
        .and.containSubset([{ selectedNodeItems: [{ id: "A" }] }]);

      dispatcher.onNodeClicked("B", {} as any);

      expect(treeEvents.onSelectionReplaced).toHaveBeenCalledTimes(2);
      const [args1] = treeEvents.onSelectionReplaced.mock.calls[1];
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
      expect(treeEvents.onSelectionReplaced).toHaveBeenCalledOnce();
      const [args0] = treeEvents.onSelectionReplaced.mock.calls[0];
      expect(await extractSequence(toRxjsObservable(args0.replacements)))
        .to.have.lengthOf(1)
        .and.containSubset([
          {
            selectedNodeItems: [{ id: "A" }],
          },
        ]);

      dispatcher.onNodeClicked("B", { ctrlKey: true } as any);
      expect(treeEvents.onSelectionModified).toHaveBeenCalledOnce();
      const [args1] = treeEvents.onSelectionModified.mock.calls[0];
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
      expect(treeEvents.onSelectionModified).toHaveBeenCalledOnce();
      const [args0] = treeEvents.onSelectionModified.mock.calls[0];
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
      expect(treeEvents.onSelectionReplaced).toHaveBeenCalledOnce();
      const [args0] = treeEvents.onSelectionReplaced.mock.calls[0];
      expect(await extractSequence(toRxjsObservable(args0.replacements)))
        .to.have.lengthOf(1)
        .and.containSubset([
          {
            selectedNodeItems: [{ id: "A" }],
          },
        ]);

      dispatcher.onNodeClicked("D", { shiftKey: true } as any);
      expect(treeEvents.onSelectionReplaced).toHaveBeenCalledTimes(2);
      const [args1] = treeEvents.onSelectionReplaced.mock.calls[1];
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
          loadNode: vi.fn(() => {
            // use async scheduler to simulate request
            return scheduled(
              [{ loadedNodes: [createTreeNodeInput("B").item] }],
              asyncScheduler
            );
          }),
        }
      );

      dispatcher.onNodeClicked("A", {} as any);
      expect(treeEvents.onSelectionReplaced).toHaveBeenCalledOnce();

      dispatcher.onNodeClicked("C", { shiftKey: true } as any);
      expect(treeEvents.onSelectionReplaced).toHaveBeenCalledTimes(2);
      const [args1] = treeEvents.onSelectionReplaced.mock.calls[1];
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
      expect(treeEvents.onSelectionReplaced).toHaveBeenCalledOnce();

      dispatcher.onNodeClicked("C", { shiftKey: true } as any);
      expect(treeEvents.onSelectionReplaced).toHaveBeenCalledTimes(2);
      const [args1] = treeEvents.onSelectionReplaced.mock.calls[1];
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
          loadNode: vi.fn((parent: TreeModelNode | TreeModelRootNode) => {
            expect(isTreeModelNode(parent));
            return scheduled(
              [{ loadedNodes: [createTreeNodeInput("A-B").item] }],
              asyncScheduler
            );
          }),
        }
      );

      dispatcher.onNodeClicked("A", {} as any);
      expect(treeEvents.onSelectionReplaced).toHaveBeenCalledOnce();

      dispatcher.onNodeClicked("C", { shiftKey: true } as any);
      expect(treeEvents.onSelectionReplaced).toHaveBeenCalledTimes(2);
      const [args1] = treeEvents.onSelectionReplaced.mock.calls[1];
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
      expect(treeEvents.onSelectionReplaced).toHaveBeenCalledOnce();

      dispatcher.onNodeClicked("A", { shiftKey: true } as any);
      expect(treeEvents.onSelectionReplaced).toHaveBeenCalledTimes(2);
      const [args1] = treeEvents.onSelectionReplaced.mock.calls[1];
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

      const results: ReturnType<typeof startExtractingSequence>[] = [];
      treeEvents.onSelectionModified.mockImplementation(
        (event: TreeSelectionModificationEventArgs) => {
          results.push(
            startExtractingSequence(toRxjsObservable(event.modifications))
          );
          return undefined;
        }
      );
      dispatcher.onNodeMouseDown("A");
      dispatcher.onNodeMouseMove("B");

      expect(treeEvents.onSelectionModified).toHaveBeenCalledOnce();

      dispatcher.onNodeMouseMove("C");
      fireEvent.mouseUp(window);

      await results[0].waitForComplete;
      expect(results[0].current.sequence)
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
      expect(treeEvents.onSelectionModified).toHaveBeenCalledTimes(2);
      await results[1].waitForComplete;
      expect(results[1].current.sequence)
        .to.have.lengthOf(1)
        .and.containSubset([
          { selectedNodeItems: [{ id: "A" }, { id: "B" }, { id: "C" }] },
        ]);
    });

    it("does not start drag operation when only initial node is selected", async () => {
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
      dispatcher.onNodeMouseMove("A");
      fireEvent.mouseUp(window);

      expect(treeEvents.onSelectionModified).not.toBeCalled();
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

      const results: ReturnType<typeof startExtractingSequence>[] = [];
      treeEvents.onSelectionModified.mockImplementation(
        (event: TreeSelectionModificationEventArgs) => {
          results.push(
            startExtractingSequence(toRxjsObservable(event.modifications))
          );
          return undefined;
        }
      );
      dispatcher.onNodeMouseDown("A");
      dispatcher.onNodeMouseMove("B");

      expect(treeEvents.onSelectionModified).toHaveBeenCalledOnce();

      dispatcher.onNodeMouseMove("C");
      fireEvent.mouseUp(window);

      await results[0].waitForComplete;
      expect(results[0].current.sequence)
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
      expect(treeEvents.onSelectionModified).toHaveBeenCalledTimes(3);
      await results[1].waitForComplete;
      expect(results[1].current.sequence)
        .to.have.lengthOf(1)
        .and.containSubset([
          {
            selectedNodeItems: [{ id: "A" }, { id: "C" }],
          },
        ]);

      await results[2].waitForComplete;
      expect(results[2].current.sequence)
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
      expect(treeEvents.onCheckboxStateChanged).not.toBeCalled();
    });

    it("checks checkbox state", async () => {
      const { dispatcher } = setupTreeEventDispatcher(
        SelectionMode.Multiple,
        (model) => {
          model.setChildren(undefined, [createTreeNodeInput("A")], 0);
        }
      );

      dispatcher.onNodeCheckboxClicked("A", CheckBoxState.On);

      expect(treeEvents.onCheckboxStateChanged).toHaveBeenCalledOnce();
      const [args] = treeEvents.onCheckboxStateChanged.mock.calls[0];
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

      expect(treeEvents.onCheckboxStateChanged).toHaveBeenCalledOnce();
      const [args] = treeEvents.onCheckboxStateChanged.mock.calls[0];
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
      expect(treeEvents.onCheckboxStateChanged).toHaveBeenCalledOnce();
      const [args] = treeEvents.onCheckboxStateChanged.mock.calls[0];
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
      expect(treeEvents.onCheckboxStateChanged).toHaveBeenCalledOnce();
      const [args] = treeEvents.onCheckboxStateChanged.mock.calls[0];
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
          loadNode: vi.fn(() => nodeLoadSubject),
        }
      );

      // make range selection over unloaded node
      dispatcher.onNodeClicked("A", {} as any);
      dispatcher.onNodeClicked("C", { shiftKey: true } as any);
      expect(treeEvents.onSelectionReplaced).toHaveBeenCalledTimes(2);
      const [selectionArgs] = treeEvents.onSelectionReplaced.mock.calls[1];
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
      expect(treeEvents.onCheckboxStateChanged).toHaveBeenCalledOnce();
      const [checkboxArgs] = treeEvents.onCheckboxStateChanged.mock.calls[0];
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
      expect(treeEvents.onNodeEditorActivated).not.toBeCalled();
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
      expect(treeEvents.onNodeEditorActivated).not.toBeCalled();
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
      expect(treeEvents.onNodeEditorActivated).toHaveBeenCalledWith({
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
      expect(treeEvents.onDelayedNodeClick).not.toBeCalled();
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
      expect(treeEvents.onDelayedNodeClick).not.toBeCalled();
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
      expect(treeEvents.onDelayedNodeClick).toHaveBeenCalledWith({
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
    expect(treeEvents.onNodeExpanded).toHaveBeenCalledWith({ nodeId: "A" });
  });

  it("raises tree event when node is collapsed", () => {
    const { dispatcher } = setupTreeEventDispatcher(
      SelectionMode.Extended,
      (model) => {
        model.setChildren(undefined, [createTreeNodeInput("A")], 0);
      }
    );
    dispatcher.onNodeCollapsed("A");
    expect(treeEvents.onNodeCollapsed).toHaveBeenCalledWith({ nodeId: "A" });
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
      expect(treeEvents.onNodeDoubleClick).toHaveBeenCalled();
      expect(treeEvents.onSelectionReplaced).not.toBeCalled();
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
      expect(treeEvents.onNodeDoubleClick).toHaveBeenCalled();
      expect(treeEvents.onSelectionReplaced).toHaveBeenCalled();
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
      const onKeyDownStub = vi.spyOn(selectionManager, "onTreeKeyDown");
      const onKeyUpStub = vi.spyOn(selectionManager, "onTreeKeyUp");

      dispatcher.onTreeKeyDown({} as any);
      expect(onKeyDownStub).toHaveBeenCalledOnce();

      dispatcher.onTreeKeyUp({} as any);
      expect(onKeyUpStub).toHaveBeenCalledOnce();
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

        expect(treeEvents.onSelectionModified).not.toBeCalled();
        expect(treeEvents.onSelectionReplaced).toHaveBeenCalledOnce();
        const changes = await extractSequence(
          toRxjsObservable(
            treeEvents.onSelectionReplaced.mock.calls[0][0].replacements
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

        expect(treeEvents.onSelectionModified).not.toBeCalled();
        expect(treeEvents.onSelectionReplaced).toHaveBeenCalledTimes(2);
        const changes = await extractSequence(
          toRxjsObservable(
            treeEvents.onSelectionReplaced.mock.calls[1][0].replacements
          )
        );
        expect(changes.length).toEqual(1);
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

        expect(treeEvents.onSelectionModified).not.toBeCalled();
        expect(treeEvents.onSelectionReplaced).toHaveBeenCalledTimes(2);
        const changes = await extractSequence(
          toRxjsObservable(
            treeEvents.onSelectionReplaced.mock.calls[1][0].replacements
          )
        );
        expect(changes.length).toEqual(1);
        expect(changes[0].selectedNodeItems).to.containSubset([
          { id: "A" },
          { id: "C" },
        ]);
      });

      it("gets loaded but does not get selected", async () => {
        const nodeLoader: ITreeNodeLoader = {
          loadNode: vi.fn(() => {
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

        expect(treeEvents.onSelectionModified).not.toBeCalled();
        expect(treeEvents.onSelectionReplaced).toHaveBeenCalledTimes(2);
        expect(nodeLoader.loadNode).toHaveBeenCalledOnce();
        const changes = await extractSequence(
          toRxjsObservable(
            treeEvents.onSelectionReplaced.mock.calls[1][0].replacements
          )
        );
        expect(changes.length).toEqual(1);
        expect(changes).to.containSubset([
          { selectedNodeItems: [{ id: "A" }, { id: "C" }] },
          {},
        ]);
      });
    });
  });
});
