/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { expect, test } from "@playwright/test";
import { openComponentExamples } from "../Utils";

test("status bar left section test", async ({ page, baseURL }) => {
  await openComponentExamples(page, baseURL);

  await page.getByRole("button", { name: "StatusBar", exact: true }).click();

  const statusBarLeftSection = page
    .locator("div")
    .filter({ hasText: /^Status-Bar-Left-Section$/ })
    .first();
  await expect(statusBarLeftSection).toHaveScreenshot();
});
