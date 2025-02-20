/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { BaseTimelineDataProvider } from "../../imodel-components-react/timeline/BaseTimelineDataProvider.js";
import type { PlaybackSettings } from "../../imodel-components-react/timeline/interfaces.js";

class TestTimelineDataProvider extends BaseTimelineDataProvider {
  public pointerCallbackCalled = false;
  public settingsCallbackCalled = false;

  public override onAnimationFractionChanged = (animationFraction: number) => {
    this.pointerCallbackCalled = true;
    this.animationFraction = animationFraction;
  };

  public override onPlaybackSettingChanged = (settings: PlaybackSettings) => {
    this.settingsCallbackCalled = true;
    this.updateSettings(settings);
  };
}

describe("Timeline", () => {
  describe("Duration only timeline", () => {
    const duration = 20;
    const loop = true;
    const testAnimationFraction = 0.3;

    class Test1TimelineDataProvider extends TestTimelineDataProvider {
      public override async loadTimelineData(): Promise<boolean> {
        this.updateSettings({
          duration,
          loop,
        });

        return true;
      }
    }

    it("test duration only data from provider", async () => {
      const timelineProvider = new Test1TimelineDataProvider();
      await timelineProvider.loadTimelineData();

      const settings = timelineProvider.getSettings();
      expect(settings.duration).toEqual(duration);
      expect(settings.loop).toEqual(loop);
      expect(timelineProvider.pointerCallbackCalled).toEqual(false);
      timelineProvider.onAnimationFractionChanged(testAnimationFraction);
      expect(timelineProvider.pointerCallbackCalled).toEqual(true);
    });
  });

  describe("Start, End, and Duration only timeline", () => {
    const duration = 20;
    const loop = true;
    const startDate = new Date(2014, 6, 6);
    const endDate = new Date(2016, 8, 12);
    const testAnimationFraction = 0.3;

    class Test2TimelineDataProvider extends TestTimelineDataProvider {
      public override async loadTimelineData(): Promise<boolean> {
        this.updateSettings({
          duration,
          loop,
        });

        this.start = startDate;
        this.end = endDate;

        return true;
      }
    }

    it("test duration, start, and end dates", async () => {
      const timelineProvider = new Test2TimelineDataProvider();
      await timelineProvider.loadTimelineData();
      const settings = timelineProvider.getSettings();
      expect(settings.duration).toEqual(duration);
      expect(settings.loop).toEqual(loop);
      expect(timelineProvider.start).toEqual(startDate);
      expect(timelineProvider.end).toEqual(endDate);

      // simulate UI updating pointer to current playback time
      timelineProvider.onAnimationFractionChanged(testAnimationFraction);
      expect(timelineProvider.pointerCallbackCalled).toEqual(true);
      expect(timelineProvider.animationFraction).toEqual(testAnimationFraction);
    });
  });
});
