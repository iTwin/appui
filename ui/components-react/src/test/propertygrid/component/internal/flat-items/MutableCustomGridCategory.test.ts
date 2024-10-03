/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { MutableCustomGridCategory } from "../../../../../components-react/propertygrid/internal/flat-items/MutableCustomGridCategory.js";
import type { MutableGridItemFactory } from "../../../../../components-react/propertygrid/internal/flat-items/MutableGridItemFactory.js";
import type { PropertyCategory } from "../../../../../components-react/propertygrid/PropertyDataProvider.js";
import { FlatGridTestUtils } from "./FlatGridTestUtils.js";

describe("MutableCustomGridCategory", () => {
  function createCategory(
    name: string,
    childCategories: string[]
  ): PropertyCategory {
    return {
      name,
      label: name,
      expand: false,
      childCategories: childCategories.map((n) => createCategory(n, [])),
    };
  }

  const category = createCategory("test_category", ["nested_category"]);
  const recordsDict = FlatGridTestUtils.constructCategoryRecordsDict([
    category,
  ]);

  let factoryStub: MutableGridItemFactory;

  beforeEach(() => {
    factoryStub = {} as MutableGridItemFactory;
  });

  describe("constructor", () => {
    it("uses parentSelectionKey to construct a new selectionKey", () => {
      const categoryItem = new MutableCustomGridCategory(
        category,
        recordsDict,
        factoryStub,
        "parent",
        0
      );
      expect(categoryItem.selectionKey).toEqual("parent_test_category");
    });

    it("successfully creates instance when category name is not present in `recordsDict`", () => {
      const emptyRecordsDict = FlatGridTestUtils.constructCategoryRecordsDict(
        []
      );
      const categoryItem = new MutableCustomGridCategory(
        category,
        emptyRecordsDict,
        factoryStub,
        "parent",
        0
      );
      expect(categoryItem.getChildren()).to.be.empty;
    });
  });

  describe("isRootCategory", () => {
    it("is `true` when at depth 0", () => {
      const categoryItem = new MutableCustomGridCategory(
        category,
        recordsDict,
        factoryStub,
        undefined,
        0
      );
      expect(categoryItem.isRootCategory).toEqual(true);
    });

    it("is `false` when not at depth 0", () => {
      const categoryItem = new MutableCustomGridCategory(
        category,
        recordsDict,
        factoryStub,
        undefined,
        1
      );
      expect(categoryItem.isRootCategory).toEqual(false);
    });
  });

  describe("getSelf", () => {
    it("returns same object", () => {
      const categoryItem = new MutableCustomGridCategory(
        category,
        recordsDict,
        factoryStub,
        undefined,
        0
      );
      expect(categoryItem.getSelf()).toEqual(categoryItem);
    });
  });
});
