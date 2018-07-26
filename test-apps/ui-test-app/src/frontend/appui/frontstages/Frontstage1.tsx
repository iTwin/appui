/*---------------------------------------------------------------------------------------------
| $Copyright: (c) 2018 Bentley Systems, Incorporated. All rights reserved. $
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";

import { FrontstageProps } from "@bentley/ui-framework";
import { GroupButton } from "@bentley/ui-framework";
import { MessageButton, PageButton, ToolButton } from "@bentley/ui-framework";
import { ToolWidget } from "@bentley/ui-framework";
import { ZoneState } from "@bentley/ui-framework";
import { WidgetState } from "@bentley/ui-framework";
import { MessageDirection } from "@bentley/ui-framework";
import { NavigationWidget } from "@bentley/ui-framework";

import Toolbar from "@bentley/ui-ninezone/lib/toolbar/Toolbar";
import Direction from "@bentley/ui-ninezone/lib/utilities/Direction";

export class Frontstage1 {

  public defineProps(): FrontstageProps {
    const frontstageProps: FrontstageProps = {
      id: "Test1",
      defaultToolId: "PlaceLine",
      defaultLayout: "TwoHalvesVertical",
      contentGroup: "TestContentGroup1",
      defaultContentId: "TestContent1",
      isInFooterMode: false,
      applicationData: { key: "value" },

      topLeft: {
        defaultState: ZoneState.Open,
        allowsMerging: false,
        applicationData: { key: "value" },
        widgetProps: [
          {
            defaultState: WidgetState.Open,
            isFreeform: true,
            applicationData: { key: "value" },
            reactElement: this.getToolWidget(),
          },
        ],
      },
      topCenter: {
        defaultState: ZoneState.Open,
        allowsMerging: false,
        widgetProps: [
          {
            defaultState: WidgetState.Open,
            isFreeform: false,
            isToolSettings: true,
          },
        ],
      },
      topRight: {
        defaultState: ZoneState.Open,
        allowsMerging: false,
        widgetProps: [
          {
            defaultState: WidgetState.Open,
            isFreeform: true,
            reactElement: this.getNavigationWidget(),
          },
        ],
      },
      centerRight: {
        defaultState: ZoneState.Open,
        allowsMerging: true,
        widgetProps: [
          {
            classId: "NavigationTreeWidget",
            defaultState: WidgetState.Open,
            iconClass: "icon-placeholder",
            labelKey: "SampleApp:Test.my-label",
          },
        ],
      },
      bottomCenter: {
        defaultState: ZoneState.Open,
        allowsMerging: false,
        widgetProps: [
          {
            classId: "AppStatusBar",
            defaultState: WidgetState.Open,
            iconClass: "icon-placeholder",
            labelKey: "SampleApp:Test.my-label",
            isFreeform: false,
            isStatusBar: true,
          },
        ],
      },
      bottomRight: {
        defaultState: ZoneState.Open,
        allowsMerging: true,
        widgetProps: [
          {
            classId: "VerticalPropertyGridDemoWidget",
            defaultState: WidgetState.Open,
            iconClass: "icon-placeholder",
            labelKey: "SampleApp:Test.my-label",
          },
          {
            classId: "HorizontalPropertyGridDemoWidget",
            defaultState: WidgetState.Open,
            iconClass: "icon-placeholder",
            labelKey: "SampleApp:Test.my-label",
          },
        ],
      },
    };

    return frontstageProps;
  }

  /** Define a ToolWidget with Buttons to display in the TopLeft zone.
   */
  private getToolWidget(): React.ReactNode {
    const horizontalToolbar =
      <Toolbar>
        <PageButton pageId="my-page" iconClass="icon-placeholder" />
        <MessageButton messageId="my-message" iconClass="icon-placeholder" direction={MessageDirection.UI} />
        <ToolButton toolId="tool1" iconClass="icon-placeholder" labelKey="SampleApp:buttons.tool1" />
        <ToolButton toolId="tool2" iconClass="icon-placeholder" labelKey="SampleApp:buttons.tool2" />
        <GroupButton
          labelKey="SampleApp:buttons.toolGroup"
          iconClass="icon-placeholder"
          items={["tool1", "tool2", "item3", "item4", "item5", "item6", "item7", "item8", "tool1", "tool2", "item3", "item4", "item5", "item6", "item7", "item8"]}
          direction={Direction.Bottom}
          itemsInColumn={7}
        />
      </Toolbar>;

    const verticalToolbar =
      <Toolbar expandsTo={Direction.Right}>
        <ToolButton toolId="tool1" iconClass="icon-placeholder" labelKey="SampleApp:buttons.tool1" />
        <ToolButton toolId="tool2" iconClass="icon-placeholder" labelKey="SampleApp:buttons.tool2" />
        <GroupButton
          labelKey="SampleApp:buttons.anotherGroup"
          iconClass="icon-placeholder"
          items={["tool1", "tool2", "item3", "item4", "item5", "item6", "item7", "item8"]}
        />
      </Toolbar>;

    return (
      <ToolWidget
        appButtonId="SampleApp.BackstageToggle"
        horizontalToolbar={horizontalToolbar}
        verticalToolbar={verticalToolbar}
      />
    );
  }

  /** Define a NavigationWidget with Buttons to display in the TopRight zone.
   */
  private getNavigationWidget(): React.ReactNode {

    const horizontalToolbar =
      <Toolbar>
        <ToolButton toolId="item5" iconClass="icon-placeholder" labelKey="SampleApp:buttons.item5" />
        <ToolButton toolId="item6" iconClass="icon-placeholder" labelKey="SampleApp:buttons.item6" />
      </Toolbar>;

    const verticalToolbar =
      <Toolbar expandsTo={Direction.Right}>
        <ToolButton toolId="item7" iconClass="icon-placeholder" labelKey="SampleApp:buttons.item7" />
        <ToolButton toolId="item8" iconClass="icon-placeholder" labelKey="SampleApp:buttons.item8" />
      </Toolbar>;

    return (
      <NavigationWidget
        navigationAidId="CubeExampleNavigationAid"
        horizontalToolbar={horizontalToolbar}
        verticalToolbar={verticalToolbar}
      />
    );
  }
}
