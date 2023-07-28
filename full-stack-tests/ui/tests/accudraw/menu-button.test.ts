/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { expect, test } from "@playwright/test";
import { openComponentExamples } from "../Utils";

test('menu button test', async ({ page }) => {
  await openComponentExamples(page);

  await page.getByRole('button', { name: 'AccuDraw', exact: true }).click();

  const menuButton = page.locator('.uifw-menu-button > .iui-button');
  await expect(menuButton).toHaveScreenshot();
});
