/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module StandardUiItemsProvider
 */

import * as React from "react";
import { StatusBarItemUtilities } from "../statusbar/StatusBarItemUtilities.js";
import { ToolAssistanceField } from "../statusfields/toolassistance/ToolAssistanceField.js";
import { MessageCenterField } from "../statusfields/message-center/MessageCenterField.js";
import { ActivityCenterField } from "../statusfields/ActivityCenter.js";
import { SnapModeField } from "../statusfields/SnapMode.js";
import { SelectionInfoField } from "../statusfields/SelectionInfo.js";
import { TileLoadingIndicator } from "../statusfields/tileloading/TileLoadingIndicator.js";
import { SelectionScopeField } from "../statusfields/SelectionScope.js";
import { StatusBarSeparator } from "../statusbar/Separator.js";
import type { UiItemsProvider } from "./UiItemsProvider.js";
import type { StatusBarItem } from "../statusbar/StatusBarItem.js";
import { StatusBarSection } from "../statusbar/StatusBarItem.js";

/** Defines what items to include from the provider.
 * @note When this object is used, only explicitly enabled items will be added to the status bar. I.e. `{ messageCenter: true }` will only add message center field to the statusbar.
 * @public
 */
export interface DefaultStatusbarItems {
  messageCenter?: boolean;
  preToolAssistanceSeparator?: boolean;
  toolAssistance?: boolean;
  postToolAssistanceSeparator?: boolean;
  /** Activity center field is hidden by default. */
  activityCenter?: boolean;
  accuSnapModePicker?: boolean;
  tileLoadIndicator?: boolean;
  selectionScope?: boolean;
  selectionInfo?: boolean;
}

/** Provides standard status bar items.
 * @public
 */
export class StandardStatusbarUiItemsProvider implements UiItemsProvider {
  public get id(): string {
    return "appui-react:StandardStatusbarUiItemsProvider";
  }

  /** Creates a provider. If the `defaultItems` argument is not set, all default fields are added. Otherwise, only the fields that are set to `true` are added. */
  constructor(private _defaultItems?: DefaultStatusbarItems) {}

  /** @deprecated in 4.17.0. Property of a deprecated interface {@link UiItemsProvider.provideStatusBarItems}. */
  public provideStatusBarItems(
    _stageId: string,
    _stageUsage: string,
    _stageAppData?: any
  ): StatusBarItem[] {
    return this.getStatusBarItems() as StatusBarItem[];
  }

  public getStatusBarItems(): readonly StatusBarItem[] {
    const statusBarItems: StatusBarItem[] = [];
    if (!this._defaultItems || this._defaultItems.messageCenter) {
      statusBarItems.push(
        StatusBarItemUtilities.createCustomItem({
          id: "uifw.MessageCenter",
          section: StatusBarSection.Left,
          itemPriority: 10,
          content: <MessageCenterField />,
        })
      );
    }
    if (!this._defaultItems || this._defaultItems.toolAssistance) {
      if (!this._defaultItems || this._defaultItems.preToolAssistanceSeparator)
        statusBarItems.push(
          StatusBarItemUtilities.createCustomItem({
            id: "uifw.PreToolAssistance",
            section: StatusBarSection.Left,
            itemPriority: 15,
            content: <StatusBarSeparator />,
          })
        );

      statusBarItems.push(
        StatusBarItemUtilities.createCustomItem({
          id: "uifw.ToolAssistance",
          section: StatusBarSection.Left,
          itemPriority: 20,
          content: <ToolAssistanceField />,
        })
      );

      if (!this._defaultItems || this._defaultItems.postToolAssistanceSeparator)
        statusBarItems.push(
          StatusBarItemUtilities.createCustomItem({
            id: "uifw.PostToolAssistance",
            section: StatusBarSection.Left,
            itemPriority: 25,
            content: <StatusBarSeparator />,
          })
        );
    }
    if (this._defaultItems?.activityCenter) {
      statusBarItems.push(
        StatusBarItemUtilities.createCustomItem({
          id: "uifw.ActivityCenter",
          section: StatusBarSection.Left,
          itemPriority: 30,
          content: <ActivityCenterField />,
        })
      );
    }
    if (!this._defaultItems || this._defaultItems.accuSnapModePicker) {
      statusBarItems.push(
        StatusBarItemUtilities.createCustomItem({
          id: "uifw.SnapMode",
          section: StatusBarSection.Center,
          itemPriority: 10,
          content: <SnapModeField />,
        })
      );
    }

    if (!this._defaultItems || this._defaultItems.tileLoadIndicator) {
      statusBarItems.push(
        StatusBarItemUtilities.createCustomItem({
          id: "uifw.TileLoadIndicator",
          section: StatusBarSection.Right,
          itemPriority: 10,
          content: <TileLoadingIndicator />,
        })
      );
    }

    if (!this._defaultItems || this._defaultItems.selectionScope) {
      statusBarItems.push(
        StatusBarItemUtilities.createCustomItem({
          id: "uifw.SelectionScope",
          section: StatusBarSection.Right,
          itemPriority: 20,
          content: <SelectionScopeField />,
        })
      );
    }

    if (!this._defaultItems || this._defaultItems.selectionInfo) {
      statusBarItems.push(
        StatusBarItemUtilities.createCustomItem({
          id: "uifw.SelectionInfo",
          section: StatusBarSection.Right,
          itemPriority: 30,
          // eslint-disable-next-line @typescript-eslint/no-deprecated
          content: <SelectionInfoField />,
        })
      );
    }

    return statusBarItems;
  }
}
