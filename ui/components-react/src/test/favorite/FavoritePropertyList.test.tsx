/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as faker from "faker";
import * as React from "react";
import { PropertyRecord } from "@itwin/appui-abstract";
import type {
  PropertyCategory,
  PropertyData,
} from "../../components-react/propertygrid/PropertyDataProvider.js";
import { FavoritePropertyList } from "../../components-react/favorite/FavoritePropertyList.js";
import TestUtils, { childStructure } from "../TestUtils.js";
import { Orientation } from "@itwin/core-react";
import { PropertyValueRendererManager } from "../../components-react/properties/ValueRendererManager.js";
import { render, screen } from "@testing-library/react";

describe("FavoritePropertyList", () => {
  let data: PropertyData;

  beforeEach(() => {
    const categories: PropertyCategory[] = [
      { name: "Favorite", label: "Group 1", expand: true },
    ];
    const records: PropertyRecord[] = [
      TestUtils.createPrimitiveStringProperty("CADID1", "0000 0005 00E0 02D8"),
      TestUtils.createPrimitiveStringProperty("CADID2", "0000 0005 00E0 02D9"),
    ];

    data = {
      label: PropertyRecord.fromString(faker.random.word()),
      description: faker.random.words(),
      categories,
      records: {
        Favorite: records,
      },
    };
  });

  describe("rendering", () => {
    it("renders correctly with label as string", async () => {
      vi.spyOn(Element.prototype, "getBoundingClientRect").mockImplementation(
        () => DOMRect.fromRect({ x: 0, y: 0, height: 250, width: 400 })
      );

      const { container } = render(
        <FavoritePropertyList propertyData={data} />
      );

      expect(screen.getByTitle("CADID1")).toEqual(screen.getByText("CADID1"));
      expect(screen.getByTitle("0000 0005 00E0 02D8")).toEqual(
        screen.getByText("0000 0005 00E0 02D8")
      );
      expect(screen.getByTitle("CADID2")).toEqual(screen.getByText("CADID2"));

      expect(screen.getByTitle("0000 0005 00E0 02D9")).toEqual(
        screen.getByText("0000 0005 00E0 02D9")
      );
      expect(container).to.satisfy(
        childStructure(
          ".components-favorite-property-list .components-property-list--horizontal .components-property-record--horizontal"
        )
      );
    });

    it("renders correctly in vertical orientation", async () => {
      vi.spyOn(Element.prototype, "getBoundingClientRect").mockImplementation(
        () => DOMRect.fromRect({ x: 0, y: 0, height: 250, width: 400 })
      );
      const propertyValueRendererManager = new PropertyValueRendererManager();
      const { container } = render(
        <FavoritePropertyList
          propertyData={data}
          orientation={Orientation.Vertical}
          propertyValueRendererManager={propertyValueRendererManager}
        />
      );

      expect(container).to.satisfy(
        childStructure(
          ".components-favorite-property-list  .components-property-list--vertical .components-property-record--vertical"
        )
      );
    });

    it("renders null if no Favorites", async () => {
      delete data.records.Favorite;
      const { container } = render(
        <FavoritePropertyList propertyData={data} />
      );
      expect(container).to.have.property("innerHTML", "");
    });
  });
});
