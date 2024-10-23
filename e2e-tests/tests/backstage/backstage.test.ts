/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { expect, test } from "@playwright/test";

test("backstage test", async ({ page }) => {
  await page.goto("./blank?frontstageId=widget-api");
  await page.locator(".nz-toolbar-button-button").click();
  await page.getByRole("menuitem", { name: "Component Examples" }).click();

  await page.getByRole("button", { name: "Backstage", exact: true }).click();

  await page.getByRole("button", { name: "Open Backstage" }).click();

  const backstage = page.getByRole("menu").filter({
    hasText: "View iModelReview iModel",
  });
  await expect(backstage).toHaveScreenshot();
});
