/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
<Frontstage
  id={this.id}
  version={1}
  defaultTool={CoreTools.selectElementCommand}
  contentGroup={contentGroup}
  defaultContentId="TestContent1"
  topLeft={
    <Zone
      widgets={[
        <Widget id={"contentManipulation"} isFreeform={true} element={<FrontstageToolWidget />} />,
      ]}
    />
  }
  topCenter={
    <Zone
      widgets={[
        <Widget id={"toolSettings"} isToolSettings={true} />,
      ]}
    />
  }
  topRight={
    <Zone
      widgets={[
        <Widget id={"viewNavigation"} isFreeform={true} element={<FrontstageNavigationWidget />} />,
      ]}
    />
  }
  bottomCenter={
    <Zone defaultState={ZoneState.Open}
      widgets={[
        <Widget id={"statusBar"} isStatusBar={true} />,
      ]}
    />
  }
  centerLeft={
    <Zone
      allowsMerging={true}
      defaultState={ZoneState.Minimized}
      widgets={[
        <Widget id="VerticalPropertyGrid" iconSpec="icon-placeholder" labelKey="SampleApp:widgets.VerticalPropertyGrid" />,
      ]}
    />
  }
  centerRight={
    <Zone defaultState={ZoneState.Open} allowsMerging={true} mergeWithZone={ZoneLocation.BottomRight}
    />
  }
  bottomRight={
    <Zone defaultState={ZoneState.Open} allowsMerging={true}
      widgets={[
        <Widget id="HorizontalPropertyGrid1" defaultState={WidgetState.Open} iconSpec="icon-placeholder" labelKey="SampleApp:widgets.HorizontalPropertyGrid" fillZone={true} />,
        <Widget id="VerticalPropertyGrid1" defaultState={WidgetState.Hidden} iconSpec="icon-placeholder" labelKey="SampleApp:widgets.VerticalPropertyGrid" />,
      ]}
    />
  }
  topMostPanel={
    <StagePanel
      widgets={[
        <Widget id={"topMostPanel"} element={<h2>Top most panel</h2>} />
      ]}
    />
  }
  topPanel={
    <StagePanel
      resizable={false}
      widgets={[<Widget id={"topPanel"} element={<h2>Top panel</h2>} />]}
    />
  }
  leftPanel={
    <StagePanel
      allowedZones={this._leftPanel.allowedZones}
    />
  }
  rightPanel={
    <StagePanel
      allowedZones={this._rightPanel.allowedZones}
      resizable={false}
      size={200}
      widgets={[<Widget id={"RightPanel"} element={<RightPanel />} />]}
    />
  }
  bottomPanel={
    <StagePanel
      widgets={[<Widget id={"SampleTimeline"} element={<SampleTimelineComponent />} />]}
    />
  }
  bottomMostPanel={
    <StagePanel
      allowedZones={this._bottomMostPanel.allowedZones}
      size={100}
      widgets={[<Widget id={"BottomMostPanelWidget"} element={<h2>BottomMost panel</h2>} />]}
    />
  }
/>