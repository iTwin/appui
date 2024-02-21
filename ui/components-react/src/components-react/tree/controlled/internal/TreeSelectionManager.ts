/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Tree
 */

import type { Observable } from "rxjs";
import { Subject } from "rxjs";
import { BeUiEvent } from "@itwin/core-bentley";
import type {
  MultiSelectionHandler,
  SingleSelectionHandler,
} from "../../../common/selection/SelectionHandler";
import { SelectionHandler } from "../../../common/selection/SelectionHandler";
import type { SelectionMode } from "../../../common/selection/SelectionModes";
import type { TreeActions } from "../TreeActions";
import type { TreeModelNode, VisibleTreeNodes } from "../TreeModel";
import { isTreeModelNode } from "../TreeModel";
import {
  isNavigationKey,
  ItemKeyboardNavigator,
  Orientation,
} from "@itwin/core-react";

/** @internal */
export interface SelectionReplacementEvent {
  selectedNodeIds: IndividualSelection | RangeSelection;
}

/** @internal */
export interface SelectionModificationEvent {
  selectedNodes: IndividualSelection | RangeSelection;
  deselectedNodes: IndividualSelection;
}

/** @internal */
export interface DragSelectionStartEvent {
  selectionChanges: Observable<SelectionModificationEvent>;
}

/** @internal */
export type IndividualSelection = string[];

/** @internal */
export interface RangeSelection {
  from: string;
  to: string;
}

/** @internal */
export function isRangeSelection(selection: any): selection is RangeSelection {
  return (
    selection &&
    typeof selection.from === "string" &&
    typeof selection.to === "string"
  );
}

/** @internal */
export class TreeSelectionManager
  implements
    Pick<TreeActions, "onNodeClicked" | "onNodeMouseDown" | "onNodeMouseMove">
{
  private _selectionHandler: SelectionHandler<Selection>;
  private _dragSelectionOperation?: Subject<SelectionModificationEvent>;
  private _itemHandlers: Array<Array<SingleSelectionHandler<string>>>;

  private _getVisibleNodes: () => VisibleTreeNodes;

  public onSelectionChanged = new BeUiEvent<SelectionModificationEvent>();
  public onSelectionReplaced = new BeUiEvent<SelectionReplacementEvent>();
  public onDragSelection = new BeUiEvent<DragSelectionStartEvent>();

  constructor(
    selectionMode: SelectionMode,
    getVisibleNodes: () => VisibleTreeNodes
  ) {
    this._getVisibleNodes = getVisibleNodes;

    const onItemsSelected = (selections: Selection[], replacement: boolean) => {
      // Assumes that `selections` will only contain either a list of
      // `IndividualSelection` items or a single `RangeSelection` item.
      if (isIndividualSelection(selections[0])) {
        if (replacement) {
          this.onSelectionReplaced.emit({
            selectedNodeIds: selections as IndividualSelection,
          });
        } else {
          this.onSelectionChanged.emit({
            selectedNodes: selections as IndividualSelection,
            deselectedNodes: [],
          });
        }
      } else {
        if (replacement) {
          this.onSelectionReplaced.emit({
            selectedNodeIds: selections[0],
          });
        } else {
          this.onSelectionChanged.emit({
            selectedNodes: selections[0],
            deselectedNodes: [],
          });
        }
      }
    };

    const onItemsDeselected = (deselections: Selection[]) => {
      // Assumes that this will be always called with `IndividualSelection` items
      this.onSelectionChanged.emit({
        selectedNodes: [],
        deselectedNodes: deselections as IndividualSelection,
      });
    };

    this._selectionHandler = new SelectionHandler(
      selectionMode,
      onItemsSelected,
      onItemsDeselected
    );

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _this = this;
    const itemHandlers = new Proxy(
      {},
      {
        get(_target, prop) {
          if (prop === "length") {
            return _this._getVisibleNodes().getNumNodes();
          }

          const index: number = +(prop as string);
          const node = _this.getVisibleNodeAtIndex(
            _this._getVisibleNodes(),
            index
          );
          return new ItemHandler(node);
        },
      }
    ) as Array<SingleSelectionHandler<string>>;
    this._itemHandlers = [itemHandlers];
  }

  private getVisibleNodeAtIndex(
    nodes: VisibleTreeNodes | undefined,
    index: number
  ): TreeModelNode | undefined {
    const foundNode =
      nodes !== undefined
        ? nodes.getAtIndex(index)
        : /* istanbul ignore next */ undefined;
    return isTreeModelNode(foundNode) ? foundNode : undefined;
  }

  public onNodeClicked(nodeId: string, event: React.MouseEvent) {
    const selectionFunc = this._selectionHandler.createSelectionFunction(
      ...this.createSelectionHandlers(nodeId)
    );
    selectionFunc(event.shiftKey, event.ctrlKey || event.metaKey);
  }

  public onNodeMouseDown(nodeId: string) {
    this._selectionHandler.createDragAction(
      this.createSelectionHandlers(nodeId)[0],
      this._itemHandlers,
      nodeId
    );
    window.addEventListener(
      "mouseup",
      () => {
        /* istanbul ignore else */
        if (this._dragSelectionOperation) {
          this._selectionHandler.completeDragAction();
          this._dragSelectionOperation.complete();
          this._dragSelectionOperation = undefined;
        }
      },
      { once: true }
    );
    this._dragSelectionOperation = new Subject();
    this.onDragSelection.emit({
      selectionChanges: this._dragSelectionOperation,
    });
  }

  public onNodeMouseMove(nodeId: string) {
    this._selectionHandler.updateDragAction(nodeId);
  }

  private createSelectionHandlers(
    nodeId: string
  ): [MultiSelectionHandler<Selection>, SingleSelectionHandler<string>] {
    let deselectedAll = false;
    const multiSelectionHandler: MultiSelectionHandler<Selection> = {
      selectBetween: (item1, item2) => [
        { from: item1 as string, to: item2 as string },
      ],
      updateSelection: (selections, deselections) => {
        // Assumes `updateSelection` will never be called with selection ranges
        const selectedNodeIds = selections as string[];
        const deselectedNodeIds = deselections as string[];
        this._dragSelectionOperation!.next({
          selectedNodes: selectedNodeIds,
          deselectedNodes: deselectedNodeIds,
        });
      },
      deselectAll: () => {
        deselectedAll = true;
      },
      areEqual: (item1, item2) => item1 === item2,
    };

    const singleSelectionHandler: SingleSelectionHandler<string> = {
      preselect: () => {},
      select: () => {},
      deselect: () => {},
      isSelected: () => {
        if (deselectedAll) {
          return false;
        }

        const node = this._getVisibleNodes().getModel().getNode(nodeId);
        return node !== undefined && node.isSelected;
      },
      item: () => nodeId,
    };

    return [multiSelectionHandler, singleSelectionHandler];
  }

  public onTreeKeyDown(event: React.KeyboardEvent, actions: TreeActions): void {
    this._onKeyboardEvent(event, actions, true);
  }

  public onTreeKeyUp(event: React.KeyboardEvent, actions: TreeActions): void {
    this._onKeyboardEvent(event, actions, false);
  }

  private _onKeyboardEvent = (
    e: React.KeyboardEvent,
    actions: TreeActions,
    isKeyDown: boolean
  ) => {
    const processedNodeId = this._selectionHandler.processedItem;
    if (!isNavigationKey(e.key) || !isIndividualSelection(processedNodeId)) {
      return;
    }

    const isExpandable = (node: TreeModelNode): boolean =>
      !node.isLoading && node.numChildren !== 0;
    const isEditing = (node: TreeModelNode): boolean =>
      node.editingInfo !== undefined;

    const processedNode = this._getVisibleNodes()
      .getModel()
      .getNode(processedNodeId);

    // istanbul ignore if
    if (!processedNode || isEditing(processedNode)) return;

    const handleKeyboardSelectItem = (index: number) => {
      const node = this.getVisibleNodeAtIndex(this._getVisibleNodes(), index);
      // istanbul ignore if
      if (!node || isEditing(node)) return;

      const selectionFunc = this._selectionHandler.createSelectionFunction(
        ...this.createSelectionHandlers(node.id)
      );
      selectionFunc(e.shiftKey, e.ctrlKey);
    };
    const handleKeyboardActivateItem = (_index: number) => {
      if (isExpandable(processedNode)) {
        if (!processedNode.isExpanded) actions.onNodeExpanded(processedNode.id);
        else actions.onNodeCollapsed(processedNode.id);
      } else {
        actions.onNodeEditorActivated(processedNode.id);
      }
    };
    const handleCrossAxisArrowKey = (forward: boolean) => {
      if (!isExpandable(processedNode)) return;

      if (forward && !processedNode.isExpanded)
        actions.onNodeExpanded(processedNode.id);
      else if (!forward && processedNode.isExpanded)
        actions.onNodeCollapsed(processedNode.id);
    };

    const itemKeyboardNavigator = new ItemKeyboardNavigator(
      handleKeyboardSelectItem,
      handleKeyboardActivateItem
    );
    itemKeyboardNavigator.orientation = Orientation.Vertical;
    itemKeyboardNavigator.crossAxisArrowKeyHandler = handleCrossAxisArrowKey;
    itemKeyboardNavigator.allowWrap = false;
    itemKeyboardNavigator.itemCount = this._getVisibleNodes().getNumNodes();

    const processedNodeIndex =
      this._getVisibleNodes().getIndexOfNode(processedNodeId);
    isKeyDown
      ? itemKeyboardNavigator.handleKeyDownEvent(e, processedNodeIndex)
      : itemKeyboardNavigator.handleKeyUpEvent(e, processedNodeIndex);
  };
}

type Selection = string | RangeSelection;

function isIndividualSelection(
  selection: Selection | undefined
): selection is string {
  return typeof selection === "string";
}

class ItemHandler implements SingleSelectionHandler<string> {
  private _node: TreeModelNode | undefined;

  constructor(node: TreeModelNode | undefined) {
    this._node = node;
  }

  /* istanbul ignore next: noop */
  public preselect() {}

  /* istanbul ignore next: noop */
  public select() {}

  /* istanbul ignore next: noop */
  public deselect() {}

  // eslint-disable-next-line @itwin/prefer-get
  public isSelected(): boolean {
    // istanbul ignore next
    return !!this._node?.isSelected;
  }

  public item(): string {
    return this._node?.id ?? "";
  }
}
