/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { expect, Page, test } from "@playwright/test";
import assert from "assert";
import { popoutWidget, tabLocator, widgetLocator } from "./Utils";

async function testWidgetNotPoppedOut(page: Page) {
  const tab = tabLocator(page, "Error border widget");
  const widget = widgetLocator({ tab });

  const button = widget.getByRole("button", { name: "Click Me" });
  const error = widget.getByRole("alert");

  await expect(error).not.toBeVisible();
  await button.click();
  await expect(error).toBeVisible();
}

async function testWidgetPoppedOut(page: Page) {
  const tab = tabLocator(page, "Error border widget");
  const widget = widgetLocator({ tab });

  const popoutPage = await popoutWidget(widget);
  const button = popoutPage.getByRole("button", { name: "Click Me" });
  const error = popoutPage.getByRole("alert");

  await expect(error).not.toBeVisible();
  await button.click();
  await expect(error).toBeVisible();
}

test.describe("error boundary when reparentPopoutWidgets is true", () => {
  test.beforeEach(async ({ page, baseURL }) => {
    assert(baseURL);
    await page.goto(
      `${baseURL}/blank?frontstageId=test-popout&reparentPopoutWidgets=1`
    );
  });

  test("should catch an error when widget is not popped out", async ({
    page,
  }) => {
    await testWidgetNotPoppedOut(page);
  });

  test("should catch an error when widget is popped out", async ({ page }) => {
    await testWidgetPoppedOut(page);
  });
});

test.describe("error boundary when reparentPopoutWidgets is false", () => {
  test.beforeEach(async ({ page, baseURL }) => {
    assert(baseURL);
    await page.goto(`${baseURL}/blank?frontstageId=test-popout`);
  });

  test("should catch an error when widget is not popped out", async ({
    page,
  }) => {
    await testWidgetNotPoppedOut(page);
  });

  test("should catch an error when widget is popped out", async ({ page }) => {
    await testWidgetPoppedOut(page);
  });
});
