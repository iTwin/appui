/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import * as React from "react";
import {
  ContentGroup, Frontstage,
  StagePanel, Widget, Zone, ZoneLocation,
  ZoneState,
} from "@itwin/appui-react";
import { HorizontalPropertyGridWidgetControl, VerticalPropertyGridWidgetControl } from "../widgets/PropertyGridDemoWidget";
import { AppUi } from "../AppUi";

function main() {
  const rightStagePanelWidgets = [{
    content: <RightPanel />,
  },];
  const rightStagePanel = {
    resizable: false,
    size: 200,

    sections: {
      start: [...rightStagePanelWidgets],
    },
  };
  frontstage(rightStagePanel);
}

function frontstage(rightStagePanel) {

  const id = "frontstage";
  const contentGroup = new ContentGroup(AppUi.TestContentGroup1);
  const topLeftZone = [
    {
      content: <FrontstageToolWidget />,
    },
  ];
  const centerRightZone = undefined;
  const bottomRightZone = [
    {
      defaultState: WidgetState.Open,
      icon: "icon-placeholder",
      labelKey: "SampleApp:widgets.HorizontalPropertyGrid",
      control: HorizontalPropertyGridWidgetControl,
    },
    {
      id: "VerticalPropertyGrid1",
      defaultState: WidgetState.Hidden,
      icon: "icon-placeholder",
      labelKey: "SampleApp:widgets.VerticalPropertyGrid",
      control: VerticalPropertyGridWidgetControl,
    },
  ];
  const topMostStagePanelWidgets = [{
    content: <h2>Top most panel</h2>,
  },];
  const topMostStagePanel = {
    sections: {
      start: [...topMostStagePanelWidgets],
    },
  };
  const topStagePanelWidgets = [{
    content: <h2>Top panel</h2>,
  },];
  const topStagePanel = {
    resizable: false,

    sections: {
      start: [...topStagePanelWidgets],
    },
  };

  return {
    id,
    contentGroup,
    version: 1,
    contentManipulation: topLeftZone,
    centerRight: centerRightZone,
    bottomRight: bottomRightZone,
    topMostPanel: topMostStagePanel,
    topPanel: topStagePanel,
    rightPanel: rightStagePanel,
  };
}