/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { expect, Page, test } from "@playwright/test";
import assert from "assert";
import { tabLocator, widgetLocator } from "./Utils";

test.describe("error boundary", () => {
  test.beforeEach(async ({ page, baseURL }) => {
    assert(baseURL);
    await page.goto(`${baseURL}/blank?frontstageId=widget-api`);
  });

  test("should catch an error", async ({ page }) => {
    const tab = tabLocator(page, "Layout Controls");
    const widget = widgetLocator({ tab });

    const button = widget.getByRole("button", { name: "Click Me" });
    const error = widget.getByRole("alert");

    await expect(error).not.toBeVisible();
    await button.click();
    await expect(error).toBeVisible();
  });
});
