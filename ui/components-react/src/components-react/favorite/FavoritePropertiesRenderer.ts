/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Favorite
 */

import * as React from "react";
import { createRoot } from "react-dom/client";
import type { PropertyData } from "../propertygrid/PropertyDataProvider.js";
import { FavoritePropertyList } from "./FavoritePropertyList.js";
import type { Orientation } from "../common/Orientation.js";

/**
 * Basic recreation of the `createRoot` function type, intentionally not exported.
 */
type CreateRoot = (container: Element | DocumentFragment) => {
  render(children: React.ReactNode): void;
};

/** Renderer for Favorite Property List
 * @public
 */
export class FavoritePropertiesRenderer {
  /**
   * Evaluates if a PropertyData contain Favorite records.
   * @param propertyData PropertyData containing records
   * @returns true if it contains Favorite records
   */
  public hasFavorites(propertyData: PropertyData): boolean {
    return propertyData.records.Favorite !== undefined;
  }

  /** Allow creating an HTMLElement containing the `<FavoritePropertyList />` component so it can be added outside of a React component (`showCard` is the main expected use)
   * @param propertyData PropertyData containing Favorite records to display.
   * @param orientation Orientation of the items
   * @returns a `div` HTMLElement with the `<FavoritePropertyList />` rendered within it.
   */
  public renderFavorites(
    propertyData: PropertyData,
    orientation?: Orientation
  ): HTMLElement | string;
  /** Allow creating an HTMLElement containing the `<FavoritePropertyList />` component so it can be added outside of a React component (`showCard` is the main expected use)
   * @note Previously when using React18, in order to remove the `ReactDOM.render` warning you needed to provide the `createRoot` function. This function is no longer used.
   * @param propertyData PropertyData containing Favorite records to display.
   * @param orientation Orientation of the items
   * @param createRoot `createRoot` function imported from `import { createRoot } from "react-dom/client";`
   * @returns a `div` HTMLElement with the `<FavoritePropertyList />` rendered within it.
   * @deprecated in 5.0.0. Use the overload without `createRoot` parameter instead.
   */
  public renderFavorites(
    propertyData: PropertyData,
    orientation?: Orientation,
    // eslint-disable-next-line @typescript-eslint/unified-signatures
    _createRoot?: CreateRoot
  ): HTMLElement | string;
  public renderFavorites(
    propertyData: PropertyData,
    orientation?: Orientation,
    _createRoot?: CreateRoot
  ): HTMLElement | string {
    const div = document.createElement("div");
    const element = React.createElement(
      FavoritePropertyList,
      { propertyData, orientation },
      null
    );
    const root = createRoot(div);
    root.render(element);
    return div;
  }
}
