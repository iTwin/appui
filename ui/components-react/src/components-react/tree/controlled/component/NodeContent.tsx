/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Tree
 */

import "./NodeContent.scss";
import classnames from "classnames";
import * as React from "react";
import type { CommonProps } from "@itwin/core-react";
import { TreeNodePlaceholder } from "@itwin/core-react";
import type { ItemStyle } from "../../../properties/ItemStyle";
import { ItemStyleProvider } from "../../../properties/ItemStyle";
import type { PropertyValueRendererContext } from "../../../properties/ValueRendererManager";
import { PropertyValueRendererManager } from "../../../properties/ValueRendererManager";
import { PropertyContainerType } from "../../../properties/ValueRendererManager";
import type { HighlightableTreeNodeProps } from "../../HighlightingEngine";
import { HighlightingEngine } from "../../HighlightingEngine";
import type { TreeModelNode } from "../TreeModel";
import type { TreeNodeEditorRenderer } from "./TreeNodeEditor";
import { TreeNodeEditor } from "./TreeNodeEditor";

/**
 * Properties for [[TreeNodeContent]] component
 * @public
 * @deprecated in 4.17.0. Use `React.ComponentProps<typeof TreeNodeContent>`
 */
// eslint-disable-next-line deprecation/deprecation
export interface TreeNodeContentProps extends CommonProps {
  /** Tree node to render label for. */
  node: TreeModelNode;
  /** Flag that specified whether the description should be shown or not. */
  showDescription?: boolean;
  /** Props for highlighting label parts that matches filter when tree is filtered. */
  highlightProps?: HighlightableTreeNodeProps;
  /** Callback used to detect when label is rendered. */
  onLabelRendered?: (node: TreeModelNode) => void;
  /** Callback to render custom node editor when node is in editing mode. */
  nodeEditorRenderer?: TreeNodeEditorRenderer;
}

/**
 * React component for displaying [[TreeNode]] label
 * @public
 */
// eslint-disable-next-line deprecation/deprecation
export function TreeNodeContent(props: TreeNodeContentProps) {
  const { node, onLabelRendered, highlightProps } = props;
  const label = React.useMemo(
    // eslint-disable-next-line @typescript-eslint/promise-function-async
    () => getLabel(node, highlightProps),
    [node, highlightProps]
  );
  React.useEffect(() => {
    onLabelRendered && onLabelRendered(node);
  }, [label, node, onLabelRendered]);

  // handle cell editing
  let editor: React.ReactNode;
  if (props.node.editingInfo) {
    // if cell editing is enabled, return editor instead of the label
    const style = getStyle(props.node.item.style, props.node.isSelected);
    const editorProps = {
      node: props.node,
      onCancel: props.node.editingInfo.onCancel,
      onCommit: props.node.editingInfo.onCommit,
      style,
    };
    editor = props.nodeEditorRenderer ? (
      props.nodeEditorRenderer(editorProps)
    ) : (
      <TreeNodeEditor {...editorProps} />
    );
  }

  const isDescriptionEnabled =
    props.node.item.description && props.showDescription;

  const containerClassName = classnames(
    "components-controlledTree-node-content",
    isDescriptionEnabled ? "with-description" : undefined,
    props.className
  );

  const descriptionClassName = classnames(
    "components-controlledTree-node-description",
    editor ? "with-editor" : undefined
  );

  return (
    <div className={containerClassName} style={props.style}>
      <>
        {editor ? editor : label}
        {isDescriptionEnabled ? (
          <div className={descriptionClassName}>
            {props.node.item.description}
          </div>
        ) : undefined}
      </>
    </div>
  );
}

function getLabel(
  node: TreeModelNode,
  highlightProps?: HighlightableTreeNodeProps
): React.ReactNode | Promise<React.ReactNode> {
  // handle filtered matches' highlighting
  const highlightCallback = highlightProps
    ? (text: string) => HighlightingEngine.renderNodeLabel(text, highlightProps)
    : undefined;

  // handle custom cell rendering
  const context: PropertyValueRendererContext = {
    containerType: PropertyContainerType.Tree,
    style: getStyle(node.item.style, node.isSelected),
    textHighlighter: highlightCallback,
    defaultValue: (
      // eslint-disable-next-line deprecation/deprecation
      <TreeNodePlaceholder level={0} data-testid={"node-label-placeholder"} />
    ),
  };

  return PropertyValueRendererManager.defaultManager.render(
    node.item.label,
    context
  );
}

function getStyle(
  style?: ItemStyle,
  isSelected?: boolean
): React.CSSProperties {
  return ItemStyleProvider.createStyle(style ? style : {}, isSelected);
}
