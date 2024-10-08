/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module PropertyFilterBuilder
 */

import * as React from "react";
import type { PropertyDescription } from "@itwin/appui-abstract";
import type {
  PropertyFilterBuilderContextProps,
  PropertyFilterBuilderRuleRenderingContextProps,
} from "./FilterBuilderContext.js";
import {
  PropertyFilterBuilderContext,
  PropertyFilterBuilderRuleRenderingContext,
} from "./FilterBuilderContext.js";
import { PropertyFilterBuilderRuleGroupRenderer } from "./FilterBuilderRuleGroup.js";
import type { PropertyFilterBuilderRuleOperatorProps } from "./FilterBuilderRuleOperator.js";
import type { PropertyFilterBuilderRuleValueRendererProps } from "./FilterBuilderRuleValue.js";
import {
  buildPropertyFilter,
  usePropertyFilterBuilder,
} from "./FilterBuilderState.js";
import type { PropertyFilter } from "./Types.js";
import type {
  PropertyFilterBuilderActions,
  PropertyFilterBuilderRuleGroup,
  UsePropertyFilterBuilderProps,
} from "./FilterBuilderState.js";

/**
 * Props for [[PropertyFilterBuilder]] component.
 * @beta
 */
export interface PropertyFilterBuilderProps
  extends Omit<PropertyFilterBuilderRendererProps, "actions" | "rootGroup">,
    UsePropertyFilterBuilderProps {
  /** Callback that is invoked when filter changes. */
  onFilterChanged: (filter?: PropertyFilter) => void;
}

/**
 * Component for building complex filters. It allows to create filter rules or rule groups based on provided list of properties.
 * @beta
 */
export function PropertyFilterBuilder(props: PropertyFilterBuilderProps) {
  const { initialFilter, onFilterChanged } = props;
  const { actions, rootGroup } = usePropertyFilterBuilder({
    initialFilter,
  });

  const firstRender = React.useRef(true);
  const filter = React.useMemo(
    () => buildPropertyFilter(rootGroup),
    [rootGroup]
  );
  React.useEffect(() => {
    if (!firstRender.current) onFilterChanged(filter);
    firstRender.current = false;
  }, [filter, onFilterChanged]);

  return (
    <PropertyFilterBuilderRenderer
      {...props}
      actions={actions}
      rootGroup={rootGroup}
    />
  );
}

/**
 * Props for [[PropertyFilterBuilderRenderer]] component.
 * @beta
 */
export interface PropertyFilterBuilderRendererProps {
  /** Root group of rules in [[PropertyFilterBuilder]] component. */
  rootGroup: PropertyFilterBuilderRuleGroup;
  /** Actions for modifying [[PropertyFilterBuilder]] state. */
  actions: PropertyFilterBuilderActions;
  /** List of properties available to be used in filter rules. */
  properties: PropertyDescription[];
  /** Callback that is invoked when property is selected in any rule. */
  onRulePropertySelected?: (property: PropertyDescription) => void;
  /** Custom renderer for rule operator selector. */
  ruleOperatorRenderer?: (
    props: PropertyFilterBuilderRuleOperatorProps
  ) => React.ReactNode;
  /** Custom renderer for rule value input. */
  ruleValueRenderer?: (
    props: PropertyFilterBuilderRuleValueRendererProps
  ) => React.ReactNode;
  /** Custom renderer for property selector in rule. */
  propertyRenderer?: (name: string) => React.ReactNode;
  /** Specifies how deep rule groups can be nested.
   * @deprecated in 4.9.0. Nesting is no longer supported moving forward.
   */
  ruleGroupDepthLimit?: number;
  /** Specifies whether component is disabled or not. */
  isDisabled?: boolean;
  /** Controls whether the group operator is toggle-able. */
  isGroupOperatorDisabled?: boolean;
  /** Controls whether the last rule remaining in a group is deletable  */
  allowLastRuleDelete?: boolean;
}

const ROOT_GROUP_PATH: string[] = [];

/**
 * Renderer for [[PropertyFilterBuilder]] component.
 * @beta
 */
export function PropertyFilterBuilderRenderer(
  props: PropertyFilterBuilderRendererProps
) {
  const {
    rootGroup,
    actions,
    properties,
    onRulePropertySelected,
    ruleOperatorRenderer,
    ruleValueRenderer,
    propertyRenderer,
    isDisabled,
    isGroupOperatorDisabled,
    allowLastRuleDelete,
  } = props;

  const contextValue = React.useMemo<PropertyFilterBuilderContextProps>(
    () => ({
      actions,
      properties,
      onRulePropertySelected,
    }),
    [actions, properties, onRulePropertySelected]
  );
  const renderingContextValue =
    React.useMemo<PropertyFilterBuilderRuleRenderingContextProps>(
      () => ({
        ruleOperatorRenderer,
        ruleValueRenderer,
        propertyRenderer,
        isDisabled,
      }),
      [ruleOperatorRenderer, ruleValueRenderer, propertyRenderer, isDisabled]
    );
  return (
    <PropertyFilterBuilderRuleRenderingContext.Provider
      value={renderingContextValue}
    >
      <PropertyFilterBuilderContext.Provider value={contextValue}>
        <PropertyFilterBuilderRuleGroupRenderer
          path={ROOT_GROUP_PATH}
          group={rootGroup}
          isGroupOperatorDisabled={isGroupOperatorDisabled}
          allowLastRuleDelete={allowLastRuleDelete}
        />
      </PropertyFilterBuilderContext.Provider>
    </PropertyFilterBuilderRuleRenderingContext.Provider>
  );
}
