/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { expect, test } from "@playwright/test";
import { openComponentExamples } from "../Utils";

test("cursor popup menu test", async ({ page, baseURL }) => {
  await openComponentExamples(page, baseURL);

  await page.getByRole("button", { name: "Cursor", exact: true }).click();

  await page.getByRole("button", { name: "Open Cursor Popup Menu" }).click();

  const cursorPopupMenu = page.getByText(
    "Menu Item 1Menu Item 2Submenu Item 1Submenu Item 2"
  );
  await expect(cursorPopupMenu).toHaveScreenshot();
});
