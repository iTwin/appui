/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import type { PrimitiveValue, PropertyRecord } from "@itwin/appui-abstract";
import { PropertyValueFormat } from "@itwin/appui-abstract";
import type { PropertyCategory } from "../../components-react.js";
import { SimplePropertyDataProvider } from "../../components-react.js";
import TestUtils from "../TestUtils.js";

class SamplePropertyDataProvider extends SimplePropertyDataProvider {
  public category2: PropertyCategory;
  public pr22: PropertyRecord;

  constructor() {
    super();

    const category: PropertyCategory = {
      name: "Group_1",
      label: "Group 1",
      expand: true,
    };
    this.addCategory(category);

    const pr = TestUtils.createPrimitiveStringProperty("Test1", "Test 1 Value");
    this.addProperty(pr, 0);
    const pr2 = TestUtils.createPrimitiveStringProperty(
      "Test2",
      "Test 2 Value"
    );
    this.addProperty(pr2, 0);

    const category2: PropertyCategory = {
      name: "Group_2",
      label: "Group 2",
      expand: false,
    };
    this.addCategory(category2);
    this.category2 = category2;

    const pr21 = TestUtils.createPrimitiveStringProperty(
      "Test2-1",
      "Test 2-1 Value"
    );
    this.addProperty(pr21, 1);
    const pr22 = TestUtils.createPrimitiveStringProperty(
      "Test2-2",
      "Test 2-2 Value"
    );
    this.addProperty(pr22, 1);
    this.pr22 = pr22;
  }
}

describe("SimplePropertyDataProvider", () => {
  let dataProvider: SamplePropertyDataProvider;

  beforeEach(() => {
    dataProvider = new SamplePropertyDataProvider();
  });

  it("getData should return proper data", async () => {
    const propertyData = await dataProvider.getData();
    expect(propertyData.categories).to.have.length(2);

    const propertyCategory = propertyData.categories[0];
    expect(propertyCategory.name).to.equal("Group_1");
    expect(propertyCategory.label).to.equal("Group 1");
    expect(propertyCategory.expand).toEqual(true);

    const records = propertyData.records[propertyCategory.name];
    expect(records).to.have.length(2);

    const record = records[0];
    const propertyDescription = record.property;
    expect(propertyDescription.displayLabel).to.equal("Test1");
    const propertyValue = record.value;
    expect(propertyValue.valueFormat).to.equal(PropertyValueFormat.Primitive);
    const primitiveValue = propertyValue as PrimitiveValue;
    expect(primitiveValue.value).to.equal("Test 1 Value");
  });

  it("findCategoryIndex should return the proper index", () => {
    const index = dataProvider.findCategoryIndex(dataProvider.category2);
    expect(index).toEqual(1);
  });

  it("removeProperty should remove the correct property", async () => {
    const propertyData = await dataProvider.getData();
    const records = propertyData.records[dataProvider.category2.name];
    expect(records).to.have.length(2);
    const removed = dataProvider.removeProperty(dataProvider.pr22, 1);
    expect(removed).toEqual(true);
    const records2 = propertyData.records[dataProvider.category2.name];
    expect(records2).to.have.length(1);
  });

  it("replaceProperty should place the correct property", async () => {
    const propertyData = await dataProvider.getData();
    const records = propertyData.records[dataProvider.category2.name];
    expect(records).to.have.length(2);
    const record = records[1];
    const newRecord = TestUtils.createPrimitiveStringProperty(
      "Test-New",
      "Test New Value"
    );
    const replaced = dataProvider.replaceProperty(record, 1, newRecord);
    expect(replaced).toEqual(true);
    const records2 = propertyData.records[dataProvider.category2.name];
    expect(records2).to.have.length(2);
    const record2 = records[1];
    const propertyDescription = record2.property;
    expect(propertyDescription.displayLabel).to.equal("Test-New");
  });

  it("getData should return same object when no data changes", async () => {
    const tested = new SimplePropertyDataProvider();
    const first = await tested.getData();
    const second = await tested.getData();
    expect(first).to.equal(second);
  });

  it("getData should return different object when data changes", async () => {
    const tested = new SimplePropertyDataProvider();
    const initial = await tested.getData();
    tested.addCategory({ name: "Name1", label: "Label1", expand: false });
    const categoryAdded = await tested.getData();
    expect(initial).to.not.equal(categoryAdded);

    const property = TestUtils.createPrimitiveStringProperty(
      "String1",
      "string1"
    );
    tested.addProperty(property, 0);
    const propertyAdded = await tested.getData();
    expect(categoryAdded).to.not.equal(propertyAdded);

    tested.removeProperty(property, 0);
    const propertyRemoved = await tested.getData();
    expect(propertyAdded).to.not.equal(propertyRemoved);
  });

  it("getData should return different object when onDataChanged is called", async () => {
    const tested = new SimplePropertyDataProvider();
    const initial = await tested.getData();

    const spy = vi.fn();
    tested.onDataChanged.addListener(spy);

    tested.addCategory({ name: "Name1", label: "Label1", expand: false });

    expect(spy).toHaveBeenCalledOnce();
    const newData = await tested.getData();
    expect(newData).not.toBe(initial);
  });
});
