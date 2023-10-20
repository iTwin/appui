/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { render } from "@testing-library/react";
import type { UnitSystemKey } from "@itwin/core-quantity";
import { UnitSystemSelector } from "../../appui-react/settings/quantityformatting/UnitSystemSelector";
import TestUtils, {
  handleError,
  selectChangeValueByText,
  selectTestOptionCount,
  stubScrollIntoView,
} from "../TestUtils";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";

describe("UnitSystemSelector", () => {
  beforeAll(async () => {
    await TestUtils.initializeUiFramework();
  });

  afterAll(() => {
    TestUtils.terminateUiFramework();
  });

  stubScrollIntoView();

  it("will render four systems", () => {
    const onChangedSpy = vi.fn();
    const availableUnitSystems = new Set<UnitSystemKey>([
      "metric",
      "imperial",
      "usSurvey",
      "usCustomary",
    ]);
    const wrapper = render(
      <UnitSystemSelector
        onUnitSystemSelected={onChangedSpy}
        selectedUnitSystemKey="metric"
        availableUnitSystems={availableUnitSystems}
      />
    );

    // expect(wrapper.container.querySelectorAll("option").length).to.eq(4);
    const selectButton = wrapper.getByTestId("unitSystemSelector");
    // fireEvent.change(selectButton, { target: { value: "usCustomary" } });
    selectTestOptionCount(selectButton, 4, handleError);
    selectChangeValueByText(
      selectButton,
      "presentationUnitSystem.USCustomary",
      handleError
    );
    expect(onChangedSpy).toHaveBeenCalled();
    wrapper.unmount();
  });

  it("will render three systems", () => {
    const onChangedSpy = vi.fn();
    const availableUnitSystems = new Set<UnitSystemKey>([
      "metric",
      "imperial",
      "usSurvey",
    ]);
    const wrapper = render(
      <UnitSystemSelector
        onUnitSystemSelected={onChangedSpy}
        selectedUnitSystemKey="usCustomary"
        availableUnitSystems={availableUnitSystems}
      />
    );

    // expect(wrapper.container.querySelectorAll("option").length).to.eq(3);
    const selectButton = wrapper.getByTestId("unitSystemSelector");
    // fireEvent.change(selectButton, { target: { value: "usSurvey" } });
    selectTestOptionCount(selectButton, 3, handleError);
    selectChangeValueByText(
      selectButton,
      "presentationUnitSystem.USSurvey",
      handleError
    );
    expect(onChangedSpy).toHaveBeenCalled();
    wrapper.unmount();
  });
});
