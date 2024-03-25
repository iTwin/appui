/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { expect } from "chai";
import sinon from "sinon";
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
      expect(renderer.canRender(record)).to.be.false;
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
        expect(getByText(expectedValue)).to.be.not.null;
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
  before(async () => {
    await TestUtils.initializeUiComponents();
  });

  after(() => {
    TestUtils.terminateUiComponents();
  });

  it("renders child element", () => {
    const { getByText } = render(
      <MultilineTextRenderer>Test</MultilineTextRenderer>
    );
    expect(getByText("Test")).to.be.not.null;
  });

  it("does not attempt to call `onExpansionToggled` callback that is not present and throw", () => {
    sinon.stub(HTMLElement.prototype, "clientWidth").get(() => 50);
    sinon.stub(HTMLElement.prototype, "scrollWidth").get(() => 100);
    const { getByText } = render(<MultilineTextRenderer />);
    fireEvent.click(getByText("property.expand"));
  });

  describe("collapsed", () => {
    it('doesn\'t show "See more" button when text fits in one line', () => {
      sinon.stub(HTMLElement.prototype, "clientWidth").get(() => 50);
      sinon.stub(HTMLElement.prototype, "scrollWidth").get(() => 50);
      const { queryByText } = render(<MultilineTextRenderer />);
      expect(queryByText("property.expand")).to.be.null;
    });

    it('shows "See more" button when text overflows', () => {
      sinon.stub(HTMLElement.prototype, "clientWidth").get(() => 50);
      sinon.stub(HTMLElement.prototype, "scrollWidth").get(() => 100);
      const { getByText } = render(<MultilineTextRenderer />);
      expect(getByText("property.expand")).to.be.not.null;
    });

    it('reports expansion toggle when "See more" button is pressed', () => {
      sinon.stub(HTMLElement.prototype, "clientWidth").get(() => 50);
      sinon.stub(HTMLElement.prototype, "scrollWidth").get(() => 100);
      const handleExpansionToggle = vi.fn();
      const { getByText } = render(
        <MultilineTextRenderer onExpansionToggled={handleExpansionToggle} />
      );
      fireEvent.click(getByText("property.expand"));
      expect(handleExpansionToggle).to.have.been.calledOnce;
    });
  });

  describe("expanded", () => {
    it('shows "See less" button when text component is expanded', () => {
      const { getByText } = render(<MultilineTextRenderer isExpanded={true} />);
      expect(getByText("property.collapse")).to.be.not.null;
    });

    it('reports expansion toggle when "See less" button is pressed', () => {
      sinon.stub(HTMLElement.prototype, "clientWidth").get(() => 50);
      sinon.stub(HTMLElement.prototype, "scrollWidth").get(() => 100);
      const handleExpansionToggle = vi.fn();
      const { getByText } = render(
        <MultilineTextRenderer
          isExpanded={true}
          onExpansionToggled={handleExpansionToggle}
        />
      );
      fireEvent.click(getByText("property.collapse"));
      expect(handleExpansionToggle).to.have.been.calledOnce;
    });
  });
});
