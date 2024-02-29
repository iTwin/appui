/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { expect, test } from "@playwright/test";
import { openComponentExamples } from "../Utils";

test("ui settings page test", async ({ page, baseURL }) => {
  await openComponentExamples(page, baseURL);

  await page.getByRole("button", { name: "Settings", exact: true }).click();

  const uiSettingsPage = page
    .locator("div:nth-child(4) > div:nth-child(2)")
    .first();
  await expect(uiSettingsPage).toHaveScreenshot();
});
