/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Tree
 */

import type { Observable } from "rxjs";
import {
  asapScheduler,
  concat,
  concatAll,
  concatMap,
  defer,
  distinctUntilChanged,
  EMPTY,
  filter,
  finalize,
  from,
  map,
  merge,
  mergeAll,
  of,
  shareReplay,
  subscribeOn,
  toArray,
} from "rxjs";
import type { CheckBoxState } from "@itwin/core-react";
import type { SelectionMode } from "../../common/selection/SelectionModes";
import type { TreeNodeItem } from "../TreeDataProvider";
import type {
  IndividualSelection,
  RangeSelection,
} from "./internal/TreeSelectionManager";
import {
  isRangeSelection,
  TreeSelectionManager,
} from "./internal/TreeSelectionManager";
import type { TreeActions } from "./TreeActions";
import type { TreeEvents } from "./TreeEvents";
import type {
  TreeModelNode,
  TreeModelNodePlaceholder,
  VisibleTreeNodes,
} from "./TreeModel";
import { isTreeModelNode } from "./TreeModel";
import type { ITreeNodeLoader } from "./TreeNodeLoader";
import { toRxjsObservable } from "./Observable";

/**
 * Default event dispatcher that emits tree events according performed actions.
 * It converts low level tree events into TreeEvents.
 * @internal
 */
export class TreeEventDispatcher implements TreeActions {
  private _treeEvents: TreeEvents;
  private _nodeLoader: ITreeNodeLoader;
  private _getVisibleNodes: () => VisibleTreeNodes;

  private _selectionManager: TreeSelectionManager;

  private _activeSelections = new Set<
    Observable<{
      selectedNodeItems: TreeNodeItem[];
      deselectedNodeItems?: TreeNodeItem[];
    }>
  >();

  constructor(
    treeEvents: TreeEvents,
    nodeLoader: ITreeNodeLoader,
    selectionMode: SelectionMode,
    getVisibleNodes: () => VisibleTreeNodes
  ) {
    this._treeEvents = treeEvents;
    this._nodeLoader = nodeLoader;
    this._getVisibleNodes = getVisibleNodes;

    this._selectionManager = new TreeSelectionManager(
      selectionMode,
      this._getVisibleNodes
    );

    this._selectionManager.onDragSelection.addListener(
      ({ selectionChanges }) => {
        const modifications = selectionChanges.pipe(
          map(({ selectedNodes, deselectedNodes }) =>
            this.collectSelectionChanges(selectedNodes, []).pipe(
              concatMap(({ selectedNodeItems }) => from(selectedNodeItems)),
              toArray(),
              map((collectedIds) => ({
                selectedNodeItems: collectedIds,
                deselectedNodeItems: this.collectNodeItems(deselectedNodes),
              }))
            )
          ),
          concatAll(),
          shareReplay({
            refCount: true,
          })
        );

        /* istanbul ignore else */
        if (this._treeEvents.onSelectionModified !== undefined)
          this._treeEvents.onSelectionModified({ modifications });
      }
    );

    this._selectionManager.onSelectionChanged.addListener(
      ({ selectedNodes, deselectedNodes }) => {
        const modifications = merge(
          defer(() => {
            this._activeSelections.add(modifications);
            return EMPTY;
          }),
          this.collectSelectionChanges(selectedNodes, deselectedNodes)
        ).pipe(
          finalize(() => {
            this._activeSelections.delete(modifications);
          }),
          shareReplay({
            refCount: true,
          })
        );

        /* istanbul ignore else */
        if (this._treeEvents.onSelectionModified !== undefined)
          this._treeEvents.onSelectionModified({ modifications });
      }
    );

    this._selectionManager.onSelectionReplaced.addListener(
      ({ selectedNodeIds }) => {
        const replacements = merge(
          defer(() => {
            this._activeSelections.add(replacements);
            return EMPTY;
          }),
          this.collectSelectionChanges(selectedNodeIds, [])
        ).pipe(
          finalize(() => {
            this._activeSelections.delete(replacements);
          }),
          shareReplay({
            refCount: true,
          })
        );

        /* istanbul ignore else */
        if (this._treeEvents.onSelectionReplaced !== undefined)
          this._treeEvents.onSelectionReplaced({ replacements });
      }
    );
  }

  public onNodeCheckboxClicked(nodeId: string, newState: CheckBoxState) {
    const visibleNodes = this._getVisibleNodes();
    const clickedNode = visibleNodes.getModel().getNode(nodeId);
    if (clickedNode === undefined) return;

    const immediateStateChanges = [{ nodeItem: clickedNode.item, newState }];
    if (clickedNode.isSelected) {
      for (const node of visibleNodes) {
        if (
          isTreeModelNode(node) &&
          node.id !== clickedNode.id &&
          node.isSelected &&
          node.checkbox.state !== newState
        ) {
          immediateStateChanges.push({ nodeItem: node.item, newState });
        }
      }
    }

    const stateChanges = concat(
      of(immediateStateChanges),
      from(this._activeSelections).pipe(
        mergeAll(),
        map(({ selectedNodeItems }) =>
          selectedNodeItems.map((item) => ({ nodeItem: item, newState }))
        )
      )
    ).pipe(
      shareReplay({
        refCount: true,
      })
    );

    /* istanbul ignore else */
    if (this._treeEvents.onCheckboxStateChanged !== undefined)
      this._treeEvents.onCheckboxStateChanged({ stateChanges });
  }

  public onNodeExpanded(nodeId: string) {
    /* istanbul ignore else */
    if (this._treeEvents.onNodeExpanded !== undefined)
      this._treeEvents.onNodeExpanded({ nodeId });
  }

  public onNodeCollapsed(nodeId: string) {
    /* istanbul ignore else */
    if (this._treeEvents.onNodeCollapsed !== undefined)
      this._treeEvents.onNodeCollapsed({ nodeId });
  }

  public onNodeClicked(
    nodeId: string,
    event: React.MouseEvent<Element, MouseEvent>
  ) {
    const node = this._getVisibleNodes().getModel().getNode(nodeId);
    const isNodeSelected = node && node.isSelected;

    if (
      event.detail === 2 &&
      this._treeEvents.onNodeDoubleClick !== undefined
    ) {
      this._treeEvents.onNodeDoubleClick({ nodeId });

      // trigger onNodeClicked as to not lose highlight of the node when double clicking.
      !isNodeSelected && this._selectionManager.onNodeClicked(nodeId, event);
    } else {
      this._selectionManager.onNodeClicked(nodeId, event);
    }

    // if clicked node was already selected fire delayed click event
    if (isNodeSelected && this._treeEvents.onDelayedNodeClick !== undefined) {
      this._treeEvents.onDelayedNodeClick({ nodeId });
    }
  }

  public onNodeMouseDown(nodeId: string) {
    this._selectionManager.onNodeMouseDown(nodeId);
  }

  public onNodeMouseMove(nodeId: string) {
    this._selectionManager.onNodeMouseMove(nodeId);
  }

  public onNodeEditorActivated(nodeId: string) {
    const node = this._getVisibleNodes().getModel().getNode(nodeId);
    const isNodeSelected = node ? node.isSelected : false;

    // if node was already selected, fire onNodeEditorActivated event
    if (
      isNodeSelected &&
      this._treeEvents.onNodeEditorActivated !== undefined
    ) {
      this._treeEvents.onNodeEditorActivated({ nodeId });
    }
  }

  public onTreeKeyDown(event: React.KeyboardEvent): void {
    this._selectionManager.onTreeKeyDown(event, this);
  }

  public onTreeKeyUp(event: React.KeyboardEvent): void {
    this._selectionManager.onTreeKeyUp(event, this);
  }

  private collectSelectionChanges(
    selection: IndividualSelection | RangeSelection,
    deselection: IndividualSelection
  ): Observable<{
    selectedNodeItems: TreeNodeItem[];
    deselectedNodeItems: TreeNodeItem[];
  }> {
    const deselectedItems = this.collectNodeItems(deselection);
    if (isRangeSelection(selection)) {
      return this.collectNodesBetween(selection.from, selection.to).pipe(
        map((selectedNodeItems, index) => {
          return {
            selectedNodeItems,
            deselectedNodeItems: index === 0 ? deselectedItems : [],
          };
        })
      );
    }

    const selectedItems = this.collectNodeItems(selection);
    return of({
      selectedNodeItems: selectedItems,
      deselectedNodeItems: deselectedItems,
    });
  }

  private collectNodesBetween(
    nodeId1: string,
    nodeId2: string
  ): Observable<TreeNodeItem[]> {
    const [readyNodes, nodesToLoad] =
      TreeEventDispatcher.groupNodesByLoadingState(
        this.iterateNodesBetween(nodeId1, nodeId2)
      );

    const loadedSelectedNodes = from(
      nodesToLoad.map((node) => {
        const parentNode = node.parentId
          ? this._getVisibleNodes().getModel().getNode(node.parentId)
          : this._getVisibleNodes().getModel().getRootNode();
        return parentNode
          ? toRxjsObservable(
              this._nodeLoader.loadNode(parentNode, node.childIndex)
            )
          : /* istanbul ignore next */ EMPTY;
      })
    ).pipe(
      // We have requested multiple nodes that may belong to the same page.
      // When the page loads we only want to process the loaded nodes once.
      // Making assumption that loaded nodes from the same page will be emitted without interruptions.
      // Maybe we could simplify this to `this._nodeLoader.loadNodes(nodesToLoad)`?
      mergeAll(),
      distinctUntilChanged()
    );

    return concat(
      of(
        readyNodes
          .filter((node) => !node.isSelectionDisabled)
          .map((node) => node.item)
      ),
      loadedSelectedNodes.pipe(
        map(({ loadedNodes }) =>
          loadedNodes.filter((item) => !item.isSelectionDisabled)
        )
      )
    ).pipe(
      filter((nodeItems) => nodeItems.length > 0),
      // Give enough time for multiple subscribers to subscribe before any emissions begin
      subscribeOn(asapScheduler)
    );
  }

  private *iterateNodesBetween(
    nodeId1: string,
    nodeId2: string
  ): Iterable<TreeModelNode | TreeModelNodePlaceholder> {
    let firstNodeFound = false;
    for (const node of this._getVisibleNodes()) {
      if (firstNodeFound) {
        yield node;
      }

      if (isTreeModelNode(node)) {
        if (nodeId1 === nodeId2 && node.id === nodeId1) {
          yield node;
          return;
        }

        if (node.id === nodeId1 || node.id === nodeId2) {
          if (firstNodeFound) {
            return;
          }

          firstNodeFound = true;
          yield node;
        }
      }
    }
  }

  private collectNodeItems(nodeIds: string[]): TreeNodeItem[] {
    const items: TreeNodeItem[] = [];
    for (const nodeId of nodeIds) {
      const node = this._getVisibleNodes().getModel().getNode(nodeId);
      // istanbul ignore else
      if (node !== undefined && !node.isSelectionDisabled) {
        items.push(node.item);
      }
    }
    return items;
  }

  private static groupNodesByLoadingState(
    nodes: Iterable<TreeModelNode | TreeModelNodePlaceholder>
  ): [TreeModelNode[], TreeModelNodePlaceholder[]] {
    const loadedNodeItems: TreeModelNode[] = [];
    const nodesToLoad: TreeModelNodePlaceholder[] = [];
    for (const node of nodes) {
      if (isTreeModelNode(node)) {
        loadedNodeItems.push(node);
      } else {
        nodesToLoad.push(node);
      }
    }

    return [loadedNodeItems, nodesToLoad];
  }
}
