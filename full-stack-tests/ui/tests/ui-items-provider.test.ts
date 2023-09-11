/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Locator, Page, expect, test } from "@playwright/test";
import assert from "assert";
import {
  dragTab,
  expectTabInPanelSection,
  runKeyin,
  tabLocator,
} from "./Utils";

test.describe("UiItemsProvider", () => {
  test.beforeEach(async ({ page, baseURL }) => {
    assert(baseURL);
    await page.goto(`${baseURL}?frontstage=appui-test-providers:WidgetApi`);
  });

  test("should provide widgets", async ({ page }) => {
    const tab = tabLocator(page, "W1");
    await expect(tab).not.toBeVisible();
    await runKeyin(page, "uiprovider register W1-provider");
    await expect(tab).toBeVisible();

    await runKeyin(page, "uiprovider unregister W1-provider");
    await expect(tab).not.toBeVisible();
  });

  test("should maintain widget position", async ({ page }) => {
    const tab = tabLocator(page, "W1");
    await runKeyin(page, "uiprovider register W1-provider");
    await expectTabInPanelSection(tab, "right", 0);

    const targetTab = tabLocator(page, "WL-A");
    await dragTab(tab, targetTab);
    await expectTabInPanelSection(tab, "left", 0);

    await runKeyin(page, "uiprovider unregister W1-provider");
    await runKeyin(page, "uiprovider register W1-provider");
    await expectTabInPanelSection(tab, "left", 0, "after re-register");
  });
});
