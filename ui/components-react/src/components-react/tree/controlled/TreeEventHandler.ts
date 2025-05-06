/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Tree
 */

import "../../common/DisposePolyfill.js";

import { Subject, takeUntil } from "rxjs";
import { TreeModelMutator } from "./internal/TreeModelMutator.js";
import type { Subscription } from "./Observable.js";
import { toRxjsObservable } from "./Observable.js";
import type {
  TreeCheckboxStateChangeEventArgs,
  TreeEvents,
  TreeNodeEventArgs,
  TreeSelectionModificationEventArgs,
  TreeSelectionReplacementEventArgs,
} from "./TreeEvents.js";
import type { TreeModelNode } from "./TreeModel.js";
import type { TreeModelSource } from "./TreeModelSource.js";
import type { ITreeNodeLoader } from "./TreeNodeLoader.js";

/**
 * Params used for tree node editing.
 * @public
 */
export interface TreeEditingParams {
  /** Callback that is called when node is updated. */
  onNodeUpdated: (node: TreeModelNode, newValue: string) => void;
}

/**
 * Data structure that describes tree event handler params.
 * @public
 */
export interface TreeEventHandlerParams {
  /** Model source used to modify tree model while handling events. */
  modelSource: TreeModelSource;
  /** Node loader used to load children when node is expanded. */
  nodeLoader: ITreeNodeLoader;
  /** Specifies whether children should be disposed when parent node is collapsed or not. */
  collapsedChildrenDisposalEnabled?: boolean;
  /** Parameters used for node editing. */
  editingParams?: TreeEditingParams;
}

/**
 * Default tree event handler.
 * @public
 */
export class TreeEventHandler implements TreeEvents, Disposable {
  private _modelMutator: TreeModelMutator;
  private _editingParams?: TreeEditingParams;

  private _disposed = new Subject<void>();
  private _selectionReplaced = new Subject<void>();

  constructor(params: TreeEventHandlerParams) {
    this._modelMutator = new TreeModelMutator(
      params.modelSource,
      params.nodeLoader,
      !!params.collapsedChildrenDisposalEnabled
    );
    this._editingParams = params.editingParams;
  }

  public [Symbol.dispose](): void {
    this._disposed.next();
  }

  /** Disposes tree event handler.
   * @deprecated in 5.5.0. Use `[Symbol.dispose]` instead.
   */
  public dispose() {
    this[Symbol.dispose]();
  }

  public get modelSource() {
    return this._modelMutator.modelSource;
  }

  /** Expands node and starts loading children. */
  public onNodeExpanded({ nodeId }: TreeNodeEventArgs) {
    toRxjsObservable(this._modelMutator.expandNode(nodeId))
      .pipe(takeUntil(this._disposed))
      .subscribe();
  }

  /** Collapses node */
  public onNodeCollapsed({ nodeId }: TreeNodeEventArgs) {
    this._modelMutator.collapseNode(nodeId);
  }

  /** Selects and deselects nodes until event is handled, handler is disposed or selection replaced event occurs. */
  public onSelectionModified({
    modifications,
  }: TreeSelectionModificationEventArgs): Subscription | undefined {
    return toRxjsObservable(modifications)
      .pipe(takeUntil(this._disposed), takeUntil(this._selectionReplaced))
      .subscribe({
        next: ({ selectedNodeItems, deselectedNodeItems }) => {
          this._modelMutator.modifySelection(
            selectedNodeItems,
            deselectedNodeItems
          );
        },
      });
  }

  /** Replaces currently selected nodes until event is handled, handler is disposed or another selection replaced event occurs. */
  public onSelectionReplaced({
    replacements,
  }: TreeSelectionReplacementEventArgs): Subscription | undefined {
    this._selectionReplaced.next();

    let firstEmission = true;
    return toRxjsObservable(replacements)
      .pipe(takeUntil(this._disposed), takeUntil(this._selectionReplaced))
      .subscribe({
        next: ({ selectedNodeItems }) => {
          if (firstEmission) {
            firstEmission = false;
            this._modelMutator.replaceSelection(selectedNodeItems);
          }

          this._modelMutator.modifySelection(selectedNodeItems, []);
        },
      });
  }

  /** Changes nodes checkbox states. */
  public onCheckboxStateChanged({
    stateChanges,
  }: TreeCheckboxStateChangeEventArgs): Subscription | undefined {
    return stateChanges.subscribe((changes) =>
      this._modelMutator.setCheckboxStates(changes)
    );
  }

  /** Activates node editing if editing parameters are supplied and node is editable. */
  public onDelayedNodeClick({ nodeId }: TreeNodeEventArgs) {
    this.activateEditor(nodeId);
  }

  /** This method is declared here to be overridden by classes that extend TreeEventHandler */
  public onNodeDoubleClick(_: TreeNodeEventArgs) {}

  /** Activates node editing if editing parameters are supplied and node is editable. */
  public onNodeEditorActivated({ nodeId }: TreeNodeEventArgs) {
    this.activateEditor(nodeId);
  }

  /** Activates node editing if editing parameters are supplied and node is editable. */
  private activateEditor(nodeId: string) {
    if (this._editingParams === undefined) return;

    this._modelMutator.activateEditing(
      nodeId,
      this._editingParams.onNodeUpdated
    );
  }
}
