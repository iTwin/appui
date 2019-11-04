/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
/** @module Table  */

// Matches how react-data-grid is exported
// https://github.com/Microsoft/TypeScript-Handbook/blob/master/pages/Modules.md#export--and-import--require
import ReactDataGrid = require("react-data-grid");

import { Logger } from "@bentley/bentleyjs-core";
import { Timer } from "@bentley/ui-core";

import { TableColumn } from "../component/TableColumn";
import { ColumnFilterDescriptor, FilterOperator, FilterCompositionLogicalOperator, NumericRangeData } from "./ColumnFiltering";
import { ColumnDescription, FilterRenderer, TableDistinctValue } from "../TableDataProvider";
import { UiComponents } from "../../UiComponents";

/** @internal */
export interface ReactDataGridFilter extends ReactDataGrid.Filter {
  column: TableColumn;
}

/** ReactDataGrid NumericFilter type
 * @internal
 */
export enum NumericFilterType {
  ExactMatch = 1,
  Range = 2,
  GreaterThan = 3,
  LessThan = 4,
}

/** NumericFilter data
 * @internal
 */
export interface NumericFilterData {
  type: number;
}

/** Numeric Exact Match data
 * @internal
 */
export interface NumericExactMatchData {
  type: NumericFilterType.ExactMatch;
  value: number;
}

/** Numeric Greater Than data
 * @internal
 */
export interface NumericGreaterThanData {
  type: NumericFilterType.GreaterThan;
  value: number;
}

/** Numeric Less Than data
 * @internal
 */
export interface NumericLessThanData {
  type: NumericFilterType.LessThan;
  value: number;
}

/** @internal */
export const FILTER_PARSER_TIMER_TIMEOUT = 250;

/** ReactDataGrid Filter Parser
 * @internal
 */
export class DataGridFilterParser {
  private static _timerTimeout = FILTER_PARSER_TIMER_TIMEOUT;
  private static _textTimer: Timer = new Timer(DataGridFilterParser._timerTimeout);
  private static _numericTimer: Timer = new Timer(DataGridFilterParser._timerTimeout);

  public static get timerTimeout(): number { return DataGridFilterParser._timerTimeout; }
  public static set timerTimeout(v: number) { DataGridFilterParser._timerTimeout = v; }

  public static async handleFilterChange(
    filter: ReactDataGridFilter,
    filterDescriptor: ColumnFilterDescriptor,
    columnDescription: ColumnDescription,
    onApplyFilter: () => Promise<void>,
  ): Promise<void> {

    filterDescriptor.clear();

    if (columnDescription.filterRenderer !== undefined) {
      switch (columnDescription.filterRenderer) {
        case FilterRenderer.MultiSelect:
          await DataGridFilterParser.parseMultiSelect(filter, filterDescriptor, onApplyFilter);
          break;
        case FilterRenderer.SingleSelect:
          await DataGridFilterParser.parseSingleSelect(filter, filterDescriptor, onApplyFilter);
          break;
        case FilterRenderer.Numeric:
          await DataGridFilterParser.parseNumeric(filter, filterDescriptor, onApplyFilter);
          break;
        case FilterRenderer.Text:
          await DataGridFilterParser.parseText(filter, filterDescriptor, onApplyFilter);
          break;
      }
    } else {
      await DataGridFilterParser.parseText(filter, filterDescriptor, onApplyFilter);
    }
  }

  private static async parseMultiSelect(filter: ReactDataGridFilter, filterDescriptor: ColumnFilterDescriptor, onApplyFilter: () => Promise<void>): Promise<void> {
    /*
    MultiSelect filters
    0: {value: "Title 1", label: "Title 1"}
    1: {value: "Title 100", label: "Title 100"}
    2: {value: "Title 10000", label: "Title 10000"}
    length: 3
    */
    const filterData = filter.filterTerm as unknown as TableDistinctValue[];
    if (filterData.length) {
      filterData.forEach((distinctValue: TableDistinctValue) => {
        filterDescriptor.distinctFilter.addDistinctValue(distinctValue.value);
      });
    } else {
      filterDescriptor.clear();
    }
    await onApplyFilter();
  }

  private static async parseSingleSelect(filter: ReactDataGridFilter, filterDescriptor: ColumnFilterDescriptor, onApplyFilter: () => Promise<void>): Promise<void> {
    /*
    SingleSelect filters
    filter.filterTerm: {value: 1, label: "Red"}
    */
    const filterData = filter.filterTerm as unknown as TableDistinctValue;
    filterDescriptor.distinctFilter.addDistinctValue(filterData.value);
    await onApplyFilter();
  }

  private static async parseNumeric(filter: ReactDataGridFilter, filterDescriptor: ColumnFilterDescriptor, onApplyFilter: () => Promise<void>): Promise<void> {
    /*
    NumericFilter
    0: {type: 2, begin: 1, end: 10} // range
    1: {type: 1, value: 15} // Exact match
    2: {type: 3, value: 30} // > 30
    3: {type: 4, value: 5}  // < 5
    length: 4
    */
    this._numericTimer.setOnExecute(async () => {
      const filterData = filter.filterTerm as unknown as NumericFilterData[];
      if (filterData.length) {
        filterDescriptor.fieldFilter.logicalOperator = FilterCompositionLogicalOperator.Or;

        filterData.forEach((numericFilterData: NumericFilterData) => {
          switch (numericFilterData.type) {
            case NumericFilterType.ExactMatch:
              const exactMatchData = numericFilterData as unknown as NumericExactMatchData;
              filterDescriptor.fieldFilter.addFieldValue(exactMatchData.value, FilterOperator.IsEqualTo);
              break;
            case NumericFilterType.GreaterThan:
              const greaterThanData = numericFilterData as unknown as NumericGreaterThanData;
              filterDescriptor.fieldFilter.addFieldValue(greaterThanData.value, FilterOperator.IsGreaterThan);
              break;
            case NumericFilterType.LessThan:
              const lessThanData = numericFilterData as unknown as NumericLessThanData;
              filterDescriptor.fieldFilter.addFieldValue(lessThanData.value, FilterOperator.IsLessThan);
              break;
            case NumericFilterType.Range:
              const rangeData = numericFilterData as unknown as NumericRangeData;
              filterDescriptor.fieldFilter.addFieldValue(rangeData, FilterOperator.Range);
              break;
            default:
              Logger.logError(UiComponents.loggerCategory(this), `parseNumeric: Unknown numeric filter data type - ${numericFilterData.type}`);
              break;
          }
        });
        await onApplyFilter();
      }
    });

    this._numericTimer.delay = DataGridFilterParser._timerTimeout;
    this._numericTimer.start();
  }

  private static async parseText(filter: ReactDataGridFilter, filterDescriptor: ColumnFilterDescriptor, onApplyFilter: () => Promise<void>): Promise<void> {
    /*
    Input filter
    filter.filterTerm: 1000
    */
    this._textTimer.setOnExecute(async () => {
      const filterData = filter.filterTerm as unknown as string;
      filterDescriptor.fieldFilter.addFieldValue(filterData, FilterOperator.Contains, false);
      await onApplyFilter();
    });

    this._textTimer.delay = DataGridFilterParser._timerTimeout;
    this._textTimer.start();
  }

}
