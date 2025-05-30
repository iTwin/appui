/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import type { PropertyRecord } from "@itwin/appui-abstract";
import { PropertyValueFormat } from "@itwin/appui-abstract";
import { LabelPropertyDataFilterer } from "../../../../components-react/propertygrid/dataproviders/filterers/LabelPropertyDataFilterer.js";
import { FilteredType } from "../../../../components-react/propertygrid/dataproviders/filterers/PropertyDataFiltererBase.js";
import { TestUtils } from "../../../TestUtils.js";

describe("LabelPropertyDataFilterer", () => {
  describe("When filter text not set", () => {
    const recordsToTest: PropertyRecord[] = [
      TestUtils.createPrimitiveStringProperty("stringProp", "value1"),
      TestUtils.createArrayProperty("arrayProp"),
      TestUtils.createStructProperty("structProp"),
    ];

    describe("[get] filterText", () => {
      it(`Should return empty string`, () => {
        const filterer = new LabelPropertyDataFilterer();
        expect(filterer.filterText).toEqual("");
      });

      it(`Should return string which was set in the constructor`, () => {
        const filterer = new LabelPropertyDataFilterer("test");
        expect(filterer.filterText).toEqual("test");
      });
    });

    it(`Should return filtering as disabled`, () => {
      const filterer = new LabelPropertyDataFilterer();
      expect(filterer.isActive).toEqual(false);
    });

    for (const record of recordsToTest) {
      const recordType = PropertyValueFormat[record.value.valueFormat];
      const displayValue = (record.value as any).displayValue ?? "undefined";

      it(`Should always match propertyRecord (type: ${recordType}, displayValue: ${displayValue})`, async () => {
        const filterer = new LabelPropertyDataFilterer();

        const matchResult = await filterer.recordMatchesFilter(record);
        expect(matchResult).to.deep.eq({ matchesFilter: true });
      });
    }

    it(`Should always return 'matchesFilter: true' when calling categoryMatchesFilter`, async () => {
      const filterer = new LabelPropertyDataFilterer();

      const matchResult = await filterer.categoryMatchesFilter();
      expect(matchResult).to.deep.eq({ matchesFilter: true });
    });
  });

  describe("When filter text set", () => {
    it("Should return lowercase string", () => {
      const filterer = new LabelPropertyDataFilterer();

      const expectedText = "test filter";
      filterer.filterText = expectedText;

      expect(filterer.filterText).toEqual(expectedText.toLowerCase());
    });

    it("Should return filtering as enabled", () => {
      const filterer = new LabelPropertyDataFilterer();

      filterer.filterText = "test filter";

      expect(filterer.isActive).toEqual(true);
    });

    it("Should not match when calling `categoryMatchesFilter`", async () => {
      const filterer = new LabelPropertyDataFilterer();

      filterer.filterText = "test";
      const matchResult = await filterer.categoryMatchesFilter();
      expect(matchResult).to.deep.eq({ matchesFilter: false });
    });

    it("Should not match when given empty display value property record", async () => {
      const filterer = new LabelPropertyDataFilterer();
      const record = TestUtils.createPrimitiveStringProperty("", "Value");

      filterer.filterText = "SomeFilter";
      const matchResult = await filterer.recordMatchesFilter(record);
      expect(matchResult).to.deep.eq({ matchesFilter: false });
    });

    it("Should not match when given non matching property record", async () => {
      const filterer = new LabelPropertyDataFilterer();
      const record = TestUtils.createPrimitiveStringProperty(
        "Property",
        "Value"
      );

      filterer.filterText = "SomeFilter";
      const matchResult = await filterer.recordMatchesFilter(record);
      expect(matchResult).to.deep.eq({ matchesFilter: false });
    });

    it("Should match when given partially matching property record", async () => {
      const filterer = new LabelPropertyDataFilterer();
      const record = TestUtils.createPrimitiveStringProperty(
        "DisplaySomeFilteredName",
        "Value"
      );

      filterer.filterText = "someFilter";
      const matchResult = await filterer.recordMatchesFilter(record);
      expect(matchResult).to.deep.eq({
        matchesFilter: true,
        shouldForceIncludeDescendants: true,
        shouldExpandNodeParents: true,
        matchesCount: 1,
        filteredTypes: [FilteredType.Label],
      });
    });

    it("Should match when given fully matching property record", async () => {
      const filterer = new LabelPropertyDataFilterer();
      const record = TestUtils.createPrimitiveStringProperty(
        "DisplaySomeFilteredName",
        "Value"
      );

      filterer.filterText = "displaySomeFilteredNaMe";
      const matchResult = await filterer.recordMatchesFilter(record);
      expect(matchResult).to.deep.eq({
        matchesFilter: true,
        shouldForceIncludeDescendants: true,
        shouldExpandNodeParents: true,
        matchesCount: 1,
        filteredTypes: [FilteredType.Label],
      });
    });

    it("Should match when given matching struct record", async () => {
      const filterer = new LabelPropertyDataFilterer();
      const record = TestUtils.createStructProperty("Struct");

      filterer.filterText = "StrUCt";
      const matchResult = await filterer.recordMatchesFilter(record);
      expect(matchResult).to.deep.eq({
        matchesFilter: true,
        shouldForceIncludeDescendants: true,
        shouldExpandNodeParents: true,
        matchesCount: 1,
        filteredTypes: [FilteredType.Label],
      });
    });

    it("Should match when given matching array record", async () => {
      const filterer = new LabelPropertyDataFilterer();
      const record = TestUtils.createArrayProperty("Array");

      filterer.filterText = "ArRAy";
      const matchResult = await filterer.recordMatchesFilter(record);
      expect(matchResult).to.deep.eq({
        matchesFilter: true,
        shouldForceIncludeDescendants: true,
        shouldExpandNodeParents: true,
        matchesCount: 1,
        filteredTypes: [FilteredType.Label],
      });
    });

    it("Should match several times when given property record with repeated filter pattern", async () => {
      const filterer = new LabelPropertyDataFilterer();
      const record = TestUtils.createPrimitiveStringProperty(
        "DisplaySomeFilteredName",
        "Value"
      );

      filterer.filterText = "mE";
      const matchResult = await filterer.recordMatchesFilter(record);
      expect(matchResult).to.deep.eq({
        matchesFilter: true,
        shouldForceIncludeDescendants: true,
        shouldExpandNodeParents: true,
        matchesCount: 2,
        filteredTypes: [FilteredType.Label],
      });
    });

    it("Should match several times when given array record with repeated filter pattern", async () => {
      const filterer = new LabelPropertyDataFilterer();
      const record = TestUtils.createArrayProperty("ArrayAr");

      filterer.filterText = "aR";
      const matchResult = await filterer.recordMatchesFilter(record);
      expect(matchResult).to.deep.eq({
        matchesFilter: true,
        shouldForceIncludeDescendants: true,
        shouldExpandNodeParents: true,
        matchesCount: 2,
        filteredTypes: [FilteredType.Label],
      });
    });

    it("Should match several times when given struct record with repeated filter pattern", async () => {
      const filterer = new LabelPropertyDataFilterer();
      const record = TestUtils.createStructProperty("StructsTSt");

      filterer.filterText = "ST";
      const matchResult = await filterer.recordMatchesFilter(record);
      expect(matchResult).to.deep.eq({
        matchesFilter: true,
        shouldForceIncludeDescendants: true,
        shouldExpandNodeParents: true,
        matchesCount: 3,
        filteredTypes: [FilteredType.Label],
      });
    });

    it("Should match if case of letters does not match", async () => {
      const filterer = new LabelPropertyDataFilterer("sTrUcT");
      const record = TestUtils.createStructProperty("StructsTSt");

      const matchResult = await filterer.recordMatchesFilter(record);
      expect(matchResult).to.deep.eq({
        matchesFilter: true,
        shouldForceIncludeDescendants: true,
        shouldExpandNodeParents: true,
        matchesCount: 1,
        filteredTypes: [FilteredType.Label],
      });
    });
  });

  describe("raising `onFilterChanged` event", () => {
    const spy = vi.fn();
    let filterer: LabelPropertyDataFilterer;

    beforeEach(() => {
      filterer = new LabelPropertyDataFilterer();
      filterer.onFilterChanged.addListener(spy);
    });

    it("doesn't raise event when filter doesn't change", () => {
      filterer.filterText = "";
      expect(spy).not.toBeCalled();

      filterer.filterText = "    ";
      expect(spy).not.toBeCalled();

      filterer.filterText = "AAA";
      spy.mockReset();

      filterer.filterText = "AAA";
      expect(spy).not.toBeCalled();

      filterer.filterText = "aaa";
      expect(spy).not.toBeCalled();
    });

    it("raises event when filter changes", () => {
      filterer.filterText = "a";
      expect(spy).toHaveBeenCalledOnce();

      filterer.filterText = "b";
      expect(spy).toHaveBeenCalledTimes(2);
    });
  });
});
