/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { renderHook } from "@testing-library/react-hooks";
import { waitFor } from "@testing-library/react";
import { UiFramework } from "../../appui-react";
import {
  BackstageManager,
  useBackstageManager,
  useIsBackstageOpen,
} from "../../appui-react/backstage/BackstageManager";
import { InternalBackstageManager } from "../../appui-react/backstage/InternalBackstageManager";

describe("BackstageManager", () => {
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

    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({ isOpen: false })
    );
    expect(manager.isOpen).toEqual(false);

    manager.onToggled.removeListener(spy);
  });

  it("should toggle backstage", () => {
    const manager = new BackstageManager();
    const spy = vi.fn();
    manager.open();
    manager.onToggled.addListener(spy);

    manager.toggle();

    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({ isOpen: false })
    );
    expect(manager.isOpen).toEqual(false);

    spy.mockReset();
    manager.toggle();

    expect(spy).toHaveBeenCalledWith(expect.objectContaining({ isOpen: true }));
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
    manager.mockInternal(internal);

    expect(manager.onToggled).toEqual(internal.onToggled);
    expect(manager.isOpen).toEqual(internal.isOpen);

    const open = vi.spyOn(internal, "open");
    const close = vi.spyOn(internal, "close");
    const toggle = vi.spyOn(internal, "toggle");
    const getBackstageToggleCommand = vi.spyOn(
      internal,
      "getBackstageToggleCommand"
    );

    // New method names
    manager.open();
    expect(open).toHaveBeenCalledWith();
    manager.close();
    expect(close).toHaveBeenCalledWith();
    manager.toggle();
    expect(toggle).toHaveBeenCalledWith();
    manager.getBackstageToggleCommand("iconSpec");
    expect(getBackstageToggleCommand).toHaveBeenCalledWith("iconSpec");

    const backstageCommandSymbol = Symbol("backstageCommand");
    vi.spyOn(
      UiFramework.backstage,
      "getBackstageToggleCommand"
    ).mockReturnValue(backstageCommandSymbol as any);
    expect(BackstageManager.getBackstageToggleCommand()).toEqual(
      backstageCommandSymbol
    );
  });
});

describe("useIsBackstageOpen", () => {
  it("should return is backstage open", () => {
    const manager = new BackstageManager();

    const { result } = renderHook(() => useIsBackstageOpen(manager));

    expect(result.current).toEqual(false);
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
      expect(result.current).toEqual(false);
    });
  });

  it("should remove onToggled listener", () => {
    const manager = new BackstageManager();
    const removeSpy = vi.spyOn(manager.onToggled, "removeListener");
    const { unmount } = renderHook(() => useIsBackstageOpen(manager));
    unmount();

    expect(removeSpy).toHaveBeenCalledOnce();
  });
});

describe("useBackstageManager", () => {
  it("returns UiFramework.backstageManager instance", async () => {
    const { result } = renderHook(() => useBackstageManager());
    expect(result.current).to.equal(UiFramework.backstage);
  });
});
