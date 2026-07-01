/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render, waitFor } from "@testing-library/react";
import { MergedPropertyValueRenderer } from "../../../../components-react/properties/renderers/value/MergedPropertyValueRenderer.js";
import TestUtils from "../../../TestUtils.js";
import { MERGED_VALUE } from "../../../../components-react/new-editors/values/ValueUtilities.js";

describe("MergedPropertyValueRenderer", () => {
  describe("render", () => {
    it("renders merged property as '--'", async () => {
      const renderer = new MergedPropertyValueRenderer();
      const property = TestUtils.createPrimitiveStringProperty("a", "b");
      property.isMerged = true;
      const { getByText } = render(renderer.render(property));
      await waitFor(() => getByText(MERGED_VALUE));
    });

    it("renders '-- unit' when displayValue starts with '--'", async () => {
      const renderer = new MergedPropertyValueRenderer();
      const property = TestUtils.createPrimitiveStringProperty(
        "Length",
        "unused",
        `${MERGED_VALUE} ft`
      );
      property.isMerged = true;
      const { getByText } = render(renderer.render(property));
      await waitFor(() => getByText(`${MERGED_VALUE} ft`));
    });

    it("renders '--' when displayValue does not start with '--'", async () => {
      const renderer = new MergedPropertyValueRenderer();
      const property = TestUtils.createPrimitiveStringProperty(
        "Length",
        "unused",
        "14.23 ft"
      );
      property.isMerged = true;
      const { getByText } = render(renderer.render(property));
      await waitFor(() => getByText(MERGED_VALUE));
    });
  });

  describe("canRender", () => {
    it("returns true for a merged primitive property", () => {
      const renderer = new MergedPropertyValueRenderer();
      const property = TestUtils.createPrimitiveStringProperty("a", "b");
      property.isMerged = true;

      expect(renderer.canRender(property)).toEqual(true);
    });

    it("returns false for merged non primitive properties", () => {
      const renderer = new MergedPropertyValueRenderer();
      const arrayProperty = TestUtils.createArrayProperty("LabelArray");
      arrayProperty.isMerged = true;
      const structProperty = TestUtils.createStructProperty("NameStruct");
      structProperty.isMerged = true;

      expect(renderer.canRender(arrayProperty)).toEqual(false);
      expect(renderer.canRender(structProperty)).toEqual(false);
    });

    it("returns false for non merged properties", () => {
      const renderer = new MergedPropertyValueRenderer();
      const property = TestUtils.createPrimitiveStringProperty("a", "b");

      expect(renderer.canRender(property)).toEqual(false);
    });
  });
});
