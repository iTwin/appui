/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { Id64 } from "@itwin/core-bentley";
import { render } from "@testing-library/react";
import type { PropertyValueRendererContext } from "../../../../components-react/properties/ValueRendererManager.js";
import TestUtils from "../../../TestUtils.js";
import { UrlPropertyValueRenderer } from "../../../../components-react/properties/renderers/value/UrlPropertyValueRenderer.js";
import type { PropertyRecord } from "@itwin/appui-abstract";
import * as moq from "typemoq";

describe("UrlPropertyValueRenderer", () => {
  describe("render", () => {
    it("should wrap text based on matcher", () => {
      const renderer = new UrlPropertyValueRenderer();
      const property: PropertyRecord = TestUtils.createURIProperty(
        "Category",
        "Test www.test.com"
      );

      property.links = {
        onClick: vi.fn(),
        matcher: () => [{ start: 0, end: 4 }],
      };

      const element = renderer.render(property, {
        textHighlighter: (text: string) => {
          if (text === "Test") {
            return <div>Wrapped-Test</div>;
          }
          return text;
        },
      });
      const { getByText } = render(<>{element}</>);

      getByText("Wrapped-Test");
    });

    it("renders URI property with highlighting and in anchored tag", () => {
      const renderer = new UrlPropertyValueRenderer();
      const stringProperty = TestUtils.createURIProperty(
        "Label",
        "Test property"
      );

      const textHighlighter = (text: string) => (
        <span>{`${text} Highlighted`}</span>
      );
      const renderContext: PropertyValueRendererContext = {
        textHighlighter,
      };

      const element = renderer.render(stringProperty, renderContext);
      const { getByText } = render(<>{element}</>);

      getByText("Test property Highlighted");
    });

    it("throws when trying to render array property", () => {
      const renderer = new UrlPropertyValueRenderer();
      const arrayProperty = TestUtils.createArrayProperty("LabelArray");
      expect(() => renderer.render(arrayProperty)).to.throw;
    });

    describe("onClick", () => {
      const originalLocation = location;
      const locationMockRef: moq.IMock<Location> =
        moq.Mock.ofInstance(location);

      beforeEach(() => {
        location = locationMockRef.object;
      });

      afterEach(() => {
        location = originalLocation;
        locationMockRef.reset();
      });

      it("renders as text when links are not found", () => {
        const renderer = new UrlPropertyValueRenderer();
        const stringProperty = TestUtils.createURIProperty(
          "Label",
          "Random Test property"
        );

        const element = renderer.render(stringProperty);
        const { queryByRole } = render(<>{element}</>);

        const link = queryByRole("link");
        expect(link).toEqual(null);
      });

      it("renders with pw: link", () => {
        const renderer = new UrlPropertyValueRenderer();
        const stringProperty = TestUtils.createURIProperty(
          "Label",
          "pw://Test property"
        );

        const element = renderer.render(stringProperty);
        const { getByRole } = render(<>{element}</>);

        getByRole("link", {
          name: "pw://Test property (opens in new tab)",
        });
      });

      it("renders with mailto: link", () => {
        const renderer = new UrlPropertyValueRenderer();
        const stringProperty = TestUtils.createURIProperty(
          "Label",
          "mailto:test@test.com"
        );

        const element = renderer.render(stringProperty);
        const { getByRole } = render(<>{element}</>);

        getByRole("link", {
          name: "mailto:test@test.com (opens in new tab)",
        });
      });

      it("renders as text with incorrect mailto:", () => {
        const renderer = new UrlPropertyValueRenderer();
        const stringProperty = TestUtils.createURIProperty(
          "Label",
          "mailto:Test property"
        );

        const element = renderer.render(stringProperty);
        const { queryByRole } = render(<>{element}</>);

        const link = queryByRole("link");
        expect(link).toEqual(null);
      });
    });
  });

  describe("canRender", () => {
    it("returns true for a URI property", () => {
      const renderer = new UrlPropertyValueRenderer();
      const property = TestUtils.createURIProperty("Category", "Value");
      expect(renderer.canRender(property)).toEqual(true);
    });

    it("returns false for properties that are not URI or string", () => {
      const renderer = new UrlPropertyValueRenderer();
      const arrayProperty = TestUtils.createArrayProperty("LabelArray");
      const structProperty = TestUtils.createStructProperty("NameStruct");
      const doubleProperty = TestUtils.createPrimitiveDoubleProperty(
        "Label",
        123.456
      );
      const navigationProperty = TestUtils.createNavigationProperty(
        "Category",
        { className: "", id: Id64.fromUint32Pair(1, 0) }
      );
      expect(renderer.canRender(arrayProperty)).toEqual(false);
      expect(renderer.canRender(structProperty)).toEqual(false);
      expect(renderer.canRender(doubleProperty)).toEqual(false);
      expect(renderer.canRender(navigationProperty)).toEqual(false);
    });
  });
});
