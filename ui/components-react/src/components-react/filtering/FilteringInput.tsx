/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Filtering
 */

import "./FilteringInput.scss";
import classnames from "classnames";
import * as React from "react";
import { Key } from "ts-key-enum";
import type { CommonProps } from "@itwin/core-react";
import { Icon } from "@itwin/core-react";
import { Input } from "@itwin/itwinui-react";
import { UiComponents } from "../UiComponents.js";
import type { ResultSelectorProps } from "./ResultSelector.js";
import { ResultSelector } from "./ResultSelector.js";
import { SvgClose, SvgSearch } from "@itwin/itwinui-icons-react";

/** [[FilteringInput]] React Component state
 * @internal
 */
interface FilteringInputState {
  /** A string which will be used for search */
  searchText: string;
  /**
   *  Tells the component if the search was started.
   *  Gets reset to false if search is canceled/cleared or searchText is changed.
   */
  searchStarted: boolean;
  /* Used for resetting the state of [[ResultSelector]] component */
  resultSelectorKey: number;
}

/**
 * [[FilteringInput]] React Component properties
 * @public
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
export interface FilteringInputProps extends CommonProps {
  /** Filtering should start */
  onFilterStart: (searchText: string) => void;
  /** Filtering is canceled while still in progress */
  onFilterCancel: () => void;
  /** Filtering is cleared after everything's loaded */
  onFilterClear: () => void;
  /**
   * Tells the component what is the status of filtering.
   */
  status: FilteringInputStatus;
  /**
   * [[ResultSelector]] React Component properties.
   * Attribute should be memoized and updated when [[ResultSelector]] state needs to be reset.
   * This allows resetting the selected active match index back to 0.
   */
  resultSelectorProps?: ResultSelectorProps;
  /** Specify that the <input> element should automatically get focus */
  autoFocus?: boolean;
}

/**
 * Enumeration of possible component contexts
 * @public
 */
export enum FilteringInputStatus {
  /** Component is ready to filter */
  ReadyToFilter,
  /** Component's parent is currently filtering */
  FilteringInProgress,
  /** Component's parent has finished filtering */
  FilteringFinished,
}

/** A helper component for filtering trees and stepping through results
 * @public
 */
export class FilteringInput extends React.PureComponent<
  FilteringInputProps,
  FilteringInputState
> {
  private _inputElement = React.createRef<HTMLInputElement>();

  constructor(props: FilteringInputProps) {
    super(props);
    this.state = {
      searchText: "",
      searchStarted: false,
      resultSelectorKey: 0,
    };
  }

  private focus() {
    if (this._inputElement.current) this._inputElement.current.focus();
  }

  private _onSearchButtonClick = () => {
    if (!this.state.searchText) {
      // Empty search string is the same as clearing the search.
      this.setState({ searchStarted: false, searchText: "" });
      this.props.onFilterClear();
      return;
    }

    this.props.onFilterStart(this.state.searchText);
    this.setState({ searchStarted: true });
  };

  private _onCancelButtonClick = () => {
    this.setState({ searchStarted: false, searchText: "" });
    this.props.onFilterCancel();
    this.focus();
  };

  private _onClearButtonClick = () => {
    this.setState({ searchStarted: false, searchText: "" });
    this.props.onFilterClear();
    this.focus();
  };

  private _onFilterKeyDown = (e: React.KeyboardEvent<HTMLElement>): void => {
    if (e.key !== Key.Enter.valueOf()) return;

    if (!this.state.searchText) return;

    this.props.onFilterStart(this.state.searchText);
    this.setState({ searchStarted: true });
    e.stopPropagation();
  };

  private _onInputChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (this.state.searchStarted) {
      this.props.onFilterCancel();
    }
    this.setState({ searchText: e.target.value, searchStarted: false });
  };

  /** @internal */
  public override componentDidUpdate(prevProps: FilteringInputProps) {
    if (this.props.resultSelectorProps !== prevProps.resultSelectorProps) {
      this.setState((state) => ({
        resultSelectorKey: state.resultSelectorKey + 1,
      }));
    }
  }

  public override render() {
    const status = this.props.status;
    const searchLabel = UiComponents.translate("general.search");
    return (
      // TODO: What is filtering-input-preload-images?
      <div
        className={classnames(
          "components-filtering-input",
          "filtering-input-preload-images",
          this.props.className
        )}
        style={this.props.style}
        onKeyDown={this._onFilterKeyDown}
        role="presentation"
      >
        <span className="components-filtering-input-input">
          <Input
            type="text"
            placeholder={UiComponents.translate("filteringInput.placeholder")}
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus={this.props.autoFocus}
            onKeyDown={this._onFilterKeyDown}
            value={this.state.searchText}
            onChange={this._onInputChanged}
            aria-label={searchLabel}
            size="small"
          />

          <span className="components-filtering-input-input-components">
            {status === FilteringInputStatus.FilteringFinished &&
            this.props.resultSelectorProps ? (
              <ResultSelector
                key={this.state.resultSelectorKey}
                {...this.props.resultSelectorProps}
              />
            ) : undefined}
            {status === FilteringInputStatus.ReadyToFilter ? (
              // eslint-disable-next-line jsx-a11y/click-events-have-key-events
              <span
                className="icon"
                onClick={this._onSearchButtonClick}
                data-testid="filter-input-search"
                role="button"
                tabIndex={-1}
                title={searchLabel}
              >
                {/* eslint-disable-next-line @typescript-eslint/no-deprecated */}
                <Icon iconSpec={<SvgSearch />} />
              </span>
            ) : undefined}
            {status === FilteringInputStatus.FilteringInProgress ? (
              // eslint-disable-next-line jsx-a11y/click-events-have-key-events
              <span
                className="icon"
                onClick={this._onCancelButtonClick}
                data-testid="filter-input-close"
                role="button"
                tabIndex={-1}
                title={UiComponents.translate("dialog.cancel")}
              >
                {/* eslint-disable-next-line @typescript-eslint/no-deprecated */}
                <Icon iconSpec={<SvgClose />} />
              </span>
            ) : undefined}
            {status === FilteringInputStatus.FilteringFinished ? (
              // eslint-disable-next-line jsx-a11y/click-events-have-key-events
              <span
                className="components-filtering-input-clear icon"
                onClick={this._onClearButtonClick}
                data-testid="filter-input-close"
                role="button"
                tabIndex={-1}
                title={UiComponents.translate("general.clear")}
              >
                {/* eslint-disable-next-line @typescript-eslint/no-deprecated */}
                <Icon iconSpec={<SvgClose />} />
              </span>
            ) : undefined}
          </span>
        </span>
      </div>
    );
  }
}
