/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { expect, test } from "@playwright/test";
import { popoutWidget, tabLocator, widgetLocator } from "./Utils";

test("should style in popout", async ({ page }) => {
  await page.goto("/blank?frontstageId=itwinui-v2");

  const tab = tabLocator(page, "iTwinUI v2");
  const widget = widgetLocator({
    tab,
  });
  const popoutPage = await popoutWidget(widget);

  const actions = popoutPage.getByRole("button", { name: "Actions" });
  await actions.click();

  const menu = popoutPage.getByRole("menu");
  await expect(menu).toHaveScreenshot();
});
