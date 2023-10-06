/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { expect, test } from "@playwright/test";
import { openComponentExamples } from "../Utils";

test("basic navigation widget test", async ({ page, baseURL }) => {
  await openComponentExamples(page, baseURL);

  await page.getByRole("button", { name: "Widget", exact: true }).click();

  const basicNavigationWidget = page
    .locator(".nz-widget-navigationArea")
    .first();
  await expect(basicNavigationWidget).toHaveScreenshot();
});
