/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { NoRenderApp, type ScreenViewport } from "@itwin/core-frontend";
import { BaseSolarDataProvider } from "../../imodel-components-react/timeline/BaseSolarDataProvider.js";
import { TestUtils } from "../TestUtils.js";
import { SpeedTimeline } from "../../imodel-components-react/timeline/SpeedTimeline.js";
import { SolarTimeline } from "../../imodel-components-react/timeline/SolarTimeline.js";

class TestSolarDataProvider extends BaseSolarDataProvider {
  public playing = false;
  public timeChangeCallbackCalled = false;

  public override onTimeChanged = (_time: Date) => {
    this.timeChangeCallbackCalled = true;
  };

  constructor(
    viewport?: ScreenViewport,
    longitude?: number,
    latitude?: number
  ) {
    super(viewport, longitude, latitude);
  }
}

describe("<SpeedTimeline />", () => {
  beforeEach(async () => {
    await TestUtils.initializeUiIModelComponents();
  });

  afterEach(() => {
    TestUtils.terminateUiIModelComponents();
  });

  it("should render", async () => {
    let valueChanged = false;
    const onChange = (_value: number) => {
      valueChanged = true;
    };

    const renderedComponent = render(
      <SpeedTimeline speed={3} onChange={onChange} />
    );
    expect(renderedComponent).toBeTruthy();
    expect(valueChanged).toEqual(false);
    const sliderDiv = renderedComponent.getByRole("slider");
    expect(sliderDiv).toBeTruthy();
    const ariaValue = sliderDiv.getAttribute("aria-valuenow");
    expect(ariaValue).toEqual("3");
  });
});

describe("<SolarTimeline />", () => {
  beforeEach(async () => {
    await TestUtils.initializeUiIModelComponents();
    await NoRenderApp.startup();
  });

  afterEach(() => {
    TestUtils.terminateUiIModelComponents();
  });

  it("should  create provider for time zone GMT -0500 (May)", async () => {
    // const philadelphia = Cartographic.fromDegrees(-75.17035, 39.954927, 0.0);
    const philadelphiaDataProvider = new TestSolarDataProvider(
      undefined,
      -75.17035,
      39.954927
    );

    const philadelphiaDate = new Date("May 03 2019 12:00:00 GMT -0500");
    const sunRiseTime = new Date("May 03 2019 04:59 GMT -0500");
    const sunSetTime = new Date("May 03 2019 18:57 GMT -0500");
    philadelphiaDataProvider.setDateAndTime(philadelphiaDate, true);
    expect(
      philadelphiaDataProvider.timeOfDay.getTime() ===
        philadelphiaDate.getTime()
    );
    expect(
      philadelphiaDataProvider.sunrise.getTime() === sunRiseTime.getTime()
    );
    expect(philadelphiaDataProvider.sunset.getTime() === sunSetTime.getTime());
  });

  it("should  create provider for time zone GMT -0500 (Sept)", async () => {
    // const philadelphia = Cartographic.fromDegrees(-75.17035, 39.954927, 0.0);
    const philadelphiaDataProvider = new TestSolarDataProvider(
      undefined,
      -75.17035,
      39.954927
    );
    const philadelphiaDate = new Date("Sep 03 2019 12:00:00 GMT -0500");
    const sunRiseTime = new Date("Sep 03 2019 05:30 GMT -0500");
    const sunSetTime = new Date("Sep 03 2019 18:29 GMT -0500");
    philadelphiaDataProvider.setDateAndTime(philadelphiaDate, true);
    expect(
      philadelphiaDataProvider.timeOfDay.getTime() ===
        philadelphiaDate.getTime()
    );
    expect(
      philadelphiaDataProvider.sunrise.getTime() === sunRiseTime.getTime()
    );
    expect(philadelphiaDataProvider.sunset.getTime() === sunSetTime.getTime());
  });

  it("should  create provider for time zone GMT +1000", async () => {
    // const melbourne = Cartographic.fromDegrees(145.371093, -37.8575, 0.0);
    const melbourneDataProvider = new TestSolarDataProvider(
      undefined,
      145.371093,
      -37.8575
    );

    const melbourneDate = new Date("May 03 2019 12:00:00 GMT +1000");
    const sunRiseTime = new Date("May 03 2019 7:01 GMT +1000");
    const sunSetTime = new Date("May 03 2019 17:30 GMT +1000");
    melbourneDataProvider.setDateAndTime(melbourneDate, true);
    expect(
      melbourneDataProvider.timeOfDay.getTime() === melbourneDate.getTime()
    );
    expect(melbourneDataProvider.sunrise.getTime() === sunRiseTime.getTime());
    expect(melbourneDataProvider.sunset.getTime() === sunSetTime.getTime());
  });

  it("should  create provider for time zone GMT -0000", async () => {
    // const algeria = Cartographic.fromDegrees(2.54882812, 27.761329, 0.0);
    const algeriaDataProvider = new TestSolarDataProvider(
      undefined,
      2.54882812,
      27.761329
    );

    const algeriaDate = new Date("May 03 2019 12:00:00 GMT -0000");
    algeriaDataProvider.setDateAndTime(algeriaDate, true);
    expect(algeriaDataProvider.timeOfDay.getTime() === algeriaDate.getTime());
  });

  it.skip("FLAKY:should render", async () => {
    vi.useFakeTimers({
      shouldAdvanceTime: true,
    });
    const dataProvider = new TestSolarDataProvider();

    const renderedComponent = render(
      <SolarTimeline dataProvider={dataProvider} />
    );

    const playButton = renderedComponent.getByRole("button", {
      name: "timeline.play",
    });
    expect(dataProvider.timeChangeCallbackCalled).toEqual(false);

    fireEvent.click(playButton);

    // kill some time to wait for setState and subsequent call to window.requestAnimationFrame to process
    vi.advanceTimersByTime(500);

    // the following sets up a MutationObserver which triggers when the DOM is updated
    await waitFor(() =>
      renderedComponent.getByRole("button", {
        name: "timeline.pause",
      })
    );
    expect(dataProvider.timeChangeCallbackCalled).toEqual(true);

    // hit play/pause button to pause animation
    fireEvent.click(playButton);
    // the following sets up a MutationObserver which triggers when the DOM is updated
    await waitFor(() =>
      renderedComponent.getByRole("button", {
        name: "timeline.play",
      })
    );
  });
});
