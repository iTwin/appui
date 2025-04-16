/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { PropertyRecord, PropertyValueFormat } from "@itwin/appui-abstract";
import { Guid } from "@itwin/core-bentley";
import type {
  CategorizedPropertyTypes,
  IMutableCategorizedPropertyItem,
  IMutableFlatGridItem,
  IMutableGridCategoryItem,
} from "../../../../../components-react/propertygrid/internal/flat-items/MutableFlatGridItem.js";
import { FlatGridItemType } from "../../../../../components-react/propertygrid/internal/flat-items/MutableFlatGridItem.js";
import type { CategoryRecordsDict } from "../../../../../components-react/propertygrid/internal/flat-items/MutableGridCategory.js";
import type { MutableGridCategory } from "../../../../../components-react/propertygrid/internal/flat-items/MutableGridCategory.js";
import type { MutableCategorizedPrimitiveProperty } from "../../../../../components-react/propertygrid/internal/flat-items/MutableCategorizedPrimitiveProperty.js";
import type { MutableCategorizedArrayProperty } from "../../../../../components-react/propertygrid/internal/flat-items/MutableCategorizedArrayProperty.js";
import type { MutableCategorizedStructProperty } from "../../../../../components-react/propertygrid/internal/flat-items/MutableCategorizedStructProperty.js";
import type { MutableGridItemFactory } from "../../../../../components-react/propertygrid/internal/flat-items/MutableGridItemFactory.js";
import type {
  CategorizedPropertyItem,
  FlatGridItem,
  GridCategoryItem,
} from "../../../../../components-react/propertygrid/internal/flat-items/FlatGridItem.js";
import type {
  PropertyCategory,
  PropertyData,
} from "../../../../../components-react/propertygrid/PropertyDataProvider.js";
import type { IPropertyGridModel } from "../../../../../components-react/propertygrid/internal/PropertyGridModel.js";

/** @internal */
export interface GridModelLastItemData {
  [selectionKey: string]: {
    isLastInRootCategory: boolean;
    lastInNumberOfCategories: number;
  };
}

/** @internal */
export interface PropertyGridModelTestData {
  testName: string;
  propertyData: PropertyData;
  expectedLastItemData: GridModelLastItemData;
}

/** @internal */
export interface GridItemToMock {
  type: CategorizedPropertyTypes;
  isVisible: boolean;
}

/** @internal */
export interface FlattenedPropertyBase {
  selectionKey: string;
}

/** @internal */
export interface FlattenedRecord extends FlattenedPropertyBase {
  item: PropertyRecord;
  originalRecord: PropertyRecord;
}

/** @internal */
export interface FlattenedCategory extends FlattenedPropertyBase {
  item: PropertyCategory;
}

/** @internal */
export type FlattenedProperty = FlattenedRecord | FlattenedCategory;

/** @internal */
export class FlatGridTestUtils {
  public static getSelectionKey(
    property: PropertyCategory,
    parentSelectionKey?: string
  ): string;
  public static getSelectionKey(
    property: PropertyRecord,
    parentSelectionKey: string
  ): string;
  public static getSelectionKey(
    property: PropertyCategory | PropertyRecord,
    parentSelectionKey?: string
  ): string {
    if (property instanceof PropertyRecord)
      return `${parentSelectionKey}_${property.property.name}`;

    return parentSelectionKey
      ? `${parentSelectionKey}_${property.name}`
      : property.name;
  }

  public static flattenPropertyRecords(
    propertyRecords: PropertyRecord[],
    parentSelectionKey: string,
    considerExpand: boolean = false,
    isParentArray: boolean = false
  ) {
    const results: FlattenedRecord[] = [];

    propertyRecords.forEach((record, index) => {
      const itemToSave: FlattenedRecord = {
        item: record,
        selectionKey: this.getSelectionKey(record, parentSelectionKey),
        originalRecord: record,
      };
      if (isParentArray) {
        const name = `${record.property.name}_${index}`;
        const displayLabel = `[${index + 1}]`;

        itemToSave.item = this.overridePropertyDescription(
          record,
          name,
          displayLabel
        );
        itemToSave.selectionKey = this.getSelectionKey(
          itemToSave.item,
          parentSelectionKey
        );
      }

      results.push(itemToSave);

      if (!considerExpand || record.autoExpand)
        results.push(
          ...this.flattenPropertyRecords(
            record.getChildrenRecords(),
            itemToSave.selectionKey,
            considerExpand,
            record.value.valueFormat === PropertyValueFormat.Array
          )
        );
    });

    return results;
  }

  public static flattenPropertyCategories(
    propertyCategories: PropertyCategory[],
    records: CategoryRecordsDict,
    considerExpand: boolean = false,
    parentSelectionKey?: string
  ) {
    const results: FlattenedProperty[] = [];
    propertyCategories.forEach((category) => {
      const selectionKey = this.getSelectionKey(category, parentSelectionKey);
      results.push({ item: category, selectionKey });

      if (!considerExpand || category.expand) {
        const categoryRecords = records[category.name] ?? [];
        results.push(
          ...this.flattenPropertyRecords(
            categoryRecords,
            selectionKey,
            considerExpand
          )
        );

        results.push(
          ...this.flattenPropertyCategories(
            category.childCategories ?? [],
            records,
            considerExpand,
            selectionKey
          )
        );
      }
    });

    return results;
  }

  public static overridePropertyDescription(
    propertyRecord: PropertyRecord,
    name?: string,
    displayLabel?: string
  ) {
    name = name ?? propertyRecord.property.name;
    displayLabel = displayLabel ?? propertyRecord.property.displayLabel;
    const propertyDescription = {
      ...propertyRecord.property,
      name,
      displayLabel,
    };

    const { value, property, ...others } = propertyRecord;
    propertyRecord = new PropertyRecord(value, propertyDescription);

    Object.assign(propertyRecord, others);

    return propertyRecord;
  }

  public static filterCategories(gridItems: IMutableFlatGridItem[]) {
    return gridItems.filter((item) => item.type === FlatGridItemType.Category);
  }

  public static filterProperties(gridItems: IMutableFlatGridItem[]) {
    return gridItems.filter((item) => item.type !== FlatGridItemType.Category);
  }

  public static constructCategoryRecordsDict(
    categories: PropertyCategory[],
    recordsDict?: CategoryRecordsDict
  ) {
    recordsDict = recordsDict ?? {};

    for (const category of categories) {
      recordsDict[category.name] = [];
      this.constructCategoryRecordsDict(
        category.childCategories ?? [],
        recordsDict
      );
    }

    return recordsDict;
  }

  public static valueTypeToFlatGridType(valueType: PropertyValueFormat) {
    switch (valueType) {
      case PropertyValueFormat.Primitive:
        return FlatGridItemType.Primitive;
      case PropertyValueFormat.Array:
        return FlatGridItemType.Array;
      case PropertyValueFormat.Struct:
        return FlatGridItemType.Struct;

      default:
        const unhandledType: never = valueType;
        throw Error(`Property Value Format not handled: ${unhandledType}`);
    }
  }

  public static callPropertyAndGridItemAssert(
    gridItem: IMutableFlatGridItem,
    record: PropertyCategory | PropertyRecord,
    categoryAssert: (
      item: IMutableGridCategoryItem,
      record: PropertyCategory
    ) => void,
    categorizedPropertyAssert: (
      item: IMutableCategorizedPropertyItem,
      record: PropertyRecord
    ) => void
  ) {
    if (gridItem.type === FlatGridItemType.Category) {
      categoryAssert(gridItem, record as PropertyCategory);
      return;
    }

    categorizedPropertyAssert(gridItem, record as PropertyRecord);
  }

  public static callPropertyAndGridItemAsserts(
    gridItems: IMutableFlatGridItem[],
    records: Array<PropertyCategory | PropertyRecord>,
    categoryAssert: (
      item: IMutableGridCategoryItem,
      record: PropertyCategory
    ) => void,
    categorizedPropertyAssert: (
      item: IMutableCategorizedPropertyItem,
      record: PropertyRecord
    ) => void
  ) {
    expect(gridItems.length).toEqual(records.length);
    gridItems.forEach((item, index) =>
      FlatGridTestUtils.callPropertyAndGridItemAssert(
        item,
        records[index],
        categoryAssert,
        categorizedPropertyAssert
      )
    );
  }

  private static replaceMockGridItemProperties(
    mockItem: IMutableFlatGridItem,
    type: FlatGridItemType,
    selectionKey: string,
    isExpanded?: boolean
  ) {
    Object.assign(mockItem, {
      key: Guid.createValue(),
      type: mockItem.type ?? {},
      isExpanded: mockItem.isExpanded ?? {},
      selectionKey: mockItem.selectionKey ?? {},
      getChildren: mockItem.getChildren ?? vi.fn(),
    });

    vi.spyOn(mockItem, "type", "get").mockImplementation(() => type);
    if (isExpanded !== undefined)
      vi.spyOn(mockItem, "isExpanded", "get").mockImplementation(
        () => isExpanded
      );

    vi.spyOn(mockItem, "selectionKey", "get").mockImplementation(
      () => selectionKey
    );
    vi.spyOn(mockItem, "getChildren").mockReturnValue([]);
  }

  public static createMockGridCategory(name: string, isExpanded?: boolean) {
    const gridCategory = {
      name: "",
      derivedCategory: {},
    } as MutableGridCategory;
    vi.spyOn(gridCategory, "name", "get").mockImplementation(() => name);

    this.replaceMockGridItemProperties(
      gridCategory,
      FlatGridItemType.Category,
      name,
      isExpanded
    );
    return gridCategory;
  }

  public static createMockCategorizedPrimitive(selectionKey: string) {
    const primitive = {} as MutableCategorizedPrimitiveProperty;
    this.replaceMockGridItemProperties(
      primitive,
      FlatGridItemType.Primitive,
      selectionKey,
      false
    );

    return primitive;
  }

  public static createMockCategorizedArray(
    selectionKey: string,
    isExpanded?: boolean
  ) {
    const array = {} as MutableCategorizedArrayProperty;
    this.replaceMockGridItemProperties(
      array,
      FlatGridItemType.Array,
      selectionKey,
      isExpanded
    );

    return array;
  }

  public static createMockCategorizedStruct(
    selectionKey: string,
    isExpanded?: boolean
  ) {
    const struct = {} as MutableCategorizedStructProperty;
    this.replaceMockGridItemProperties(
      struct,
      FlatGridItemType.Struct,
      selectionKey,
      isExpanded
    );

    return struct;
  }

  public static createMockCategorizedProperty(
    selectionKey: string,
    type: CategorizedPropertyTypes,
    isExpanded?: boolean
  ) {
    switch (type) {
      case FlatGridItemType.Primitive:
        return this.createMockCategorizedPrimitive(selectionKey);
      case FlatGridItemType.Array:
        return this.createMockCategorizedArray(selectionKey, isExpanded);
      case FlatGridItemType.Struct:
        return this.createMockCategorizedStruct(selectionKey, isExpanded);

      default:
        const unhandledType: never = type;
        throw new Error(`Unhandled FlatGridItemType: ${unhandledType}`);
    }
  }

  public static createCategorizedPropertyStub(
    records: PropertyRecord[],
    factoryStub: MutableGridItemFactory
  ) {
    const expectedMockChildren: Array<IMutableCategorizedPropertyItem> = [];
    records.forEach((child) => {
      const gridType = this.valueTypeToFlatGridType(child.value.valueFormat);
      const mock = this.createMockCategorizedProperty(
        `testKey-${gridType}`,
        gridType
      );

      expectedMockChildren.push(mock);
    });
    let callIndex = -1;
    vi.spyOn(factoryStub, "createCategorizedProperty").mockImplementation(
      () => {
        callIndex = ++callIndex;
        return expectedMockChildren[callIndex];
      }
    );
    return expectedMockChildren;
  }

  public static createGridCategoryStub(
    category: PropertyCategory,
    factoryStub: MutableGridItemFactory
  ) {
    const children = category.childCategories ?? [];
    const expectedMockChildren: Array<IMutableGridCategoryItem> = [];

    children.forEach((child) => {
      const mock = FlatGridTestUtils.createMockGridCategory(child.name);
      expectedMockChildren.push(mock);
    });

    let callIndex = -1;
    vi.spyOn(factoryStub, "createGridCategory").mockImplementation(() => {
      callIndex = ++callIndex;
      return expectedMockChildren[callIndex];
    });
    return expectedMockChildren;
  }

  public static getLast<T>(arr: T[]) {
    if (arr.length === 0) return undefined;

    return arr[arr.length - 1];
  }

  private static mockGetVisibleDescendants(
    property: IMutableFlatGridItem,
    descendantsToMock: GridItemToMock[]
  ) {
    const visibleDescendants = descendantsToMock
      .filter((value) => value.isVisible)
      .map((value) =>
        FlatGridTestUtils.createMockCategorizedProperty(
          `testKey-${value.type}`,
          value.type,
          false
        )
      );

    const visibleDescendantsAndSelf = [property, ...visibleDescendants];
    Object.assign(property, {
      getVisibleDescendantsAndSelf:
        property.getVisibleDescendantsAndSelf ?? vi.fn(),
    });
    vi.spyOn(property, "getVisibleDescendantsAndSelf").mockImplementation(
      () => visibleDescendantsAndSelf
    );

    return visibleDescendantsAndSelf;
  }

  private static mockGetDescendants(
    property: IMutableFlatGridItem,
    descendantsToMock: GridItemToMock[],
    visibleDescendantsAndSelf: IMutableFlatGridItem[]
  ) {
    const nonVisibleDescendants = descendantsToMock
      .filter((value) => !value.isVisible)
      .map((value) =>
        FlatGridTestUtils.createMockCategorizedProperty(
          `testKey-${value.type}`,
          value.type,
          false
        )
      );

    const descendantsAndSelf = [
      ...visibleDescendantsAndSelf,
      ...nonVisibleDescendants,
    ];
    Object.assign(property, {
      getDescendantsAndSelf: property.getDescendantsAndSelf ?? vi.fn(),
    });
    vi.spyOn(property, "getDescendantsAndSelf").mockImplementation(
      () => descendantsAndSelf
    );

    return descendantsAndSelf;
  }

  public static setupExpectedDescendants(
    mockChildren: IMutableFlatGridItem[],
    descendantsToMock: GridItemToMock[]
  ) {
    const expectedVisibleDescendants: IMutableFlatGridItem[] = [];
    const expectedDescendants: IMutableFlatGridItem[] = [];
    let expectedLastVisibleDescendant: IMutableFlatGridItem | undefined;

    mockChildren.forEach((child) => {
      const visibleDescendantsAndSelf =
        FlatGridTestUtils.mockGetVisibleDescendants(child, descendantsToMock);
      expectedVisibleDescendants.push(...visibleDescendantsAndSelf);

      expectedLastVisibleDescendant = FlatGridTestUtils.getLast(
        visibleDescendantsAndSelf
      );
      Object.assign(child, {
        getLastVisibleDescendantOrSelf:
          child.getLastVisibleDescendantOrSelf ?? vi.fn(),
      });
      vi.spyOn(child, "getLastVisibleDescendantOrSelf").mockImplementation(
        () => expectedLastVisibleDescendant!
      );

      const descendantsAndSelf = FlatGridTestUtils.mockGetDescendants(
        child,
        descendantsToMock,
        visibleDescendantsAndSelf
      );
      expectedDescendants.push(...descendantsAndSelf);
    });

    return {
      expectedVisibleDescendants,
      expectedDescendants,
      expectedLastVisibleDescendant,
    };
  }

  public static assertPropertyEquals(
    gridItem: IMutableCategorizedPropertyItem,
    expectedRecord: PropertyRecord,
    overrideName?: string,
    overrideLabel?: string
  ) {
    expectedRecord = FlatGridTestUtils.overridePropertyDescription(
      expectedRecord,
      overrideName,
      overrideLabel
    );

    const expectedType = FlatGridTestUtils.valueTypeToFlatGridType(
      expectedRecord.value.valueFormat
    );
    expect(gridItem.type).toEqual(expectedType);

    expect(gridItem.label).toEqual(expectedRecord.property.displayLabel);
    expect(gridItem.derivedRecord).to.deep.equal(expectedRecord);

    expect(gridItem.selectionKey).toEqual(
      FlatGridTestUtils.getSelectionKey(
        expectedRecord,
        gridItem.parentSelectionKey
      )
    );
  }

  public static assertCategoryEquals(
    gridCategory: GridCategoryItem,
    propertyCategory: PropertyCategory
  ) {
    expect(gridCategory.type).toEqual(FlatGridItemType.Category);
    expect(gridCategory.name).toEqual(propertyCategory.name);
    expect(gridCategory.label).toEqual(propertyCategory.label);

    expect(gridCategory.derivedCategory.name).toEqual(propertyCategory.name);
    expect(gridCategory.derivedCategory.label).toEqual(propertyCategory.label);

    expect(gridCategory.selectionKey).toEqual(
      FlatGridTestUtils.getSelectionKey(
        propertyCategory,
        gridCategory.parentCategorySelectionKey
      )
    );
  }

  public static getFlattenedPropertyData(
    propertyData: PropertyData,
    considerExpand: boolean = false
  ) {
    return FlatGridTestUtils.flattenPropertyCategories(
      propertyData.categories,
      propertyData.records,
      considerExpand
    );
  }

  public static assertGridModel(
    gridModel: IPropertyGridModel,
    expectedFlatGrid: FlattenedProperty[],
    lastItemData?: GridModelLastItemData
  ) {
    expectedFlatGrid.forEach((expectedProperty) => {
      const gridItem = gridModel.getItem(expectedProperty.selectionKey);
      this.assertGridItem(gridItem, expectedProperty);

      if (lastItemData) {
        const expectedLastItemData = lastItemData[gridItem.selectionKey] ?? {
          isLastInRootCategory: false,
          lastInNumberOfCategories: 0,
        };

        expect(
          gridItem.lastInNumberOfCategories,
          `lastInNumberOfCategories does not match: ${gridItem.selectionKey}`
        ).toEqual(expectedLastItemData.lastInNumberOfCategories);
        expect(
          gridItem.isLastInRootCategory,
          `isLastInRootCategory does not match: ${gridItem.selectionKey}`
        ).toEqual(expectedLastItemData.isLastInRootCategory);
      }
    });
  }

  public static assertGridItem(
    gridItem: FlatGridItem,
    expectedProperty: FlattenedProperty
  ) {
    expect(gridItem.selectionKey, "Selection keys do not match").toEqual(
      expectedProperty.selectionKey
    );

    if (expectedProperty.item instanceof PropertyRecord) {
      const expectedType = FlatGridTestUtils.valueTypeToFlatGridType(
        expectedProperty.item.value.valueFormat
      );

      expect(gridItem.type).toEqual(expectedType);

      const property = gridItem as CategorizedPropertyItem;
      expect(property.derivedRecord).to.deep.equal(
        expectedProperty.item,
        `Derived record and expected record do not match`
      );
    } else {
      expect(gridItem.type).toEqual(FlatGridItemType.Category);

      const category = gridItem as GridCategoryItem;
      const expectedCategory = {
        name: expectedProperty.item.name,
        label: expectedProperty.item.label,
        expand: expectedProperty.item.expand,
      };
      expect(category.derivedCategory).to.deep.equal(
        expectedCategory,
        "Derived category and expected category do not match"
      );
    }
  }
}
