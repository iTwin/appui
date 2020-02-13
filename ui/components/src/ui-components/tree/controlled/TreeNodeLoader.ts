/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Tree
 */

import { Observable as RxjsObservable } from "rxjs/internal/Observable";
import { defer } from "rxjs/internal/observable/defer";
import { from } from "rxjs/internal/observable/from";
import { of } from "rxjs/internal/observable/of";
import { concatMap } from "rxjs/internal/operators/concatMap";
import { finalize } from "rxjs/internal/operators/finalize";
import { map } from "rxjs/internal/operators/map";
import { publish } from "rxjs/internal/operators/publish";
import { toArray } from "rxjs/internal/operators/toArray";
import { refCount } from "rxjs/internal/operators/refCount";
import { BeUiEvent, IDisposable } from "@bentley/bentleyjs-core";
import { UiError } from "@bentley/ui-abstract";
import { Observable } from "./Observable";
import { SubscriptionScheduler, scheduleSubscription } from "./internal/SubscriptionScheduler";
import {
  TreeNodeItemData, isTreeModelNode, TreeModelNode, TreeModelRootNode, MutableTreeModel, TreeModelNodeInput,
} from "./TreeModel";
import {
  TreeDataChangesListener, TreeDataProvider, TreeNodeItem, isTreeDataProviderInterface,
  isTreeDataProviderMethod, isTreeDataProviderPromise, isTreeDataProviderRaw,
} from "../TreeDataProvider";
import { UiComponents } from "../../UiComponents";
import { TreeModelSource } from "./TreeModelSource";

/** Data structure that describes node load result
 * @beta
 */
export interface TreeNodeLoadResult {
  loadedNodes: TreeNodeItem[];
}

/**
 * Tree node loader which is used to load tree nodes.
 * @beta
 */
export interface ITreeNodeLoader {
  /** Loads node at specified place in tree.
   *
   * @param parentId specifies tree branch
   * @param childIndex specifies offset in the branch.
   */
  loadNode(parentId: TreeModelNode | TreeModelRootNode, childIndex: number): Observable<TreeNodeLoadResult>;
}

/**
 * Tree node loader which uses TreeDataProvider to load nodes.
 * @beta
 */
export interface ITreeNodeLoaderWithProvider<TDataProvider extends TreeDataProvider> extends ITreeNodeLoader {
  /** Returns TreeDataProvider used to load nodes. */
  getDataProvider(): TDataProvider;
}

/** Abstract node loader which loads nodes to provided model source.
 * @beta
 */
export abstract class AbstractTreeNodeLoader implements ITreeNodeLoader {
  private _treeModelSource: TreeModelSource;
  private _loadScheduler = new SubscriptionScheduler<TreeNodeLoadResult>();

  protected constructor(modelSource: TreeModelSource) { this._treeModelSource = modelSource; }

  public get modelSource() { return this._treeModelSource; }

  public loadNode(parent: TreeModelNode | TreeModelRootNode, childIndex: number): Observable<TreeNodeLoadResult> {
    return from(this.load(parent, childIndex)).pipe(
      map((loadedHierarchy) => {
        this.updateModel(loadedHierarchy);
        return { loadedNodes: collectTreeNodeItems(loadedHierarchy.hierarchyItems) };
      }),
      scheduleSubscription(this._loadScheduler),
    );
  }

  protected updateModel(loadedHierarchy: LoadedNodeHierarchy): void {
    handleLoadedNodeHierarchy(this._treeModelSource, loadedHierarchy);
  }

  protected abstract load(parentId: TreeModelNode | TreeModelRootNode, childIndex: number): Observable<LoadedNodeHierarchy>;
}

/** Abstract node loader with tree data provider which loads nodes to provided model source.
 * @beta
 */
export abstract class AbstractTreeNodeLoaderWithProvider<TDataProvider extends TreeDataProvider> extends AbstractTreeNodeLoader implements ITreeNodeLoaderWithProvider<TDataProvider> {
  private _dataProvider: TDataProvider;

  protected constructor(modelSource: TreeModelSource, dataProvider: TDataProvider) {
    super(modelSource);
    this._dataProvider = dataProvider;
  }

  public getDataProvider() { return this._dataProvider; }
}

/**
 * Default tree node loader with TreeDataProvider implementation.
 * @beta
 */
export class TreeNodeLoader<TDataProvider extends TreeDataProvider> extends AbstractTreeNodeLoaderWithProvider<TDataProvider> implements IDisposable {
  private _treeDataSource: TreeDataSource;
  private _activeRequests = new Map<string | undefined, RxjsObservable<LoadedNodeHierarchy>>();

  constructor(dataProvider: TDataProvider, modelSource: TreeModelSource) {
    super(modelSource, dataProvider);
    this._treeDataSource = new TreeDataSource(dataProvider);
  }

  /** Disposes data source */
  public dispose() { this._treeDataSource.dispose(); }

  /**
   * Schedules to load children of node and returns an Observable.
   *
   * **Note:** It does not start loading node until '.subscribe()' is called on returned Observable.
   */
  protected load(parentNode: TreeModelNode | TreeModelRootNode): Observable<LoadedNodeHierarchy> {
    const parentItem = isTreeModelNode(parentNode) ? parentNode.item : undefined;
    return this.loadForParent(parentItem, parentNode.numChildren === undefined);
  }

  private loadForParent(parentItem: TreeNodeItem | undefined, requestNumChildren: boolean): RxjsObservable<LoadedNodeHierarchy> {
    const parentId = parentItem && parentItem.id;
    const activeRequest = this._activeRequests.get(parentId);
    if (activeRequest) {
      return activeRequest;
    }

    const newRequest = requestLoadedHierarchy(parentItem, this._treeDataSource, 0, 0, requestNumChildren,
      () => { this._activeRequests.delete(parentId); },
    );

    this._activeRequests.set(parentId, newRequest);
    return newRequest;
  }
}

/**
 * Default paged tree node loader with TreeDataProvider implementation.
 * @beta
 */
export class PagedTreeNodeLoader<TDataProvider extends TreeDataProvider> extends AbstractTreeNodeLoaderWithProvider<TDataProvider> implements IDisposable {
  private _pageLoader: PageLoader;
  private _pageSize: number;

  constructor(dataProvider: TDataProvider, modelSource: TreeModelSource, pageSize: number) {
    super(modelSource, dataProvider);
    this._pageLoader = new PageLoader(new TreeDataSource(dataProvider), pageSize);
    this._pageSize = pageSize;
  }

  /** Disposes data source */
  public dispose() { this._pageLoader.dispose(); }

  /** Returns page size used by tree node loader. */
  public getPageSize(): number { return this._pageSize; }

  /**
   * Schedules to load one page of node children and returns an Observable.
   *
   * **Note:** It does not start loading node page until '.subscribe()' is called on returned Observable.
   */
  protected load(parentNode: TreeModelNode | TreeModelRootNode, childIndex: number): Observable<LoadedNodeHierarchy> {
    const parentItem = isTreeModelNode(parentNode) ? parentNode.item : undefined;
    return this._pageLoader.loadPageWithItem(parentItem, childIndex, parentNode.numChildren === undefined);
  }
}

/** Data structure that describes hierarchy loaded for parent node.
 * @beta
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

/** Data structure that describes one loaded hierarchy item.
 * @beta
 */
export interface LoadedNodeHierarchyItem {
  /** Loaded tree node item. */
  item: TreeNodeItemData;
  /** Children of loaded tree node item. */
  children?: LoadedNodeHierarchyItem[];
  /** Number of children tree node item has. */
  numChildren?: number;
}

class PageLoader implements IDisposable {
  private _dataSource: TreeDataSource;
  private _pageSize: number;
  private _activePageRequests = new Map<string | undefined, Map<number, RxjsObservable<LoadedNodeHierarchy>>>();

  constructor(
    dataSource: TreeDataSource,
    pageSize: number,
  ) {
    this._dataSource = dataSource;
    this._pageSize = pageSize;
  }

  public dispose() { this._dataSource.dispose(); }

  public loadPageWithItem(
    parentItem: TreeNodeItem | undefined,
    itemIndex: number,
    requestNumChildren: boolean,
  ): RxjsObservable<LoadedNodeHierarchy> {
    const parentId = parentItem && parentItem.id;
    const parentPageRequests = this._activePageRequests.get(parentId) || new Map<number, RxjsObservable<LoadedNodeHierarchy>>();
    const page = Math.trunc(itemIndex / this._pageSize);
    const activeRequest = parentPageRequests.get(page);
    if (activeRequest) {
      return activeRequest;
    }

    const startIndex = page * this._pageSize;
    const newRequest = requestLoadedHierarchy(parentItem, this._dataSource, startIndex, this._pageSize, requestNumChildren,
      () => {
        parentPageRequests.delete(page);
        if (parentPageRequests.size === 0) {
          this._activePageRequests.delete(parentId);
        }
      },
    );

    parentPageRequests.set(page, newRequest);
    this._activePageRequests.set(parentId, parentPageRequests);
    return newRequest;
  }
}

function requestLoadedHierarchy(
  parentItem: TreeNodeItem | undefined,
  dataSource: TreeDataSource,
  start: number,
  take: number,
  requestNumChildren: boolean,
  finalizeCallback: () => void,
) {
  const parentId = parentItem && parentItem.id;
  return dataSource.requestItems(parentItem, start, take, requestNumChildren)
    .pipe(
      concatMap(({ numChildren, loadedItems }) => loadHierarchy(loadedItems, dataSource, take)
        .pipe(
          map((hierarchyItems) => ({
            parentId,
            offset: start,
            hierarchyItems,
            numChildren,
          })),
        ),
      ),
      finalize(finalizeCallback),
      publish(),
      refCount(),
    );
}

function loadHierarchy(rootItems: TreeNodeItemData[], dataSource: TreeDataSource, take: number): RxjsObservable<LoadedNodeHierarchyItem[]> {
  return from(rootItems)
    .pipe(
      concatMap((item) => {
        if (!item.autoExpand) {
          return of({ item });
        }

        return dataSource.requestItems(item, 0, take, true)
          .pipe(
            concatMap(({ numChildren, loadedItems }) => loadHierarchy(loadedItems, dataSource, take)
              .pipe(
                map((children) => ({ item, children, numChildren })),
              ),
            ),
          );
      }),
      toArray(),
    );
}

function collectTreeNodeItems(hierarchyItems: LoadedNodeHierarchyItem[], result: TreeNodeItem[] = []) {
  for (const hierarchyItem of hierarchyItems) {
    result.push(hierarchyItem.item);
    if (hierarchyItem.children)
      collectTreeNodeItems(hierarchyItem.children, result);
  }

  return result;
}

/** @internal */
export function handleLoadedNodeHierarchy(modelSource: TreeModelSource, loadedHierarchy: LoadedNodeHierarchy) {
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

  // if children array is undefined do not add children as they should be disposed
  if (model.getChildren(parentId) === undefined) {
    return;
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

interface TreeDataSourceResult {
  loadedItems: TreeNodeItemData[];
  numChildren?: number;
}

/**
 * Wrapper to handle different types of TreeDataProvider. Provides one method
 * to request items from TreeDataProviderRaw, TreeDataProviderMethod,
 * TreeDataProviderPromise or TreeDataProviderInterface.
 * @internal
 */
export class TreeDataSource implements IDisposable {
  private _dataProvider: TreeDataProvider;
  private _dispose?: () => void;

  public readonly onItemsChanged = new BeUiEvent<TreeDataChangesListener>();

  constructor(dataProvider: TreeDataProvider) {
    this._dataProvider = dataProvider;

    if (isTreeDataProviderInterface(this._dataProvider) && this._dataProvider.onTreeNodeChanged) {
      this._dispose = this._dataProvider.onTreeNodeChanged!.addListener(
        (changedItems) => this.onItemsChanged.raiseEvent(changedItems),
      );
    }
  }

  public dispose() { this._dispose && this._dispose(); }

  public requestItems(
    parent: TreeNodeItem | undefined,
    firstItemIndex: number,
    numItems: number,
    requestNumChildren: boolean,
  ): RxjsObservable<TreeDataSourceResult> {
    return defer(async (): Promise<TreeDataSourceResult> => {
      if (isTreeDataProviderInterface(this._dataProvider)) {
        let numChildren: number | undefined;
        if (requestNumChildren) {
          numChildren = await this._dataProvider.getNodesCount(parent);
        }

        return {
          loadedItems: (await this._dataProvider.getNodes(parent, numItems !== 0 ? { size: numItems, start: firstItemIndex } : undefined)),
          numChildren,
        };
      }

      const loadedItems = await this.getItems(parent);

      return {
        loadedItems: numItems !== 0 ? loadedItems.slice(firstItemIndex, firstItemIndex + numItems) : loadedItems,
        numChildren: loadedItems.length,
      };
    })
      .pipe(
        publish(),
        refCount(),
      );
  }

  private async getItems(parent: TreeNodeItem | undefined): Promise<TreeNodeItemData[]> {
    if (isTreeDataProviderRaw(this._dataProvider)) {
      return this._dataProvider;
    }

    if (isTreeDataProviderMethod(this._dataProvider)) {
      return this._dataProvider(parent);
    }

    if (isTreeDataProviderPromise(this._dataProvider)) {
      this._dataProvider = await this._dataProvider;
      return this._dataProvider;
    }

    throw new UiError(UiComponents.loggerCategory(this), "Unsupported TreeDataProvider.");
  }
}
