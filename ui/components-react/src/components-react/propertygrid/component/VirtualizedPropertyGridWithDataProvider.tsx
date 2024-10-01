/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

/** @packageDocumentation
 * @module PropertyGrid
 */

import React, { useEffect, useState } from "react";
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
import { ProgressRadial } from "@itwin/itwinui-react";

/** Properties for [[VirtualizedPropertyGridWithDataProvider]] React component
 * @public
 * @deprecated in 4.17.0. Use `React.ComponentProps<typeof VirtualizedPropertyGridWithDataProvider>`
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
 * sets up default implementations for `IPropertyGridModelSource` and `IPropertyGridEventHandler`
 * @public
 */
export function VirtualizedPropertyGridWithDataProvider(
  /* eslint-disable-next-line deprecation/deprecation */
  props: VirtualizedPropertyGridWithDataProviderProps
) {
  const { modelSource, inProgress } = useTrackedPropertyGridModelSource({
    dataProvider: props.dataProvider,
  });

  const model = usePropertyGridModel({ modelSource });
  const eventHandler = usePropertyGridEventHandler({ modelSource });

  return (
    <DelayedLoaderRenderer shouldRenderLoader={inProgress || !model}>
      {model && (
        <VirtualizedPropertyGrid
          {...props}
          model={model}
          eventHandler={eventHandler}
        />
      )}
    </DelayedLoaderRenderer>
  );
}

interface DelayedLoaderRendererProps {
  shouldRenderLoader: boolean;
}

function DelayedLoaderRenderer({
  children,
  shouldRenderLoader,
}: React.PropsWithChildren<DelayedLoaderRendererProps>) {
  const [showSpinner, setShowSpinner] = useState(shouldRenderLoader);
  useEffect(() => {
    if (!shouldRenderLoader) {
      setShowSpinner(shouldRenderLoader);
      return;
    }

    // only set a timeout when shouldRenderLoader is set to `true`
    const timeout = setTimeout(() => {
      setShowSpinner(shouldRenderLoader);
    }, 250);

    return () => clearTimeout(timeout);
  }, [shouldRenderLoader]);

  return !showSpinner ? (
    <>{children}</>
  ) : (
    <div className="components-virtualized-property-grid-loader">
      <ProgressRadial indeterminate size={"large"} />
    </div>
  );
}
