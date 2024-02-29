/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { expect, test } from "@playwright/test";
import { openComponentExamples } from "../Utils";

test("position popup test", async ({ page, baseURL }) => {
  await openComponentExamples(page, baseURL);

  await page.getByRole("button", { name: "Popup", exact: true }).click();

  await page.getByRole("button", { name: "Open Position Popup" }).click();

  const positionPopup = page.getByText("Position Popup Content");
  await expect(positionPopup).toHaveScreenshot();
});
