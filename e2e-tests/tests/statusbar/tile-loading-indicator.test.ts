/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { expect, test } from "@playwright/test";
import { openComponentExamples } from "../Utils";

test.skip("FLAKY:tile loading indicator test", async ({ page, baseURL }) => {
  await openComponentExamples(page, baseURL);

  await page.getByRole("button", { name: "StatusBar", exact: true }).click();

  const tileLoadingIndicator = page
    .locator("div:nth-child(4) > div:nth-child(2)")
    .first();
  await expect(tileLoadingIndicator).toHaveScreenshot();
});
