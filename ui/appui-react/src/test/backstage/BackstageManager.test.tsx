/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { IModelApp, NoRenderApp } from "@itwin/core-frontend";
import { renderHook } from "@testing-library/react-hooks";
import { waitFor } from "@testing-library/react";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { UiFramework } from "../../appui-react";
import {
  BackstageManager,
  useBackstageManager,
  useIsBackstageOpen,
} from "../../appui-react/backstage/BackstageManager";
import { InternalBackstageManager } from "../../appui-react/backstage/InternalBackstageManager";
import TestUtils from "../TestUtils";
import sinon from "sinon";

describe("BackstageManager", () => {
  beforeAll(async () => {
    await TestUtils.initializeUiFramework();
    await NoRenderApp.startup();
  });
  afterAll(async () => {
    await IModelApp.shutdown();
    TestUtils.terminateUiFramework();
  });

  it("should open backstage", () => {
    const manager = new BackstageManager();
    const spy = vi.fn();
    manager.onToggled.addListener(spy);
    manager.open();
    // Check that we call only once;
    manager.open();

    expect(spy).toHaveBeenNthCalledWith(1, sinon.match({ isOpen: true })); // this previously used sinon.match..
    expect(manager.isOpen).to.be.true;

    manager.onToggled.removeListener(spy);
  });

  it("should close backstage", () => {
    const manager = new BackstageManager();
    const spy = vi.fn();
    manager.open();
    manager.onToggled.addListener(spy);

    manager.close();

    expect(spy).toHaveBeenCalledWith(sinon.match({ isOpen: false }));
    expect(manager.isOpen).to.be.false;

    manager.onToggled.removeListener(spy);
  });

  it("should toggle backstage", () => {
    const manager = new BackstageManager();
    const spy = vi.fn();
    manager.open();
    manager.onToggled.addListener(spy);

    manager.toggle();

    expect(spy).toHaveBeenCalledWith(sinon.match({ isOpen: false }));
    expect(manager.isOpen).to.be.false;

    spy.mockReset();
    manager.toggle();

    expect(spy).toHaveBeenCalledWith(sinon.match({ isOpen: true }));
    expect(manager.isOpen).to.be.true;
    manager.onToggled.removeListener(spy);
  });

  it("should not trigger event if state do not change", () => {
    const manager = new BackstageManager();
    const spy = vi.fn();
    manager.open();
    manager.onToggled.addListener(spy);
    manager.open();

    expect(spy).not.toHaveBeenCalled();
    expect(manager.isOpen).to.be.true;
    manager.onToggled.removeListener(spy);
  });

  it("getBackstageToggleCommand generates toggle button", () => {
    const command = BackstageManager.getBackstageToggleCommand();
    const initialState = UiFramework.backstage.isOpen;
    command.execute();

    expect(UiFramework.backstage.isOpen).to.eq(!initialState);
  });

  it("getBackstageToggleCommand handles icon override", () => {
    const command =
      BackstageManager.getBackstageToggleCommand("different-icon");

    expect(command.iconSpec).to.eq("different-icon");
  });

  // double back to these... on toggled is not a gettter...
  it("will directly call internal implementation", () => {
    const manager = new BackstageManager();
    const internal = new InternalBackstageManager();
    const stubbedOnToggled = Symbol("onToggled");
    vi.spyOn(internal, "onToggled", "get").mockImplementation(
      () => stubbedOnToggled as any
    );
    const stubbedIsOpen = Symbol("isOpen");
    vi.spyOn(internal, "isOpen", "get").mockImplementation(
      () => stubbedIsOpen as any
    );
    // vi.spyOn(internal);
    manager.mockInternal(internal);

    expect(manager.onToggled).to.eq(internal.onToggled);
    expect(manager.isOpen).to.eq(internal.isOpen);

    // New method names
    manager.open();
    expect(internal.open).toHaveBeenNthCalledWith(1);
    manager.close();
    expect(internal.close).toHaveBeenNthCalledWith(1);
    manager.toggle();
    expect(internal.toggle).toHaveBeenNthCalledWith(1);
    manager.getBackstageToggleCommand("iconSpec");
    expect(internal.getBackstageToggleCommand).toHaveBeenNthCalledWith(
      1,
      "iconSpec"
    );

    const stubbedCommand = Symbol("backstageCommand");
    vi.spyOn(
      UiFramework.backstage,
      "getBackstageToggleCommand"
    ).mockReturnValue(stubbedCommand as any);
    expect(BackstageManager.getBackstageToggleCommand()).to.eq(stubbedCommand);
  });
});

describe("useIsBackstageOpen", () => {
  it("should return is backstage open", () => {
    const manager = new BackstageManager();

    const { result } = renderHook(() => useIsBackstageOpen(manager));

    expect(result.current).to.be.false;
  });

  it("should update isOpen", async () => {
    const manager = new BackstageManager();
    const { result } = renderHook(() => useIsBackstageOpen(manager));

    manager.open();
    await waitFor(() => {
      expect(result.current).to.be.true;
    });
    manager.close();
    await waitFor(() => {
      expect(result.current).to.be.false;
    });
  });

  // no idea what this is doing... with the firstcall shenanigans let's leave come back to it
  // it("should remove onToggled listener", () => {
  //   const manager = new BackstageManager();
  //   const addSpy = vi.spyOn(manager.onToggled, "addListener");
  //   const removeSpy = vi.spyOn(manager.onToggled, "removeListener");
  //   const { unmount } = renderHook(() => useIsBackstageOpen(manager));
  //   const callback = vi.spyOn(addSpy.firstCall, "returnValue");
  //   unmount();

  //   // Either one must be true for this test to pass
  //   expect([
  //     callback.called,
  //     removeSpy.calledWith(...addSpy.firstCall.args),
  //   ]).to.include(true);
  // });
});

describe("useBackstageManager", () => {
  it("returns UiFramework.backstageManager instance", async () => {
    await TestUtils.initializeUiFramework();
    await NoRenderApp.startup();

    const { result } = renderHook(() => useBackstageManager());
    expect(result.current).to.equal(UiFramework.backstage);

    await IModelApp.shutdown();
    TestUtils.terminateUiFramework();
  });
});
