/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { expect, test } from "@playwright/test";
import { openComponentExamples } from "../Utils";

test("pointer message test", async ({ page, baseURL }) => {
  await openComponentExamples(page, baseURL);

  await page.getByRole("button", { name: "Notification", exact: true }).click();

  await page.getByRole("button", { name: "Open Pointer Message" }).click();

  const pointerMessage = page
    .locator("div")
    .filter({
      hasText: /^This is the brief messageThis is the detailed message$/,
    })
    .first();
  await expect(pointerMessage).toHaveScreenshot();
});
