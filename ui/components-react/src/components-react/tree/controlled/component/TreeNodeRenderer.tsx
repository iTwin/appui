/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Tree
 */

import * as React from "react";
import type { CommonProps, NodeCheckboxProps } from "@itwin/core-react";
import { TreeNode } from "@itwin/core-react";
import type { Checkbox } from "@itwin/itwinui-react";
import { ImageRenderer } from "../../../common/ImageRenderer";
import type { HighlightableTreeNodeProps } from "../../HighlightingEngine";
import type { ITreeImageLoader } from "../../ImageLoader";
import { TreeComponentTestId } from "../../TreeComponentTestId";
import type { TreeActions } from "../TreeActions";
import type { CheckBoxInfo, TreeModelNode } from "../TreeModel";
import { TreeNodeContent } from "./NodeContent";
import type { TreeNodeEditorRenderer } from "./TreeNodeEditor";

type CheckboxProps = React.ComponentPropsWithoutRef<typeof Checkbox>;

type CheckboxRendererProps = Omit<CheckboxProps, "onChange" | "onClick"> & {
  onChange: (checked: boolean) => void;
  onClick: (e: React.MouseEvent) => void;
};

/**
 * Properties for [[TreeNodeRenderer]].
 * @public
 */
// eslint-disable-next-line deprecation/deprecation
export interface TreeNodeRendererProps extends CommonProps {
  /** Tree node to render. */
  node: TreeModelNode;

  /** Action handler. */
  treeActions: TreeActions;

  /** Properties used to highlight matches when tree is filtered. */
  nodeHighlightProps?: HighlightableTreeNodeProps;

  /** Specifies whether to show descriptions or not. */
  descriptionEnabled?: boolean;

  /** Image loader for node icons. */
  imageLoader?: ITreeImageLoader;

  /** Callback to render custom checkbox. */
  checkboxRenderer?: (props: CheckboxRendererProps) => React.ReactNode;

  /** Callback to render custom node editor when node is in editing mode. */
  nodeEditorRenderer?: TreeNodeEditorRenderer;

  /**
   * Callback used to detect when label is rendered. It is used by TreeRenderer for scrolling to active match.
   * @internal
   */
  onLabelRendered?: (node: TreeModelNode) => void;

  /** Callback that is invoked when context menu should be opened. */
  onContextMenu?: (e: React.MouseEvent, node: TreeModelNode) => void;

  /** Child components to render inside the node.*/
  children?: React.ReactNode;
}

/**
 * Default component for rendering tree node.
 * @public
 */
export const TreeNodeRenderer = React.memo(function TreeNodeRenderer(
  props: TreeNodeRendererProps
) {
  const label = (
    <TreeNodeContent
      key={props.node.id}
      node={props.node}
      showDescription={props.descriptionEnabled}
      highlightProps={props.nodeHighlightProps}
      onLabelRendered={props.onLabelRendered}
      nodeEditorRenderer={props.nodeEditorRenderer}
    />
  );

  function onExpansionToggle() {
    if (props.node.isExpanded) props.treeActions.onNodeCollapsed(props.node.id);
    else props.treeActions.onNodeExpanded(props.node.id);
  }

  function onContextMenu(e: React.MouseEvent) {
    e.preventDefault();
    props.onContextMenu && props.onContextMenu(e, props.node);
  }

  const createCheckboxProps = (
    checkboxInfo: CheckBoxInfo
    // eslint-disable-next-line deprecation/deprecation
  ): NodeCheckboxProps => ({
    state: checkboxInfo.state,
    tooltip: checkboxInfo.tooltip,
    isDisabled: checkboxInfo.isDisabled,
    onClick: (newState) =>
      props.treeActions.onNodeCheckboxClicked(props.node.id, newState),
  });

  return (
    // eslint-disable-next-line deprecation/deprecation
    <TreeNode
      data-testid={TreeComponentTestId.Node}
      className={props.className}
      checkboxProps={
        props.node.checkbox.isVisible
          ? createCheckboxProps(props.node.checkbox)
          : undefined
      }
      style={props.style}
      isExpanded={props.node.isExpanded}
      isSelected={props.node.isSelected}
      isLoading={props.node.isLoading}
      isLeaf={props.node.numChildren === 0}
      icon={
        props.imageLoader ? (
          <TreeNodeIcon node={props.node} imageLoader={props.imageLoader} />
        ) : undefined
      }
      label={label}
      level={props.node.depth}
      onClick={(event) => props.treeActions.onNodeClicked(props.node.id, event)}
      onMouseDown={() => props.treeActions.onNodeMouseDown(props.node.id)}
      onMouseMove={() => props.treeActions.onNodeMouseMove(props.node.id)}
      onClickExpansionToggle={onExpansionToggle}
      onContextMenu={onContextMenu}
      renderOverrides={{ renderCheckbox: props.checkboxRenderer }}
    >
      {props.children}
    </TreeNode>
  );
});

/**
 * Props for [[TreeNodeIcon]] component.
 * @public
 * @deprecated in 4.17.0. Use `React.ComponentProps<typeof TreeNodeIcon>`
 */
export interface TreeNodeIconProps {
  /** Tree node to render icon for. */
  node: TreeModelNode;
  /** Image loader used to load tree node icon. */
  imageLoader: ITreeImageLoader;
}

/**
 * React component that renders icon for [[TreeNode]].
 * @public
 */
export function TreeNodeIcon(props: TreeNodeIconProps) {
  const { imageLoader, node } = props;
  const image = imageLoader.load(node.item);

  if (!image) return null;

  const renderer = new ImageRenderer();
  return <>{renderer.render(image)}</>;
}
