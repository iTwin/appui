/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Tree
 */

import type { Observable as RxjsObservable } from "rxjs";
import {
  concatAll,
  concatMap,
  defer,
  finalize,
  from,
  map,
  of,
  share,
  toArray,
} from "rxjs";
import { UiError } from "@itwin/appui-abstract";
import {
  scheduleSubscription,
  SubscriptionScheduler,
} from "../../common/SubscriptionScheduler.js";
import { UiComponents } from "../../UiComponents.js";
import type {
  ImmediatelyLoadedTreeNodeItem,
  TreeDataProvider,
  TreeDataProviderRaw,
  TreeNodeItem,
} from "../TreeDataProvider.js";
import {
  isTreeDataProviderInterface,
  isTreeDataProviderMethod,
  isTreeDataProviderPromise,
  isTreeDataProviderRaw,
} from "../TreeDataProvider.js";
import type { Observable } from "./Observable.js";
import { toRxjsObservable } from "./Observable.js";
import type {
  MutableTreeModel,
  TreeModelNode,
  TreeModelNodeInput,
  TreeModelRootNode,
  TreeNodeItemData,
} from "./TreeModel.js";
import { isTreeModelNode } from "./TreeModel.js";
import type { TreeModelSource } from "./TreeModelSource.js";

/**
 * Data structure that describes node load result
 * @public
 */
export interface TreeNodeLoadResult {
  loadedNodes: TreeNodeItem[];
}

/**
 * Tree node loader which is used to load tree nodes.
 * @public
 */
export interface ITreeNodeLoader {
  /**
   * Loads node at specified place in tree.
   * @param parentId specifies tree branch
   * @param childIndex specifies offset in the branch.
   */
  loadNode(
    parentId: TreeModelNode | TreeModelRootNode,
    childIndex: number
  ): Observable<TreeNodeLoadResult>;
}

/**
 * Tree node loader which uses `TreeDataProvider` to load nodes.
 * @public
 */
export interface ITreeNodeLoaderWithProvider<
  TDataProvider extends TreeDataProvider
> extends ITreeNodeLoader {
  /** Returns `TreeDataProvider` used to load nodes. */
  readonly dataProvider: TDataProvider;
}

/**
 * Abstract node loader implementation which loads nodes into provided model source.
 * @public
 */
export abstract class AbstractTreeNodeLoader implements ITreeNodeLoader {
  private _treeModelSource: TreeModelSource;
  private _loadScheduler = new SubscriptionScheduler<LoadedNodeHierarchy>();

  protected constructor(modelSource: TreeModelSource) {
    this._treeModelSource = modelSource;
  }

  public get modelSource() {
    return this._treeModelSource;
  }

  /** Do not override this method. @see `load` */
  public loadNode(
    parent: TreeModelNode | TreeModelRootNode,
    childIndex: number
  ): Observable<TreeNodeLoadResult> {
    return toRxjsObservable(this.load(parent, childIndex)).pipe(
      scheduleSubscription(this._loadScheduler),
      map((loadedHierarchy) => {
        this.updateModel(loadedHierarchy);
        return {
          loadedNodes: collectTreeNodeItems(loadedHierarchy.hierarchyItems),
        };
      })
    );
  }

  /**
   * A method that's called when `load` loads some nodes and we need to put them into model source. The
   * default implementation simply puts loaded child nodes under their parent at correct positions. Concrete
   * implementation may override this method to handle loaded nodes in a a custom way (put them at custom locations
   * in the hierarchy, etc.)
   */
  protected updateModel(loadedHierarchy: LoadedNodeHierarchy): void {
    handleLoadedNodeHierarchy(this._treeModelSource, loadedHierarchy);
  }

  /** An abstract method to load a node at the specific index for the specified parent. */
  protected abstract load(
    parent: TreeModelNode | TreeModelRootNode,
    childIndex: number
  ): Observable<LoadedNodeHierarchy>;
}

/**
 * Abstract node loader with tree data provider which loads nodes into provided model source.
 * @public
 */
export abstract class AbstractTreeNodeLoaderWithProvider<
    TDataProvider extends TreeDataProvider
  >
  extends AbstractTreeNodeLoader
  implements ITreeNodeLoaderWithProvider<TDataProvider>
{
  private _dataProvider: TDataProvider;

  protected constructor(
    modelSource: TreeModelSource,
    dataProvider: TDataProvider
  ) {
    super(modelSource);
    this._dataProvider = dataProvider;
  }

  public get dataProvider() {
    return this._dataProvider;
  }
}

/**
 * Default tree node loader with `TreeDataProvider` implementation.
 * @public
 */
export class TreeNodeLoader<
  TDataProvider extends TreeDataProvider
> extends AbstractTreeNodeLoaderWithProvider<TDataProvider> {
  private _treeDataSource: TreeDataSource;
  private _activeRequests = new Map<
    string | undefined,
    RxjsObservable<TreeNodeLoadResult>
  >();
  private _scheduler = new SubscriptionScheduler<LoadedNodeHierarchy>();

  constructor(dataProvider: TDataProvider, modelSource: TreeModelSource) {
    super(modelSource, dataProvider);
    this._treeDataSource = new TreeDataSource(dataProvider);
  }

  /**
   * Schedules to load children of node and returns an Observable.
   * @note It does not start loading node until '.subscribe()' is called on returned Observable.
   */
  public override loadNode(
    parent: TreeModelNode | TreeModelRootNode,
    _childIndex?: number
  ): Observable<TreeNodeLoadResult> {
    return defer(() => {
      const parentItem = isTreeModelNode(parent) ? parent.item : undefined;
      const parentId = parentItem?.id;
      const activeRequest = this._activeRequests.get(parentId);
      if (activeRequest) {
        return activeRequest;
      }

      const newRequest = requestLoadedHierarchy(
        parentItem,
        this._treeDataSource,
        0,
        0,
        parent.numChildren === undefined
      ).pipe(
        scheduleSubscription(this._scheduler),
        map((loadedHierarchy) => {
          this.updateModel(loadedHierarchy);
          return {
            loadedNodes: collectTreeNodeItems(loadedHierarchy.hierarchyItems),
          };
        }),
        finalize(() => this._activeRequests.delete(parentId))
      );
      this._activeRequests.set(parentId, newRequest);
      return newRequest;
    });
  }

  protected load(): Observable<LoadedNodeHierarchy> {
    throw new Error("Method not implemented.");
  }
}

/**
 * Default paged tree node loader with `TreeDataProvider` implementation.
 * @public
 */
export class PagedTreeNodeLoader<
  TDataProvider extends TreeDataProvider
> extends AbstractTreeNodeLoaderWithProvider<TDataProvider> {
  private _treeDataSource: TreeDataSource;
  private _pageSize: number;
  private _activePageRequests: Map<
    string | undefined,
    Map<number, RxjsObservable<TreeNodeLoadResult>>
  >;
  private _scheduler: SubscriptionScheduler<LoadedNodeHierarchy>;

  constructor(
    dataProvider: TDataProvider,
    modelSource: TreeModelSource,
    pageSize: number
  ) {
    super(modelSource, dataProvider);
    this._treeDataSource = new TreeDataSource(dataProvider);
    this._pageSize = pageSize;
    this._activePageRequests = new Map();
    this._scheduler = new SubscriptionScheduler();
  }

  /** Returns page size used by tree node loader. */
  public get pageSize(): number {
    return this._pageSize;
  }

  /**
   * Schedules to load one page of node children and returns an Observable.
   * @note It does not start loading node page until '.subscribe()' is called on returned Observable.
   */
  public override loadNode(
    parent: TreeModelNode | TreeModelRootNode,
    childIndex: number
  ): Observable<TreeNodeLoadResult> {
    return defer(() => {
      const parentItem = isTreeModelNode(parent) ? parent.item : undefined;
      const parentId = parentItem?.id;
      const parentPageRequests =
        this._activePageRequests.get(parentId) ??
        new Map<number, RxjsObservable<TreeNodeLoadResult>>();
      const page = Math.trunc(childIndex / this._pageSize);
      const activeRequest = parentPageRequests.get(page);
      if (activeRequest) {
        return activeRequest;
      }

      const startIndex = page * this._pageSize;
      const newRequest = requestLoadedHierarchy(
        parentItem,
        this._treeDataSource,
        startIndex,
        this._pageSize,
        parent.numChildren === undefined
      ).pipe(
        scheduleSubscription(this._scheduler),
        map((loadedHierarchy) => {
          this.updateModel(loadedHierarchy);
          return {
            loadedNodes: collectTreeNodeItems(loadedHierarchy.hierarchyItems),
          };
        }),
        finalize(() => {
          parentPageRequests.delete(page);
          if (parentPageRequests.size === 0) {
            this._activePageRequests.delete(parentId);
          }
        })
      );

      parentPageRequests.set(page, newRequest);
      this._activePageRequests.set(parentId, parentPageRequests);
      return newRequest;
    });
  }

  protected load(): Observable<LoadedNodeHierarchy> {
    throw new Error("Method not implemented.");
  }
}

/**
 * Data structure that describes hierarchy loaded for parent node.
 * @public
 */
export interface LoadedNodeHierarchy {
  /** Node id of the parent node for loaded hierarchy. */
  parentId: string | undefined;
  /** Hierarchy items offset in parent node children array. */
  offset: number;
  /** Loaded hierarchy items. */
  hierarchyItems: LoadedNodeHierarchyItem[];
  /** Number of children parent node has. */
  numChildren?: number;
}

/**
 * Data structure that describes one loaded hierarchy item.
 * @public
 */
export interface LoadedNodeHierarchyItem {
  /** Loaded tree node item. */
  item: TreeNodeItemData;
  /** Children of loaded tree node item. */
  children?: LoadedNodeHierarchyItem[];
  /** Number of children tree node item has. */
  numChildren?: number;
}

function requestLoadedHierarchy(
  parentItem: TreeNodeItem | undefined,
  dataSource: TreeDataSource,
  start: number,
  take: number,
  requestNumChildren: boolean
) {
  const parentId = parentItem && parentItem.id;
  return dataSource
    .requestItems(parentItem, start, take, requestNumChildren)
    .pipe(
      concatMap(({ numChildren, loadedItems }) =>
        loadHierarchy(loadedItems, dataSource, take).pipe(
          map((hierarchyItems) => ({
            parentId,
            offset: start,
            hierarchyItems,
            numChildren,
          }))
        )
      )
    );
}

function loadHierarchy(
  rootItems: TreeNodeItemData[],
  dataSource: TreeDataSource,
  take: number
): RxjsObservable<LoadedNodeHierarchyItem[]> {
  return from(rootItems).pipe(
    concatMap((item) => {
      if (!item.autoExpand || item.children) {
        return of(convertToLoadedNodeHierarchyItem(item));
      }

      return dataSource
        .requestItems(item, 0, take, true)
        .pipe(
          concatMap(({ numChildren, loadedItems }) =>
            loadHierarchy(loadedItems, dataSource, take).pipe(
              map((children) => ({ item, children, numChildren }))
            )
          )
        );
    }),
    toArray()
  );
}

function convertToLoadedNodeHierarchyItem(
  item: TreeNodeItemData
): LoadedNodeHierarchyItem {
  return {
    item,
    children: item.children
      ? item.children.map((child) => convertToLoadedNodeHierarchyItem(child))
      : undefined,
    numChildren: item.children ? item.children.length : undefined,
  };
}

function collectTreeNodeItems(
  hierarchyItems: LoadedNodeHierarchyItem[],
  result: TreeNodeItem[] = []
) {
  for (const hierarchyItem of hierarchyItems) {
    result.push(hierarchyItem.item);
    if (hierarchyItem.children)
      collectTreeNodeItems(hierarchyItem.children, result);
  }

  return result;
}

/** @internal */
export function handleLoadedNodeHierarchy(
  modelSource: TreeModelSource,
  loadedHierarchy: LoadedNodeHierarchy
) {
  modelSource.modifyModel((model) => {
    if (loadedHierarchy.parentId !== undefined) {
      // Make sure the model sill contains the parent node
      if (model.getNode(loadedHierarchy.parentId) === undefined) return;
    }

    updateChildren(
      model,
      loadedHierarchy.parentId,
      loadedHierarchy.hierarchyItems,
      loadedHierarchy.offset,
      loadedHierarchy.numChildren
    );
    if (loadedHierarchy.parentId !== undefined) {
      const parentNode = model.getNode(loadedHierarchy.parentId);

      if (
        parentNode &&
        parentNode.isLoading &&
        parentNode.numChildren !== undefined
      ) {
        parentNode.isLoading = false;
      }
    }
  });
}

function updateChildren(
  model: MutableTreeModel,
  parentId: string | undefined,
  hierarchyItems: LoadedNodeHierarchyItem[],
  startIndex: number,
  numChildren?: number
) {
  // numChildren set to undefined indicates that this is not the first request for children
  if (numChildren !== undefined) {
    model.setNumChildren(parentId, numChildren);
  }

  // if children array is undefined do not add children as they should be disposed
  if (model.getChildren(parentId) === undefined) {
    return;
  }

  let offset = startIndex;
  for (const hierarchyItem of hierarchyItems) {
    const nodeInput = convertToTreeModelNodeInput(hierarchyItem.item);
    const existingNode = model.getNode(hierarchyItem.item.id);

    // if same item exists in the same position and is expanded update it without removing it's subtree
    if (
      !existingNode ||
      !existingNode.isExpanded ||
      model.getChildOffset(parentId, existingNode.id) !== offset ||
      nodeInput.numChildren === 0
    ) {
      model.setChildren(parentId, [nodeInput], offset);
    } else {
      existingNode.label = nodeInput.label;
      existingNode.description = nodeInput.description ?? "";
      existingNode.item = nodeInput.item;
    }

    if (hierarchyItem.children) {
      updateChildren(
        model,
        hierarchyItem.item.id,
        hierarchyItem.children,
        0,
        hierarchyItem.numChildren
      );
    }
    offset++;
  }
}

function convertToTreeModelNodeInput(
  item: TreeNodeItemData
): TreeModelNodeInput {
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

interface TreeDataSourceResult {
  loadedItems: TreeNodeItemData[];
  numChildren?: number;
}

/**
 * Wrapper to handle different types of `TreeDataProvider`. Provides one method
 * to request items from `TreeDataProviderRaw`, `TreeDataProviderMethod`,
 * `TreeDataProviderPromise` or `TreeDataProviderInterface`.
 *
 * @internal
 */
export class TreeDataSource {
  private _dataProvider: TreeDataProvider;

  constructor(dataProvider: TreeDataProvider) {
    this._dataProvider = dataProvider;
  }

  public requestItems(
    parent: TreeNodeItem | undefined,
    firstItemIndex: number,
    numItems: number,
    requestNumChildren: boolean
  ): RxjsObservable<TreeDataSourceResult> {
    // During each async operation there is a chance that data provider will become stale. Create an opportunity to
    // unsubscribe after each async operation so that we stop interacting with the stale data provider immediately.
    return defer(async () => {
      if (isTreeDataProviderInterface(this._dataProvider)) {
        const dataProvider = this._dataProvider;
        return from(
          requestNumChildren ? dataProvider.getNodesCount(parent) : [undefined]
        ).pipe(
          concatMap(async (numChildren) => {
            const pageOptions =
              numItems !== 0
                ? { size: numItems, start: firstItemIndex }
                : undefined;
            return {
              loadedItems: await dataProvider.getNodes(parent, pageOptions),
              numChildren,
            };
          })
        );
      }

      return from(this.getItems(parent)).pipe(
        map((loadedItems) => ({
          loadedItems:
            numItems !== 0
              ? loadedItems.slice(firstItemIndex, firstItemIndex + numItems)
              : loadedItems,
          numChildren: loadedItems.length,
        }))
      );
    }).pipe(
      concatAll(),
      share({
        resetOnError: false,
        resetOnComplete: false,
        resetOnRefCountZero: true,
      })
    );
  }

  private async getItems(
    parent: TreeNodeItem | undefined
  ): Promise<TreeNodeItemData[]> {
    if (isTreeDataProviderRaw(this._dataProvider)) {
      return this.getChildren(this._dataProvider, parent);
    }

    if (isTreeDataProviderMethod(this._dataProvider)) {
      return this._dataProvider(parent);
    }

    if (isTreeDataProviderPromise(this._dataProvider)) {
      this._dataProvider = await this._dataProvider;
      return this.getChildren(this._dataProvider, parent);
    }
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    throw new UiError(
      UiComponents.loggerCategory("TreeDataSource"),
      "Unsupported TreeDataProvider."
    );
  }

  private getChildren(
    rawProvider: TreeDataProviderRaw,
    parent: TreeNodeItem | undefined
  ): TreeNodeItemData[] {
    if (parent === undefined) return rawProvider;

    return (parent as ImmediatelyLoadedTreeNodeItem).children ?? [];
  }
}
