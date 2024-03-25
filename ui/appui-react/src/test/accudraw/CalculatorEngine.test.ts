/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { expect } from "chai";
import {
  CalculatorEngine,
  CalculatorOperator,
} from "../../appui-react/accudraw/CalculatorEngine";

describe("CalculatorEngine", () => {
  let engine: CalculatorEngine;

  beforeEach(() => {
    engine = new CalculatorEngine();
  });

  it("should process single number value", () => {
    engine.processValue("1");
    expect(engine.result).toEqual(1);
  });

  it("should process two number values", () => {
    engine.processValue("1");
    engine.processValue("0");
    expect(engine.result).toEqual(10);
  });

  it("should process Equals by itself", () => {
    engine.processOperator(CalculatorOperator.Equals);
    expect(engine.result).toEqual(0);
  });

  it("should process adding two values", () => {
    engine.processValue("1");
    engine.processOperator(CalculatorOperator.Add);
    engine.processValue("2");
    engine.processOperator(CalculatorOperator.Equals);
    expect(engine.result).toEqual(3);
  });

  it("should process adding three values", () => {
    engine.processValue("1");
    engine.processOperator(CalculatorOperator.Add);
    engine.processValue("2");
    engine.processOperator(CalculatorOperator.Add);
    engine.processValue("3");
    engine.processOperator(CalculatorOperator.Equals);
    expect(engine.result).toEqual(6);
  });

  it("should process subtracting two values", () => {
    engine.processValue("1");
    engine.processValue("0");
    engine.processOperator(CalculatorOperator.Subtract);
    engine.processValue("6");
    engine.processOperator(CalculatorOperator.Equals);
    expect(engine.result).toEqual(4);
  });

  it("should process multiplying two values", () => {
    engine.processValue("1");
    engine.processValue("1");
    engine.processOperator(CalculatorOperator.Multiply);
    engine.processValue("7");
    engine.processOperator(CalculatorOperator.Equals);
    expect(engine.result).toEqual(77);
  });

  it("should process dividing two values", () => {
    engine.processValue("7");
    engine.processValue("7");
    engine.processOperator(CalculatorOperator.Divide);
    engine.processValue("7");
    engine.processOperator(CalculatorOperator.Equals);
    expect(engine.result).toEqual(11);
  });

  it("should process two equals operations", () => {
    engine.processValue("1");
    engine.processValue("0");
    engine.processOperator(CalculatorOperator.Multiply);
    engine.processValue("5");
    engine.processOperator(CalculatorOperator.Equals);
    expect(engine.result).toEqual(50);
    engine.processOperator(CalculatorOperator.Equals);
    expect(engine.result).toEqual(250);
  });

  it("dividing by 0 results in 0", () => {
    engine.processValue("10");
    engine.processOperator(CalculatorOperator.Divide);
    engine.processValue("0");
    engine.processOperator(CalculatorOperator.Equals);
    expect(engine.result).toEqual(0);
  });

  it("should process Decimal point resulting in integer", () => {
    engine.processValue("1");
    engine.processValue("2");
    engine.processOperator(CalculatorOperator.Decimal);
    engine.processValue("5");
    engine.processOperator(CalculatorOperator.Multiply);
    engine.processValue("2");
    engine.processOperator(CalculatorOperator.Equals);
    expect(engine.result).toEqual(25);
  });

  it("should process Decimal point resulting in float", () => {
    engine.processValue("1");
    engine.processValue("2");
    engine.processOperator(CalculatorOperator.Decimal);
    engine.processValue("5");
    engine.processOperator(CalculatorOperator.Multiply);
    engine.processValue("3");
    engine.processOperator(CalculatorOperator.Equals);
    expect(engine.result).toEqual(37.5);
  });

  it("should process Decimal by itself", () => {
    engine.processOperator(CalculatorOperator.Decimal);
    expect(engine.displayValue).toEqual("0.");
    engine.processOperator(CalculatorOperator.Decimal);
    expect(engine.displayValue).toEqual("0.");
  });

  it("should process Decimal point after Equals", () => {
    engine.processValue("9");
    engine.processOperator(CalculatorOperator.Divide);
    engine.processValue("6");
    engine.processOperator(CalculatorOperator.Equals);
    expect(engine.result).toEqual(1.5);
    engine.processOperator(CalculatorOperator.Decimal);
    expect(engine.displayValue).toEqual("0.");
  });

  it("should process Backspace", () => {
    engine.processValue("1");
    engine.processValue("0");
    engine.processValue("0");
    expect(engine.result).toEqual(100);
    engine.processOperator(CalculatorOperator.Backspace);
    expect(engine.result).toEqual(10);
    engine.processOperator(CalculatorOperator.Backspace);
    expect(engine.result).toEqual(1);
    engine.processOperator(CalculatorOperator.Backspace);
    expect(engine.result).toEqual(0);
  });

  it("should process ClearAll", () => {
    engine.processValue("1");
    engine.processValue("0");
    engine.processValue("0");
    expect(engine.result).toEqual(100);
    engine.processOperator(CalculatorOperator.ClearAll);
    expect(engine.result).toEqual(0);
  });

  it("should process Clear", () => {
    engine.processValue("1");
    engine.processValue("0");
    engine.processValue("0");
    expect(engine.result).toEqual(100);
    engine.processOperator(CalculatorOperator.Multiply);
    engine.processValue("3");
    expect(engine.result).toEqual(3);
    engine.processOperator(CalculatorOperator.Clear);
    expect(engine.result).toEqual(0);
    engine.processValue("4");
    engine.processOperator(CalculatorOperator.Equals);
    expect(engine.result).toEqual(400);
  });

  it("should process NegPos", () => {
    engine.processValue("1");
    engine.processValue("0");
    expect(engine.result).toEqual(10);
    engine.processOperator(CalculatorOperator.NegPos);
    expect(engine.result).toEqual(-10);
    engine.processOperator(CalculatorOperator.NegPos);
    expect(engine.result).toEqual(10);
  });
});
