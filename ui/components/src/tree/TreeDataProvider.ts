/*---------------------------------------------------------------------------------------------
* Copyright (c) 2018 - present Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
/** @module Tree */

import { CheckBoxState } from "@bentley/ui-core";
import { PageOptions } from "../common/PageOptions";
import { BeEvent } from "@bentley/bentleyjs-core";

/**
 * A node item which can be displayed in a tree.
 */
export interface TreeNodeItem {
  id: string;
  parentId?: string;
  label: string;
  description: string;
  hasChildren: boolean;
  labelForeColor?: number;
  labelBackColor?: number;
  labelBold?: boolean;
  labelItalic?: boolean;
  iconPath?: string;
  displayCheckBox?: boolean;
  checkBoxState?: CheckBoxState;
  isCheckBoxEnabled?: boolean;
  extendedData?: any;
}

/**
 * TreeDataProvider provides data to the DataTree.
 */
export interface TreeDataProvider {
  onTreeNodeChanged?: TreeDataChangeEvent;

  getRootNodesCount(): Promise<number>;
  getRootNodes(options?: PageOptions): Promise<ReadonlyArray<Readonly<TreeNodeItem>>>;
  getChildNodesCount(parentNode: TreeNodeItem): Promise<number>;
  getChildNodes(parentNode: TreeNodeItem, options?: PageOptions): Promise<ReadonlyArray<Readonly<TreeNodeItem>>>;
}

/** An interface tree data change listeners */
export declare type TreeDataChangesListener = () => void;

export class TreeDataChangeEvent extends BeEvent<TreeDataChangesListener> { }

/**
 * MutableTreeDataProvider provides manipulation processing for the DataTree.
 * Useful for Drag & Drop processing.
 */
export interface MutableTreeDataProvider {

  AddRootNode(rootNode: TreeNodeItem): void;
  InsertRootNode(rootNode: TreeNodeItem, index: number): void;
  RemoveRootNode(rootNode: TreeNodeItem): void;
  MoveRootNode(rootNode: TreeNodeItem, newIndex: number): void;

  AddChildNode(parent: TreeNodeItem, child: TreeNodeItem): void;
  InsertChildNode(parent: TreeNodeItem, child: TreeNodeItem, index: number): void;
  RemoveChildNode(parent: TreeNodeItem, child: TreeNodeItem): void;
  MoveChildNode(parent: TreeNodeItem, child: TreeNodeItem, newIndex: number): void;

  IsDescendent(parent: TreeNodeItem, nodeItem: TreeNodeItem): boolean;
  GetRootNodeIndex(rootNode: TreeNodeItem): number;
  GetChildNodeIndex(parent: TreeNodeItem, child: TreeNodeItem): number;
}
