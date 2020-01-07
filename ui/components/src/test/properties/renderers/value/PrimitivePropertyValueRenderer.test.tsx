/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { expect } from "chai";
import { render } from "@testing-library/react";
import * as React from "react";
import * as sinon from "sinon";
import TestUtils from "../../../TestUtils";
import { PrimitivePropertyValueRenderer } from "../../../../ui-components";

describe("PrimitivePropertyValueRenderer", () => {
  describe("render", () => {
    it("renders primitive property", () => {
      const renderer = new PrimitivePropertyValueRenderer();
      const stringProperty = TestUtils.createPrimitiveStringProperty("Label", "Test property");

      const element = renderer.render(stringProperty);
      const renderedElement = render(<>{element}</>);
      renderedElement.getByText("Test property");
    });

    it("renders primitive property wrapped in an anchored tag when property record has it", () => {
      const renderer = new PrimitivePropertyValueRenderer();
      const stringProperty = TestUtils.createPrimitiveStringProperty("Label", "Test property");
      stringProperty.links = { onClick: sinon.spy() };

      const element = renderer.render(stringProperty);
      const renderedElement = render(<>{element}</>);

      renderedElement.getByText("Test property");

      expect(renderedElement.container.getElementsByClassName("core-underlined-button")).to.not.be.empty;
    });

    it("throws when trying to render array property", () => {
      const renderer = new PrimitivePropertyValueRenderer();
      const arrayProperty = TestUtils.createArrayProperty("LabelArray");
      expect(() => renderer.render(arrayProperty)).to.throw;
    });
  });

  describe("canRender", () => {
    it("returns true for a primitive property", () => {
      const renderer = new PrimitivePropertyValueRenderer();
      const stringProperty = TestUtils.createPrimitiveStringProperty("Label", "Test property");
      expect(renderer.canRender(stringProperty)).to.be.true;
    });

    it("returns false for array and struct property", () => {
      const renderer = new PrimitivePropertyValueRenderer();
      const arrayProperty = TestUtils.createArrayProperty("LabelArray");
      const structProperty = TestUtils.createStructProperty("NameStruct");
      expect(renderer.canRender(arrayProperty)).to.be.false;
      expect(renderer.canRender(structProperty)).to.be.false;
    });
  });
});
