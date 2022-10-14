/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { expect } from "chai";
import * as React from "react";
import { fireEvent, render } from "@testing-library/react";
import { SpecialKey } from "@itwin/appui-abstract";
import { getUiSettingsManagerEntry, UiSettingsPage } from "../../appui-react/settings/ui/UiSettingsPage";
import TestUtils, { handleError, selectChangeValueByText, storageMock, stubScrollIntoView } from "../TestUtils";
import { UiFramework } from "../../appui-react/UiFramework";
import { ColorTheme } from "../../appui-react/theme/ThemeManager";
import { IModelApp, NoRenderApp } from "@itwin/core-frontend";

describe("UiSettingsPage", () => {
  const localStorageToRestore = Object.getOwnPropertyDescriptor(window, "localStorage")!;
  let localStorageMock = storageMock();

  before(async () => {
    await NoRenderApp.startup();
  });

  after(async () => {
    await IModelApp.shutdown();
  });

  beforeEach(async () => {
    // create a new mock each run so there are no "stored values"
    localStorageMock = storageMock();
    await TestUtils.initializeUiFramework();
    await TestUtils.flushAsyncOperations();
    Object.defineProperty(window, "localStorage", {
      get: () => localStorageMock,
    });
  });

  afterEach(() => {
    TestUtils.terminateUiFramework();
    Object.defineProperty(window, "localStorage", localStorageToRestore);
  });

  stubScrollIntoView();

  function getInputBySpanTitle(titleSpan: HTMLElement) {
    const settingsItemDiv = titleSpan.parentElement?.parentElement;
    expect(settingsItemDiv).not.to.be.undefined;
    return settingsItemDiv!.querySelector("input");
  }

  it("renders using getUiSettingsManagerEntry", async () => {
    const tabEntry = getUiSettingsManagerEntry(5);
    const wrapper = render(tabEntry.page);
    expect(wrapper).not.to.be.undefined;
    expect(wrapper.container.querySelectorAll("span.title").length).to.eq(10);
    wrapper.unmount();
  });

  // function getSelectBySpanTitle(titleSpan: HTMLElement) {
  //   const settingsItemDiv = titleSpan.parentElement?.parentElement;
  //   expect(settingsItemDiv).not.to.be.undefined;
  //   return settingsItemDiv!.querySelector("select");
  // }

  it("renders set theme", async () => {
    const wrapper = render(<UiSettingsPage />);
    expect(wrapper).not.to.be.undefined;

    // const themeSpan = wrapper.getByText("settings.uiSettingsPage.themeTitle");
    // const themeSelect = getSelectBySpanTitle(themeSpan);
    // expect(themeSelect).not.to.be.null;
    // await TestUtils.flushAsyncOperations();
    // fireEvent.change(themeSelect!, { target: { value: "dark" } });
    // await TestUtils.flushAsyncOperations();
    // expect(themeSelect!.value).to.be.eq("dark");
    // fireEvent.change(themeSelect!, { target: { value: "light" } });
    // await TestUtils.flushAsyncOperations();
    // expect(themeSelect!.value).to.be.eq("light");

    const selectButton = wrapper.getByTestId("select-theme");
    selectChangeValueByText(selectButton, "settings.uiSettingsPage.dark", handleError);
    await TestUtils.flushAsyncOperations();
    expect(UiFramework.getColorTheme()).to.eq(ColorTheme.Dark);
    selectChangeValueByText(selectButton, "settings.uiSettingsPage.light", handleError);
    await TestUtils.flushAsyncOperations();
    expect(UiFramework.getColorTheme()).to.eq(ColorTheme.Light);

    wrapper.unmount();
  });

  it("renders set widget opacity", async () => {
    await TestUtils.flushAsyncOperations();

    const wrapper = render(<UiSettingsPage />);
    expect(wrapper).not.to.be.undefined;
    const thumb = wrapper.container.ownerDocument.querySelector(".iui-slider-thumb");
    expect(thumb).to.exist;
    fireEvent.keyDown(thumb!, { key: SpecialKey.ArrowRight });
    await TestUtils.flushAsyncOperations();

    await TestUtils.flushAsyncOperations();
    // trigger sync event processing
    UiFramework.setWidgetOpacity(.5);
    await TestUtils.flushAsyncOperations();
    wrapper.unmount();
  });

  it("renders toggle auto-hide", async () => {
    await TestUtils.flushAsyncOperations();

    const wrapper = render(<UiSettingsPage />);
    expect(wrapper).not.to.be.undefined;
    const autoHideSpan = wrapper.getByText("settings.uiSettingsPage.autoHideTitle");
    const checkbox = getInputBySpanTitle(autoHideSpan);
    expect(checkbox).not.to.be.null;
    fireEvent.click(checkbox!);
    await TestUtils.flushAsyncOperations();
    expect(checkbox?.checked).to.be.false; // defaults to true so this should make if false
    fireEvent.click(checkbox!);
    await TestUtils.flushAsyncOperations();
    expect(checkbox?.checked).to.be.true;
    expect(wrapper.container.querySelectorAll("span.title").length).to.eq(10);
    wrapper.unmount();
  });

  it("renders toggle drag interaction", async () => {
    await TestUtils.flushAsyncOperations();
    const wrapper = render(<UiSettingsPage />);
    expect(wrapper).not.to.be.undefined;

    const titleSpan = wrapper.getByText("settings.uiSettingsPage.dragInteractionTitle");
    const checkbox = getInputBySpanTitle(titleSpan);
    fireEvent.click(checkbox!);
    await TestUtils.flushAsyncOperations();
    expect(checkbox?.checked).to.be.true;
    fireEvent.click(checkbox!);
    await TestUtils.flushAsyncOperations();
    expect(checkbox?.checked).to.be.false;
    wrapper.unmount();
  });

  it("renders toggle useProximityOpacity", async () => {
    await TestUtils.flushAsyncOperations();
    const wrapper = render(<UiSettingsPage />);
    expect(wrapper).not.to.be.undefined;

    const titleSpan = wrapper.getByText("settings.uiSettingsPage.useProximityOpacityTitle");
    const checkbox = getInputBySpanTitle(titleSpan);
    fireEvent.click(checkbox!);
    await TestUtils.flushAsyncOperations();
    expect(checkbox?.checked).to.be.true; // latest default value
    fireEvent.click(checkbox!);
    await TestUtils.flushAsyncOperations();
    expect(checkbox?.checked).to.be.false;
    wrapper.unmount();
  });

  it("renders toggle snapWidgetOpacity", async () => {
    await TestUtils.flushAsyncOperations();
    const wrapper = render(<UiSettingsPage />);
    expect(wrapper).not.to.be.undefined;

    const titleSpan = wrapper.getByText("settings.uiSettingsPage.snapWidgetOpacityTitle");
    const checkbox = getInputBySpanTitle(titleSpan);
    fireEvent.click(checkbox!);
    await TestUtils.flushAsyncOperations();
    expect(checkbox?.checked).to.be.true;
    fireEvent.click(checkbox!);
    await TestUtils.flushAsyncOperations();
    expect(checkbox?.checked).to.be.false;
    wrapper.unmount();
  });

  it("renders showWidgetIcon toggle", async () => {
    await TestUtils.flushAsyncOperations();
    const wrapper = render(<UiSettingsPage />);
    expect(wrapper).not.to.be.undefined;

    const titleSpan = wrapper.getByText("settings.uiSettingsPage.widgetIconTitle");
    const checkbox = getInputBySpanTitle(titleSpan);
    fireEvent.click(checkbox!);
    await TestUtils.flushAsyncOperations();
    expect(checkbox?.checked).to.be.false;
    fireEvent.click(checkbox!);
    await TestUtils.flushAsyncOperations();
    expect(checkbox?.checked).to.be.true;
    wrapper.unmount();
  });

  it("renders animateToolSettings toggle", async () => {
    await TestUtils.flushAsyncOperations();
    const wrapper = render(<UiSettingsPage />);
    expect(wrapper).not.to.be.undefined;

    const titleSpan = wrapper.getByText("settings.uiSettingsPage.animateToolSettingsTitle");
    const checkbox = getInputBySpanTitle(titleSpan);
    fireEvent.click(checkbox!);
    await TestUtils.flushAsyncOperations();
    expect(checkbox?.checked).to.be.true;
    fireEvent.click(checkbox!);
    await TestUtils.flushAsyncOperations();
    expect(checkbox?.checked).to.be.false;
    wrapper.unmount();
  });

  it("renders useToolAsToolSettingsLabel toggle", async () => {
    await TestUtils.flushAsyncOperations();
    const wrapper = render(<UiSettingsPage />);
    expect(wrapper).not.to.be.undefined;

    const titleSpan = wrapper.getByText("settings.uiSettingsPage.useToolAsToolSettingsLabelTitle");
    const checkbox = getInputBySpanTitle(titleSpan);
    fireEvent.click(checkbox!);
    await TestUtils.flushAsyncOperations();
    expect(checkbox?.checked).to.be.true;
    fireEvent.click(checkbox!);
    await TestUtils.flushAsyncOperations();
    expect(checkbox?.checked).to.be.false;
    wrapper.unmount();
  });

});
