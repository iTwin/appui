/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

/** @packageDocumentation
 * @module PropertyGrid
 */
import type {
  CategorizedPropertyTypes,
  FlatGridItemType,
} from "./MutableFlatGridItem.js";
import type { PropertyRecord } from "@itwin/appui-abstract";
import type { PropertyCategory } from "../../PropertyDataProvider.js";

/**
 * Base immutable data structure defining common methods and properties for categories and categorized properties
 * @public
 */
export interface FlatGridItemBase {
  readonly isExpanded: boolean;
  readonly key: string;
  readonly selectionKey: string;
  readonly parentSelectionKey: string | undefined;
  readonly parentCategorySelectionKey: string | undefined;
  readonly depth: number;
  readonly label: string;
  readonly type: FlatGridItemType;
  readonly lastInNumberOfCategories: number;
  readonly isLastInRootCategory: boolean;
  getDescendantsAndSelf(): FlatGridItem[];
  getVisibleDescendantsAndSelf(): FlatGridItem[];
  getChildren(): FlatGridItem[];
  getLastVisibleDescendantOrSelf(): FlatGridItem;
}

/**
 * Data structure which describes methods and properties present on immutable [[GridCategoryItem]]
 * @public
 */
export interface GridCategoryItem extends FlatGridItemBase {
  readonly type: FlatGridItemType.Category;
  readonly name: string;
  readonly derivedCategory: PropertyCategory;
}

/**
 * Data structure which describes methods and properties present on immutable [[CategorizedPropertyItem]] objects
 * @public
 */
export interface CategorizedPropertyItem extends FlatGridItemBase {
  readonly type: CategorizedPropertyTypes;
  readonly derivedRecord: PropertyRecord;
  readonly parentCategorySelectionKey: string;
  readonly parentSelectionKey: string;

  getChildren(): CategorizedPropertyItem[];
}

/**
 * Type which describes immutable [[GridCategoryItem]] or [[CategorizedPropertyItem]]
 * @public
 */
export type FlatGridItem = CategorizedPropertyItem | GridCategoryItem;
