/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module PropertyFilterBuilder
 */

import "./FilterBuilderRuleGroup.scss";
import "./FilterBuilderLogicalOperator.scss";
import * as React from "react";
import { Flex } from "@itwin/itwinui-react";
import { PropertyFilterBuilderContext } from "./FilterBuilderContext";
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
  /** Size to render components. If undefined, defaults to iTwinUI "small" size. */
  size?: "medium" | "large";
  /** Controls whether the group operator is toggle-able. */
  isGroupOperatorDisabled?: boolean;
}

/**
 * Component that renders group of rules in [[PropertyFilterBuilder]] component.
 * @internal
 */
export function PropertyFilterBuilderRuleGroupRenderer(
  props: PropertyFilterBuilderRuleGroupRendererProps
) {
  const { path, group, size, isGroupOperatorDisabled } = props;
  const { actions } = React.useContext(PropertyFilterBuilderContext);
  const { onRuleAdded, groupRef } = useRulePropertyFocus(group.items.length);

  const onOperatorChange = React.useCallback(
    (operator: PropertyFilterRuleGroupOperator) => {
      actions.setRuleGroupOperator(path, operator);
    },
    [path, actions]
  );

  const showOperator = group.items.length > 1;

  return (
    <Flex
      ref={groupRef}
      style={{ alignSelf: "flex-start" }}
      className="fb-group fb-group-criteria fb-criteria-container"
      gap="0px"
    >
      {showOperator ? (
        <PropertyFilterBuilderRuleGroupOperator
          operator={group.operator}
          onChange={onOperatorChange}
          size={size}
          isGroupOperatorDisabled={isGroupOperatorDisabled}
        />
      ) : null}
      <div className="fb-wrapper">
        {group.items.map((item) => (
          <Flex className="fb-row" key={item.id}>
            <PropertyFilterBuilderGroupOrRule
              path={path}
              item={item}
              onRuleAdded={onRuleAdded}
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
  /** Size to render component. If undefined, defaults to iTwinUI "small" size. */
  size?: "medium" | "large";
  /** Controls whether the group operator is toggle-able. */
  isGroupOperatorDisabled?: boolean;
}

/**
 * Component that renders [[PropertyFilterBuilderRuleGroup]] operator selector.
 * @internal
 */
export function PropertyFilterBuilderRuleGroupOperator(
  props: PropertyFilterBuilderRuleGroupOperatorProps
) {
  const { operator, size, isGroupOperatorDisabled, onChange } = props;

  return (
    <Flex.Item flex="0" alignSelf="stretch">
      <PropertyFilterBuilderLogicalOperator
        className="fb-group-operator"
        operator={operator}
        onOperatorChange={onChange}
        isDisabled={isGroupOperatorDisabled}
        size={size}
      />
    </Flex.Item>
  );
}
interface PropertyFilterBuilderGroupOrRuleProps {
  path: string[];
  item: PropertyFilterBuilderRuleGroupItem;
  onRuleAdded: () => void;
  size?: "medium" | "large";
}

const PropertyFilterBuilderGroupOrRule = React.memo(
  function PropertyFilterBuilderGroupOrRule({
    path,
    item,
    onRuleAdded,
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
          onRuleAdded={onRuleAdded}
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

  return { onRuleAdded: () => (isNewRuleAdded.current = true), groupRef };
};
