/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import sinon from "sinon";
import { render } from "@testing-library/react";
import type {
  ActiveRuleGroupContextProps,
  FilterBuilderContextProps,
  FilterBuilderRuleRenderingContextProps,
} from "../../components-react/filter-builder/FilterBuilderContext";
import {
  ActiveRuleGroupContext,
  FilterBuilderContext,
  FilterBuilderRuleRenderingContext,
} from "../../components-react/filter-builder/FilterBuilderContext";
import { FilterBuilderActions } from "../../components-react/filter-builder/FilterBuilderState";

/** @internal */
export function renderWithContext(
  component: React.ReactElement,
  builderContextProps: Partial<FilterBuilderContextProps> = {},
  rendererContextProps: Partial<FilterBuilderRuleRenderingContextProps> = {},
  activeGroupContextProps: Partial<ActiveRuleGroupContextProps> = {}
): ReturnType<typeof render> {
  const builderContextValue: FilterBuilderContextProps = {
    actions:
      builderContextProps.actions ?? new FilterBuilderActions(sinon.fake()),
    properties: builderContextProps.properties ?? [],
    onRulePropertySelected: builderContextProps.onRulePropertySelected,
  };

  const rendererContextValue: FilterBuilderRuleRenderingContextProps = {
    ruleOperatorRenderer: rendererContextProps.ruleOperatorRenderer,
    ruleValueRenderer: rendererContextProps.ruleValueRenderer,
    propertyRenderer: rendererContextProps.propertyRenderer,
    isDisabled: rendererContextProps.isDisabled,
  };

  const activeGroupContextValue: ActiveRuleGroupContextProps = {
    focusedElement: activeGroupContextProps.focusedElement,
    hoveredElement: activeGroupContextProps.hoveredElement,
    onMouseOver: activeGroupContextProps.onMouseOver ?? sinon.fake(),
    onMouseOut: activeGroupContextProps.onMouseOut ?? sinon.fake(),
    onBlur: activeGroupContextProps.onBlur ?? sinon.fake(),
    onFocus: activeGroupContextProps.onFocus ?? sinon.fake(),
  };

  return render(
    <FilterBuilderContext.Provider value={builderContextValue}>
      <FilterBuilderRuleRenderingContext.Provider value={rendererContextValue}>
        <ActiveRuleGroupContext.Provider value={activeGroupContextValue}>
          {component}
        </ActiveRuleGroupContext.Provider>
      </FilterBuilderRuleRenderingContext.Provider>
    </FilterBuilderContext.Provider>
  );
}
