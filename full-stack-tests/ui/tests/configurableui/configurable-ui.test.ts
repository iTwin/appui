/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { expect, test } from "@playwright/test";
import { openComponentExamples } from "../Utils";

test("configurable ui test", async ({ page, baseURL }) => {
  await openComponentExamples(page, baseURL);

  await page
    .getByRole("button", { name: "ConfigurableUi", exact: true })
    .click();

  const configurableUi = page
    .locator(".component-examples-items > div:nth-child(3) > div:nth-child(2)")
    .first();
  await expect(configurableUi).toHaveScreenshot();
});
