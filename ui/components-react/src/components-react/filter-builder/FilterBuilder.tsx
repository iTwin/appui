/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module FilterBuilder
 */

import * as React from "react";
import type { PropertyDescription } from "@itwin/appui-abstract";
import type {
  FilterBuilderContextProps,
  FilterBuilderRuleRenderingContextProps,
} from "./FilterBuilderContext";
import {
  ActiveRuleGroupContext,
  FilterBuilderContext,
  FilterBuilderRuleRenderingContext,
  useActiveRuleGroupContextProps,
} from "./FilterBuilderContext";
import { FilterBuilderRuleGroupRenderer } from "./FilterBuilderRuleGroup";
import type { FilterBuilderRuleOperatorProps } from "./FilterBuilderRuleOperator";
import type { FilterBuilderRuleValueRendererProps } from "./FilterBuilderRuleValue";
import { createFilter, useFilterBuilder } from "./FilterBuilderState";
import type { Filter } from "./Types";
import type {
  FilterBuilderActions,
  FilterBuilderRuleGroup,
  UseFilterBuilderProps,
} from "./FilterBuilderState";
import { Flex } from "@itwin/itwinui-react";

/**
 * Props for [[FilterBuilder]] component.
 * @beta
 */
export interface FilterBuilderProps
  extends Omit<FilterBuilderRendererProps, "actions" | "rootGroup">,
    UseFilterBuilderProps {
  /** Callback that is invoked when filter changes. */
  onFilterChanged: (filter?: Filter) => void;
}

/**
 * Component for building complex filters. It allows to create filter rules or rule groups based on provided list of properties.
 * @beta
 */
export function FilterBuilder(props: FilterBuilderProps) {
  const { initialFilter, onFilterChanged } = props;
  const { actions, rootGroup } = useFilterBuilder({
    initialFilter,
  });

  const firstRender = React.useRef(true);
  const filter = React.useMemo(() => createFilter(rootGroup), [rootGroup]);
  React.useEffect(() => {
    if (!firstRender.current) onFilterChanged(filter);
    firstRender.current = false;
  }, [filter, onFilterChanged]);

  return (
    <FilterBuilderRenderer {...props} actions={actions} rootGroup={rootGroup} />
  );
}

/**
 * Props for [[FilterBuilderRenderer]] component.
 * @beta
 */
export interface FilterBuilderRendererProps {
  /** Root group of rules in [[FilterBuilder]] component. */
  rootGroup: FilterBuilderRuleGroup;
  /** Actions for modifying [[FilterBuilder]] state. */
  actions: FilterBuilderActions;
  /** List of properties available to be used in filter rules. */
  properties: PropertyDescription[];
  /** Callback that is invoked when property is selected in any rule. */
  onRulePropertySelected?: (property: PropertyDescription) => void;
  /** Custom renderer for rule operator selector. */
  ruleOperatorRenderer?: (
    props: FilterBuilderRuleOperatorProps
  ) => React.ReactNode;
  /** Custom renderer for rule value input. */
  ruleValueRenderer?: (
    props: FilterBuilderRuleValueRendererProps
  ) => React.ReactNode;
  /** Custom renderer for property selector in rule. */
  propertyRenderer?: (name: string) => React.ReactNode;
  /** Specifies whether component is disabled or not. */
  isDisabled?: boolean;
}

const ROOT_GROUP_PATH: string[] = [];

/**
 * Renderer for [[FilterBuilder]] component.
 * @beta
 */
export function FilterBuilderRenderer(props: FilterBuilderRendererProps) {
  const {
    rootGroup,
    actions,
    properties,
    onRulePropertySelected,
    ruleOperatorRenderer,
    ruleValueRenderer,
    propertyRenderer,
    isDisabled,
  } = props;
  const rootRef = React.useRef<HTMLDivElement>(null);

  const contextValue = React.useMemo<FilterBuilderContextProps>(
    () => ({
      actions,
      properties,
      onRulePropertySelected,
    }),
    [actions, properties, onRulePropertySelected]
  );
  const renderingContextValue =
    React.useMemo<FilterBuilderRuleRenderingContextProps>(
      () => ({
        ruleOperatorRenderer,
        ruleValueRenderer,
        propertyRenderer,
        isDisabled,
      }),
      [ruleOperatorRenderer, ruleValueRenderer, propertyRenderer, isDisabled]
    );
  return (
    <FilterBuilderRuleRenderingContext.Provider value={renderingContextValue}>
      <FilterBuilderContext.Provider value={contextValue}>
        <ActiveRuleGroupContext.Provider
          value={useActiveRuleGroupContextProps(rootRef)}
        >
          <Flex style={{ flexDirection: "column" }}>
            <FilterBuilderRuleGroupRenderer
              path={ROOT_GROUP_PATH}
              group={rootGroup}
            />
          </Flex>
        </ActiveRuleGroupContext.Provider>
      </FilterBuilderContext.Provider>
    </FilterBuilderRuleRenderingContext.Provider>
  );
}
