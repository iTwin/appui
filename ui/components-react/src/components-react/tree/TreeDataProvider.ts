/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Tree
 */

import type { PropertyRecord } from "@itwin/appui-abstract";
import type { PageOptions } from "../common/PageOptions";
import type { ItemStyle } from "../properties/ItemStyle";
import type { CheckBoxState } from "../common/CheckBoxState";

/**
 * A node item which can be displayed in a tree.
 * @public
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
 */
export interface ImmediatelyLoadedTreeNodeItem extends TreeNodeItem {
  children?: TreeNodeItem[];
}

/** A [[TreeNodeItem]] for delay-loaded trees
 * @public
 */
export interface DelayLoadedTreeNodeItem extends TreeNodeItem {
  hasChildren?: boolean;
}

/** Array of tree node data elements
 * @public
 */
export type TreeDataProviderRaw = ImmediatelyLoadedTreeNodeItem[];

/** A Promise for TreeDataProviderRaw
 * @public
 */
export type TreeDataProviderPromise = Promise<TreeDataProviderRaw>;

/** Signature for a method that returns TreeDataProviderPromise for supplied parent node
 * @public
 */
export type TreeDataProviderMethod = (
  node?: TreeNodeItem
) => Promise<DelayLoadedTreeNodeItem[]>;

/** Interface for a tree data provider class
 * @public
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
 */
export type TreeDataProvider =
  | TreeDataProviderRaw
  | TreeDataProviderPromise
  | TreeDataProviderMethod
  | ITreeDataProvider;

/** Checks if [[TreeDataProvider]] is a [[TreeDataProviderRaw]]
 * @public
 */
export const isTreeDataProviderRaw = (
  provider: TreeDataProvider
): provider is TreeDataProviderRaw => {
  return Array.isArray(provider);
};
/** Checks if [[TreeDataProvider]] is a [[TreeDataProviderPromise]]
 * @public
 */
export const isTreeDataProviderPromise = (
  provider: TreeDataProvider
): provider is TreeDataProviderPromise => {
  return undefined !== (provider as TreeDataProviderPromise).then;
};
/** Checks if [[TreeDataProvider]] is a [[TreeDataProviderMethod]]
 * @public
 */
export const isTreeDataProviderMethod = (
  provider: TreeDataProvider
): provider is TreeDataProviderMethod => {
  return typeof provider === "function";
};
/** Checks if [[TreeDataProvider]] is an [[ITreeDataProvider]]
 * @public
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
 */
export interface EditableTreeDataProvider extends ITreeDataProvider {
  updateLabel(nodeItem: TreeNodeItem, newLabel: string): void;
}
