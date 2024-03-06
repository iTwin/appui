/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { expect, test } from "@playwright/test";
import { openComponentExamples } from "../Utils";

test("accudraw dialog test", async ({ page, baseURL }) => {
  await openComponentExamples(page, baseURL);

  await page.getByRole("button", { name: "AccuDraw", exact: true }).click();

  await page.getByRole("button", { name: "Open Accudraw Dialog" }).click();

  const accudrawDialog = page.getByTestId("core-dialog-container");
  await expect(
    accudrawDialog.getByRole("img", { name: "distance" })
  ).toBeVisible();
  await expect(
    accudrawDialog.getByRole("img", { name: "angle" })
  ).toBeVisible();
  await expect(accudrawDialog).toHaveScreenshot();
});
