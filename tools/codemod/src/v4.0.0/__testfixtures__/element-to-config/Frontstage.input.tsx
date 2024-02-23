/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
// import { Frontstage, StagePanel, Zone, Widget } from "@itwin/appui-react";
// <Frontstage
//   key={this.props.id}
//   id={this.props.id}
//   version={this.props.version ?? 1.0}
//   defaultTool={this.props.defaultTool ?? CoreTools.selectElementCommand}
//   contentGroup={contentGroup}
//   isInFooterMode={true}
//   usage={this.props.usage}
//   applicationData={this.props.applicationData}
//   contentManipulationTools={
//     <Zone
//       widgets={
//         [
//           <Widget id={`${this.props.id}-contentManipulationTools`} key={`${this.props.id}-contentManipulationTools`} isFreeform={true}
//             element={<ContentToolWidgetComposer cornerButton={this.props.cornerButton} />}
//           />,
//         ]}
//     />
//   }
//   viewNavigationTools={
//     <Zone
//       widgets={
//         [
//           <Widget id={`${this.props.id}-viewNavigationTools`} key={`${this.props.id}-viewNavigationTools`} isFreeform={true}
//             element={<ViewToolWidgetComposer hideNavigationAid={this.props.hideNavigationAid} />}
//           />,
//         ]}
//     />
//   }
//   toolSettings={
//     <Zone
//       widgets={
//         [
//           <Widget id={`${this.props.id}-toolSettings`} key={`${this.props.id}-toolSettings`} isToolSettings={true} />,
//         ]
//       }
//     />
//   }
//   statusBar={
//     <Zone
//       widgets={
//         [
//           <Widget id={`${this.props.id}-statusBar`} key={`${this.props.id}-statusBar`} isStatusBar={true} />,
//         ]
//       }
//     />
//   }
//   leftPanel={
//     <StagePanel
//       size={300}
//       pinned={false}
//       defaultState={StagePanelState.Minimized}
//       {...this.props.leftPanelProps}
//     />
//   }
//   topPanel={
//     <StagePanel
//       size={90}
//       pinned={false}
//       defaultState={StagePanelState.Minimized}
//       {...this.props.topPanelProps}
//     />
//   }
//   rightPanel={
//     <StagePanel
//       defaultState={StagePanelState.Open}
//       {...this.props.rightPanelProps}

//     />
//   }
//   bottomPanel={
//     <StagePanel
//       size={180}
//       defaultState={StagePanelState.Open}
//       {...this.props.bottomPanelProps}
//     />
//   }
// />
