/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import "./AppStatusBar.scss";
import * as React from "react";
import { ConditionalBooleanValue, StatusBarSection } from "@bentley/ui-abstract";
import {
  ActivityCenterField, ClearEmphasisStatusField, ConfigurableUiManager, FooterModeField, MessageCenterField, SectionsStatusField, SelectionInfoField,
  SelectionScopeField, SnapModeField, StatusBarComposer, StatusBarItem, StatusBarItemUtilities, StatusBarWidgetControl, StatusBarWidgetControlArgs,
  TileLoadingIndicator, ToolAssistanceField, ViewAttributesStatusField, withMessageCenterFieldProps, withStatusFieldProps,
} from "@bentley/ui-framework";
import { FooterSeparator } from "@bentley/ui-ninezone";
import { SampleAppIModelApp, SampleAppUiActionId } from "../..";
import { DisplayStyleField } from "../statusfields/DisplayStyleField";

// tslint:disable-next-line: variable-name
const ToolAssistance = withStatusFieldProps(ToolAssistanceField);
// tslint:disable-next-line: variable-name
const MessageCenter = withMessageCenterFieldProps(MessageCenterField);
// tslint:disable-next-line: variable-name
const SnapMode = withStatusFieldProps(SnapModeField);
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
// tslint:disable-next-line: variable-name
const FooterMode = withStatusFieldProps(FooterModeField);

export class AppStatusBarWidgetControl extends StatusBarWidgetControl {
  private _statusBarItems: StatusBarItem[] | undefined;

  public get statusBarItems(): StatusBarItem[] {
    if (!this._statusBarItems) {
      const isHiddenCondition = new ConditionalBooleanValue(() => SampleAppIModelApp.getTestProperty() === "HIDE", [SampleAppUiActionId.setTestProperty]);

      this._statusBarItems = [
        StatusBarItemUtilities.createStatusBarItem("ToolAssistance", StatusBarSection.Left, 10, <ToolAssistance style={{ minWidth: "21em" }} />),
        StatusBarItemUtilities.createStatusBarItem("ToolAssistanceSeparator", StatusBarSection.Left, 15, (<FooterMode> <FooterSeparator /> </FooterMode>)),
        StatusBarItemUtilities.createStatusBarItem("MessageCenter", StatusBarSection.Left, 20, <MessageCenter />),
        StatusBarItemUtilities.createStatusBarItem("MessageCenterSeparator", StatusBarSection.Left, 25, (<FooterMode> <FooterSeparator /> </FooterMode>)),
        StatusBarItemUtilities.createStatusBarItem("DisplayStyle", StatusBarSection.Center, 40, <DisplayStyle />),
        StatusBarItemUtilities.createStatusBarItem("ActivityCenter", StatusBarSection.Center, 10, <ActivityCenter />),
        StatusBarItemUtilities.createStatusBarItem("ViewAttributes", StatusBarSection.Center, 60, <ViewAttributes />),
        StatusBarItemUtilities.createStatusBarItem("Sections", StatusBarSection.Center, 50, <Sections hideWhenUnused={true} />),
        StatusBarItemUtilities.createStatusBarItem("ClearEmphasis", StatusBarSection.Center, 40, <ClearEmphasis hideWhenUnused={true} />),
        StatusBarItemUtilities.createStatusBarItem("SnapMode", StatusBarSection.Center, 30, <SnapMode />, { isHidden: isHiddenCondition }),
        StatusBarItemUtilities.createStatusBarItem("TileLoadIndicator", StatusBarSection.Right, 10, <TileLoadIndicator />),
        StatusBarItemUtilities.createStatusBarItem("SelectionInfo", StatusBarSection.Right, 30, <SelectionInfo />),
        StatusBarItemUtilities.createStatusBarItem("SelectionScope", StatusBarSection.Right, 20, <SelectionScope />),
      ];
    }
    return this._statusBarItems;
  }

  public getReactNode(_args: StatusBarWidgetControlArgs): React.ReactNode {
    return (
      <StatusBarComposer items={this.statusBarItems} />
    );
  }
}

ConfigurableUiManager.registerControl("AppStatusBar", AppStatusBarWidgetControl);
