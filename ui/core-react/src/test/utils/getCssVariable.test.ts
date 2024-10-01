/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { getCssVariable, getCssVariableAsNumber } from "../../core-react.js";

const VARIABLE_NAME = "--test-variable";
function fakeGetComputedStyle(value: string | null) {
  const style = new CSSStyleDeclaration();
  style.setProperty(VARIABLE_NAME, value);
  return vi.spyOn(window, "getComputedStyle").mockReturnValue(style);
}

describe("getCssVariable", () => {
  it("should read a CSS variable from document", () => {
    const testValue = "Hello World!";
    const spy = fakeGetComputedStyle(testValue);

    expect(getCssVariable(VARIABLE_NAME)).toEqual(testValue);
    expect(spy).toHaveBeenCalledWith(document.documentElement, null);
  });

  it("should read a CSS variable from an element", () => {
    const testValue = "Hello World!";
    const spy = fakeGetComputedStyle(testValue);
    const element = document.createElement("div");

    expect(getCssVariable(VARIABLE_NAME, element)).toEqual(testValue);
    expect(spy).toHaveBeenCalledWith(element, null);
  });
});

describe("getCssVariableAsNumber", () => {
  it("should read a CSS variable from document", () => {
    const testValue = "12.345";
    const expectedValue = 12.345;
    const spy = fakeGetComputedStyle(testValue);

    expect(getCssVariableAsNumber(VARIABLE_NAME)).toEqual(expectedValue);
    expect(spy).toHaveBeenCalledWith(document.documentElement, null);
  });

  it("should read a CSS variable from an element", () => {
    const testValue = "12.345";
    const expectedValue = 12.345;
    const spy = fakeGetComputedStyle(testValue);
    const element = document.createElement("div");

    expect(getCssVariableAsNumber(VARIABLE_NAME, element)).toEqual(
      expectedValue
    );
    expect(spy).toHaveBeenCalledWith(element, null);
  });

  it("should return NaN if the property is undefined", () => {
    const spy = vi.spyOn(window, "getComputedStyle");

    expect(getCssVariableAsNumber(VARIABLE_NAME)).toEqual(NaN);
    expect(spy).toHaveBeenCalledWith(document.documentElement, null);
  });
});
