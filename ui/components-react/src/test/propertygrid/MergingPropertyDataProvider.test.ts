/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { PrimitiveValue, PropertyRecord } from "@itwin/appui-abstract";
import type { PropertyCategory } from "../../components-react";
import { SimplePropertyDataProvider } from "../../components-react";
import TestUtils from "../TestUtils";
import { createMergedPropertyDataProvider } from "../../components-react/propertygrid/MergingPropertyDataProvider";

describe("MergingPropertyDataProvider", () => {
  const provider1Category: PropertyCategory = {
    name: "provider1 Category name",
    label: "provider1 category label",
    expand: false,
  };
  const provider2Category: PropertyCategory = {
    name: "provider2 Category name",
    label: "provider2 category label",
    expand: true,
  };
  const provider3Category: PropertyCategory = {
    name: "provider3 Category name",
    label: "provider3 category label",
    expand: false,
  };

  const provider1Property: PropertyRecord =
    TestUtils.createPrimitiveStringProperty(
      "provider1 Property",
      "provider1 Property raw"
    );
  const provider2Property: PropertyRecord =
    TestUtils.createPrimitiveStringProperty(
      "provider2 Property",
      "provider2 Property raw"
    );
  const provider3Property: PropertyRecord =
    TestUtils.createPrimitiveStringProperty(
      "provider3 Property",
      "provider3 Property raw"
    );

  let dataProvider1: SimplePropertyDataProvider;
  let dataProvider2: SimplePropertyDataProvider;
  let dataProvider3: SimplePropertyDataProvider;

  beforeEach(() => {
    dataProvider1 = new SimplePropertyDataProvider();
    dataProvider1.addCategory(provider1Category);
    dataProvider1.addProperty(provider1Property, 0);

    dataProvider2 = new SimplePropertyDataProvider();
    dataProvider2.addCategory(provider2Category);
    dataProvider2.addProperty(provider2Property, 0);

    dataProvider3 = new SimplePropertyDataProvider();
    dataProvider3.addCategory(provider3Category);
    dataProvider3.addProperty(provider3Property, 0);
  });

  it("getData should return proper data", async () => {
    const mergingProvider = createMergedPropertyDataProvider([
      dataProvider1,
      dataProvider2,
      dataProvider3,
    ]);
    const mergingProviderPropertyData = await mergingProvider.getData();
    const dataProvider1PropertyData = await dataProvider1.getData();
    const dataProvider2PropertyData = await dataProvider2.getData();
    const dataProvider3PropertyData = await dataProvider3.getData();

    // Check if providers have expected number of categories
    expect(mergingProviderPropertyData.categories).to.have.length(3);
    expect(dataProvider1PropertyData.categories).to.have.length(1);
    expect(dataProvider2PropertyData.categories).to.have.length(1);
    expect(dataProvider3PropertyData.categories).to.have.length(1);

    // Check if mergingProvider has all categories from other providers
    const mergingProviderPropertyCategory1 =
      mergingProviderPropertyData.categories[0];
    const dataProvider1PropertyCategory =
      dataProvider1PropertyData.categories[0];
    expect(mergingProviderPropertyCategory1.name).to.equal(
      dataProvider1PropertyCategory.name
    );
    expect(mergingProviderPropertyCategory1.label).to.equal(
      dataProvider1PropertyCategory.label
    );
    expect(mergingProviderPropertyCategory1.expand).to.be.equal(
      dataProvider1PropertyCategory.expand
    );

    const mergingProviderPropertyCategory2 =
      mergingProviderPropertyData.categories[1];
    const dataProvider2PropertyCategory =
      dataProvider2PropertyData.categories[0];
    expect(mergingProviderPropertyCategory2.name).to.equal(
      dataProvider2PropertyCategory.name
    );
    expect(mergingProviderPropertyCategory2.label).to.equal(
      dataProvider2PropertyCategory.label
    );
    expect(mergingProviderPropertyCategory2.expand).to.be.equal(
      dataProvider2PropertyCategory.expand
    );

    const mergingProviderPropertyCategory3 =
      mergingProviderPropertyData.categories[2];
    const dataProvider3PropertyCategory =
      dataProvider3PropertyData.categories[0];
    expect(mergingProviderPropertyCategory3.name).to.equal(
      dataProvider3PropertyCategory.name
    );
    expect(mergingProviderPropertyCategory3.label).to.equal(
      dataProvider3PropertyCategory.label
    );
    expect(mergingProviderPropertyCategory3.expand).to.be.equal(
      dataProvider3PropertyCategory.expand
    );

    // Check if mergingProvider has all records from other providers
    const recordsForMergingProviderCategory1 =
      mergingProviderPropertyData.records[
        mergingProviderPropertyCategory1.name
      ];
    const recordsForMergingProviderCategory2 =
      mergingProviderPropertyData.records[
        mergingProviderPropertyCategory2.name
      ];
    const recordsForMergingProviderCategory3 =
      mergingProviderPropertyData.records[
        mergingProviderPropertyCategory3.name
      ];

    const recordsForDataProvider1Category =
      dataProvider1PropertyData.records[dataProvider1PropertyCategory.name];
    const recordsForDataProvider2Category =
      dataProvider2PropertyData.records[dataProvider2PropertyCategory.name];
    const recordsForDataProvider3Category =
      dataProvider3PropertyData.records[dataProvider3PropertyCategory.name];

    expect(recordsForMergingProviderCategory1).to.have.length(1);
    expect(recordsForMergingProviderCategory2).to.have.length(1);
    expect(recordsForMergingProviderCategory3).to.have.length(1);
    expect(recordsForDataProvider1Category).to.have.length(1);
    expect(recordsForDataProvider2Category).to.have.length(1);
    expect(recordsForDataProvider3Category).to.have.length(1);

    const mergingProviderRecord1 = recordsForMergingProviderCategory1[0];
    const mergingProviderRecord2 = recordsForMergingProviderCategory2[0];
    const mergingProviderRecord3 = recordsForMergingProviderCategory3[0];
    const dataProvider1Record = recordsForDataProvider1Category[0];
    const dataProvider2Record = recordsForDataProvider2Category[0];
    const dataProvider3Record = recordsForDataProvider3Category[0];

    expect(mergingProviderRecord1.property.displayLabel).to.equal(
      dataProvider1Record.property.displayLabel
    );
    expect(mergingProviderRecord2.property.displayLabel).to.equal(
      dataProvider2Record.property.displayLabel
    );
    expect(mergingProviderRecord3.property.displayLabel).to.equal(
      dataProvider3Record.property.displayLabel
    );
    const mergingProviderValue1 =
      mergingProviderRecord1.value as PrimitiveValue;
    const mergingProviderValue2 =
      mergingProviderRecord2.value as PrimitiveValue;
    const mergingProviderValue3 =
      mergingProviderRecord3.value as PrimitiveValue;
    const dataProvider1Value = dataProvider1Record.value as PrimitiveValue;
    const dataProvider2Value = dataProvider2Record.value as PrimitiveValue;
    const dataProvider3Value = dataProvider3Record.value as PrimitiveValue;
    expect(mergingProviderValue1).to.equal(dataProvider1Value);
    expect(mergingProviderValue2).to.equal(dataProvider2Value);
    expect(mergingProviderValue3).to.equal(dataProvider3Value);
  });

  it("getData should return same PropertyData when no data changes", async () => {
    const mergingProvider = createMergedPropertyDataProvider([
      dataProvider1,
      dataProvider2,
      dataProvider3,
    ]);
    const first = await mergingProvider.getData();
    const second = await mergingProvider.getData();
    expect(first).to.deep.equal(second);
  });

  it("getData returns updated data when it changes", async () => {
    const mergingProvider = createMergedPropertyDataProvider([
      dataProvider1,
      dataProvider2,
      dataProvider3,
    ]);
    const initial = await mergingProvider.getData();
    expect(initial.categories.length).to.equal(3);
    dataProvider1.addCategory({
      name: "Name1",
      label: "Label1",
      expand: false,
    });

    const categoryAdded = await mergingProvider.getData();
    expect(categoryAdded.categories.length).to.equal(4);
    // MergingProvider has 3 providers and 2nd and 3rd provider have 1 category, and 1st provider has 2 categories.
    // MergingProvider joins all categories into a single array, since 1st provider's categories are added first, newly created
    // category will be in the position 1.
    expect(categoryAdded.categories[1].name).to.equal("Name1");

    expect(categoryAdded.records[provider2Category.name].length).to.equal(1);
    const property = TestUtils.createPrimitiveStringProperty(
      "String1",
      "string1"
    );
    dataProvider2.addProperty(property, 0);
    const propertyAdded = await mergingProvider.getData();

    expect(propertyAdded.records[provider2Category.name].length).to.equal(2);
    expect(
      (propertyAdded.records[provider2Category.name][1].value as PrimitiveValue)
        .displayValue
    ).to.equal("string1");

    expect(propertyAdded.records[provider3Category.name].length).to.equal(1);
    dataProvider3.removeProperty(provider3Property, 0);
    const propertyRemoved = await mergingProvider.getData();
    expect(propertyRemoved.records[provider3Category.name].length).to.equal(0);
  });

  it("onDataChanged should be called when any of the source providers call onDataChanged", async () => {
    const mergingProvider = createMergedPropertyDataProvider([
      dataProvider1,
      dataProvider2,
      dataProvider3,
    ]);
    let onDataChangedCalls = 0;

    mergingProvider.onDataChanged.addListener(() => {
      ++onDataChangedCalls;
    });
    expect(onDataChangedCalls).to.be.equal(0);

    dataProvider1.addCategory({
      name: "Name1",
      label: "Label1",
      expand: false,
    });
    expect(onDataChangedCalls).to.be.equal(1);

    dataProvider2.addProperty(
      TestUtils.createPrimitiveStringProperty("String1", "string1"),
      0
    );
    expect(onDataChangedCalls).to.be.equal(2);
  });

  it("getSourceProviderFromPropertyRecord returns correct provider", async () => {
    const mergingProvider = createMergedPropertyDataProvider([
      dataProvider1,
      dataProvider2,
      dataProvider3,
    ]);
    const data = await mergingProvider.getData();

    const sourceProvider1 = mergingProvider.getSourceProviderFromPropertyRecord(
      data.records[provider1Category.name][0]
    );
    expect(dataProvider1).to.equal(sourceProvider1);

    const sourceProvider2 = mergingProvider.getSourceProviderFromPropertyRecord(
      data.records[provider2Category.name][0]
    );
    expect(dataProvider2).to.equal(sourceProvider2);

    const sourceProvider3 = mergingProvider.getSourceProviderFromPropertyRecord(
      data.records[provider3Category.name][0]
    );
    expect(dataProvider3).to.equal(sourceProvider3);

    const testPropertyRecord: PropertyRecord =
      TestUtils.createPrimitiveStringProperty(
        "testProperty",
        "testProperty raw"
      );
    const sourceProviderUndefined =
      mergingProvider.getSourceProviderFromPropertyRecord(testPropertyRecord);
    expect(sourceProviderUndefined).to.equal(undefined);
  });
});
