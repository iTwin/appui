/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { Orientation } from "@itwin/core-react";
import { ArrayPropertyValueRenderer } from "../../../../components-react/properties/renderers/value/ArrayPropertyValueRenderer.js";
import { PropertyContainerType } from "../../../../components-react/properties/ValueRendererManager.js";
import TestUtils, { userEvent } from "../../../TestUtils.js";
import { render, screen } from "@testing-library/react";

describe("ArrayPropertyValueRenderer", () => {
  let theUserTo: ReturnType<typeof userEvent.setup>;
  beforeEach(() => {
    theUserTo = userEvent.setup();
  });

  describe("render", () => {
    it("renders non empty array property", () => {
      const renderer = new ArrayPropertyValueRenderer();
      const stringProperty = TestUtils.createPrimitiveStringProperty(
        "Label",
        "Test property"
      );
      const arrayProperty = TestUtils.createArrayProperty("LabelArray", [
        stringProperty,
      ]);

      const element = renderer.render(arrayProperty);

      expect(element).toEqual("string[1]");
    });

    it("renders empty array property", () => {
      const renderer = new ArrayPropertyValueRenderer();
      const arrayProperty = TestUtils.createArrayProperty("LabelArray");

      const element = renderer.render(arrayProperty);

      expect(element).toEqual("string[]");
    });

    it("renders default way if empty context is provided", () => {
      const renderer = new ArrayPropertyValueRenderer();
      const arrayProperty = TestUtils.createArrayProperty("LabelArray");

      const element = renderer.render(arrayProperty, {});

      expect(element).toEqual("string[]");
    });

    it("renders array with Table renderer if container type is Table", async () => {
      const dialogSpy = vi.fn();
      const renderer = new ArrayPropertyValueRenderer();
      const arrayProperty = TestUtils.createArrayProperty("LabelArray");

      const element = renderer.render(arrayProperty, {
        containerType: PropertyContainerType.Table,
        orientation: Orientation.Vertical,
        onDialogOpen: dialogSpy,
      });
      render(<div>{element}</div>);

      await theUserTo.click(screen.getByTitle("View [] in more detail."));
      expect(dialogSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          content: expect.objectContaining({
            props: expect.objectContaining({
              orientation: Orientation.Vertical,
            }),
          }),
        })
      );
    });

    it("defaults to horizontal orientation when rendering for a table without specified orientation", async () => {
      const dialogSpy = vi.fn();
      const renderer = new ArrayPropertyValueRenderer();
      const arrayProperty = TestUtils.createArrayProperty("LabelArray");

      const element = renderer.render(arrayProperty, {
        containerType: PropertyContainerType.Table,
        onDialogOpen: dialogSpy,
      });
      render(<div>{element}</div>);

      await theUserTo.click(screen.getByRole("link"));

      expect(dialogSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          content: expect.objectContaining({
            props: expect.objectContaining({
              orientation: Orientation.Horizontal,
            }),
          }),
        })
      );
    });

    it("throws when trying to render primitive property", () => {
      const renderer = new ArrayPropertyValueRenderer();
      const stringProperty = TestUtils.createPrimitiveStringProperty(
        "Label",
        "Test property"
      );
      expect(() => renderer.render(stringProperty)).to.throw;
    });

    it("renders as empty string when container type is property pane", () => {
      const renderer = new ArrayPropertyValueRenderer();
      const stringProperty = TestUtils.createPrimitiveStringProperty(
        "Label",
        "Test property"
      );
      const arrayProperty = TestUtils.createArrayProperty("LabelArray", [
        stringProperty,
      ]);

      const element = renderer.render(arrayProperty, {
        containerType: PropertyContainerType.PropertyPane,
      });

      expect(element).toEqual("");
    });
  });

  describe("canRender", () => {
    it("returns true for an array property", () => {
      const renderer = new ArrayPropertyValueRenderer();
      const arrayProperty = TestUtils.createArrayProperty("LabelArray");
      expect(renderer.canRender(arrayProperty)).toEqual(true);
    });

    it("returns false for primitive and struct property", () => {
      const renderer = new ArrayPropertyValueRenderer();
      const stringProperty = TestUtils.createPrimitiveStringProperty(
        "Label",
        "Test property"
      );
      const structProperty = TestUtils.createStructProperty("NameStruct");
      expect(renderer.canRender(stringProperty)).toEqual(false);
      expect(renderer.canRender(structProperty)).toEqual(false);
    });
  });
});
