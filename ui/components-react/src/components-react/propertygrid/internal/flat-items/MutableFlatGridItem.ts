/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module PropertyGrid
 */
import { immerable } from "immer";
import type { PropertyDescription } from "@itwin/appui-abstract";
import { PropertyRecord, PropertyValueFormat } from "@itwin/appui-abstract";
import { Guid } from "@itwin/core-bentley";
import type { PropertyCategory } from "../../PropertyDataProvider.js";

/**
 * Types of FlatGridItems for differentiating what property FlatGridItem is wrapping.
 * Category for PropertyCategory
 * (Primitive, Array, Struct) for PropertyRecord with valueFormats: (Primitive, Array, Struct)
 * @public
 */
export enum FlatGridItemType {
  Category,
  Primitive,
  Array,
  Struct,
}

/**
 * Type which extracts FlatGridItemTypes relevant for working with CategorizedProperties
 * @public
 */
export type CategorizedPropertyTypes =
  | FlatGridItemType.Array
  | FlatGridItemType.Primitive
  | FlatGridItemType.Struct;

/**
 * Base mutable data structure defining common methods and properties for both CategorizedProperties and GridCategoryItems
 * @public
 */
export interface IMutableFlatPropertyGridItem {
  readonly type: FlatGridItemType;
  readonly key: string;
  readonly selectionKey: string;
  readonly parentSelectionKey: string | undefined;
  readonly parentCategorySelectionKey: string | undefined;
  readonly depth: number;
  readonly label: string;
  lastInNumberOfCategories: number;
  isLastInRootCategory: boolean;
  isExpanded: boolean;
  getDescendantsAndSelf(): IMutableFlatGridItem[];
  getVisibleDescendantsAndSelf(): IMutableFlatGridItem[];
  getChildren(): IMutableFlatGridItem[];
  getLastVisibleDescendantOrSelf(): IMutableFlatGridItem;
}

/**
 * Base class for all FlatPropertyGrid items
 * @public
 */
export abstract class MutableFlatPropertyGridItem
  implements IMutableFlatPropertyGridItem
{
  public [immerable] = true;

  public readonly key: string = Guid.createValue();
  protected _isExpanded: boolean = false;
  protected _lastInNumberOfCategories: number = 0;
  protected _isLastInRootCategory: boolean = false;

  public constructor(
    private _depth: number,
    private _parentSelectionKey: string | undefined,
    private _parentCategorySelectionKey: string | undefined
  ) {
    if (this._depth < 0) throw new Error("Depth cannot be negative");
  }

  public abstract type: FlatGridItemType;
  public abstract label: string;
  public abstract selectionKey: string;

  public get depth() {
    return this._depth;
  }

  public get parentSelectionKey() {
    return this._parentSelectionKey;
  }

  public get parentCategorySelectionKey() {
    return this._parentCategorySelectionKey;
  }

  public get isExpanded() {
    return this._isExpanded;
  }

  public set isExpanded(value: boolean) {
    this._isExpanded = value;
  }

  public abstract getChildren(): IMutableFlatGridItem[];
  public abstract getSelf(): IMutableFlatGridItem;

  protected getDescendants() {
    const descendants: IMutableFlatGridItem[] = [];
    this.getChildren().forEach((child) =>
      descendants.push(...child.getDescendantsAndSelf())
    );

    return descendants;
  }

  /**
   * Gets a flat list of all FlatGridItems beneath this flat grid item including itself in depth first visiting order.
   */
  public getDescendantsAndSelf(): IMutableFlatGridItem[] {
    return [this.getSelf(), ...this.getDescendants()];
  }

  /**
   * Gets a flat list of visible FlatGridItems beneath this flat grid item.
   */
  public getVisibleDescendants(): IMutableFlatGridItem[] {
    const descendants: IMutableFlatGridItem[] = [];
    if (this.isExpanded)
      this.getChildren().forEach((child) =>
        descendants.push(...child.getVisibleDescendantsAndSelf())
      );
    return descendants;
  }

  /**
   * Gets a flat list of visible FlatGridItems beneath this flat grid item and itself in depth first visiting order.
   */
  public getVisibleDescendantsAndSelf(): IMutableFlatGridItem[] {
    return [this.getSelf(), ...this.getVisibleDescendants()];
  }

  /**
   * @returns self if item is not expanded, last visible descendant of this item otherwise.
   */
  public getLastVisibleDescendantOrSelf(): IMutableFlatGridItem {
    if (!this.isExpanded) return this.getSelf();

    const children = this.getChildren();
    if (children.length < 1) return this.getSelf();

    return children[children.length - 1].getLastVisibleDescendantOrSelf();
  }

  /**
   * Sets lastInNumberOfCategories value and sends it down to this items last child
   * @internal
   */
  public get lastInNumberOfCategories(): number {
    if (this.isExpanded && this.getChildren().length > 0) return 0;

    return this._lastInNumberOfCategories;
  }

  public set lastInNumberOfCategories(value: number) {
    this._lastInNumberOfCategories = value;
    const children = this.getChildren();
    if (children.length < 1) return;

    children[children.length - 1].lastInNumberOfCategories = value;
  }

  /**
   * Gets and sets isLastInRootCategory value and sends it down to this items last child
   * @internal
   */
  public get isLastInRootCategory(): boolean {
    if (this.isExpanded && this.getChildren().length > 0) return false;

    return this._isLastInRootCategory;
  }

  public set isLastInRootCategory(value: boolean) {
    this._isLastInRootCategory = value;
    const children = this.getChildren();
    if (children.length < 1) return;

    children[children.length - 1].isLastInRootCategory = value;
  }
}

/**
 * Data structure which describes methods and properties to be held by Mutable GridCategoryItems
 * @public
 */
export interface IMutableGridCategoryItem extends IMutableFlatPropertyGridItem {
  type: FlatGridItemType.Category;
  name: string;
  derivedCategory: PropertyCategory;
  isRootCategory: boolean;
}

/**
 * Data structure which describes methods and properties to be held by Mutable CategorizedPropertyItems
 * @public
 */
export interface IMutableCategorizedPropertyItem
  extends IMutableFlatPropertyGridItem {
  readonly type: CategorizedPropertyTypes;
  readonly derivedRecord: PropertyRecord;
  readonly parentCategorySelectionKey: string;
  readonly parentSelectionKey: string;

  getChildren(): IMutableCategorizedPropertyItem[];
}

/**
 * Type which describes mutable GridCategoryItem or CategorizedProperty
 * @public
 */
export type IMutableFlatGridItem =
  | IMutableCategorizedPropertyItem
  | IMutableGridCategoryItem;

/**
 * Base class for all Mutable CategorizedProperties
 * @public
 */
export abstract class MutableCategorizedProperty
  extends MutableFlatPropertyGridItem
  implements Partial<IMutableCategorizedPropertyItem>
{
  private _derivedRecord: PropertyRecord;
  private _selectionKey: string;

  public constructor(
    type: CategorizedPropertyTypes,
    record: PropertyRecord,
    parentSelectionKey: string,
    parentCategorySelectionKey: string,
    depth: number,
    overrideName?: string,
    overrideDisplayLabel?: string
  ) {
    super(depth, parentSelectionKey, parentCategorySelectionKey);

    const recordType = this.valueTypeToFlatGridType(record.value.valueFormat);
    if (recordType !== type) {
      const expectedTypeStr = FlatGridItemType[type];
      const actualTypeStr = FlatGridItemType[recordType];
      throw Error(
        `Record with incorrect value format passed to property: expected ${expectedTypeStr}, got ${actualTypeStr}`
      );
    }

    const overriddenProperty = this.makeOverriddenProperty(
      record.property,
      overrideName,
      overrideDisplayLabel
    );
    this._derivedRecord = this.makeDerivedRecord(record, overriddenProperty);

    this._selectionKey = `${this.parentSelectionKey}_${this.derivedRecord.property.name}`;
    this._isExpanded = !!record.autoExpand;
  }

  public abstract override type: CategorizedPropertyTypes;
  public abstract override getChildren(): IMutableCategorizedPropertyItem[];

  /**
   * Maps PropertyRecord valueFormat to FlatGridItemType
   * @param valueType valueFormat to map
   * @returns mapped FlatGridItemType
   */
  private valueTypeToFlatGridType(valueType: PropertyValueFormat) {
    switch (valueType) {
      case PropertyValueFormat.Primitive:
        return FlatGridItemType.Primitive;
      case PropertyValueFormat.Array:
        return FlatGridItemType.Array;
      case PropertyValueFormat.Struct:
        return FlatGridItemType.Struct;

      default:
        const unhandledType: never = valueType;
        throw Error(
          `Property Value Format not handled: ${String(unhandledType)}`
        );
    }
  }

  /**
   * Make new property description with overridden fields.
   * @param propertyDescription property description to override.
   * @param overrideName property description name to override.
   * @param overrideDisplay  property description display name to override.
   */
  private makeOverriddenProperty(
    propertyDescription: PropertyDescription,
    overrideName?: string,
    overrideDisplay?: string
  ): PropertyDescription {
    const { name, displayLabel, ...property } = { ...propertyDescription };
    const newName = overrideName ?? name;
    const newDisplayLabel = overrideDisplay ?? displayLabel;

    return { ...property, name: newName, displayLabel: newDisplayLabel };
  }

  /**
   * Gets derived property record that has it's property description field overridden
   */
  private makeDerivedRecord(
    record: PropertyRecord,
    overriddenPropertyDescription: PropertyDescription
  ) {
    const { value, property, ...others } = record;
    const newRecord = new PropertyRecord(value, overriddenPropertyDescription);

    return Object.assign(newRecord, others);
  }

  public getSelf(): IMutableCategorizedPropertyItem {
    return this;
  }

  public override get parentCategorySelectionKey() {
    return super.parentCategorySelectionKey!;
  }

  public override get parentSelectionKey() {
    return super.parentSelectionKey!;
  }

  /**
   * Unique selection key made of parent selectionKey and this property name.
   */
  public get selectionKey() {
    return this._selectionKey;
  }

  public get label() {
    return this._derivedRecord.property.displayLabel;
  }

  /**
   * Record with overridden property description.
   */
  public get derivedRecord() {
    return this._derivedRecord;
  }
}
