/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
import * as React from "react";

import {
  ToolAssistanceField, ActivityCenterField, MessageCenterField,
  SnapModeField, SectionsStatusField, ViewAttributesStatusField,
  SelectionScopeField, SelectionInfoField, ClearEmphasisStatusField,
  StatusBarItem, StatusBarSection, StatusBarItemUtilities, withStatusFieldProps, withMessageCenterFieldProps,
  BooleanSyncUiListener, TileLoadingIndicator,
} from "@bentley/ui-framework";
import { DisplayStyleField } from "../statusfields/DisplayStyleField";
import { SampleAppUiActionId, SampleAppIModelApp } from "../..";

// tslint:disable-next-line: variable-name
const ToolAssistance = withStatusFieldProps(ToolAssistanceField);
// tslint:disable-next-line: variable-name
const MessageCenter = withMessageCenterFieldProps(MessageCenterField);
// tslint:disable-next-line: variable-name
const SnapMode = withMessageCenterFieldProps(SnapModeField);
// tslint:disable-next-line: variable-name
const DisplayStyle = withStatusFieldProps(DisplayStyleField);
// tslint:disable-next-line: variable-name
const ActivityCenter = withStatusFieldProps(ActivityCenterField);
// tslint:disable-next-line: variable-name
const ViewAttributes = withStatusFieldProps(ViewAttributesStatusField);
// tslint:disable-next-line: variable-name
const Sections = withStatusFieldProps(SectionsStatusField);
// tslint:disable-next-line: variable-name
const SelectionInfo = withStatusFieldProps(SelectionInfoField);
// tslint:disable-next-line: variable-name
const SelectionScope = withStatusFieldProps(SelectionScopeField);
// tslint:disable-next-line: variable-name
const ClearEmphasis = withStatusFieldProps(ClearEmphasisStatusField);
// tslint:disable-next-line: variable-name
const TileLoadIndicator = withStatusFieldProps(TileLoadingIndicator);

export class AppStatusBarItemProvider {
  public static readonly id = "ui-test-app.AppStatusBarItemProvider";
  private _statusBarItems: ReadonlyArray<StatusBarItem> | undefined = undefined;

  public get statusBarItems(): ReadonlyArray<StatusBarItem> {
    if (!this._statusBarItems) {
      this._statusBarItems = [
        StatusBarItemUtilities.createStatusBarItem("ToolAssistance", StatusBarSection.Left, 10, <ToolAssistance />),

        StatusBarItemUtilities.createStatusBarItem("MessageCenter", StatusBarSection.Center, 20, <MessageCenter />),
        StatusBarItemUtilities.createStatusBarItem("DisplayStyle", StatusBarSection.Center, 40, <DisplayStyle />),
        StatusBarItemUtilities.createStatusBarItem("ActivityCenter", StatusBarSection.Center, 10, <ActivityCenter />),
        StatusBarItemUtilities.createStatusBarItem("ViewAttributes", StatusBarSection.Center, 60, <ViewAttributes />),
        StatusBarItemUtilities.createStatusBarItem("Sections", StatusBarSection.Center, 50, <Sections />),
        StatusBarItemUtilities.createStatusBarItem("ClearEmphasis", StatusBarSection.Center, 40, <ClearEmphasis hideWhenUnused={true} />),

        StatusBarItemUtilities.createStatusBarItem("SnapMode", StatusBarSection.Center, 30, (
          <BooleanSyncUiListener eventIds={[SampleAppUiActionId.setTestProperty]} boolFunc={(): boolean => SampleAppIModelApp.getTestProperty() !== "HIDE"}>
            {(isVisible: boolean) => isVisible && <SnapMode />}
          </BooleanSyncUiListener>
        )),

        StatusBarItemUtilities.createStatusBarItem("TileLoadIndicator", StatusBarSection.Right, 10, <TileLoadIndicator />),
        StatusBarItemUtilities.createStatusBarItem("SelectionInfo", StatusBarSection.Right, 30, <SelectionInfo />),
        StatusBarItemUtilities.createStatusBarItem("SelectionScope", StatusBarSection.Right, 20, <SelectionScope />),
      ];
    }
    return this._statusBarItems;
  }
}
