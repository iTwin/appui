/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module PropertyFilterBuilder
 */

import "./FilterBuilderRuleGroup.scss";
import "./FilterBuilderLogicalOperator.scss";
import "./FilterBuilder.scss";
import * as React from "react";
import { SvgDelete } from "@itwin/itwinui-icons-react";
import { Flex, IconButton } from "@itwin/itwinui-react";
import {
  ActiveRuleGroupContext,
  PropertyFilterBuilderContext,
} from "./FilterBuilderContext";
import { PropertyFilterBuilderRuleRenderer } from "./FilterBuilderRule";
import type {
  PropertyFilterBuilderRuleGroup,
  PropertyFilterBuilderRuleGroupItem,
} from "./FilterBuilderState";
import { isPropertyFilterBuilderRuleGroup } from "./FilterBuilderState";
import type { PropertyFilterRuleGroupOperator } from "./Operators";
import { PropertyFilterBuilderLogicalOperator } from "./FilterBuilderLogicalOperator";

/**
 * Props for [[PropertyFilterBuilderRuleGroupRenderer]] component.
 * @internal
 */
export interface PropertyFilterBuilderRuleGroupRendererProps {
  /** Path from [[PropertyFilterBuilder]] root to this rule group. */
  path: string[];
  /** Rule group to render. */
  group: PropertyFilterBuilderRuleGroup;
  /** Size to render components. If undefined, defaults to iTwinUI "medium" size. */
  size?: "medium" | "large";
}

/**
 * Component that renders group of rules in [[PropertyFilterBuilder]] component.
 * @internal
 */
export function PropertyFilterBuilderRuleGroupRenderer(
  props: PropertyFilterBuilderRuleGroupRendererProps
) {
  const { path, group, size } = props;
  const { actions } = React.useContext(PropertyFilterBuilderContext);
  const { onNewRuleAdded, groupRef } = useRulePropertyFocus(group.items.length);

  const handleAddRule = () => {
    actions.addItem(path, "RULE");
    onNewRuleAdded();
  };

  const onOperatorChange = React.useCallback(
    (operator: PropertyFilterRuleGroupOperator) => {
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
        <PropertyFilterBuilderRuleGroupOperator
          operator={group.operator}
          onChange={onOperatorChange}
          size={size}
        />
      ) : null}
      <div className="fb-wrapper">
        {group.items.map((item) => (
          <Flex className="fb-row" key={item.id}>
            <PropertyFilterBuilderGroupOrRule
              path={path}
              item={item}
              onAddRule={handleAddRule}
              size={size}
            />
          </Flex>
        ))}
      </div>
    </Flex>
  );
}

/**
 * Props for [[PropertyFilterBuilderRuleGroupOperator]] component.
 * @internal
 */
export interface PropertyFilterBuilderRuleGroupOperatorProps {
  /** Currently selected operator. */
  operator: PropertyFilterRuleGroupOperator;
  /** Callback that is invoked when selected operator changes. */
  onChange: (operator: PropertyFilterRuleGroupOperator) => void;
  /** Size to render component. If undefined, defaults to iTwinUI "medium" size. */
  size?: "medium" | "large";
}

/**
 * Component that renders [[PropertyFilterBuilderRuleGroup]] operator selector.
 * @internal
 */
export function PropertyFilterBuilderRuleGroupOperator(
  props: PropertyFilterBuilderRuleGroupOperatorProps
) {
  const { operator, size } = props;
  const [op, setOp] = React.useState(operator);

  return (
    <Flex.Item flex="0" alignSelf="stretch">
      <PropertyFilterBuilderLogicalOperator
        className="fb-group-operator"
        operator={op}
        onOperatorChange={(value: PropertyFilterRuleGroupOperator) => {
          setOp(value);
        }}
        isDisabled={true}
        size={size}
      />
    </Flex.Item>
  );
}
interface PropertyFilterBuilderGroupOrRuleProps {
  path: string[];
  item: PropertyFilterBuilderRuleGroupItem;
  onAddRule: () => void;
  size?: "medium" | "large";
}

const PropertyFilterBuilderGroupOrRule = React.memo(
  function PropertyFilterBuilderGroupOrRule({
    path,
    item,
    onAddRule,
    size,
  }: PropertyFilterBuilderGroupOrRuleProps) {
    const itemPath = [...path, item.id];

    if (isPropertyFilterBuilderRuleGroup(item))
      return (
        <div className="fb-criteria fb-group-criteria fb-criteria-container">
          <PropertyFilterBuilderRuleGroupRenderer
            path={itemPath}
            group={item}
          />
        </div>
      );
    return (
      <div className="fb-criteria fb-group-criteria">
        <PropertyFilterBuilderRuleRenderer
          path={itemPath}
          rule={item}
          onAddRule={onAddRule}
          size={size}
        />
      </div>
    );
  }
);

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
