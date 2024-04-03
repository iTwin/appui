/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import {
  MultilineTextPropertyValueRenderer,
  MultilineTextRenderer,
} from "../../../components-react/properties/renderers/value/MultilineTextPropertyValueRenderer";
import TestUtils, { styleMatch } from "../../TestUtils";
import { Id64 } from "@itwin/core-bentley";

describe("MultilineTextPropertyValueRenderer", () => {
  const renderer = new MultilineTextPropertyValueRenderer();

  describe("canRender", () => {
    it("can render when record is value primitive and renderer name is multiline", () => {
      const record = TestUtils.createMultilineTextPropertyRecord(
        TestUtils.createPrimitiveStringProperty("test", "test")
      );
      expect(renderer.canRender(record)).toEqual(true);
    });

    it("is not able to render when record value is not primitive", () => {
      const record = TestUtils.createArrayProperty("test");
      expect(renderer.canRender(record)).toEqual(false);
    });
  });

  describe("render", () => {
    [
      {
        propertyRecord: TestUtils.createNavigationProperty(
          "test",
          {
            className: "",
            id: Id64.fromUint32Pair(1, 0),
          },
          "test"
        ),
        expectedValue: "test",
      },
      {
        propertyRecord: TestUtils.createPrimitiveDoubleProperty("test", 0),
        expectedValue: "0",
      },
      {
        propertyRecord: TestUtils.createPrimitiveStringProperty("test", "test"),
        expectedValue: "test",
      },
    ].forEach(({ propertyRecord, expectedValue }) => {
      const record =
        TestUtils.createMultilineTextPropertyRecord(propertyRecord);

      it(`renders ${propertyRecord.property.typename} property record`, () => {
        const { getByText } = render(<>{renderer.render(record)}</>);
        expect(getByText(expectedValue)).toBeTruthy();
      });
    });

    it("forwards context to props", () => {
      const record = TestUtils.createMultilineTextPropertyRecord(
        TestUtils.createPrimitiveStringProperty("test", "test")
      );
      render(<>{renderer.render(record, { style: { color: "red" } })}</>);
      expect(screen.getByTitle("test")).to.satisfy(
        styleMatch({ color: "red" })
      );
    });
  });
});

describe("MultilineTextRenderer", () => {
  it("renders child element", () => {
    const { getByText } = render(
      <MultilineTextRenderer>Test</MultilineTextRenderer>
    );
    expect(getByText("Test")).toBeTruthy();
  });

  it("does not attempt to call `onExpansionToggled` callback that is not present and throw", () => {
    vi.spyOn(HTMLElement.prototype, "clientWidth", "get").mockImplementation(
      () => 50
    );
    vi.spyOn(HTMLElement.prototype, "scrollWidth", "get").mockImplementation(
      () => 100
    );
    const { getByText } = render(<MultilineTextRenderer />);
    fireEvent.click(getByText("property.expand"));
  });

  describe("collapsed", () => {
    it('doesn\'t show "See more" button when text fits in one line', () => {
      vi.spyOn(HTMLElement.prototype, "clientWidth", "get").mockImplementation(
        () => 50
      );
      vi.spyOn(HTMLElement.prototype, "scrollWidth", "get").mockImplementation(
        () => 50
      );
      const { queryByText } = render(<MultilineTextRenderer />);
      expect(queryByText("property.expand")).toEqual(null);
    });

    it('shows "See more" button when text overflows', () => {
      vi.spyOn(HTMLElement.prototype, "clientWidth", "get").mockImplementation(
        () => 50
      );
      vi.spyOn(HTMLElement.prototype, "scrollWidth", "get").mockImplementation(
        () => 100
      );
      const { getByText } = render(<MultilineTextRenderer />);
      expect(getByText("property.expand")).toBeTruthy();
    });

    it('reports expansion toggle when "See more" button is pressed', () => {
      vi.spyOn(HTMLElement.prototype, "clientWidth", "get").mockImplementation(
        () => 50
      );
      vi.spyOn(HTMLElement.prototype, "scrollWidth", "get").mockImplementation(
        () => 100
      );
      const handleExpansionToggle = vi.fn();
      const { getByText } = render(
        <MultilineTextRenderer onExpansionToggled={handleExpansionToggle} />
      );
      fireEvent.click(getByText("property.expand"));
      expect(handleExpansionToggle).toHaveBeenCalledOnce();
    });
  });

  describe("expanded", () => {
    it('shows "See less" button when text component is expanded', () => {
      const { getByText } = render(<MultilineTextRenderer isExpanded={true} />);
      expect(getByText("property.collapse")).toBeTruthy();
    });

    it('reports expansion toggle when "See less" button is pressed', () => {
      vi.spyOn(HTMLElement.prototype, "clientWidth", "get").mockImplementation(
        () => 50
      );
      vi.spyOn(HTMLElement.prototype, "scrollWidth", "get").mockImplementation(
        () => 100
      );
      const handleExpansionToggle = vi.fn();
      const { getByText } = render(
        <MultilineTextRenderer
          isExpanded={true}
          onExpansionToggled={handleExpansionToggle}
        />
      );
      fireEvent.click(getByText("property.collapse"));
      expect(handleExpansionToggle).toHaveBeenCalledOnce();
    });
  });
});
