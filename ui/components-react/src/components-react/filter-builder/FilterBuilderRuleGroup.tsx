/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module FilterBuilder
 */

import "./FilterBuilderRuleGroup.scss";
import "./FilterBuilderLogicalOperator.scss";
import "./FilterBuilder.scss";
import * as React from "react";
import { SvgDelete } from "@itwin/itwinui-icons-react";
import { Flex, IconButton } from "@itwin/itwinui-react";
import {
  ActiveRuleGroupContext,
  FilterBuilderContext,
} from "./FilterBuilderContext";
import { FilterBuilderRuleRenderer } from "./FilterBuilderRule";
import type {
  FilterBuilderRuleGroup,
  FilterBuilderRuleGroupItem,
} from "./FilterBuilderState";
import { isFilterBuilderRuleGroup } from "./FilterBuilderState";
import { FilterRuleGroupOperator } from "./Operators";
import { FilterBuilderLogicalOperator } from "./FilterBuilderLogicalOperator";

/**
 * Props for [[FilterBuilderRuleGroupRenderer]] component.
 * @internal
 */
export interface FilterBuilderRuleGroupRendererProps {
  /** Path from [[FilterBuilder]] root to this rule group. */
  path: string[];
  /** Rule group to render. */
  group: FilterBuilderRuleGroup;
  /** Size to render components. If undefined, will use iui default size */
  size?: "small" | "large";
}

/**
 * Component that renders group of rules in [[FilterBuilder]] component.
 * @internal
 */
export function FilterBuilderRuleGroupRenderer(
  props: FilterBuilderRuleGroupRendererProps
) {
  const { path, group, size } = props;
  const { actions } = React.useContext(FilterBuilderContext);
  const { onNewRuleAdded, groupRef } = useRulePropertyFocus(group.items.length);

  const handleAddRule = () => {
    actions.addItem(path);
    onNewRuleAdded();
  };
  const removeGroup = () => actions.removeItem(path);

  const onOperatorChange = React.useCallback(
    (operator: FilterRuleGroupOperator) => {
      actions.setRuleGroupOperator(path, operator);
    },
    [path, actions]
  );

  const { focusedElement, hoveredElement, ...eventHandlers } = React.useContext(
    ActiveRuleGroupContext
  );

  const showOperator = group.items.length > 1;

  return (
    <Flex
      ref={groupRef}
      style={{ alignSelf: "flex-start" }}
      className="fb-group fb-group-criteria fb-criteria-container"
      gap="0px"
      data-isactive={
        groupRef.current === focusedElement ||
        groupRef.current === hoveredElement
      }
      {...eventHandlers}
    >
      {showOperator ? (
        <FilterBuilderRuleGroupOperator
          operator={group.operator}
          onChange={onOperatorChange}
        />
      ) : null}
      <div className="fb-wrapper">
        {group.items.map((item) => (
          <Flex className="fb-row" key={item.id}>
            <FilterBuilderGroupOrRule
              path={path}
              item={item}
              onAddRule={handleAddRule}
              size={size}
            />
          </Flex>
        ))}
      </div>
      <div className="rule-group-remove-action">
        {group.groupId !== undefined && (
          <IconButton
            data-testid="rule-group-remove"
            onClick={removeGroup}
            styleType="borderless"
            size="small"
          >
            <SvgDelete />
          </IconButton>
        )}
      </div>
    </Flex>
  );
}

/**
 * Props for [[FilterBuilderRuleGroupOperator]] component.
 * @internal
 */
export interface FilterBuilderRuleGroupOperatorProps {
  /** Currently selected operator. */
  operator: FilterRuleGroupOperator;
  /** Callback that is invoked when selected operator changes. */
  onChange: (operator: FilterRuleGroupOperator) => void;
  /** Size to render component */
  size?: "small" | "large";
}

/**
 * Component that renders [[FilterBuilderRuleGroup]] operator selector.
 * @internal
 */
export function FilterBuilderRuleGroupOperator(
  props: FilterBuilderRuleGroupOperatorProps
) {
  const { operator, size } = props;

  return (
    <Flex.Item flex="0" alignSelf="stretch">
      <FilterBuilderLogicalOperator
        className="fb-group-operator"
        operator={operator === FilterRuleGroupOperator.And ? "And" : "Or"}
        isLinkDisabled={true}
        size={size}
      />
    </Flex.Item>
  );
}
interface FilterBuilderGroupOrRuleProps {
  path: string[];
  item: FilterBuilderRuleGroupItem;
  onAddRule: () => void;
  size?: "small" | "large";
}

const FilterBuilderGroupOrRule = React.memo(function FilterBuilderGroupOrRule({
  path,
  item,
  onAddRule,
  size,
}: FilterBuilderGroupOrRuleProps) {
  const itemPath = [...path, item.id];

  if (isFilterBuilderRuleGroup(item))
    return (
      <div className="fb-criteria fb-group-criteria fb-criteria-container">
        <FilterBuilderRuleGroupRenderer path={itemPath} group={item} />
      </div>
    );
  return (
    <div className="fb-criteria fb-group-criteria">
      <FilterBuilderRuleRenderer
        path={itemPath}
        rule={item}
        onAddRule={onAddRule}
        size={size}
      />
    </div>
  );
});

const useRulePropertyFocus = (currentGroupItemsLength: number) => {
  const previousGroupItemsLength = React.useRef<number>(0);
  const isNewRuleAdded = React.useRef<boolean>(false);
  const groupRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (
      isNewRuleAdded.current &&
      previousGroupItemsLength.current < currentGroupItemsLength &&
      groupRef.current
    ) {
      const ruleProperties =
        groupRef.current.querySelectorAll<HTMLInputElement>(
          ".fb-row-name input"
        );
      ruleProperties[ruleProperties.length - 1].focus();
      isNewRuleAdded.current = false;
    }
    previousGroupItemsLength.current = currentGroupItemsLength;
  }, [currentGroupItemsLength]);

  return { onNewRuleAdded: () => (isNewRuleAdded.current = true), groupRef };
};
