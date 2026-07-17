/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { IModelConnection } from "@itwin/core-frontend";
import { getFormatterParserSpec } from "../imodel-components-react/KoqUtilities.js";

const { mockIModelApp } = vi.hoisted(() => ({
  mockIModelApp: {
    formatsProvider: undefined as
      | { getFormat: ReturnType<typeof vi.fn> }
      | undefined,
    quantityFormatter: {
      findFormatterSpecByQuantityType: vi.fn(),
      findParserSpecByQuantityType: vi.fn(),
      createFormatterSpec: vi.fn(),
      createParserSpec: vi.fn(),
    },
  },
}));

vi.mock("@itwin/core-frontend", () => ({
  IModelApp: mockIModelApp,
}));

describe("getFormatterParserSpec", () => {
  const imodelMock = {
    schemaContext: {
      getSchemaItem: vi.fn(),
    },
  };
  const imodel = imodelMock as unknown as IModelConnection;

  beforeEach(() => {
    mockIModelApp.formatsProvider = undefined;
    mockIModelApp.quantityFormatter.findFormatterSpecByQuantityType.mockReset();
    mockIModelApp.quantityFormatter.findParserSpecByQuantityType.mockReset();
    mockIModelApp.quantityFormatter.createFormatterSpec.mockReset();
    mockIModelApp.quantityFormatter.createParserSpec.mockReset();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("fallback to `IModelApp.quantityFormatter`", () => {
    it("returns specs from the quantity formatter when `formatsProvider` is not available", async () => {
      const formatterSpec = { name: "formatter" };
      const parserSpec = { name: "parser" };
      mockIModelApp.quantityFormatter.findFormatterSpecByQuantityType.mockReturnValue(
        formatterSpec
      );
      mockIModelApp.quantityFormatter.findParserSpecByQuantityType.mockReturnValue(
        parserSpec
      );

      const result = await getFormatterParserSpec({
        imodel,
        type: "AecUnits.LENGTH",
      });

      expect(result).toEqual({
        highPrecisionFormatterSpec: formatterSpec,
        formatterSpec,
        parserSpec,
      });
    });

    it("falls back when the quantity type is not a string even if `formatsProvider` is available", async () => {
      mockIModelApp.formatsProvider = { getFormat: vi.fn() };
      const formatterSpec = { name: "formatter" };
      const parserSpec = { name: "parser" };
      mockIModelApp.quantityFormatter.findFormatterSpecByQuantityType.mockReturnValue(
        formatterSpec
      );
      mockIModelApp.quantityFormatter.findParserSpecByQuantityType.mockReturnValue(
        parserSpec
      );

      const result = await getFormatterParserSpec({
        imodel,
        type: 5, // legacy `QuantityType` enum value
      });

      expect(
        mockIModelApp.quantityFormatter.findFormatterSpecByQuantityType
      ).toHaveBeenCalledWith(5);
      expect(mockIModelApp.formatsProvider.getFormat).not.toHaveBeenCalled();
      expect(result).toEqual({
        highPrecisionFormatterSpec: formatterSpec,
        formatterSpec,
        parserSpec,
      });
    });

    it("returns `undefined` when the formatter spec is not found", async () => {
      mockIModelApp.quantityFormatter.findFormatterSpecByQuantityType.mockReturnValue(
        undefined
      );
      mockIModelApp.quantityFormatter.findParserSpecByQuantityType.mockReturnValue(
        { name: "parser" }
      );

      const result = await getFormatterParserSpec({
        imodel,
        type: "AecUnits.LENGTH",
      });

      expect(result).toEqual(undefined);
    });

    it("returns `undefined` when the parser spec is not found", async () => {
      mockIModelApp.quantityFormatter.findFormatterSpecByQuantityType.mockReturnValue(
        { name: "formatter" }
      );
      mockIModelApp.quantityFormatter.findParserSpecByQuantityType.mockReturnValue(
        undefined
      );

      const result = await getFormatterParserSpec({
        imodel,
        type: "AecUnits.LENGTH",
      });

      expect(result).toEqual(undefined);
    });
  });

  describe("kind of quantity lookup", () => {
    beforeEach(() => {
      mockIModelApp.formatsProvider = { getFormat: vi.fn() };
    });

    it("returns `undefined` when the kind of quantity is not found", async () => {
      imodelMock.schemaContext.getSchemaItem.mockResolvedValue(undefined);

      const result = await getFormatterParserSpec({
        imodel,
        type: "AecUnits.LENGTH",
      });

      expect(imodelMock.schemaContext.getSchemaItem).toHaveBeenCalledWith(
        "AecUnits.LENGTH"
      );
      expect(result).toEqual(undefined);
    });

    it("returns `undefined` when the persistence unit is missing", async () => {
      imodelMock.schemaContext.getSchemaItem.mockResolvedValue({
        persistenceUnit: Promise.resolve(undefined),
      });
      mockIModelApp.formatsProvider!.getFormat.mockResolvedValue({
        type: "Decimal",
        precision: 4,
      });

      const result = await getFormatterParserSpec({
        imodel,
        type: "AecUnits.LENGTH",
      });

      expect(result).toEqual(undefined);
    });

    it("returns `undefined` when the format props are missing", async () => {
      imodelMock.schemaContext.getSchemaItem.mockResolvedValue({
        persistenceUnit: Promise.resolve({ fullName: "Units.M" }),
      });
      mockIModelApp.formatsProvider!.getFormat.mockResolvedValue(undefined);

      const result = await getFormatterParserSpec({
        imodel,
        type: "AecUnits.LENGTH",
      });

      expect(result).toEqual(undefined);
    });

    it("creates formatter and parser specs from the kind of quantity", async () => {
      const formatProps = { type: "Decimal", precision: 4 };
      imodelMock.schemaContext.getSchemaItem.mockResolvedValue({
        persistenceUnit: Promise.resolve({ fullName: "Units.M" }),
      });
      mockIModelApp.formatsProvider!.getFormat.mockResolvedValue(formatProps);

      const highPrecisionFormatterSpec = { name: "high" };
      const formatterSpec = { name: "formatter" };
      const parserSpec = { name: "parser" };
      mockIModelApp.quantityFormatter.createFormatterSpec
        .mockResolvedValueOnce(highPrecisionFormatterSpec)
        .mockResolvedValueOnce(formatterSpec);
      mockIModelApp.quantityFormatter.createParserSpec.mockResolvedValue(
        parserSpec
      );

      const result = await getFormatterParserSpec({
        imodel,
        type: "AecUnits.LENGTH",
      });

      expect(result).toEqual({
        highPrecisionFormatterSpec,
        formatterSpec,
        parserSpec,
      });
      expect(
        mockIModelApp.quantityFormatter.createFormatterSpec
      ).toHaveBeenNthCalledWith(1, {
        formatProps: { ...formatProps, precision: 12, formatTraits: [] },
        persistenceUnitName: "Units.M",
      });
      expect(
        mockIModelApp.quantityFormatter.createFormatterSpec
      ).toHaveBeenNthCalledWith(2, {
        formatProps,
        persistenceUnitName: "Units.M",
      });
      expect(
        mockIModelApp.quantityFormatter.createParserSpec
      ).toHaveBeenCalledWith({
        formatProps,
        persistenceUnitName: "Units.M",
      });
    });

    it("keeps the original precision for the high precision spec of non-decimal formats", async () => {
      const formatProps = { type: "Fractional", precision: 8 };
      imodelMock.schemaContext.getSchemaItem.mockResolvedValue({
        persistenceUnit: Promise.resolve({ fullName: "Units.M" }),
      });
      mockIModelApp.formatsProvider!.getFormat.mockResolvedValue(formatProps);
      mockIModelApp.quantityFormatter.createFormatterSpec.mockResolvedValue({});
      mockIModelApp.quantityFormatter.createParserSpec.mockResolvedValue({});

      await getFormatterParserSpec({
        imodel,
        type: "AecUnits.LENGTH",
      });

      expect(
        mockIModelApp.quantityFormatter.createFormatterSpec
      ).toHaveBeenNthCalledWith(1, {
        formatProps: { ...formatProps, precision: 8, formatTraits: [] },
        persistenceUnitName: "Units.M",
      });
    });

    it("strips `TrailZeroes` and `KeepDecimalPoint` traits from the high precision spec when provided as an array", async () => {
      const formatProps = {
        type: "Decimal",
        precision: 4,
        formatTraits: [
          "TrailZeroes",
          "KeepDecimalPoint",
          "KeepSingleZero",
          "ShowUnitLabel",
        ],
      };
      imodelMock.schemaContext.getSchemaItem.mockResolvedValue({
        persistenceUnit: Promise.resolve({ fullName: "Units.M" }),
      });
      mockIModelApp.formatsProvider!.getFormat.mockResolvedValue(formatProps);
      mockIModelApp.quantityFormatter.createFormatterSpec.mockResolvedValue({});
      mockIModelApp.quantityFormatter.createParserSpec.mockResolvedValue({});

      await getFormatterParserSpec({
        imodel,
        type: "AecUnits.LENGTH",
      });

      expect(
        mockIModelApp.quantityFormatter.createFormatterSpec
      ).toHaveBeenNthCalledWith(1, {
        formatProps: {
          ...formatProps,
          precision: 12,
          formatTraits: ["KeepSingleZero", "ShowUnitLabel"],
        },
        persistenceUnitName: "Units.M",
      });
      // The default (non-high-precision) spec keeps the original traits.
      expect(
        mockIModelApp.quantityFormatter.createFormatterSpec
      ).toHaveBeenNthCalledWith(2, {
        formatProps,
        persistenceUnitName: "Units.M",
      });
    });

    it("strips `TrailZeroes` and `KeepDecimalPoint` traits from a delimited string of traits", async () => {
      const formatProps = {
        type: "Decimal",
        precision: 4,
        formatTraits: "trailZeroes;keepDecimalPoint|keepSingleZero,showUnitLabel",
      };
      imodelMock.schemaContext.getSchemaItem.mockResolvedValue({
        persistenceUnit: Promise.resolve({ fullName: "Units.M" }),
      });
      mockIModelApp.formatsProvider!.getFormat.mockResolvedValue(formatProps);
      mockIModelApp.quantityFormatter.createFormatterSpec.mockResolvedValue({});
      mockIModelApp.quantityFormatter.createParserSpec.mockResolvedValue({});

      await getFormatterParserSpec({
        imodel,
        type: "AecUnits.LENGTH",
      });

      expect(
        mockIModelApp.quantityFormatter.createFormatterSpec
      ).toHaveBeenNthCalledWith(1, {
        formatProps: {
          ...formatProps,
          precision: 12,
          formatTraits: ["keepSingleZero", "showUnitLabel"],
        },
        persistenceUnitName: "Units.M",
      });
    });

    it("uses an empty trait list for the high precision spec when no traits are provided", async () => {
      const formatProps = { type: "Decimal", precision: 4 };
      imodelMock.schemaContext.getSchemaItem.mockResolvedValue({
        persistenceUnit: Promise.resolve({ fullName: "Units.M" }),
      });
      mockIModelApp.formatsProvider!.getFormat.mockResolvedValue(formatProps);
      mockIModelApp.quantityFormatter.createFormatterSpec.mockResolvedValue({});
      mockIModelApp.quantityFormatter.createParserSpec.mockResolvedValue({});

      await getFormatterParserSpec({
        imodel,
        type: "AecUnits.LENGTH",
      });

      expect(
        mockIModelApp.quantityFormatter.createFormatterSpec
      ).toHaveBeenNthCalledWith(1, {
        formatProps: { ...formatProps, precision: 12, formatTraits: [] },
        persistenceUnitName: "Units.M",
      });
    });
  });
});
