/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Frontstage
 */

import { CommonProps } from "@itwin/core-react";
import { ContentGroup, ContentGroupProvider } from "../content/ContentGroup";
import { ToolItemDef } from "../shared/ToolItemDef";
import { StagePanelProps } from "../stagepanels/StagePanel";
import { WidgetProps } from "../widgets/WidgetProps";

/** Properties of a Frontstage.
 * @public
 */
export interface FrontstageProps extends CommonProps {
  /** Id for the Frontstage */
  id: string;
  /** Tool that is started once the Frontstage is activated */
  defaultTool: ToolItemDef;
  /** The Content Group providing the Content Views */
  contentGroup: ContentGroup | ContentGroupProvider;
  /** Id of the Content View to be activated initially */
  defaultContentId?: string;
  /** Any application data to attach to this Frontstage. */
  applicationData?: any;
  /** Usage type for this Frontstage. */
  usage?: string;
  /** Frontstage version. Used to force saved layout reinitialization after changes to frontstage.
   * @note This value should be increased when changes are made to Frontstage.
   * Increasing the value will make sure to reinitialize App layout instead of restoring to old layout.
   * Version increase is required when widgets are added/removed.
   */
  version?: number;
  /** if isIModelIndependent then frontstage is independent from any iModel. */
  isIModelIndependent?: boolean;

  /** The Zone in the top-left corner that shows tools typically used to query and modify content. */
  contentManipulation?: WidgetProps;
  /** The Zone the that shows settings for the active tool. */
  toolSettings?: WidgetProps;
  /** The Zone in the top-right corner that shows view navigation tools. */
  viewNavigation?: WidgetProps;
  /** The status bar Zone shown as the application footer. */
  statusBar?: WidgetProps;

  /** The StagePanel on the top of the AppUi container. */
  topPanel?: StagePanelProps;
  /** The StagePanel on the left.  */
  leftPanel?: StagePanelProps;
  /** The StagePanel on the right.  */
  rightPanel?: StagePanelProps;
  /** The StagePanel on the bottom of the AppUi container.  */
  bottomPanel?: StagePanelProps;
}
