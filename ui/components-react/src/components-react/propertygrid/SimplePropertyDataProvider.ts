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
} from "./PropertyDataProvider.js";
import { PropertyDataChangeEvent } from "./PropertyDataProvider.js";

/**
 * Implementation of [[IPropertyDataProvider]] that uses an associative array.
 * @public
 */
export class SimplePropertyDataProvider
  implements IPropertyDataProvider, PropertyData
{
  public label: PropertyRecord = PropertyRecord.fromString("");
  public description?: string;
  public categories: PropertyCategory[] = [];
  public records: { [categoryName: string]: PropertyRecord[] } = {};
  public onDataChanged = new PropertyDataChangeEvent();
  private _propertyData: PropertyData;

  constructor() {
    this._propertyData = this.createPropertyData();
  }

  private createPropertyData(): PropertyData {
    return {
      label: this.label,
      description: this.description,
      categories: this.categories,
      records: this.records,
    };
  }

  private updatePropertyData() {
    this._propertyData = this.createPropertyData();
    this.onDataChanged.raiseEvent();
  }

  public addCategory(category: PropertyCategory): number {
    const categoryIdx = this.categories.push(category) - 1;
    this.records[this.categories[categoryIdx].name] = [];
    this.updatePropertyData();
    return categoryIdx;
  }

  public findCategoryIndex(category: PropertyCategory): number {
    const index = this.categories.findIndex(
      (testCategory: PropertyCategory) => {
        return testCategory.name === category.name;
      }
    );
    return index;
  }

  public addProperty(
    propertyRecord: PropertyRecord,
    categoryIdx: number
  ): void {
    this.records[this.categories[categoryIdx].name].push(propertyRecord);
    this.updatePropertyData();
  }

  public removeProperty(
    propertyRecord: PropertyRecord,
    categoryIdx: number
  ): boolean {
    const index = this.records[this.categories[categoryIdx].name].findIndex(
      (record: PropertyRecord) => {
        return record === propertyRecord;
      }
    );

    let result = false;

    if (index >= 0) {
      this.records[this.categories[categoryIdx].name].splice(index, 1);
      this.updatePropertyData();
      result = true;
    }
    return result;
  }

  public replaceProperty(
    propertyRecord: PropertyRecord,
    categoryIdx: number,
    newRecord: PropertyRecord
  ): boolean {
    const index = this.records[this.categories[categoryIdx].name].findIndex(
      (record: PropertyRecord) => {
        return record === propertyRecord;
      }
    );

    let result = false;

    if (index >= 0) {
      this.records[this.categories[categoryIdx].name].splice(
        index,
        1,
        newRecord
      );
      result = true;
    }
    return result;
  }

  public async getData(): Promise<PropertyData> {
    return this._propertyData;
  }
}
