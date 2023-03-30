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
  const rightStagePanelWidgets = [<Widget element={<RightPanel />} />,];
  const rightStagePanel = <StagePanel
    allowedZones={[2, 9]}
    resizable={false}
    size={200}
    widgets={rightStagePanelWidgets}
  />;
  frontstage(rightStagePanel);
}

function frontstage(rightStagePanel) {

  const id = "frontstage";
  const contentGroup = new ContentGroup(AppUi.TestContentGroup1);
  const topLeftZone = <Zone
    widgets={[
      <Widget isFreeform={true} element={<FrontstageToolWidget />} />,
    ]}
  />;
  const centerRightZone = <Zone defaultState={ZoneState.Open} allowsMerging={true} mergeWithZone={ZoneLocation.BottomRight} />;
  const bottomRightZone = <Zone defaultState={ZoneState.Open} allowsMerging={true}
    widgets={[
      <Widget defaultState={WidgetState.Open} iconSpec="icon-placeholder" labelKey="SampleApp:widgets.HorizontalPropertyGrid" control={HorizontalPropertyGridWidgetControl} fillZone={true} />,
      <Widget id="VerticalPropertyGrid1" defaultState={WidgetState.Hidden} iconSpec="icon-placeholder" labelKey="SampleApp:widgets.VerticalPropertyGrid" control={VerticalPropertyGridWidgetControl} />,
    ]}
  />;
  const topMostStagePanelWidgets = [<Widget element={<h2>Top most panel</h2>} />,];
  const topMostStagePanel = <StagePanel widgets={topMostStagePanelWidgets} />;
  const topStagePanelWidgets = [<Widget element={<h2>Top panel</h2>} />,];
  const topStagePanel = <StagePanel resizable={false} widgets={topStagePanelWidgets} />;

  return (
    <Frontstage
      id={id}
      version={1}
      contentGroup={contentGroup}
      topLeft={topLeftZone}
      centerRight={centerRightZone}
      bottomRight={bottomRightZone}
      topMostPanel={topMostStagePanel}
      topPanel={topStagePanel}
      rightPanel={rightStagePanel}
    />
  );
}