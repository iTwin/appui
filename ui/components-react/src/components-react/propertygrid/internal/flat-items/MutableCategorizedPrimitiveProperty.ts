/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

/** @packageDocumentation
 * @module PropertyGrid
 */
import type { PropertyRecord } from "@itwin/appui-abstract";
import type { IMutableCategorizedPropertyItem } from "./MutableFlatGridItem.js";
import {
  FlatGridItemType,
  MutableCategorizedProperty,
} from "./MutableFlatGridItem.js";

/**
 * Mutable wrapper object for PropertyRecord with primitive valueFormat.
 * @public
 */
export class MutableCategorizedPrimitiveProperty
  extends MutableCategorizedProperty
  implements IMutableCategorizedPropertyItem
{
  public constructor(
    record: PropertyRecord,
    parentSelectionKey: string,
    parentCategorySelectionKey: string,
    depth: number,
    overrideName?: string,
    overrideDisplayLabel?: string
  ) {
    super(
      FlatGridItemType.Primitive,
      record,
      parentSelectionKey,
      parentCategorySelectionKey,
      depth,
      overrideName,
      overrideDisplayLabel
    );
  }

  public get type(): FlatGridItemType.Primitive {
    return FlatGridItemType.Primitive;
  }

  public getChildren(): IMutableCategorizedPropertyItem[] {
    return [];
  }
}
