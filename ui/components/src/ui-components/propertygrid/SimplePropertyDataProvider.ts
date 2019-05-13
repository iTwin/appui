/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
/** @module PropertyGrid */

import { PropertyRecord } from "@bentley/imodeljs-frontend";
import { IPropertyDataProvider, PropertyData, PropertyCategory, PropertyDataChangeEvent } from "./PropertyDataProvider";

/**
 * Implementation of [PropertyDataProvider] that uses an associative array.
 * @public
 */
export class SimplePropertyDataProvider implements IPropertyDataProvider, PropertyData {
  public label: string = "";
  public description?: string;
  public categories: PropertyCategory[] = [];
  public records: { [categoryName: string]: PropertyRecord[] } = {};
  public onDataChanged = new PropertyDataChangeEvent();

  public addCategory(category: PropertyCategory): number {
    const categoryIdx = this.categories.push(category) - 1;
    this.records[this.categories[categoryIdx].name] = [];
    this.onDataChanged.raiseEvent();
    return categoryIdx;
  }

  public findCategoryIndex(category: PropertyCategory): number {
    const index = this.categories.findIndex((testCategory: PropertyCategory) => {
      return testCategory.name === category.name;
    });
    return index;
  }

  public addProperty(propertyRecord: PropertyRecord, categoryIdx: number): void {
    this.records[this.categories[categoryIdx].name].push(propertyRecord);
    this.onDataChanged.raiseEvent();
  }

  public removeProperty(propertyRecord: PropertyRecord, categoryIdx: number): boolean {
    const index = this.records[this.categories[categoryIdx].name].findIndex((record: PropertyRecord) => {
      return record === propertyRecord;
    });
    if (index >= 0) {
      this.records[this.categories[categoryIdx].name].splice(index, 1);
      this.onDataChanged.raiseEvent();
      return true;
    }
    return false;
  }

  public replaceProperty(propertyRecord: PropertyRecord, categoryIdx: number, newRecord: PropertyRecord): boolean {
    const index = this.records[this.categories[categoryIdx].name].findIndex((record: PropertyRecord) => {
      return record === propertyRecord;
    });
    if (index >= 0) {
      this.records[this.categories[categoryIdx].name].splice(index, 1, newRecord);
      return true;
    }
    return false;
  }

  public async getData(): Promise<PropertyData> {
    return Promise.resolve(this);
  }
}
