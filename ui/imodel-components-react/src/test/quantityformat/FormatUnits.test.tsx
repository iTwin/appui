/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { fireEvent, render, within } from "@testing-library/react";
import { IModelApp, NoRenderApp } from "@itwin/core-frontend";
import type { FormatProps } from "@itwin/core-quantity";
import type { ComponentSpy } from "../TestUtils";
import { TestUtils, waitForPosition } from "../TestUtils";
import { stubScrollIntoView } from "../test-helpers/misc";
import { FormatUnits } from "../../imodel-components-react/quantityformat/FormatUnits";

describe("FormatUnits", () => {
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

  stubScrollIntoView();

  it("should render (numeric format)", async () => {
    const numericFormatProps: FormatProps = {
      formatTraits: ["keepSingleZero", "applyRounding", "showUnitLabel"],
      precision: 4,
      type: "Decimal",
      uomSeparator: " ",
      decimalSeparator: ".",
    };

    const unitsProvider = IModelApp.quantityFormatter.unitsProvider;
    const pu = await unitsProvider.findUnitByName("Units.M");

    const spy: ComponentSpy<typeof FormatUnits, "onUnitsChange"> = vi.fn();
    const component = render(
      <FormatUnits
        initialFormat={numericFormatProps}
        persistenceUnit={pu}
        unitsProvider={unitsProvider}
        onUnitsChange={spy}
      />
    );

    const comboBox = within(component.getByTestId("unit-Units.M")).getByRole(
      "combobox"
    );
    fireEvent.click(comboBox);
    await waitForPosition();

    const menu = component.getByRole("listbox");
    fireEvent.click(within(menu).getByRole("option", { name: "IN" }));
    await waitForPosition();

    expect(spy).toHaveBeenCalledOnce();
    const format = spy.firstCall.args[0];
    expect(format.composite).not.to.be.undefined;
    expect(format.composite?.units[0].name).toEqual("Units.IN");
  });

  it("should render (composite format without label or composite spacer)", async () => {
    const compositeFormatProps: FormatProps = {
      composite: {
        includeZero: true,
        units: [{ name: "Units.FT" }, { name: "Units.IN" }],
      },
      formatTraits: ["keepSingleZero", "showUnitLabel"],
      precision: 4,
      type: "Decimal",
    };

    const unitsProvider = IModelApp.quantityFormatter.unitsProvider;
    const pu = await unitsProvider.findUnitByName("Units.M");

    const spy: ComponentSpy<typeof FormatUnits, "onUnitsChange"> = vi.fn();
    const component = render(
      <FormatUnits
        initialFormat={compositeFormatProps}
        persistenceUnit={pu}
        unitsProvider={unitsProvider}
        onUnitsChange={spy}
      />
    );

    const comboBox = within(component.getByTestId("unit-Units.IN")).getByRole(
      "combobox"
    );
    fireEvent.click(comboBox);
    await waitForPosition();

    const menu = component.getByRole("listbox");
    fireEvent.click(within(menu).getByRole("option", { name: "Remove" }));

    expect(spy).toHaveBeenCalledOnce();
    const format = spy.firstCall.args[0];
    expect(format.composite).not.to.be.undefined;
    expect(format.composite?.units[0].name).to.eql("Units.FT");
    expect(format.composite?.units.length).to.eql(1);
  });
});
