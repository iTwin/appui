/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { render, waitFor } from "@testing-library/react";
import { IModelApp, NoRenderApp } from "@itwin/core-frontend";
import type {
  FormatProps,
  UnitProps,
  UnitsProvider,
} from "@itwin/core-quantity";
import {
  Format,
  FormatterSpec,
  FormatTraits,
  getTraitString,
} from "@itwin/core-quantity";
import { Checkbox } from "@itwin/itwinui-react";
import { TestUtils } from "../TestUtils";
import { FormatPanel } from "../../imodel-components-react/quantityformat/FormatPanel";
import { FormatSample } from "../../imodel-components-react/quantityformat/FormatSample";
import { FormatPrecision } from "../../imodel-components-react/quantityformat/FormatPrecision";

function setFormatTrait(
  formatProps: FormatProps,
  trait: FormatTraits,
  setActive: boolean
) {
  const traitStr = getTraitString(trait);
  if (undefined === traitStr) return;
  let formatTraits: string[] | undefined;
  if (setActive) {
    // setting trait
    if (!formatProps.formatTraits) {
      formatTraits = [traitStr];
    } else {
      const traits = Array.isArray(formatProps.formatTraits)
        ? formatProps.formatTraits
        : formatProps.formatTraits.split(/,|;|\|/);
      if (!traits.find((traitEntry) => traitStr === traitEntry)) {
        formatTraits = [...traits, traitStr];
      }
    }
  } else {
    // clearing trait
    if (!formatProps.formatTraits) return;
    const traits = Array.isArray(formatProps.formatTraits)
      ? formatProps.formatTraits
      : formatProps.formatTraits.split(/,|;|\|/);
    formatTraits = traits.filter((traitEntry) => traitEntry !== traitStr);
  }
  return { ...formatProps, formatTraits };
}

function provideSecondaryChildren(
  formatProps: FormatProps,
  fireFormatChange: (newProps: FormatProps) => void
) {
  const inProps = formatProps;
  const onChange = fireFormatChange;
  const handleUseThousandsSeparatorChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newProps = setFormatTrait(
      inProps,
      FormatTraits.Use1000Separator,
      e.target.checked
    );
    if (newProps) onChange(newProps);
  };

  return (
    <>
      <span className={"uicore-label"}>Secondary (1000 sep)</span>
      <Checkbox
        checked={Format.isFormatTraitSetInProps(
          formatProps,
          FormatTraits.Use1000Separator
        )}
        onChange={handleUseThousandsSeparatorChange}
      />
    </>
  );
}

function providePrimaryChildren(
  formatProps: FormatProps,
  fireFormatChange: (newProps: FormatProps) => void
) {
  const inProps = formatProps;
  const onChange = fireFormatChange;
  const handleUseThousandsSeparatorChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newProps = setFormatTrait(
      inProps,
      FormatTraits.Use1000Separator,
      e.target.checked
    );
    if (newProps) onChange(newProps);
  };

  return (
    <>
      <span className={"uicore-label"}>Primary (1000 sep)</span>
      <Checkbox
        checked={Format.isFormatTraitSetInProps(
          formatProps,
          FormatTraits.Use1000Separator
        )}
        onChange={handleUseThousandsSeparatorChange}
      />
    </>
  );
}

async function provideFormatSpec(
  formatProps: FormatProps,
  persistenceUnit: UnitProps,
  unitsProvider: UnitsProvider,
  formatName?: string
) {
  const actualFormat = await Format.createFromJSON(
    formatName ?? "custom",
    unitsProvider,
    formatProps
  );
  return FormatterSpec.create(
    actualFormat.name,
    actualFormat,
    unitsProvider,
    persistenceUnit
  );
}

const initialFormatProps: FormatProps = {
  formatTraits: ["keepSingleZero", "applyRounding", "showUnitLabel"],
  precision: 4,
  type: "Decimal",
  uomSeparator: " ",
  decimalSeparator: ".",
};

describe("FormatPanel", () => {
  const rnaDescriptorToRestore = Object.getOwnPropertyDescriptor(
    IModelApp,
    "requestNextAnimation"
  )!;
  function requestNextAnimation() {}

  beforeEach(async () => {
    // Avoid requestAnimationFrame exception during test by temporarily replacing function that calls it.
    Object.defineProperty(IModelApp, "requestNextAnimation", {
      get: () => requestNextAnimation,
    });
    await TestUtils.initializeUiIModelComponents();
    await NoRenderApp.startup();
  });

  afterEach(async () => {
    await IModelApp.shutdown();
    TestUtils.terminateUiIModelComponents();
    Object.defineProperty(
      IModelApp,
      "requestNextAnimation",
      rnaDescriptorToRestore
    );
  });

  it("should render panel", async () => {
    const unitsProvider = IModelApp.quantityFormatter.unitsProvider;
    const pu = await unitsProvider.findUnitByName("Units.M");
    const formatterSpec = await provideFormatSpec(
      initialFormatProps,
      pu,
      unitsProvider,
      "numeric"
    );
    const spy = vi.fn();

    const renderedComponent = render(
      <FormatPanel
        initialFormat={formatterSpec.format.toJSON()}
        showSample={true}
        onFormatChange={spy}
        initialMagnitude={123.45}
        unitsProvider={unitsProvider}
        persistenceUnit={formatterSpec.persistenceUnit}
        provideFormatSpec={provideFormatSpec}
        providePrimaryChildren={providePrimaryChildren}
        provideSecondaryChildren={provideSecondaryChildren}
      />
    );

    await waitFor(() => {
      const spanElement = renderedComponent.getByTestId(
        "format-sample-formatted"
      ) as HTMLSpanElement;
      expect(spanElement.textContent).to.be.eql(`123.45 m`);
    });
  });

  it("should use generic format spec generator if not specified", async () => {
    const unitsProvider = IModelApp.quantityFormatter.unitsProvider;
    const pu = await unitsProvider.findUnitByName("Units.M");
    const formatterSpec = await provideFormatSpec(
      initialFormatProps,
      pu,
      unitsProvider,
      "numeric"
    );

    const renderedComponent = render(
      <FormatPanel
        initialFormat={formatterSpec.format.toJSON()}
        showSample={true}
        initialMagnitude={123.45}
        unitsProvider={unitsProvider}
        persistenceUnit={formatterSpec.persistenceUnit}
        providePrimaryChildren={providePrimaryChildren}
        provideSecondaryChildren={provideSecondaryChildren}
      />
    );
    await waitFor(() => renderedComponent.getByText("123.45 m"));
  });
});

describe("FormatSample", () => {
  it("should render FormatSample with hideLabels", async () => {
    const unitsProvider = IModelApp.quantityFormatter.unitsProvider;
    const pu = await unitsProvider.findUnitByName("Units.M");
    const formatterSpec = await provideFormatSpec(
      initialFormatProps,
      pu,
      unitsProvider,
      "numeric"
    );
    const renderedComponent = render(
      <FormatSample formatSpec={formatterSpec} hideLabels />
    );
    expect(renderedComponent.getByTestId("progress-forward")).toBeTruthy();
  });
});

describe("FormatPrecision", () => {
  it("should render FormatPrecision with fractional type & no precision", async () => {
    const formatProps: FormatProps = { type: "fractional" };
    const renderedComponent = render(
      <FormatPrecision formatProps={formatProps} />
    );
    expect(renderedComponent.getByTestId("fraction-precision-selector")).to
      .exist;
  });

  it("should render FormatPrecision with decimal type & no precision", async () => {
    const formatProps: FormatProps = { type: "decimal" };
    const renderedComponent = render(
      <FormatPrecision formatProps={formatProps} />
    );
    expect(renderedComponent.getByTestId("decimal-precision-selector")).to
      .exist;
  });
});
