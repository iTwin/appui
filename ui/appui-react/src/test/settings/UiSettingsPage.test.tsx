/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { act, fireEvent, render, within } from "@testing-library/react";
import {
  getUiSettingsManagerEntry,
  UiSettingsPage,
} from "../../appui-react/settings/ui/UiSettingsPage";
import TestUtils, { storageMock, waitForPosition } from "../TestUtils";
import { UiFramework } from "../../appui-react/UiFramework";
import { ColorTheme } from "../../appui-react/theme/ThemeManager";

describe("UiSettingsPage", () => {
  const localStorageToRestore = Object.getOwnPropertyDescriptor(
    window,
    "localStorage"
  )!;
  let localStorageMock: ReturnType<typeof storageMock>;

  beforeEach(async () => {
    // create a new mock each run so there are no "stored values"
    localStorageMock = storageMock();
    Object.defineProperty(window, "localStorage", {
      get: () => localStorageMock,
    });
  });

  afterEach(() => {
    Object.defineProperty(window, "localStorage", localStorageToRestore);
  });

  function getInputBySpanTitle(titleSpan: HTMLElement) {
    const settingsItemDiv = titleSpan.parentElement?.parentElement;
    expect(settingsItemDiv).not.to.be.undefined;
    return settingsItemDiv!.querySelector("input");
  }

  it("renders using getUiSettingsManagerEntry", async () => {
    const tabEntry = getUiSettingsManagerEntry(5);
    const wrapper = render(tabEntry.page);
    expect(wrapper).not.to.be.undefined;
    expect(wrapper.container.querySelectorAll("span.title").length).toEqual(11);
    wrapper.unmount();
  });

  it("renders set theme", async () => {
    const wrapper = render(<UiSettingsPage />);
    const openMenu = async () => {
      const selectButton = within(
        wrapper.getByTestId("select-theme")
      ).getByRole("combobox");
      fireEvent.click(selectButton);
      await waitForPosition();
    };
    const menu = () =>
      within(
        wrapper.getAllByRole("listbox").find((element) => {
          return within(element).queryByText("settings.uiSettingsPage.dark");
        })!
      );

    await openMenu();
    fireEvent.click(menu().getByText("settings.uiSettingsPage.dark"));
    expect(UiFramework.getColorTheme()).toEqual(ColorTheme.Dark);

    await openMenu();
    fireEvent.click(menu().getByText("settings.uiSettingsPage.light"));
    expect(UiFramework.getColorTheme()).toEqual(ColorTheme.Light);

    await openMenu();
    fireEvent.click(
      menu().getByText("settings.uiSettingsPage.lightHighContrast")
    );
    expect(UiFramework.getColorTheme()).toEqual(ColorTheme.HighContrastLight);

    await openMenu();
    fireEvent.click(
      menu().getByText("settings.uiSettingsPage.darkHighContrast")
    );
    expect(UiFramework.getColorTheme()).toEqual(ColorTheme.HighContrastDark);
  });

  it("renders set widget opacity", async () => {
    const wrapper = render(<UiSettingsPage />);
    const thumb = wrapper.getAllByRole("slider")[1];

    expect(UiFramework.getWidgetOpacity()).toEqual(0.9);
    expect(thumb.getAttribute("aria-valuenow")).toEqual("0.9");

    act(() => {
      UiFramework.setWidgetOpacity(0.5);
    });
    expect(UiFramework.getWidgetOpacity()).equals(0.5);
    expect(thumb.getAttribute("aria-valuenow")).toEqual("0.5");
  });

  it("renders  set toolbar opacity", async () => {
    const wrapper = render(<UiSettingsPage />);
    const thumb = wrapper.getAllByRole("slider")[0];

    // Default
    expect(UiFramework.getToolbarOpacity()).toEqual(0.5);
    expect(thumb.getAttribute("aria-valuenow")).toEqual("0.5");

    act(() => {
      UiFramework.setToolbarOpacity(0.9);
    });
    expect(UiFramework.getToolbarOpacity()).toEqual(0.9);
    expect(thumb.getAttribute("aria-valuenow")).toEqual("0.9");
  });

  it("renders toggle auto-hide", async () => {
    const wrapper = render(<UiSettingsPage />);
    expect(wrapper).not.to.be.undefined;
    const autoHideSpan = wrapper.getByText(
      "settings.uiSettingsPage.autoHideTitle"
    );
    const checkbox = getInputBySpanTitle(autoHideSpan);
    expect(checkbox).not.to.be.null;
    fireEvent.click(checkbox!);
    await TestUtils.flushAsyncOperations();
    expect(checkbox?.checked).toEqual(false); // defaults to true so this should make if false
    fireEvent.click(checkbox!);
    await TestUtils.flushAsyncOperations();
    expect(checkbox?.checked).toEqual(true);
    expect(wrapper.container.querySelectorAll("span.title").length).toEqual(11);
    wrapper.unmount();
  });

  it("renders toggle drag interaction", async () => {
    await TestUtils.flushAsyncOperations();
    const wrapper = render(<UiSettingsPage />);
    expect(wrapper).not.to.be.undefined;

    const titleSpan = wrapper.getByText(
      "settings.uiSettingsPage.dragInteractionTitle"
    );
    const checkbox = getInputBySpanTitle(titleSpan);
    fireEvent.click(checkbox!);
    await TestUtils.flushAsyncOperations();
    expect(checkbox?.checked).toEqual(true);
    fireEvent.click(checkbox!);
    await TestUtils.flushAsyncOperations();
    expect(checkbox?.checked).toEqual(false);
    wrapper.unmount();
  });

  it("renders toggle useProximityOpacity", async () => {
    await TestUtils.flushAsyncOperations();
    const wrapper = render(<UiSettingsPage />);
    expect(wrapper).not.to.be.undefined;

    const titleSpan = wrapper.getByText(
      "settings.uiSettingsPage.useProximityOpacityTitle"
    );
    const checkbox = getInputBySpanTitle(titleSpan);
    fireEvent.click(checkbox!);
    await TestUtils.flushAsyncOperations();
    expect(checkbox?.checked).toEqual(true); // latest default value
    fireEvent.click(checkbox!);
    await TestUtils.flushAsyncOperations();
    expect(checkbox?.checked).toEqual(false);
    wrapper.unmount();
  });

  it("renders toggle snapWidgetOpacity", async () => {
    await TestUtils.flushAsyncOperations();
    const wrapper = render(<UiSettingsPage />);
    expect(wrapper).not.to.be.undefined;

    const titleSpan = wrapper.getByText(
      "settings.uiSettingsPage.snapWidgetOpacityTitle"
    );
    const checkbox = getInputBySpanTitle(titleSpan);
    fireEvent.click(checkbox!);
    await TestUtils.flushAsyncOperations();
    expect(checkbox?.checked).toEqual(true);
    fireEvent.click(checkbox!);
    await TestUtils.flushAsyncOperations();
    expect(checkbox?.checked).toEqual(false);
    wrapper.unmount();
  });

  it("renders showWidgetIcon toggle", async () => {
    await TestUtils.flushAsyncOperations();
    const wrapper = render(<UiSettingsPage />);
    expect(wrapper).not.to.be.undefined;

    const titleSpan = wrapper.getByText(
      "settings.uiSettingsPage.widgetIconTitle"
    );
    const checkbox = getInputBySpanTitle(titleSpan);
    fireEvent.click(checkbox!);
    await TestUtils.flushAsyncOperations();
    expect(checkbox?.checked).toEqual(false);
    fireEvent.click(checkbox!);
    await TestUtils.flushAsyncOperations();
    expect(checkbox?.checked).toEqual(true);
    wrapper.unmount();
  });

  it("renders animateToolSettings toggle", async () => {
    await TestUtils.flushAsyncOperations();
    const wrapper = render(<UiSettingsPage />);
    expect(wrapper).not.to.be.undefined;

    const titleSpan = wrapper.getByText(
      "settings.uiSettingsPage.animateToolSettingsTitle"
    );
    const checkbox = getInputBySpanTitle(titleSpan);
    fireEvent.click(checkbox!);
    await TestUtils.flushAsyncOperations();
    expect(checkbox?.checked).toEqual(true);
    fireEvent.click(checkbox!);
    await TestUtils.flushAsyncOperations();
    expect(checkbox?.checked).toEqual(false);
    wrapper.unmount();
  });

  it("renders useToolAsToolSettingsLabel toggle", async () => {
    await TestUtils.flushAsyncOperations();
    const wrapper = render(<UiSettingsPage />);
    expect(wrapper).not.to.be.undefined;

    const titleSpan = wrapper.getByText(
      "settings.uiSettingsPage.useToolAsToolSettingsLabelTitle"
    );
    const checkbox = getInputBySpanTitle(titleSpan);
    fireEvent.click(checkbox!);
    await TestUtils.flushAsyncOperations();
    expect(checkbox?.checked).toEqual(true);
    fireEvent.click(checkbox!);
    await TestUtils.flushAsyncOperations();
    expect(checkbox?.checked).toEqual(false);
    wrapper.unmount();
  });
});
