/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { PropertyRecord } from "@itwin/appui-abstract";
import { UiFramework } from "@itwin/appui-react";
import {
  ImmediatelyLoadedTreeNodeItem,
  SimpleTreeDataProviderHierarchy,
  ControlledTreeProps,
  SimpleTreeDataProvider,
  useTreeModelSource,
  useTreeNodeLoader,
  useTreeEventsHandler,
  useTreeModel,
  ControlledTree,
  SelectionMode,
} from "@itwin/components-react";
import { IModelApp } from "@itwin/core-frontend";
import { AppUiDecorator } from "../Decorators";

const meta = {
  title: "Components/ControlledTree",
  component: TreeWidgetComponent,
  tags: ["autodocs"],
  decorators: [AppUiDecorator],
} satisfies Meta<typeof TreeWidgetComponent>;

export default meta;
type Story = StoryObj<typeof TreeWidgetComponent>;

export const Basic: Story = {
  args: {
    width: 300,
    height: 300,
  },
  render: (props) => <TreeWidgetComponent {...props} />,
};

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

function TreeWidgetComponent(props: ControlledTreeProps) {
  const [initialized, setInitialized] = React.useState(false);
  React.useEffect(() => {
    void (async function () {
      await IModelApp.startup();
      await UiFramework.initialize(undefined);
      setInitialized(true);
    })();
  }, []);

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
  const model = useTreeModel(modelSource);

  const defaultProps: ControlledTreeProps = {
    model,
    nodeLoader,
    eventsHandler,
    selectionMode: SelectionMode.Single,
    width: props.width,
    height: props.height,
  };

  if (!initialized) return null;
  return <ControlledTree {...defaultProps} />;
}
