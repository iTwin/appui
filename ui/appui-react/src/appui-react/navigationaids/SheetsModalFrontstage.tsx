/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module NavigationAids
 */

import "./SheetsModalFrontstage.scss";
import classnames from "classnames";
import * as React from "react";
import type { IModelConnection } from "@itwin/core-frontend";
import { IModelApp } from "@itwin/core-frontend";
import { UiEvent } from "@itwin/appui-abstract";
import type { CommonProps, IconSpec } from "@itwin/core-react";
import {
  FlexWrapContainer,
  Icon,
  ScrollView,
  SearchBox,
} from "@itwin/core-react";
import type { ModalFrontstageInfo } from "../framework/FrameworkFrontstages.js";
import { UiFramework } from "../UiFramework.js";
import type { SheetData } from "./SheetNavigationAid.js";
import { SvgDocument, SvgPlaceholder } from "@itwin/itwinui-icons-react";
import { BeUiEvent } from "@itwin/core-bentley";

/** Data about a sheet card
 * @alpha
 */
export interface CardInfo {
  index: number;
  label: string;
  /** @deprecated in 4.16.0. Use {@link CardInfo.icon} instead. */
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  iconSpec: IconSpec;
  icon?: React.ReactNode;
  isActive: boolean;
  viewId: any;
}

/** Arguments for CardSelectedEvent
 * @alpha
 * @deprecated in 4.13.0. Event args are inferred from a listener. If explicit type is needed use a type helper.
 */
export interface CardSelectedEventArgs {
  id: any;
  index: number;
}

/** Class for CardSelectedEvent
 * @alpha
 * @deprecated in 4.13.0. This class should not be used by applications to instantiate objects.
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
export class CardSelectedEvent extends UiEvent<CardSelectedEventArgs> {}

/** Modal frontstage displaying sheet information in cards.
 * @alpha
 */
export class SheetsModalFrontstage implements ModalFrontstageInfo {
  public title = UiFramework.translate("navigationAid.sheetsModalFrontstage");
  private _cards: CardInfo[] = [];
  private _connection: IModelConnection;
  private _currentIndex: number;
  private _searchValue: string = "";

  /**
   * Creates a SheetsModalFrontstage
   * @param sheets Collection of sheets available in SheetNavigationAid
   * @param connection IModelConnection to query for sheet ViewState
   */
  constructor(
    sheets: SheetData[],
    connection: IModelConnection,
    currentIndex: number
  ) {
    this._connection = connection;
    this._currentIndex = currentIndex;
    this._storeSheetsAsCards(sheets);
  }

  /**
   * Gathers card info from available sheets
   * @param sheets SheetData from available sheets
   */
  private _storeSheetsAsCards(sheets: SheetData[]) {
    sheets.forEach((sheet: SheetData, index: number) => {
      this._cards.push({
        index,
        label: sheet.name,
        iconSpec: <SvgDocument />,
        viewId: sheet.viewId,
        isActive: index === this._currentIndex,
      });
    });
  }

  /** Gets set of cards */
  public get content(): React.ReactNode {
    return (
      <CardContainer
        cards={this._cards}
        searchValue={this._searchValue}
        connection={this._connection}
      />
    );
  }

  /** Gets components to be placed in the app bar */
  public get appBarRight(): React.ReactNode {
    return (
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      <SearchBox
        placeholder={UiFramework.translate("general.search")}
        onValueChanged={this._handleSearchValueChanged}
        valueChangedDelay={250}
      />
    );
  }

  /** Updates stage based on search value */
  private _handleSearchValueChanged = (value: string): void => {
    this._searchValue = value;
    UiFramework.frontstages.updateModalFrontstage();
  };
}

/** Properties for [[CardContainer]]
 * @alpha
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
export interface CardContainerProps extends CommonProps {
  cards: CardInfo[];
  searchValue: string;
  connection: IModelConnection;
}

/** Displays cards in SheetModalFrontstage
 * @alpha
 */
export class CardContainer extends React.Component<CardContainerProps> {
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  private static _cardSelectedEvent = new BeUiEvent<CardSelectedEventArgs>();

  /** Get CardSelectedEvent event */
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  public static get onCardSelectedEvent(): CardSelectedEvent {
    return CardContainer._cardSelectedEvent;
  }

  public override render() {
    return (
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      <ScrollView className={this.props.className} style={this.props.style}>
        {/* eslint-disable-next-line @typescript-eslint/no-deprecated */}
        <FlexWrapContainer>
          {this.props.cards.map((card: CardInfo, _index: number) => {
            let includeCard = true;
            if (this.props.searchValue) {
              includeCard = this.contains(card.label, this.props.searchValue);
            }

            if (includeCard) {
              return (
                <SheetCard
                  key={card.label}
                  label={card.label}
                  index={card.index}
                  // eslint-disable-next-line @typescript-eslint/no-deprecated
                  iconSpec={card.iconSpec}
                  icon={card.icon}
                  isActive={card.isActive}
                  onClick={async () => this._handleCardSelected(card)}
                />
              );
            }

            return null;
          })}
        </FlexWrapContainer>
      </ScrollView>
    );
  }

  /**
   * Determines if string contains a substring
   * @param valueA The string to search through
   * @param valueB The value to search for
   * @return True if valueB can be found in valueA, false otherwise
   */
  private contains(valueA: string, valueB: string): boolean {
    if (!valueA || !valueB) return false;

    if (valueB.length > valueA.length) return false;

    return (
      valueA.toLocaleUpperCase().indexOf(valueB.toLocaleUpperCase(), 0) !== -1
    );
  }

  /**
   * Updates view with ViewState for selected card.
   * @param card Data about the sheet card selected.
   */
  private async _handleCardSelected(card: CardInfo) {
    if (IModelApp.viewManager && IModelApp.viewManager.selectedView) {
      const vp = IModelApp.viewManager.selectedView;
      const viewState = await this.props.connection.views.load(card.viewId);
      vp.changeView(viewState);
    }

    card.isActive = true;
    UiFramework.frontstages.closeModalFrontstage();
    CardContainer.onCardSelectedEvent.emit({
      id: card.viewId,
      index: card.index,
    });
  }
}

/** Properties for [[SheetCard]]
 * @alpha
 */
export interface SheetCardProps {
  label: string;
  index: number;
  /** @deprecated in 4.16.0. Use {@link SheetCardProps.icon} instead. */
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  iconSpec: IconSpec;
  icon?: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}

/** State for [[SheetCard]]
 * @internal
 */
interface SheetCardState {
  isActive: boolean;
  isPressed: boolean;
}

/** Displays information about an individual sheet
 * @alpha
 */
export class SheetCard extends React.Component<SheetCardProps, SheetCardState> {
  constructor(props: SheetCardProps) {
    super(props);
    this.state = { isActive: this.props.isActive, isPressed: false };
  }

  private _onClick = () => {
    this.setState({ isActive: true }, () => this.props.onClick());
  };

  private _onMouseDown = () => {
    this.setState({ isPressed: true });
  };

  private _onMouseLeave = () => {
    if (this.state.isPressed) this.setState({ isPressed: false });
  };

  public override render() {
    const { label, index } = this.props;

    const className = classnames(
      "uifw-sheet-card",
      this.state.isActive && "is-active",
      this.state.isPressed && "is-pressed"
    );

    const icon =
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      this.props.icon ?? this.props.iconSpec ? (
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        <Icon iconSpec={this.props.iconSpec} />
      ) : (
        <SvgPlaceholder />
      );
    return (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events
      <div
        className={className}
        onClick={this._onClick}
        onMouseDown={this._onMouseDown}
        onMouseLeave={this._onMouseLeave}
        role="button"
        tabIndex={-1}
      >
        {label}
        <div className="sheet-image-container">
          <div className="icon">{icon}</div>
        </div>
        <div className="sheet-index">{index + 1}</div>
      </div>
    );
  }
}
