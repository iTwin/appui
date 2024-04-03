/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from "react";
import { PropertyRecord } from "@itwin/appui-abstract";
import { Orientation } from "@itwin/core-react";
import { render } from "@testing-library/react";
import type { HighlightingComponentProps } from "../../../components-react/common/HighlightingComponentProps";
import { CommonPropertyRenderer } from "../../../components-react/properties/renderers/CommonPropertyRenderer";

describe("CommonPropertyRenderer", () => {
  describe("createNewDisplayValue", () => {
    it("should create a value which is highlighted if highlighProps are provided, applyOnLabel is set to true and highlightedText matches part of propertyRecord", () => {
      const propertyRecord = PropertyRecord.fromString("asdtestasd");
      const highlight: HighlightingComponentProps & {
        applyOnLabel: boolean;
        applyOnValue: boolean;
      } = {
        highlightedText: "test",
        applyOnLabel: false,
        applyOnValue: true,
      };
      const displayValue = CommonPropertyRenderer.createNewDisplayValue(
        Orientation.Vertical,
        propertyRecord,
        10,
        undefined,
        undefined,
        undefined,
        undefined,
        highlight
      );
      const { container } = render(<div>{displayValue}</div>);
      const element = container.querySelector("mark");
      expect(element?.textContent).to.equal("test");
    });

    it("should create a value which is not highlighted if highlighProps are provided, applyOnLabel is set to true but highlightedText does not match any part of propertyRecord", () => {
      const propertyRecord = PropertyRecord.fromString("asdtestasd");
      const highlight: HighlightingComponentProps & {
        applyOnLabel: boolean;
        applyOnValue: boolean;
      } = {
        highlightedText: "gav",
        applyOnLabel: false,
        applyOnValue: true,
      };
      const displayValue = CommonPropertyRenderer.createNewDisplayValue(
        Orientation.Vertical,
        propertyRecord,
        10,
        undefined,
        undefined,
        undefined,
        undefined,
        highlight
      );
      const { container } = render(<div>{displayValue}</div>);
      const element = container.querySelector("mark");
      expect(element?.textContent).to.be.undefined;
    });

    it("should create a value which is not highlighted if highlighProps are not provided", () => {
      const propertyRecord = PropertyRecord.fromString("asdtestasd");

      const displayValue = CommonPropertyRenderer.createNewDisplayValue(
        Orientation.Vertical,
        propertyRecord,
        10,
        undefined
      );
      const { container } = render(<div>{displayValue}</div>);
      const element = container.querySelector("mark");
      expect(element?.textContent).to.be.undefined;
    });

    it("should create a value which is actively highlighted if highlighProps are provided, highlightedText matches part of propertyRecord and property name matches highlight activeMatch propertyName", () => {
      const propertyRecord = PropertyRecord.fromString("asdtestasd");
      propertyRecord.property.name = "testName";
      const highlight: HighlightingComponentProps & {
        applyOnLabel: boolean;
        applyOnValue: boolean;
      } = {
        highlightedText: "test",
        activeHighlight: {
          highlightedItemIdentifier: "testName",
          highlightIndex: 0,
        },
        applyOnLabel: false,
        applyOnValue: true,
      };
      const displayValue = CommonPropertyRenderer.createNewDisplayValue(
        Orientation.Vertical,
        propertyRecord,
        10,
        undefined,
        undefined,
        undefined,
        undefined,
        highlight
      );
      const { container } = render(<div>{displayValue}</div>);
      const element = container.querySelector("mark");
      expect(element?.textContent).to.equal("test");
      expect(element?.classList.contains("components-activehighlight")).toEqual(
        true
      );
    });

    it("should not create a value which is actively highlighted if highlighProps are provided, highlightedText matches part of propertyRecord but property name does not match highlight activeMatch propertyName", () => {
      const propertyRecord = PropertyRecord.fromString("asdtestasd");
      propertyRecord.property.name = "testName2";
      const highlight: HighlightingComponentProps & {
        applyOnLabel: boolean;
        applyOnValue: boolean;
      } = {
        highlightedText: "test",
        activeHighlight: {
          highlightedItemIdentifier: "testName",
          highlightIndex: 0,
        },
        applyOnLabel: false,
        applyOnValue: true,
      };
      const displayValue = CommonPropertyRenderer.createNewDisplayValue(
        Orientation.Vertical,
        propertyRecord,
        10,
        undefined,
        undefined,
        undefined,
        undefined,
        highlight
      );
      const { container } = render(<div>{displayValue}</div>);
      const element = container.querySelector("mark");
      expect(element?.textContent).to.equal("test");
      expect(element?.classList.contains("components-activehighlight")).toEqual(
        false
      );
    });

    it("should not create a value which is actively highlighted if highlighProps are provided, highlightedText matches part of propertyRecord, property name matches highlight activeMatch propertyName but applyOnLabel is true and matchIndex is in the label scope", () => {
      const propertyRecord = PropertyRecord.fromString("asdtestasd");
      propertyRecord.property.name = "testName";
      propertyRecord.property.displayLabel = "tesTtest";
      const highlight: HighlightingComponentProps & {
        applyOnLabel: boolean;
        applyOnValue: boolean;
      } = {
        highlightedText: "test",
        activeHighlight: {
          highlightedItemIdentifier: "testName",
          highlightIndex: 1,
        },
        applyOnLabel: true,
        applyOnValue: true,
      };
      const displayValue = CommonPropertyRenderer.createNewDisplayValue(
        Orientation.Vertical,
        propertyRecord,
        10,
        undefined,
        undefined,
        undefined,
        undefined,
        highlight
      );
      const { container } = render(<div>{displayValue}</div>);
      const element = container.querySelector("mark");
      expect(element?.textContent).to.equal("test");
      expect(element?.classList.contains("components-activehighlight")).toEqual(
        false
      );
    });

    it("should create a value which is actively highlighted if highlighProps are provided, highlightedText matches part of propertyRecord, property name matches highlight activeMatch propertyName, applyOnLabel is true and matchIndex is bigger than label matchCount and is in the value scope", () => {
      const propertyRecord = PropertyRecord.fromString("asdtestasd");
      propertyRecord.property.name = "testName";
      propertyRecord.property.displayLabel = "tesTtest";
      const highlight: HighlightingComponentProps & {
        applyOnLabel: boolean;
        applyOnValue: boolean;
      } = {
        highlightedText: "test",
        activeHighlight: {
          highlightedItemIdentifier: "testName",
          highlightIndex: 2,
        },
        applyOnLabel: true,
        applyOnValue: true,
      };
      const displayValue = CommonPropertyRenderer.createNewDisplayValue(
        Orientation.Vertical,
        propertyRecord,
        10,
        undefined,
        undefined,
        undefined,
        undefined,
        highlight
      );
      const { container } = render(<div>{displayValue}</div>);
      const element = container.querySelector("mark");
      expect(element?.textContent).to.equal("test");
      expect(element?.classList.contains("components-activehighlight")).toEqual(
        true
      );
    });

    it("should not create a value which is highlighted if applyOnValue is false", () => {
      const propertyRecord = PropertyRecord.fromString("asdtestasd");
      const highlight: HighlightingComponentProps & {
        applyOnLabel: boolean;
        applyOnValue: boolean;
      } = {
        highlightedText: "gav",
        applyOnLabel: false,
        applyOnValue: true,
      };
      const displayValue = CommonPropertyRenderer.createNewDisplayValue(
        Orientation.Vertical,
        propertyRecord,
        10,
        undefined,
        undefined,
        undefined,
        undefined,
        highlight
      );
      const { container } = render(<div>{displayValue}</div>);
      const element = container.querySelector("mark");
      expect(element?.textContent).to.be.undefined;
    });
  });

  describe("getLabelOffset", () => {
    const maxIndent = 17;
    const minIndent = 6;

    function setupStaticIndentationTests(orientation: Orientation) {
      describe("Static indentation", () => {
        it("returns 0 when indentation is undefined or 0", () => {
          expect(
            CommonPropertyRenderer.getLabelOffset(undefined, orientation)
          ).to.be.eq(0);
          expect(
            CommonPropertyRenderer.getLabelOffset(0, orientation)
          ).to.be.eq(0);
        });

        it("returns maxIndent when indentation is 1", () => {
          expect(CommonPropertyRenderer.getLabelOffset(1, orientation)).toEqual(
            maxIndent
          );
        });

        it("returns maxIndent * 2 when indentation is 2", () => {
          expect(CommonPropertyRenderer.getLabelOffset(2, orientation)).toEqual(
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
          CommonPropertyRenderer.getLabelOffset(1, orientation, 100, 0.2, 20)
        ).toEqual(maxIndent);
      });
    });

    describe("Horizontal orientation", () => {
      const orientation = Orientation.Horizontal;

      setupStaticIndentationTests(orientation);

      describe("Shrinking indentation", () => {
        it("returns 0 when indentation is undefined or 0", () => {
          expect(
            CommonPropertyRenderer.getLabelOffset(
              undefined,
              orientation,
              100,
              0.2,
              20
            )
          ).to.be.eq(0);
          expect(
            CommonPropertyRenderer.getLabelOffset(0, orientation, 100, 0.1, 20)
          ).to.be.eq(0);
        });

        it("returns maxIndent when indentation is 1 and current label size is bigger than shrink threshold", () => {
          expect(
            CommonPropertyRenderer.getLabelOffset(1, orientation, 100, 0.4, 20)
          ).toEqual(maxIndent);
        });

        it("returns minIndent when indentation is 1 and current label size is same as minimum label size", () => {
          expect(
            CommonPropertyRenderer.getLabelOffset(1, orientation, 100, 0.2, 20)
          ).toEqual(minIndent);
        });

        it("returns intermediate value between min and max when indentation is 1 and current label size is between threshold and minimum shrink", () => {
          expect(
            CommonPropertyRenderer.getLabelOffset(1, orientation, 100, 0.3, 20)
          ).toEqual(10);
        });

        it("returns maxIndent * 4 when indentation is 4 and current label size is larger than shrink threshold", () => {
          expect(
            CommonPropertyRenderer.getLabelOffset(4, orientation, 100, 0.9, 20)
          ).toEqual(maxIndent * 4);
        });

        it("returns minIndent * 4 when indentation is 4 and current label size is same as minimum label size", () => {
          expect(
            CommonPropertyRenderer.getLabelOffset(4, orientation, 100, 0.2, 20)
          ).toEqual(minIndent * 4);
        });

        it("returns (maxIndent * 3) + intermediate when indentation is 4 and current label size is between indentation 4 min shrink and threshold", () => {
          const intermediateSize = 9;
          const minimumLabelSize = 20;
          const width = 100;
          const currentLabelSizeRatio =
            (minimumLabelSize + maxIndent * 3 + intermediateSize) / width;

          expect(
            CommonPropertyRenderer.getLabelOffset(
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
            CommonPropertyRenderer.getLabelOffset(
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
});
