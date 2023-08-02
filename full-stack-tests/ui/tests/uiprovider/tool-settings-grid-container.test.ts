/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { expect, test } from "@playwright/test";
import { openComponentExamples } from "../Utils";

test("tool settings grid container test", async ({ page }) => {
  await openComponentExamples(page);

  await page.getByRole("button", { name: "UiProvider", exact: true }).click();

  const toolSettingsGridContainer = page
    .locator("div")
    .filter({ hasText: /^User:$/ })
    .nth(1);
  await expect(toolSettingsGridContainer).toHaveScreenshot();
});
