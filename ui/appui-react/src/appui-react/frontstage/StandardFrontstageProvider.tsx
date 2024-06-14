/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Frontstage
 */

import type * as React from "react";
import type {
  ContentGroupProps,
  ContentGroupProvider,
} from "../content/ContentGroup";
import { FrontstageProvider } from "./FrontstageProvider";
import type { StagePanelConfig } from "../stagepanels/StagePanelConfig";
import type { StageUsage } from "./StageUsage";
import type { Frontstage } from "./Frontstage";
import { FrontstageUtilities } from "./FrontstageUtilities";

/** Widget panel properties used in a {@link StandardFrontstageProps}.
 * @public
 */
export type WidgetPanelProps = Omit<
  StagePanelConfig,
  "widgets" | "runtimeProps" | "header" | "allowedZones" | "panelZones"
>;

/** Props of a {@link StandardFrontstageProvider}.
 * @public
 */
export interface StandardFrontstageProps {
  /* unique stage id. To ensure uniqueness it is common practice to format id like `appName:stageId` */
  id: string;
  /* version id that is used to store state of stage */
  version?: number;
  // Usage of stage. To allow generic UiItemProvides to populate this stage set to `StageUsage.General`.
  usage: StageUsage | string;
  /** The defaultTool is is started when then frontstage loads and whenever any other tools exit.
   * Most of the time, this is the Element Selection Tool (SelectionTool.toolId).
   * Your app can specify its own tool or another core tool as default with this property.
   */
  defaultTool?: string;
  /** Definition of available content groups or a function that provides them */
  contentGroupProps: ContentGroupProps | ContentGroupProvider;
  /** Specify button to use to open backstage. Leave undefined for no backstage button.
   * ```
   * <BackstageAppButton icon={<SvgBentleySystems />} />
   * ```
   * Custom corner button definition
   * ```
   * const cornerButton = <BackstageAppButton icon={<SvgBentleySystems />}
   *   label="Toggle Backstage display",
   *   execute={() => UiFramework.backstage.getBackstageToggleCommand().execute()} />;
   * ```
   */
  cornerButton?: React.ReactNode;
  /** Set to true if default Navigation aid is not desired */
  hideNavigationAid?: boolean;
  /** Set to true if no tool setting dock is needed. Typically only used in modal stages. */
  hideToolSettings?: boolean;
  /** Set to true if no status bar is needed in stage */
  hideStatusBar?: boolean;
  /** Props used to set initial size and state of panel. Defaults to:
   *  {sizeSpec: 300, pinned=false, defaultState:StagePanelState.Minimized} */
  leftPanelProps?: WidgetPanelProps;
  /** Props used to set initial size and state of panel. Defaults to:
   *  {sizeSpec: 90, pinned=false, defaultState:StagePanelState.Minimized} */
  topPanelProps?: WidgetPanelProps;
  /** Props used to set initial size and state of panel. Defaults to:
   *  {sizeSpec: 200, pinned=true, defaultState:StagePanelState.Open} */
  rightPanelProps?: WidgetPanelProps;
  /** Props used to set initial size and state of panel. Defaults to:
   *  {sizeSpec: 180, pinned=true, defaultState:StagePanelState.Open} */
  bottomPanelProps?: WidgetPanelProps;
}

/** FrontstageProvider that provides an "empty" stage. All tool buttons, statusbar items, and widgets must
 * be provided by one or more item providers, see [[UiItemsProvider]].
 * @public
 * @deprecated in 4.15.0. Use {@link FrontstageUtilities.createStandardFrontstage} instead.
 */
// eslint-disable-next-line deprecation/deprecation
export class StandardFrontstageProvider extends FrontstageProvider {
  constructor(private props: StandardFrontstageProps) {
    super();
  }

  public override get id(): string {
    return this.props.id;
  }

  public override frontstageConfig(): Frontstage {
    const config = FrontstageUtilities.createStandardFrontstage(this.props);
    return config;
  }
}
