/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import {
  act,
  fireEvent,
  render,
  waitFor,
  within,
} from "@testing-library/react";
import type { QuantityTypeKey } from "@itwin/core-frontend";
import { IModelApp, QuantityType } from "@itwin/core-frontend";
import type { FormatProps, UnitSystemKey } from "@itwin/core-quantity";
import TestUtils, { stubScrollIntoView } from "../TestUtils.js";
import { getQuantityFormatsSettingsManagerEntry } from "../../appui-react/settings/quantityformatting/QuantityFormat.js";
import { ModalDialogRenderer } from "../../appui-react/dialog/ModalDialogManager.js";
import { UiFramework } from "../../appui-react/UiFramework.js";

describe("QuantityFormatSettingsPage", () => {
  beforeEach(async () => {
    await IModelApp.quantityFormatter.reinitializeFormatAndParsingsMaps(
      new Map<UnitSystemKey, Map<QuantityTypeKey, FormatProps>>(),
      "imperial"
    );
  });

  stubScrollIntoView();

  it("will handle internal unit system change", async () => {
    const settingsEntry = getQuantityFormatsSettingsManagerEntry(10);
    expect(settingsEntry.itemPriority).to.eql(10);

    const spy = vi.spyOn(IModelApp.quantityFormatter, "setActiveUnitSystem");

    const wrapper = render(settingsEntry.page);

    const comboBox = within(
      wrapper.getByTestId("unitSystemSelector")
    ).getByRole("combobox");

    const menu = () =>
      wrapper.getAllByRole("listbox").find((element) => {
        return within(element).queryByText(
          "presentationUnitSystem.BritishImperial"
        );
      })!;

    // Initial value is Imperial - no change expected.
    fireEvent.click(comboBox);
    fireEvent.click(
      within(menu()).getByText("presentationUnitSystem.BritishImperial")
    );
    expect(spy).not.toBeCalled();

    fireEvent.click(comboBox);
    fireEvent.click(within(menu()).getByText("presentationUnitSystem.Metric"));
    expect(spy).toHaveBeenCalledOnce();

    fireEvent.click(comboBox);
    fireEvent.click(
      within(menu()).getByText("presentationUnitSystem.USCustomary")
    );
    expect(spy).toHaveBeenCalledTimes(2);

    fireEvent.click(comboBox);
    fireEvent.click(
      within(menu()).getByText("presentationUnitSystem.USSurvey")
    );
    expect(spy).toHaveBeenCalledTimes(3);
  });

  it("will listen for external unit system changes", async () => {
    const settingsEntry = getQuantityFormatsSettingsManagerEntry(10, {
      initialQuantityType: QuantityType.Length,
    });
    expect(settingsEntry.itemPriority).to.eql(10);

    const wrapper = render(settingsEntry.page);
    await IModelApp.quantityFormatter.setActiveUnitSystem("metric", false);

    await waitFor(() => {
      const exampleFormat = wrapper.getByTestId("format-sample-formatted");
      expect(exampleFormat.textContent).to.eql("1234.56 m");
    });

    wrapper.unmount();
  });

  it("will render 3 units and process quantity type selection in list", async () => {
    await IModelApp.quantityFormatter.setActiveUnitSystem("imperial", false);

    const availableUnitSystems = new Set<UnitSystemKey>([
      "metric",
      "imperial",
      "usSurvey",
    ]);
    const settingsEntry = getQuantityFormatsSettingsManagerEntry(10, {
      initialQuantityType: QuantityType.LengthEngineering,
      availableUnitSystems,
    });
    expect(settingsEntry.itemPriority).to.eql(10);

    const wrapper = render(settingsEntry.page);
    await TestUtils.flushAsyncOperations();

    const listSelector = `ul.uifw-quantity-types`;
    const categoryList = wrapper.container.querySelector(listSelector);
    expect(categoryList!.getAttribute("data-value")).to.eql(
      "QuantityTypeEnumValue-9"
    );

    const dataValueSelector = `li[data-value='QuantityTypeEnumValue-7']`;
    const categoryEntry = wrapper.container.querySelector(dataValueSelector);
    expect(categoryEntry).toBeTruthy();
    fireEvent.click(categoryEntry!);
    await TestUtils.flushAsyncOperations();
    expect(categoryList!.getAttribute("data-value")).to.eql(
      "QuantityTypeEnumValue-7"
    );

    wrapper.unmount();
  });

  it("save prop changes", async () => {
    const availableUnitSystems = new Set<UnitSystemKey>([
      "metric",
      "imperial",
      "usSurvey",
    ]);
    const settingsEntry = getQuantityFormatsSettingsManagerEntry(10, {
      initialQuantityType: QuantityType.LengthEngineering,
      availableUnitSystems,
    });
    expect(settingsEntry.itemPriority).to.eql(10);

    const wrapper = render(
      <div>
        <ModalDialogRenderer />
        {settingsEntry.page}
      </div>
    );

    const setButton = wrapper.getByRole("button", {
      name: "settings.quantity-formatting.setButtonLabel",
    });
    expect(setButton.hasAttribute("aria-disabled")).toEqual(true);

    const clearButton = wrapper.getByRole("button", {
      name: "settings.quantity-formatting.clearButtonLabel",
    });
    expect(clearButton.hasAttribute("aria-disabled")).toEqual(true);

    const checkbox = wrapper.getByTestId("show-unit-label-checkbox");
    fireEvent.click(checkbox);
    await waitFor(() => {
      expect(setButton.hasAttribute("aria-disabled")).toEqual(false);
    });

    fireEvent.click(setButton);
    await waitFor(() => {
      expect(setButton.hasAttribute("aria-disabled")).toEqual(true);
    });
    expect(clearButton.hasAttribute("aria-disabled")).toEqual(false);

    fireEvent.click(clearButton);
    await waitFor(() => {
      expect(clearButton.hasAttribute("aria-disabled")).toEqual(true);
    });
  });

  it("will trigger modal and save prop changes", async () => {
    const availableUnitSystems = new Set<UnitSystemKey>([
      "metric",
      "imperial",
      "usSurvey",
    ]);
    const settingsEntry = getQuantityFormatsSettingsManagerEntry(10, {
      initialQuantityType: QuantityType.LengthEngineering,
      availableUnitSystems,
    });
    expect(settingsEntry.itemPriority).to.eql(10);

    const wrapper = render(
      <div>
        <ModalDialogRenderer />
        {settingsEntry.page}
      </div>
    );

    const checkbox = wrapper.getByTestId("show-unit-label-checkbox");
    fireEvent.click(checkbox);

    const categoryEntry = wrapper.getByRole("option", {
      name: "QuantityType.Stationing.label",
    });
    fireEvent.click(categoryEntry);
  });

  it("will trigger modal and don't save prop changes", async () => {
    const availableUnitSystems = new Set<UnitSystemKey>([
      "metric",
      "imperial",
      "usSurvey",
    ]);
    const settingsEntry = getQuantityFormatsSettingsManagerEntry(10, {
      initialQuantityType: QuantityType.LengthEngineering,
      availableUnitSystems,
    });
    expect(settingsEntry.itemPriority).to.eql(10);

    const wrapper = render(
      <div>
        <ModalDialogRenderer />
        {settingsEntry.page}
      </div>
    );

    const checkbox = wrapper.getByTestId("show-unit-label-checkbox");
    fireEvent.click(checkbox);
    await TestUtils.flushAsyncOperations();

    const dataValueSelector = `li[data-value='QuantityTypeEnumValue-7']`;
    const categoryEntry = wrapper.container.querySelector(dataValueSelector);
    expect(categoryEntry).toBeTruthy();
    fireEvent.click(categoryEntry!);
    await TestUtils.flushAsyncOperations();

    const noButton = wrapper.getByRole("button", { name: "dialog.no" });
    fireEvent.click(noButton);
    await TestUtils.flushAsyncOperations();

    wrapper.unmount();
  });

  it("will trigger modal by event from settings manager and don't save prop changes", async () => {
    const availableUnitSystems = new Set<UnitSystemKey>([
      "metric",
      "imperial",
      "usSurvey",
    ]);
    const settingsEntry = getQuantityFormatsSettingsManagerEntry(10, {
      initialQuantityType: QuantityType.LengthEngineering,
      availableUnitSystems,
    });
    expect(settingsEntry.itemPriority).to.eql(10);

    const wrapper = render(
      <div>
        <ModalDialogRenderer />
        {settingsEntry.page}
      </div>
    );

    const checkbox = wrapper.getByTestId("show-unit-label-checkbox");
    const addListenerSpy = vi.spyOn(
      UiFramework.settingsManager.onProcessSettingsTabActivation,
      "addListener"
    );
    fireEvent.click(checkbox);

    // Wait that the handler have been updated, otherwise it compares with the previous version...
    // Visual change already have been processed but scope didnt upddate.
    await waitFor(() => {
      expect(addListenerSpy).toHaveBeenCalled();
    });

    act(() => {
      UiFramework.settingsManager.onProcessSettingsTabActivation.emit({
        requestedSettingsTabId: "unknown",
        tabSelectionFunc: () => {},
      });
    });

    const noButton = wrapper.getByRole("button", { name: "dialog.no" });
    fireEvent.click(noButton);
  });
});
