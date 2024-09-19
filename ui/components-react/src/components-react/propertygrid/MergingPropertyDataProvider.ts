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

/**
 * Implementation of [IPropertyDataProvider]. This provider merges any number of [IPropertyDataProviders] into a single one.
 * @public
 */
export class MergingPropertyDataProvider implements IPropertyDataProvider {
  /**
   * Property data change event that is raised when any of the source providers raise this event.
   */
  public onDataChanged = new PropertyDataChangeEvent();
  private _sourceProviderExtendedDataKey = "source-provider";
  private _providers: IPropertyDataProvider[];

  constructor(providers: IPropertyDataProvider[]) {
    this._providers = providers;

    for (const provider of this._providers) {
      provider.onDataChanged.addListener(() => this.onDataChanged.raiseEvent());
    }
  }

  /**
   * Returns merged property data from all source providers.
   */
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

      providerData.records[categoryName].forEach((categoryRecord, index) => {
        providerData.records[categoryName][index].extendedData = {
          ...categoryRecord.extendedData,
          ...{ [this._sourceProviderExtendedDataKey]: provider },
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
    const mergedCategories: PropertyCategory[] = [];
    dataArray.forEach((data) => {
      mergedCategories.push(...data.categories);
    });

    return mergedCategories;
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

        mergedRecords[categoryName] = data.records[categoryName];
      }
    });

    return mergedRecords;
  }

  /**
   * Determines source provider from a given [PropertyRecord].
   *
   * @returns
   * - `undefined` if source provider can't be determined.
   * - Source provider if it is found.
   */
  public getSourceProviderFromPropertyRecord(
    record: PropertyRecord
  ): IPropertyDataProvider | undefined {
    if (
      !record.extendedData ||
      !record.extendedData.hasOwnProperty(this._sourceProviderExtendedDataKey)
    ) {
      return undefined;
    }

    return record.extendedData[this._sourceProviderExtendedDataKey];
  }
}

/**
 * Function that creates MergingPropertyDataProvider
 * @public
 */
export function createMergedPropertyDataProvider(
  providers: IPropertyDataProvider[]
): MergingPropertyDataProvider {
  return new MergingPropertyDataProvider(providers);
}
