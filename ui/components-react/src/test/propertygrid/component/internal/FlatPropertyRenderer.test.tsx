/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { expect } from "chai";
import * as React from "react";
import sinon from "sinon";
import type { PropertyRecord } from "@itwin/appui-abstract";
import { Orientation } from "@itwin/core-react";
import { fireEvent, render, screen } from "@testing-library/react";
import { PropertyValueRendererManager } from "../../../../components-react/properties/ValueRendererManager";
import { FlatPropertyRenderer } from "../../../../components-react/propertygrid/internal/flat-properties/FlatPropertyRenderer";
import TestUtils, { selectorMatches, userEvent } from "../../../TestUtils";

describe("FlatPropertyRenderer", () => {
  let theUserTo: ReturnType<typeof userEvent.setup>;
  let propertyRecord: PropertyRecord;

  before(async () => {
    await TestUtils.initializeUiComponents();
  });

  after(() => {
    TestUtils.terminateUiComponents();
  });

  beforeEach(() => {
    theUserTo = userEvent.setup();
    propertyRecord = TestUtils.createPrimitiveStringProperty("Label", "Model");
  });

  it("updates displayed value if propertyRecord changes", async () => {
    const originalValue = "OriginalValue";
    const recordValue = "ChangedValue";

    propertyRecord = TestUtils.createPrimitiveStringProperty(
      "Label",
      originalValue
    );

    const { rerender } = render(
      <FlatPropertyRenderer
        orientation={Orientation.Horizontal}
        propertyRecord={propertyRecord}
        isExpanded={false}
        onExpansionToggled={() => {}}
      />
    );

    expect(screen.getByTitle(originalValue)).to.exist;

    rerender(
      <FlatPropertyRenderer
        orientation={Orientation.Horizontal}
        propertyRecord={TestUtils.createPrimitiveStringProperty(
          "Label",
          recordValue
        )}
        isExpanded={false}
        onExpansionToggled={() => {}}
      />
    );

    expect(screen.getByTitle(recordValue)).to.exist;
    expect(screen.queryByTitle(originalValue)).to.be.null;
  });

  it("uses provided propertyValueRendererManager", async () => {
    class RendererManager extends PropertyValueRendererManager {
      public override render({}) {
        return "Test";
      }
    }

    const { getByText } = render(
      <FlatPropertyRenderer
        orientation={Orientation.Horizontal}
        propertyRecord={propertyRecord}
        propertyValueRendererManager={new RendererManager()}
        isExpanded={false}
        onExpansionToggled={() => {}}
      />
    );

    expect(getByText("Test")).to.be.not.null;
  });

  it("highlights matches in primitive values", async () => {
    const { container } = render(
      <FlatPropertyRenderer
        orientation={Orientation.Horizontal}
        propertyRecord={TestUtils.createPrimitiveStringProperty("Label", "abc")}
        highlight={{
          highlightedText: "b",
          applyOnLabel: true,
          applyOnValue: true,
        }}
        isExpanded={false}
        onExpansionToggled={() => {}}
      />
    );
    const highlightedNodes = container.querySelectorAll("mark");
    expect(highlightedNodes.length).to.eq(2);
  });

  it("renders as primitive value if property is an empty array", () => {
    propertyRecord = TestUtils.createArrayProperty("EmptyArray");

    render(
      <FlatPropertyRenderer
        orientation={Orientation.Horizontal}
        propertyRecord={propertyRecord}
        isExpanded={false}
        onExpansionToggled={() => {}}
      />
    );

    expect(screen.getByTitle("EmptyArray")).satisfy(
      selectorMatches(
        [
          ".components-primitive-property-label-renderer",
          ".components-property-label-renderer",
        ].join(" ")
      )
    );
  });

  it("highlights matches in empty array values", () => {
    const { container } = render(
      <FlatPropertyRenderer
        orientation={Orientation.Horizontal}
        propertyRecord={TestUtils.createArrayProperty("EmptyArray")}
        highlight={{
          highlightedText: "rr",
          applyOnLabel: true,
          applyOnValue: true,
        }}
        isExpanded={false}
        onExpansionToggled={() => {}}
      />
    );
    const highlightedNode = container.querySelector("mark");
    expect(highlightedNode).to.be.not.null;
    expect(highlightedNode!.textContent).to.eq("rr");
  });

  it("renders array as a non primitive value", () => {
    propertyRecord = TestUtils.createArrayProperty("StringArray", [
      TestUtils.createPrimitiveStringProperty("Label", "Model"),
    ]);

    render(
      <FlatPropertyRenderer
        orientation={Orientation.Horizontal}
        propertyRecord={propertyRecord}
        isExpanded={false}
        onExpansionToggled={() => {}}
      />
    );

    expect(screen.getByTitle("StringArray (1)")).satisfy(
      selectorMatches(
        [
          ".components-nonprimitive-property-label-renderer",
          ".components-property-label-renderer",
        ].join(" ")
      )
    );
  });

  it("renders array as a non primitive value when renderer assigned but not registered", () => {
    propertyRecord = TestUtils.createArrayProperty("StringArray", [
      TestUtils.createPrimitiveStringProperty("Label", "Model"),
    ]);
    propertyRecord.property.renderer = { name: "nonRegisteredRenderer" };

    render(
      <FlatPropertyRenderer
        orientation={Orientation.Horizontal}
        propertyRecord={propertyRecord}
        isExpanded={false}
        onExpansionToggled={() => {}}
      />
    );

    expect(screen.getByTitle("StringArray (1)")).satisfy(
      selectorMatches(
        [
          ".components-nonprimitive-property-label-renderer",
          ".components-property-label-renderer",
        ].join(" ")
      )
    );
  });

  it("renders array as a primitive value when a custom property renderer is registered", () => {
    propertyRecord = TestUtils.createArrayProperty("StringArray", [
      TestUtils.createPrimitiveStringProperty("Label", "Model"),
    ]);
    propertyRecord.property.renderer = { name: "CustomArrayRenderer" };

    const customRenderer = {
      canRender: () => true,
      render: () => <div>My value</div>,
    };

    PropertyValueRendererManager.defaultManager.registerRenderer(
      "CustomArrayRenderer",
      customRenderer
    );

    render(
      <FlatPropertyRenderer
        orientation={Orientation.Horizontal}
        propertyRecord={propertyRecord}
        isExpanded={false}
        onExpansionToggled={() => {}}
      />
    );

    expect(screen.getByTitle("StringArray")).satisfy(
      selectorMatches(
        [
          ".components-primitive-property-label-renderer",
          ".components-property-label-renderer",
        ].join(" ")
      )
    );
  });

  it("renders array as a primitive value when a custom typename renderer is registered", () => {
    propertyRecord = TestUtils.createArrayProperty("StringArray", [
      TestUtils.createPrimitiveStringProperty("Label", "Model"),
    ]);
    propertyRecord.property.typename = "customArrayTypename";

    const customRenderer = {
      canRender: () => true,
      render: () => <div>My value</div>,
    };

    PropertyValueRendererManager.defaultManager.registerRenderer(
      "customArrayTypename",
      customRenderer
    );

    render(
      <FlatPropertyRenderer
        orientation={Orientation.Horizontal}
        propertyRecord={propertyRecord}
        isExpanded={false}
        onExpansionToggled={() => {}}
        highlight={{
          highlightedText: "rr",
          applyOnLabel: true,
          applyOnValue: true,
        }}
      />
    );

    expect(screen.getByTitle("StringArray")).satisfy(
      selectorMatches(
        [
          ".components-primitive-property-label-renderer",
          ".components-property-label-renderer",
        ].join(" ")
      )
    );
  });

  it("renders struct as a non primitive value", () => {
    propertyRecord = TestUtils.createStructProperty("Struct");

    render(
      <FlatPropertyRenderer
        orientation={Orientation.Horizontal}
        propertyRecord={propertyRecord}
        isExpanded={false}
        onExpansionToggled={() => {}}
      />
    );

    expect(screen.getByTitle("Struct")).satisfy(
      selectorMatches(
        [
          ".components-nonprimitive-property-label-renderer",
          ".components-property-label-renderer",
        ].join(" ")
      )
    );
  });

  it("renders struct as a non primitive value when renderer assigned but not registered", () => {
    propertyRecord = TestUtils.createStructProperty("Struct");
    propertyRecord.property.renderer = { name: "nonRegisteredRenderer" };

    render(
      <FlatPropertyRenderer
        orientation={Orientation.Horizontal}
        propertyRecord={propertyRecord}
        isExpanded={false}
        onExpansionToggled={() => {}}
      />
    );

    expect(screen.getByTitle("Struct")).satisfy(
      selectorMatches(
        [
          ".components-nonprimitive-property-label-renderer",
          ".components-property-label-renderer",
        ].join(" ")
      )
    );
  });

  it("renders struct as a primitive value when a custom property renderer is registered", () => {
    propertyRecord = TestUtils.createStructProperty("Struct");
    propertyRecord.property.renderer = { name: "CustomStructRenderer" };

    const customRenderer = {
      canRender: () => true,
      render: () => <div>My value</div>,
    };

    PropertyValueRendererManager.defaultManager.registerRenderer(
      "CustomStructRenderer",
      customRenderer
    );

    render(
      <FlatPropertyRenderer
        orientation={Orientation.Horizontal}
        propertyRecord={propertyRecord}
        isExpanded={false}
        onExpansionToggled={() => {}}
      />
    );

    expect(screen.getByTitle("Struct")).satisfy(
      selectorMatches(
        [
          ".components-primitive-property-label-renderer",
          ".components-property-label-renderer",
        ].join(" ")
      )
    );
  });

  it("renders struct as a primitive value when a custom typename renderer is registered", () => {
    propertyRecord = TestUtils.createStructProperty("Struct");
    propertyRecord.property.typename = "customStructTypename";

    const customRenderer = {
      canRender: () => true,
      render: () => <div>My value</div>,
    };

    PropertyValueRendererManager.defaultManager.registerRenderer(
      "customStructTypename",
      customRenderer
    );

    render(
      <FlatPropertyRenderer
        orientation={Orientation.Horizontal}
        propertyRecord={propertyRecord}
        isExpanded={false}
        onExpansionToggled={() => {}}
        highlight={{
          highlightedText: "rr",
          applyOnLabel: true,
          applyOnValue: true,
        }}
      />
    );

    expect(screen.getByTitle("Struct")).satisfy(
      selectorMatches(
        [
          ".components-primitive-property-label-renderer",
          ".components-property-label-renderer",
        ].join(" ")
      )
    );
  });

  it("renders an editor correctly", () => {
    render(
      <FlatPropertyRenderer
        orientation={Orientation.Horizontal}
        propertyRecord={propertyRecord}
        isEditing={true}
        isExpanded={false}
        onExpansionToggled={() => {}}
      />
    );

    expect(screen.getByRole("textbox")).satisfy(
      selectorMatches(".components-text-editor")
    );
  });

  it("calls onEditCommit on Enter key when editing", async () => {
    const spyMethod = sinon.spy();
    const propertyRenderer = render(
      <FlatPropertyRenderer
        category={{ name: "Cat1", label: "Category 1", expand: true }}
        orientation={Orientation.Horizontal}
        propertyRecord={propertyRecord}
        isEditing={true}
        onEditCommit={spyMethod}
        isExpanded={false}
        onExpansionToggled={() => {}}
      />
    );

    const inputNode = propertyRenderer.container.querySelector("input");
    expect(inputNode).not.to.be.null;

    fireEvent.keyDown(inputNode as HTMLElement, { key: "Enter" });
    await TestUtils.flushAsyncOperations();
    expect(spyMethod.calledOnce).to.be.true;
  });

  it("does not attempt to call onEditCommit callback when it is not present and throw", async () => {
    const propertyRenderer = render(
      <FlatPropertyRenderer
        category={{ name: "Cat1", label: "Category 1", expand: true }}
        orientation={Orientation.Horizontal}
        propertyRecord={propertyRecord}
        isEditing={true}
        isExpanded={false}
        onExpansionToggled={() => {}}
      />
    );

    const inputNode = propertyRenderer.container.querySelector("input");
    expect(inputNode).not.to.be.null;

    fireEvent.keyDown(inputNode as HTMLElement, { key: "Enter" });
    await TestUtils.flushAsyncOperations();
  });

  it("calls onEditCancel on Escape key when editing", () => {
    const spyMethod = sinon.spy();
    const propertyRenderer = render(
      <FlatPropertyRenderer
        orientation={Orientation.Horizontal}
        propertyRecord={propertyRecord}
        isEditing={true}
        onEditCancel={spyMethod}
        isExpanded={false}
        onExpansionToggled={() => {}}
      />
    );

    const inputNode = propertyRenderer.container.querySelector("input");
    expect(inputNode).not.to.be.null;

    fireEvent.keyDown(inputNode as HTMLElement, { key: "Escape" });
    expect(spyMethod.calledOnce).to.be.true;
  });

  it("does not remove Editor on Enter if callback is not provided", async () => {
    render(
      <FlatPropertyRenderer
        orientation={Orientation.Horizontal}
        propertyRecord={propertyRecord}
        isEditing={true}
        isExpanded={false}
        onExpansionToggled={() => {}}
      />
    );

    await theUserTo.type(screen.getByRole("textbox"), "{Enter}");
    expect(screen.getByRole("textbox")).to.exist;
  });

  it("does not remove Editor on Escape if callback is not provided", async () => {
    render(
      <FlatPropertyRenderer
        orientation={Orientation.Horizontal}
        propertyRecord={propertyRecord}
        isEditing={true}
        isExpanded={false}
        onExpansionToggled={() => {}}
      />
    );

    await theUserTo.type(screen.getByRole("textbox"), "{Escape}");
    expect(screen.getByRole("textbox")).to.exist;
  });

  it("wrap valueElement in span if it a string", async () => {
    render(
      <FlatPropertyRenderer
        orientation={Orientation.Horizontal}
        propertyRecord={propertyRecord}
        isExpanded={false}
        onExpansionToggled={() => {}}
      />
    );

    expect(screen.getByText("Model")).satisfy(
      selectorMatches(
        [
          "div.components-property-record-value",
          "span",
          "span[title='Model']",
        ].join(" > ")
      )
    );
  });

  it("does not wrap valueElement in span if it's not a string", async () => {
    propertyRecord.property.typename = "mycustomRenderer";

    const myCustomRenderer = {
      canRender: () => true,
      render: () => <div>My value</div>,
    };

    PropertyValueRendererManager.defaultManager.registerRenderer(
      "mycustomRenderer",
      myCustomRenderer
    );
    render(
      <FlatPropertyRenderer
        orientation={Orientation.Horizontal}
        propertyRecord={propertyRecord}
        isExpanded={false}
        onExpansionToggled={() => {}}
      />
    );

    expect(screen.getByText("My value")).satisfy(
      selectorMatches(
        ["div.components-property-record-value", "span", "div"].join(" > ")
      )
    );
  });

  describe("onHeightChanged", () => {
    const record = TestUtils.createPrimitiveStringProperty("test", "test");

    function renderFlatPropertyRenderer(
      isEditing: boolean,
      onHeightChanged?: (newHeight: number) => void
    ) {
      return (
        <FlatPropertyRenderer
          orientation={Orientation.Horizontal}
          propertyRecord={record}
          isExpanded={false}
          isEditing={isEditing}
          onExpansionToggled={() => {}}
          onHeightChanged={onHeightChanged}
        />
      );
    }

    it("gets called when entering editing state", () => {
      const onHeightChanged = sinon.fake();
      const { rerender } = render(
        renderFlatPropertyRenderer(false, onHeightChanged)
      );
      expect(onHeightChanged).to.have.not.been.called;
      rerender(renderFlatPropertyRenderer(true, onHeightChanged));
      expect(onHeightChanged).to.have.been.calledOnceWith(27);
    });

    it("does not get called when component is mounted in editing state", () => {
      const onHeightChanged = sinon.fake();
      render(renderFlatPropertyRenderer(true, onHeightChanged));
      expect(onHeightChanged).to.have.not.been.called;
    });

    it("does not attempt to call when it is not present and throw", () => {
      const { rerender } = render(renderFlatPropertyRenderer(false));
      rerender(renderFlatPropertyRenderer(true));
    });
  });
});
