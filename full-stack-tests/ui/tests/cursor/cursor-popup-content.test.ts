/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { expect, test } from "@playwright/test";
import { openComponentExamples } from "../Utils";

test("cursor popup content test", async ({ page }) => {
  await openComponentExamples(page);

  await page.getByRole("button", { name: "Cursor", exact: true }).click();

  const cursorPopupContent = page.getByText("Hello world");
  await expect(cursorPopupContent).toHaveScreenshot();
});
