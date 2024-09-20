/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module PropertyGrid
 */

import { PropertyRecord } from "@itwin/appui-abstract";
import type {
  IPropertyDataProvider,
  PropertyCategory,
  PropertyData,
} from "./PropertyDataProvider";
import { PropertyDataChangeEvent } from "./PropertyDataProvider";
import { UiComponents } from "../UiComponents";

const SOURCE_PROVIDER_KEY = `${UiComponents.packageName}/source-provider`;

/**
 * An interface for property data provider which combines any number of [[IPropertyDataProvider]] instances.
 * @public
 */
export interface IMergingPropertyDataProvider {
  /**
   * Property data change event that is raised when any of the source providers raise this event.
   */
  onDataChanged: PropertyDataChangeEvent;
  /**
   * Determines source provider from a given [[PropertyRecord]].
   *
   * @returns
   * - `undefined` if source provider can't be determined.
   * - Source provider if it is found.
   */
  getSourceProviderFromPropertyRecord(
    record: PropertyRecord
  ): IPropertyDataProvider | undefined;
  /**
   * Returns merged property data from all source providers.
   */
  getData(): Promise<PropertyData>;
}

class MergingPropertyDataProviderImpl implements IMergingPropertyDataProvider {
  public onDataChanged = new PropertyDataChangeEvent();
  private _providers: IPropertyDataProvider[];

  constructor(providers: IPropertyDataProvider[]) {
    this._providers = providers;

    for (const provider of this._providers) {
      provider.onDataChanged.addListener(() => this.onDataChanged.raiseEvent());
    }
  }

  public async getData(): Promise<PropertyData> {
    const providersData = this._providers.map(async (provider) =>
      this.getDataWithReferenceToProvider(provider)
    );
    const dataArray = await Promise.all(providersData);

    return this.mergePropertyDataArray(dataArray);
  }

  private async getDataWithReferenceToProvider(
    provider: IPropertyDataProvider
  ): Promise<PropertyData> {
    const providerData = await provider.getData();
    for (const categoryName in providerData.records) {
      if (!providerData.records.hasOwnProperty(categoryName)) {
        continue;
      }

      providerData.records[categoryName].forEach((categoryRecord) => {
        categoryRecord.extendedData = {
          ...categoryRecord.extendedData,
          [SOURCE_PROVIDER_KEY]: provider,
        };
      });
    }
    return providerData;
  }

  private mergePropertyDataArray(dataArray: PropertyData[]): PropertyData {
    return {
      label: this.mergeLabels(dataArray),
      description: this.mergeDescriptions(dataArray),
      categories: this.mergeCategories(dataArray),
      records: this.mergeRecords(dataArray),
    };
  }

  private mergeLabels(dataArray: PropertyData[]): PropertyRecord {
    // We don't care about labels, just use the first one
    if (dataArray.length > 0) {
      return dataArray[0].label;
    }

    return PropertyRecord.fromString("");
  }

  private mergeDescriptions(dataArray: PropertyData[]): string | undefined {
    // We don't care about descriptions, just use the first one
    if (dataArray.length > 0) {
      return dataArray[0].description;
    }

    return undefined;
  }

  private mergeCategories(dataArray: PropertyData[]): PropertyCategory[] {
    const mergedCategories = new Array<PropertyCategory>();
    dataArray.forEach((data) => {
      for (const category of data.categories) {
        const mergedCategoryIndex = mergedCategories.findIndex(
          (mergedCat) => mergedCat.name === category.name
        );
        if (mergedCategoryIndex === -1) {
          mergedCategories.push(category);
          continue;
        }

        const newChildCategories = this.mergeChildCategories(
          mergedCategories[mergedCategoryIndex].childCategories,
          category.childCategories
        );
        mergedCategories[mergedCategoryIndex] = {
          ...mergedCategories[mergedCategoryIndex],
          ...(newChildCategories
            ? { childCategories: [...newChildCategories] }
            : {}),
        };
      }
    });

    return [...mergedCategories];
  }

  private mergeChildCategories(
    lhs: PropertyCategory[] | undefined,
    rhs: PropertyCategory[] | undefined
  ): PropertyCategory[] | undefined {
    if (!lhs || lhs.length === 0) {
      return rhs;
    }

    if (!rhs || rhs.length === 0) {
      return lhs;
    }

    const mergedCategories = new Array<PropertyCategory>();
    for (const lhsCategory of lhs) {
      mergedCategories.push(lhsCategory);
    }

    for (const rhsCategory of rhs) {
      const childCategoryIndex = mergedCategories.findIndex(
        (mergedCategory) => mergedCategory.name === rhsCategory.name
      );
      if (childCategoryIndex === -1) {
        mergedCategories.push(rhsCategory);
        continue;
      }

      const newChildCategories = this.mergeChildCategories(
        mergedCategories[childCategoryIndex].childCategories,
        rhsCategory.childCategories
      );
      mergedCategories[childCategoryIndex] = {
        ...mergedCategories[childCategoryIndex],
        ...(newChildCategories
          ? { childCategories: [...newChildCategories] }
          : {}),
      };
    }
    return [...mergedCategories];
  }

  private mergeRecords(dataArray: PropertyData[]): {
    [categoryName: string]: PropertyRecord[];
  } {
    const mergedRecords: { [categoryName: string]: PropertyRecord[] } = {};
    dataArray.forEach((data) => {
      for (const categoryName in data.records) {
        if (!data.records.hasOwnProperty(categoryName)) {
          continue;
        }

        if (mergedRecords.hasOwnProperty(categoryName)) {
          mergedRecords[categoryName].push(...data.records[categoryName]);
          continue;
        }

        mergedRecords[categoryName] = [...data.records[categoryName]];
      }
    });

    return mergedRecords;
  }

  public getSourceProviderFromPropertyRecord(
    record: PropertyRecord
  ): IPropertyDataProvider | undefined {
    if (
      !record.extendedData ||
      !record.extendedData.hasOwnProperty(SOURCE_PROVIDER_KEY)
    ) {
      return undefined;
    }

    return record.extendedData[SOURCE_PROVIDER_KEY];
  }
}

/**
 * Factory function that creates [[IMergingPropertyDataProvider]] instance
 * @public
 */
export function createMergedPropertyDataProvider(
  providers: IPropertyDataProvider[]
): IMergingPropertyDataProvider {
  return new MergingPropertyDataProviderImpl(providers);
}
