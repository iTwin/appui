/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { Button, ButtonType, ButtonProps, Omit } from "@bentley/ui-core";
import { Backstage } from "@src/backstage/Backstage";
import { BackstageItem } from "@src/backstage/Item";
import { BackstageSeparator } from "@src/backstage/Separator";

// tslint:disable-next-line:variable-name
const BlueButton = (props: ButtonProps & Omit<ButtonProps, "type">) => (
  <Button
    type={ButtonType.Blue}
    {...props}
  />
);

export interface State {
  isOpen: boolean;
  activeItem: number;
}

export default class BackstagePage extends React.PureComponent<{}, State> {
  public readonly state: Readonly<State> = {
    isOpen: false,
    activeItem: 0,
  };

  private getItems() {
    return (
      <>
        <BackstageItem
          icon="icon-placeholder"
          label="Item1"
          isActive={this.state.activeItem === 1}
          onClick={this._handleSetActiveItem(1)}
        />
        <BackstageItem
          icon="icon-placeholder"
          label="Item2"
          isActive={this.state.activeItem === 2}
          onClick={this._handleSetActiveItem(2)}
          isDisabled
        />
        <BackstageItem
          label="Item3"
          isActive={this.state.activeItem === 3}
          onClick={this._handleSetActiveItem(3)}
        />
        <BackstageSeparator />
        <BackstageItem
          icon="icon icon-placeholder"
          label="Item4"
          isActive={this.state.activeItem === 4}
          onClick={this._handleSetActiveItem(4)}
        />
        <BackstageItem
          icon="icon-placeholder"
          label="Item5"
          isActive={this.state.activeItem === 5}
          onClick={this._handleSetActiveItem(5)}
        />
      </>
    );
  }

  public render() {
    return (
      <>
        <BlueButton
          onClick={this._handleOpenBackstageButtonClick}
        >
          Open
        </BlueButton>
        <Backstage
          isOpen={this.state.isOpen}
          items={this.getItems()}
          onClose={this._handleCloseBackstageItemClick}
        />
      </>
    );
  }

  private _handleOpenBackstageButtonClick = () => {
    this.setIsOpen(true);
  }

  private _handleCloseBackstageItemClick = () => {
    this.setIsOpen(false);
  }

  private _handleSetActiveItem = (activeItem: number) => () => {
    this.setState((prevState) => {
      return {
        ...prevState,
        activeItem,
      };
    });
  }

  private setIsOpen(isOpen: boolean) {
    this.setState((prevState) => {
      return {
        ...prevState,
        isOpen,
      };
    });
  }
}
