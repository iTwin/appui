/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
<Frontstage // eslint-disable-line deprecation/deprecation
  key={this.props.id}
  id={this.props.id}
  version={this.props.version ?? 1.0}
  defaultTool={this.props.defaultTool ?? CoreTools.selectElementCommand}
  contentGroup={contentGroup}
  isInFooterMode={true}
  usage={this.props.usage}
  applicationData={this.props.applicationData}

  contentManipulationTools={
    <Zone // eslint-disable-line deprecation/deprecation
      widgets={
        [
          <Widget id={`${this.props.id}-contentManipulationTools`} key={`${this.props.id}-contentManipulationTools`} isFreeform={true} // eslint-disable-line deprecation/deprecation
            element={<ContentToolWidgetComposer cornerButton={this.props.cornerButton} />}
          />,
        ]}
    />
  }
  viewNavigationTools={
    <Zone // eslint-disable-line deprecation/deprecation
      widgets={
        [
          <Widget id={`${this.props.id}-viewNavigationTools`} key={`${this.props.id}-viewNavigationTools`} isFreeform={true} // eslint-disable-line deprecation/deprecation
            element={<ViewToolWidgetComposer hideNavigationAid={this.props.hideNavigationAid} />}
          />,
        ]}
    />
  }
  toolSettings={
    <Zone // eslint-disable-line deprecation/deprecation
      widgets={
        this.props.hideToolSettings ? [] :
          [
            <Widget id={`${this.props.id}-toolSettings`} key={`${this.props.id}-toolSettings`} isToolSettings={true} />, // eslint-disable-line deprecation/deprecation
          ]
      }
    />
  }
  statusBar={
    <Zone // eslint-disable-line deprecation/deprecation
      widgets={
        this.props.hideStatusBar ? [] :
          [
            <Widget id={`${this.props.id}-statusBar`} key={`${this.props.id}-statusBar`} isStatusBar={true} // eslint-disable-line deprecation/deprecation
              control={StatusBarWidgetComposerControl} />,
          ]
      }
    />
  }

  leftPanel={
    <StagePanel // eslint-disable-line deprecation/deprecation
      size={300}
      pinned={false}
      defaultState={StagePanelState.Minimized}
      {...this.props.leftPanelProps}
    />
  }

  topPanel={
    <StagePanel // eslint-disable-line deprecation/deprecation
      size={90}
      pinned={false}
      defaultState={StagePanelState.Minimized}
      {...this.props.topPanelProps}
    />
  }

  rightPanel={
    <StagePanel // eslint-disable-line deprecation/deprecation
      defaultState={StagePanelState.Open}
      {...this.props.rightPanelProps}

    />
  }

  bottomPanel={
    <StagePanel // eslint-disable-line deprecation/deprecation
      size={180}
      defaultState={StagePanelState.Open}
      {...this.props.bottomPanelProps}
    />
  }
/>