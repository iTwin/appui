/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { act, fireEvent, render, waitFor } from "@testing-library/react";
import { expect } from "chai";
import * as React from "react";
import * as sinon from "sinon";
import { Key } from "ts-key-enum";
import { AccuDrawInputField } from "../../appui-react/accudraw/AccuDrawInputField";
import type { IModelAppOptions } from "@itwin/core-frontend";
import { IModelApp, ItemField, NoRenderApp } from "@itwin/core-frontend";
import { FrameworkAccuDraw } from "../../appui-react/accudraw/FrameworkAccuDraw";
import { UiFramework } from "../../appui-react";
import TestUtils from "../TestUtils";

// cspell:ignore uiadmin

function requestNextAnimation() {}

describe("AccuDrawInputField", () => {
  const rnaDescriptorToRestore = Object.getOwnPropertyDescriptor(
    IModelApp,
    "requestNextAnimation"
  )!;

  beforeEach(async () => {
    // Avoid requestAnimationFrame exception during test by temporarily replacing function that calls it.
    // Tried replacing window.requestAnimationFrame first but that did not work.
    Object.defineProperty(IModelApp, "requestNextAnimation", {
      get: () => requestNextAnimation,
    });

    await TestUtils.initializeUiFramework();

    const opts: IModelAppOptions = {};
    opts.accuDraw = new FrameworkAccuDraw();
    await NoRenderApp.startup(opts);
    const accuDraw = new FrameworkAccuDraw();
    sinon.stub(IModelApp, "accuDraw").get(() => accuDraw);
  });

  afterEach(async () => {
    Object.defineProperty(
      IModelApp,
      "requestNextAnimation",
      rnaDescriptorToRestore
    );
  });

  it("should render with lock", () => {
    const spyChanged = sinon.spy();
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
    const spy = sinon.spy();
    const wrapper = render(
      <AccuDrawInputField
        isLocked={false}
        field={ItemField.X_Item}
        id="x"
        onValueChanged={spy}
      />
    );
    const input = wrapper.container.querySelector("input");
    expect(input).not.to.be.null;
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
    const fakeTimers = sinon.useFakeTimers();
    const spy = sinon.spy();
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
    expect(input).not.to.be.null;
    fireEvent.change(input!, { target: { value: "22.3" } });
    expect((input as HTMLInputElement).value).toEqual("22.3");
    fireEvent.keyDown(input!, { key: Key.Enter });
    spy.called.should.not.be.true;

    fakeTimers.tick(20);
    expect(spy).toHaveBeenCalledOnce();
    fakeTimers.restore();
  });

  it("should call onEscPressed on ESC", () => {
    const spyEsc = sinon.spy();
    const spyChanged = sinon.spy();
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
    fireEvent.keyDown(input!, { key: Key.Escape });
    spyEsc.calledOnce.should.be.true;
  });

  it("should call onEnterPressed on Enter", () => {
    const spyEnter = sinon.spy();
    const spyChanged = sinon.spy();
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
    fireEvent.keyDown(input!, { key: Key.Enter });
    spyEnter.calledOnce.should.be.true;
  });

  it("should call UiFramework.keyboardShortcuts.processKey on a letter", () => {
    const spy = sinon.spy(UiFramework.keyboardShortcuts, "processKey");
    const spyChanged = sinon.spy();
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
    expect(spy).toHaveBeenCalledOnce();
    fireEvent.keyDown(input!, { key: "1" });
    spy.calledTwice.should.not.be.true;
    (UiFramework.keyboardShortcuts.processKey as any).restore();
  });

  it("should update value when calling onFieldValueChange", async () => {
    const spy = sinon.spy();
    const wrapper = render(
      <AccuDrawInputField
        isLocked={false}
        field={ItemField.X_Item}
        id="x"
        onValueChanged={spy}
      />
    );
    const input = wrapper.container.querySelector("input");
    expect(input).not.to.be.null;

    act(() => {
      IModelApp.accuDraw.setFocusItem(ItemField.X_Item);
      IModelApp.accuDraw.setValueByIndex(ItemField.X_Item, 30.48);
      IModelApp.accuDraw.onFieldValueChange(ItemField.X_Item);
    });

    await waitFor(() => {
      expect((input as HTMLInputElement).value).toEqual("100'-0\"");
    });
    sinon.assert.notCalled(spy);
  });
});
