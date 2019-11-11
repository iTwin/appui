/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
/** @module Tree */

import { produce } from "immer";
import { BeUiEvent } from "@bentley/bentleyjs-core";
import { MutableTreeModel, TreeModel, VisibleTreeNodes, TreeNodeItemData, TreeModelNodeInput } from "./TreeModel";
import { LoadedNodeHierarchy, LoadedNodeHierarchyItem, ITreeNodeLoader } from "./TreeNodeLoader";

/**
 * Controls tree model and visible tree nodes.
 * It is used to modify model and inform when tree model changes.
 * @alpha
 */
export class TreeModelSource {
  private _model = new MutableTreeModel();
  private _visibleNodes?: VisibleTreeNodes;

  public onModelChanged = new BeUiEvent<TreeModel>();

  constructor() {
    this.onModelChanged.addListener(() => this._visibleNodes = undefined);
  }

  public modifyModel(callback: (model: MutableTreeModel) => void): void {
    const newModel = produce(this._model, (draft: MutableTreeModel) => callback(draft));
    if (newModel !== this._model) {
      this._model = newModel;
      this.onModelChanged.emit(this._model);
    }
  }

  public getModel(): TreeModel { return this._model; }

  public getVisibleNodes(): VisibleTreeNodes {
    if (!this._visibleNodes) {
      this._visibleNodes = this._model.computeVisibleNodes();
    }

    return this._visibleNodes;
  }
}

/**
 * Creates new model source and adds listener to supplied node loader's onNodeLoaded event
 * which will update model source.
 *
 * @returns created TreeModelSource and callback to remove listener from onNodeLoaded event.
 *
 * @alpha
 */
export function createModelSourceForNodeLoader(nodeLoader: ITreeNodeLoader) {
  const modelSource = new TreeModelSource();
  const nodeLoadHandler = createDefaultNodeLoadHandler(modelSource);
  const disposeModelSource = nodeLoader.onNodeLoaded.addListener(nodeLoadHandler);
  return { modelSource, disposeModelSource };
}

/**
 * Creates a function which can handle ITreeNodeLoader onNodeLoaded event.
 * @alpha
 */
export function createDefaultNodeLoadHandler(modelSource: TreeModelSource) {
  return (loadedHierarchy: LoadedNodeHierarchy) => {
    modelSource.modifyModel((model) => {
      if (loadedHierarchy.parentId !== undefined) {
        // Make sure the model sill contains the parent node
        /* istanbul ignore if */
        if (model.getNode(loadedHierarchy.parentId) === undefined)
          return;
      }

      updateChildren(model, loadedHierarchy.parentId, loadedHierarchy.hierarchyItems, loadedHierarchy.offset, loadedHierarchy.numChildren);
      if (loadedHierarchy.parentId !== undefined) {
        const parentNode = model.getNode(loadedHierarchy.parentId);
        /* istanbul ignore else */
        if (parentNode && parentNode.isLoading && parentNode.numChildren !== undefined) {
          parentNode.isLoading = false;
        }
      }
    });
  };
}

function updateChildren(
  model: MutableTreeModel,
  parentId: string | undefined,
  hierarchyItems: LoadedNodeHierarchyItem[],
  startIndex: number,
  numChildren?: number,
) {
  /* istanbul ignore else */
  if (numChildren !== undefined) {
    model.setNumChildren(parentId, numChildren);
  }

  model.setChildren(
    parentId,
    hierarchyItems.map(({ item }) => convertToTreeModelNodeInput(item)),
    startIndex,
  );

  for (const item of hierarchyItems) {
    if (item.children) {
      updateChildren(model, item.item.id, item.children, 0, item.numChildren);
    }
  }
}

function convertToTreeModelNodeInput(item: TreeNodeItemData): TreeModelNodeInput {
  let numChildren: number | undefined;
  if (item.children) {
    numChildren = item.children.length;
  } else if (!item.hasChildren) {
    numChildren = 0;
  }

  return {
    description: item.description,
    isExpanded: !!item.autoExpand,
    id: item.id,
    item,
    label: item.label,
    isLoading: false,
    numChildren,
    isSelected: false,
  };
}
