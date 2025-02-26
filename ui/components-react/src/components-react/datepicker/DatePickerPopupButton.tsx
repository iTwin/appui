/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Date
 */

import * as React from "react";
import type { DateFormatter, TimeDisplay } from "@itwin/appui-abstract";
import { RelativePosition } from "@itwin/appui-abstract";
import type { CommonProps } from "@itwin/core-react";
import { Popup } from "@itwin/core-react";
import { Text } from "@itwin/itwinui-react";
import { DatePicker } from "./DatePicker.js";
import { DateField } from "./DateField.js";
import type { TimeSpec } from "./TimeField.js";
import { TimeField } from "./TimeField.js";
import "./DatePickerPopupButton.scss";
import { useTranslation } from "../l10n/useTranslation.js";

/** Props used by [[DatePickerPopupButton]] component.
 * @alpha
 * @deprecated in 4.11.0. Props of deprecated component {@link DatePickerPopupButton}.
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
export interface DatePickerPopupButtonProps extends CommonProps {
  /** Date to be shown as the selected date. */
  selected: Date;
  /** If true show the date (and optionally time) edit field next to button */
  displayEditField?: boolean;
  // If defined show time in popup and also display time if input field is shown
  timeDisplay?: TimeDisplay;
  /** Function called when Date changes. */
  onDateChange?: (day: Date) => void;
  /** Optional tooltip */
  buttonToolTip?: string;
  /* Custom date formatter. WARNING: if used values will only be shown in specified format and will not be based on locale.
   * If used the existence of a parseDate function will determine if the edit field allows editing. */
  dateFormatter?: DateFormatter;
  /** User defined class name for edit field. */
  fieldClassName?: string;
  /** User defined style for edit field. */
  fieldStyle?: React.CSSProperties;
}

/** Component that displays a button used to pick a date and optionally a time.
 * @alpha
 * @deprecated in 4.11.0. Use {@link https://itwinui.bentley.com/docs/datepicker iTwinUI date picker} instead.
 */
export function DatePickerPopupButton({
  displayEditField,
  timeDisplay,
  selected,
  onDateChange,
  dateFormatter,
  buttonToolTip,
  fieldStyle,
  fieldClassName,
  style,
}: // eslint-disable-next-line @typescript-eslint/no-deprecated
DatePickerPopupButtonProps) {
  const { translate } = useTranslation();
  const [workingDate, setWorkingDate] = React.useState(
    new Date(selected.getTime())
  );
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);
  const toolTipLabel = buttonToolTip ?? translate("datepicker.selectDate");

  // See if props have changed since component mounted
  React.useEffect(() => {
    const newWorkingDate = new Date(selected.getTime());
    setWorkingDate(newWorkingDate);
  }, [selected]);

  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const togglePopupDisplay = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault();
      setShowFocusOutline(false);
      setIsSettingsOpen((prev) => !prev);
    },
    [setIsSettingsOpen]
  );

  const handleCloseSetting = React.useCallback(() => {
    setIsSettingsOpen(false);
  }, [setIsSettingsOpen]);

  const handleOnDateChanged = (day: Date) => {
    // combine current time into selected Date
    const newWorkingDate = new Date(day.getTime());
    newWorkingDate.setHours(
      workingDate.getHours(),
      workingDate.getMinutes(),
      workingDate.getSeconds()
    );
    onDateChange && onDateChange(newWorkingDate);
    !timeDisplay && setIsSettingsOpen(false);
  };

  const handleOnTimeChanged = (time: TimeSpec) => {
    // Combine new time into selected Date
    const newWorkingDate = new Date(workingDate.getTime());
    newWorkingDate.setHours(time.hours, time.minutes, time.seconds);
    setWorkingDate(newWorkingDate);
    onDateChange && onDateChange(newWorkingDate);
  };

  const [showFocusOutline, setShowFocusOutline] = React.useState(false);
  const handlePopupKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (event.key === " ") {
        setShowFocusOutline(true);
        setIsSettingsOpen(true);
      }
    },
    []
  );

  const timeSpec: TimeSpec = {
    hours: workingDate.getHours(),
    minutes: workingDate.getMinutes(),
    seconds: workingDate.getSeconds(),
  };
  return (
    <>
      <button
        title={toolTipLabel}
        style={style}
        className="components-date-picker-calendar-popup-button"
        onKeyDown={handlePopupKeyDown}
        data-testid="components-date-picker-calendar-popup-button"
        onPointerDown={togglePopupDisplay}
        ref={buttonRef}
      >
        <div className="datepicker-button">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
            <path d="M13,13H9V10h4ZM16,3V15a1,1,0,0,1-1,1H1a1,1,0,0,1-1-1V3A1,1,0,0,1,1,2H3V0H4V2h8V0h1V2h2A1,1,0,0,1,16,3ZM15,6H1v9H15Z" />
          </svg>
        </div>
      </button>
      {/* eslint-disable-next-line @typescript-eslint/no-deprecated */}
      <Popup
        isOpen={isSettingsOpen}
        position={RelativePosition.BottomLeft}
        onClose={handleCloseSetting}
        target={buttonRef.current}
        closeOnEnter={false}
        moveFocus={showFocusOutline}
        closeOnNestedPopupOutsideClick
      >
        <div
          className="components-date-picker-calendar-popup-panel"
          data-testid="components-date-picker-calendar-popup-panel"
        >
          <DatePicker // eslint-disable-line @typescript-eslint/no-deprecated
            selected={workingDate}
            onDateChange={handleOnDateChanged}
            showFocusOutline={showFocusOutline}
          />
          {timeDisplay && (
            <div className="time-container">
              <Text variant="body" className="time-label">
                {translate("datepicker.time")}
              </Text>
              <TimeField
                time={timeSpec}
                timeDisplay={timeDisplay}
                onTimeChange={handleOnTimeChanged}
              />
            </div>
          )}
        </div>
      </Popup>
      {!!displayEditField && (
        <DateField
          style={fieldStyle}
          className={fieldClassName}
          initialDate={workingDate}
          timeDisplay={timeDisplay}
          dateFormatter={dateFormatter}
          onDateChange={handleOnDateChanged}
        />
      )}
    </>
  );
}
