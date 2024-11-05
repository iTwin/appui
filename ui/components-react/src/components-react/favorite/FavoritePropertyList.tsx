/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Favorite
 */

import * as React from "react";
import { ResizableContainerObserver } from "@itwin/core-react";
import { PropertyValueRendererManager } from "../properties/ValueRendererManager.js";
import { PropertyList } from "../propertygrid/component/PropertyList.js";
import type { PropertyData } from "../propertygrid/PropertyDataProvider.js";
import { Orientation } from "../common/Orientation.js";

/** Properties for [[FavoritePropertyList]] React component
 * @alpha
 * @deprecated in 4.17.0. Use `React.ComponentProps<typeof FavoritePropertyList>`
 */
export interface FavoritePropertyListProps {
  propertyData: PropertyData;
  propertyValueRendererManager?: PropertyValueRendererManager;
  orientation?: Orientation;
}

/** Favorite Property List React component
 * @alpha
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
export function FavoritePropertyList(props: FavoritePropertyListProps) {
  const [listWidth, setListWidth] = React.useState<number | undefined>();
  const onListResize = React.useCallback(setListWidth, [setListWidth]);
  if (props.propertyData.records.Favorite !== undefined) {
    const propertyValueRendererManager =
      props.propertyValueRendererManager ??
      PropertyValueRendererManager.defaultManager;
    const orientation = props.orientation ?? Orientation.Horizontal;
    return (
      <div className="components-favorite-property-list">
        {/* eslint-disable-next-line @typescript-eslint/no-deprecated */}
        <ResizableContainerObserver onResize={onListResize} />
        {listWidth ? (
          <PropertyList
            orientation={orientation}
            width={listWidth}
            properties={props.propertyData.records.Favorite}
            columnRatio={1 / 3}
            propertyValueRendererManager={propertyValueRendererManager}
          />
        ) : null}
      </div>
    );
  }
  return null;
}
