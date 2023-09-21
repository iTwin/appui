/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { expect, test } from "@playwright/test";
import { openComponentExamples } from "../Utils";

test("status bar space between test", async ({ page, baseURL }) => {
  await openComponentExamples(page, baseURL);

  await page.getByRole("button", { name: "StatusBar", exact: true }).click();

  const statusBarSpaceBetween = page
    .locator("div")
    .filter({ hasText: /^Status-Bar-Space-Between$/ })
    .first();
  await expect(statusBarSpaceBetween).toHaveScreenshot();
});
