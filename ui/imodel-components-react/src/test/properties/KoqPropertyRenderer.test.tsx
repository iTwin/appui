/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { render } from "@testing-library/react";
import * as React from "react";
import type { MockedFunction } from "vitest";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type {
  PrimitiveValue,
  PropertyDescription,
} from "@itwin/appui-abstract";
import {
  PropertyRecord,
  PropertyValueFormat,
  StandardTypeNames,
} from "@itwin/appui-abstract";
import type { IModelConnection } from "@itwin/core-frontend";
import { IModelApp, NoRenderApp } from "@itwin/core-frontend";
import type { FormatterSpec, ParserSpec } from "@itwin/core-quantity";
import { IModelConnectionProvider } from "../../imodel-components-react/IModelConnectionContext.js";
import { KoqPropertyValueRenderer } from "../../imodel-components-react/properties/KoqPropertyRenderer.js";
import { getFormatterParserSpec } from "../../imodel-components-react/KoqUtilities.js";
import { MERGED_VALUE } from "@itwin/components-react/internal";

vi.mock("../../imodel-components-react/KoqUtilities.js", () => ({
  getFormatterParserSpec: vi.fn(),
}));

function createKoqProperty(
  options: {
    value?: number;
    displayValue?: string;
    typename?: string;
    kindOfQuantityName?: string;
  } = {}
) {
  const primitiveValue: PrimitiveValue = {
    valueFormat: PropertyValueFormat.Primitive,
    value: options.value ?? 1.5,
    displayValue: options.displayValue ?? "1.5",
  };
  const description: PropertyDescription = {
    typename: options.typename ?? StandardTypeNames.Double.valueOf(),
    name: "length",
    displayLabel: "Length",
    kindOfQuantityName:
      "kindOfQuantityName" in options
        ? options.kindOfQuantityName
        : "AecUnits.LENGTH",
  };
  return new PropertyRecord(primitiveValue, description);
}

function createArrayProperty() {
  return new PropertyRecord(
    {
      valueFormat: PropertyValueFormat.Array,
      items: [],
      itemsTypeName: StandardTypeNames.Double.valueOf(),
    },
    {
      typename: StandardTypeNames.Array,
      name: "array",
      displayLabel: "Array",
      kindOfQuantityName: "AecUnits.LENGTH",
    }
  );
}

describe("KoqPropertyValueRenderer", () => {
  const mockGetFormatterParserSpec =
    getFormatterParserSpec as unknown as MockedFunction<
      typeof getFormatterParserSpec
    >;

  beforeEach(async () => {
    await NoRenderApp.startup();
  });

  afterEach(async () => {
    await IModelApp.shutdown();
    mockGetFormatterParserSpec.mockReset();
    vi.restoreAllMocks();
  });

  describe("canRender", () => {
    it("returns true for a double property with a kind of quantity name", () => {
      const renderer = new KoqPropertyValueRenderer();
      expect(renderer.canRender(createKoqProperty())).toEqual(true);
    });

    it("returns true for a float property with a kind of quantity name", () => {
      const renderer = new KoqPropertyValueRenderer();
      const property = createKoqProperty({
        typename: StandardTypeNames.Float.valueOf(),
      });
      expect(renderer.canRender(property)).toEqual(true);
    });

    it("returns false when the property has no kind of quantity name", () => {
      const renderer = new KoqPropertyValueRenderer();
      const property = createKoqProperty({ kindOfQuantityName: undefined });
      expect(renderer.canRender(property)).toEqual(false);
    });

    it("returns false for a property that is not a double or float", () => {
      const renderer = new KoqPropertyValueRenderer();
      const property = createKoqProperty({
        typename: StandardTypeNames.String,
      });
      expect(renderer.canRender(property)).toEqual(false);
    });

    it("returns false for a non-primitive property", () => {
      const renderer = new KoqPropertyValueRenderer();
      expect(renderer.canRender(createArrayProperty())).toEqual(false);
    });
  });

  describe("render", () => {
    it("renders the display value when no imodel connection is available", async () => {
      const renderer = new KoqPropertyValueRenderer();
      const property = createKoqProperty({ displayValue: "1.5 m" });

      const { findByText } = render(<>{renderer.render(property)}</>);

      await findByText("1.5 m");
      expect(getFormatterParserSpec).not.toHaveBeenCalled();
    });

    it("formats the value using the quantity formatter when an imodel and formatter spec are available", async () => {
      const formatterSpec = {} as FormatterSpec;
      mockGetFormatterParserSpec.mockResolvedValue({
        formatterSpec,
        highPrecisionFormatterSpec: formatterSpec,
        parserSpec: {} as ParserSpec,
      });
      const formatSpy = vi
        .spyOn(IModelApp.quantityFormatter, "formatQuantity")
        .mockReturnValue("10 m");

      const renderer = new KoqPropertyValueRenderer();
      const property = createKoqProperty({ value: 10, displayValue: "raw" });

      const { findByText } = render(
        <IModelConnectionProvider iModelConnection={{} as IModelConnection}>
          {renderer.render(property)}
        </IModelConnectionProvider>
      );

      await findByText("10 m");
      expect(mockGetFormatterParserSpec).toHaveBeenCalledWith({
        imodel: expect.anything(),
        type: "AecUnits.LENGTH",
      });
      expect(formatSpy).toHaveBeenCalledWith(10, formatterSpec);
    });

    it("falls back to the display value when no formatter spec is found", async () => {
      mockGetFormatterParserSpec.mockResolvedValue(undefined);
      const formatSpy = vi.spyOn(IModelApp.quantityFormatter, "formatQuantity");

      const renderer = new KoqPropertyValueRenderer();
      const property = createKoqProperty({
        value: 10,
        displayValue: "10 (raw)",
      });

      const { findByText } = render(
        <IModelConnectionProvider iModelConnection={{} as IModelConnection}>
          {renderer.render(property)}
        </IModelConnectionProvider>
      );

      await findByText("10 (raw)");
      expect(mockGetFormatterParserSpec).toHaveBeenCalled();
      expect(formatSpy).not.toHaveBeenCalled();
    });

    it("renders the merged placeholder with the unit label for a merged record", async () => {
      const formatterSpec = {
        unitConversions: [{ label: "m" }],
      } as unknown as FormatterSpec;
      mockGetFormatterParserSpec.mockResolvedValue({
        formatterSpec,
        highPrecisionFormatterSpec: formatterSpec,
        parserSpec: {} as ParserSpec,
      });
      const formatSpy = vi.spyOn(IModelApp.quantityFormatter, "formatQuantity");

      const renderer = new KoqPropertyValueRenderer();
      const property = createKoqProperty({ value: 10, displayValue: "raw" });
      property.isMerged = true;

      const { findByText } = render(
        <IModelConnectionProvider iModelConnection={{} as IModelConnection}>
          {renderer.render(property)}
        </IModelConnectionProvider>
      );

      await findByText(`${MERGED_VALUE} m`);
      expect(formatSpy).not.toHaveBeenCalled();
    });

    it("renders the merged placeholder without a unit label when none is available", async () => {
      const formatterSpec = {
        unitConversions: [],
      } as unknown as FormatterSpec;
      mockGetFormatterParserSpec.mockResolvedValue({
        formatterSpec,
        highPrecisionFormatterSpec: formatterSpec,
        parserSpec: {} as ParserSpec,
      });

      const renderer = new KoqPropertyValueRenderer();
      const property = createKoqProperty({ value: 10, displayValue: "raw" });
      property.isMerged = true;

      const { findByText } = render(
        <IModelConnectionProvider iModelConnection={{} as IModelConnection}>
          {renderer.render(property)}
        </IModelConnectionProvider>
      );

      await findByText(MERGED_VALUE);
    });
  });
});
