/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { expect } from "chai";
import React from "react";
import sinon from "sinon";
import { fireEvent, render, waitFor } from "@testing-library/react";
import type { TimeSpec } from "../../components-react/datepicker/TimeField";
import { TimeField } from "../../components-react/datepicker/TimeField";
import TestUtils from "../TestUtils";
import { TimeDisplay } from "@itwin/appui-abstract";
import { Key } from "ts-key-enum";

describe("<TimeField />", () => {
  let renderSpy: sinon.SinonSpy;

  const zeroTime: TimeSpec = {
    hours: 0,
    minutes: 15,
    seconds: 58,
  };

  const amTime: TimeSpec = {
    hours: 9,
    minutes: 15,
    seconds: 58,
  };

  const pmTime: TimeSpec = {
    hours: 15,
    minutes: 14,
    seconds: 13,
  };

  before(async () => {
    await TestUtils.initializeUiComponents();
  });

  beforeEach(() => {
    sinon.restore();
    renderSpy = sinon.spy();
  });

  after(() => {
    TestUtils.terminateUiComponents();
  });

  it("should render zeroTime", () => {
    const renderedComponent = render(
      <TimeField
        time={zeroTime}
        timeDisplay={TimeDisplay.H12MC}
        readOnly={true}
      />
    );
    const inputs = renderedComponent.container.querySelectorAll("input");
    expect(inputs.length).to.eq(3);
    expect(inputs[0].value).to.eq("12");
    expect(inputs[1].value).to.eq("15");
    expect(inputs[2].value).to.eq("timepicker.day-period-am");
    expect(inputs[0].disabled);
    expect(inputs[1].disabled);
    expect(inputs[2].disabled);
  });

  it("should render read only inputs", () => {
    const renderedComponent = render(
      <TimeField
        time={amTime}
        timeDisplay={TimeDisplay.H12MC}
        readOnly={true}
      />
    );
    const inputs = renderedComponent.container.querySelectorAll("input");
    expect(inputs.length).to.eq(3);
    expect(inputs[0].value).to.eq("09");
    expect(inputs[1].value).to.eq("15");
    expect(inputs[2].value).to.eq("timepicker.day-period-am");
    expect(inputs[0].disabled);
    expect(inputs[1].disabled);
    expect(inputs[2].disabled);
  });

  it("should render with day am period", () => {
    const renderedComponent = render(
      <TimeField
        time={amTime}
        timeDisplay={TimeDisplay.H12MC}
        readOnly={false}
      />
    );
    const inputs = renderedComponent.container.querySelectorAll("input");
    expect(inputs.length).to.eq(3);
    expect(inputs[0].value).to.eq("09");
    expect(inputs[1].value).to.eq("15");
    expect(inputs[2].value).to.eq("timepicker.day-period-am");
  });

  it("should render with pm period", () => {
    const renderedComponent = render(
      <TimeField
        time={pmTime}
        timeDisplay={TimeDisplay.H12MSC}
        readOnly={false}
      />
    );
    const inputs = renderedComponent.container.querySelectorAll("input");
    expect(inputs.length).to.eq(4);
    expect(inputs[0].value).to.eq("03");
    expect(inputs[1].value).to.eq("14");
    expect(inputs[2].value).to.eq("13");
    expect(inputs[3].value).to.eq("timepicker.day-period-pm");
  });

  it("should render with 24 hour display (no seconds)", () => {
    const renderedComponent = render(
      <TimeField
        time={amTime}
        timeDisplay={TimeDisplay.H24M}
        readOnly={false}
      />
    );
    const inputs = renderedComponent.container.querySelectorAll("input");
    expect(inputs.length).to.eq(2);
    expect(inputs[0].value).to.eq("09");
    expect(inputs[1].value).to.eq("15");
  });

  it("should render with 24 hour display (w/seconds)", () => {
    const renderedComponent = render(
      <TimeField
        time={pmTime}
        timeDisplay={TimeDisplay.H24MS}
        readOnly={false}
      />
    );
    const inputs = renderedComponent.container.querySelectorAll("input");
    expect(inputs.length).to.eq(3);
    expect(inputs[0].value).to.eq("15");
    expect(inputs[1].value).to.eq("14");
    expect(inputs[2].value).to.eq("13");
  });

  it("should trigger time hour change", async () => {
    const renderedComponent = render(
      <TimeField
        time={amTime}
        timeDisplay={TimeDisplay.H12MC}
        onTimeChange={renderSpy}
        readOnly={false}
      />
    );
    // renderedComponent.debug();
    expect(renderedComponent).not.to.be.undefined;
    const inputs = renderedComponent.container.querySelectorAll("input");
    expect(inputs.length).to.eq(3);
    const hour = inputs[0];
    const cycle = inputs[2];
    expect(hour.value).to.eq("09");
    fireEvent.keyDown(hour, { key: Key.ArrowUp });
    expect(renderSpy).to.be.called;
    expect(hour.value).to.eq("10");
    fireEvent.keyDown(hour, { key: Key.ArrowDown });
    fireEvent.keyDown(hour, { key: Key.ArrowDown });
    expect(hour.value).to.eq("08");
    fireEvent.change(hour, { target: { value: "06" } });
    fireEvent.keyDown(hour, { key: Key.Enter });
    expect(hour.value).to.eq("06");
    fireEvent.change(hour, { target: { value: "01" } });
    fireEvent.keyDown(hour, { key: Key.Enter });
    fireEvent.keyDown(hour, { key: Key.ArrowDown });
    expect(hour.value).to.eq("12");
    expect(cycle.value).to.eq("timepicker.day-period-am");
    fireEvent.keyDown(hour, { key: Key.ArrowDown });
    fireEvent.change(hour, { target: { value: "11" } });
    fireEvent.keyDown(hour, { key: Key.Enter });
    fireEvent.keyDown(hour, { key: Key.ArrowUp });
    expect(hour.value).to.eq("12");
    expect(cycle.value).to.eq("timepicker.day-period-pm");

    // invalid time should cause input to revert to valid time
    hour.focus();
    fireEvent.change(hour, { target: { value: "26" } });
    // fireEvent.keyDown(hour, { key: Key.Enter });
    hour.blur();
    await waitFor(() => expect(hour.value).to.eq("12"));

    hour.focus();
    fireEvent.change(hour, { target: { value: "08" } });
    hour.blur();
    expect(hour.value).to.eq("08");
    await waitFor(() => expect(cycle.value).to.eq("timepicker.day-period-am"));
  });

  it("should trigger time minute change", async () => {
    const renderedComponent = render(
      <TimeField
        time={amTime}
        timeDisplay={TimeDisplay.H12MC}
        onTimeChange={renderSpy}
        readOnly={false}
      />
    );
    // renderedComponent.debug();
    expect(renderedComponent).not.to.be.undefined;
    const inputs = renderedComponent.container.querySelectorAll("input");
    expect(inputs.length).to.eq(3);
    const minute = inputs[1];
    expect(minute.value).to.eq("15");
    fireEvent.keyDown(minute, { key: Key.ArrowUp });
    expect(renderSpy).to.be.called;
    expect(minute.value).to.eq("16");
    fireEvent.keyDown(minute, { key: Key.ArrowDown });
    fireEvent.keyDown(minute, { key: Key.ArrowDown });
    expect(minute.value).to.eq("14");
    fireEvent.change(minute, { target: { value: "30" } });
    fireEvent.keyDown(minute, { key: Key.Enter });
    expect(minute.value).to.eq("30");
    // invalid time should cause input to revert to valid time
    minute.focus();
    fireEvent.change(minute, { target: { value: "66" } });
    minute.blur();
    await waitFor(() => expect(minute.value).to.eq("30"));
    fireEvent.keyDown(minute, { key: Key.Home });
    expect(minute.value).to.eq("00");
    fireEvent.keyDown(minute, { key: Key.ArrowDown });
    expect(minute.value).to.eq("59");
    fireEvent.keyDown(minute, { key: Key.End });
    expect(minute.value).to.eq("59");
    fireEvent.keyDown(minute, { key: Key.ArrowUp });
    expect(minute.value).to.eq("00");
  });

  it("should trigger time seconds change", async () => {
    const renderedComponent = render(
      <TimeField
        time={amTime}
        timeDisplay={TimeDisplay.H12MSC}
        onTimeChange={renderSpy}
        readOnly={false}
      />
    );
    // renderedComponent.debug();
    expect(renderedComponent).not.to.be.undefined;
    const inputs = renderedComponent.container.querySelectorAll("input");
    expect(inputs.length).to.eq(4);
    const seconds = inputs[2];
    expect(seconds.value).to.eq("58");
    fireEvent.keyDown(seconds, { key: Key.ArrowUp });
    expect(renderSpy).to.be.called;
    expect(seconds.value).to.eq("59");
    fireEvent.keyDown(seconds, { key: Key.ArrowDown });
    fireEvent.keyDown(seconds, { key: Key.ArrowDown });
    expect(seconds.value).to.eq("57");
    fireEvent.keyDown(seconds, { key: Key.ArrowUp });
    fireEvent.keyDown(seconds, { key: Key.ArrowUp });
    fireEvent.keyDown(seconds, { key: Key.ArrowUp });
    expect(seconds.value).to.eq("00");
    fireEvent.change(seconds, { target: { value: "30" } });
    fireEvent.keyDown(seconds, { key: Key.Enter });
    expect(seconds.value).to.eq("30");
    // invalid time should cause input to revert to valid time
    seconds.focus();
    fireEvent.change(seconds, { target: { value: "66" } });
    seconds.blur();
    await waitFor(() => expect(seconds.value).to.eq("30"));
    fireEvent.keyDown(seconds, { key: Key.Home });
    expect(seconds.value).to.eq("00");
    fireEvent.keyDown(seconds, { key: Key.ArrowDown });
    expect(seconds.value).to.eq("59");
    fireEvent.keyDown(seconds, { key: Key.End });
    expect(seconds.value).to.eq("59");
  });

  it("should trigger time period change", async () => {
    const renderedComponent = render(
      <TimeField
        time={amTime}
        timeDisplay={TimeDisplay.H12MSC}
        onTimeChange={renderSpy}
        readOnly={false}
      />
    );
    // renderedComponent.debug();
    expect(renderedComponent).not.to.be.undefined;
    const inputs = renderedComponent.container.querySelectorAll("input");
    expect(inputs.length).to.eq(4);
    const cycle = inputs[3];
    const hour = inputs[0];
    expect(cycle.value).to.eq("timepicker.day-period-am");
    fireEvent.keyDown(cycle, { key: Key.ArrowUp });
    expect(renderSpy).to.be.called;
    expect(cycle.value).to.eq("timepicker.day-period-pm");
    fireEvent.keyDown(cycle, { key: Key.ArrowDown });
    expect(cycle.value).to.eq("timepicker.day-period-am");
    fireEvent.keyDown(cycle, { key: Key.End });
    expect(cycle.value).to.eq("timepicker.day-period-pm");
    fireEvent.keyDown(cycle, { key: "a" });
    expect(cycle.value).to.eq("timepicker.day-period-am");
    fireEvent.keyDown(cycle, { key: "p" });
    expect(cycle.value).to.eq("timepicker.day-period-pm");
    fireEvent.keyDown(cycle, { key: "A" });
    expect(cycle.value).to.eq("timepicker.day-period-am");
    fireEvent.keyDown(cycle, { key: "P" });
    expect(cycle.value).to.eq("timepicker.day-period-pm");
    fireEvent.keyDown(cycle, { key: Key.Home });
    expect(cycle.value).to.eq("timepicker.day-period-am");

    fireEvent.change(cycle, { target: { value: "pm" } });
    fireEvent.keyDown(cycle, { key: Key.Enter });
    expect(cycle.value).to.eq("timepicker.day-period-pm");

    fireEvent.change(cycle, { target: { value: "am" } });
    fireEvent.keyDown(cycle, { key: Key.Enter });
    expect(cycle.value).to.eq("timepicker.day-period-am");

    fireEvent.change(cycle, { target: { value: "PM" } });
    fireEvent.keyDown(cycle, { key: Key.Enter });
    expect(cycle.value).to.eq("timepicker.day-period-pm");

    fireEvent.change(cycle, { target: { value: "AM" } });
    fireEvent.keyDown(cycle, { key: Key.Enter });
    expect(cycle.value).to.eq("timepicker.day-period-am");

    cycle.focus();
    fireEvent.change(cycle, { target: { value: "pm" } });
    cycle.blur();
    await waitFor(() => expect(cycle.value).to.eq("timepicker.day-period-pm"));

    cycle.focus();
    fireEvent.change(hour, { target: { value: "22" } });
    fireEvent.keyDown(hour, { key: Key.Enter });
    fireEvent.change(cycle, { target: { value: "timepicker.day-period-am" } });
    cycle.blur();
    expect(cycle.value).to.eq("timepicker.day-period-am");

    cycle.focus();
    fireEvent.change(hour, { target: { value: "08" } });
    fireEvent.keyDown(hour, { key: Key.Enter });
    fireEvent.change(cycle, { target: { value: "PM" } });
    cycle.blur();
    await waitFor(() => expect(cycle.value).to.eq("timepicker.day-period-pm"));

    cycle.focus();
    fireEvent.change(hour, { target: { value: "22" } });
    fireEvent.keyDown(hour, { key: Key.Enter });
    fireEvent.change(cycle, { target: { value: "am" } });
    cycle.blur();
    await waitFor(() => expect(cycle.value).to.eq("timepicker.day-period-am"));

    cycle.focus();
    fireEvent.change(hour, { target: { value: "08" } });
    fireEvent.keyDown(hour, { key: Key.Enter });
    fireEvent.change(cycle, { target: { value: "timepicker.day-period-pm" } });
    cycle.blur();
    await waitFor(() => expect(cycle.value).to.eq("timepicker.day-period-pm"));

    cycle.focus();
    fireEvent.change(cycle, { target: { value: "AM" } });
    cycle.blur();
    await waitFor(() => expect(cycle.value).to.eq("timepicker.day-period-am"));

    cycle.focus();
    fireEvent.change(cycle, { target: { value: "AM" } });
    cycle.blur();
    await waitFor(() => expect(cycle.value).to.eq("timepicker.day-period-am"));

    renderedComponent.rerender(
      <TimeField
        time={pmTime}
        timeDisplay={TimeDisplay.H12MSC}
        onTimeChange={renderSpy}
        readOnly={false}
      />
    );
  });

  it("should trigger AM time period change on blur", () => {
    const renderedComponent = render(
      <TimeField
        time={pmTime}
        timeDisplay={TimeDisplay.H12MSC}
        onTimeChange={renderSpy}
        readOnly={false}
      />
    );
    // renderedComponent.debug();
    expect(renderedComponent).not.to.be.undefined;
    const inputs = renderedComponent.container.querySelectorAll("input");
    expect(inputs.length).to.eq(4);
    const cycle = inputs[3];
    cycle.focus();
    fireEvent.change(cycle, { target: { value: "AM" } });
    cycle.blur();
  });

  it("should trigger PM time period change on blur", () => {
    const renderedComponent = render(
      <TimeField
        time={amTime}
        timeDisplay={TimeDisplay.H12MSC}
        onTimeChange={renderSpy}
        readOnly={false}
      />
    );
    // renderedComponent.debug();
    expect(renderedComponent).not.to.be.undefined;
    const inputs = renderedComponent.container.querySelectorAll("input");
    expect(inputs.length).to.eq(4);
    const cycle = inputs[3];
    cycle.focus();
    fireEvent.change(cycle, { target: { value: "PM" } });
    cycle.blur();
  });
});
