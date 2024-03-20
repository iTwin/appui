/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Date
 */

import * as React from "react";
import classnames from "classnames";
import { Key } from "ts-key-enum";
import { Icon } from "@itwin/core-react";
import { SvgChevronLeft, SvgChevronRight } from "@itwin/itwinui-icons-react";
import "./DatePicker.scss";
import { useTranslation } from "../useTranslation";

function isSameDay(a: Date, b: Date) {
  return (
    a &&
    b &&
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

/**
 * Props for [[DatePicker]] component.
 * @alpha
 * @deprecated in 4.11.x. Props of deprecated component {@link DatePicker}.
 */
export interface DatePickerProps {
  /** defines both date and time */
  selected: Date;
  /** function to call when date or time has changed */
  onDateChange?: (day: Date) => void;
  /** show focus outlines, useful for keyboard navigation */
  showFocusOutline?: boolean;
}

/** DatePicker component. Show a month selector and a day calendar to select a specific date.
 * @alpha
 * @deprecated in 4.11.x. Use {@link https://itwinui.bentley.com/docs/datepicker iTwinUI date picker} instead.
 */
// eslint-disable-next-line deprecation/deprecation
export function DatePicker(props: DatePickerProps) {
  const { translate } = useTranslation();
  const previousMonthLabel = translate("datepicker.previousMonth");
  const nextMonthLabel = translate("datepicker.nextMonth");
  const monthsLong = [
    translate("month.long.january"),
    translate("month.long.february"),
    translate("month.long.march"),
    translate("month.long.april"),
    translate("month.long.may"),
    translate("month.long.june"),
    translate("month.long.july"),
    translate("month.long.august"),
    translate("month.long.september"),
    translate("month.long.october"),
    translate("month.long.november"),
    translate("month.long.december"),
  ];

  const daysLong = [
    translate("days.long.sunday"),
    translate("days.long.monday"),
    translate("days.long.tuesday"),
    translate("days.long.wednesday"),
    translate("days.long.thursday"),
    translate("days.long.friday"),
    translate("days.long.saturday"),
  ];

  const daysShort = [
    translate("days.short.sunday"),
    translate("days.short.monday"),
    translate("days.short.tuesday"),
    translate("days.short.wednesday"),
    translate("days.short.thursday"),
    translate("days.short.friday"),
    translate("days.short.saturday"),
  ];

  const [selectedDay, setSelectedDay] = React.useState(
    new Date(props.selected.getTime())
  );
  const [displayedMonthIndex, setDisplayedMonthIndex] = React.useState(
    selectedDay.getMonth()
  );
  const [displayedYear, setDisplayedYear] = React.useState(
    selectedDay.getFullYear()
  );
  const [focusedDay, setFocusedDay] = React.useState(selectedDay);
  React.useEffect(() => {
    const newSelectedDay = new Date(props.selected);
    setSelectedDay(new Date(props.selected));
    setDisplayedMonthIndex(newSelectedDay.getMonth());
    setDisplayedYear(newSelectedDay.getFullYear());
    setFocusedDay(newSelectedDay);
  }, [props.selected]);
  const days = React.useMemo(() => {
    const msFirstDayOfMonth = new Date(
      displayedYear,
      displayedMonthIndex,
      1
    ).getTime();
    let offsetToFirst = new Date(msFirstDayOfMonth).getDay();
    if (0 === offsetToFirst) offsetToFirst = 7;

    const daysInMonth: Date[] = [];
    // generate 6 weeks of dates
    for (let i = 0; i < 42; i++) {
      const adjustedDay = 1 + i - offsetToFirst;
      daysInMonth.push(
        new Date(displayedYear, displayedMonthIndex, adjustedDay)
      );
    }
    return daysInMonth;
  }, [displayedMonthIndex, displayedYear]);

  const weeks = React.useMemo(() => {
    const weeksInMonth = [];
    const weekCount = Math.ceil(days.length / 7);
    for (let i = 0; i < weekCount; i++) {
      weeksInMonth.push(days.slice(i * 7, (i + 1) * 7));
    }
    return weeksInMonth;
  }, [days]);

  const setMonthAndYear = React.useCallback(
    (newMonth: number, newYear: number) => {
      setDisplayedMonthIndex(newMonth);
      setDisplayedYear(newYear);
      if (
        selectedDay.getFullYear() === newYear &&
        selectedDay.getMonth() === newMonth
      ) {
        setFocusedDay(new Date(selectedDay.getTime()));
      } else {
        const newFocusDay = new Date(focusedDay.getTime());
        newFocusDay.setFullYear(newYear, newMonth, 1);
        setFocusedDay(newFocusDay);
      }
    },
    [focusedDay, selectedDay]
  );

  const handleMoveToPreviousMonth = React.useCallback(() => {
    const newMonth = displayedMonthIndex !== 0 ? displayedMonthIndex - 1 : 11;
    const newYear =
      displayedMonthIndex !== 0 ? displayedYear : displayedYear - 1;
    setMonthAndYear(newMonth, newYear);
  }, [displayedMonthIndex, displayedYear, setMonthAndYear]);

  const handleMoveToNextMonth = React.useCallback(() => {
    const newMonth = displayedMonthIndex !== 11 ? displayedMonthIndex + 1 : 0;
    const newYear =
      displayedMonthIndex !== 11 ? displayedYear : displayedYear + 1;
    setMonthAndYear(newMonth, newYear);
  }, [displayedMonthIndex, displayedYear, setMonthAndYear]);

  // when invoked, it will return another function which can be used for the onClick React listener.
  const handleOnDayChange = React.useCallback(
    (day: Date) => () => {
      setSelectedDay(day);
      setFocusedDay(day);
      props.onDateChange && props.onDateChange(day);
    },
    [props]
  );

  const handleCalendarKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLUListElement>) => {
      if (event.key === Key.ArrowDown.valueOf()) {
        const focusedDayIndex = days.findIndex((day) =>
          isSameDay(day, focusedDay)
        );
        if (focusedDayIndex + 7 > 41) setFocusedDay(days[focusedDayIndex % 7]);
        else setFocusedDay(days[focusedDayIndex + 7]);
        event.preventDefault();
      }
      if (event.key === Key.ArrowUp.valueOf()) {
        const focusedDayIndex = days.findIndex((day) =>
          isSameDay(day, focusedDay)
        );
        if (focusedDayIndex - 7 < 0)
          setFocusedDay(days[(focusedDayIndex % 7) + 35]);
        else setFocusedDay(days[focusedDayIndex - 7]);
        event.preventDefault();
      }
      if (event.key === Key.ArrowLeft.valueOf()) {
        const focusedDayIndex = days.findIndex((day) =>
          isSameDay(day, focusedDay)
        );
        // istanbul ignore else
        if (focusedDayIndex - 1 >= 0) setFocusedDay(days[focusedDayIndex - 1]);
        event.preventDefault();
      }
      if (event.key === Key.ArrowRight.valueOf()) {
        const focusedDayIndex = days.findIndex((day) =>
          isSameDay(day, focusedDay)
        );
        // istanbul ignore else
        if (focusedDayIndex + 1 <= 41) setFocusedDay(days[focusedDayIndex + 1]);
        event.preventDefault();
      }
      if (event.key === Key.Enter.valueOf() || event.key === " ") {
        handleOnDayChange(focusedDay)(); // NB: immediately call returned handler function
        event.preventDefault();
      }
    },
    [days, focusedDay, handleOnDayChange]
  );

  const previousButtonClass = classnames(
    "components-previous-month",
    props.showFocusOutline && "showFocusOutline"
  );
  const nextButtonClass = classnames(
    "components-next-month",
    props.showFocusOutline && "showFocusOutline"
  );
  const calendarClass = classnames(
    "components-date-picker-calendar-month",
    props.showFocusOutline && "showFocusOutline"
  );

  return (
    <div className="components-date-picker-calendar">
      <div className="components-date-picker-calendar-header-months">
        <button
          className={previousButtonClass}
          title={previousMonthLabel}
          onClick={handleMoveToPreviousMonth}
        >
          <Icon iconSpec={<SvgChevronLeft />} />
        </button>
        <span className="components-month-year">
          {monthsLong[displayedMonthIndex]} {displayedYear}
        </span>
        <button
          className={nextButtonClass}
          title={nextMonthLabel}
          onClick={handleMoveToNextMonth}
        >
          <Icon iconSpec={<SvgChevronRight />} />
        </button>
      </div>
      <div className="components-date-picker-calendar-header-weekdays">
        {[0, 1, 2, 3, 4, 5, 6].map((dayOfWeek) => (
          <div
            key={`day-${dayOfWeek}`}
            className="components-date-picker-calendar-header-day-short"
            title={daysLong[dayOfWeek]}
          >
            <span>{daysShort[dayOfWeek]}</span>
          </div>
        ))}
      </div>
      <ul
        tabIndex={0}
        onKeyDown={handleCalendarKeyDown}
        data-testid="components-date-picker-calendar-list"
        className={calendarClass}
        role="listbox"
      >
        {weeks.map((weekdays, weekIndex) => (
          <React.Fragment key={`week-${weekIndex}`}>
            {weekdays.map((day: Date, dayIndex: number) => {
              const isActive =
                selectedDay && day && isSameDay(selectedDay, day);
              const isFocused =
                focusedDay &&
                day &&
                isSameDay(focusedDay, day) &&
                props.showFocusOutline;
              const isCurrentMonth = day.getMonth() === displayedMonthIndex;
              const classNames = classnames(
                "components-date-picker-calendar-day",
                isActive && "selected",
                !isCurrentMonth && "notCurrentMonth",
                isFocused && "focused"
              );
              const dateValue = day.getDate();
              return (
                /* eslint-disable-next-line jsx-a11y/click-events-have-key-events */
                <li
                  className={classNames}
                  key={`${displayedYear}.${displayedMonthIndex}.day.${dayIndex}`}
                  onClick={handleOnDayChange(day)}
                  role="option"
                  aria-selected={isActive}
                  data-value={day.getTime()}
                >
                  <span>{dateValue}</span>
                </li>
              );
            })}
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
}
