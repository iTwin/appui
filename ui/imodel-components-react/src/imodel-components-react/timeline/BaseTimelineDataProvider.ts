/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Timeline
 */

import type { ScreenViewport } from "@itwin/core-frontend";
import type { PlaybackSettings, TimelineDataProvider } from "./interfaces.js";

/** Base Timeline Data Provider
 * @public
 */
export class BaseTimelineDataProvider implements TimelineDataProvider {
  public readonly id = "TestTimelineDataProvider";
  public start: Date | undefined;
  public end: Date | undefined;
  public viewId = "";

  public supportsTimelineAnimation = false; // set to true when provider determines animation data is available.
  public animationFraction: number = 0; // value from 0.0 to 1.0 that specifies the percentage complete for the animation.
  protected _viewport: ScreenViewport | undefined;

  constructor(viewport?: ScreenViewport) {
    this._viewport = viewport;
    if (viewport) this.viewId = viewport.view.id;
  }

  protected _settings: PlaybackSettings = {
    duration: 20 * 1000,
    loop: true,
  };

  public async loadTimelineData(): Promise<boolean> {
    return false;
  }

  /** Called to get the initial scrubber location */
  public get initialDuration(): number {
    return this.duration * this.animationFraction;
  }

  /** Called to get playback duration  */
  public get duration(): number {
    return this.getSettings().duration ? this.getSettings().duration! : 20000;
  }

  public set viewport(viewport: ScreenViewport | undefined) {
    this._viewport = viewport;
    if (viewport) this.viewId = viewport.view.id;
    else this.viewId = "";
  }

  public get viewport(): ScreenViewport | undefined {
    return this._viewport;
  }

  public get loop(): boolean {
    return undefined === this.getSettings().loop
      ? false
      : this.getSettings().loop!;
  }

  public getSettings(): PlaybackSettings {
    return this._settings;
  }

  public updateSettings(settings: PlaybackSettings) {
    this._settings = { ...this._settings, ...settings };
  }

  public onPlaybackSettingChanged = (_settings: PlaybackSettings) => {};

  public onAnimationFractionChanged = (_animationFraction: number) => {};
}
