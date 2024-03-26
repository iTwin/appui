/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { fireEvent, render, within } from "@testing-library/react";
import type { UnitSystemKey } from "@itwin/core-quantity";
import { UnitSystemSelector } from "../../appui-react/settings/quantityformatting/UnitSystemSelector";
import { waitForPosition } from "../TestUtils";

describe("UnitSystemSelector", () => {
  it("will render four systems", async () => {
    const spy = vi.fn();
    const availableUnitSystems = new Set<UnitSystemKey>([
      "metric",
      "imperial",
      "usSurvey",
      "usCustomary",
    ]);
    const wrapper = render(
      <UnitSystemSelector
        onUnitSystemSelected={spy}
        selectedUnitSystemKey="metric"
        availableUnitSystems={availableUnitSystems}
      />
    );

    const selectButton = within(
      wrapper.getByTestId("unitSystemSelector")
    ).getByRole("combobox");
    fireEvent.click(selectButton);
    await waitForPosition();

    const menu = wrapper.getAllByRole("listbox").find((element) => {
      return within(element).queryByText("presentationUnitSystem.Metric");
    })!;
    fireEvent.click(
      within(menu).getByText("presentationUnitSystem.USCustomary")
    );
    sinon.assert.calledOnce(spy);
  });

  it("will render three systems", async () => {
    const spy = vi.fn();
    const availableUnitSystems = new Set<UnitSystemKey>([
      "metric",
      "imperial",
      "usSurvey",
    ]);
    const wrapper = render(
      <UnitSystemSelector
        onUnitSystemSelected={spy}
        selectedUnitSystemKey="usCustomary"
        availableUnitSystems={availableUnitSystems}
      />
    );

    const selectButton = within(
      wrapper.getByTestId("unitSystemSelector")
    ).getByRole("combobox");
    fireEvent.click(selectButton);
    await waitForPosition();

    const menu = wrapper.getAllByRole("listbox").find((element) => {
      return within(element).queryByText("presentationUnitSystem.Metric");
    })!;
    fireEvent.click(within(menu).getByText("presentationUnitSystem.USSurvey"));
    sinon.assert.calledOnce(spy);
  });
});
