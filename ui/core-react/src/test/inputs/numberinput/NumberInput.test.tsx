/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { fireEvent, render } from "@testing-library/react";
import * as React from "react";
import { Key } from "ts-key-enum";
import { NumberInput } from "../../../core-react/inputs/numberinput/NumberInput.js";

function parseDollar(stringValue: string) {
  const noDollarSign = stringValue.replace(/^\$/, "");
  let n = parseFloat(noDollarSign);
  if (isNaN(n) || !isFinite(n)) n = 0;
  return n;
}

function formatDollar(num: number | undefined | null, fallback: string) {
  if (undefined === num || null === num) return fallback;

  return `$${num.toFixed(2)}`;
}

function exoticStep(direction: string) {
  if (direction === "up") return 0.5;
  return 0.1;
}

function undefinedStepFunction(_direction: string) {
  return undefined;
}

describe("<NumberInput - React Testing Library />", () => {
  it("should render correctly disabled", () => {
    let value: number | undefined = 0;
    const handleChange = (
      v: number | undefined,
      _stringValue: string
    ): void => {
      value = v;
    };
    const wrapper = render(
      <NumberInput
        value={value}
        step={undefined}
        onChange={handleChange}
        disabled
      />
    );
    const disabledWrapper = wrapper.container.querySelector(
      "div.core-number-input-container.core-number-input-disabled"
    );
    expect(disabledWrapper).toBeTruthy();
    const incrementor = wrapper.container.querySelector(
      "div.core-number-input-button.core-number-input-button-up"
    );
    expect(incrementor).toBeTruthy();
    fireEvent.click(incrementor!);
    expect(value).toEqual(value);
  });

  it("value should update with up/down buttons", () => {
    const spy = vi.fn();
    let updatedValue: number | undefined = 5;
    const handleChange = (
      v: number | undefined,
      _stringValue: string
    ): void => {
      updatedValue = v;
      spy();
    };

    const wrapper = render(
      <NumberInput value={1} step={undefined} onChange={handleChange} />
    );
    const input = wrapper.container.querySelector("input") as HTMLInputElement;
    expect(input.value).toEqual("1");

    wrapper.rerender(
      <NumberInput value={5} step={undefined} onChange={handleChange} />
    );
    expect(input.value).toEqual("5");

    const incrementor = wrapper.container.querySelector(
      "div.core-number-input-button.core-number-input-button-up"
    );
    expect(incrementor).toBeTruthy();
    const decrementor = wrapper.container.querySelector(
      "div.core-number-input-button.core-number-input-button-down"
    );
    expect(decrementor).toBeTruthy();

    fireEvent.click(incrementor!);
    expect(input.value).toEqual("6");
    expect(spy).toHaveBeenCalledOnce();
    expect(updatedValue).toEqual(6);

    fireEvent.click(decrementor!);
    expect(updatedValue).toEqual(5);
  });

  it("steps correctly with undefined step", () => {
    let value: number | undefined = 0;
    const handleChange = (
      v: number | undefined,
      _stringValue: string
    ): void => {
      value = v;
    };
    const wrapper = render(
      <NumberInput value={value} step={undefined} onChange={handleChange} />
    );
    const incrementor = wrapper.container.querySelector(
      "div.core-number-input-button.core-number-input-button-up"
    );
    expect(incrementor).toBeTruthy();
    fireEvent.click(incrementor!);
    expect(value).toEqual(1);
  });

  it("steps correctly with number step", () => {
    let value: number | undefined = 0;
    const spy = vi.fn();
    const handleChange = (
      v: number | undefined,
      _stringValue: string
    ): void => {
      spy();
      value = v;
    };
    const wrapper = render(
      <NumberInput value={value} step={5} onChange={handleChange} />
    );
    const incrementor = wrapper.container.querySelector(
      "div.core-number-input-button.core-number-input-button-up"
    );
    expect(incrementor).toBeTruthy();
    fireEvent.click(incrementor!);
    expect(spy).toHaveBeenCalledOnce();
    expect(value).toEqual(5);
  });

  it("steps correctly with decimal step", () => {
    let value: number | undefined = 1.23;
    const spy = vi.fn();
    const handleChange = (
      v: number | undefined,
      _stringValue: string
    ): void => {
      spy();
      value = v;
    };
    const wrapper = render(
      <NumberInput
        precision={2}
        value={value}
        step={0.25}
        onChange={handleChange}
      />
    );
    const incrementor = wrapper.container.querySelector(
      "div.core-number-input-button.core-number-input-button-up"
    );
    expect(incrementor).toBeTruthy();
    fireEvent.click(incrementor!);
    expect(spy).toHaveBeenCalledOnce();
    expect(value).toEqual(1.48);
  });

  it("properly handle max", () => {
    let value: number | undefined = 0;
    const handleChange = (
      v: number | undefined,
      _stringValue: string
    ): void => {
      value = v;
    };
    const wrapper = render(
      <NumberInput value={value} step={1} max={5} onChange={handleChange} />
    );
    const incrementor = wrapper.container.querySelector(
      "div.core-number-input-button.core-number-input-button-up"
    );
    expect(incrementor).toBeTruthy();
    fireEvent.click(incrementor!); // 1
    fireEvent.click(incrementor!); // 2
    fireEvent.click(incrementor!); // 3
    fireEvent.click(incrementor!); // 4
    fireEvent.click(incrementor!); // 5
    fireEvent.click(incrementor!); // 6 => 5
    expect(value).toEqual(5);
  });

  it("properly handle MAX_SAFE_INTEGER value", () => {
    let value: number | undefined = Number.MAX_SAFE_INTEGER;
    const spy = vi.fn();
    const handleChange = (
      v: number | undefined,
      _stringValue: string
    ): void => {
      spy();
      value = v;
    };
    const wrapper = render(
      <NumberInput value={value} step={1} onChange={handleChange} />
    );
    const incrementor = wrapper.container.querySelector(
      "div.core-number-input-button.core-number-input-button-up"
    );
    expect(incrementor).toBeTruthy();
    fireEvent.click(incrementor!);
    expect(spy).toHaveBeenCalledOnce();
    expect(value).toEqual(Number.MAX_SAFE_INTEGER);
  });

  it("properly handle min", () => {
    let value: number | undefined = 0;
    const handleChange = (
      v: number | undefined,
      _stringValue: string
    ): void => {
      value = v;
    };
    const wrapper = render(
      <NumberInput value={value} step={1} min={-5} onChange={handleChange} />
    );
    const decrementor = wrapper.container.querySelector(
      "div.core-number-input-button.core-number-input-button-down"
    );
    expect(decrementor).toBeTruthy();
    fireEvent.click(decrementor!); // -1
    fireEvent.click(decrementor!); // -2
    fireEvent.click(decrementor!); // -3
    fireEvent.click(decrementor!); // -4
    fireEvent.click(decrementor!); // -5
    fireEvent.click(decrementor!); // -6 => -5
    expect(value).toEqual(-5);
  });

  it("properly handle MIN_SAFE_INTEGER value", () => {
    let value: number | undefined = Number.MIN_SAFE_INTEGER;
    const spy = vi.fn();
    const handleChange = (
      v: number | undefined,
      _stringValue: string
    ): void => {
      spy();
      value = v;
    };
    const wrapper = render(
      <NumberInput value={value} step={1} onChange={handleChange} />
    );
    const decrementor = wrapper.container.querySelector(
      "div.core-number-input-button.core-number-input-button-down"
    );
    expect(decrementor).toBeTruthy();
    fireEvent.click(decrementor!);
    expect(spy).toHaveBeenCalledOnce();
    expect(value).toEqual(Number.MIN_SAFE_INTEGER);
  });

  it("steps correctly with decimal step and snap", () => {
    let value: number | undefined = 1.23;
    let formattedValue: string = "";
    const spy = vi.fn();
    const handleChange = (v: number | undefined, stringValue: string): void => {
      spy();
      value = v;
      formattedValue = stringValue;
    };

    const wrapper = render(
      <NumberInput
        precision={2}
        value={value}
        step={0.25}
        snap
        onChange={handleChange}
      />
    );
    const incrementor = wrapper.container.querySelector(
      "div.core-number-input-button.core-number-input-button-up"
    );
    expect(incrementor).toBeTruthy();
    fireEvent.click(incrementor!);
    expect(spy).toHaveBeenCalledOnce();
    expect(value).toEqual(1.5);
    expect(formattedValue).toEqual("1.50");
  });

  it("steps correctly when placeholder is used", () => {
    let value: number | undefined = 0;
    const handleChange = (
      v: number | undefined,
      _stringValue: string
    ): void => {
      value = v;
    };
    const wrapper = render(
      <NumberInput placeholder="Enter Text" step={1} onChange={handleChange} />
    );
    const incrementor = wrapper.container.querySelector(
      "div.core-number-input-button.core-number-input-button-up"
    );
    expect(incrementor).toBeTruthy();
    fireEvent.click(incrementor!);
    expect(value).toEqual(1);
    const decrementor = wrapper.container.querySelector(
      "div.core-number-input-button.core-number-input-button-down"
    );
    expect(decrementor).toBeTruthy();
    fireEvent.click(decrementor!);
    expect(value).toEqual(0);
  });

  it("steps correctly with function step +.5/-.1", () => {
    let value: number | undefined = 0;
    const handleChange = (
      v: number | undefined,
      _stringValue: string
    ): void => {
      value = v;
    };
    // Note: requires precision to avoid round off during incrementing.
    const wrapper = render(
      <NumberInput
        value={value}
        precision={1}
        step={exoticStep}
        onChange={handleChange}
      />
    );
    const incrementor = wrapper.container.querySelector(
      "div.core-number-input-button.core-number-input-button-up"
    );
    expect(incrementor).toBeTruthy();
    fireEvent.click(incrementor!);
    expect(value).toEqual(0.5);
    const decrementor = wrapper.container.querySelector(
      "div.core-number-input-button.core-number-input-button-down"
    );
    expect(decrementor).toBeTruthy();
    fireEvent.click(decrementor!);
    expect(value).toEqual(0.4);
  });

  it("steps correctly when step function return undefined", () => {
    let value: number | undefined = 0;
    const handleChange = (
      v: number | undefined,
      _stringValue: string
    ): void => {
      value = v;
    };
    // Note: requires precision to avoid round off during incrementing.
    const wrapper = render(
      <NumberInput
        value={value}
        precision={1}
        step={undefinedStepFunction}
        onChange={handleChange}
      />
    );
    const incrementor = wrapper.container.querySelector(
      "div.core-number-input-button.core-number-input-button-up"
    );
    expect(incrementor).toBeTruthy();
    fireEvent.click(incrementor!);
    expect(value).toEqual(1);
    const decrementor = wrapper.container.querySelector(
      "div.core-number-input-button.core-number-input-button-down"
    );
    expect(decrementor).toBeTruthy();
    fireEvent.click(decrementor!);
    expect(value).toEqual(0);
  });

  it("should increment/decrement value on Up/Down Arrow", () => {
    let value: number | undefined = 1.23;
    const spy = vi.fn();
    const handleChange = (
      v: number | undefined,
      _stringValue: string
    ): void => {
      spy();
      value = v;
    };
    const spyKeyDown = vi.fn();
    const wrapper = render(
      <NumberInput
        precision={2}
        value={value}
        step={0.25}
        onChange={handleChange}
        onKeyDown={spyKeyDown}
      />
    );
    const input = wrapper.container.querySelector("input");
    expect(input).toBeTruthy();
    fireEvent.keyDown(input!, { key: Key.ArrowUp });
    expect(spy).toHaveBeenCalledOnce();
    expect(value).toEqual(1.48);

    spy.mockRestore();
    fireEvent.keyDown(input!, { key: Key.ArrowDown });
    expect(spy).toHaveBeenCalledOnce();
    expect(value).toEqual(1.23);
    expect(spyKeyDown).toHaveBeenCalledTimes(2);
  });

  it("should update value on enter", () => {
    let value: number | undefined = 1.23;
    const spy = vi.fn();
    const handleChange = (
      v: number | undefined,
      _stringValue: string
    ): void => {
      spy();
      value = v;
    };
    const wrapper = render(
      <NumberInput
        precision={2}
        value={value}
        step={0.25}
        onChange={handleChange}
      />
    );
    const input = wrapper.container.querySelector("input");
    expect(input).toBeTruthy();
    fireEvent.change(input!, { target: { value: "22.3" } });
    fireEvent.keyDown(input!, { key: Key.Enter });
    expect(spy).toHaveBeenCalledOnce();
    expect(value).toEqual(22.3);
  });

  it("should update value on blur", () => {
    let value: number | undefined = 1.23;
    const spy = vi.fn();
    const handleChange = (
      v: number | undefined,
      _stringValue: string
    ): void => {
      spy();
      value = v;
    };
    const spyBlur = vi.fn();
    const wrapper = render(
      <NumberInput
        precision={2}
        value={value}
        step={0.25}
        onChange={handleChange}
        onBlur={spyBlur}
      />
    );
    const input = wrapper.container.querySelector("input");
    expect(input).toBeTruthy();
    fireEvent.focusIn(input!);
    fireEvent.change(input!, { target: { value: "22.3" } });
    fireEvent.blur(input!);
    expect(spy).toHaveBeenCalledOnce();
    expect(spyBlur).toHaveBeenCalledOnce();
    expect(value).toEqual(22.3);
  });

  it("should update value when component is controlled", () => {
    const spy = vi.fn();

    const wrapper = render(
      <NumberInput
        precision={2}
        value={1.23}
        step={0.25}
        onChange={spy}
        isControlled={true}
      />
    );
    const input = wrapper.container.querySelector("input");
    expect(input).toBeTruthy();
    fireEvent.focusIn(input!);
    fireEvent.change(input!, { target: { value: "22.3" } });
    expect(spy).toBeCalledWith(22.3, "22.3");
  });

  it("should reset value on ESC", () => {
    let value: number | undefined = 1.23;
    const spy = vi.fn();
    const handleChange = (
      v: number | undefined,
      _stringValue: string
    ): void => {
      spy();
      value = v;
    };
    const wrapper = render(
      <NumberInput
        precision={2}
        value={value}
        step={0.25}
        onChange={handleChange}
      />
    );
    const input = wrapper.container.querySelector("input");
    expect(input).toBeTruthy();
    const originalValue = (input as HTMLInputElement).value;
    fireEvent.change(input!, { target: { value: "22.3" } });
    expect((input as HTMLInputElement).value).toEqual("22.3");
    fireEvent.keyDown(input!, { key: Key.Escape });
    expect(spy).not.toBeCalled();
    expect((input as HTMLInputElement).value).toEqual(originalValue);
  });

  it("should reset value to 0 when invalid text is entered", () => {
    let value: number | undefined = 1.23;
    const spy = vi.fn();
    const handleChange = (
      v: number | undefined,
      _stringValue: string
    ): void => {
      spy();
      value = v;
    };
    const wrapper = render(
      <NumberInput
        precision={2}
        value={value}
        step={0.25}
        onChange={handleChange}
      />
    );
    const input = wrapper.container.querySelector("input");
    expect(input).toBeTruthy();
    fireEvent.change(input!, { target: { value: "abc" } });
    expect((input as HTMLInputElement).value).toEqual("abc");
    fireEvent.keyDown(input!, { key: Key.Enter });
    expect(spy).toHaveBeenCalledOnce();
    expect(value).toEqual(0);
  });

  it("renders for touch correctly", () => {
    const wrapper = render(<NumberInput value={0} showTouchButtons />);
    const mainContainer = wrapper.container.querySelector(
      "div.core-number-input-container.core-number-buttons-for-touch"
    );
    expect(mainContainer).toBeTruthy();
    const buttonContainer = wrapper.container.querySelector(
      "div.core-number-input-buttons-container.core-number-buttons-for-touch"
    );
    expect(buttonContainer).toBeTruthy();
  });

  it("processes parse and format functions correctly", () => {
    let value: number | undefined = 1.23;
    let formattedValue: string = "";
    const spy = vi.fn();
    const handleChange = (v: number | undefined, stringValue: string): void => {
      spy();
      value = v;
      formattedValue = stringValue;
    };

    const wrapper = render(
      <NumberInput
        format={formatDollar}
        parse={parseDollar}
        precision={2}
        value={value}
        step={0.25}
        snap
        onChange={handleChange}
      />
    );
    const incrementor = wrapper.container.querySelector(
      "div.core-number-input-button.core-number-input-button-up"
    );
    expect(incrementor).toBeTruthy();
    fireEvent.click(incrementor!);
    expect(spy).toHaveBeenCalledOnce();
    expect(value).toEqual(1.5);
    expect(formattedValue).toEqual("$1.50");

    const input = wrapper.container.querySelector("input");
    expect(input).toBeTruthy();
    fireEvent.change(input!, { target: { value: "15.3" } });
    expect((input as HTMLInputElement).value).toEqual("15.3");
    fireEvent.keyDown(input!, { key: Key.Enter });
    expect(formattedValue).toEqual("$15.30");

    fireEvent.change(input!, { target: { value: "$2.25" } });
    expect((input as HTMLInputElement).value).toEqual("$2.25");
    fireEvent.keyDown(input!, { key: Key.Enter });
    expect(formattedValue).toEqual("$2.25");
  });
});
