/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
/** @module Tree */

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
import { BeUiEvent } from "@bentley/bentleyjs-core";
import { UiError } from "@bentley/ui-abstract";
import { Observable } from "./Observable";
import { SubscriptionScheduler, scheduleSubscription } from "./internal/SubscriptionScheduler";
import {
  TreeNodeItemData, isTreeModelNode, TreeModelNode, TreeModelRootNode,
} from "./TreeModel";
import {
  TreeDataChangesListener, TreeDataProvider, TreeNodeItem, isTreeDataProviderInterface,
  isTreeDataProviderMethod, isTreeDataProviderPromise, isTreeDataProviderRaw,
} from "../TreeDataProvider";
import { UiComponents } from "../../UiComponents";

/**
 * Tree node loader which is used to load tree nodes.
 * @alpha
 */
export interface ITreeNodeLoader {
  onNodeLoaded: BeUiEvent<LoadedNodeHierarchy>;
  loadNode(parentId: TreeModelNode | TreeModelRootNode, childIndex: number): Observable<string[]>;
}

/**
 * Tree node loader which uses TreeDataProvider to load nodes.
 * @alpha
 */
export interface ITreeNodeLoaderWithProvider<TDataProvider extends TreeDataProvider> extends ITreeNodeLoader {
  getDataProvider(): TDataProvider;
}

/**
 * Default tree node loader implementation.
 * @alpha
 */
export class TreeNodeLoader<TDataProvider extends TreeDataProvider> implements ITreeNodeLoaderWithProvider<TDataProvider> {
  private _treeDataSource: TreeDataSource;
  private _loadScheduler = new SubscriptionScheduler<string[]>();
  private _dataProvider: TDataProvider;
  private _activeRequests = new Map<string | undefined, RxjsObservable<LoadedNodeHierarchy>>();

  public onNodeLoaded = new BeUiEvent<LoadedNodeHierarchy>();

  constructor(dataProvider: TDataProvider) {
    this._treeDataSource = new TreeDataSource(dataProvider);
    this._dataProvider = dataProvider;
  }

  public getDataProvider(): TDataProvider { return this._dataProvider; }

  public loadNode(parentNode: TreeModelNode | TreeModelRootNode): Observable<string[]> {
    const parentItem = isTreeModelNode(parentNode) ? parentNode.item : undefined;
    return this.loadForParent(parentItem, parentNode.numChildren === undefined)
      .pipe(
        map((loadedHierarchy) => {
          this.onNodeLoaded.emit(loadedHierarchy);
          return collectNodeIds(loadedHierarchy.hierarchyItems);
        }),
        scheduleSubscription(this._loadScheduler),
      );
  }

  private loadForParent(parentItem: TreeNodeItem | undefined, requestNumChildren: boolean): RxjsObservable<LoadedNodeHierarchy> {
    const parentId = parentItem && parentItem.id;
    const activeRequest = this._activeRequests.get(parentId);
    if (activeRequest) {
      return activeRequest;
    }

    const newRequest = requestLoadedHierarchy(parentItem, this._treeDataSource, 0, 0, requestNumChildren, () => {
      this._activeRequests.delete(parentId);
    });

    this._activeRequests.set(parentId, newRequest);
    return newRequest;
  }
}

/**
 * Default paged tree node loader implementation which loads tree nodes in pages.
 * @alpha
 */
export class PagedTreeNodeLoader<TDataProvider extends TreeDataProvider> implements ITreeNodeLoaderWithProvider<TDataProvider> {
  private _pageLoader: PageLoader;
  private _loadScheduler = new SubscriptionScheduler<string[]>();
  private _dataProvider: TDataProvider;
  private _pageSize: number;

  public onNodeLoaded = new BeUiEvent<LoadedNodeHierarchy>();

  constructor(dataProvider: TDataProvider, pageSize: number) {
    this._pageLoader = new PageLoader(new TreeDataSource(dataProvider), pageSize);
    this._pageSize = pageSize;
    this._dataProvider = dataProvider;
  }

  public getPageSize(): number { return this._pageSize; }

  public getDataProvider(): TDataProvider { return this._dataProvider; }

  public loadNode(parentNode: TreeModelNode | TreeModelRootNode, childIndex: number): Observable<string[]> {
    const parentItem = isTreeModelNode(parentNode) ? parentNode.item : undefined;
    return this._pageLoader.loadPageWithItem(parentItem, childIndex, parentNode.numChildren === undefined)
      .pipe(
        map((loadedHierarchy) => {
          this.onNodeLoaded.emit(loadedHierarchy);
          return collectNodeIds(loadedHierarchy.hierarchyItems);
        }),
        scheduleSubscription(this._loadScheduler),
      );
  }
}

/** @alpha */
export interface LoadedNodeHierarchy {
  parentId: string | undefined;
  offset: number;
  hierarchyItems: LoadedNodeHierarchyItem[];
  numChildren?: number;
}

/** @alpha */
export interface LoadedNodeHierarchyItem {
  item: TreeNodeItemData;
  children?: LoadedNodeHierarchyItem[];
  numChildren?: number;
}

class PageLoader {
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
    const newRequest = requestLoadedHierarchy(parentItem, this._dataSource, startIndex, this._pageSize, requestNumChildren, () => {
      parentPageRequests.delete(page);
      if (parentPageRequests.size === 0) {
        this._activePageRequests.delete(parentId);
      }
    });

    parentPageRequests.set(page, newRequest);
    this._activePageRequests.set(parentId, parentPageRequests);
    return newRequest;
  }
}

function collectNodeIds(items: LoadedNodeHierarchyItem[], result: string[] = []): string[] {
  for (const { item, children } of items) {
    result.push(item.id);
    if (children) {
      collectNodeIds(children, result);
    }
  }

  return result;
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

interface TreeDataSourceResult {
  loadedItems: TreeNodeItemData[];
  numChildren?: number;
}

/** @internal */
export class TreeDataSource {
  private _dataProvider: TreeDataProvider;

  public readonly onItemsChanged = new BeUiEvent<TreeDataChangesListener>();

  constructor(dataProvider: TreeDataProvider) {
    this._dataProvider = dataProvider;

    if (isTreeDataProviderInterface(this._dataProvider) && this._dataProvider.onTreeNodeChanged) {
      this._dataProvider.onTreeNodeChanged!.addListener(
        (changedItems) => this.onItemsChanged.raiseEvent(changedItems),
      );
    }
  }

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
