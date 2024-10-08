/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { render } from "@testing-library/react";
import type {
  PropertyFilterBuilderContextProps,
  PropertyFilterBuilderRuleRenderingContextProps,
} from "../../components-react/filter-builder/FilterBuilderContext.js";
import {
  PropertyFilterBuilderContext,
  PropertyFilterBuilderRuleRenderingContext,
} from "../../components-react/filter-builder/FilterBuilderContext.js";
import { PropertyFilterBuilderActions } from "../../components-react/filter-builder/FilterBuilderState.js";

/** @internal */
export function renderWithContext(
  component: React.ReactElement,
  builderContextProps: Partial<PropertyFilterBuilderContextProps> = {},
  rendererContextProps: Partial<PropertyFilterBuilderRuleRenderingContextProps> = {}
): ReturnType<typeof render> {
  const builderContextValue: PropertyFilterBuilderContextProps = {
    actions:
      builderContextProps.actions ?? new PropertyFilterBuilderActions(vi.fn()),
    properties: builderContextProps.properties ?? [],
    onRulePropertySelected: builderContextProps.onRulePropertySelected,
  };

  const rendererContextValue: PropertyFilterBuilderRuleRenderingContextProps = {
    ruleOperatorRenderer: rendererContextProps.ruleOperatorRenderer,
    ruleValueRenderer: rendererContextProps.ruleValueRenderer,
    propertyRenderer: rendererContextProps.propertyRenderer,
    isDisabled: rendererContextProps.isDisabled,
  };

  return render(
    <PropertyFilterBuilderContext.Provider value={builderContextValue}>
      <PropertyFilterBuilderRuleRenderingContext.Provider
        value={rendererContextValue}
      >
        {component}
      </PropertyFilterBuilderRuleRenderingContext.Provider>
    </PropertyFilterBuilderContext.Provider>
  );
}
