/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Tree
 */

import * as React from "react";
import type { CommonProps } from "@itwin/core-react";
import { FillCentered } from "@itwin/core-react";
import { DelayedSpinner } from "../../../common/DelayedSpinner";
import type { SelectionMode } from "../../../common/selection/SelectionModes";
import type { HighlightableTreeProps } from "../../HighlightingEngine";
import { TreeImageLoader } from "../../ImageLoader";
import { TreeEventDispatcher } from "../TreeEventDispatcher";
import type { TreeEvents } from "../TreeEvents";
import type {
  TreeModel,
  TreeModelNode,
  TreeModelNodePlaceholder,
  VisibleTreeNodes,
} from "../TreeModel";
import { computeVisibleNodes, isTreeModelNode } from "../TreeModel";
import type { ITreeNodeLoader } from "../TreeNodeLoader";
import type { TreeNodeRendererProps } from "./TreeNodeRenderer";
import { TreeNodeRenderer } from "./TreeNodeRenderer";
import type { RenderedItemsRange, TreeRendererProps } from "./TreeRenderer";
import { TreeRenderer } from "./TreeRenderer";
import { useElementsScrollStorage } from "../../../common/UseElementsScrollStorage";
import { useTranslation } from "../../../l10n/useTranslation";

/**
 * Properties for [[ControlledTree]]
 * @public
 */
// eslint-disable-next-line deprecation/deprecation
export interface ControlledTreeProps extends CommonProps {
  /** Model of the tree to display. */
  model: TreeModel;
  /** Node loader used to load root nodes and placeholder nodes. */
  nodeLoader: ITreeNodeLoader;
  /** Tree events handler. */
  eventsHandler: TreeEvents;
  /** Mode of nodes' selection in tree. */
  selectionMode: SelectionMode;
  /**
   * Specifies whether to show node description or not. It is used in default node renderer and to determine node height.
   * If custom node renderer and node height callbacks are used it does nothing.
   */
  descriptionsEnabled?: boolean;
  /**
   * Specifies whether to show node icon or not. It is used in default node renderer.
   * If custom node renderer is used it does nothing.
   */
  iconsEnabled?: boolean;
  /**
   * Used to highlight matches when filtering tree.
   * It is passed to treeRenderer.
   */
  nodeHighlightingProps?: HighlightableTreeProps;
  /** Custom renderer to be used to render a tree. */
  treeRenderer?: (props: TreeRendererProps) => React.ReactElement;
  /** Custom renderer to be used while root nodes is loading. */
  spinnerRenderer?: () => React.ReactElement;
  /** Custom renderer to be used when there is no data to show in tree. */
  noDataRenderer?: () => React.ReactElement;
  /** Callback that is invoked when rendered items range changes. */
  onItemsRendered?: (items: RenderedItemsRange) => void;
  /** Width of the tree renderer. */
  width: number;
  /** Height of the tree renderer. */
  height: number;
}

/**
 * React tree component which rendering is fully controlled from outside.
 * @public
 */
export function ControlledTree(props: ControlledTreeProps) {
  const nodeHeight = useNodeHeight(!!props.descriptionsEnabled);
  const imageLoader = React.useMemo(() => new TreeImageLoader(), []);
  const nodeRenderer = React.useCallback(
    (nodeProps: TreeNodeRendererProps) => (
      <TreeNodeRenderer
        {...nodeProps}
        descriptionEnabled={props.descriptionsEnabled}
        imageLoader={props.iconsEnabled ? imageLoader : undefined}
      />
    ),
    [props.descriptionsEnabled, props.iconsEnabled, imageLoader]
  );

  const visibleNodesRef = React.useRef<VisibleTreeNodes>();
  visibleNodesRef.current = React.useMemo(
    () => computeVisibleNodes(props.model),
    [props.model]
  );

  const eventDispatcher = React.useMemo(
    () =>
      new TreeEventDispatcher(
        props.eventsHandler,
        props.nodeLoader,
        props.selectionMode,
        () => visibleNodesRef.current!
      ),
    [props.eventsHandler, props.nodeLoader, props.selectionMode]
  );

  const treeProps: TreeRendererProps = {
    nodeRenderer,
    nodeHeight,
    visibleNodes: visibleNodesRef.current,
    treeActions: eventDispatcher,
    nodeLoader: props.nodeLoader,
    nodeHighlightingProps: props.nodeHighlightingProps,
    onItemsRendered: props.onItemsRendered,
    width: props.width,
    height: props.height,
  };

  const loading = useRootNodeLoader(visibleNodesRef.current, props.nodeLoader);
  const noData = visibleNodesRef.current.getNumRootNodes() === 0;
  return (
    <Loader
      loading={loading}
      noData={noData}
      spinnerRenderer={props.spinnerRenderer}
      noDataRenderer={props.noDataRenderer}
    >
      {props.treeRenderer ? (
        props.treeRenderer(treeProps)
      ) : (
        <TreeRenderer {...treeProps} />
      )}
    </Loader>
  );
}

/**
 * Returns callbacks for persisting and restoring [[ControlledTree]] layout state.
 * Returned `ref` should be set on container containing ControlledTree.
 * @public
 */
export function useControlledTreeLayoutStorage<T extends Element>() {
  return useElementsScrollStorage<T>("ReactWindow__VariableSizeList");
}

function useRootNodeLoader(
  visibleNodes: VisibleTreeNodes,
  nodeLoader: ITreeNodeLoader
): boolean {
  React.useEffect(() => {
    if (visibleNodes.getNumRootNodes() === undefined) {
      const subscription = nodeLoader
        .loadNode(visibleNodes.getModel().getRootNode(), 0)
        .subscribe();
      return () => subscription.unsubscribe();
    }

    return () => {};
  }, [visibleNodes, nodeLoader]);

  return visibleNodes.getNumRootNodes() === undefined;
}

interface LoaderProps {
  loading: boolean;
  noData: boolean;
  spinnerRenderer?: () => React.ReactElement;
  noDataRenderer?: () => React.ReactElement;
  children: React.ReactElement;
}

function Loader(props: LoaderProps) {
  const { translate } = useTranslation();
  if (props.loading) {
    return props.spinnerRenderer ? (
      props.spinnerRenderer()
    ) : (
      <div className="components-controlledTree-loader">
        <DelayedSpinner size="large" />
      </div>
    );
  }
  if (props.noData) {
    return props.noDataRenderer ? (
      props.noDataRenderer()
    ) : (
      // eslint-disable-next-line deprecation/deprecation
      <FillCentered>
        <p className="components-controlledTree-errorMessage">
          {translate("general.noData")}
        </p>
      </FillCentered>
    );
  }

  return props.children;
}

function useNodeHeight(
  descriptionsEnabled: boolean
): (node: TreeModelNode | TreeModelNodePlaceholder) => number {
  return React.useCallback(
    (node: TreeModelNode | TreeModelNodePlaceholder): number => {
      const contentHeight =
        isTreeModelNode(node) && descriptionsEnabled && node && node.description
          ? 43
          : 24;
      const borderSize = 1;
      // Not counting node's border size twice because we want neighboring borders to overlap
      return contentHeight + borderSize;
    },
    [descriptionsEnabled]
  );
}
