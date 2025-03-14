/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { expect, test } from "@playwright/test";
import { openComponentExamples } from "../Utils";

test("backstage app button test", async ({ page, baseURL }) => {
  await openComponentExamples(page, baseURL);

  await page.getByRole("button", { name: "Widget", exact: true }).click();

  const backstageAppButton = page
    .getByRole("button", {
      name: "Open backstage menu",
    })
    .first();
  await expect(backstageAppButton).toHaveScreenshot();
});
