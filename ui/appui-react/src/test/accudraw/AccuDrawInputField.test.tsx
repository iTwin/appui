/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { fireEvent, render, waitFor } from "@testing-library/react";
import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import sinon from "sinon";
import * as React from "react";
import { SpecialKey } from "@itwin/appui-abstract";
import { AccuDrawInputField } from "../../appui-react/accudraw/AccuDrawInputField";
import { TestUtils } from "../TestUtils";
import type { IModelAppOptions } from "@itwin/core-frontend";
import { IModelApp, ItemField, NoRenderApp } from "@itwin/core-frontend";
import { FrameworkAccuDraw } from "../../appui-react/accudraw/FrameworkAccuDraw";
import { FrameworkUiAdmin } from "../../appui-react/uiadmin/FrameworkUiAdmin";
import { UiFramework } from "../../appui-react";

// cspell:ignore uiadmin

function requestNextAnimation() {}

describe("AccuDrawInputField", () => {
  const rnaDescriptorToRestore = Object.getOwnPropertyDescriptor(
    IModelApp,
    "requestNextAnimation"
  )!;
  const sandbox = sinon.createSandbox();

  beforeAll(async () => {
    // Avoid requestAnimationFrame exception during test by temporarily replacing function that calls it.
    // Tried replacing window.requestAnimationFrame first but that did not work.
    Object.defineProperty(IModelApp, "requestNextAnimation", {
      get: () => requestNextAnimation,
    });

    await TestUtils.initializeUiFramework();

    const opts: IModelAppOptions = {};
    opts.accuDraw = new FrameworkAccuDraw();
    opts.uiAdmin = new FrameworkUiAdmin();
    await NoRenderApp.startup(opts);
  });

  afterAll(async () => {
    await IModelApp.shutdown();

    Object.defineProperty(
      IModelApp,
      "requestNextAnimation",
      rnaDescriptorToRestore
    );

    TestUtils.terminateUiFramework();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("should render with lock", () => {
    const spyChanged = vi.fn();
    const wrapper = render(
      <AccuDrawInputField
        isLocked={true}
        field={ItemField.X_Item}
        id="x"
        onValueChanged={spyChanged}
      />
    );
    const icon = wrapper.container.querySelector(".uifw-accudraw-lock");
    expect(icon).not.to.be.null;
  });

  it("should call onValueChanged on change", () => {
    const spyMethod = vi.fn();
    const wrapper = render(
      <AccuDrawInputField
        isLocked={false}
        field={ItemField.X_Item}
        id="x"
        onValueChanged={spyMethod}
      />
    );
    const input = wrapper.container.querySelector("input");
    expect(input).not.to.be.null;
    fireEvent.change(input!, { target: { value: "22.3" } });
    expect((input as HTMLInputElement).value).to.eq("22.3");
    fireEvent.keyDown(input!, { key: SpecialKey.Enter });
    expect(spyMethod).toHaveBeenCalledOnce();

    fireEvent.change(input!, { target: { value: "22.3" } }); // Test no value change
    expect((input as HTMLInputElement).value).to.eq("22.3");
    fireEvent.keyDown(input!, { key: SpecialKey.Enter });
    expect(spyMethod).toHaveBeenCalledOnce();
  });

  it("should call onValueChanged on change after delay", async () => {
    const fakeTimers = vi.useFakeTimers();
    const spyMethod = vi.fn();
    const wrapper = render(
      <AccuDrawInputField
        isLocked={false}
        field={ItemField.X_Item}
        id="x"
        onValueChanged={spyMethod}
        valueChangedDelay={10}
      />
    );
    const input = wrapper.container.querySelector("input");
    expect(input).not.to.be.null;
    fireEvent.change(input!, { target: { value: "22.3" } });
    expect((input as HTMLInputElement).value).to.eq("22.3");
    fireEvent.keyDown(input!, { key: SpecialKey.Enter });
    expect(spyMethod).not.toHaveBeenCalled();

    fakeTimers.advanceTimersByTime(20);
    expect(spyMethod).toHaveBeenCalledOnce();
    fakeTimers.useRealTimers();
  });

  it("should call onEscPressed on ESC", () => {
    const spyEsc = vi.fn();
    const spyChanged = vi.fn();
    const wrapper = render(
      <AccuDrawInputField
        onEscPressed={spyEsc}
        isLocked={false}
        field={ItemField.X_Item}
        id="x"
        onValueChanged={spyChanged}
      />
    );
    const input = wrapper.container.querySelector("input");
    expect(input).not.to.be.null;
    fireEvent.keyDown(input!, { key: SpecialKey.Escape });
    expect(spyEsc).toHaveBeenCalledOnce();
  });

  it("should call onEnterPressed on Enter", () => {
    const spyEnter = vi.fn();
    const spyChanged = vi.fn();
    const wrapper = render(
      <AccuDrawInputField
        onEnterPressed={spyEnter}
        isLocked={false}
        field={ItemField.X_Item}
        id="x"
        onValueChanged={spyChanged}
      />
    );
    const input = wrapper.container.querySelector("input");
    expect(input).not.to.be.null;
    fireEvent.keyDown(input!, { key: SpecialKey.Enter });
    expect(spyEnter).toHaveBeenCalledOnce();
  });

  it("should call UiFramework.keyboardShortcuts.processKey on a letter", () => {
    const spyMethod = vi.spyOn(UiFramework.keyboardShortcuts, "processKey");
    const spyChanged = vi.fn();
    const wrapper = render(
      <AccuDrawInputField
        isLocked={false}
        field={ItemField.X_Item}
        id="x"
        onValueChanged={spyChanged}
      />
    );
    const input = wrapper.container.querySelector("input");
    expect(input).not.to.be.null;
    fireEvent.keyDown(input!, { key: "a" });
    expect(spyMethod).toHaveBeenCalledOnce();
    fireEvent.keyDown(input!, { key: "1" });
    expect(spyMethod).toHaveBeenCalledTimes(2);
    (UiFramework.keyboardShortcuts.processKey as any).restore();
  });

  it("should update value when calling onFieldValueChange", async () => {
    const spyMethod = vi.fn();
    const wrapper = render(
      <AccuDrawInputField
        isLocked={false}
        field={ItemField.X_Item}
        id="x"
        onValueChanged={spyMethod}
      />
    );
    const input = wrapper.container.querySelector("input");
    expect(input).not.to.be.null;
    IModelApp.accuDraw.setFocusItem(ItemField.X_Item);
    IModelApp.accuDraw.setValueByIndex(ItemField.X_Item, 30.48);
    IModelApp.accuDraw.onFieldValueChange(ItemField.X_Item);
    await waitFor(() => {
      expect((input as HTMLInputElement).value).to.eq("100'-0\"");
    });
    expect(spyMethod).not.toHaveBeenCalled();
  });
});
