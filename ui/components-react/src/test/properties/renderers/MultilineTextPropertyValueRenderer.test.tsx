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
      expect(renderer.canRender(record)).to.be.true;
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

      it("renders property records", () => {
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

  afterEach(() => {
    sinon.restore();
  });

  it("renders child element", () => {
    const { getByText } = render(
      <MultilineTextRenderer>Test</MultilineTextRenderer>
    );
    expect(getByText("Test")).to.be.not.null;
  });

  it("reports element's height", () => {
    sinon.stub(HTMLElement.prototype, "offsetHeight").get(() => 50);
    const handleHeightChange = sinon.fake();
    render(<MultilineTextRenderer onHeightChanged={handleHeightChange} />);
    expect(handleHeightChange).to.have.been.calledOnceWith(50);
  });

  it("doesn't report element's height change when height hasn't changed", () => {
    sinon.stub(HTMLElement.prototype, "offsetHeight").get(() => 10);
    const handleHeightChange = sinon.fake();
    const { rerender } = render(
      <MultilineTextRenderer onHeightChanged={handleHeightChange} />
    );

    sinon.restore();
    sinon.stub(HTMLElement.prototype, "offsetHeight").get(() => 15);
    rerender(<MultilineTextRenderer onHeightChanged={handleHeightChange} />);
    expect(handleHeightChange).to.have.been.calledOnceWith(27);
  });

  it("reports element's height change", () => {
    sinon.stub(HTMLElement.prototype, "offsetHeight").get(() => 50);
    const handleHeightChange = sinon.fake();
    const { rerender } = render(
      <MultilineTextRenderer onHeightChanged={handleHeightChange} />
    );
    expect(handleHeightChange).to.have.been.calledWith(50);

    sinon.restore();
    sinon.stub(HTMLElement.prototype, "offsetHeight").get(() => 5);
    rerender(<MultilineTextRenderer onHeightChanged={handleHeightChange} />);
    expect(handleHeightChange).to.have.been.calledWith(27);
    expect(handleHeightChange).to.have.been.calledTwice;
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
      const handleExpansionToggle = sinon.fake();
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
      const handleExpansionToggle = sinon.fake();
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
