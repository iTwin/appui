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

/**
 * Defines what items to include from the provider. If any items are
 * specified then only those items will be added to statusbar.
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

/**
 * Provide standard statusbar fields for the SimpleStatusbarWidget
 * @beta
 */
export class StandardStatusbarUiItemsProvider implements UiItemsProvider {
  public get id(): string {
    return "appui-react:StandardStatusbarUiItemsProvider";
  }

  constructor(private _defaultItems?: DefaultStatusbarItems) {}

  public provideStatusBarItems(
    _stageId: string,
    _stageUsage: string,
    _stageAppData?: any
  ): StatusBarItem[] {
    const statusBarItems: StatusBarItem[] = [];
    if (!this._defaultItems || this._defaultItems.messageCenter) {
      statusBarItems.push(
        StatusBarItemUtilities.createCustomItem(
          "uifw.MessageCenter",
          StatusBarSection.Left,
          10,
          <MessageCenterField />
        )
      );
    }
    if (!this._defaultItems || this._defaultItems.toolAssistance) {
      if (!this._defaultItems || this._defaultItems.preToolAssistanceSeparator)
        statusBarItems.push(
          StatusBarItemUtilities.createCustomItem(
            "uifw.PreToolAssistance",
            StatusBarSection.Left,
            15,
            <StatusBarSeparator />
          )
        );

      statusBarItems.push(
        StatusBarItemUtilities.createCustomItem(
          "uifw.ToolAssistance",
          StatusBarSection.Left,
          20,
          <ToolAssistanceField />
        )
      );

      if (!this._defaultItems || this._defaultItems.postToolAssistanceSeparator)
        statusBarItems.push(
          StatusBarItemUtilities.createCustomItem(
            "uifw.PostToolAssistance",
            StatusBarSection.Left,
            25,
            <StatusBarSeparator />
          )
        );
    }
    if (this._defaultItems?.activityCenter) {
      statusBarItems.push(
        StatusBarItemUtilities.createCustomItem(
          "uifw.ActivityCenter",
          StatusBarSection.Left,
          30,
          <ActivityCenterField />
        )
      );
    }
    if (!this._defaultItems || this._defaultItems.accuSnapModePicker) {
      statusBarItems.push(
        StatusBarItemUtilities.createCustomItem(
          "uifw.SnapMode",
          StatusBarSection.Center,
          10,
          <SnapModeField />
        )
      );
    }

    if (!this._defaultItems || this._defaultItems.tileLoadIndicator) {
      statusBarItems.push(
        StatusBarItemUtilities.createCustomItem(
          "uifw.TileLoadIndicator",
          StatusBarSection.Right,
          10,
          <TileLoadingIndicator />
        )
      );
    }

    if (!this._defaultItems || this._defaultItems.selectionScope) {
      statusBarItems.push(
        StatusBarItemUtilities.createCustomItem(
          "uifw.SelectionScope",
          StatusBarSection.Right,
          20,
          <SelectionScopeField />
        )
      );
    }

    if (!this._defaultItems || this._defaultItems.selectionInfo) {
      statusBarItems.push(
        StatusBarItemUtilities.createCustomItem(
          "uifw.SelectionInfo",
          StatusBarSection.Right,
          30,
          // eslint-disable-next-line deprecation/deprecation
          <SelectionInfoField />
        )
      );
    }

    return statusBarItems;
  }
}
