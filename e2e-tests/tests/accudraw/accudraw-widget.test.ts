/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { expect, test } from "@playwright/test";
import { openComponentExamples } from "../Utils";

test("accudraw widget test", async ({ page, baseURL }) => {
  await openComponentExamples(page, baseURL);

  await page.getByRole("button", { name: "AccuDraw", exact: true }).click();

  const accudrawWidget = page
    .locator("div")
    .filter({ hasText: /^distanceangle$/ })
    .first();
  await expect(accudrawWidget).toHaveScreenshot();
});
