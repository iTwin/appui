/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import {
  ControlledTree,
  ControlledTreeProps,
  ImmediatelyLoadedTreeNodeItem,
  ITreeDataProvider,
  PageOptions,
  SelectionMode,
  TreeNodeItem,
  useTreeEventsHandler,
  useTreeModel,
  useTreeModelSource,
  useTreeNodeLoader,
} from "@itwin/components-react";
import { PropertyRecord } from "@itwin/appui-abstract";

const createTreeNodeItem = (
  id: string,
  parentId?: string
): ImmediatelyLoadedTreeNodeItem => {
  return {
    id,
    parentId,
    label: PropertyRecord.fromString(id, id),
  };
};

const createHierarchy = (
  rootNodeCount: number,
  childrenNodeCount: number
): SimpleTreeDataProviderHierarchy => {
  const hierarchy: SimpleTreeDataProviderHierarchy = new Map();
  const rootNodes = [];
  for (let i = 0; i < rootNodeCount; i++) {
    rootNodes[i] = createTreeNodeItem(`Node ${i.toString()}`);
    const nodes: ImmediatelyLoadedTreeNodeItem[] = [];

    if (i !== 1) {
      for (let x = 0; x < childrenNodeCount; x++) {
        nodes[x] = createTreeNodeItem(
          `Node ${i.toString()}-${x.toString()}`,
          rootNodes[i].id
        );
        const innerNodes: ImmediatelyLoadedTreeNodeItem[] = [];
        if (x !== 1) {
          for (let y = 0; y < 3; y++) {
            innerNodes[y] = createTreeNodeItem(
              `Node ${i}-${x}-${y}`,
              rootNodes[i].id
            );
          }
          nodes[x].children = innerNodes;
        }
      }

      rootNodes[i].children = nodes;

      hierarchy.set(rootNodes[i].id, nodes);
    }
  }
  hierarchy.set(undefined, rootNodes);
  return hierarchy;
};

const hierarchyTest = createHierarchy(3, 3);

export function TreeWidgetComponent() {
  const [dataProvider] = React.useState(
    () => new SimpleTreeDataProvider(hierarchyTest)
  );

  const modelSource = useTreeModelSource(dataProvider);

  const nodeLoader = useTreeNodeLoader(dataProvider, modelSource);

  const eventHandler = useTreeEventsHandler({ modelSource, nodeLoader });
  const treeModel = useTreeModel(modelSource);

  const defaultProps: ControlledTreeProps = {
    model: treeModel,
    nodeLoader,
    eventsHandler: eventHandler,
    selectionMode: SelectionMode.Single,
    width: 300,
    height: 300,
  };

  return (
    <div className="tree-widget-tree-container">
      <ControlledTree {...defaultProps} />
    </div>
  );
}

export type SimpleTreeDataProviderHierarchy = Map<
  string | undefined,
  TreeNodeItem[]
>;

class SimpleTreeDataProvider implements ITreeDataProvider {
  private _hierarchy: SimpleTreeDataProviderHierarchy;

  public constructor(hierarchy: SimpleTreeDataProviderHierarchy) {
    this._hierarchy = hierarchy;
  }

  private getNodesByParentId(
    parentId?: string,
    pageOptions?: PageOptions
  ): TreeNodeItem[] {
    const nodes = this._hierarchy.get(parentId);

    if (!nodes) return [];

    if (!pageOptions) return [...nodes];

    let pageEndIndex: number | undefined;
    if (pageOptions.size !== undefined && pageOptions.size !== 0) {
      pageEndIndex = pageOptions.size;
      pageEndIndex += pageOptions.start ? pageOptions.start : 0;
    }
    return nodes.slice(pageOptions.start, pageEndIndex);
  }

  public async getNodes(
    parent?: TreeNodeItem,
    pageOptions?: PageOptions
  ): Promise<TreeNodeItem[]> {
    return this.getNodesByParentId(parent ? parent.id : undefined, pageOptions);
  }

  public async getNodesCount(parent?: TreeNodeItem): Promise<number> {
    return this.getNodesByParentId(parent ? parent.id : undefined).length;
  }
}
