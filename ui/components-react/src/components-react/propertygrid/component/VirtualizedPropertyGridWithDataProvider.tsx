/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

/** @packageDocumentation
 * @module PropertyGrid
 */

import React, { useEffect, useState } from "react";
import { DelayedSpinner } from "../../common/DelayedSpinner";
import {
  usePropertyGridEventHandler,
  usePropertyGridModel,
  useTrackedPropertyGridModelSource,
} from "../internal/PropertyGridHooks";
import type { PropertyCategoryRendererManager } from "../PropertyCategoryRendererManager";
import type { IPropertyDataProvider } from "../PropertyDataProvider";
import type {
  CommonPropertyGridProps,
  PropertyGridContentHighlightProps,
} from "./PropertyGridCommons";
import { VirtualizedPropertyGrid } from "./VirtualizedPropertyGrid";

/** Properties for [[VirtualizedPropertyGridWithDataProvider]] React component
 * @public
 */
export interface VirtualizedPropertyGridWithDataProviderProps
  extends CommonPropertyGridProps {
  /** Property data provider used by the property grid */
  dataProvider: IPropertyDataProvider;
  /** Properties for highlighting property data in the grid. */
  highlight?: PropertyGridContentHighlightProps;
  /** Custom property category renderer manager. Defaults to [[PropertyCategoryRendererManager.defaultManager]]. */
  propertyCategoryRendererManager?: PropertyCategoryRendererManager;
  /** Width of the property grid component. */
  width: number;
  /** Height of the property grid component. */
  height: number;
}

/**
 * [[VirtualizedPropertyGrid]] React Component which takes a data provider and
 * sets up default implementations for [[IPropertyGridModelSource]] and [[IPropertyGridEventHandler]]
 * @public
 */
export function VirtualizedPropertyGridWithDataProvider(
  props: VirtualizedPropertyGridWithDataProviderProps
) {
  const [showSpinner, setShowSpinner] = useState(false);

  const { modelSource, inProgress } = useTrackedPropertyGridModelSource({
    dataProvider: props.dataProvider,
  });

  const model = usePropertyGridModel({ modelSource });
  const eventHandler = usePropertyGridEventHandler({ modelSource });
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowSpinner(inProgress);
    }, 150);

    return () => clearTimeout(timeout);
  }, [inProgress, model]);

  return (
    <>
      {showSpinner || !model ? (
        <div className="components-virtualized-property-grid-loader">
          <DelayedSpinner size="large" />
        </div>
      ) : (
        <VirtualizedPropertyGrid
          {...props}
          model={model}
          eventHandler={eventHandler}
        />
      )}
    </>
  );
}
