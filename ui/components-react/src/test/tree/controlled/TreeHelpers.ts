/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { PropertyRecord } from "@itwin/appui-abstract";
import { CheckBoxState } from "@itwin/core-react";
import type {
  MutableTreeModelNode,
  TreeModelNodeInput,
  TreeNodeItemData,
} from "../../../components-react.js";
import type { TreeNodeItem } from "../../../components-react/tree/TreeDataProvider.js";

/** @internal */
export function createTreeNodeInput(
  id: string,
  node?: Partial<TreeModelNodeInput>
): TreeModelNodeInput {
  const label = PropertyRecord.fromString(id, id);
  return {
    id,
    item: { id, label },
    label,
    isExpanded: false,
    isLoading: false,
    isSelected: false,
    ...node,
  };
}

/** Returns random MutableTreeModelNode. */
export const createRandomMutableTreeModelNode = (
  {
    parentNodeId,
    selected,
    label,
    numChildren,
  }: {
    parentNodeId?: string;
    selected?: boolean;
    label?: string;
    numChildren?: number;
  } = {
    parentNodeId: "",
    selected: false,
    label: "test node",
    numChildren: 0,
  }
): MutableTreeModelNode => {
  const nodeId = `${parentNodeId ?? ""}-${label ?? "test node"}`;
  const labelRecord = PropertyRecord.fromString(
    label ?? "Test Node Label",
    "label"
  );
  return {
    id: nodeId,
    description: "Test Description",
    isLoading: false,
    label: labelRecord,
    isExpanded: false,
    isSelected: selected ?? false,
    checkbox: {
      state: CheckBoxState.Off,
      isVisible: false,
      isDisabled: false,
    },
    depth: 0,
    item: createRandomTreeNodeItem(nodeId, parentNodeId, labelRecord),
    parentId: parentNodeId,
    numChildren: numChildren ?? 0,
  };
};

/** Returns multiple random MutableTreeModelNode. */
export const createRandomMutableTreeModelNodes = (
  count?: number,
  parentId?: string
): MutableTreeModelNode[] => {
  const nodes: MutableTreeModelNode[] = [];
  let nodesCount = count ?? 5;
  while (nodesCount--)
    nodes.push(
      createRandomMutableTreeModelNode({
        parentNodeId: parentId,
        label: `Node-${nodesCount}`,
      })
    );
  return nodes;
};

/** Returns multiple random TreeNodeItem. */
export const createRandomTreeNodeItems = (
  count?: number,
  parentId?: string,
  createChildren: boolean = true
): TreeNodeItemData[] => {
  const items: TreeNodeItemData[] = [];
  let itemCount = count ?? 6;
  while (itemCount--) {
    const treeNodeItem = createRandomTreeNodeItem(
      `test-item-${itemCount}`,
      parentId
    );
    if (itemCount % 2 === 0)
      items.push({
        ...treeNodeItem,
        children: createChildren
          ? createRandomTreeNodeItems(undefined, treeNodeItem.id, false)
          : undefined,
      });
    else items.push({ ...treeNodeItem, hasChildren: false });
  }

  return items;
};

/** Returns random TreeNodeItem */
export const createRandomTreeNodeItem = (
  itemId?: string,
  parentId?: string,
  label?: PropertyRecord | string
): TreeNodeItem => {
  return {
    id: itemId ?? `${parentId ?? ""}-${itemId ?? "test node"}`,
    label: label
      ? label instanceof PropertyRecord
        ? label
        : PropertyRecord.fromString(label, "label")
      : PropertyRecord.fromString("Test Node Label", "label"),
    autoExpand: false,
    description: "Test Description",
    icon: "test-icon",
    parentId,
  };
};
