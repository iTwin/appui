/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
/** @module Item */

import * as React from "react";

import { Icon } from "./IconComponent";
import { CommandHandler, ItemProps } from "./ItemProps";
import { ItemDefBase } from "./ItemDefBase";

import { Item } from "@bentley/ui-ninezone";

/** Abstract base class that is used by classes to execute an action when pressed.
 * @public
 */
export abstract class ActionButtonItemDef extends ItemDefBase {
  protected _commandHandler?: CommandHandler;
  public parameters?: any;

  constructor(itemProps: ItemProps) {
    super(itemProps);

    this.execute = this.execute.bind(this);
  }

  public execute(): void {
    if (this._commandHandler && this._commandHandler.execute) {
      if (this._commandHandler.getCommandArgs)
        this._commandHandler.execute(this._commandHandler.getCommandArgs());
      else
        this._commandHandler.execute(this._commandHandler.parameters);
    }
  }

  public toolbarReactNode(index?: number): React.ReactNode {
    if (!this.isVisible)
      return null;

    const key = (index !== undefined) ? index.toString() : this.id;
    const icon = <Icon iconSpec={this.iconSpec} />;

    return (
      <Item
        isDisabled={!this.isEnabled}
        title={this.label}
        key={key}
        onClick={this.execute}
        icon={icon}
      />
    );
  }
}
