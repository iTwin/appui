/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @module Picker */

import * as _ from "lodash";
import {
  TreeNodeItem,
  PageOptions,
  DelayLoadedTreeNodeItem,
  TreeDataChangesListener,
} from "@bentley/ui-components";
import { ListItem } from "../ListPicker";
import {
  RegisteredRuleset,
  NodeKey,
  NodePathElement,
} from "@bentley/presentation-common";
import { Viewport, IModelConnection } from "@bentley/imodeljs-frontend";
import {
  PresentationTreeDataProvider,
  IPresentationTreeDataProvider,
} from "@bentley/presentation-components";
import { BeEvent } from "@bentley/bentleyjs-core";
import { CheckBoxInfo } from "@bentley/ui-core";

/** @internal */
export type TreeNodePromise = Promise<DelayLoadedTreeNodeItem | undefined>;
/** @internal */
export type TreeNodeArrayPromise = Promise<DelayLoadedTreeNodeItem[]>;

/**
 * Model Group used by [[ModelSelectorWidget]]
 * @internal
 */
export interface ModelGroup {
  /** Identifier for group as a member of [[Groups]] */
  id: Groups;
  /** [[ModelSelectorDataProvider]] to populate [[CategoryModelTree]] */
  dataProvider: ModelSelectorDataProvider;
  /** Label for group name */
  label: string;
  /** Models or categories related to group as [[ListItem]] */
  items: ListItem[];
  /** Method to enable passed in models or categories  */
  setEnabled: (item: ListItem[], enabled: boolean) => void;
}

/**
 * Group types available for [[ModelSelectorWidget]] picker
 * @internal
 */
export enum Groups {
  Models,
  Categories,
}

/**
 * Properties for the [[ModelSelectorWidget]] component
 * @internal
 */
export interface ModelSelectorWidgetProps {
  /** [[IModelConnection]] for current iModel */
  iModelConnection: IModelConnection;
  /** Flag for accommodating all viewports */
  allViewports?: boolean;
  /** Active viewport */
  activeView?: Viewport;
}

/**
 * State for the [[ModelSelectorWidget]] component
 * @internal
 */
export interface ModelSelectorWidgetState {
  activeGroup?: ModelGroup;
  activeRuleset?: RegisteredRuleset;
  activeView?: Viewport;
}

/**
 * Information used for filtering in [[CategoryModelTree]]
 * @internal
 */
export interface FilterInfo {
  filter?: string;
  filtering?: boolean;
  activeMatchIndex?: number;
  matchesCount?: number;
}

/**
 * Properties for the [[CategoryModelTree]] component
 * @internal
 */
export interface CategoryModelTreeProps {
  /** [[IModelConnection]] for current iModel */
  iModelConnection: IModelConnection;
  /** Active group to display in tree */
  activeGroup: ModelGroup;
  /** Active viewport */
  activeView?: Viewport;
}

/**
 * State for the [[CategoryModelTree]] component
 * @internal
 */
export interface CategoryModelTreeState {
  activeGroup: ModelGroup;
  checkboxInfo: (node: TreeNodeItem) => CheckBoxInfo | Promise<CheckBoxInfo>;
  isLoading: boolean;
  isOptionsOpened: boolean;
  filterInfo?: FilterInfo;
  showSearchBox: boolean;
}

/**
 * Implementation of a PresentationTreeDataProvider that manages model and category
 * data in [[CategoryModelTree]]
 * @internal
 */
export class ModelSelectorDataProvider
  implements IPresentationTreeDataProvider {
  private _baseProvider: PresentationTreeDataProvider;

  /** @internal */
  constructor(imodel: IModelConnection, rulesetId: string) {
    this._baseProvider = new PresentationTreeDataProvider(imodel, rulesetId);
    this._baseProvider.pagingSize = 5;
  }

  /** Id of the ruleset used by this data provider */
  public get rulesetId(): string {
    return this._baseProvider.rulesetId;
  }

  /** [[IModelConnection]] used by this data provider */
  public get imodel(): IModelConnection {
    return this._baseProvider.imodel;
  }

  /** Listener for tree node changes */
  public onTreeNodeChanged = new BeEvent<TreeDataChangesListener>();

  /**
   * Returns a [[NodeKey]] from given [[TreeNodeItem]].
   * **Warning:** the `node` must be created by this data provider.
   */
  public getNodeKey(node: TreeNodeItem): NodeKey {
    return this._baseProvider.getNodeKey(node);
  }

  /**
   * Returns filtered node paths.
   * @param filter Filter.
   * @returns Filtered NodePaths
   */
  public getFilteredNodePaths = async (
    filter: string,
  ): Promise<NodePathElement[]> => {
    return this._baseProvider.getFilteredNodePaths(filter);
  }

  /**
   * Provides count for number of nodes under parent node
   * @param parentNode Node to count children for
   */
  public getNodesCount = _.memoize(
    async (parentNode?: TreeNodeItem): Promise<number> => {
      return this._baseProvider.getNodesCount(parentNode);
    },
  );

  /**
   * Modifies and returns nodes to be displayed.
   * @param parentNode The parent node for all nodes to be returned
   * @param pageOptions Paging options
   * @returns TreeNodeItems to be displayed
   */
  public getNodes = async (
    parentNode?: TreeNodeItem,
    pageOptions?: PageOptions,
  ): TreeNodeArrayPromise => {
    return this._baseProvider.getNodes(parentNode, pageOptions);
  }

  public async loadHierarchy() { return this._baseProvider.loadHierarchy(); }
}
