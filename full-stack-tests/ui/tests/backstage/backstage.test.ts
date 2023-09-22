/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { expect, test } from "@playwright/test";

test("backstage test with snapshotPath", async ({ page, baseURL }) => {
  await page.goto(
    `${baseURL}?frontstage=appui-test-providers:WidgetApi&snapshotPath=D:/model`
  );
  await page.locator(".nz-toolbar-button-button").click();
  await page.getByRole("menuitem", { name: "Component Examples" }).click();

  await page.getByRole("button", { name: "Backstage", exact: true }).click();

  await page.getByRole("button", { name: "Open Backstage" }).click();

  const backstage = page.locator("#uifw-configurableui-wrapper div").filter({
    hasText:
      "View iModelReview iModelSimple viewportSimple custom frontstageCustom Contentfro",
  });
  await expect(backstage).toHaveScreenshot();
});

test("backstage test without snapshotPath", async ({ page, baseURL }) => {
  await page.goto(
    `${baseURL}?frontstage=appui-test-providers:WidgetApi&snapshotPath=`
  );
  await page.locator(".nz-toolbar-button-button").click();
  await page.getByRole("menuitem", { name: "Component Examples" }).click();

  await page.getByRole("button", { name: "Backstage", exact: true }).click();

  await page.getByRole("button", { name: "Open Backstage" }).click();

  const backstage = page.locator("#uifw-configurableui-wrapper div").filter({
    hasText:
      "View iModelReview iModelSimple viewportSimple custom frontstageCustom Contentfro",
  });
  await expect(backstage).toHaveScreenshot();
});
