/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Timeline
 */

import type { ScreenViewport, ViewState } from "@itwin/core-frontend";
import type { PlaybackSettings } from "@itwin/imodel-components-react";
import { BaseTimelineDataProvider } from "@itwin/imodel-components-react";

/**  Analysis Timeline Data Provider - Allows a TimelineComponent to animate the AnalysisStyle information stored in a ViewState.
 * @public
 */
export class AnalysisAnimationTimelineDataProvider extends BaseTimelineDataProvider {
  private _viewState: ViewState;

  constructor(viewState: ViewState, viewport?: ScreenViewport) {
    super(viewport);
    this._viewState = viewState;

    if (viewState && viewState.analysisStyle) {
      this.supportsTimelineAnimation = true;
    }
  }

  public override async loadTimelineData(): Promise<boolean> {
    // if animationFraction is set pointer should match
    if (this._viewport)
      this.animationFraction = this._viewport.analysisFraction;

    if (this.supportsTimelineAnimation && this._viewState.analysisStyle) {
      // for now just initial settings
      this.updateSettings({
        duration: 10 * 1000,
        loop: true,
      });

      return true;
    }

    return false;
  }

  public override onAnimationFractionChanged = (animationFraction: number) => {
    this.animationFraction = animationFraction;
    if (this._viewport) this._viewport.analysisFraction = animationFraction;
  };

  public override onPlaybackSettingChanged = (settings: PlaybackSettings) => {
    this.updateSettings(settings);
  };
}
