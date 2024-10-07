/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Timer } from "../../core-react/utils/Timer.js";

describe("Timer", () => {
  it("should create timer with specified delay", () => {
    const sut = new Timer(100);
    expect(sut.delay).toEqual(100);
  });

  it("should not be running when created", () => {
    const sut = new Timer(100);
    expect(sut.isRunning).toEqual(false);
  });

  it("should set delay", () => {
    const sut = new Timer(100);
    sut.delay = 200;
    expect(sut.delay).toEqual(200);
  });

  it("should be running when started", () => {
    const sut = new Timer(100);
    sut.start();

    expect(sut.isRunning).toEqual(true);
    sut.stop();
  });

  it("stopping the timer that is not running should have no effect", () => {
    const sut = new Timer(100);
    expect(sut.isRunning).toEqual(false);
    sut.stop();
    expect(sut.isRunning).toEqual(false);
  });

  it("start timer should set the timeout", () => {
    vi.useFakeTimers();
    const spy = vi.spyOn(window, "setTimeout");

    const sut = new Timer(100);
    sut.start();

    vi.advanceTimersByTime(50);

    expect(spy).toHaveBeenCalledOnce();
  });

  it("should have no effect if no handler is set", () => {
    vi.useFakeTimers();

    const sut = new Timer(100);
    sut.start();

    vi.advanceTimersByTime(100);
    expect(sut.isRunning).toEqual(false);
  });

  it("should call handler after clock ticks the delay", () => {
    vi.useFakeTimers();
    const spy = vi.fn();

    const sut = new Timer(100);
    sut.setOnExecute(spy);
    sut.start();

    vi.advanceTimersByTime(100);

    expect(spy).toHaveBeenCalledOnce();
  });

  it("should stop the started timer", () => {
    vi.useFakeTimers();
    const spy = vi.fn();

    const sut = new Timer(100);
    sut.setOnExecute(spy);
    sut.start();
    sut.stop();

    vi.advanceTimersByTime(100);

    expect(spy).not.toBeCalled();
  });

  it("should restart the started timer", () => {
    vi.useFakeTimers();
    const clearTimeoutSpy = vi.spyOn(window, "clearTimeout");
    const setTimeoutSpy = vi.spyOn(window, "setTimeout");

    const sut = new Timer(100);
    sut.start();
    sut.start();

    expect(setTimeoutSpy).toHaveBeenCalledTimes(2);
    expect(clearTimeoutSpy).toHaveBeenCalledOnce();
  });
});
