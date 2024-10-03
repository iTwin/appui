/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { act, fireEvent, render, waitFor } from "@testing-library/react";
import * as React from "react";
import { Key } from "ts-key-enum";
import { AccuDrawInputField } from "../../appui-react/accudraw/AccuDrawInputField.js";
import { IModelApp, ItemField } from "@itwin/core-frontend";
import { FrameworkAccuDraw } from "../../appui-react/accudraw/FrameworkAccuDraw.js";
import { UiFramework } from "../../appui-react.js";

describe("AccuDrawInputField", () => {
  beforeEach(async () => {
    const accuDraw = new FrameworkAccuDraw();
    vi.spyOn(IModelApp, "accuDraw", "get").mockImplementation(() => accuDraw);
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
    expect(icon).toBeTruthy();
  });

  it("should call onValueChanged on change", () => {
    const spy = vi.fn();
    const wrapper = render(
      <AccuDrawInputField
        isLocked={false}
        field={ItemField.X_Item}
        id="x"
        onValueChanged={spy}
      />
    );
    const input = wrapper.container.querySelector("input");
    expect(input).toBeTruthy();
    fireEvent.change(input!, { target: { value: "22.3" } });
    expect((input as HTMLInputElement).value).toEqual("22.3");
    fireEvent.keyDown(input!, { key: Key.Enter });
    expect(spy).toHaveBeenCalledOnce();
    fireEvent.change(input!, { target: { value: "22.3" } }); // Test no value change
    expect((input as HTMLInputElement).value).toEqual("22.3");
    fireEvent.keyDown(input!, { key: Key.Enter });
    expect(spy).toHaveBeenCalledOnce();
  });

  it("should call onValueChanged on change after delay", async () => {
    vi.useFakeTimers();
    const spy = vi.fn();
    const wrapper = render(
      <AccuDrawInputField
        isLocked={false}
        field={ItemField.X_Item}
        id="x"
        onValueChanged={spy}
        valueChangedDelay={10}
      />
    );
    const input = wrapper.container.querySelector("input");
    expect(input).toBeTruthy();
    fireEvent.change(input!, { target: { value: "22.3" } });
    expect((input as HTMLInputElement).value).toEqual("22.3");
    fireEvent.keyDown(input!, { key: Key.Enter });
    expect(spy).not.toBeCalled();

    vi.advanceTimersByTime(20);
    expect(spy).toHaveBeenCalledOnce();
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
    expect(input).toBeTruthy();
    fireEvent.keyDown(input!, { key: Key.Escape });
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
    expect(input).toBeTruthy();
    fireEvent.keyDown(input!, { key: Key.Enter });
    expect(spyEnter).toHaveBeenCalledOnce();
  });

  it("should call UiFramework.keyboardShortcuts.processKey on a letter", () => {
    const spy = vi.spyOn(UiFramework.keyboardShortcuts, "processKey");
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
    expect(input).toBeTruthy();
    fireEvent.keyDown(input!, { key: "a" });
    expect(spy).toHaveBeenCalledOnce();
    fireEvent.keyDown(input!, { key: "1" });
    expect(spy).toHaveBeenCalledOnce();
  });

  it("should update value when calling onFieldValueChange", async () => {
    const spy = vi.fn();
    const wrapper = render(
      <AccuDrawInputField
        isLocked={false}
        field={ItemField.X_Item}
        id="x"
        onValueChanged={spy}
      />
    );
    const input = wrapper.container.querySelector("input");
    expect(input).toBeTruthy();

    act(() => {
      IModelApp.accuDraw.setFocusItem(ItemField.X_Item);
      IModelApp.accuDraw.setValueByIndex(ItemField.X_Item, 30.48);
      IModelApp.accuDraw.onFieldValueChange(ItemField.X_Item);
    });

    await waitFor(() => {
      expect((input as HTMLInputElement).value).toEqual("100'-0\"");
    });
    expect(spy).not.toBeCalled();
  });
});
