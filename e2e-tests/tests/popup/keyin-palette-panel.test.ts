/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { expect, test } from "@playwright/test";
import { openComponentExamples } from "../Utils";

test("keyin palette panel test", async ({ page, baseURL }) => {
  await openComponentExamples(page, baseURL);

  await page.getByRole("button", { name: "Popup", exact: true }).click();

  const keyinPalettePanel = page
    .locator(".uifw-position-popup", {
      has: page.getByRole("option", { name: "keyin one" }),
    })
    .last();
  await expect(keyinPalettePanel).toHaveScreenshot();
});
