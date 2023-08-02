/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { expect, test } from "@playwright/test";
import { openComponentExamples } from "../Utils";

test("status bar dialog title bar test", async ({ page }) => {
  await openComponentExamples(page);

  await page.getByRole("button", { name: "StatusBar", exact: true }).click();

  const statusBarDialogTitleBar = page
    .locator("div")
    .filter({ hasText: /^Status Bar Dialog Title$/ })
    .nth(1);
  await expect(statusBarDialogTitleBar).toHaveScreenshot();
});
