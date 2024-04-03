/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { DatePickerPopupButton } from "../../components-react/datepicker/DatePickerPopupButton";
import { TimeDisplay } from "@itwin/appui-abstract";
import { Key } from "ts-key-enum";

/* eslint-disable deprecation/deprecation */

describe("<DatePickerPopupButton />", () => {
  const testDate = new Date("July 22, 2018 07:22:13 -0400");
  const testDate2 = new Date("July 20, 1969");

  it("should render ", () => {
    const renderedComponent = render(
      <DatePickerPopupButton
        selected={testDate}
        buttonToolTip={"TEST_TOOLTIP"}
      />
    );
    expect(renderedComponent).toBeTruthy();
    renderedComponent.getByTitle("TEST_TOOLTIP");
  });

  it("should rerender with new props ", () => {
    const renderedComponent = render(
      <DatePickerPopupButton selected={testDate} />
    );
    expect(renderedComponent).toBeTruthy();
    renderedComponent.rerender(<DatePickerPopupButton selected={testDate2} />);
  });

  it("should render with edit field ", () => {
    const renderedComponent = render(
      <DatePickerPopupButton selected={testDate} displayEditField={true} />
    );
    expect(renderedComponent).toBeTruthy();
    renderedComponent.getByTestId("components-date-input");
  });

  it("should render popup ", async () => {
    const renderSpy = vi.fn();
    const renderedComponent = render(
      <DatePickerPopupButton selected={testDate} onDateChange={renderSpy} />
    );
    expect(renderedComponent).toBeTruthy();
    const pickerButton = renderedComponent.getByTestId(
      "components-date-picker-calendar-popup-button"
    );
    expect(pickerButton.tagName).toEqual("BUTTON");
    fireEvent.pointerDown(pickerButton);
    const popupPanelDiv = renderedComponent.getByTestId(
      "components-date-picker-calendar-popup-panel"
    );
    expect(popupPanelDiv).toBeTruthy();

    const testDayTicks = new Date(2018, 6, 19).getTime();
    const dataValueSelector = `li[data-value='${testDayTicks}']`; // li[data-value='1531972800000']
    const dayEntry = popupPanelDiv.querySelector(dataValueSelector);
    expect(dayEntry).toBeTruthy();
    fireEvent.click(dayEntry!);
    expect(renderSpy).toHaveBeenCalled();
    expect(
      renderedComponent.queryByTestId(
        "components-date-picker-calendar-popup-panel"
      )
    ).toEqual(null);
  });

  it("should render popup using keyboard ", async () => {
    const renderSpy = vi.fn();
    const renderedComponent = render(
      <DatePickerPopupButton selected={testDate} onDateChange={renderSpy} />
    );
    expect(renderedComponent).toBeTruthy();
    const pickerButton = renderedComponent.getByTestId(
      "components-date-picker-calendar-popup-button"
    );
    expect(pickerButton.tagName).toEqual("BUTTON");
    fireEvent.keyDown(pickerButton, { key: " " });

    const popupPanelDiv = renderedComponent.getByTestId(
      "components-date-picker-calendar-popup-panel"
    );
    expect(popupPanelDiv).toBeTruthy();

    const testDayTicks = new Date(2018, 6, 19).getTime();
    const dataValueSelector = `li[data-value='${testDayTicks}']`; // li[data-value='1531972800000']
    const dayEntry = popupPanelDiv.querySelector(dataValueSelector);
    expect(dayEntry).toBeTruthy();
    fireEvent.click(dayEntry!);
    expect(renderSpy).toHaveBeenCalled();
    expect(
      renderedComponent.queryByTestId(
        "components-date-picker-calendar-popup-panel"
      )
    ).toEqual(null);
  });

  it("should render popup with time input ", async () => {
    const renderSpy = vi.fn();
    const renderedComponent = render(
      <DatePickerPopupButton
        selected={testDate}
        timeDisplay={TimeDisplay.H12MC}
        onDateChange={renderSpy}
      />
    );
    expect(renderedComponent).toBeTruthy();
    const pickerButton = renderedComponent.getByTestId(
      "components-date-picker-calendar-popup-button"
    );
    expect(pickerButton.tagName).toEqual("BUTTON");
    fireEvent.pointerDown(pickerButton);
    const popupPanelDiv = renderedComponent.getByTestId(
      "components-date-picker-calendar-popup-panel"
    );
    expect(popupPanelDiv).toBeTruthy();
    const timeInputContainer = renderedComponent.getByTestId(
      "components-time-input"
    );
    const inputs = timeInputContainer.querySelectorAll("input");
    expect(inputs.length).toEqual(3);
    const hour = inputs[0];
    fireEvent.keyDown(hour, { key: Key.ArrowUp });
    expect(renderSpy).toHaveBeenCalled();
  });
});
