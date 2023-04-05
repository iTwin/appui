/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { expect, Page, test } from '@playwright/test';
import assert from 'assert';
import { frontstageLocator, panelLocator, tabLocator, widgetLocator } from './Utils';


test.describe("stage panel def", () => {
  test.beforeEach(async ({ page, baseURL }) => {
    assert(baseURL);
    await page.goto(`${baseURL}?frontstage=appui-test-providers:WidgetApi`);
  });

  test("should toggle pin state of stage panel", async ({ page }) => {
    const panel = panelLocator({ page, side: "right" });
    const pinToggle = panel.locator(".nz-widget-pinToggle");

    const layoutInfoTab = tabLocator(page, "Layout Info");
    await layoutInfoTab.click();
    const layoutInfoWidget = widgetLocator({ tab: layoutInfoTab });
    const pinned = layoutInfoWidget.getByText("pinned=");
    await expect(pinned).toHaveText("pinned=true");

    await pinToggle.click();
    await expect(pinned).toHaveText("pinned=false");

    await pinToggle.click();
    await expect(pinned).toHaveText("pinned=true");
  });

  test("should change stage panel size", async ({ page }) => {
    const panel = panelLocator({ page, side: "right" });
    const handlePos = await panel.locator(".nz-grip-container").locator(".nz-handle").boundingBox() ?? { x: 0, y: 0, width: 0, height: 0 };
    handlePos.x += handlePos.width / 2 + 3;
    handlePos.y += handlePos.height / 2;

    const layoutInfoTab = tabLocator(page, "Layout Info");
    await layoutInfoTab.click();
    const layoutInfoWidget = widgetLocator({ tab: layoutInfoTab });
    const size = layoutInfoWidget.getByText("size=");
    await expect(size).toHaveText("size=200px");

    await page.mouse.move(handlePos.x, handlePos.y);
    await page.mouse.down();

    await page.mouse.move(handlePos.x - 50, handlePos.y);
    await expect(size).toHaveText("size=250px");

    await page.mouse.move(handlePos.x - 40, handlePos.y);
    await expect(size).toHaveText("size=240px");
  });
});