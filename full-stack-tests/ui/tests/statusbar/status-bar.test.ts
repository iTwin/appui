/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { expect, test } from "@playwright/test";
import { openComponentExamples } from "../Utils";

test('status bar test', async ({ page }) => {
  await openComponentExamples(page);

  await page.getByRole('button', { name: 'StatusBar', exact: true }).click();

  const statusBar = page.locator('div').filter({ hasText: /^Messages0Snap Mode$/ }).first();
  await expect(statusBar).toHaveScreenshot()
});
