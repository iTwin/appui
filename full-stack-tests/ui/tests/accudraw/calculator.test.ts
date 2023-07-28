/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { expect, test } from "@playwright/test";
import { openComponentExamples } from "../Utils";

test('calculator test', async ({ page }) => {
  await openComponentExamples(page);

  await page.getByRole('button', { name: 'AccuDraw', exact: true }).click();

  const calculator = page.locator('div:nth-child(5) > div:nth-child(2)').first();
  await expect(calculator).toHaveScreenshot();
});
