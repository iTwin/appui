/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Frontstage
 */

import * as React from "react";
import type { ContentGroupProps } from "../content/ContentGroup";
import { ContentGroup, ContentGroupProvider } from "../content/ContentGroup";
import { FrontstageProvider } from "./FrontstageProvider";
import { ContentToolWidgetComposer } from "../widgets/ContentToolWidgetComposer";
import { ViewToolWidgetComposer } from "../widgets/ViewToolWidgetComposer";
import type { FrontstageConfig } from "./FrontstageConfig";
import type { StagePanelConfig } from "../stagepanels/StagePanelConfig";
import type { StageUsage } from "./StageUsage";
import { StatusBarComposer } from "../statusbar/StatusBarComposer";
import { StagePanelState } from "../stagepanels/StagePanelState";
import type { Frontstage } from "./Frontstage";
import type { UiItemsProvider } from "../ui-items-provider/UiItemsProvider";

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

/** Frontstage that provides an "empty" stage. All tool buttons, status bar items, and widgets must
 * be provided by one or more item providers, see {@link UiItemsProvider}.
 * @public
 */
export function createStandardFrontstage(
  props: StandardFrontstageProps
): Frontstage {
  const contentGroup =
    props.contentGroupProps instanceof ContentGroupProvider
      ? props.contentGroupProps
      : new ContentGroup(props.contentGroupProps);
  return {
    id: props.id,
    version: props.version ?? 1.0,
    contentGroup,
    usage: props.usage,
    defaultTool: props.defaultTool,
    contentManipulation: {
      id: `${props.id}-contentManipulationTools`,
      content: <ContentToolWidgetComposer cornerButton={props.cornerButton} />,
    },
    viewNavigation: {
      id: `${props.id}-viewNavigationTools`,
      content: (
        <ViewToolWidgetComposer hideNavigationAid={props.hideNavigationAid} />
      ),
    },
    toolSettings: props.hideToolSettings
      ? undefined
      : {
          id: `${props.id}-toolSettings`,
        },
    statusBar: props.hideStatusBar
      ? undefined
      : {
          id: `${props.id}-statusBar`,
          content: <StatusBarComposer items={[]} />,
        },
    leftPanel: {
      sizeSpec: 300,
      pinned: false,
      defaultState: StagePanelState.Minimized,
      ...props.leftPanelProps,
    },
    topPanel: {
      sizeSpec: 90,
      pinned: false,
      defaultState: StagePanelState.Minimized,
      ...props.topPanelProps,
    },
    rightPanel: {
      defaultState: StagePanelState.Open,
      ...props.rightPanelProps,
    },
    bottomPanel: {
      sizeSpec: 180,
      defaultState: StagePanelState.Open,
      ...props.bottomPanelProps,
    },
  };
}

/* eslint-disable deprecation/deprecation */

/** FrontstageProvider that provides an "empty" stage. All tool buttons, statusbar items, and widgets must
 * be provided by one or more item providers, see [[UiItemsProvider]].
 * @public
 * @deprecated in 4.15.0. Use {@link createStandardFrontstage} instead.
 */
export class StandardFrontstageProvider extends FrontstageProvider {
  constructor(private props: StandardFrontstageProps) {
    super();
  }

  public override get id(): string {
    return this.props.id;
  }

  public override frontstageConfig(): FrontstageConfig {
    const config = createStandardFrontstage(this.props);
    return config;
  }
}
