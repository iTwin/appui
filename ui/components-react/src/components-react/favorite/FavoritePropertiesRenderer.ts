/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Favorite
 */

import * as React from "react";
import * as ReactDOM from "react-dom";
import type { Orientation } from "@itwin/core-react";
import type { PropertyData } from "../propertygrid/PropertyDataProvider";
import { FavoritePropertyList } from "./FavoritePropertyList";

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

  /**
   * Allow creating an HTMLElement containing the `<FavoritePropertyList />` component so it can be added outside of a React component (`showCard` is the main expected use)
   *
   * Note: When using React18, in order to remove the `ReactDOM.render` warning you will need to provide the `createRoot` function to this function,
   * the parameter type is intentionally simplified to not depend on React18 type.
   *
   * @param propertyData PropertyData containing Favorite records to display.
   * @param orientation Orientation of the items
   * @param createRoot `createRoot` function imported from `import { createRoot } from "react-dom/client";`
   * @returns a `div` HTMLElement with the `<FavoritePropertyList />` rendered within it.
   */
  public renderFavorites(
    propertyData: PropertyData,
    orientation?: Orientation,
    createRoot?: CreateRoot
  ): HTMLElement | string {
    const div = document.createElement("div");
    const element = React.createElement(
      FavoritePropertyList,
      { propertyData, orientation },
      null
    );
    if (createRoot) {
      createRoot(div).render(element);
    } else {
      // eslint-disable-next-line react/no-deprecated, deprecation/deprecation
      ReactDOM.render(element, div);
    }
    return div;
  }
}
