/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { expect, test } from "@playwright/test";
import { openComponentExamples } from "../Utils";

test("content dialog test", async ({ page, baseURL }) => {
  await openComponentExamples(page, baseURL);

  await page.getByRole("button", { name: "Dialog", exact: true }).click();

  await page.getByRole("button", { name: "Open Content Dialog" }).click();

  const contentDialog = page.getByTestId("core-dialog-container");
  await expect(contentDialog).toHaveScreenshot();
});
