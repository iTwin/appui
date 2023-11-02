/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import sinon from "sinon";
import { render } from "@testing-library/react";
import type {
  ActiveRuleGroupContextProps,
  PropertyFilterBuilderContextProps,
  PropertyFilterBuilderRuleRenderingContextProps,
} from "../../components-react/filter-builder-deprecated/FilterBuilderContext";
import {
  ActiveRuleGroupContext,
  PropertyFilterBuilderContext,
  PropertyFilterBuilderRuleRenderingContext,
} from "../../components-react/filter-builder-deprecated/FilterBuilderContext";
import { PropertyFilterBuilderActions } from "../../components-react/filter-builder-deprecated/FilterBuilderState";

/** @internal */
export function renderWithContext(
  component: React.ReactElement,
  builderContextProps: Partial<PropertyFilterBuilderContextProps> = {},
  rendererContextProps: Partial<PropertyFilterBuilderRuleRenderingContextProps> = {},
  activeGroupContextProps: Partial<ActiveRuleGroupContextProps> = {}
): ReturnType<typeof render> {
  const builderContextValue: PropertyFilterBuilderContextProps = {
    actions:
      builderContextProps.actions ??
      new PropertyFilterBuilderActions(sinon.fake()),
    properties: builderContextProps.properties ?? [],
    ruleGroupDepthLimit: builderContextProps.ruleGroupDepthLimit,
    onRulePropertySelected: builderContextProps.onRulePropertySelected,
  };

  const rendererContextValue: PropertyFilterBuilderRuleRenderingContextProps = {
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
    <PropertyFilterBuilderContext.Provider value={builderContextValue}>
      <PropertyFilterBuilderRuleRenderingContext.Provider
        value={rendererContextValue}
      >
        <ActiveRuleGroupContext.Provider value={activeGroupContextValue}>
          {component}
        </ActiveRuleGroupContext.Provider>
      </PropertyFilterBuilderRuleRenderingContext.Provider>
    </PropertyFilterBuilderContext.Provider>
  );
}
