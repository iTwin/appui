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

/**
 * Data structure that describes value of [[ActiveRuleGroupContext]].
 * @internal
 */
export interface ActiveRuleGroupContextProps {
  /** Element of currently focused rule group. */
  focusedElement: HTMLElement | undefined;
  /** Element of currently hovered rule group. */
  hoveredElement: HTMLElement | undefined;
  /** Even handler for rule group element 'onFocus' event */
  onFocus: React.FocusEventHandler<HTMLElement>;
  /** Even handler for rule group element 'onBlur' event */
  onBlur: React.FocusEventHandler<HTMLElement>;
  /** Even handler for rule group element 'onMouseOver' event */
  onMouseOver: React.MouseEventHandler<HTMLElement>;
  /** Even handler for rule group element 'onMouseOut' event */
  onMouseOut: React.MouseEventHandler<HTMLElement>;
}

/**
 * Context for tracking and storing active rule group in [[PropertyFilterBuilder]].
 * Group is considered active if it is focused or hovered.
 * @internal
 */
export const ActiveRuleGroupContext =
  React.createContext<ActiveRuleGroupContextProps>(null!);

/**
 * Custom hook that created value for [[ActiveRuleGroupContext]].
 * @internal
 */
export function useActiveRuleGroupContextProps(
  rootElementRef: React.RefObject<HTMLElement>
) {
  const [focusedElement, setFocusedElement] = React.useState<
    HTMLElement | undefined
  >();
  const [hoveredElement, setHoveredElement] = React.useState<
    HTMLElement | undefined
  >();

  // This is used to prevent handling onFocus, onBlur, onMouseOver, onMouseOut in the same event cycle.
  const focusedTimeout = useSetTimeout();
  const hoveredTimeout = useSetTimeout();

  const onFocus: React.FocusEventHandler<HTMLElement> = (e) => {
    e.stopPropagation();
    const target = e.currentTarget;
    focusedTimeout(() => {
      setFocusedElement(target);
    });
  };

  const onBlur: React.FocusEventHandler<HTMLElement> = (e) => {
    e.stopPropagation();
    if (
      focusedElement !== e.currentTarget ||
      (rootElementRef.current &&
        rootElementRef.current.contains(e.relatedTarget))
    )
      return;

    focusedTimeout(() => {
      setFocusedElement(undefined);
    });
  };

  const onMouseOver: React.MouseEventHandler<HTMLElement> = (e) => {
    const target = e.currentTarget;
    e.stopPropagation();
    hoveredTimeout(() => {
      setHoveredElement(target);
    });
  };

  const onMouseOut: React.MouseEventHandler<HTMLElement> = (e) => {
    e.stopPropagation();
    // istanbul ignore if
    if (hoveredElement !== e.currentTarget) return;

    hoveredTimeout(() => {
      setHoveredElement(undefined);
    });
  };

  return {
    focusedElement,
    hoveredElement,
    onFocus,
    onBlur,
    onMouseOver,
    onMouseOut,
  };
}

function useSetTimeout() {
  const timeoutRef = React.useRef<number>();

  React.useEffect(() => {
    // clear pending timeout on unmount
    return () => {
      window.clearTimeout(timeoutRef.current);
    };
  }, []);

  return (callback: () => void) => {
    window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(callback);
  };
}
