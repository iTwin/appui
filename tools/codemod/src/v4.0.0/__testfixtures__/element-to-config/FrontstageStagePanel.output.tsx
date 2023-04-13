/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { Frontstage, StagePanel, Zone, Widget } from "@itwin/appui-react";
({
  id: this.id,
  contentGroup,
  version: 1,

  contentManipulation: {
    id: "contentManipulation",
    content: <FrontstageToolWidget />,
  },

  toolSettings: {
    id: "toolSettings",
  },

  viewNavigation: {
    id: "viewNavigation",
    content: <FrontstageNavigationWidget />,
  },

  statusBar: {
    id: "statusBar",
  },

  topPanel: {
    resizable: false,

    sections: {
      start: [{
        id: "topPanel",
        content: <h2>Top panel</h2>,
      }],

      end: [{
        id: "topMostPanel",
        content: <h2>Top most panel</h2>,
      }],
    },
  },

  leftPanel: {
    sections: {
      start: [{
        id: "VerticalPropertyGrid",
        icon: "icon-placeholder",
        labelKey: "SampleApp:widgets.VerticalPropertyGrid",
      }],
    },
  },

  rightPanel: {
    resizable: false,
    size: 200,

    sections: {
      start: [{
        id: "RightPanel",
        content: <RightPanel />,
      }],

      end: [{
        id: "HorizontalPropertyGrid1",
        defaultState: WidgetState.Open,
        icon: "icon-placeholder",
        labelKey: "SampleApp:widgets.HorizontalPropertyGrid",
      }, {
        id: "VerticalPropertyGrid1",
        defaultState: WidgetState.Hidden,
        icon: "icon-placeholder",
        labelKey: "SampleApp:widgets.VerticalPropertyGrid",
      }],
    },
  },

  bottomPanel: {
    sections: {
      start: [{
        id: "SampleTimeline",
        content: <SampleTimelineComponent />,
      }],

      end: [{
        id: "BottomMostPanelWidget",
        content: <h2>BottomMost panel</h2>,
      }],
    },
  },
})