/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { Orientation } from "@itwin/core-react";
import { PropertyRenderer } from "../../../components-react/properties/renderers/PropertyRenderer.js";
import { PropertyValueRendererManager } from "../../../components-react/properties/ValueRendererManager.js";
import TestUtils, {
  selectorMatches,
  styleMatch,
  userEvent,
} from "../../TestUtils.js";
import { fireEvent, render, screen } from "@testing-library/react";
import type { PropertyRecord } from "@itwin/appui-abstract";

describe("PropertyRenderer", () => {
  let theUserTo: ReturnType<typeof userEvent.setup>;
  beforeEach(() => {
    theUserTo = userEvent.setup();
  });

  describe("getLabelOffset", () => {
    const maxIndent = 17;
    const minIndent = 6;

    function setupStaticIndentationTests(orientation: Orientation) {
      describe("Static indentation", () => {
        it("returns 0 when indentation is undefined or 0", () => {
          expect(
            PropertyRenderer.getLabelOffset(undefined, orientation)
          ).toEqual(0);
          expect(PropertyRenderer.getLabelOffset(0, orientation)).toEqual(0);
        });

        it("returns maxIndent when indentation is 1", () => {
          expect(PropertyRenderer.getLabelOffset(1, orientation)).toEqual(
            maxIndent
          );
        });

        it("returns maxIndent * 2 when indentation is 2", () => {
          expect(PropertyRenderer.getLabelOffset(2, orientation)).toEqual(
            maxIndent * 2
          );
        });
      });
    }

    describe("Vertical orientation", () => {
      const orientation = Orientation.Vertical;

      setupStaticIndentationTests(orientation);

      it("should not shrink indentation in Vertical mode", () => {
        expect(
          PropertyRenderer.getLabelOffset(1, orientation, 100, 0.2, 20)
        ).toEqual(maxIndent);
      });
    });

    describe("Horizontal orientation", () => {
      const orientation = Orientation.Horizontal;

      setupStaticIndentationTests(orientation);

      describe("Shrinking indentation", () => {
        it("returns 0 when indentation is undefined or 0", () => {
          expect(
            PropertyRenderer.getLabelOffset(
              undefined,
              orientation,
              100,
              0.2,
              20
            )
          ).toEqual(0);
          expect(
            PropertyRenderer.getLabelOffset(0, orientation, 100, 0.1, 20)
          ).toEqual(0);
        });

        it("returns maxIndent when indentation is 1 and current label size is bigger than shrink threshold", () => {
          expect(
            PropertyRenderer.getLabelOffset(1, orientation, 100, 0.4, 20)
          ).toEqual(maxIndent);
        });

        it("returns minIndent when indentation is 1 and current label size is same as minimum label size", () => {
          expect(
            PropertyRenderer.getLabelOffset(1, orientation, 100, 0.2, 20)
          ).toEqual(minIndent);
        });

        it("returns intermediate value between min and max when indentation is 1 and current label size is between threshold and minimum shrink", () => {
          expect(
            PropertyRenderer.getLabelOffset(1, orientation, 100, 0.3, 20)
          ).toEqual(10);
        });

        it("returns maxIndent * 4 when indentation is 4 and current label size is larger than shrink threshold", () => {
          expect(
            PropertyRenderer.getLabelOffset(4, orientation, 100, 0.9, 20)
          ).toEqual(maxIndent * 4);
        });

        it("returns minIndent * 4 when indentation is 4 and current label size is same as minimum label size", () => {
          expect(
            PropertyRenderer.getLabelOffset(4, orientation, 100, 0.2, 20)
          ).toEqual(minIndent * 4);
        });

        it("returns (maxIndent * 3) + intermediate when indentation is 4 and current label size is between indentation 4 min shrink and threshold", () => {
          const intermediateSize = 9;
          const minimumLabelSize = 20;
          const width = 100;
          const currentLabelSizeRatio =
            (minimumLabelSize + maxIndent * 3 + intermediateSize) / width;

          expect(
            PropertyRenderer.getLabelOffset(
              4,
              orientation,
              width,
              currentLabelSizeRatio,
              minimumLabelSize
            )
          ).toEqual(maxIndent * 3 + intermediateSize);
        });

        it("returns (maxIndent) + intermediate + (minIndent * 2) when when indentation is 4 and current label size is between indentation 2 threshold and minimum shrink", () => {
          const intermediateSize = 13;
          const minimumLabelSize = 20;
          const width = 100;
          const currentLabelSizeRatio =
            (minimumLabelSize + maxIndent + intermediateSize) / width;

          expect(
            PropertyRenderer.getLabelOffset(
              4,
              orientation,
              width,
              currentLabelSizeRatio,
              minimumLabelSize
            )
          ).toEqual(maxIndent + intermediateSize + minIndent * 2);
        });
      });
    });
  });

  let propertyRecord: PropertyRecord;

  beforeEach(() => {
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
      <PropertyRenderer
        orientation={Orientation.Horizontal}
        propertyRecord={propertyRecord}
      />
    );

    expect(screen.getByTitle(originalValue)).to.exist;

    rerender(
      <PropertyRenderer
        orientation={Orientation.Horizontal}
        propertyRecord={TestUtils.createPrimitiveStringProperty(
          "Label",
          recordValue
        )}
      />
    );

    expect(screen.queryByTitle(originalValue)).toEqual(null);
    expect(screen.getByTitle(recordValue)).to.exist;
  });

  it("renders value differently if provided with custom propertyValueRendererManager", async () => {
    class RendererManager extends PropertyValueRendererManager {
      public override render({}) {
        return <div style={{ color: "blue" }}>Test</div>;
      }
    }

    render(
      <PropertyRenderer
        orientation={Orientation.Horizontal}
        propertyRecord={propertyRecord}
        propertyValueRendererManager={new RendererManager()}
      />
    );

    expect(screen.getByText("Test")).satisfy(styleMatch({ color: "blue" }));
    // Should not display the default rendering.
    expect(screen.queryByTitle("Model")).toEqual(null);
  });

  it("renders as primitive value if property is an empty array", () => {
    propertyRecord = TestUtils.createArrayProperty("EmptyArray");

    render(
      <PropertyRenderer
        orientation={Orientation.Horizontal}
        propertyRecord={propertyRecord}
      />
    );

    expect(screen.getByTitle("EmptyArray")).satisfy(
      selectorMatches(
        [
          ".components-primitive-property-label-renderer",
          ".components-property-label-renderer",
        ].join(" > ")
      )
    );
  });

  it("renders struct as a non primitive value", () => {
    propertyRecord = TestUtils.createArrayProperty("StringArray", [
      TestUtils.createPrimitiveStringProperty("Label", "Model"),
    ]);

    render(
      <PropertyRenderer
        orientation={Orientation.Horizontal}
        propertyRecord={propertyRecord}
      />
    );

    expect(screen.getByTitle("StringArray (1)")).satisfy(
      selectorMatches(
        [
          ".components-nonprimitive-property-label-renderer",
          ".components-property-label-renderer",
        ].join(" > ")
      )
    );
  });

  it("renders array as a non primitive value", () => {
    propertyRecord = TestUtils.createStructProperty("Struct");

    render(
      <PropertyRenderer
        orientation={Orientation.Horizontal}
        propertyRecord={propertyRecord}
      />
    );

    expect(screen.getByTitle("Struct")).satisfy(
      selectorMatches(
        [
          ".components-nonprimitive-property-label-renderer",
          ".components-property-label-renderer",
        ].join(" > ")
      )
    );
  });
  it("renders an editor correctly", () => {
    render(
      <PropertyRenderer
        orientation={Orientation.Horizontal}
        propertyRecord={propertyRecord}
        isEditing={true}
      />
    );

    expect(screen.getByRole("textbox")).satisfy(
      selectorMatches("input.components-text-editor")
    );
  });

  it("calls onEditCommit on Enter key when editing", async () => {
    const spy = vi.fn();
    const propertyRenderer = render(
      <PropertyRenderer
        orientation={Orientation.Horizontal}
        propertyRecord={propertyRecord}
        isEditing={true}
        onEditCommit={spy}
      />
    );

    const inputNode = propertyRenderer.container.querySelector("input");
    expect(inputNode).toBeTruthy();

    fireEvent.keyDown(inputNode as HTMLElement, { key: "Enter" });
    await TestUtils.flushAsyncOperations();
    expect(spy).toHaveBeenCalledOnce();
  });

  it("calls onEditCancel on Escape key when editing", () => {
    const spy = vi.fn();
    const propertyRenderer = render(
      <PropertyRenderer
        orientation={Orientation.Horizontal}
        propertyRecord={propertyRecord}
        isEditing={true}
        onEditCancel={spy}
      />
    );

    const inputNode = propertyRenderer.container.querySelector("input");
    expect(inputNode).toBeTruthy();

    fireEvent.keyDown(inputNode as HTMLElement, { key: "Escape" });
    expect(spy).toHaveBeenCalledOnce();
  });

  it("does not remove Editor on Enter if callback is not provided", async () => {
    render(
      <PropertyRenderer
        orientation={Orientation.Horizontal}
        propertyRecord={propertyRecord}
        isEditing={true}
      />
    );

    await theUserTo.type(screen.getByRole("textbox"), "{Enter}");
    expect(screen.getByRole("textbox")).to.exist;
  });

  it("does not remove Editor on Escape if callback is not provided", async () => {
    render(
      <PropertyRenderer
        orientation={Orientation.Horizontal}
        propertyRecord={propertyRecord}
        isEditing={true}
      />
    );

    await theUserTo.type(screen.getByRole("textbox"), "{Escape}");
    expect(screen.getByRole("textbox")).to.exist;
  });

  it("does wrap valueElement in span if it's a string", async () => {
    render(
      <PropertyRenderer
        orientation={Orientation.Horizontal}
        propertyRecord={propertyRecord}
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
    propertyRecord.property.typename = "mycustom";

    const myCustomRenderer = {
      canRender: () => true,
      render: () => <div>My value</div>,
    };

    PropertyValueRendererManager.defaultManager.registerRenderer(
      "mycustom",
      myCustomRenderer
    );
    render(
      <PropertyRenderer
        orientation={Orientation.Horizontal}
        propertyRecord={propertyRecord}
      />
    );

    expect(screen.getByText("My value")).satisfy(
      selectorMatches(
        ["div.components-property-record-value", "span", "div"].join(" > ")
      )
    );
  });
});
