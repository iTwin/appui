/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Hooks
 */

import * as React from "react";
import { AnalysisAnimationTimelineDataProvider } from "../timeline/AnalysisAnimationProvider";
import type { ScreenViewport, Viewport } from "@itwin/core-frontend";

/** @internal */
function useSupportsAnalysisAnimation(viewport: Viewport | undefined) {
  const [supportsAnalysisAnimation, setSupportsAnalysisAnimation] =
    React.useState(!!viewport?.view?.analysisStyle);

  React.useEffect(() => {
    setSupportsAnalysisAnimation(!!viewport?.view?.analysisStyle);
  }, [viewport]);

  React.useEffect(() => {
    return viewport?.onChangeView.addListener((vp) => {
      const hasAnalysisData = !!vp?.view?.analysisStyle;
      if (hasAnalysisData !== supportsAnalysisAnimation)
        setSupportsAnalysisAnimation(hasAnalysisData);
    });
  }, [supportsAnalysisAnimation, viewport]);

  React.useEffect(() => {
    return viewport?.onDisplayStyleChanged.addListener((vp) => {
      const hasAnalysisData = !!vp?.view?.analysisStyle;
      if (hasAnalysisData !== supportsAnalysisAnimation)
        setSupportsAnalysisAnimation(hasAnalysisData);
    });
  }, [viewport, supportsAnalysisAnimation]);
  return supportsAnalysisAnimation;
}

/** Hook that returns either a AnalysisAnimationTimelineDataProvider or undefined based on if the supplied viewport contains analysis data.
 * @public
 **/
export function useAnalysisAnimationDataProvider(
  viewport: ScreenViewport | undefined
) {
  const supportsAnalysisAnimation = useSupportsAnalysisAnimation(viewport);
  const [
    analysisAnimationTimelineDataProvider,
    setAnalysisAnimationTimelineDataProvider,
  ] = React.useState<AnalysisAnimationTimelineDataProvider | undefined>();
  const isMountedRef = React.useRef(false);

  React.useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  React.useEffect(() => {
    async function fetchNewDataProvider(vp: ScreenViewport) {
      let newProvider: AnalysisAnimationTimelineDataProvider | undefined =
        new AnalysisAnimationTimelineDataProvider(vp.view, vp);
      if (newProvider?.supportsTimelineAnimation) {
        const dataLoaded = await newProvider.loadTimelineData();
        if (!dataLoaded) newProvider = undefined;
      }
      isMountedRef.current &&
        setAnalysisAnimationTimelineDataProvider(newProvider);
    }
    if (supportsAnalysisAnimation && viewport)
      void fetchNewDataProvider(viewport);
    else
      isMountedRef.current &&
        setAnalysisAnimationTimelineDataProvider(undefined);
  }, [supportsAnalysisAnimation, viewport]);

  return analysisAnimationTimelineDataProvider;
}
