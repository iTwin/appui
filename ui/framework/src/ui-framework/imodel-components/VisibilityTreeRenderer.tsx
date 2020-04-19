/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module IModelComponents
 */

import * as React from "react";
import { NodeCheckboxRenderProps, ImageCheckBox } from "@bentley/ui-core";
import { TreeRendererProps, TreeRenderer, TreeImageLoader, TreeNodeRendererProps, TreeNodeRenderer, AbstractTreeNodeLoaderWithProvider } from "@bentley/ui-components";
import { IPresentationTreeDataProvider, useControlledTreeFiltering } from "@bentley/presentation-components";
import { VisibilityTreeFilterInfo } from "./VisibilityTreeEventHandler";

/**
 * Creates Visibility tree renderer which renders nodes with eye checkbox.
 * @alpha
 */
export const useVisibilityTreeRenderer = (iconsEnabled: boolean, descriptionsEnabled: boolean) => {
  const nodeRenderer = React.useCallback(createVisibilityTreeNodeRenderer(iconsEnabled, descriptionsEnabled), [iconsEnabled, descriptionsEnabled]);
  return React.useCallback((props: TreeRendererProps) => (
    <TreeRenderer
      {...props}
      nodeRenderer={nodeRenderer}
    />
  ), [nodeRenderer]);
};

const imageLoader = new TreeImageLoader();
/**
 * Creates node renderer which renders node with eye checkbox.
 * @alpha
 */
export const createVisibilityTreeNodeRenderer = (iconsEnabled: boolean, descriptionEnabled: boolean) => {
  return (props: TreeNodeRendererProps) => (
    <TreeNodeRenderer
      {...props}
      checkboxRenderer={visibilityTreeNodeCheckboxRenderer}
      descriptionEnabled={descriptionEnabled}
      imageLoader={iconsEnabled ? imageLoader : undefined}
      className={props.node.checkbox.isVisible ? "with-checkbox" : undefined}
    />
  );
};

/**
 * Checkbox renderer that renders an eye.
 * @alpha
 */
export const visibilityTreeNodeCheckboxRenderer = (props: NodeCheckboxRenderProps) => (
  <ImageCheckBox
    checked={props.checked}
    disabled={props.disabled}
    imageOn="icon-visibility"
    imageOff="icon-visibility-hide-2"
    onClick={props.onChange}
    tooltip={props.title}
  />
);

/**
 * Filters data provider used in supplied node loader and invokes onFilterApplied when filtering is completed.
 * @alpha
 */
export const useVisibilityTreeFiltering = (
  nodeLoader: AbstractTreeNodeLoaderWithProvider<IPresentationTreeDataProvider>,
  filterInfo?: VisibilityTreeFilterInfo,
  onFilterApplied?: (filteredDataProvider: IPresentationTreeDataProvider, matchesCount: number) => void,
) => {
  const { filter, activeMatchIndex } = filterInfo ?? { filter: undefined, activeMatchIndex: undefined };
  const {
    filteredNodeLoader,
    isFiltering,
    matchesCount,
    nodeHighlightingProps,
  } = useControlledTreeFiltering({ nodeLoader, filter, activeMatchIndex });

  React.useEffect(
    () => {
      if (filter && matchesCount !== undefined && filteredNodeLoader !== nodeLoader)
        onFilterApplied && onFilterApplied(filteredNodeLoader.dataProvider, matchesCount);
    },
    [filter, matchesCount, nodeLoader, filteredNodeLoader, onFilterApplied],
  );

  return { filteredNodeLoader, isFiltering, nodeHighlightingProps };
};

/**
 * Properties for [[VisibilityTreeNoFilteredData]] component.
 * @alpha
 */
export interface VisibilityTreeNoFilteredDataProps {
  title: string;
  message: string;
}

/**
 * Renders message that no nodes was found for filter.
 * @alpha
 */
export function VisibilityTreeNoFilteredData(props: VisibilityTreeNoFilteredDataProps) {
  return (
    <div className="components-tree-errormessage">
      <span className="errormessage-header">{props.title}</span>
      <span className="errormessage-body">{props.message}</span>
    </div>
  );
}
