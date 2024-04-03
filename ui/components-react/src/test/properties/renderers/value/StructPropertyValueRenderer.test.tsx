/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { Orientation } from "@itwin/core-react";
import { StructPropertyValueRenderer } from "../../../../components-react/properties/renderers/value/StructPropertyValueRenderer";
import { PropertyContainerType } from "../../../../components-react/properties/ValueRendererManager";
import TestUtils, { userEvent } from "../../../TestUtils";
import { render, screen } from "@testing-library/react";

describe("StructPropertyValueRenderer", () => {
  let theUserTo: ReturnType<typeof userEvent.setup>;
  beforeEach(() => {
    theUserTo = userEvent.setup();
  });

  describe("render", () => {
    it("renders struct property", () => {
      const renderer = new StructPropertyValueRenderer();
      const structProperty = TestUtils.createStructProperty("NameStruct");

      const element = renderer.render(structProperty);

      expect(element).to.be.eq("{struct}");
    });

    it("renders default way when provided with empty context", () => {
      const renderer = new StructPropertyValueRenderer();
      const structProperty = TestUtils.createStructProperty("NameStruct");

      const element = renderer.render(structProperty, {});

      expect(element).to.be.eq("{struct}");
    });

    it("renders struct with Table renderer if container type is Table", async () => {
      const dialogSpy = vi.fn();
      const renderer = new StructPropertyValueRenderer();
      const structProperty = TestUtils.createStructProperty("NameStruct");

      const element = renderer.render(structProperty, {
        containerType: PropertyContainerType.Table,
        orientation: Orientation.Vertical,
        onDialogOpen: dialogSpy,
      });
      render(<>{element}</>);
      await theUserTo.click(screen.getByTitle("View {struct} in more detail."));
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
      const renderer = new StructPropertyValueRenderer();
      const structProperty = TestUtils.createStructProperty("NameStruct");

      const element = renderer.render(structProperty, {
        containerType: PropertyContainerType.Table,
        onDialogOpen: dialogSpy,
      });
      render(<>{element}</>);

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
      const renderer = new StructPropertyValueRenderer();
      const stringProperty = TestUtils.createPrimitiveStringProperty(
        "Label",
        "Test property"
      );
      expect(() => renderer.render(stringProperty)).to.throw;
    });

    it("renders as empty string when container type is property pane", () => {
      const renderer = new StructPropertyValueRenderer();
      const structProperty = TestUtils.createStructProperty("NameStruct");

      const element = renderer.render(structProperty, {
        containerType: PropertyContainerType.PropertyPane,
      });

      expect(element).to.be.eq("");
    });
  });

  describe("canRender", () => {
    it("returns true for an struct property", () => {
      const renderer = new StructPropertyValueRenderer();
      const structProperty = TestUtils.createStructProperty("NameStruct");
      expect(renderer.canRender(structProperty)).toEqual(true);
    });

    it("returns false for array and struct property", () => {
      const renderer = new StructPropertyValueRenderer();
      const stringProperty = TestUtils.createPrimitiveStringProperty(
        "Label",
        "Test property"
      );
      const arrayProperty = TestUtils.createArrayProperty("LabelArray");
      expect(renderer.canRender(stringProperty)).toEqual(false);
      expect(renderer.canRender(arrayProperty)).toEqual(false);
    });
  });
});
