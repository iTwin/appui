/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { PrimitiveValue, PropertyRecord } from "@itwin/appui-abstract";
import type { PropertyCategory } from "../../components-react.js";
import { SimplePropertyDataProvider } from "../../components-react.js";
import TestUtils from "../TestUtils.js";
import { createMergedPropertyDataProvider } from "../../components-react/propertygrid/MergingPropertyDataProvider.js";

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

  let dataProvider1: SimplePropertyDataProvider;
  let dataProvider2: SimplePropertyDataProvider;

  beforeEach(() => {
    dataProvider1 = new SimplePropertyDataProvider();
    dataProvider1.addCategory(provider1Category);
    dataProvider1.addProperty(provider1Property, 0);

    dataProvider2 = new SimplePropertyDataProvider();
    dataProvider2.addCategory(provider2Category);
    dataProvider2.addProperty(provider2Property, 0);
  });

  it("getData should return proper data", async () => {
    const mergingProvider = createMergedPropertyDataProvider([
      dataProvider1,
      dataProvider2,
    ]);
    const mergingProviderPropertyData = await mergingProvider.getData();
    const dataProvider1PropertyData = await dataProvider1.getData();
    const dataProvider2PropertyData = await dataProvider2.getData();

    // Check if providers have expected number of categories
    expect(mergingProviderPropertyData.categories).to.have.length(2);
    expect(dataProvider1PropertyData.categories).to.have.length(1);
    expect(dataProvider2PropertyData.categories).to.have.length(1);

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

    // Check if mergingProvider has all records from other providers
    const recordsForMergingProviderCategory1 =
      mergingProviderPropertyData.records[
        mergingProviderPropertyCategory1.name
      ];
    const recordsForMergingProviderCategory2 =
      mergingProviderPropertyData.records[
        mergingProviderPropertyCategory2.name
      ];

    const recordsForDataProvider1Category =
      dataProvider1PropertyData.records[dataProvider1PropertyCategory.name];
    const recordsForDataProvider2Category =
      dataProvider2PropertyData.records[dataProvider2PropertyCategory.name];

    expect(recordsForMergingProviderCategory1).to.have.length(1);
    expect(recordsForMergingProviderCategory2).to.have.length(1);
    expect(recordsForDataProvider1Category).to.have.length(1);
    expect(recordsForDataProvider2Category).to.have.length(1);

    const mergingProviderRecord1 = recordsForMergingProviderCategory1[0];
    const mergingProviderRecord2 = recordsForMergingProviderCategory2[0];
    const dataProvider1Record = recordsForDataProvider1Category[0];
    const dataProvider2Record = recordsForDataProvider2Category[0];

    expect(mergingProviderRecord1.property.displayLabel).to.equal(
      dataProvider1Record.property.displayLabel
    );
    expect(mergingProviderRecord2.property.displayLabel).to.equal(
      dataProvider2Record.property.displayLabel
    );

    const mergingProviderValue1 =
      mergingProviderRecord1.value as PrimitiveValue;
    const mergingProviderValue2 =
      mergingProviderRecord2.value as PrimitiveValue;
    const dataProvider1Value = dataProvider1Record.value as PrimitiveValue;
    const dataProvider2Value = dataProvider2Record.value as PrimitiveValue;
    expect(mergingProviderValue1).to.equal(dataProvider1Value);
    expect(mergingProviderValue2).to.equal(dataProvider2Value);
  });

  it("getData should return same PropertyData when no data changes", async () => {
    const mergingProvider = createMergedPropertyDataProvider([
      dataProvider1,
      dataProvider2,
    ]);
    const first = await mergingProvider.getData();
    const second = await mergingProvider.getData();
    expect(first).to.deep.equal(second);
  });

  it("getData returns updated data when it changes", async () => {
    const mergingProvider = createMergedPropertyDataProvider([
      dataProvider1,
      dataProvider2,
    ]);
    const initial = await mergingProvider.getData();
    expect(initial.categories.length).to.equal(2);
    dataProvider1.addCategory({
      name: "Name1",
      label: "Label1",
      expand: false,
    });

    const categoryAdded = await mergingProvider.getData();
    expect(categoryAdded.categories.length).to.equal(3);
    // MergingProvider has 2 providers, 2nd provider has 1 category, and 1st provider has 2 categories.
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

    dataProvider2.removeProperty(provider2Property, 0);
    const propertyRemoved = await mergingProvider.getData();
    expect(propertyRemoved.records[provider2Category.name].length).to.equal(1);
  });

  it("onDataChanged should be called when any of the source providers call onDataChanged", async () => {
    const mergingProvider = createMergedPropertyDataProvider([
      dataProvider1,
      dataProvider2,
    ]);
    const spy = vi.fn();
    mergingProvider.onDataChanged.addListener(() => {
      spy();
    });
    expect(spy).toHaveBeenCalledTimes(0);

    dataProvider1.addCategory({
      name: "Name1",
      label: "Label1",
      expand: false,
    });
    expect(spy).toHaveBeenCalledTimes(1);

    dataProvider2.addProperty(
      TestUtils.createPrimitiveStringProperty("String1", "string1"),
      0
    );
    expect(spy).toHaveBeenCalledTimes(2);
  });

  it("getSourceProviderFromPropertyRecord returns correct provider", async () => {
    const mergingProvider = createMergedPropertyDataProvider([
      dataProvider1,
      dataProvider2,
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

    const testPropertyRecord: PropertyRecord =
      TestUtils.createPrimitiveStringProperty(
        "testProperty",
        "testProperty raw"
      );
    const sourceProviderUndefined =
      mergingProvider.getSourceProviderFromPropertyRecord(testPropertyRecord);
    expect(sourceProviderUndefined).to.equal(undefined);
  });

  it("getData filters out duplicate categories", async () => {
    const mergingProvider = createMergedPropertyDataProvider([
      dataProvider1,
      dataProvider2,
    ]);
    const category1: PropertyCategory = {
      name: "test1 name",
      label: "test1 label",
      expand: true,
    };
    const category2 = {
      name: "same name",
      label: "same label",
      expand: true,
      childCategories: [
        {
          name: "test2 child name",
          label: "test2 child label",
          expand: false,
        },
      ],
    };

    const category3 = {
      name: "same name",
      label: "same label",
      expand: true,
      childCategories: [
        {
          name: "test3 child name",
          label: "test3 child label",
          expand: false,
        },
      ],
    };
    dataProvider1.addCategory(category1);
    dataProvider2.addCategory(category1);
    dataProvider1.addCategory(category2);
    dataProvider2.addCategory(category3);

    const mergingProviderData = await mergingProvider.getData();
    // Check if providers have expected number of categories
    expect(mergingProviderData.categories).to.have.length(4);

    // Check if mergingProvider has all categories from other providers
    expect(mergingProviderData.categories[0]).to.deep.equal(provider1Category);
    expect(mergingProviderData.categories[1]).to.deep.equal(category1);
    expect(mergingProviderData.categories[2].name).to.equal(category2.name);
    expect(mergingProviderData.categories[2].label).to.equal(category2.label);
    expect(mergingProviderData.categories[2].expand).to.equal(category2.expand);
    expect(mergingProviderData.categories[2].childCategories?.length).to.equal(
      2
    );
    expect(mergingProviderData.categories[2].childCategories).to.deep.equal([
      ...category2.childCategories,
      ...category3.childCategories,
    ]);
    expect(mergingProviderData.categories[3]).to.deep.equal(provider2Category);
  });
});
