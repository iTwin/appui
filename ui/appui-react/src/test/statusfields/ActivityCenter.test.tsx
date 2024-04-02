/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";
import {
  ActivityCenterField,
  MessageManager,
  StatusBar,
} from "../../appui-react";

describe("ActivityCenter", () => {
  it("should show ActivityCenterField", async () => {
    const { findByText, findByTitle } = render(
      <StatusBar>
        <ActivityCenterField />
      </StatusBar>
    );
    const message = "Test";
    const percentage = 50;
    MessageManager.setupActivityMessageValues(message, percentage);

    await findByText("50 activityCenter.percentComplete");
    await findByTitle("Test-activityCenter.moreDetails");
  });

  it("should hide ActivityCenterField", async () => {
    const { findByText, queryAllByText } = render(
      <StatusBar>
        <ActivityCenterField />
      </StatusBar>
    );

    MessageManager.setupActivityMessageValues("Test", 50);
    await findByText(/activityCenter.percentComplete/);

    MessageManager.endActivityMessage(false);
    await waitFor(() => {
      expect(queryAllByText(/activityCenter.percentComplete/)).to.length(0);
    });
  });

  it("click should be handled", async () => {
    const { findByTitle } = render(
      <StatusBar>
        <ActivityCenterField />
      </StatusBar>
    );

    MessageManager.setupActivityMessageValues("Test", 50);
    const field = await findByTitle(/activityCenter.moreDetails/);

    const spy = vi.spyOn(MessageManager, "setupActivityMessageValues");
    fireEvent.click(field);
    expect(spy).toHaveBeenCalledOnce();
  });
});
