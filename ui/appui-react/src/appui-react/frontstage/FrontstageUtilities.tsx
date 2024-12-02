/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Frontstage
 */

import * as React from "react";
import { ContentGroup, ContentGroupProvider } from "../content/ContentGroup.js";
import { ContentToolWidgetComposer } from "../widgets/ContentToolWidgetComposer.js";
import { ViewToolWidgetComposer } from "../widgets/ViewToolWidgetComposer.js";
import { StatusBarComposer } from "../statusbar/StatusBarComposer.js";
import { StagePanelState } from "../stagepanels/StagePanelState.js";
import type { Frontstage } from "./Frontstage.js";
import type { UiItemsProvider } from "../ui-items-provider/UiItemsProvider.js";
import type { StandardFrontstageProps } from "./StandardFrontstageProvider.js";

/** Helper namespace to create frontstages.
 * @beta
 */
export namespace FrontstageUtilities {
  /** Creates an empty frontstage. All toolbar buttons, widgets and other UI items must be provided by {@link UiItemsProvider}. */
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
        content: (
          <ContentToolWidgetComposer cornerButton={props.cornerButton} />
        ),
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
      activeToolEmptyMessage: "",
    };
  }
}
