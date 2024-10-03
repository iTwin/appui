/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { QuantityTypeArg } from "@itwin/core-frontend";
import { IModelApp, NoRenderApp, QuantityType } from "@itwin/core-frontend";
import { act, fireEvent, render } from "@testing-library/react";
import { Key } from "ts-key-enum";
import * as React from "react";
import { QuantityNumberInput } from "../../imodel-components-react/inputs/QuantityNumberInput.js";
import TestUtils from "../TestUtils.js";

// cSpell:ignore decrementor QuantityNumberInput

function exoticStep(direction: string) {
  if (direction === "up") return 0.5;
  return 0.1;
}

function undefinedStepFunction(_direction: string) {
  return undefined;
}

const metersPerFoot = 0.3048;

describe("<QuantityNumberInput />", () => {
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

  it(`should render disabled correctly`, () => {
    const wrapper = render(
      <QuantityNumberInput
        persistenceValue={1}
        quantityType={QuantityType.Length}
        disabled={true}
      />
    );
    const disabled = wrapper.container.querySelector(
      ".component-quantity-number-input-disabled"
    );
    expect(disabled).toBeTruthy();
  });

  it(`should render ft-in as just ft`, () => {
    let value = 1;
    const handleChange = (v: number): void => {
      value = v;
    };
    const wrapper = render(
      <QuantityNumberInput
        persistenceValue={value}
        quantityType={QuantityType.Length}
        step={undefined}
        onChange={handleChange}
      />
    );
    const input = wrapper.container.querySelector("input");
    expect(input).toBeTruthy();
    expect((input as HTMLInputElement).value).toEqual("3.2808");
  });

  it("value should update with up/down buttons", () => {
    const initialLengthInMeters = 1;
    const initialLengthInFeet = 3.2808;
    const updatedLengthInMeters = 5;
    const updatedLengthInFeet = 16.4042;
    const incrementedLengthInMeters = 5.30480016;
    const incrementedLengthFeet = 17.4042;

    const spy = vi.fn();
    let updatedValue: number | undefined = 5;
    const handleChange = (v: number): void => {
      updatedValue = v;
      spy();
    };

    const wrapper = render(
      <QuantityNumberInput
        persistenceValue={initialLengthInMeters}
        quantityType={QuantityType.LengthEngineering}
        step={undefined}
        onChange={handleChange}
      />
    );
    const input = wrapper.container.querySelector("input") as HTMLInputElement;
    expect(input.value).toEqual(`${initialLengthInFeet}`);

    wrapper.rerender(
      <QuantityNumberInput
        persistenceValue={updatedLengthInMeters}
        quantityType={QuantityType.LengthEngineering}
        step={undefined}
        onChange={handleChange}
      />
    );
    expect(input.value).toEqual(`${updatedLengthInFeet}`);

    const incrementor = wrapper.container.querySelector(
      "div.component-quantity-number-input-button.component-quantity-number-input-button-up"
    );
    expect(incrementor).toBeTruthy();
    const decrementor = wrapper.container.querySelector(
      "div.component-quantity-number-input-button.component-quantity-number-input-button-down"
    );
    expect(decrementor).toBeTruthy();

    fireEvent.click(incrementor!);
    expect(input.value).toEqual(`${incrementedLengthFeet}`);
    expect(spy).toHaveBeenCalledOnce();
    expect(updatedValue).toEqual(incrementedLengthInMeters);

    fireEvent.click(decrementor!);
    expect(input.value).toEqual(`${updatedLengthInFeet}`);
    expect(Math.abs(updatedValue - updatedLengthInMeters) < 0.0001);
  });

  it("steps correctly with undefined step", () => {
    let value: number | undefined = 0;
    const handleChange = (v: number): void => {
      value = v;
    };
    const wrapper = render(
      <QuantityNumberInput
        persistenceValue={value}
        quantityType={QuantityType.LengthEngineering}
        step={undefined}
        onChange={handleChange}
      />
    );
    const incrementor = wrapper.container.querySelector(
      "div.component-quantity-number-input-button.component-quantity-number-input-button-up"
    );
    expect(incrementor).toBeTruthy();
    fireEvent.click(incrementor!);
    expect(value).toEqual(1 * metersPerFoot);
  });

  it("steps correctly with number step", () => {
    let value: number | undefined = 0;
    const spy = vi.fn();
    const handleChange = (v: number): void => {
      spy();
      value = v;
    };
    const wrapper = render(
      <QuantityNumberInput
        persistenceValue={value}
        quantityType={QuantityType.LengthEngineering}
        step={5}
        onChange={handleChange}
      />
    );
    const incrementor = wrapper.container.querySelector(
      "div.component-quantity-number-input-button.component-quantity-number-input-button-up"
    );
    expect(incrementor).toBeTruthy();
    fireEvent.click(incrementor!);
    expect(spy).toHaveBeenCalledOnce();
    expect(value).toEqual(5 * metersPerFoot);
  });

  it("steps correctly with decimal step", () => {
    let value: number = 0;
    const spy = vi.fn();
    const handleChange = (v: number): void => {
      spy();
      value = v;
    };
    const wrapper = render(
      <QuantityNumberInput
        persistenceValue={value}
        quantityType={QuantityType.LengthEngineering}
        step={0.25}
        onChange={handleChange}
      />
    );
    const incrementor = wrapper.container.querySelector(
      "div.component-quantity-number-input-button.component-quantity-number-input-button-up"
    );
    expect(incrementor).toBeTruthy();
    fireEvent.click(incrementor!);
    expect(spy).toHaveBeenCalledOnce();
    expect(value).toEqual(0.25 * metersPerFoot);
  });

  it("properly handle max", () => {
    let value: number = 0;
    const handleChange = (v: number): void => {
      value = v;
    };
    const wrapper = render(
      <QuantityNumberInput
        persistenceValue={value}
        quantityType={QuantityType.LengthEngineering}
        step={1}
        max={5}
        onChange={handleChange}
      />
    );
    const incrementor = wrapper.container.querySelector(
      "div.component-quantity-number-input-button.component-quantity-number-input-button-up"
    );
    expect(incrementor).toBeTruthy();
    fireEvent.click(incrementor!); // 1 ft
    fireEvent.click(incrementor!); // 2
    fireEvent.click(incrementor!); // 3
    fireEvent.click(incrementor!); // 4
    fireEvent.click(incrementor!); // 5
    fireEvent.click(incrementor!); // 6 => 5 ft
    expect(value).toEqual(5 * metersPerFoot);
  });

  it("properly handle MAX_SAFE_INTEGER value", () => {
    let value: number = Number.MAX_SAFE_INTEGER * metersPerFoot;
    const spy = vi.fn();
    const handleChange = (v: number): void => {
      spy();
      value = v;
    };
    const wrapper = render(
      <QuantityNumberInput
        persistenceValue={value}
        quantityType={QuantityType.LengthEngineering}
        step={1}
        onChange={handleChange}
      />
    );
    const incrementor = wrapper.container.querySelector(
      "div.component-quantity-number-input-button.component-quantity-number-input-button-up"
    );
    expect(incrementor).toBeTruthy();
    fireEvent.click(incrementor!);
    expect(spy).toHaveBeenCalledOnce();
    expect(value).toEqual(Number.MAX_SAFE_INTEGER * metersPerFoot);
  });

  it("properly handle min", () => {
    let value: number = 0;
    const handleChange = (v: number): void => {
      value = v;
    };
    const wrapper = render(
      <QuantityNumberInput
        persistenceValue={value}
        quantityType={QuantityType.LengthEngineering}
        step={1}
        min={-5}
        onChange={handleChange}
      />
    );
    const decrementor = wrapper.container.querySelector(
      "div.component-quantity-number-input-button.component-quantity-number-input-button-down"
    );
    expect(decrementor).toBeTruthy();
    fireEvent.click(decrementor!); // -1 ft
    fireEvent.click(decrementor!); // -2
    fireEvent.click(decrementor!); // -3
    fireEvent.click(decrementor!); // -4
    fireEvent.click(decrementor!); // -5
    fireEvent.click(decrementor!); // -6 => -5 ft
    expect(value).toEqual(-5 * metersPerFoot);
  });

  it("properly handle MIN_SAFE_INTEGER value", () => {
    let value: number | undefined = Number.MIN_SAFE_INTEGER * metersPerFoot;
    const spy = vi.fn();
    const handleChange = (v: number): void => {
      spy();
      value = v;
    };
    const wrapper = render(
      <QuantityNumberInput
        persistenceValue={value}
        quantityType={QuantityType.LengthEngineering}
        step={1}
        onChange={handleChange}
      />
    );
    const decrementor = wrapper.container.querySelector(
      "div.component-quantity-number-input-button.component-quantity-number-input-button-down"
    );
    expect(decrementor).toBeTruthy();
    fireEvent.click(decrementor!);
    expect(spy).toHaveBeenCalledOnce();
    expect(value).toEqual(Number.MIN_SAFE_INTEGER * metersPerFoot);
  });

  it("steps correctly with decimal step and snap", () => {
    const initialLengthInMeters = 1;
    // initialLengthInFeet = 3.2808 => 3.5
    const snapLengthInFeet = 3.5;
    let value = initialLengthInMeters;

    const spy = vi.fn();
    const handleChange = (v: number): void => {
      spy();
      value = v;
    };

    const wrapper = render(
      <QuantityNumberInput
        persistenceValue={initialLengthInMeters}
        quantityType={QuantityType.LengthEngineering}
        step={0.25}
        snap
        onChange={handleChange}
      />
    );
    const incrementor = wrapper.container.querySelector(
      "div.component-quantity-number-input-button.component-quantity-number-input-button-up"
    );
    expect(incrementor).toBeTruthy();
    fireEvent.click(incrementor!);
    expect(spy).toHaveBeenCalledOnce();
    expect(value).toEqual(snapLengthInFeet * metersPerFoot);
  });

  it("steps correctly when placeholder is used", () => {
    let value: number = 0;
    const handleChange = (v: number): void => {
      value = v;
    };
    const wrapper = render(
      <QuantityNumberInput
        persistenceValue={undefined}
        placeholder="Enter Text"
        quantityType={QuantityType.LengthEngineering}
        step={1}
        onChange={handleChange}
      />
    );
    const incrementor = wrapper.container.querySelector(
      "div.component-quantity-number-input-button.component-quantity-number-input-button-up"
    );
    expect(incrementor).toBeTruthy();
    fireEvent.click(incrementor!);
    expect(value).toEqual(1 * metersPerFoot);
    const decrementor = wrapper.container.querySelector(
      "div.component-quantity-number-input-button.component-quantity-number-input-button-down"
    );
    expect(decrementor).toBeTruthy();
    fireEvent.click(decrementor!);
    expect(value).toEqual(0);
  });

  it("steps correctly with function step +.5/-.1", () => {
    let value: number | undefined = 0;
    const handleChange = (v: number): void => {
      value = v;
    };
    // Note: requires precision to avoid round off during incrementing.
    const wrapper = render(
      <QuantityNumberInput
        persistenceValue={value}
        quantityType={QuantityType.LengthEngineering}
        step={exoticStep}
        onChange={handleChange}
      />
    );
    const incrementor = wrapper.container.querySelector(
      "div.component-quantity-number-input-button.component-quantity-number-input-button-up"
    );
    expect(incrementor).toBeTruthy();
    fireEvent.click(incrementor!);
    expect(value).toEqual(0.5 * metersPerFoot);
    const decrementor = wrapper.container.querySelector(
      "div.component-quantity-number-input-button.component-quantity-number-input-button-down"
    );
    expect(decrementor).toBeTruthy();
    fireEvent.click(decrementor!);
    expect(value).toEqual(0.4 * metersPerFoot);
  });

  it("steps correctly when step function return undefined (ie use default of 1)", () => {
    let value: number | undefined = 0;
    const handleChange = (v: number): void => {
      value = v;
    };
    // Note: requires precision to avoid round off during incrementing.
    const wrapper = render(
      <QuantityNumberInput
        persistenceValue={value}
        quantityType={QuantityType.LengthEngineering}
        step={undefinedStepFunction}
        onChange={handleChange}
      />
    );
    const incrementor = wrapper.container.querySelector(
      "div.component-quantity-number-input-button.component-quantity-number-input-button-up"
    );
    expect(incrementor).toBeTruthy();
    fireEvent.click(incrementor!);
    expect(value).toEqual(1 * metersPerFoot);
    const decrementor = wrapper.container.querySelector(
      "div.component-quantity-number-input-button.component-quantity-number-input-button-down"
    );
    expect(decrementor).toBeTruthy();
    fireEvent.click(decrementor!);
    expect(value).toEqual(0);
  });

  it("should increment/decrement value on Up/Down Arrow", () => {
    let value = 0;
    const spy = vi.fn();
    const handleChange = (v: number): void => {
      spy();
      value = v;
    };
    const spyKeyDown = vi.fn();
    const wrapper = render(
      <QuantityNumberInput
        persistenceValue={value}
        quantityType={QuantityType.LengthEngineering}
        step={0.25}
        onChange={handleChange}
        onKeyDown={spyKeyDown}
      />
    );
    const input = wrapper.container.querySelector("input");
    expect(input).toBeTruthy();
    fireEvent.keyDown(input!, { key: Key.ArrowUp });
    expect(spy).toHaveBeenCalledOnce();
    expect(value).toEqual(0.25 * metersPerFoot);

    spy.mockReset();
    fireEvent.keyDown(input!, { key: Key.ArrowDown });
    expect(spy).toHaveBeenCalledOnce();
    expect(value).toEqual(0);
    expect(spyKeyDown).toHaveBeenCalledTimes(2);
  });

  it("should update value on enter", () => {
    let value: number | undefined = 0;
    const spy = vi.fn();
    const handleChange = (v: number): void => {
      spy();
      value = v;
    };
    const wrapper = render(
      <QuantityNumberInput
        persistenceValue={value}
        quantityType={QuantityType.LengthEngineering}
        step={0.25}
        onChange={handleChange}
      />
    );
    const input = wrapper.container.querySelector("input");
    expect(input).toBeTruthy();
    fireEvent.change(input!, { target: { value: "22.3" } });
    fireEvent.keyDown(input!, { key: Key.Enter });
    expect(spy).toHaveBeenCalledOnce();
    expect(value).toEqual(22.3 * metersPerFoot);
  });

  it("should update value from inches to feet on enter", () => {
    let value: number | undefined = 0;
    const spy = vi.fn();
    const handleChange = (v: number): void => {
      spy();
      value = v;
    };
    const wrapper = render(
      <QuantityNumberInput
        persistenceValue={value}
        quantityType={QuantityType.LengthEngineering}
        step={0.25}
        onChange={handleChange}
      />
    );
    const input = wrapper.container.querySelector("input");
    expect(input).toBeTruthy();
    fireEvent.change(input!, { target: { value: "42in" } });
    fireEvent.keyDown(input!, { key: Key.Enter });
    expect(spy).toHaveBeenCalledOnce();
    expect(value).toEqual(3.5 * metersPerFoot);
  });

  it("should update value on blur", () => {
    let value: number | undefined = 0;
    const spy = vi.fn();
    const handleChange = (v: number): void => {
      spy();
      value = v;
    };
    const spyBlur = vi.fn();
    const wrapper = render(
      <QuantityNumberInput
        persistenceValue={value}
        quantityType={QuantityType.LengthEngineering}
        step={0.25}
        onChange={handleChange}
        onBlur={spyBlur}
      />
    );
    const input = wrapper.container.querySelector("input");
    expect(input).toBeTruthy();
    input?.focus();
    fireEvent.change(input!, { target: { value: "22.3" } });
    input?.blur();
    expect(value).toEqual(22.3 * metersPerFoot);
    expect(spyBlur).toHaveBeenCalledOnce();
    expect(spy).toHaveBeenCalledOnce();
  });

  it("should reset value on ESC", () => {
    const initialLengthInMeters = 1;
    // const initialLengthInFeet = 3.2808;

    let value = initialLengthInMeters;
    const spy = vi.fn();
    const handleChange = (v: number): void => {
      spy();
      value = v;
    };
    const wrapper = render(
      <QuantityNumberInput
        persistenceValue={value}
        quantityType={QuantityType.LengthEngineering}
        step={0.25}
        onChange={handleChange}
      />
    );
    const input = wrapper.container.querySelector("input");
    expect(input).toBeTruthy();
    input?.focus();
    const originalValue = (input as HTMLInputElement).value;
    fireEvent.change(input!, { target: { value: "22.3" } });
    expect((input as HTMLInputElement).value).toEqual("22.3");
    fireEvent.keyDown(input!, { key: Key.Escape });
    expect(spy).not.toBeCalled();
    expect((input as HTMLInputElement).value).toEqual(originalValue);

    // trigger callbacks that exercise useEffects
    const quantityKey = IModelApp.quantityFormatter.getQuantityTypeKey(
      QuantityType.LengthEngineering
    );
    act(() => {
      IModelApp.quantityFormatter.onQuantityFormatsChanged.emit({
        quantityType: quantityKey,
      });
      IModelApp.quantityFormatter.onActiveFormattingUnitSystemChanged.emit({
        system: "imperial",
      });
    });
  });

  it("should reset value to original when invalid text is entered", () => {
    let value = 1; // 3.2808ft
    const spy = vi.fn();
    const handleChange = (v: number): void => {
      spy();
      value = v;
    };
    const wrapper = render(
      <QuantityNumberInput
        persistenceValue={value}
        quantityType={QuantityType.LengthEngineering}
        step={0.25}
        onChange={handleChange}
      />
    );
    const input = wrapper.container.querySelector("input");
    expect(input).toBeTruthy();
    fireEvent.change(input!, { target: { value: "abc" } });
    expect((input as HTMLInputElement).value).toEqual("abc");
    fireEvent.keyDown(input!, { key: Key.Enter });
    expect(spy).not.toBeCalled(); // value was invalid so previous value restore and no callback
    expect((input as HTMLInputElement).value).toEqual("3.2808");
  });

  it("renders for touch correctly", () => {
    const wrapper = render(
      <QuantityNumberInput
        persistenceValue={0}
        quantityType={QuantityType.LengthEngineering}
        showTouchButtons
      />
    );
    const mainContainer = wrapper.container.querySelector(
      "div.component-quantity-number-input-container.component-number-buttons-for-touch"
    );
    expect(mainContainer).toBeTruthy();
    const buttonContainer = wrapper.container.querySelector(
      "div.component-quantity-number-input-buttons-container.component-number-buttons-for-touch"
    );
    expect(buttonContainer).toBeTruthy();
  });

  describe("<QuantityNumberInput with undefined formatter and parser specs/>", () => {
    beforeEach(() => {
      vi.spyOn(
        IModelApp.quantityFormatter,
        "findFormatterSpecByQuantityType"
      ).mockImplementation((_type: QuantityTypeArg, _unused?: boolean) => {
        return undefined;
      });
      vi.spyOn(
        IModelApp.quantityFormatter,
        "findParserSpecByQuantityType"
      ).mockImplementation((_type: QuantityTypeArg) => {
        return undefined;
      });
    });

    it("renders correctly", () => {
      let value = 1;
      const spy = vi.fn();
      const handleChange = (v: number): void => {
        spy();
        value = v;
      };
      const wrapper = render(
        <QuantityNumberInput
          persistenceValue={value}
          quantityType={QuantityType.LengthEngineering}
          step={0.25}
          onChange={handleChange}
        />
      );
      const input = wrapper.container.querySelector("input");
      expect(input).toBeTruthy();
      expect((input as HTMLInputElement).value).toEqual("1.00");

      fireEvent.change(input!, { target: { value: "2" } });
      expect((input as HTMLInputElement).value).toEqual("2");
      fireEvent.keyDown(input!, { key: Key.Enter });
      expect(spy).toHaveBeenCalledOnce();
      expect((input as HTMLInputElement).value).toEqual("2.00");
    });
  });

  describe("<QuantityNumberInput with override numeric formats/>", () => {
    const overrideLengthFormats = {
      metric: {
        formatTraits: ["keepSingleZero", "keepDecimalPoint", "showUnitLabel"],
        precision: 6,
        type: "Decimal",
        uomSeparator: " ",
        decimalSeparator: ".",
      },
      imperial: {
        formatTraits: ["keepSingleZero", "keepDecimalPoint", "showUnitLabel"],
        precision: 6,
        type: "Decimal",
        uomSeparator: " ",
        decimalSeparator: ".",
      },
      usCustomary: {
        formatTraits: ["keepSingleZero", "keepDecimalPoint", "showUnitLabel"],
        precision: 6,
        type: "Decimal",
        uomSeparator: " ",
        decimalSeparator: ".",
      },
      usSurvey: {
        formatTraits: ["keepSingleZero", "keepDecimalPoint", "showUnitLabel"],
        precision: 6,
        type: "Decimal",
        uomSeparator: " ",
        decimalSeparator: ".",
      },
    };

    it("renders correctly when formats are not composites", async () => {
      await IModelApp.quantityFormatter.setOverrideFormats(
        QuantityType.Length,
        overrideLengthFormats
      );

      let value = 1; // since no units are specified the persistence unit of meters are used.
      const spy = vi.fn();
      const handleChange = (v: number): void => {
        spy();
        value = v;
      };
      const wrapper = render(
        <QuantityNumberInput
          persistenceValue={value}
          quantityType={QuantityType.Length}
          step={0.25}
          onChange={handleChange}
        />
      );
      const input = wrapper.container.querySelector("input");
      expect(input).toBeTruthy();
      expect((input as HTMLInputElement).value.slice(0, 2)).toEqual("1.");

      fireEvent.change(input!, { target: { value: "2" } });
      expect((input as HTMLInputElement).value).toEqual("2");
      fireEvent.keyDown(input!, { key: Key.Enter });
      expect(spy).toHaveBeenCalledOnce();
      expect((input as HTMLInputElement).value.slice(0, 2)).toEqual("2.");

      await act(async () => {
        await IModelApp.quantityFormatter.clearAllOverrideFormats();
      });
    });
  });
});
