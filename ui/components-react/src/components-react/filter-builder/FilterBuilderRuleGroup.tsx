/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module PropertyFilterBuilder
 */

import "./FilterBuilderRuleGroup.scss";
import * as React from "react";
import { SvgAdd, SvgDelete } from "@itwin/itwinui-icons-react";
import type { SelectOption } from "@itwin/itwinui-react";
import { Button, IconButton, Select } from "@itwin/itwinui-react";
import { UiComponents } from "../UiComponents";
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
import { PropertyFilterRuleGroupOperator } from "./Operators";

/**
 * Props for [[PropertyFilterBuilderRuleGroupRenderer]] component.
 * @internal
 */
export interface PropertyFilterBuilderRuleGroupRendererProps {
  /** Path from [[PropertyFilterBuilder]] root to this rule group. */
  path: string[];
  /** Rule group to render. */
  group: PropertyFilterBuilderRuleGroup;
}

/**
 * Component that renders group of rules in [[PropertyFilterBuilder]] component.
 * @internal
 */
export function PropertyFilterBuilderRuleGroupRenderer(
  props: PropertyFilterBuilderRuleGroupRendererProps
) {
  const { path, group } = props;
  const { actions, ruleGroupDepthLimit } = React.useContext(
    PropertyFilterBuilderContext
  );
  const { onNewRuleAdded, groupRef } = useRulePropertyFocus(group.items.length);

  const handleAddRule = (ruleType: "RULE" | "RULE_GROUP") => {
    actions.addItem(path, ruleType);
    onNewRuleAdded();
  };
  const removeGroup = () => actions.removeItem(path);

  const onOperatorChange = React.useCallback(
    (operator: PropertyFilterRuleGroupOperator) => {
      actions.setRuleGroupOperator(path, operator);
    },
    [path, actions]
  );

  const allowToAddGroup =
    ruleGroupDepthLimit === undefined || path.length < ruleGroupDepthLimit;
  const { focusedElement, hoveredElement, ...eventHandlers } = React.useContext(
    ActiveRuleGroupContext
  );

  const showOperator = group.items.length > 1;

  return (
    <div
      ref={groupRef}
      className="rule-group"
      data-isactive={
        groupRef.current === focusedElement ||
        groupRef.current === hoveredElement
      }
      {...eventHandlers}
    >
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
      <div className="rule-group-content">
        {showOperator ? (
          <PropertyFilterBuilderRuleGroupOperator
            operator={group.operator}
            onChange={onOperatorChange}
          />
        ) : null}
        <div className="rule-group-items">
          {group.items.map((item) => (
            <PropertyFilterBuilderGroupOrRule
              key={item.id}
              path={path}
              item={item}
              isRemovable={group.items.length > 1}
            />
          ))}
        </div>
        <div className="rule-group-actions">
          <Button
            key="add-rule-button"
            data-testid="rule-group-add-rule"
            onClick={() => handleAddRule("RULE")}
            styleType="borderless"
            size="small"
            startIcon={<SvgAdd />}
          >
            {UiComponents.translate("filterBuilder.rule")}
          </Button>
          {allowToAddGroup && (
            <Button
              key="add-rule-group-button"
              data-testid="rule-group-add-rule-group"
              onClick={() => handleAddRule("RULE_GROUP")}
              styleType="borderless"
              size="small"
              startIcon={<SvgAdd />}
            >
              {UiComponents.translate("filterBuilder.ruleGroup")}
            </Button>
          )}
        </div>
      </div>
    </div>
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
}

/**
 * Component that renders [[PropertyFilterBuilderRuleGroup]] operator selector.
 * @internal
 */
export function PropertyFilterBuilderRuleGroupOperator(
  props: PropertyFilterBuilderRuleGroupOperatorProps
) {
  const { operator, onChange } = props;

  const options = React.useMemo<
    Array<SelectOption<PropertyFilterRuleGroupOperator>>
  >(
    () => [
      {
        value: PropertyFilterRuleGroupOperator.And,
        label: UiComponents.translate("filterBuilder.operators.and"),
      },
      {
        value: PropertyFilterRuleGroupOperator.Or,
        label: UiComponents.translate("filterBuilder.operators.or"),
      },
    ],
    []
  );

  return (
    <div className="rule-group-operator">
      <Select
        options={options}
        value={operator}
        onChange={onChange}
        size="small"
      />
    </div>
  );
}
interface PropertyFilterBuilderGroupOrRuleProps {
  path: string[];
  item: PropertyFilterBuilderRuleGroupItem;
  isRemovable?: boolean;
}

const PropertyFilterBuilderGroupOrRule = React.memo(
  function PropertyFilterBuilderGroupOrRule({
    path,
    item,
    isRemovable,
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
        isRemovable={isRemovable}
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
          ".rule-property input"
        );
      ruleProperties[ruleProperties.length - 1].focus();
      isNewRuleAdded.current = false;
    }
    previousGroupItemsLength.current = currentGroupItemsLength;
  }, [currentGroupItemsLength]);

  return { onNewRuleAdded: () => (isNewRuleAdded.current = true), groupRef };
};
