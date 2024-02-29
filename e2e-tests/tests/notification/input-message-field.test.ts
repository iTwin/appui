/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { expect, test } from "@playwright/test";
import { openComponentExamples } from "../Utils";

test("input message field test", async ({ page, baseURL }) => {
  await openComponentExamples(page, baseURL);

  await page.getByRole("button", { name: "Notification", exact: true }).click();

  await page.getByRole("button", { name: "Open Input Message Field" }).click();

  const inputMessageField = page
    .getByTestId("focus-trap-div")
    .locator("div")
    .first();
  await expect(inputMessageField).toHaveScreenshot();
});
