/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { Key } from "ts-key-enum";
import { DatePicker } from "../../components-react.js";
import { adjustDateToTimezone } from "../../components-react/common/DateUtils.js";

describe("<DatePicker />", () => {
  const testDate = new Date("July 22, 2018 07:22:13 -0400");

  it("adjustDateToTimezone should adjust london time to current locale", () => {
    /* Adjust a Data object to show time in one time zone as if it is in the local time zone.
     * This is useful when showing sunrise and sunset times for a project location in a different time zone
     * and the time displayed should appear as if the user is seeing clock in project location. */
    const londonDate = new Date("July 22, 2018 07:22:13 +0100");
    const adjustedDate = adjustDateToTimezone(londonDate, 1 * 60);
    expect(adjustedDate.getHours()).toEqual(7);
  });

  it("should render ", () => {
    const renderedComponent = render(<DatePicker selected={testDate} />);
    expect(renderedComponent).toBeTruthy();
    const span = renderedComponent.container.querySelector(
      "span.components-month-year"
    );
    expect(span).toBeTruthy();
    const spanValue = span!.textContent;
    expect(spanValue!.match(/month.long.july/)).toBeTruthy();
    expect(spanValue!.match(/2018/)).toBeTruthy();
    const month = renderedComponent.getByRole("listbox");
    expect(month).toBeTruthy();
  });

  it("should change to previous month ", () => {
    const renderedComponent = render(<DatePicker selected={testDate} />);
    const span = renderedComponent.container.querySelector(
      "span.components-month-year"
    );
    expect(span).toBeTruthy();
    expect(span!.textContent!.match(/month.long.july/)).toBeTruthy();

    expect(renderedComponent).toBeTruthy();
    const button = renderedComponent.container.querySelector(
      ".components-previous-month"
    );
    expect(button).toBeTruthy();
    fireEvent.click(button!);
    expect(span!.textContent!.match(/month.long.june/)).toBeTruthy();
  });

  it("should change to previous month ", () => {
    const renderedComponent = render(<DatePicker selected={testDate} />);
    const span = renderedComponent.container.querySelector(
      "span.components-month-year"
    );
    expect(span).toBeTruthy();
    expect(span!.textContent!.match(/month.long.july/)).toBeTruthy();

    expect(renderedComponent).toBeTruthy();
    const button = renderedComponent.container.querySelector(
      ".components-previous-month"
    );
    expect(button).toBeTruthy();
    fireEvent.click(button!); // jun
    fireEvent.click(button!); // may
    fireEvent.click(button!); // apr
    fireEvent.click(button!); // mar
    fireEvent.click(button!); // feb
    fireEvent.click(button!); // jan
    fireEvent.click(button!); // dec
    expect(span!.textContent!.match(/month.long.december/)).toBeTruthy();
  });

  it("should change to next month ", () => {
    const renderedComponent = render(<DatePicker selected={testDate} />);
    const span = renderedComponent.container.querySelector(
      "span.components-month-year"
    );
    expect(span).toBeTruthy();
    expect(span!.textContent!.match(/month.long.july/)).toBeTruthy();

    expect(renderedComponent).toBeTruthy();
    const button = renderedComponent.container.querySelector(
      ".components-next-month"
    );
    expect(button).toBeTruthy();
    fireEvent.click(button!);
    expect(span!.textContent!.match(/month.long.august/)).toBeTruthy();

    const previousButton = renderedComponent.container.querySelector(
      ".components-previous-month"
    );
    fireEvent.click(previousButton!);
    expect(span!.textContent!.match(/month.long.july/)).toBeTruthy();

    fireEvent.click(button!); // aug
    fireEvent.click(button!); // sept
    fireEvent.click(button!); // oct
    fireEvent.click(button!); // nov
    fireEvent.click(button!); // dec
    fireEvent.click(button!); // jan
    expect(span!.textContent!.match(/month.long.january/)).toBeTruthy();
  });

  it("should trigger onDateChange", () => {
    const spy = vi.fn();
    const renderedComponent = render(
      <DatePicker selected={testDate} onDateChange={spy} />
    );
    const testDayTicks = new Date(2018, 6, 19).getTime();
    const dataValueSelector = `li[data-value='${testDayTicks}']`; // li[data-value='1531972800000']
    const dayEntry =
      renderedComponent.container.querySelector(dataValueSelector);
    expect(dayEntry).toBeTruthy();
    fireEvent.click(dayEntry!);
    expect(spy).toHaveBeenCalled();
  });

  it("should handle keyboard processing", () => {
    const spy = vi.fn();
    const renderedComponent = render(
      <DatePicker selected={testDate} onDateChange={spy} />
    );
    const calendar = renderedComponent.getByTestId(
      "components-date-picker-calendar-list"
    );
    calendar.focus();
    fireEvent.keyDown(calendar, { key: Key.ArrowDown }); // 29
    fireEvent.keyDown(calendar, { key: Key.ArrowDown }); // 8-5
    fireEvent.keyDown(calendar, { key: Key.ArrowDown }); // 1
    fireEvent.keyDown(calendar, { key: Key.ArrowDown }); // 8
    fireEvent.keyDown(calendar, { key: Key.ArrowDown }); // 15
    fireEvent.keyDown(calendar, { key: Key.ArrowDown }); // 22
    fireEvent.keyDown(calendar, { key: Key.ArrowUp }); // 15
    fireEvent.keyDown(calendar, { key: Key.ArrowUp }); // 8
    fireEvent.keyDown(calendar, { key: Key.ArrowUp }); // 1
    fireEvent.keyDown(calendar, { key: Key.ArrowUp }); // 8-5
    fireEvent.keyDown(calendar, { key: Key.ArrowUp }); // 29
    fireEvent.keyDown(calendar, { key: Key.ArrowUp }); // 22
    fireEvent.keyDown(calendar, { key: Key.ArrowUp }); // 15
    fireEvent.keyDown(calendar, { key: Key.ArrowLeft });
    fireEvent.keyDown(calendar, { key: Key.ArrowRight });
    fireEvent.keyDown(calendar, { key: Key.Enter });
    expect(spy).toHaveBeenCalled();
    spy.mockReset();
    fireEvent.keyDown(calendar, { key: Key.ArrowLeft });
    fireEvent.keyDown(calendar, { key: " " });
    expect(spy).toHaveBeenCalled();
  });
});
