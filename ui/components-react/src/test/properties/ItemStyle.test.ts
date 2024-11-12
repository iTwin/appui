/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type {
  ItemColorOverrides,
  ItemStyle,
} from "../../components-react/properties/ItemStyle.js";
import {
  ItemStyleProvider,
  TableRowStyleProvider,
} from "../../components-react/properties/ItemStyle.js";

describe("ItemStyleProvider", () => {
  describe("createStyle", () => {
    it("returns correct style", () => {
      const style: ItemStyle = {
        isBold: true,
        isItalic: true,
      };

      const createdStyle = ItemStyleProvider.createStyle(style, false);

      expect(createdStyle.fontWeight).to.equal("bold");
      expect(createdStyle.fontStyle).to.equal("italic");
    });

    it("returns style with overridden colors", () => {
      const style: ItemStyle = {
        colorOverrides: {
          backgroundColor: 0xff0000,
          color: 0xaa0000,
        },
      };

      const createdStyle = ItemStyleProvider.createStyle(style, false);

      expect(createdStyle.backgroundColor).to.equal("#ff0000");
      expect(createdStyle.color).to.equal("#aa0000");
    });

    it("returns empty style when overridden colors is an empty object", () => {
      const style: ItemStyle = { colorOverrides: {} };

      const createdStyle = ItemStyleProvider.createStyle(style, false);

      expect(createdStyle.color).toEqual(undefined);
      expect(createdStyle.backgroundColor).toEqual(undefined);
    });

    it("returns style with overridden selection colors when cell is selected", () => {
      const style: ItemStyle = {
        colorOverrides: {
          backgroundColorSelected: 0xff0000,
          colorSelected: 0xaa0000,
        },
      };

      const createdStyle = ItemStyleProvider.createStyle(style, true);

      expect(createdStyle.backgroundColor).to.equal("#ff0000");
      expect(createdStyle.color).to.equal("#aa0000");
    });

    it("returns empty style when cell is selected, but selection colors are not overridden", () => {
      const style: ItemStyle = { colorOverrides: {} };

      const createdStyle = ItemStyleProvider.createStyle(style, true);

      expect(createdStyle.backgroundColor).toEqual(undefined);
      expect(createdStyle.color).toEqual(undefined);
    });
  });
});

describe("TableRowStyleProvider", () => {
  describe("createStyle", () => {
    it("returns correct style", () => {
      const colorOverrides: ItemColorOverrides = {
        backgroundColor: 0xff0000,
        color: 0xaa0000,
      };

      const style = TableRowStyleProvider.createStyle(colorOverrides);

      expect(style.backgroundColor).to.equal("#ff0000");
      expect(style.color).to.equal("#aa0000");
    });

    it("returns empty style if color overrides is empty", () => {
      const style = TableRowStyleProvider.createStyle({});

      expect(style.color).toEqual(undefined);
      expect(style.backgroundColor).toEqual(undefined);
    });
  });
});
