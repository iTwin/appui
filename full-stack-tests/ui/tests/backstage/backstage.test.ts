/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { expect, test } from "@playwright/test";
import { openComponentExamples } from "../Utils";

test("backstage test", async ({ page, baseURL }) => {
  await openComponentExamples(page, baseURL);

  await page.getByRole("button", { name: "Backstage", exact: true }).click();

  await page.getByRole("button", { name: "Open Backstage" }).click();

  const backstage = page.locator("#uifw-configurableui-wrapper div").filter({
    hasText:
      "View iModelReview iModelSimple viewportSimple custom frontstageCustom Contentfro",
  });
  await expect(backstage).toHaveScreenshot();
});
