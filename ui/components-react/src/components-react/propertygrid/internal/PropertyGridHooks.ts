/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module PropertyGrid
 */

import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { useDebouncedAsyncValue } from "../../common/UseDebouncedAsyncValue";
import type { IPropertyDataProvider } from "../PropertyDataProvider";
import { MutableGridItemFactory } from "./flat-items/MutableGridItemFactory";
import { PropertyGridEventHandler } from "./PropertyGridEventHandler";
import type { IPropertyGridModel } from "./PropertyGridModel";
import type { IPropertyGridModelSource } from "./PropertyGridModelSource";
import { PropertyGridModelSource } from "./PropertyGridModelSource";

/**
 * Custom hook that gets [[PropertyData]] from given [[IPropertyDataProvider]] and subscribes to further data changes.
 * @throws if/when `IPropertyDataProvider.getData()` promise is rejected. The error is thrown in the React's render loop, so it can be caught using an error boundary.
 * @public
 */
export function usePropertyData(props: {
  dataProvider: IPropertyDataProvider;
}) {
  const { dataProvider } = props;

  const [forcedUpdate, triggerForcedUpdate] = useReducer(() => ({}), {});
  useEffect(() => {
    return dataProvider.onDataChanged.addListener(() => {
      triggerForcedUpdate();
    });
  }, [dataProvider]);

  // forcedUpdate is added to dependency list to re-memo getData promise when onDataChanged emits an event.
  return useDebouncedAsyncValue(
    useCallback(
      async () => dataProvider.getData(),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [dataProvider, forcedUpdate]
    )
  );
}

/**
 * Custom hook that creates a [[PropertyGridModelSource]] and subscribes it to data updates from the data provider.
 * @throws if/when `IPropertyDataProvider.getData()` promise is rejected. The error is thrown in the React's render loop, so it can be caught using an error boundary.
 * @public
 * @deprecated in 4.9.0. Use `useTrackedPropertyGridModelSource` instead.
 */
export function usePropertyGridModelSource(props: {
  dataProvider: IPropertyDataProvider;
}) {
  const { value: propertyData } = usePropertyData(props);
  const { dataProvider } = { ...props };

  // Model source needs to be recreated if data provider changes
  const modelSource = useMemo(
    () => new PropertyGridModelSource(new MutableGridItemFactory()),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dataProvider]
  );

  useEffect(() => {
    if (propertyData) modelSource.setPropertyData(propertyData);
  }, [modelSource, propertyData]);

  return modelSource;
}

/**
 * Custom hook that creates a [[PropertyGridModelSource]] and subscribes it to data updates from the data provider while also providing information on data update progress.
 * @throws if/when `IPropertyDataProvider.getData()` promise is rejected. The error is thrown in the React's render loop, so it can be caught using an error boundary.
 * @public
 */
export function useTrackedPropertyGridModelSource(props: {
  dataProvider: IPropertyDataProvider;
}) {
  const { value: propertyData, inProgress } = usePropertyData(props);
  const { dataProvider } = { ...props };

  // Model source needs to be recreated if data provider changes
  const modelSource = useMemo(
    () => new PropertyGridModelSource(new MutableGridItemFactory()),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dataProvider]
  );

  useEffect(() => {
    if (propertyData) modelSource.setPropertyData(propertyData);
  }, [modelSource, propertyData]);

  return { modelSource, inProgress };
}

/**
 * Custom hook that creates memoized version of [[PropertyGridEventHandler]] that modifies given modelSource
 * @public
 */
export function usePropertyGridEventHandler(props: {
  modelSource: IPropertyGridModelSource;
}) {
  return useMemo(
    () => new PropertyGridEventHandler(props.modelSource),
    [props.modelSource]
  );
}

/**
 * Custom hook that automatically listens and retrieves latest model from model source
 * @public
 */
export function usePropertyGridModel(props: {
  modelSource: IPropertyGridModelSource;
}) {
  const { modelSource } = { ...props };
  const [model, setModel] = useState<IPropertyGridModel>();

  useEffect(() => {
    const modelChanged = () => {
      setModel(modelSource.getModel());
    };
    modelChanged();
    return modelSource.onModelChanged.addListener(modelChanged);
  }, [modelSource]);

  return model;
}
