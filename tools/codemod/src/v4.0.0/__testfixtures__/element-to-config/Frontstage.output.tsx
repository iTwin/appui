/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
({
  id: this.props.id,
  version: this.props.version ?? 1.0,
  contentGroup: contentGroup,
  usage: this.props.usage,
  contentManipulation: {
    id: `${this.props.id}-contentManipulationTools`,
    element: <ContentToolWidgetComposer cornerButton={this.props.cornerButton} />,
  },
  viewNavigation: {
    id: `${this.props.id}-viewNavigationTools`,
    element: <ViewToolWidgetComposer hideNavigationAid={this.props.hideNavigationAid} />,
  },
  toolSettings: this.props.hideToolSettings ? undefined : {
    id: `${this.props.id}-toolSettings`,
  },
  statusBar: this.props.hideStatusBar ? undefined : {
    id: `${this.props.id}-statusBar`,
    control: StatusBarWidgetComposerControl,
  },
  leftPanel: {
    size: 300,
    pinned: false,
    defaultState: StagePanelState.Minimized,
    ...this.props.leftPanelProps,
  },
  topPanel: {
    size: 90,
    pinned: false,
    defaultState: StagePanelState.Minimized,
    ...this.props.topPanelProps,
  },
  rightPanel: {
    defaultState: StagePanelState.Open,
    ...this.props.rightPanelProps,
  },
  bottomPanel: {
    size: 180,
    defaultState: StagePanelState.Open,
    ...this.props.bottomPanelProps,
  },
})