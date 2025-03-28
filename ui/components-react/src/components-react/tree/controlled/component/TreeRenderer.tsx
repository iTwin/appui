/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Tree
 */

import "./ControlledTree.scss";
import classnames from "classnames";
import * as React from "react";
import type {
  ListChildComponentProps,
  ListOnItemsRenderedProps,
} from "react-window";
import { areEqual, VariableSizeList } from "react-window";
import { concat, timer } from "rxjs";
import { assert } from "@itwin/core-bentley";
import { Tree as CoreTree, TreeNodePlaceholder } from "@itwin/core-react";
import { createContextWithMandatoryProvider } from "../../../common/UseContextWithMandatoryProvider.js";
import type { HighlightableTreeProps } from "../../HighlightingEngine.js";
import { HighlightingEngine } from "../../HighlightingEngine.js";
import type { TreeActions } from "../TreeActions.js";
import type {
  TreeModelNode,
  TreeModelNodePlaceholder,
  VisibleTreeNodes,
} from "../TreeModel.js";
import {
  isTreeModelNode,
  isTreeModelNodePlaceholder,
  isTreeModelRootNode,
} from "../TreeModel.js";
import type { ITreeNodeLoader } from "../TreeNodeLoader.js";
import type { TreeNodeRendererProps } from "./TreeNodeRenderer.js";
import { TreeNodeRenderer } from "./TreeNodeRenderer.js";
import { toRxjsObservable } from "../Observable.js";

const NODE_LOAD_DELAY = 500;

/**
 * Data structure that describes range of rendered items in the tree.
 * @public
 */
export interface RenderedItemsRange {
  overscanStartIndex: number;
  overscanStopIndex: number;
  visibleStartIndex: number;
  visibleStopIndex: number;
}

/**
 * Properties for [[TreeRenderer]] component.
 * @public
 */
export interface TreeRendererProps {
  treeActions: TreeActions;
  nodeLoader: ITreeNodeLoader;

  /** Callback that is used to determine node height. */
  nodeHeight: (
    node: TreeModelNode | TreeModelNodePlaceholder,
    index: number
  ) => number;

  /** Flat list of nodes to be rendered. */
  visibleNodes: VisibleTreeNodes;

  /** Callback to render custom node.  */
  nodeRenderer?: (props: TreeNodeRendererProps) => React.ReactNode;

  /** Properties used to highlight nodes and scroll to active match while filtering. */
  nodeHighlightingProps?: HighlightableTreeProps;

  /** Callback that is called when rendered items range changes. */
  onItemsRendered?: (renderedItems: RenderedItemsRange) => void;

  /**
   * Callback used when an editor closes
   * @internal
   */
  onNodeEditorClosed?: () => void;

  /** Width of the tree area. */
  width: number;

  /** Height of the tree area. */
  height: number;
}

/**
 * Attributes found on TreeRenderer component
 * @public
 */
export interface TreeRendererAttributes {
  /**
   * Scroll to the specified node.
   * @param nodeId Id of the target node to scroll to.
   * @param alignment Controls scrolling behavior. See [react-window](https://github.com/bvaughn/react-window) documentation
   * on `scrollToItem` for details.
   */
  scrollToNode(nodeId: string, alignment?: Alignment): void;
}

type Alignment = "auto" | "smart" | "center" | "end" | "start";

/** [[TreeRenderer]] context that is provided to each rendered node. */
interface TreeRendererContext {
  /** Callback to render custom node. */
  nodeRenderer: (props: TreeNodeRendererProps) => React.ReactNode;

  treeActions: TreeActions;
  nodeLoader: ITreeNodeLoader;

  /** Flat list of nodes to be rendered. */
  visibleNodes: VisibleTreeNodes;

  /** Engine used to created node highlighting properties. */
  highlightingEngine?: HighlightingEngine;

  /** Callback used detect when label is rendered. It is used by TreeRenderer for scrolling to active match. */
  onLabelRendered?: (node: TreeModelNode) => void;

  /** Callback used when an editor closes */
  onNodeEditorClosed?: () => void;
}

/** [[TreeRenderer]] context provider, consumer and custom hook. */
const [
  /** Context of [[TreeRenderer]] provider. */
  TreeRendererContextProvider,

  /** Context of [[TreeRenderer]] consumer. */
  _TreeRendererContextConsumer,

  /** Custom hook to use [[TreeRenderer]] context. */
  useTreeRendererContext,
] = createContextWithMandatoryProvider<TreeRendererContext>(
  "TreeRendererContext"
);

/**
 * Default tree rendering component.
 * @public
 */
export class TreeRenderer
  extends React.Component<TreeRendererProps>
  implements TreeRendererAttributes
{
  private _ref = React.createRef<TreeRendererAttributes>();

  /** @inheritdoc */
  public scrollToNode(nodeId: string, alignment?: Alignment) {
    if (this._ref.current) this._ref.current.scrollToNode(nodeId, alignment);
  }

  public override render() {
    return <TreeRendererInner ref={this._ref} {...this.props} />;
  }
}

// eslint-disable-next-line react/display-name
const TreeRendererInner = React.forwardRef<
  TreeRendererAttributes,
  TreeRendererProps
>((props, ref) => {
  const variableSizeListRef = React.useRef<VariableSizeList>(null);
  useTreeRendererAttributes(ref, variableSizeListRef, props.visibleNodes);

  const previousVisibleNodes = usePrevious(props.visibleNodes);
  const previousNodeHeight = usePrevious(props.nodeHeight);
  if (
    (previousVisibleNodes !== undefined &&
      previousVisibleNodes !== props.visibleNodes) ||
    (previousNodeHeight !== undefined &&
      previousNodeHeight !== props.nodeHeight)
  ) {
    if (variableSizeListRef.current) {
      variableSizeListRef.current.resetAfterIndex(0, false);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-deprecated
  const coreTreeRef = React.useRef<CoreTree>(null);
  const onLabelRendered = useScrollToActiveMatch(
    coreTreeRef,
    props.nodeHighlightingProps
  );
  const highlightingEngine = React.useMemo(
    () =>
      props.nodeHighlightingProps &&
      new HighlightingEngine(props.nodeHighlightingProps),
    [props.nodeHighlightingProps]
  );

  const rendererContext = React.useMemo<TreeRendererContext>(
    () => ({
      nodeRenderer: props.nodeRenderer
        ? props.nodeRenderer
        : (nodeProps) => <TreeNodeRenderer {...nodeProps} />,
      treeActions: props.treeActions,
      nodeLoader: props.nodeLoader,
      visibleNodes: props.visibleNodes,
      onLabelRendered,
      highlightingEngine,
      onNodeEditorClosed: () => {
        setFocusToSelected(coreTreeRef);
        props.onNodeEditorClosed && props.onNodeEditorClosed();
      },
    }),
    [props, onLabelRendered, highlightingEngine]
  );

  const itemKey = React.useCallback(
    (index: number) => getNodeKey(props.visibleNodes.getAtIndex(index)!),
    [props.visibleNodes]
  );

  const { nodeHeight, visibleNodes } = props;
  const itemSize = React.useCallback(
    (index: number) => nodeHeight(visibleNodes.getAtIndex(index)!, index),
    [nodeHeight, visibleNodes]
  );

  const { nodeHighlightingProps } = props;
  React.useEffect(() => {
    const highlightedNodeId = getHighlightedNodeId(nodeHighlightingProps);
    if (!highlightedNodeId) return;

    let index = 0;
    for (const node of visibleNodes) {
      if (isTreeModelNode(node) && node.id === highlightedNodeId) break;

      index++;
    }

    assert(variableSizeListRef.current !== null);
    variableSizeListRef.current.scrollToItem(index);
  }, [nodeHighlightingProps]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent) => {
      props.treeActions.onTreeKeyDown(e);
    },
    [props.treeActions]
  );

  const handleKeyUp = React.useCallback(
    (e: React.KeyboardEvent) => {
      props.treeActions.onTreeKeyUp(e);
    },
    [props.treeActions]
  );

  const onItemsRendered = props.onItemsRendered;
  const handleRenderedItemsChange = React.useCallback(
    (onItemsRenderedProps: ListOnItemsRenderedProps) => {
      onItemsRendered && onItemsRendered({ ...onItemsRenderedProps });
    },
    [onItemsRendered]
  );

  return (
    <TreeRendererContextProvider value={rendererContext}>
      {/* eslint-disable-next-line @typescript-eslint/no-deprecated */}
      <CoreTree
        ref={coreTreeRef}
        className={classnames(
          "components-controlledTree",
          "components-smallEditor-host"
        )}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
      >
        <VariableSizeList
          ref={variableSizeListRef}
          className={"ReactWindow__VariableSizeList"}
          width={props.width}
          height={props.height}
          itemCount={props.visibleNodes.getNumNodes()}
          itemSize={itemSize}
          estimatedItemSize={25}
          overscanCount={10}
          itemKey={itemKey}
          onItemsRendered={handleRenderedItemsChange}
        >
          {Node}
        </VariableSizeList>
      </CoreTree>
    </TreeRendererContextProvider>
  );
});

function getNodeKey(node: TreeModelNode | TreeModelNodePlaceholder): string {
  if (isTreeModelNode(node)) {
    return node.id;
  }
  return `${node.parentId || ""}-${node.childIndex}`;
}

const Node = React.memo<React.FC<ListChildComponentProps>>(function Node(
  props: ListChildComponentProps
) {
  const { index, style } = props;

  const {
    nodeRenderer,
    visibleNodes,
    treeActions,
    nodeLoader,
    onLabelRendered,
    highlightingEngine,
    onNodeEditorClosed,
  } = useTreeRendererContext(Node);
  const node = visibleNodes.getAtIndex(index)!;

  useNodeLoading(node, visibleNodes, nodeLoader);

  // Mark selected node's wrapper to make detecting consecutively selected nodes with css selectors possible
  const className = classnames("node-wrapper", {
    "is-selected": isTreeModelNode(node) && node.isSelected,
  });

  const isEditing = React.useRef(false);
  React.useEffect(() => {
    if (!isTreeModelNode(node)) return;

    if (!isEditing.current && node.editingInfo) {
      isEditing.current = true;
    } else if (isEditing.current && node.editingInfo === undefined) {
      isEditing.current = false;

      if (onNodeEditorClosed) onNodeEditorClosed();
    }
  }, [node, onNodeEditorClosed]);

  return (
    <div className={className} style={style}>
      {React.useMemo(() => {
        if (isTreeModelNode(node)) {
          const nodeHighlightProps = highlightingEngine
            ? highlightingEngine.createRenderProps(node)
            : undefined;
          return nodeRenderer({
            node,
            treeActions,
            onLabelRendered,
            nodeHighlightProps,
          });
        }

        // eslint-disable-next-line @typescript-eslint/no-deprecated
        return <TreeNodePlaceholder level={node.depth} />;
      }, [
        node,
        treeActions,
        nodeRenderer,
        onLabelRendered,
        highlightingEngine,
      ])}
    </div>
  );
},
areEqual);

function useNodeLoading(
  node: TreeModelNode | TreeModelNodePlaceholder,
  visibleNodes: VisibleTreeNodes,
  nodeLoader: ITreeNodeLoader
): void {
  React.useEffect(
    () => {
      if (!isTreeModelNodePlaceholder(node)) {
        return;
      }

      const treeModel = visibleNodes.getModel();
      const parentNode = node.parentId
        ? treeModel.getNode(node.parentId)
        : treeModel.getRootNode();
      if (!isTreeModelNode(parentNode) && !isTreeModelRootNode(parentNode)) {
        return;
      }

      const subscription = concat(
        timer(NODE_LOAD_DELAY),
        toRxjsObservable(nodeLoader.loadNode(parentNode, node.childIndex))
      ).subscribe();
      return () => subscription.unsubscribe();
    },
    // Mounted node component never changes its node key, thus it's safe to run this effect only once for every
    // nodeLoader change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [nodeLoader]
  );
}

function useTreeRendererAttributes(
  ref: React.Ref<TreeRendererAttributes>,
  variableSizeListRef: React.RefObject<VariableSizeList>,
  visibleNodes: VisibleTreeNodes
) {
  const visibleNodesRef = React.useRef(visibleNodes);
  visibleNodesRef.current = visibleNodes;
  React.useImperativeHandle(
    ref,
    () => ({
      scrollToNode: (nodeId, alignment) => {
        assert(variableSizeListRef.current !== null);
        variableSizeListRef.current.scrollToItem(
          visibleNodesRef.current.getIndexOfNode(nodeId),
          alignment
        );
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
}

function usePrevious<T>(value: T): T | undefined {
  const ref = React.useRef<T>();

  React.useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

function getHighlightedNodeId(highlightableTreeProps?: HighlightableTreeProps) {
  return highlightableTreeProps && highlightableTreeProps.activeMatch
    ? highlightableTreeProps.activeMatch.nodeId
    : undefined;
}

function useScrollToActiveMatch(
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  treeRef: React.RefObject<CoreTree>,
  highlightableTreeProps?: HighlightableTreeProps
) {
  const scrollToActive = React.useRef(false);
  React.useEffect(() => {
    scrollToActive.current = true;
  }, [highlightableTreeProps]);

  const onLabelRendered = React.useCallback(
    (node: TreeModelNode) => {
      const highlightedNodeId = getHighlightedNodeId(highlightableTreeProps);
      if (
        !treeRef.current ||
        !scrollToActive.current ||
        !highlightedNodeId ||
        highlightedNodeId !== node.id
      )
        return;

      scrollToActive.current = false;
      const scrollTo = [
        ...treeRef.current.getElementsByClassName(
          HighlightingEngine.ACTIVE_CLASS_NAME
        ),
      ];
      if (scrollTo.length > 0 && scrollTo[0].scrollIntoView !== undefined)
        scrollTo[0].scrollIntoView({
          behavior: "auto",
          block: "nearest",
          inline: "end",
        });
    },
    [highlightableTreeProps, treeRef]
  );

  return onLabelRendered;
}

// eslint-disable-next-line @typescript-eslint/no-deprecated
function setFocusToSelected(treeRef: React.RefObject<CoreTree>) {
  if (treeRef.current)
    treeRef.current.setFocusByClassName(".core-tree-node.is-selected");
}
