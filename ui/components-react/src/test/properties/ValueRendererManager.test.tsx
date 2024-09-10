/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { PropertyValueFormat } from "@itwin/appui-abstract";
import { render, screen } from "@testing-library/react";
import * as React from "react";
import type { IPropertyValueRenderer } from "../../components-react/properties/ValueRendererManager";
import { PropertyValueRendererManager } from "../../components-react/properties/ValueRendererManager";
import TestUtils from "../TestUtils";

describe("PropertyValueRendererManager", () => {
  let fakeRenderer: IPropertyValueRenderer;
  let fakeRenderer2: IPropertyValueRenderer;

  let manager: PropertyValueRendererManager;

  beforeEach(() => {
    fakeRenderer = {
      canRender: () => true,
      render: vi.fn(),
    };

    fakeRenderer2 = {
      canRender: () => true,
      render: vi.fn(),
    };

    manager = new PropertyValueRendererManager();
  });

  describe("registerRenderer", () => {
    it("adds renderer to the renderer list", () => {
      expect(manager.getRegisteredRenderer("string")).toEqual(undefined);

      manager.registerRenderer("string", fakeRenderer);

      expect(manager.getRegisteredRenderer("string")).toEqual(fakeRenderer);

      manager.unregisterRenderer("string");

      expect(manager.getRegisteredRenderer("string")).toEqual(undefined);
    });

    it("throws when trying to add a renderer to a type that already has it", () => {
      manager.registerRenderer("string", fakeRenderer);

      expect(manager.getRegisteredRenderer("string")).toEqual(fakeRenderer);
      expect(() => manager.registerRenderer("string", fakeRenderer)).to.throw();
    });

    it("overwrites old value when trying to add a renderer to a type that already has it and overwrite is set to true", () => {
      expect(manager.getRegisteredRenderer("string")).toEqual(undefined);

      manager.registerRenderer("string", fakeRenderer);

      expect(manager.getRegisteredRenderer("string")).toEqual(fakeRenderer);

      manager.registerRenderer("string", fakeRenderer2, true);

      expect(manager.getRegisteredRenderer("string")).toEqual(fakeRenderer2);
    });
  });

  describe("render", () => {
    it("looks for custom renderer specified in `property.renderer` before looking at `property.typename`", () => {
      const record = TestUtils.createPrimitiveStringProperty(
        "test_property",
        "Test"
      );
      record.property.renderer = { name: "stub1" };
      record.property.typename = "stub2";

      const rendererManager = new PropertyValueRendererManager();
      rendererManager.registerRenderer("stub1", fakeRenderer);
      rendererManager.registerRenderer("stub2", fakeRenderer2);

      rendererManager.render(record);

      expect(fakeRenderer.render).toHaveBeenCalledOnce();
      expect(fakeRenderer.render).toHaveBeenCalledWith(record, undefined);
      expect(fakeRenderer2.render).not.toBeCalled();
    });

    it("looks for custom renderer in property typename", () => {
      const record = TestUtils.createPrimitiveStringProperty(
        "test_property",
        "Test"
      );
      record.property.typename = "stub";

      const rendererManager = new PropertyValueRendererManager();
      rendererManager.registerRenderer("stub", fakeRenderer);

      rendererManager.render(record);

      expect(fakeRenderer.render).toHaveBeenCalledOnce();
      expect(fakeRenderer.render).toHaveBeenCalledWith(record, undefined);
    });

    it("renders a primitive type", () => {
      const value = manager.render(
        TestUtils.createPrimitiveStringProperty("Label", "Test prop")
      );

      render(<>{value}</>);
      expect(screen.getByTitle("Test prop")).to.exist;
    });

    it("renders an array type", () => {
      const value = manager.render(TestUtils.createArrayProperty("LabelArray"));

      render(<>{value}</>);

      expect(screen.getByText("string[]")).to.exist;
    });

    it("renders a struct type", () => {
      const value = manager.render(
        TestUtils.createStructProperty("TestStruct")
      );

      render(<>{value}</>);

      expect(screen.getByText("{struct}")).to.exist;
    });

    it("does not render unknown type", () => {
      const property = TestUtils.createStructProperty("TestStruct");
      property.value.valueFormat = 10 as PropertyValueFormat;

      const value = manager.render(property);

      const { container } = render(<>{value}</>);

      expect(container.innerHTML).to.be.empty;
    });

    it("renders merged properties", () => {
      const property = TestUtils.createPrimitiveStringProperty(
        "Label",
        "Test prop"
      );
      property.isMerged = true;

      const value = manager.render(property);

      render(<>{value}</>);

      expect(screen.getByText("property.varies")).to.exist;
    });

    it("renders merged properties before looking for custom renderer in property typename", () => {
      const property = TestUtils.createPrimitiveStringProperty(
        "Label",
        "Test prop"
      );
      property.property.typename = "stub";
      property.isMerged = true;

      const rendererManager = new PropertyValueRendererManager();
      rendererManager.registerRenderer("stub", fakeRenderer);

      const value = rendererManager.render(property);
      render(<>{value}</>);
      expect(screen.getByText("property.varies")).to.exist;
      expect(fakeRenderer.render).not.toBeCalled();
    });
  });
});
