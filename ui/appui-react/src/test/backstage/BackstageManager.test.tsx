/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { IModelApp, NoRenderApp } from "@itwin/core-frontend";
import { renderHook } from "@testing-library/react-hooks";
import { waitFor } from "@testing-library/react";
import { UiFramework } from "../../appui-react";
import {
  BackstageManager,
  useBackstageManager,
  useIsBackstageOpen,
} from "../../appui-react/backstage/BackstageManager";
import { InternalBackstageManager } from "../../appui-react/backstage/InternalBackstageManager";
import TestUtils from "../TestUtils";

describe("BackstageManager", () => {
  beforeEach(async () => {
    await TestUtils.initializeUiFramework();
    await NoRenderApp.startup();
  });
  afterEach(async () => {
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

    expect(spy).toHaveBeenCalledOnce();
    expect(spy).toHaveBeenCalledWith({ isOpen: true });
    expect(manager.isOpen).toEqual(true);

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
    expect(manager.isOpen).toEqual(true);
    manager.onToggled.removeListener(spy);
  });

  it("should not trigger event if state do not change", () => {
    const manager = new BackstageManager();
    const spy = vi.fn();
    manager.open();
    manager.onToggled.addListener(spy);
    manager.open();

    expect(spy).not.toBeCalled();
    expect(manager.isOpen).toEqual(true);
    manager.onToggled.removeListener(spy);
  });

  it("getBackstageToggleCommand generates toggle button", () => {
    const command = BackstageManager.getBackstageToggleCommand();
    const initialState = UiFramework.backstage.isOpen;
    command.execute();

    expect(UiFramework.backstage.isOpen).toEqual(!initialState);
  });

  it("getBackstageToggleCommand handles icon override", () => {
    const command =
      BackstageManager.getBackstageToggleCommand("different-icon");

    expect(command.iconSpec).toEqual("different-icon");
  });

  it("will directly call internal implementation", () => {
    const manager = new BackstageManager();
    const internal = new InternalBackstageManager();
    const stubbedOnToggled = Symbol("onToggled");
    vi.spyOn(internal, "onToggled").get(() => stubbedOnToggled);
    const stubbedIsOpen = Symbol("isOpen");
    vi.spyOn(internal, "isOpen").get(() => stubbedIsOpen);
    vi.spyOn(internal);
    manager.mockInternal(internal);

    expect(manager.onToggled).toEqual(internal.onToggled);
    expect(manager.isOpen).toEqual(internal.isOpen);

    // New method names
    manager.open();
    expect(internal.open).to.have.been.calledOnceWithExactly();
    manager.close();
    expect(internal.close).to.have.been.calledOnceWithExactly();
    manager.toggle();
    expect(internal.toggle).to.have.been.calledOnceWithExactly();
    manager.getBackstageToggleCommand("iconSpec");
    expect(
      internal.getBackstageToggleCommand
    ).to.have.been.calledOnceWithExactly("iconSpec");

    const stubbedCommand = Symbol("backstageCommand");
    sinon
      .stub(UiFramework.backstage, "getBackstageToggleCommand")
      .returns(stubbedCommand as any);
    expect(BackstageManager.getBackstageToggleCommand()).toEqual(
      stubbedCommand
    );
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
      expect(result.current).toEqual(true);
    });
    manager.close();
    await waitFor(() => {
      expect(result.current).to.be.false;
    });
  });

  it("should remove onToggled listener", () => {
    const manager = new BackstageManager();
    const addSpy = vi.spyOn(manager.onToggled, "addListener");
    const removeSpy = vi.spyOn(manager.onToggled, "removeListener");
    const { unmount } = renderHook(() => useIsBackstageOpen(manager));
    const callback = vi.spyOn(addSpy.firstCall, "returnValue");
    unmount();

    // Either one must be true for this test to pass
    expect([
      callback.called,
      removeSpy.calledWith(...addSpy.firstCall.args),
    ]).to.include(true);
  });
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
