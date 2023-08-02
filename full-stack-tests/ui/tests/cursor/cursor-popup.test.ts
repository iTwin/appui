/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { expect, test } from "@playwright/test";
import { openComponentExamples } from "../Utils";

test("cursor popup test", async ({ page }) => {
  await openComponentExamples(page);

  await page.getByRole("button", { name: "Cursor", exact: true }).click();

  await page
    .getByRole("button", { name: "Open Cursor Popup", exact: true })
    .click();
  //TODO: remove following line and uncomment the two lines under after cursor popup component example fix. Set CURSORPOPUP to actual cursor popup
  await expect(page).toHaveScreenshot();
  //const cursorPopup = CURSORPOPUP;
  //await expect(cursorPopup).toHaveScreenshot();
});
