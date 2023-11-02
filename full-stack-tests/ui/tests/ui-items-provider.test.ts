/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Locator, Page, expect, test } from "@playwright/test";
import assert from "assert";
import {
  backstageItemLocator,
  dragTab,
  expectTabInPanelSection,
  runKeyin,
  statusBarItemLocator,
  tabLocator,
  toolbarItemLocator,
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

test.describe("UiItemsProvider v2", () => {
  test.beforeEach(async ({ page, baseURL }) => {
    assert(baseURL);
    await page.goto(`${baseURL}?frontstage=appui-test-providers:WidgetApi`);
  });

  const providerId = "appui-test-providers:updated";
  const registerKeyin = `uiprovider register ${providerId}`;
  const unregisterKeyin = `uiprovider unregister ${providerId}`;

  async function expectProviderItem(locator: Locator) {
    const page = locator.page();
    await expect(locator).not.toBeVisible();

    await runKeyin(page, registerKeyin);
    await expect(locator).toBeVisible();

    await runKeyin(page, unregisterKeyin);
    await expect(locator).not.toBeVisible();
  }

  test("should provide toolbar items", async ({ page }) => {
    const locator = toolbarItemLocator(page, "Updated toolbar item");
    await expectProviderItem(locator);
  });

  test("should provide status bar items", async ({ page }) => {
    const locator = statusBarItemLocator(page, "Updated status bar item");
    await expectProviderItem(locator);
  });

  test("should provide backstage items", async ({ page }) => {
    const locator = backstageItemLocator(page, "Updated backstage item");
    await expectProviderItem(locator);
  });

  test("should provide widgets", async ({ page }) => {
    const locator = tabLocator(page, "Updated widget");
    await expectProviderItem(locator);
  });
});
