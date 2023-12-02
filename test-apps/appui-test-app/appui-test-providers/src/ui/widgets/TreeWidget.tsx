/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import {
  ControlledTree,
  ControlledTreeProps,
  ImmediatelyLoadedTreeNodeItem,
  SelectionMode,
  SimpleTreeDataProvider,
  SimpleTreeDataProviderHierarchy,
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

  const eventsHandler = useTreeEventsHandler(
    React.useMemo(
      () => ({ modelSource, nodeLoader }),
      [modelSource, nodeLoader]
    )
  );
  const treeModel = useTreeModel(modelSource);

  const defaultProps: ControlledTreeProps = {
    model: treeModel,
    nodeLoader,
    eventsHandler,
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
