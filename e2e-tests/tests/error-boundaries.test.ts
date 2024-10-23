/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { expect, test } from "@playwright/test";
import { popoutWidget, tabLocator, widgetLocator } from "./Utils";

test.describe("error boundary tests", () => {
  test("should catch an error", async ({ page }) => {
    await page.goto("./blank?frontstageId=test-popout");
    const tab = tabLocator(page, "Error widget");
    const widget = widgetLocator({ tab });

    const button = widget.getByRole("button", { name: "Throw Error" });
    const error = widget.getByRole("alert");

    await expect(error).not.toBeVisible();
    await button.click();
    await expect(error).toBeVisible();
  });

  test("should catch an error when widget is popped out and reparentPopoutWidgets is false", async ({
    page,
  }) => {
    await page.goto("./blank?frontstageId=test-popout");
    const tab = tabLocator(page, "Error widget");
    const widget = widgetLocator({ tab });

    const popoutPage = await popoutWidget(widget);
    const button = popoutPage.getByRole("button", { name: "Throw Error" });
    const error = popoutPage.getByRole("alert");

    await expect(error).not.toBeVisible();
    await button.click();
    await expect(error).toBeVisible();
  });

  test("should catch an error when widget is popped out and reparentPopoutWidgets is true", async ({
    page,
  }) => {
    await page.goto("./blank?frontstageId=test-popout&reparentPopoutWidgets=1");
    const tab = tabLocator(page, "Error widget");
    const widget = widgetLocator({ tab });

    const popoutPage = await popoutWidget(widget);
    const button = popoutPage.getByRole("button", { name: "Throw Error" });
    const error = popoutPage.getByRole("alert");

    await expect(error).not.toBeVisible();
    await button.click();
    await expect(error).toBeVisible();
  });
});
