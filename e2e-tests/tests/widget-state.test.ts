/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { test, expect } from "@playwright/test";
import assert from "assert";
import {
  activeTabLocator,
  dragTab,
  expectSavedFrontstageState,
  expectTabInPanelSection,
  floatingWidgetLocator,
  openFrontstage,
  panelLocator,
  setWidgetState,
  tabLocator,
  trackWidgetLifecycle,
  widgetLocator,
  WidgetState,
} from "./Utils";

test.describe("widget state", () => {
  test.beforeEach(async ({ page, baseURL }) => {
    assert(baseURL);
    await page.goto(`${baseURL}/blank?frontstageId=widget-api`);
  });

  test("should hide a floating widget", async ({ page }) => {
    const widget = floatingWidgetLocator({
      page,
      id: "appui-test-providers:ViewAttributesWidget",
    });
    const tab = tabLocator(page, "View Attributes");
    await expect(tab).toBeVisible();
    await expect(widget).toBeVisible();

    await setWidgetState(
      page,
      "appui-test-providers:ViewAttributesWidget",
      WidgetState.Hidden
    );
    await expect(tab).not.toBeVisible();
    await expect(widget).not.toBeVisible();

    await setWidgetState(
      page,
      "appui-test-providers:ViewAttributesWidget",
      WidgetState.Open
    );
    await expect(tab).toBeVisible();
    await expect(widget).toBeVisible();
  });

  test("should hide a floating widget (multiple tabs)", async ({ page }) => {
    const widget = floatingWidgetLocator({
      page,
      id: "appui-test-providers:floating-widget",
    });
    const tab1 = tabLocator(page, "FW-1");
    const tab2 = tabLocator(page, "FW-2");
    const tab3 = tabLocator(page, "FW-3");
    await expect(tab1).toBeVisible();
    await expect(tab2).toBeVisible();
    await expect(tab3).toBeVisible();
    await expect(widget).toBeVisible();

    await setWidgetState(page, "FW-1", WidgetState.Hidden);
    await expect(tab1).not.toBeVisible();
    await expect(tab2).toBeVisible();
    await expect(tab3).toBeVisible();
    await expect(widget).toBeVisible();

    await setWidgetState(page, "FW-2", WidgetState.Hidden);
    await expect(tab1).not.toBeVisible();
    await expect(tab2).not.toBeVisible();
    await expect(tab3).toBeVisible();
    await expect(widget).toBeVisible();

    await setWidgetState(page, "FW-3", WidgetState.Hidden);
    await expect(tab1).not.toBeVisible();
    await expect(tab2).not.toBeVisible();
    await expect(tab3).not.toBeVisible();
    await expect(widget).not.toBeVisible();

    await setWidgetState(page, "FW-1", WidgetState.Open);
    await expect(tab1).toBeVisible();
    await expect(tab2).not.toBeVisible();
    await expect(tab3).not.toBeVisible();
    await expect(widget).toBeVisible();
  });

  test("should maintain active tab when widgets are hidden", async ({
    page,
  }) => {
    const widget = floatingWidgetLocator({
      page,
      id: "appui-test-providers:floating-widget",
    });
    const activeTab = activeTabLocator(widget);
    await expect(activeTab).toHaveAttribute("data-item-id", "FW-1");

    await setWidgetState(page, "FW-1", WidgetState.Hidden);
    await expect(activeTab).toHaveAttribute("data-item-id", "FW-2");

    await setWidgetState(page, "FW-2", WidgetState.Hidden);
    await expect(activeTab).toHaveAttribute("data-item-id", "FW-3");

    await setWidgetState(page, "FW-3", WidgetState.Hidden);
    await expect(activeTab).not.toBeVisible();

    await setWidgetState(page, "FW-2", WidgetState.Open);
    await expect(activeTab).toHaveAttribute("data-item-id", "FW-2");

    await setWidgetState(page, "FW-1", WidgetState.Closed);
    await expect(activeTab).toHaveAttribute("data-item-id", "FW-2");

    await setWidgetState(page, "FW-3", WidgetState.Open);
    await expect(activeTab).toHaveAttribute("data-item-id", "FW-3");
  });

  test("should maintain bounds of a hidden floating widget", async ({
    page,
  }) => {
    await setWidgetState(page, "FW-2", WidgetState.Hidden);
    await setWidgetState(page, "FW-3", WidgetState.Hidden);

    const widget = floatingWidgetLocator({
      page,
      id: "appui-test-providers:floating-widget",
    });
    const widgetBounds = await widget.boundingBox();
    expect(widgetBounds).toBeDefined();

    await setWidgetState(page, "FW-1", WidgetState.Hidden);
    await expect(widget).not.toBeVisible();

    await setWidgetState(page, "FW-1", WidgetState.Open);
    const newWidgetBounds = await widget.boundingBox();
    expect(newWidgetBounds).toEqual(widgetBounds);
  });

  test("should maintain bounds of a hidden floating widget (after reload)", async ({
    context,
    page,
  }) => {
    await setWidgetState(page, "FW-2", WidgetState.Hidden);
    await setWidgetState(page, "FW-3", WidgetState.Hidden);

    const widget = floatingWidgetLocator({
      page,
      id: "appui-test-providers:floating-widget",
    });
    const widgetBounds = await widget.boundingBox();
    expect(widgetBounds).toBeDefined();

    await setWidgetState(page, "FW-1", WidgetState.Hidden);
    await expect(widget).not.toBeVisible();

    // Wait for "FW-1" state to be saved before reloading.
    await expectSavedFrontstageState(context, (state) => {
      return state.nineZone.savedTabs.allIds.indexOf("FW-1") >= 0;
    });

    await page.reload();

    await setWidgetState(page, "FW-1", WidgetState.Open);
    const newWidgetBounds = await widget.boundingBox();
    expect(newWidgetBounds).toEqual(widgetBounds);
  });

  test("should maintain location of a hidden panel widget (after frontstage change)", async ({
    context,
    page,
  }) => {
    const tab = tabLocator(page, "WT-2");
    await expectTabInPanelSection(tab, "top", 1);

    await setWidgetState(page, "WT-2", WidgetState.Hidden);
    await expectSavedFrontstageState(context, (state) => {
      return state.nineZone.savedTabs.allIds.indexOf("WT-2") >= 0;
    });

    await openFrontstage(page, "main");

    await openFrontstage(page, "widget-api");
    await setWidgetState(page, "WT-2", WidgetState.Open);
    await expectTabInPanelSection(tab, "top", 1);
  });

  test("should maintain location of a panel widget (after reload)", async ({
    context,
    page,
  }) => {
    const tab1 = tabLocator(page, "WT-A");
    const tab2 = tabLocator(page, "WT-2");
    await expectTabInPanelSection(tab1, "top", 0);

    // Drag from top start to top end.
    await dragTab(tab1, tab2);
    await expectTabInPanelSection(tab1, "top", 1);

    await setWidgetState(page, "WT-A", WidgetState.Hidden);
    await expectSavedFrontstageState(context, (state) => {
      return state.nineZone.savedTabs.allIds.indexOf("WT-A") >= 0;
    });
    await page.reload();

    await setWidgetState(page, "WT-A", WidgetState.Open);
    await expectTabInPanelSection(tab1, "top", 1);
  });

  test("should hide a panel section", async ({ page }) => {
    const panel = panelLocator({ page, side: "left" });
    const widget = widgetLocator({ panel });
    const tab = tabLocator(page, "WL-A");
    await expect(tab).toBeVisible();
    await expect(widget).toHaveCount(2);

    await setWidgetState(page, "WL-A", WidgetState.Hidden);
    await expect(tab).not.toBeVisible();
    await expect(widget).toHaveCount(1);
  });

  test("should hide a panel section (multiple tabs)", async ({ page }) => {
    const panel = panelLocator({ page, side: "left" });
    const widget = widgetLocator({ panel });
    const tab1 = tabLocator(page, "WL-1");
    const tab2 = tabLocator(page, "WL-2");
    const tab3 = tabLocator(page, "WL-3");
    await expect(tab1).toBeVisible();
    await expect(tab2).toBeVisible();
    await expect(tab3).toBeVisible();
    await expect(widget).toHaveCount(2);

    await setWidgetState(page, "WL-1", WidgetState.Hidden);
    await expect(tab1).not.toBeVisible();
    await expect(tab2).toBeVisible();
    await expect(tab3).toBeVisible();
    await expect(widget).toHaveCount(2);

    await setWidgetState(page, "WL-2", WidgetState.Hidden);
    await expect(tab1).not.toBeVisible();
    await expect(tab2).not.toBeVisible();
    await expect(tab3).toBeVisible();
    await expect(widget).toHaveCount(2);

    await setWidgetState(page, "WL-3", WidgetState.Hidden);
    await expect(tab1).not.toBeVisible();
    await expect(tab2).not.toBeVisible();
    await expect(tab3).not.toBeVisible();
    await expect(widget).toHaveCount(1);

    await setWidgetState(page, "WL-1", WidgetState.Open);
    await expect(tab1).toBeVisible();
    await expect(tab2).not.toBeVisible();
    await expect(tab3).not.toBeVisible();
    await expect(widget).toHaveCount(2);
  });

  test("should hide a panel", async ({ page }) => {
    const panel = panelLocator({ page, side: "left" });
    const widget = widgetLocator({ panel });
    await expect(panel).toBeVisible();
    await expect(widget).toHaveCount(2);

    await setWidgetState(page, "WL-A", WidgetState.Hidden);
    await expect(panel).toBeVisible();
    await expect(widget).toHaveCount(1);

    await setWidgetState(page, "WL-1", WidgetState.Hidden);
    await setWidgetState(page, "WL-2", WidgetState.Hidden);
    await setWidgetState(page, "WL-3", WidgetState.Hidden);
    await expect(panel).not.toBeVisible();
    await expect(widget).toHaveCount(0);

    await setWidgetState(page, "WL-1", WidgetState.Open);
    await expect(panel).toBeVisible();
    await expect(widget).toHaveCount(1);

    await setWidgetState(page, "WL-A", WidgetState.Open);
    await expect(panel).toBeVisible();
    await expect(widget).toHaveCount(2);
  });

  test("should float a widget that is hidden by default", async ({ page }) => {
    const tab = tabLocator(page, "FW-H1");
    await expect(tab).toBeHidden();

    await setWidgetState(page, "FW-H1", WidgetState.Floating);
    await expect(tab).toBeVisible();
  });

  test("should not mount unloaded widget", async ({ page }) => {
    const widgetLifecycle = trackWidgetLifecycle(page, "WL-B");
    const tab = tabLocator(page, "WL-B");
    await expect(tab).toBeHidden();

    expect(widgetLifecycle.mountCount).toBe(0);
    expect(widgetLifecycle.unMountCount).toBe(0);
  });
});

test.describe("widget lifecycle", () => {
  test.beforeEach(async ({ page, baseURL }) => {
    assert(baseURL);
    await page.goto(`${baseURL}/blank?frontstageId=widget-api&strict=0`);
  });

  test("should mount unloaded widget on open", async ({ page }) => {
    const widgetLifecycle = trackWidgetLifecycle(page, "WL-B");
    await setWidgetState(page, "WL-B", WidgetState.Open);

    expect(widgetLifecycle.mountCount).toBe(1);
    expect(widgetLifecycle.unMountCount).toBe(0);
  });

  test("should mount unloaded widget on close", async ({ page }) => {
    const widgetLifecycle = trackWidgetLifecycle(page, "WL-B");
    await setWidgetState(page, "WL-B", WidgetState.Closed);

    expect(widgetLifecycle.mountCount).toBe(1);
    expect(widgetLifecycle.unMountCount).toBe(0);
  });

  test("should mount unloaded widget on float", async ({ page }) => {
    const widgetLifecycle = trackWidgetLifecycle(page, "WL-B");
    await setWidgetState(page, "WL-B", WidgetState.Floating);

    expect(widgetLifecycle.mountCount).toBe(1);
    expect(widgetLifecycle.unMountCount).toBe(0);
  });

  test("should unmount and hide widget when unloading", async ({ page }) => {
    const tab = tabLocator(page, "WL-A");
    await expect(tab).toBeVisible({ timeout: 10000 });
    const widgetLifecycle = trackWidgetLifecycle(page, "WL-A");
    expect(widgetLifecycle.mountCount).toBe(0);
    expect(widgetLifecycle.unMountCount).toBe(0);

    await setWidgetState(page, "WL-A", WidgetState.Unloaded);
    await expect(tab).not.toBeVisible();
    expect(widgetLifecycle.mountCount).toBe(0);
    expect(widgetLifecycle.unMountCount).toBe(1);
  });

  test("should mount and unmount unloaded widget", async ({ page }) => {
    const widgetLifecycle = trackWidgetLifecycle(page, "WL-B");
    const tab = tabLocator(page, "WL-B");
    await setWidgetState(page, "WL-B", WidgetState.Open);
    await setWidgetState(page, "WL-B", WidgetState.Unloaded);
    await expect(tab).toBeHidden();
    expect(widgetLifecycle.mountCount).toBe(1);
    expect(widgetLifecycle.unMountCount).toBe(1);
  });
});
