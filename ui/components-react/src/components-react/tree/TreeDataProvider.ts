/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Tree
 */

/* eslint-disable @typescript-eslint/no-deprecated */

import type { PropertyRecord } from "@itwin/appui-abstract";
import type { PageOptions } from "../common/PageOptions.js";
import type { ItemStyle } from "../properties/ItemStyle.js";
import type { CheckBoxState } from "../common/CheckBoxState.js";

/**
 * A node item which can be displayed in a tree.
 * @public
 * @deprecated in 5.28.0. Use Tree component from `@stratakit/structures` instead.
 */
export interface TreeNodeItem {
  id: string;
  parentId?: string;
  label: PropertyRecord;
  description?: string;
  autoExpand?: boolean;
  icon?: string;
  isSelectionDisabled?: boolean;
  isCheckboxVisible?: boolean;
  isCheckboxDisabled?: boolean;
  checkBoxState?: CheckBoxState;
  isEditable?: boolean;
  style?: ItemStyle;
  /**
   * A key-value pairs data structure that can be used by data provider
   * to store some custom data for this node item.
   */
  extendedData?: { [key: string]: any };
}

/** A [[TreeNodeItem]] for immediately loaded trees
 * @public
 * @deprecated in 5.28.0. Use Tree component from `@stratakit/structures` instead.
 */
export interface ImmediatelyLoadedTreeNodeItem extends TreeNodeItem {
  children?: TreeNodeItem[];
}

/** A [[TreeNodeItem]] for delay-loaded trees
 * @public
 * @deprecated in 5.28.0. Use Tree component from `@stratakit/structures` instead.
 */
export interface DelayLoadedTreeNodeItem extends TreeNodeItem {
  hasChildren?: boolean;
}

/** Array of tree node data elements
 * @public
 * @deprecated in 5.28.0. Use Tree component from `@stratakit/structures` instead.
 */
export type TreeDataProviderRaw = ImmediatelyLoadedTreeNodeItem[];

/** A Promise for TreeDataProviderRaw
 * @public
 * @deprecated in 5.28.0. Use Tree component from `@stratakit/structures` instead.
 */
export type TreeDataProviderPromise = Promise<TreeDataProviderRaw>;

/** Signature for a method that returns TreeDataProviderPromise for supplied parent node
 * @public
 * @deprecated in 5.28.0. Use Tree component from `@stratakit/structures` instead.
 */
export type TreeDataProviderMethod = (
  node?: TreeNodeItem
) => Promise<DelayLoadedTreeNodeItem[]>;

/** Interface for a tree data provider class
 * @public
 * @deprecated in 5.28.0. Use Tree component from `@stratakit/structures` instead.
 */
export interface ITreeDataProvider {
  getNodesCount(parent?: TreeNodeItem): Promise<number>;
  getNodes(
    parent?: TreeNodeItem,
    page?: PageOptions
  ): Promise<DelayLoadedTreeNodeItem[]>;
}

/** Type definition for all Tree data providers
 * @public
 * @deprecated in 5.28.0. Use Tree component from `@stratakit/structures` instead.
 */
export type TreeDataProvider =
  | TreeDataProviderRaw
  | TreeDataProviderPromise
  | TreeDataProviderMethod
  | ITreeDataProvider;

/** Checks if [[TreeDataProvider]] is a [[TreeDataProviderRaw]]
 * @public
 * @deprecated in 5.28.0. Use Tree component from `@stratakit/structures` instead.
 */
export const isTreeDataProviderRaw = (
  provider: TreeDataProvider
): provider is TreeDataProviderRaw => {
  return Array.isArray(provider);
};
/** Checks if [[TreeDataProvider]] is a [[TreeDataProviderPromise]]
 * @public
 * @deprecated in 5.28.0. Use Tree component from `@stratakit/structures` instead.
 */
export const isTreeDataProviderPromise = (
  provider: TreeDataProvider
): provider is TreeDataProviderPromise => {
  return undefined !== (provider as TreeDataProviderPromise).then;
};
/** Checks if [[TreeDataProvider]] is a [[TreeDataProviderMethod]]
 * @public
 * @deprecated in 5.28.0. Use Tree component from `@stratakit/structures` instead.
 */
export const isTreeDataProviderMethod = (
  provider: TreeDataProvider
): provider is TreeDataProviderMethod => {
  return typeof provider === "function";
};
/** Checks if [[TreeDataProvider]] is an [[ITreeDataProvider]]
 * @public
 * @deprecated in 5.28.0. Use Tree component from `@stratakit/structures` instead.
 */
export const isTreeDataProviderInterface = (
  provider: TreeDataProvider
): provider is ITreeDataProvider => {
  const candidate = provider as ITreeDataProvider;
  return (
    undefined !== candidate.getNodes && undefined !== candidate.getNodesCount
  );
};
/**
 * Determines whether node has children
 * @param node node to check
 * @returns whether node has children
 * @public
 * @deprecated in 5.28.0. Use Tree component from `@stratakit/structures` instead.
 */
export const hasChildren = (node: TreeNodeItem) => {
  const nodeAsImmediate = node as ImmediatelyLoadedTreeNodeItem;
  if (
    "children" in nodeAsImmediate &&
    nodeAsImmediate.children &&
    nodeAsImmediate.children.length > 0
  )
    return true;
  const nodeAsDelayed = node as DelayLoadedTreeNodeItem;
  if ("hasChildren" in nodeAsDelayed && nodeAsDelayed.hasChildren) return true;
  return false;
};

/**
 * EditableTreeDataProvider provides cell editing processing for the Tree.
 * @public
 * @deprecated in 5.28.0. Use Tree component from `@stratakit/structures` instead.
 */
export interface EditableTreeDataProvider extends ITreeDataProvider {
  updateLabel(nodeItem: TreeNodeItem, newLabel: string): void;
}
