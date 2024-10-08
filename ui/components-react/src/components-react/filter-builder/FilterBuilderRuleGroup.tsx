/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module PropertyFilterBuilder
 */

import "./FilterBuilderRuleGroup.scss";
import * as React from "react";
import { Flex } from "@itwin/itwinui-react";
import { PropertyFilterBuilderContext } from "./FilterBuilderContext.js";
import { PropertyFilterBuilderRuleRenderer } from "./FilterBuilderRule.js";
import type {
  PropertyFilterBuilderRuleGroup,
  PropertyFilterBuilderRuleGroupItem,
} from "./FilterBuilderState.js";
import { isPropertyFilterBuilderRuleGroup } from "./FilterBuilderState.js";
import type { PropertyFilterRuleGroupOperator } from "./Operators.js";
import { PropertyFilterBuilderLogicalOperator } from "./FilterBuilderLogicalOperator.js";

/**
 * Props for [[PropertyFilterBuilderRuleGroupRenderer]] component.
 * @internal
 */
export interface PropertyFilterBuilderRuleGroupRendererProps {
  /** Path from [[PropertyFilterBuilder]] root to this rule group. */
  path: string[];
  /** Rule group to render. */
  group: PropertyFilterBuilderRuleGroup;
  /** Controls whether the group operator is toggle-able. */
  isGroupOperatorDisabled?: boolean;
  /** Controls whether the last rule remaining in a group is deletable */
  allowLastRuleDelete?: boolean;
}

/**
 * Component that renders group of rules in [[PropertyFilterBuilder]] component.
 * @internal
 */
export function PropertyFilterBuilderRuleGroupRenderer(
  props: PropertyFilterBuilderRuleGroupRendererProps
) {
  const { path, group, isGroupOperatorDisabled, allowLastRuleDelete } = props;
  const { actions } = React.useContext(PropertyFilterBuilderContext);
  const { onRuleAdded, groupRef } = useRulePropertyFocus(group.items.length);

  const onOperatorChange = React.useCallback(
    (operator: `${PropertyFilterRuleGroupOperator}`) => {
      actions.setRuleGroupOperator(path, operator);
    },
    [path, actions]
  );

  return (
    <Flex
      ref={groupRef}
      style={{ alignSelf: "flex-start" }}
      className="fb-group"
      gap="0px"
    >
      <PropertyFilterBuilderRuleGroupOperator
        operator={group.operator}
        onChange={onOperatorChange}
        isGroupOperatorDisabled={isGroupOperatorDisabled}
      />
      <div className="fb-wrapper">
        {group.items.map((item) => (
          <div className="fb-row" key={item.id}>
            <PropertyFilterBuilderGroupOrRule
              path={path}
              item={item}
              onRuleAdded={onRuleAdded}
              allowLastRuleDelete={allowLastRuleDelete}
            />
          </div>
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
  operator: `${PropertyFilterRuleGroupOperator}`;
  /** Callback that is invoked when selected operator changes. */
  onChange: (operator: `${PropertyFilterRuleGroupOperator}`) => void;
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
  const { operator, isGroupOperatorDisabled, onChange } = props;

  return (
    <Flex.Item alignSelf="stretch">
      <PropertyFilterBuilderLogicalOperator
        className="fb-group-operator"
        operator={operator}
        onOperatorChange={onChange}
        isDisabled={isGroupOperatorDisabled}
      />
    </Flex.Item>
  );
}
interface PropertyFilterBuilderGroupOrRuleProps {
  path: string[];
  item: PropertyFilterBuilderRuleGroupItem;
  onRuleAdded: () => void;
  allowLastRuleDelete?: boolean;
}

const PropertyFilterBuilderGroupOrRule = React.memo(
  function PropertyFilterBuilderGroupOrRule({
    path,
    item,
    onRuleAdded,
    allowLastRuleDelete,
  }: PropertyFilterBuilderGroupOrRuleProps) {
    const itemPath = [...path, item.id];

    if (isPropertyFilterBuilderRuleGroup(item))
      return (
        <PropertyFilterBuilderRuleGroupRenderer path={itemPath} group={item} />
      );
    return (
      <PropertyFilterBuilderRuleRenderer
        path={itemPath}
        rule={item}
        onRuleAdded={onRuleAdded}
        allowLastRuleDelete={allowLastRuleDelete}
      />
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
          ".fb-property-name input"
        );
      ruleProperties[ruleProperties.length - 1].focus();
      isNewRuleAdded.current = false;
    }
    previousGroupItemsLength.current = currentGroupItemsLength;
  }, [currentGroupItemsLength]);

  return { onRuleAdded: () => (isNewRuleAdded.current = true), groupRef };
};
