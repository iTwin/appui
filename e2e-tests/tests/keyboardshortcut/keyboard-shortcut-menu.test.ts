/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { expect, test } from "@playwright/test";
import { openComponentExamples } from "../Utils";

test("keyboard shortcut menu test", async ({ page, baseURL }) => {
  await openComponentExamples(page, baseURL);

  await page
    .getByRole("button", { name: "KeyboardShortcut", exact: true })
    .click();

  await page
    .getByRole("button", { name: "Open Keyboard Shortcut Menu" })
    .click();

  const keyboardShortcutMenu = page
    .getByRole("menu")
    .filter({ hasText: "M AccuDraw Tests" });
  await expect(keyboardShortcutMenu).toHaveScreenshot();
});
