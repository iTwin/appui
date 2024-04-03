/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import React from "react";
import { act, fireEvent, render } from "@testing-library/react";
import { UiAdmin } from "@itwin/appui-abstract";
import { BaseTimelineDataProvider } from "../../imodel-components-react/timeline/BaseTimelineDataProvider";
import type {
  PlaybackSettings,
  TimelinePausePlayArgs,
} from "../../imodel-components-react/timeline/interfaces";
import { TimelinePausePlayAction } from "../../imodel-components-react/timeline/interfaces";
import type { TimelineMenuItemProps } from "../../imodel-components-react/timeline/TimelineComponent";
import { TimelineComponent } from "../../imodel-components-react/timeline/TimelineComponent";
import { TestUtils } from "../TestUtils";
import { IModelApp, NoRenderApp } from "@itwin/core-frontend";
import userEvent from "@testing-library/user-event";

class TestTimelineDataProvider extends BaseTimelineDataProvider {
  public playing = false;
  public pointerCallbackCalled = false;
  public settingsCallbackCalled = false;
  public forwardCallbackCalled = false;
  public backwardCallbackCalled = false;

  public override onAnimationFractionChanged = (animationFraction: number) => {
    this.pointerCallbackCalled = true;
    this.animationFraction = animationFraction;
  };

  public onJump = (forward: boolean) => {
    this.forwardCallbackCalled = forward;
    this.backwardCallbackCalled = !forward;
  };

  public override onPlaybackSettingChanged = (settings: PlaybackSettings) => {
    this.settingsCallbackCalled = true;
    this.updateSettings(settings);
  };

  public onPlayPause = (playing: boolean) => {
    this.playing = playing;
  };

  constructor() {
    super();

    this.animationFraction = 0.3;
    const duration = 20 * 1000;
    const loop = false;
    const startDate = new Date(2014, 6, 6);
    const endDate = new Date(2016, 8, 12);

    this.updateSettings({
      duration,
      loop,
    });

    this.start = startDate;
    this.end = endDate;
  }
}

function TestRepeatTimelineComponent() {
  const duration = 20 * 1000;
  const startDate = new Date(2014, 6, 6);
  const endDate = new Date(2016, 8, 12);
  const [loop, setLoop] = React.useState<boolean>(false);

  const handleOnSettingsChange = (settings: PlaybackSettings) => {
    if (settings.loop !== undefined) {
      setLoop(settings.loop);
    }
  };

  return (
    <div>
      <TimelineComponent
        startDate={startDate}
        endDate={endDate}
        initialDuration={0}
        totalDuration={duration}
        minimized={true}
        showDuration={true}
        alwaysMinimized={true}
        repeat={loop}
        onSettingsChange={handleOnSettingsChange}
        componentId={"testApp-testRepeatTimeline"} // qualify id with "<appName>-" to ensure uniqueness
      />
    </div>
  );
}

describe("<TimelineComponent showDuration={true} />", () => {
  let theUserTo: ReturnType<typeof userEvent.setup>;
  const sliderContainerSize = DOMRect.fromRect({
    x: 10,
    width: 1000,
    height: 60,
  });

  beforeEach(async () => {
    theUserTo = userEvent.setup();
    vi.spyOn(Element.prototype, "getBoundingClientRect").mockReturnValue(
      sliderContainerSize
    );

    await TestUtils.initializeUiIModelComponents();
    await NoRenderApp.startup();
  });

  afterEach(async () => {
    await IModelApp.shutdown();
    TestUtils.terminateUiIModelComponents();
  });

  it("should render without milestones - minimized", async () => {
    const dataProvider = new TestTimelineDataProvider();
    expect(dataProvider.loop).toEqual(false);
    vi.useFakeTimers();

    const renderedComponent = render(
      <TimelineComponent
        startDate={dataProvider.start}
        endDate={dataProvider.end}
        initialDuration={dataProvider.initialDuration}
        totalDuration={dataProvider.duration}
        minimized={true}
        showDuration={true}
        onChange={dataProvider.onAnimationFractionChanged}
        onSettingsChange={dataProvider.onPlaybackSettingChanged}
        onPlayPause={dataProvider.onPlayPause}
      />
    );

    const playButton = renderedComponent.getByRole("button", {
      name: "timeline.play",
    });
    expect(dataProvider.playing).toEqual(false);
    expect(dataProvider.pointerCallbackCalled).toEqual(false);

    fireEvent.click(playButton);
    // Wait for animation.
    vi.advanceTimersByTime(600);
    // Wait for 1st raf cb.
    vi.advanceTimersByTime(1);

    // kill some time to wait for setState and subsequent call to window.requestAnimationFrame to process
    // await new Promise((r) => { setTimeout(r, 40); });
    expect(dataProvider.playing).toEqual(true);

    fireEvent.click(playButton);
    // Wait for animation.
    vi.advanceTimersByTime(600);
    // Wait for 1st raf cb.
    vi.advanceTimersByTime(1);

    // kill some time to wait for setState and subsequent call to window.requestAnimationFrame to process
    // await new Promise((r) => { setTimeout(r, 40); });
    expect(dataProvider.playing).toEqual(false);
    expect(dataProvider.pointerCallbackCalled).toEqual(true);
  });

  it("should show tooltip on pointer move", async () => {
    const spyOnChange = vi.fn();
    const dataProvider = new TestTimelineDataProvider();
    expect(dataProvider.loop).toEqual(false);
    vi.useFakeTimers({ shouldAdvanceTime: true });

    const renderedComponent = render(
      <TimelineComponent
        startDate={dataProvider.start}
        endDate={dataProvider.end}
        initialDuration={10 * 1000}
        totalDuration={40 * 1000}
        minimized={true}
        showDuration={true}
        onChange={spyOnChange}
        onSettingsChange={dataProvider.onPlaybackSettingChanged}
        onPlayPause={dataProvider.onPlayPause}
      />
    );

    const thumb = renderedComponent.getByRole("slider");
    fireEvent.focus(thumb, {});
    expect(renderedComponent.container.querySelector(".tooltip-text")).to.exist;
    fireEvent.blur(thumb, {});
    expect(renderedComponent.container.querySelector(".tooltip-text")).not.to
      .exist;

    await theUserTo.pointer([
      {
        target: thumb,
        coords: { x: 210, clientX: 210, y: 0, clientY: 0 },
        keys: "[MouseLeft>]",
      },
      { coords: { x: 410, clientX: 410, y: 0, clientY: 0 } },
      { keys: "[/MouseLeft]" },
    ]);
  });

  it("timeline with short duration", async () => {
    const dataProvider = new TestTimelineDataProvider();
    dataProvider.getSettings().duration = 2; // make sure this is shorter than 40 so we get to end of animation

    vi.useFakeTimers();

    const renderedComponent = render(
      <TimelineComponent
        startDate={dataProvider.start}
        endDate={dataProvider.end}
        initialDuration={dataProvider.initialDuration}
        totalDuration={dataProvider.duration}
        minimized={true}
        showDuration={true}
        onChange={dataProvider.onAnimationFractionChanged}
        onJump={dataProvider.onJump}
        onPlayPause={dataProvider.onPlayPause}
      />
    );

    const playButton = renderedComponent.getByRole("button", {
      name: "timeline.play",
    });
    expect(dataProvider.playing).toEqual(false);
    expect(dataProvider.pointerCallbackCalled).toEqual(false);

    fireEvent.click(playButton);
    expect(dataProvider.playing).toEqual(true);

    // Wait for animation.
    vi.advanceTimersByTime(1);
    vi.setSystemTime(600);
    vi.advanceTimersByTime(1);

    await vi.waitFor(() => {
      expect(dataProvider.playing).toEqual(false);
    });
  });

  it("timeline with short duration (repeat animation loop) - expanded", async () => {
    const dataProvider = new TestTimelineDataProvider();
    dataProvider.getSettings().duration = 30; // make sure this is shorter than 40 so we get to end of animation
    dataProvider.getSettings().loop = true;
    vi.useFakeTimers();

    const renderedComponent = render(
      <TimelineComponent
        startDate={dataProvider.start}
        endDate={dataProvider.end}
        initialDuration={dataProvider.initialDuration}
        totalDuration={dataProvider.duration}
        minimized={true}
        showDuration={true}
        onChange={dataProvider.onAnimationFractionChanged}
        onJump={dataProvider.onJump}
        repeat={dataProvider.getSettings().loop}
        onPlayPause={dataProvider.onPlayPause}
      />
    );

    const playButton = renderedComponent.getByRole("button", {
      name: "timeline.play",
    });
    expect(dataProvider.playing).toEqual(false);
    expect(dataProvider.pointerCallbackCalled).toEqual(false);

    fireEvent.click(playButton);
    expect(dataProvider.playing).toEqual(true);

    // Wait for animation.
    vi.advanceTimersByTime(600);
    // Wait for 1st raf cb.
    vi.advanceTimersByTime(1);

    // kill some time to wait for setState and subsequent call to window.requestAnimationFrame to process
    // await new Promise((r) => { setTimeout(r, 40); });
    expect(dataProvider.playing).toEqual(true);

    fireEvent.click(playButton);
    expect(dataProvider.playing).toEqual(false);
  });

  it("timeline with short duration (repeat set and at end of animation loop) - expanded", async () => {
    const dataProvider = new TestTimelineDataProvider();
    dataProvider.getSettings().duration = 30; // make sure this is shorter than 40 so we get to end of animation
    dataProvider.getSettings().loop = true;
    dataProvider.animationFraction = 1.0;
    vi.useFakeTimers();

    const renderedComponent = render(
      <TimelineComponent
        startDate={dataProvider.start}
        endDate={dataProvider.end}
        initialDuration={dataProvider.initialDuration}
        totalDuration={dataProvider.duration}
        minimized={true}
        showDuration={true}
        onChange={dataProvider.onAnimationFractionChanged}
        onJump={dataProvider.onJump}
        repeat={dataProvider.getSettings().loop}
        onPlayPause={dataProvider.onPlayPause}
      />
    );

    const playButton = renderedComponent.getByRole("button", {
      name: "timeline.play",
    });
    expect(dataProvider.playing).toEqual(false);
    expect(dataProvider.pointerCallbackCalled).toEqual(false);

    fireEvent.click(playButton);
    expect(dataProvider.playing).toEqual(true);

    // Wait for animation.
    vi.advanceTimersByTime(600);
    // Wait for 1st raf cb.
    vi.advanceTimersByTime(1);

    // kill some time to wait for setState and subsequent call to window.requestAnimationFrame to process
    // await new Promise((r) => { setTimeout(r, 40); });
    expect(dataProvider.playing).toEqual(true);

    fireEvent.click(playButton);
    expect(dataProvider.playing).toEqual(false);
  });

  it("timeline with no dates (Analysis animation", async () => {
    const dataProvider = new TestTimelineDataProvider();
    dataProvider.getSettings().duration = 30; // make sure this is shorter than the timeout of 40 so we get to end of animation
    vi.useFakeTimers();

    const renderedComponent = render(
      <TimelineComponent
        initialDuration={dataProvider.initialDuration}
        totalDuration={dataProvider.duration}
        minimized={true}
        showDuration={true}
        onChange={dataProvider.onAnimationFractionChanged}
        onJump={dataProvider.onJump}
        onPlayPause={dataProvider.onPlayPause}
      />
    );

    const playButton = renderedComponent.getByRole("button", {
      name: "timeline.play",
    });
    expect(dataProvider.playing).toEqual(false);
    expect(dataProvider.pointerCallbackCalled).toEqual(false);

    fireEvent.click(playButton);
    expect(dataProvider.playing).toEqual(true);

    vi.advanceTimersByTime(1);
    // Wait for animation.
    vi.setSystemTime(600);
    // Wait for 1st raf cb.
    vi.advanceTimersByTime(1);

    await vi.waitFor(() => {
      expect(dataProvider.playing).toEqual(false);
    });
  });

  it("open/close timeline settings - minimized", async () => {
    const dataProvider = new TestTimelineDataProvider();

    const renderedComponent = render(
      <TimelineComponent
        startDate={dataProvider.start}
        endDate={dataProvider.end}
        initialDuration={dataProvider.initialDuration}
        totalDuration={dataProvider.duration}
        minimized={true}
        showDuration={true}
        onChange={dataProvider.onAnimationFractionChanged}
        onSettingsChange={dataProvider.onPlaybackSettingChanged}
        onPlayPause={dataProvider.onPlayPause}
      />
    );

    expect(renderedComponent).not.to.be.undefined;

    // hit the setting button
    const settingMenuSpan = renderedComponent.getByTestId("timeline-settings");
    fireEvent.click(settingMenuSpan);
    const repeatItem = renderedComponent.getByText("timeline.repeat");
    expect(repeatItem).not.to.be.null;
    fireEvent.click(repeatItem);

    expect(dataProvider.settingsCallbackCalled).toEqual(true);

    const durationInputField = renderedComponent.queryByTestId(
      "timeline-duration-edit-input"
    );
    expect(durationInputField).not.to.be.null;
    fireEvent.change(durationInputField!, { target: { value: "00:44" } });
    // callback is not triggered until Enter key is pressed.
    fireEvent.keyDown(durationInputField!, { key: "Enter" });

    expect(dataProvider.duration).toEqual(44000);

    fireEvent.change(durationInputField!, { target: { value: "00:66" } });
    // callback is not triggered until Enter key is pressed.
    fireEvent.keyDown(durationInputField!, { key: "Escape" });

    expect(dataProvider.duration).toEqual(44000);

    act(() => durationInputField!.focus());
    fireEvent.change(durationInputField!, { target: { value: "00:66" } });
    act(() => settingMenuSpan.focus());
    // expect(dataProvider.duration).toEqual(66000);
  });
  it("open/close timeline settings - always minimized", async () => {
    const dataProvider = new TestTimelineDataProvider();

    const renderedComponent = render(
      <TimelineComponent
        startDate={dataProvider.start}
        endDate={dataProvider.end}
        initialDuration={dataProvider.initialDuration}
        totalDuration={dataProvider.duration}
        minimized={true}
        showDuration={true}
        onChange={dataProvider.onAnimationFractionChanged}
        onSettingsChange={dataProvider.onPlaybackSettingChanged}
        onPlayPause={dataProvider.onPlayPause}
        alwaysMinimized={false}
      />
    );

    expect(renderedComponent).not.to.be.undefined;

    const settingMenuSpan = renderedComponent.getByTestId("timeline-settings");
    fireEvent.click(settingMenuSpan);

    renderedComponent.rerender(
      <TimelineComponent
        startDate={dataProvider.start}
        endDate={dataProvider.end}
        initialDuration={dataProvider.initialDuration}
        totalDuration={dataProvider.duration}
        minimized={true}
        showDuration={false}
        onChange={dataProvider.onAnimationFractionChanged}
        onSettingsChange={dataProvider.onPlaybackSettingChanged}
        onPlayPause={dataProvider.onPlayPause}
        alwaysMinimized={true}
      />
    );
  });
  it("Dynamically set duration", async () => {
    const dataProvider = new TestTimelineDataProvider();

    const renderedComponent = render(
      <TimelineComponent
        startDate={dataProvider.start}
        endDate={dataProvider.end}
        initialDuration={dataProvider.initialDuration}
        totalDuration={dataProvider.duration}
        minimized={true}
        showDuration={true}
        onChange={dataProvider.onAnimationFractionChanged}
        onSettingsChange={dataProvider.onPlaybackSettingChanged}
        onPlayPause={dataProvider.onPlayPause}
        alwaysMinimized={false}
      />
    );

    expect(renderedComponent).not.to.be.undefined;

    // trigger call to componentDidUpdate
    renderedComponent.rerender(
      <TimelineComponent
        startDate={dataProvider.start}
        endDate={dataProvider.end}
        initialDuration={50000}
        totalDuration={dataProvider.duration}
        minimized={true}
        showDuration={true}
        onChange={dataProvider.onAnimationFractionChanged}
        onSettingsChange={dataProvider.onPlaybackSettingChanged}
        onPlayPause={dataProvider.onPlayPause}
        alwaysMinimized={false}
      />
    );
  });
  it("Timeline can be controlled through play/pause props", async () => {
    const dataProvider = new TestTimelineDataProvider();
    const spyOnPlayPause = vi.fn();
    const initialProps = {
      initialDuration: dataProvider.initialDuration,
      totalDuration: dataProvider.duration,
      minimized: true,
      showDuration: true,
      onChange: dataProvider.onAnimationFractionChanged,
      onJump: dataProvider.onJump,
      onPlayPause: spyOnPlayPause,
      isPlaying: false,
      componentId: "TestTimeline",
    };

    const { rerender, getByRole } = render(
      <TimelineComponent {...initialProps} />
    );
    rerender(<TimelineComponent {...initialProps} isPlaying={true} />);
    expect(spyOnPlayPause).toHaveBeenCalledOnce();
    getByRole("button", { name: "timeline.pause" });

    rerender(<TimelineComponent {...initialProps} isPlaying={false} />);
    expect(spyOnPlayPause).toHaveBeenCalledTimes(2);
    getByRole("button", { name: "timeline.play" });

    rerender(<TimelineComponent {...initialProps} isPlaying={true} />);
    expect(spyOnPlayPause).toHaveBeenCalledTimes(3);
    getByRole("button", { name: "timeline.pause" });

    // do nothing (already playing)
    rerender(<TimelineComponent {...initialProps} isPlaying={true} />);
    expect(spyOnPlayPause).toHaveBeenCalledTimes(3);
    getByRole("button", { name: "timeline.pause" });
  });

  it("deprecated UiAdmin.sendUiEvent ", async () => {
    const dataProvider = new TestTimelineDataProvider();
    const spyOnPlayPause = vi.fn();
    const { getByRole } = render(
      <TimelineComponent
        initialDuration={dataProvider.initialDuration}
        totalDuration={dataProvider.duration}
        minimized={true}
        showDuration={true}
        onChange={dataProvider.onAnimationFractionChanged}
        onJump={dataProvider.onJump}
        onPlayPause={spyOnPlayPause}
        componentId={"TestTimeline"}
      />
    );

    const args: TimelinePausePlayArgs = {
      uiComponentId: "TestTimeline",
      timelineAction: TimelinePausePlayAction.Play,
    };
    UiAdmin.sendUiEvent(args);

    getByRole("button", { name: "timeline.pause" });

    args.timelineAction = TimelinePausePlayAction.Pause;
    UiAdmin.sendUiEvent(args);
    args.timelineAction = TimelinePausePlayAction.Toggle;
    UiAdmin.sendUiEvent(args);
    expect(spyOnPlayPause).toHaveBeenCalledTimes(3);
    UiAdmin.sendUiEvent({ uiComponentId: "TestTimeline" });
    // onPlayPause should not be called again, since the args don't include an action
    expect(spyOnPlayPause).toHaveBeenCalledTimes(3);
  });

  it("re-render on repeat change", () => {
    const dataProvider = new TestTimelineDataProvider();
    const renderedComponent = render(
      <TimelineComponent
        startDate={dataProvider.start}
        endDate={dataProvider.end}
        initialDuration={dataProvider.initialDuration}
        totalDuration={dataProvider.duration}
        minimized={false}
        showDuration={true}
        repeat={false}
        onChange={dataProvider.onAnimationFractionChanged}
        onSettingsChange={dataProvider.onPlaybackSettingChanged}
        onPlayPause={dataProvider.onPlayPause}
        alwaysMinimized={false}
      />
    );

    expect(renderedComponent).not.to.be.undefined;
    expect(dataProvider.getSettings().loop).toEqual(false);

    // trigger call to componentDidUpdate
    renderedComponent.rerender(
      <TimelineComponent
        startDate={dataProvider.start}
        endDate={dataProvider.end}
        initialDuration={50000}
        totalDuration={dataProvider.duration}
        minimized={false}
        showDuration={true}
        repeat={true}
        onChange={dataProvider.onAnimationFractionChanged}
        onSettingsChange={dataProvider.onPlaybackSettingChanged}
        onPlayPause={dataProvider.onPlayPause}
        alwaysMinimized={false}
      />
    );
    expect(dataProvider.getSettings().loop).toEqual(true);
  });
  it("test repeat button does not loop endlessly with external state variable", () => {
    const renderedComponent = render(<TestRepeatTimelineComponent />);

    expect(renderedComponent).not.to.be.undefined;

    const settingMenuSpan = renderedComponent.getByTestId("timeline-settings");
    fireEvent.click(settingMenuSpan);

    const repeatItem = renderedComponent.getByText("timeline.repeat");
    expect(repeatItem).not.to.be.null;
    fireEvent.click(repeatItem);
  });
  it("re-render on totalDuration change", () => {
    const dataProvider = new TestTimelineDataProvider();
    const renderedComponent = render(
      <TimelineComponent
        startDate={dataProvider.start}
        endDate={dataProvider.end}
        initialDuration={dataProvider.initialDuration}
        totalDuration={dataProvider.duration}
        minimized={false}
        showDuration={true}
        repeat={false}
        onChange={dataProvider.onAnimationFractionChanged}
        onSettingsChange={dataProvider.onPlaybackSettingChanged}
        onPlayPause={dataProvider.onPlayPause}
        alwaysMinimized={false}
      />
    );

    expect(renderedComponent).not.to.be.undefined;

    const newDuration = dataProvider.getSettings().duration! * 2;

    // trigger call to componentDidUpdate
    renderedComponent.rerender(
      <TimelineComponent
        startDate={dataProvider.start}
        endDate={dataProvider.end}
        initialDuration={50000}
        totalDuration={newDuration}
        minimized={true}
        showDuration={true}
        repeat={true}
        onChange={dataProvider.onAnimationFractionChanged}
        onSettingsChange={dataProvider.onPlaybackSettingChanged}
        onPlayPause={dataProvider.onPlayPause}
        alwaysMinimized={false}
      />
    );
    expect(dataProvider.getSettings().duration).to.be.eq(newDuration);
  });
  it("re-render on new start and end date", () => {
    const dataProvider = new TestTimelineDataProvider();
    const renderedComponent = render(
      <TimelineComponent
        startDate={dataProvider.start}
        endDate={dataProvider.end}
        initialDuration={dataProvider.initialDuration}
        totalDuration={dataProvider.duration}
        minimized={true}
        showDuration={true}
        onChange={dataProvider.onAnimationFractionChanged}
        onSettingsChange={dataProvider.onPlaybackSettingChanged}
        onPlayPause={dataProvider.onPlayPause}
        alwaysMinimized={false}
      />
    );

    expect(renderedComponent).not.to.be.undefined;
    const newStartDate = new Date(2019, 4, 1);
    const newEndDate = new Date(2020, 5, 7);

    // trigger call to componentDidUpdate
    renderedComponent.rerender(
      <TimelineComponent
        startDate={newStartDate}
        endDate={newEndDate}
        initialDuration={50000}
        totalDuration={dataProvider.duration}
        minimized={true}
        showDuration={true}
        onChange={dataProvider.onAnimationFractionChanged}
        onSettingsChange={dataProvider.onPlaybackSettingChanged}
        onPlayPause={dataProvider.onPlayPause}
        alwaysMinimized={false}
      />
    );
    const startDateItem = renderedComponent.getByTestId("test-start-date");
    expect(startDateItem).not.to.be.null;
    expect(startDateItem?.innerHTML).to.be.eq(
      newStartDate.toLocaleDateString()
    );

    const endDateItem = renderedComponent.getByTestId("test-end-date");
    expect(endDateItem).not.to.be.null;
    expect(endDateItem?.innerHTML).to.be.eq(newEndDate.toLocaleDateString());
  });
  it("should append items", () => {
    const duration = 8 * 1000;
    const startDate = new Date(2014, 6, 6);
    const endDate = new Date(2016, 8, 12);
    const appendMenuItems: TimelineMenuItemProps[] = [
      { label: "8 seconds", timelineDuration: 8 * 1000 },
      { label: "5 Seconds", timelineDuration: 5 * 1000 },
      { label: "3 Seconds", timelineDuration: 3 * 1000 },
    ];
    const renderedComponent = render(
      <div>
        <TimelineComponent
          startDate={startDate}
          endDate={endDate}
          initialDuration={0}
          totalDuration={duration}
          minimized={true}
          showDuration={true}
          alwaysMinimized={true}
          appMenuItemOption={"append"}
          appMenuItems={appendMenuItems}
          componentId={"sampleApp-appendSampleTimeline"} // qualify id with "<appName>-" to ensure uniqueness
        />
      </div>
    );
    expect(renderedComponent).not.to.be.undefined;

    const settingMenuSpan = renderedComponent.getByTestId("timeline-settings");
    fireEvent.click(settingMenuSpan);

    const addedItem = renderedComponent.getByText("8 seconds");
    expect(addedItem).not.to.be.null;

    const standardItem = renderedComponent.getByText("timeline.slow");
    expect(standardItem).not.to.be.null;
  });
  it("should prefix items", () => {
    const duration = 500;
    const startDate = new Date(2014, 6, 6);
    const endDate = new Date(2016, 8, 12);
    const prefixMenuItems: TimelineMenuItemProps[] = [
      { label: "1/2 Second", timelineDuration: 500 },
      { label: "1 Seconds", timelineDuration: 1000 },
      { label: "2 Seconds", timelineDuration: 2 * 1000 },
    ];
    const renderedComponent = render(
      <div>
        <TimelineComponent
          startDate={startDate}
          endDate={endDate}
          initialDuration={0}
          totalDuration={duration}
          minimized={true}
          showDuration={true}
          alwaysMinimized={true}
          appMenuItemOption={"prefix"}
          appMenuItems={prefixMenuItems}
          componentId={"sampleApp-prefixSampleTimeline"} // qualify id with "<appName>-" to ensure uniqueness
        />
      </div>
    );
    expect(renderedComponent).not.to.be.undefined;

    const settingMenuSpan = renderedComponent.getByTestId("timeline-settings");
    fireEvent.click(settingMenuSpan);

    const addedItem = renderedComponent.getByText("2 Seconds");
    expect(addedItem).not.to.be.null;
    fireEvent.click(addedItem);

    // open menu again
    fireEvent.click(settingMenuSpan);
    const standardItem = renderedComponent.getByText("timeline.slow");
    expect(standardItem).not.to.be.null;
  });
  it("should replace items", () => {
    const duration = 40 * 1000;
    const startDate = new Date(2018, 6, 6);
    const endDate = new Date(2021, 8, 12);
    const replaceMenuItems: TimelineMenuItemProps[] = [
      { label: "40 Seconds", timelineDuration: 40 * 1000 },
      { label: "1 Minute", timelineDuration: 60 * 1000 },
      { label: "90 Seconds", timelineDuration: 90 * 1000 },
    ];
    const renderedComponent = render(
      <div className="component-examples">
        <TimelineComponent
          startDate={startDate}
          endDate={endDate}
          initialDuration={0}
          totalDuration={duration}
          minimized={true}
          showDuration={true}
          alwaysMinimized={true}
          appMenuItemOption={"replace"}
          appMenuItems={replaceMenuItems}
          componentId={"sampleApp-replaceSampleTimeline"} // qualify id with "<appName>-" to ensure uniqueness
        />
      </div>
    );
    expect(renderedComponent).not.to.be.undefined;

    const settingMenuSpan = renderedComponent.getByTestId("timeline-settings");
    fireEvent.click(settingMenuSpan);

    const addedItem = renderedComponent.queryByText("40 Seconds");
    expect(addedItem).not.to.be.null;

    expect(renderedComponent.queryByText("timeline.slow")).to.be.null;
  });
  it("should remove repeat option", () => {
    const duration = 40 * 1000;
    const startDate = new Date(2018, 6, 6);
    const endDate = new Date(2021, 8, 12);
    const renderedComponent = render(
      <div className="component-examples">
        <TimelineComponent
          startDate={startDate}
          endDate={endDate}
          initialDuration={0}
          totalDuration={duration}
          minimized={true}
          showDuration={true}
          alwaysMinimized={true}
          includeRepeat={false}
          componentId={"sampleApp-noRepeatSampleTimeline"} // qualify id with "<appName>-" to ensure uniqueness
        />
      </div>
    );
    expect(renderedComponent).not.to.be.undefined;

    const settingMenuSpan = renderedComponent.getByTestId("timeline-settings");
    fireEvent.click(settingMenuSpan);

    expect(renderedComponent.queryByText("timeline.repeat")).to.be.null;

    const mouseUp = new MouseEvent("mouseup");
    vi.spyOn(mouseUp, "target", "get").mockImplementation(() =>
      document.createElement("div")
    );
    window.dispatchEvent(mouseUp);
  });
  it("should respect time zone offset", () => {
    const duration = 10 * 1000;
    const startDate = new Date("July 1, 2016, 00:00:00 GMT -0000");
    const endDate = new Date("July 1, 2016, 20:30:45 GMT -0000");

    const renderedComponent = render(
      <TimelineComponent
        startDate={startDate}
        endDate={endDate}
        minimized={true}
        showDuration={false}
        totalDuration={duration}
        timeZoneOffset={-300}
        dateFormatOptions={{
          locales: "en-US",
          options: { year: "numeric", month: "short", day: "numeric" },
        }}
        timeFormatOptions={{
          locales: "en-US",
          options: {
            hour: "2-digit",
            minute: "numeric",
            second: "numeric",
            hour12: true,
          },
        }}
        componentId={"sampleApp-timeZoneOffset"}
      />
    );
    expect(renderedComponent).not.to.be.undefined;

    const startDateLabel = renderedComponent.getByTestId("test-start-date");
    expect(startDateLabel).not.to.be.null;
    expect(startDateLabel.innerHTML).to.equal("Jun 30, 2016");

    const startTimeLabel = renderedComponent.getByTestId("test-start-time");
    expect(startTimeLabel).not.to.be.null;
    expect(startTimeLabel.innerHTML.replace("\u202f", " ")).to.equal(
      "07:00:00 PM"
    );
  });

  it("should mark today's date on the timeline", () => {
    const duration = 10 * 1000;
    const todayDate = new Date();
    const startDate = new Date(todayDate.getTime() - 6 * 28 * 24 * 60 * 60);
    const endDate = new Date(todayDate.getTime() + 6 * 28 * 24 * 60 * 60);
    const marker = {};

    const renderedComponent = render(
      <TimelineComponent
        startDate={startDate}
        endDate={endDate}
        minimized={true}
        showDuration={false}
        totalDuration={duration}
        componentId={"sampleApp-MarkToday"}
        markDate={marker}
      />
    );
    expect(renderedComponent).not.to.be.undefined;
    const dateMarker = renderedComponent.getByTestId("test-date-marker");
    expect(dateMarker).not.to.be.null;
  });
  it("should mark a date on the timeline with a custom symbol", () => {
    const duration = 10 * 1000;
    const startDate = new Date("July 1, 2016, 00:00:00 GMT -0000");
    const endDate = new Date("July 1, 2017, 20:30:45 GMT -0000");
    const myDateMarker = (
      <span data-testid="test-custom-date-marker">{"T"}</span>
    );
    const marker = {
      date: new Date("December 15, 2016"),
      dateMarker: myDateMarker,
    };

    const renderedComponent = render(
      <TimelineComponent
        startDate={startDate}
        endDate={endDate}
        showDuration={false}
        totalDuration={duration}
        componentId={"sampleApp-MarkTodayCustom"}
        markDate={marker}
      />
    );
    expect(renderedComponent).not.to.be.undefined;
    const dateMarker = renderedComponent.getByTestId("test-custom-date-marker");
    expect(dateMarker).not.to.be.null;
  });
});
