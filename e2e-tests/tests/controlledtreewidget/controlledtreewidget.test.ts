/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { expect, test } from "@playwright/test";
import { openComponentExamples } from "../Utils";

test("controlled tree widget test", async ({ page, baseURL }) => {
  await openComponentExamples(page, baseURL);

  await page
    .getByRole("button", { name: "Controlled Tree Widget", exact: true })
    .click();

  await page
    .getByRole("button", { name: "Expand", exact: true })
    .first()
    .click();

  await page
    .getByRole("button", { name: "Expand", exact: true })
    .first()
    .click();

  const treeSample = page.locator(".tree-widget-tree-container");
  await expect(treeSample).toHaveScreenshot();
});
