/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module StandardUiItemsProvider
 */

import * as React from "react";
import { StatusBarItemUtilities } from "../statusbar/StatusBarItemUtilities";
import { ToolAssistanceField } from "../statusfields/toolassistance/ToolAssistanceField";
import { MessageCenterField } from "../statusfields/message-center/MessageCenterField";
import { ActivityCenterField } from "../statusfields/ActivityCenter";
import { SnapModeField } from "../statusfields/SnapMode";
import { SelectionInfoField } from "../statusfields/SelectionInfo";
import { TileLoadingIndicator } from "../statusfields/tileloading/TileLoadingIndicator";
import { SelectionScopeField } from "../statusfields/SelectionScope";
import { StatusBarSeparator } from "../statusbar/Separator";
import type { UiItemsProvider } from "./UiItemsProvider";
import type { StatusBarItem } from "../statusbar/StatusBarItem";
import { StatusBarSection } from "../statusbar/StatusBarItem";

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

/** Provide standard statusbar fields.
 * @beta
 */
export class StandardStatusbarUiItemsProvider implements UiItemsProvider {
  public get id(): string {
    return "appui-react:StandardStatusbarUiItemsProvider";
  }

  /** Creates a provider. If the `defaultItems` argument is not set, all default fields are added. Otherwise, only the fields that are set to `true` are added. */
  constructor(private _defaultItems?: DefaultStatusbarItems) {}

  public provideStatusBarItems(
    _stageId: string,
    _stageUsage: string,
    _stageAppData?: any
  ): StatusBarItem[] {
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
          // eslint-disable-next-line deprecation/deprecation
          content: <SelectionInfoField />,
        })
      );
    }

    return statusBarItems;
  }
}
