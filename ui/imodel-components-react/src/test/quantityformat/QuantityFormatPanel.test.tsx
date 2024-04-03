/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { act } from "react-dom/test-utils";
import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Key } from "ts-key-enum";
import { IModelApp, NoRenderApp, QuantityType } from "@itwin/core-frontend";
import type { FormatProps } from "@itwin/core-quantity";
import { BearingQuantityType } from "./BearingQuantityType";
import { TestUtils, waitForPosition } from "../TestUtils";
import { QuantityFormatPanel } from "../../imodel-components-react/quantityformat/QuantityFormatPanel";

describe("QuantityInput", () => {
  let theUserTo: ReturnType<typeof userEvent.setup>;

  beforeEach(async () => {
    theUserTo = userEvent.setup();

    // Avoid requestAnimationFrame exception during test by temporarily replacing function that calls it.
    vi.spyOn(IModelApp, "requestNextAnimation").mockImplementation(() => {});
    await TestUtils.initializeUiIModelComponents();
    await NoRenderApp.startup();
    await IModelApp.quantityFormatter.clearAllOverrideFormats();
  });

  afterEach(async () => {
    await IModelApp.shutdown();
    TestUtils.terminateUiIModelComponents();
  });

  it("should render basic panel", () => {
    const component = render(
      <QuantityFormatPanel quantityType={QuantityType.Length} />
    );
    expect(component).toBeTruthy();
  });

  it("should render basic panel with sample", () => {
    const component = render(
      <QuantityFormatPanel
        quantityType={QuantityType.Length}
        showSample
        initialMagnitude={123.45}
      />
    );
    expect(component).toBeTruthy();
  });

  it("should render basic panel with more/less option", () => {
    const component = render(
      <QuantityFormatPanel
        quantityType={QuantityType.Length}
        showSample
        initialMagnitude={123.45}
        enableMinimumProperties
      />
    );
    expect(component).toBeTruthy();
  });

  it("should render new sample when format is changed", async () => {
    const overrideLengthFormat: FormatProps = {
      composite: {
        includeZero: true,
        spacer: " ",
        units: [{ label: "in", name: "Units.IN" }],
      },
      formatTraits: ["keepSingleZero", "showUnitLabel"],
      precision: 4,
      type: "Decimal",
    };
    const component = render(
      <QuantityFormatPanel
        quantityType={QuantityType.Length}
        showSample
        initialMagnitude={123.45}
        enableMinimumProperties
      />
    );
    await waitFor(() => {
      component.getByText(`405'-0 1/4"`);
    });

    await act(async () => {
      await IModelApp.quantityFormatter.setOverrideFormat(
        QuantityType.Length,
        overrideLengthFormat
      );
    });

    // TODO: potential issue - explicit rerender needed.
    component.rerender(
      <QuantityFormatPanel
        quantityType={QuantityType.Length}
        showSample
        initialMagnitude={123.45}
        enableMinimumProperties
      />
    );
    await waitFor(() => {
      component.getByText("4860.2362 in");
    });

    await act(async () => {
      await IModelApp.quantityFormatter.clearOverrideFormats(
        QuantityType.Length
      );
    });
  });

  it("should handle onFormatChange UOM separator", async () => {
    const spy = vi.fn();
    const component = render(
      <QuantityFormatPanel
        quantityType={QuantityType.Length}
        showSample
        initialMagnitude={123.45}
        onFormatChange={spy}
      />
    );
    expect(component).toBeTruthy();
    expect(spy).not.toBeCalled();
    const spanElement = component.getByTestId("format-sample-formatted");

    const comboBox = within(
      component.getByTestId("uom-separator-select")
    ).getByRole("combobox");
    await theUserTo.click(comboBox);
    await theUserTo.click(
      component.getByRole("option", {
        name: "QuantityFormat.space",
      })
    );

    expect(spy).toHaveBeenCalledOnce();
    spy.mockReset();
    expect(spanElement.textContent).to.be.eql(`405 '-0 1/4 "`);

    // change back from space to none;
    await theUserTo.click(comboBox);
    await theUserTo.click(
      component.getByRole("option", {
        name: "QuantityFormat.none",
      })
    );
    expect(spy).toHaveBeenCalledOnce();
    spy.mockReset();
    expect(spanElement.textContent).to.be.eql(`405'-0 1/4"`);

    await theUserTo.click(screen.getByTestId("show-unit-label-checkbox"));
    expect(spy).toHaveBeenCalledOnce();
    spy.mockReset();
    expect(spanElement.textContent).to.be.eql(`405:-0 1/4`); // TODO: does this match Native formatter?

    await theUserTo.click(screen.getByTestId("show-unit-label-checkbox"));
    expect(spy).toHaveBeenCalledOnce();
    spy.mockReset();
    expect(spanElement.textContent).to.be.eql(`405'-0 1/4"`);
  });

  it("should handle onFormatChange Composite separator", async () => {
    // default QuantityType.Length should show ft-in (ie composite)
    const spy = vi.fn();
    const component = render(
      <QuantityFormatPanel
        quantityType={QuantityType.Length}
        showSample
        initialMagnitude={123.45}
        onFormatChange={spy}
      />
    );
    expect(spy).not.toBeCalled();

    const spanElement = component.getByTestId("format-sample-formatted");
    await waitFor(() => {
      expect(spanElement.textContent).to.be.eql(`405'-0 1/4"`);
    });

    await theUserTo.type(component.getByTestId("composite-spacer"), "x", {
      initialSelectionStart: 0,
      initialSelectionEnd: Infinity,
    });
    expect(spanElement.textContent).to.be.eql(`405'x0 1/4"`);
    expect(spy).toHaveBeenCalled();
    spy.mockReset();

    await theUserTo.type(component.getByTestId("composite-spacer"), "xxx", {
      initialSelectionStart: 0,
      initialSelectionEnd: Infinity,
    });
    expect(spanElement.textContent).to.be.eql(`405'x0 1/4"`);
    expect(spy).toHaveBeenCalled();
  });

  it("should handle onFormatChange Type selection", async () => {
    const spy = vi.fn();
    const component = render(
      <QuantityFormatPanel
        quantityType={QuantityType.Length}
        showSample
        initialMagnitude={123.45}
        onFormatChange={spy}
      />
    );
    const comboBox = within(
      component.getByTestId("format-type-selector")
    ).getByRole("combobox");
    fireEvent.click(comboBox);

    fireEvent.click(
      component.getByRole("option", {
        name: "QuantityFormat.scientific",
      })
    );
    await waitForPosition();
    expect(spy).toHaveBeenCalledOnce();
  });

  it("should handle onFormatChange Fraction precision selection", async () => {
    // QuantityType.Length by default is set to Type=Fraction
    const spy = vi.fn();
    const component = render(
      <QuantityFormatPanel
        quantityType={QuantityType.Length}
        showSample
        initialMagnitude={123.45}
        onFormatChange={spy}
      />
    );
    const comboBox = within(
      component.getByTestId("fraction-precision-selector")
    ).getByRole("combobox");
    fireEvent.click(comboBox);

    fireEvent.click(
      component.getByRole("option", {
        name: "QuantityFormat.fraction_precision.half",
      })
    );
    await waitForPosition();
    expect(spy).toHaveBeenCalledOnce();
  });

  it("should handle onFormatChange Decimal precision selection", async () => {
    const spy = vi.fn();
    const component = render(
      <QuantityFormatPanel
        quantityType={QuantityType.Length}
        showSample
        initialMagnitude={123.45}
        onFormatChange={spy}
      />
    );

    const comboBox = within(
      component.getByTestId("format-type-selector")
    ).getByRole("combobox");
    fireEvent.click(comboBox);

    fireEvent.click(
      component.getByRole("option", {
        name: "QuantityFormat.decimal",
      })
    );

    expect(spy).toHaveBeenCalledOnce();
    spy.mockReset();

    const precisionSelector = within(
      component.getByTestId("decimal-precision-selector")
    ).getByRole("combobox");
    fireEvent.click(precisionSelector);

    fireEvent.click(
      component.getByRole("option", {
        name: "QuantityFormat.decimal_precision.one",
      })
    );
    await waitForPosition();
    expect(spy).toHaveBeenCalledOnce();
  });

  it("should handle processing more/less", async () => {
    const component = render(
      <QuantityFormatPanel
        quantityType={QuantityType.Length}
        showSample
        initialMagnitude={123.45}
        enableMinimumProperties
      />
    );
    fireEvent.click(component.getByText("QuantityFormat.labels.moreLabel"));
    fireEvent.click(component.getByText("QuantityFormat.labels.lessLabel"));
    fireEvent.keyUp(component.getByText("QuantityFormat.labels.moreLabel"), {
      key: Key.Enter,
    });
    fireEvent.keyUp(component.getByText("QuantityFormat.labels.lessLabel"), {
      key: " ",
    });
    await waitForPosition();
  });

  it("should handle onFormatChange when changing sign option", async () => {
    const spy = vi.fn();
    const component = render(
      <QuantityFormatPanel
        quantityType={QuantityType.Length}
        showSample
        initialMagnitude={123.45}
        onFormatChange={spy}
      />
    );

    const comboBox = within(
      component.getByTestId("sign-option-selector")
    ).getByRole("combobox");
    fireEvent.click(comboBox);
    fireEvent.click(
      component.getByRole("option", {
        name: "QuantityFormat.sign_option.signAlways",
      })
    );
    await waitForPosition();
    expect(spy).toHaveBeenCalledOnce();
  });

  it("should handle onFormatChange when changing station size option", async () => {
    const spy = vi.fn();
    const component = render(
      <QuantityFormatPanel
        quantityType={QuantityType.Length}
        showSample
        initialMagnitude={123.45}
        onFormatChange={spy}
      />
    );

    fireEvent.click(
      within(component.getByTestId("format-type-selector")).getByRole(
        "combobox"
      )
    );
    fireEvent.click(
      component.getByRole("option", {
        name: "QuantityFormat.station",
      })
    );
    expect(spy).toHaveBeenCalledOnce();
    spy.mockReset();

    fireEvent.click(
      within(component.getByTestId("station-size-selector")).getByRole(
        "combobox"
      )
    );
    fireEvent.click(
      component.getByRole("option", {
        name: "QuantityFormat.station_size.three",
      })
    );
    expect(spy).toHaveBeenCalledOnce();
    spy.mockReset();

    fireEvent.click(
      within(component.getByTestId("station-separator-selector")).getByRole(
        "combobox"
      )
    );
    fireEvent.click(
      component.getByRole("option", {
        name: "QuantityFormat.station_separator.minus",
      })
    );
    await waitForPosition();
    expect(spy).toHaveBeenCalledOnce();
  });

  it("should handle onFormatChange when changing thousands separator", async () => {
    const spy = vi.fn();
    const component = render(
      <QuantityFormatPanel
        quantityType={QuantityType.Length}
        showSample
        initialMagnitude={12345.67}
        onFormatChange={spy}
      />
    );

    /* turn on */
    fireEvent.click(component.getByTestId("use-thousands-separator"));
    expect(spy).toHaveBeenCalledOnce();
    spy.mockReset();

    fireEvent.click(
      within(component.getByTestId("thousands-separator-selector")).getByRole(
        "combobox"
      )
    );
    fireEvent.click(
      component.getByRole("option", {
        name: "QuantityFormat.thousand_separator.point",
      })
    );
    expect(spy).toHaveBeenCalledOnce();
    spy.mockReset();

    /* turn off */
    fireEvent.click(component.getByTestId("use-thousands-separator"));
    expect(spy).toHaveBeenCalledOnce();
    spy.mockReset();

    /* turn on */
    fireEvent.click(component.getByTestId("use-thousands-separator"));
    await waitForPosition();
    expect(spy).toHaveBeenCalledOnce();
    spy.mockReset();
    component.getByText(`40.504'-2"`);

    fireEvent.click(
      within(component.getByTestId("thousands-separator-selector")).getByRole(
        "combobox"
      )
    );
    fireEvent.click(
      component.getByRole("option", {
        name: "QuantityFormat.thousand_separator.comma",
      })
    );
    await waitForPosition();
    expect(spy).toHaveBeenCalledOnce();
    component.getByText(`40,504'-2"`);
  });

  it("should handle onFormatChange when changing decimal separator", async () => {
    const spy = vi.fn();
    const component = render(
      <QuantityFormatPanel
        quantityType={QuantityType.Length}
        showSample
        initialMagnitude={12345.67}
        onFormatChange={spy}
      />
    );

    fireEvent.click(
      within(component.getByTestId("format-type-selector")).getByRole(
        "combobox"
      )
    );
    fireEvent.click(
      component.getByRole("option", {
        name: "QuantityFormat.decimal",
      })
    );
    expect(spy).toHaveBeenCalledOnce();
    spy.mockReset();

    /* turn on 1000 separator */
    fireEvent.click(component.getByTestId("use-thousands-separator"));
    expect(spy).toHaveBeenCalledOnce();
    spy.mockReset();

    const separatorSelector = within(
      component.getByTestId("decimal-separator-selector")
    ).getByRole("combobox");
    fireEvent.click(separatorSelector);
    fireEvent.click(
      component.getByRole("option", {
        name: "QuantityFormat.decimal_separator.comma",
      })
    );
    expect(spy).toHaveBeenCalledOnce();
    spy.mockReset();

    fireEvent.click(separatorSelector);
    fireEvent.click(
      component.getByRole("option", {
        name: "QuantityFormat.decimal_separator.point",
      })
    );
    await waitForPosition();
    expect(spy).toHaveBeenCalledOnce();
  });

  it("should handle onFormatChange when changing traits", async () => {
    const spy = vi.fn();
    const component = render(
      <QuantityFormatPanel
        quantityType={QuantityType.Length}
        showSample
        initialMagnitude={12345.67}
        onFormatChange={spy}
      />
    );

    // test fraction specific trait before changing type
    fireEvent.click(component.getByTestId("fraction-dash"));
    expect(spy).toHaveBeenCalledOnce();
    spy.mockReset();

    const typeSelector = within(
      component.getByTestId("format-type-selector")
    ).getByRole("combobox");
    fireEvent.click(typeSelector);
    fireEvent.click(
      component.getByRole("option", {
        name: "QuantityFormat.decimal",
      })
    );
    expect(spy).toHaveBeenCalledOnce();
    spy.mockReset();

    fireEvent.click(component.getByTestId("show-trail-zeros"));
    expect(spy).toHaveBeenCalledOnce();
    spy.mockReset();

    fireEvent.click(component.getByTestId("keep-decimal-point"));
    expect(spy).toHaveBeenCalledOnce();
    spy.mockReset();

    fireEvent.click(component.getByTestId("keep-single-zero"));
    expect(spy).toHaveBeenCalledOnce();
    spy.mockReset();

    fireEvent.click(component.getByTestId("zero-empty"));
    expect(spy).toHaveBeenCalledOnce();
    spy.mockReset();

    fireEvent.click(typeSelector);
    fireEvent.click(
      component.getByRole("option", {
        name: "QuantityFormat.scientific",
      })
    );
    expect(spy).toHaveBeenCalledOnce();
    spy.mockReset();

    fireEvent.click(
      within(component.getByTestId("scientific-type-selector")).getByRole(
        "combobox"
      )
    );
    fireEvent.click(
      component.getByRole("option", {
        name: "QuantityFormat.scientific-type.zero-normalized",
      })
    );
    await waitForPosition();
    expect(spy).toHaveBeenCalledOnce();
  });

  it("should handle onFormatChange when changing composite units", async () => {
    const spy = vi.fn();
    const component = render(
      <QuantityFormatPanel
        quantityType={QuantityType.Length}
        showSample
        initialMagnitude={123.45}
        onFormatChange={spy}
      />
    );

    fireEvent.click(
      within(component.getByTestId("unit-Units.IN")).getByRole("combobox")
    );
    await waitForPosition();

    fireEvent.click(
      component.getByRole("option", {
        name: "Remove",
      })
    );
    await waitForPosition();
    expect(spy).toHaveBeenCalledOnce();
  });

  it("should handle onFormatChange when changing adding composite unit", async () => {
    const spy = vi.fn();
    const component = render(
      <QuantityFormatPanel
        quantityType={QuantityType.LengthEngineering}
        showSample
        initialMagnitude={123.45}
        onFormatChange={spy}
      />
    );

    fireEvent.click(
      within(component.getByTestId("unit-Units.FT")).getByRole("combobox")
    );
    await waitForPosition();
    fireEvent.click(
      component.getByRole("option", {
        name: "IN",
      })
    );
    await waitForPosition();
    expect(spy).toHaveBeenCalledOnce();
  });

  it("should handle onFormatChange when changing primary unit", async () => {
    const spy = vi.fn();
    const component = render(
      <QuantityFormatPanel
        quantityType={QuantityType.LengthEngineering}
        showSample
        initialMagnitude={123.45}
        onFormatChange={spy}
      />
    );
    fireEvent.click(
      within(component.getByTestId("unit-Units.FT")).getByRole("combobox")
    );
    await waitForPosition();

    fireEvent.click(
      component.getByRole("option", {
        name: "Add sub-unit",
      })
    );
    await waitForPosition();
    expect(spy).toHaveBeenCalledOnce();
  });

  it("should handle sample value change", async () => {
    const component = render(
      <QuantityFormatPanel
        quantityType={QuantityType.LengthEngineering}
        showSample
        initialMagnitude={123.45}
      />
    );

    const sampleInput = component.getByTestId("format-sample-input");
    await theUserTo.type(sampleInput, "729.32[Enter]", {
      initialSelectionStart: 0,
      initialSelectionEnd: Infinity,
    });
    await waitFor(() => {
      component.getByDisplayValue("729.32");
    });

    await theUserTo.type(sampleInput, "a[Enter]", {
      initialSelectionStart: 0,
      initialSelectionEnd: Infinity,
    });
    await waitFor(() => {
      component.getByDisplayValue("0");
    });

    await theUserTo.type(sampleInput, "14.12", {
      initialSelectionStart: 0,
      initialSelectionEnd: Infinity,
    });
    await theUserTo.tab();

    component.getByDisplayValue("14.12");

    await theUserTo.type(sampleInput, "a", {
      initialSelectionStart: 0,
      initialSelectionEnd: Infinity,
    });
    await theUserTo.tab();
    await waitFor(() => {
      component.getByDisplayValue("0");
    });

    // cover update props case
    component.rerender(
      <QuantityFormatPanel
        quantityType={QuantityType.LengthEngineering}
        showSample
        initialMagnitude={4}
      />
    );
    component.getByDisplayValue("4");

    component.rerender(
      <QuantityFormatPanel
        quantityType={QuantityType.LengthEngineering}
        showSample
      />
    );
    component.getByDisplayValue("0");

    component.rerender(
      <QuantityFormatPanel
        quantityType={QuantityType.LengthEngineering}
        showSample
      />
    );
    component.getByDisplayValue("0");
  });

  it("should handle onFormatChange when changing primary unit", async () => {
    const spy = vi.fn();
    const component = render(
      <QuantityFormatPanel
        quantityType={QuantityType.LengthEngineering}
        showSample
        initialMagnitude={123.45}
        onFormatChange={spy}
      />
    );
    const primaryUnitLabel = component.getByTestId("unit-label-Units.FT");
    await theUserTo.type(primaryUnitLabel, "testfeet");
    const itemLabel = await component.findByText(/testfeet/);
    expect(itemLabel).to.exist;
    expect(spy).toHaveBeenCalled();

    // NEEDSWORK - Can't get the selectChangeValueByText below to work
    // const primaryUnitSelector = component.getByTestId("unit-Units.FT");
    // fireEvent.change(primaryUnitSelector, { target: {value:"Units.YRD:yd"}});
    // const unitLabel = await component.findByTestId("unit-label-Units.YRD");
    // expect(unitLabel).to.exist;
    // expect(spy).toHaveBeenCalledOnce();
    // spy.mockReset();
  });

  describe("Properties from Custom Quantity Type are Rendered", () => {
    beforeEach(async () => {
      // register new QuantityType
      await BearingQuantityType.registerQuantityType();
    });

    it("should handle onFormatChange when changing changing primary unit", async () => {
      const spy = vi.fn();
      const component = render(
        <QuantityFormatPanel
          quantityType={"Bearing"}
          showSample
          initialMagnitude={1.45}
          onFormatChange={spy}
        />
      );

      const textField = component.getByTestId("text-1-editor");
      await theUserTo.type(textField, "Hello", {
        initialSelectionStart: 0,
        initialSelectionEnd: Infinity,
      });
      expect(spy).toHaveBeenCalled();
      spy.mockReset();

      const checkboxField = component.getByTestId("checkbox-0-editor");
      await theUserTo.click(checkboxField);
      expect(spy).toHaveBeenCalledOnce();
      spy.mockReset();

      const selectField = component.getByTestId("select-0-editor");
      await theUserTo.click(
        within(selectField).getByText(
          "BearingQuantityType.bearingAngleDirection.clockwise"
        )
      );
      await theUserTo.click(screen.getByText(/counter-clockwise/));
      expect(spy).toHaveBeenCalledOnce();
    });
  });
});
