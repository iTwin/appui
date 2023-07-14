/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
({
  id: this.props.id,
  contentGroup,
  usage: this.props.usage,
  version: this.props.version ?? 1.0,

  contentManipulation: {
    id: `${this.props.id}-contentManipulationTools`,
    content: <ContentToolWidgetComposer cornerButton={this.props.cornerButton} />,
  },

  toolSettings: {
    id: `${this.props.id}-toolSettings`,
  },

  viewNavigation: {
    id: `${this.props.id}-viewNavigationTools`,
    content: <ViewToolWidgetComposer hideNavigationAid={this.props.hideNavigationAid} />,
  },

  statusBar: {
    id: `${this.props.id}-statusBar`,
  },

  topPanel: {
    defaultState: StagePanelState.Minimized,
    pinned: false,
    size: 90,
    ...this.props.topPanelProps,
  },

  leftPanel: {
    defaultState: StagePanelState.Minimized,
    pinned: false,
    size: 300,
    ...this.props.leftPanelProps,
  },

  rightPanel: {
    defaultState: StagePanelState.Open,
    ...this.props.rightPanelProps,
  },

  bottomPanel: {
    defaultState: StagePanelState.Open,
    size: 180,
    ...this.props.bottomPanelProps,
  },
});
