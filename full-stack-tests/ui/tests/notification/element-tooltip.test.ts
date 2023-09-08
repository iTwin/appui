/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { expect, test } from "@playwright/test";
import { openComponentExamples } from "../Utils";

test("element tooltip test", async ({ page, baseURL }) => {
  await openComponentExamples(page, baseURL);

  await page.getByRole("button", { name: "Notification", exact: true }).click();

  await page.getByRole("button", { name: "Open Element Tooltip" }).click();

  const elementTooltip = page.getByText("Testing element tool tip message");
  await expect(elementTooltip).toHaveScreenshot();
});
