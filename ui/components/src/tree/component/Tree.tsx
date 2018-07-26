/*---------------------------------------------------------------------------------------------
|  $Copyright: (c) 2018 Bentley Systems, Incorporated. All rights reserved. $
 *--------------------------------------------------------------------------------------------*/
/** @module Tree */

import * as React from "react";
import { IDisposable, using } from "@bentley/bentleyjs-core";
import { Tree as TreeBase, TreeBranch, TreeNode } from "@bentley/ui-core";
import { BeInspireTree, InspireTreeNode, InspireTreeDataProvider, NodePredicate } from "./BeInspireTree";

/** Signature for the Nodes Selected callback */
export type OnNodesSelectedCallback = (nodes: InspireTreeNode[], replace: boolean) => void;
/** Signature for the Nodes Deselected callback */
export type OnNodesDeselectedCallback = (nodes: InspireTreeNode[]) => void;

/** Tree event callbacks  */
export interface TreeEvents {
  onNodesSelected: OnNodesSelectedCallback;
  onNodesDeselected: OnNodesDeselectedCallback;
  onNodeExpanded: (node: InspireTreeNode) => void;
  onNodeCollapsed: (node: InspireTreeNode) => void;
}

export interface TreeState {
  rootNodes: InspireTreeNode[];
}

/** Props for the Tree React component  */
export interface TreeProps {
  dataProvider: InspireTreeDataProvider;
  renderNode?: (data: InspireTreeNode, children?: React.ReactNode) => React.ReactNode;
  selectedNodes?: string[] | NodePredicate;
  expandedNodes?: ReadonlyArray<string>;
  key?: any;
}

/** Props for the Tree React component  */
export type Props = TreeProps & Partial<TreeEvents>;

/**
 * A Tree React component that uses the core of InspireTree, but renders it
 *  with Tree, TreeBranch, and TreeNode from ui-core.
 */
export default class Tree extends React.Component<Props, TreeState> {

  private _tree: BeInspireTree;
  private _nodeRenderFunc: (data: InspireTreeNode, children?: React.ReactNode) => React.ReactNode;
  private _isMounted = false;
  private _selectionHandler = new BatchSelectionHandler();

  public readonly state: Readonly<TreeState> = { rootNodes: [] };

  constructor(props: Props, context?: any) {
    super(props, context);

    this._tree = this.createTree();
    this._nodeRenderFunc = (props.renderNode) ? props.renderNode : this.defaultRenderNode;
    this._selectionHandler.onNodesSelected = this.props.onNodesSelected;
    this._selectionHandler.onNodesDeselected = this.props.onNodesDeselected;
  }

  private createTree(): BeInspireTree {
    const tree = new BeInspireTree(this.props.dataProvider, this.syncNodes);
    tree.on("node.selected", this._selectionHandler.select.bind(this._selectionHandler));
    tree.on("node.deselected", this._selectionHandler.deselect.bind(this._selectionHandler));
    tree.on("node.expanded", this.onNodeExpanded);
    tree.on("node.collapsed", this.onNodeCollapsed);
    tree.on("children.loaded", this.onChildrenLoaded);
    return tree;
  }

  public async componentWillReceiveProps(props: Props) {
    this._nodeRenderFunc = (props.renderNode) ? props.renderNode : this.defaultRenderNode;
    this._selectionHandler.onNodesSelected = this.props.onNodesSelected;
    this._selectionHandler.onNodesDeselected = this.props.onNodesDeselected;

    this._tree.pauseRendering();

    const expandedNodeIds = props.expandedNodes ? props.expandedNodes : this._tree.expandedNodeIds;

    if (this.props.dataProvider !== props.dataProvider)
      await this._tree.reload();

    await this._tree.updateExpansion(expandedNodeIds);
    await this._tree.updateTreeSelection(props.selectedNodes);

    this._tree.resumeRendering();
  }

  public componentWillMount() {
    this._isMounted = true;
    this.componentWillReceiveProps(this.props);
  }

  public componentWillUnmount() {
    this._isMounted = false;
  }

  private onNodeExpanded = (node: InspireTreeNode) => {
    if (this.props.onNodeExpanded)
      this.props.onNodeExpanded(node);

    if (undefined !== node.children && "boolean" !== typeof node.children) {
      this._tree.updateNodesSelection(node.children as any, this.props.selectedNodes);
    }
  }

  private onNodeCollapsed = (node: InspireTreeNode) => {
    if (this.props.onNodeCollapsed)
      this.props.onNodeCollapsed(node);
  }

  private onChildrenLoaded = (parentNode: InspireTreeNode) => {
    if (undefined !== parentNode.children && "boolean" !== typeof parentNode.children) {
      this._tree.updateNodesSelection(parentNode.children as any, this.props.selectedNodes);
    }
  }

  // Update the state when changes have been made to our nodes
  private syncNodes = (rootNodes: InspireTreeNode[]) => {
    if (!this._isMounted)
      return;

    this.setState({ rootNodes });
  }

  private defaultRenderNode = (data: InspireTreeNode, children?: React.ReactNode): React.ReactNode => {
    const toggleSelection = () => {
      using(this._selectionHandler.createOperation(), () => {
        data.toggleSelect();
      });
    };
    const toggleExpansion = () => data.toggleCollapse();
    return (
      <TreeNode
        key={data.id}
        isExpanded={data.expanded()}
        isSelected={data.selected()}
        isLoading={data.loading()}
        isLeaf={!data.hasOrWillHaveChildren()}
        label={data.text}
        icon={data.icon}
        onClick={toggleSelection}
        onClickExpansionToggle={toggleExpansion}
      >
        {children}
      </TreeNode>
    );
  }

  private renderBranch(nodes: InspireTreeNode[] | undefined) {
    const items: React.ReactNode[] = [];

    // For every node
    (nodes || []).forEach((node: InspireTreeNode) => {
      // Only render if node is available
      if (node.available()) {
        // Build a branch for all children of this node
        let children: React.ReactNode | undefined;
        if (node.expanded() && node.hasChildren()) {
          children = this.renderBranch(node.children as any);
        }

        // Push this node.
        items.push(this._nodeRenderFunc(node, children));
      }
    });

    return (<TreeBranch>{items}</TreeBranch>);
  }

  // Renders the wrapping div and root branch
  public render() {
    return (
      <TreeBase>
        {this.renderBranch(this.state.rootNodes)}
      </TreeBase>
    );
  }
}

class BatchSelectionOperation implements IDisposable {
  private _handler: BatchSelectionHandler;
  public readonly selections = new Array<InspireTreeNode>();
  public readonly deselections = new Array<InspireTreeNode>();

  public constructor(handler: BatchSelectionHandler) {
    this._handler = handler;
  }

  public dispose() {
    this._handler.complete(this);
  }

  public select(node: InspireTreeNode | InspireTreeNode[]) {
    if (Array.isArray(node)) {
      node.forEach((n) => this.selections.push(n));
    } else {
      this.selections.push(node);
    }
  }

  public deselect(node: InspireTreeNode | InspireTreeNode[]) {
    if (Array.isArray(node)) {
      node.forEach((n) => this.deselections.push(n));
    } else {
      this.deselections.push(node);
    }
  }
}

class BatchSelectionHandler {

  public onNodesSelected?: OnNodesSelectedCallback;
  public onNodesDeselected?: OnNodesDeselectedCallback;
  private _currentOperation?: BatchSelectionOperation;

  public constructor(onSelected?: OnNodesSelectedCallback, onDeselected?: OnNodesDeselectedCallback) {
    this.onNodesSelected = onSelected;
    this.onNodesDeselected = onDeselected;
  }

  public createOperation() {
    this._currentOperation = new BatchSelectionOperation(this);
    return this._currentOperation;
  }

  public complete(operation: BatchSelectionOperation) {
    if (0 !== operation.selections.length) {
      // if there were any selections, just ignore deselections and simply
      // report that new selections completely replaced previous selection
      if (this.onNodesSelected)
        this.onNodesSelected(operation.selections, true);
    } else if (0 !== operation.deselections.length) {
      // if there were no selections, but we have deselections - report that
      if (this.onNodesDeselected)
        this.onNodesDeselected(operation.deselections);
    } else {
      // otherwise - nothing interesting happened and there's nothing
      // to report
    }
    this._currentOperation = undefined;
  }

  public select(node: InspireTreeNode | InspireTreeNode[]) {
    if (this._currentOperation)
      this._currentOperation.select(node);
  }

  public deselect(node: InspireTreeNode | InspireTreeNode[]) {
    if (this._currentOperation)
      this._currentOperation.deselect(node);
  }

}
