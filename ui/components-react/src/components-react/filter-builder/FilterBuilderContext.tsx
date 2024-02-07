/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module PropertyFilterBuilder
 */

import * as React from "react";
import type { PropertyDescription } from "@itwin/appui-abstract";
import type { PropertyFilterBuilderActions } from "./FilterBuilderState";
import type { PropertyFilterBuilderRuleOperatorProps } from "./FilterBuilderRuleOperator";
import type { PropertyFilterBuilderRuleValueRendererProps } from "./FilterBuilderRuleValue";

/**
 * Data structure that describes [[PropertyFilterBuilderContext]] value.
 * @internal
 */
export interface PropertyFilterBuilderContextProps {
  /** Actions for modifying [[PropertyFilterBuilder]] state. */
  actions: PropertyFilterBuilderActions;
  /** List of available properties. */
  properties: PropertyDescription[];
  /** Callback to invoke when property is selected in any rule. */
  onRulePropertySelected?: (property: PropertyDescription) => void;
  /** Specifies how deep rule groups can be nested. */
  ruleGroupDepthLimit?: number;
}

/**
 * Context used to store data for rules and rule groups rendered inside [[PropertyFilterBuilder]] component.
 * @internal
 */
export const PropertyFilterBuilderContext =
  React.createContext<PropertyFilterBuilderContextProps>(null!);

/**
 * Data structure that describes [[PropertyFilterBuilderRuleRenderingContext]] value.
 * @internal
 */
export interface PropertyFilterBuilderRuleRenderingContextProps {
  /** Custom renderer for operator selector in rule. */
  ruleOperatorRenderer?: (
    props: PropertyFilterBuilderRuleOperatorProps
  ) => React.ReactNode;
  /** Custom renderer for value input in rule. */
  ruleValueRenderer?: (
    props: PropertyFilterBuilderRuleValueRendererProps
  ) => React.ReactNode;
  /** Custom renderer for property selector in rule. */
  propertyRenderer?: (name: string) => React.ReactNode;
  /** Specifies that properties selection is disabled. */
  isDisabled?: boolean;
}

/**
 * Context for rendering rules and rule groups inside [[PropertyFilterBuilder]] component.
 * @internal
 */
export const PropertyFilterBuilderRuleRenderingContext =
  React.createContext<PropertyFilterBuilderRuleRenderingContextProps>({});
