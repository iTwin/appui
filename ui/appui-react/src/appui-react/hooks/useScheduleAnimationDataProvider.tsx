/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Hooks
 */

import * as React from "react";
import { ScheduleAnimationTimelineDataProvider } from "../timeline/ScheduleAnimationProvider";
import type { ScreenViewport, Viewport } from "@itwin/core-frontend";

/** @internal */
function useSupportsScheduleScript(viewport: Viewport | undefined) {
  const [supportsScheduleScript, setSupportsScheduleScript] = React.useState(
    !!viewport?.view?.scheduleScript
  );

  React.useEffect(() => {
    setSupportsScheduleScript(!!viewport?.view?.scheduleScript);
  }, [viewport]);

  React.useEffect(() => {
    return viewport?.onChangeView.addListener((vp) => {
      const hasScheduleScript = !!vp?.view?.scheduleScript;
      if (hasScheduleScript !== supportsScheduleScript)
        setSupportsScheduleScript(hasScheduleScript);
    });
  }, [supportsScheduleScript, viewport]);

  React.useEffect(() => {
    return viewport?.onDisplayStyleChanged.addListener((vp) => {
      const hasScheduleScript = !!vp?.view?.scheduleScript;
      if (hasScheduleScript !== supportsScheduleScript)
        setSupportsScheduleScript(hasScheduleScript);
    });
  }, [viewport, supportsScheduleScript]);
  return supportsScheduleScript;
}

/** Hook that returns either a ScheduleAnimationTimelineDataProvider or undefined based on if the supplied viewport contains schedule script.
 * @public
 **/
export function useScheduleAnimationDataProvider(
  viewport: ScreenViewport | undefined
) {
  const supportsScheduleScript = useSupportsScheduleScript(viewport);
  const [
    scheduleAnimationTimelineDataProvider,
    setScheduleAnimationTimelineDataProvider,
  ] = React.useState<ScheduleAnimationTimelineDataProvider | undefined>();
  const isMountedRef = React.useRef(false);

  React.useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  React.useEffect(() => {
    async function fetchNewDataProvider(vp: ScreenViewport) {
      let newProvider: ScheduleAnimationTimelineDataProvider | undefined =
        new ScheduleAnimationTimelineDataProvider(vp.view, vp);
      if (newProvider?.supportsTimelineAnimation) {
        const dataLoaded = await newProvider.loadTimelineData();
        if (!dataLoaded) newProvider = undefined;
      }
      isMountedRef.current &&
        setScheduleAnimationTimelineDataProvider(newProvider);
    }
    if (supportsScheduleScript && viewport) void fetchNewDataProvider(viewport);
    else
      isMountedRef.current &&
        setScheduleAnimationTimelineDataProvider(undefined);
  }, [supportsScheduleScript, viewport]);

  return scheduleAnimationTimelineDataProvider;
}
