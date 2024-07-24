/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { expect, test } from "@playwright/test";
import { openComponentExamples } from "../Utils";

test("accudraw cursor popup test", async ({ page, baseURL }) => {
  await openComponentExamples(page, baseURL);

  await page.getByRole("button", { name: "AccuDraw", exact: true }).click();

  await page.getByRole("button", { name: "Open/Close Accudraw Cursor Popup" }).click();

  const accudrawCursorPopup = page.getByTestId("cursorpopup-accudrawCursorPopup");
  await expect(
    accudrawCursorPopup.getByTestId("uifw-accudraw-distance")
  ).toBeVisible();
  await expect(
    accudrawCursorPopup.getByTestId("uifw-accudraw-angle")
  ).toBeVisible();
  await expect(accudrawCursorPopup).toHaveScreenshot();
});
