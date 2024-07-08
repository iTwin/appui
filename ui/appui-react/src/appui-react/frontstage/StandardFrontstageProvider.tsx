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
import type { BackstageAppButton } from "../widgets/BackstageAppButton";

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
  /** Id of the frontstage. See {@link Frontstage["id"]}. */
  id: string;
  /** Version of the frontstage. See {@link Frontstage["version"]}. */
  version?: number;
  /** Usage of the frontstage. See {@link Frontstage["usage"]}. */
  usage: StageUsage | string;
  /** Default tool of the frontstage. See {@link Frontstage["defaultTool"]}. */
  defaultTool?: string;
  /** Definition of available content groups or a function that provides them */
  contentGroupProps: ContentGroupProps | ContentGroupProvider;
  /** Specify a corner button. It is typically used to open the backstage, see {@link BackstageAppButton}. */
  cornerButton?: React.ReactNode;
  /** Set to `true` if default navigation aid is not desired. */
  hideNavigationAid?: boolean;
  /** Set to `true` if no tool setting dock is needed. Typically only used in modal stages. */
  hideToolSettings?: boolean;
  /** Set to `true` if no status bar is needed in stage */
  hideStatusBar?: boolean;
  /** Props used to set initial size and state of panel. Defaults to:
   *  { sizeSpec: 300, pinned: false, defaultState:StagePanelState.Minimized }
   */
  leftPanelProps?: WidgetPanelProps;
  /** Props used to set initial size and state of panel. Defaults to:
   *  { sizeSpec: 90, pinned: false, defaultState:StagePanelState.Minimized }
   */
  topPanelProps?: WidgetPanelProps;
  /** Props used to set initial size and state of panel. Defaults to:
   *  { sizeSpec: 200, pinned: true, defaultState:StagePanelState.Open }
   */
  rightPanelProps?: WidgetPanelProps;
  /** Props used to set initial size and state of panel. Defaults to:
   *  { sizeSpec: 180, pinned: true, defaultState:StagePanelState.Open }
   */
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
