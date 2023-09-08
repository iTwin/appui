/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { expect, test } from "@playwright/test";
import { openComponentExamples } from "../Utils";

test("content layout test", async ({ page, baseURL }) => {
  await openComponentExamples(page, baseURL);

  await page.getByRole("button", { name: "Content", exact: true }).click();

  await page
    .locator("div")
    .filter({ hasText: /^Split PaneOpen Fullscreen$/ })
    .getByRole("button", { name: "Open Fullscreen" })
    .click();
  await expect(page).toHaveScreenshot();
});
