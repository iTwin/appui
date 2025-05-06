/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module ContentView
 */

import "./DefaultViewOverlay.scss";
import * as React from "react";
import type { ScreenViewport } from "@itwin/core-frontend";
import {
  SolarTimeline,
  TimelineComponent,
} from "@itwin/imodel-components-react";
import { useScheduleAnimationDataProvider } from "../hooks/useScheduleAnimationDataProvider.js";
import { useActiveViewport } from "../hooks/useActiveViewport.js";
import { useSolarDataProvider } from "../hooks/useSolarDataProvider.js";
import { useAnalysisAnimationDataProvider } from "../hooks/useAnalysisAnimationDataProvider.js";

/** Props of Viewport Overlay Control that show timelines
 * @public
 */
export interface ViewOverlayProps {
  viewport: ScreenViewport;
  onPlayPause?: (playing: boolean) => void; // callback with play/pause button is pressed
  /** @deprecated in 4.16.0. Use props specific to component features instead. */
  featureOptions?: { [key: string]: any };
}

interface DefaultViewOverlayProps extends ViewOverlayProps {
  /** Specifies if the solar timeline should be displayed. Defaults to `false`.
   * @note This is preferred over {@link ViewOverlayProps.featureOptions}.
   */
  solarTimeline?: boolean;
  /** Specifies if the analysis timeline should be displayed. Defaults to `false`.
   * @note This is preferred over {@link ViewOverlayProps.featureOptions}.
   */
  analysisTimeline?: boolean;
  /** Specifies if the schedule animation timeline should be displayed. Defaults to `false`.
   * @note This is preferred over {@link ViewOverlayProps.featureOptions}.
   */
  scheduleAnimation?: boolean;
}

/**
 * Default viewport overlay that examines ViewState of the active view for a schedule script, analysis data, or solar data. If one of these is detected, the corresponding
 * data provider is attached to the TimelineComponent and the overlay is made visible.
 * @public
 */
export function DefaultViewOverlay({
  viewport,
  onPlayPause,
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  featureOptions,
  ...props
}: DefaultViewOverlayProps) {
  const solarDataTimelineProvider = useSolarDataProvider(viewport);
  const analysisAnimationTimelineDataProvider =
    useAnalysisAnimationDataProvider(viewport);
  const scheduleTimelineDataProvider =
    useScheduleAnimationDataProvider(viewport);
  const currentViewport = useActiveViewport();

  if (!currentViewport) return null;

  // Solar gets first shot
  const enableSolarTimelineViewOverlay =
    props.solarTimeline ??
    featureOptions?.defaultViewOverlay?.enableSolarTimelineViewOverlay;
  if (solarDataTimelineProvider && enableSolarTimelineViewOverlay) {
    return (
      <div className="uifw-view-overlay">
        <div className="uifw-animation-overlay">
          <SolarTimeline dataProvider={solarDataTimelineProvider} />
        </div>
      </div>
    );
  }

  const enableAnalysisTimelineViewOverlay =
    props.analysisTimeline ??
    featureOptions?.defaultViewOverlay?.enableAnalysisTimelineViewOverlay;
  if (
    analysisAnimationTimelineDataProvider &&
    enableAnalysisTimelineViewOverlay
  ) {
    return (
      <div className="uifw-view-overlay">
        <div className="uifw-animation-overlay">
          <TimelineComponent
            startDate={analysisAnimationTimelineDataProvider.start}
            endDate={analysisAnimationTimelineDataProvider.end}
            initialDuration={
              analysisAnimationTimelineDataProvider.initialDuration
            }
            totalDuration={analysisAnimationTimelineDataProvider.duration}
            // eslint-disable-next-line @typescript-eslint/no-deprecated
            minimized={true}
            onChange={
              analysisAnimationTimelineDataProvider.onAnimationFractionChanged
            }
            onPlayPause={onPlayPause}
          />
        </div>
      </div>
    );
  }

  const enableScheduleAnimationViewOverlay =
    props.scheduleAnimation ??
    featureOptions?.defaultViewOverlay?.enableScheduleAnimationViewOverlay;
  if (scheduleTimelineDataProvider && enableScheduleAnimationViewOverlay) {
    return (
      <div className="uifw-view-overlay">
        <div className="uifw-animation-overlay">
          <TimelineComponent
            startDate={scheduleTimelineDataProvider.start}
            endDate={scheduleTimelineDataProvider.end}
            initialDuration={scheduleTimelineDataProvider.initialDuration}
            totalDuration={scheduleTimelineDataProvider.duration}
            // eslint-disable-next-line @typescript-eslint/no-deprecated
            minimized={true}
            onChange={scheduleTimelineDataProvider.onAnimationFractionChanged}
            onPlayPause={onPlayPause}
          />
        </div>
      </div>
    );
  }

  return null;
}
