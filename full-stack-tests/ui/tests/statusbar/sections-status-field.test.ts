/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { expect, test } from "@playwright/test";
import { openComponentExamples } from "../Utils";

test('sections status field test', async ({ page }) => {
  await openComponentExamples(page);

  await page.getByRole('button', { name: 'StatusBar', exact: true }).click();

  //page.waitForSelector('div');
  //await page.locator('div').filter({ hasText: /^Sections Status Field\.cls-1\{opacity:0\.5;isolation:isolate;\}$/ }).getByRole('button').click();
  const sectionsStatusField = page.locator('div:nth-child(6) > div:nth-child(2)');
  await expect(sectionsStatusField).toHaveScreenshot()
});
