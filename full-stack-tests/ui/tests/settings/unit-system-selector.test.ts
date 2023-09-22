/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { expect, test } from "@playwright/test";
import { openComponentExamples } from "../Utils";

test("unit system selector test", async ({ page, baseURL }) => {
  await openComponentExamples(page, baseURL);

  await page.getByRole("button", { name: "Settings", exact: true }).click();

  const unitSystemSelector = page
    .locator("div")
    .filter({ hasText: /^Presentation Unit SystemMetric$/ })
    .first();
  await expect(unitSystemSelector).toHaveScreenshot();
});
