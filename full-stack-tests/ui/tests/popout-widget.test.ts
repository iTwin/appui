/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { test, expect, Locator, BrowserContext } from "@playwright/test";
import assert from "assert";
import {
  WidgetState,
  expectSavedFrontstageState,
  floatingWidgetLocator,
  openFrontstage,
  panelSectionLocator,
  popoutButtonLocator,
  setWidgetState,
  tabLocator,
  trackWidgetLifecycle,
  widgetLocator,
} from "./Utils";

test.describe("popout widget", () => {
  test.beforeEach(async ({ page, baseURL }) => {
    assert(baseURL);
    await page.goto(`${baseURL}?frontstage=appui-test-providers:WidgetApi`);
  });

  test("should popout a widget", async ({ context, page }) => {
    const widget = floatingWidgetLocator({
      page,
      id: "appui-test-providers:ViewAttributesWidget",
    });
    const tab = tabLocator(page, "View Attributes");
    await expect(tab).toBeVisible();

    const popoutPage = await popoutWidget(context, widget);
    await expect(popoutPage).toHaveTitle(/View Attributes/);

    await expect(tab).not.toBeVisible();
    expect(await popoutPage.title()).toEqual("View Attributes");
  });

  test("should apply styles to popout", async ({ context, page }) => {
    const widget = floatingWidgetLocator({
      page,
      id: "appui-test-providers:ViewAttributesWidget",
    });
    const tab = tabLocator(page, "View Attributes");
    await expect(tab).toBeVisible();

    const popoutPage = await popoutWidget(context, widget);
    await expect(popoutPage.locator("body")).toHaveScreenshot();
  });

  test("should float a popout widget (after frontstage change)", async ({
    context,
    page,
  }) => {
    const tab = tabLocator(page, "View Attributes");
    const widget = widgetLocator({ tab });

    const popoutPage = await popoutWidget(context, widget);
    expect(popoutPage.isClosed()).toBe(false);

    await openFrontstage(page, "appui-test-app:main-stage");
    expect(popoutPage.isClosed()).toBe(true);

    await openFrontstage(page, "appui-test-providers:WidgetApi");
    expect(popoutPage.isClosed()).toBe(true);

    const floatingWidget = floatingWidgetLocator({ tab });
    await expect(floatingWidget).toBeVisible();
  });

  test("should dock a popout widget (after frontstage change)", async ({
    context,
    page,
  }) => {
    const tab = tabLocator(page, "WT-2");
    const widget = widgetLocator({ tab });

    const popoutPage = await popoutWidget(context, widget);
    expect(popoutPage.isClosed()).toBe(false);

    await openFrontstage(page, "appui-test-app:main-stage");
    expect(popoutPage.isClosed()).toBe(true);

    await openFrontstage(page, "appui-test-providers:WidgetApi");
    expect(popoutPage.isClosed()).toBe(true);

    const locator = panelSectionLocator(page, "top", 1, { has: tab });
    await expect(locator).toBeVisible();
  });

  test("should maintain popout widget bounds", async ({ context, page }) => {
    const tab = tabLocator(page, "View Attributes");
    const widget = widgetLocator({ tab });

    // Popout the widget w/ default size.
    let popoutPage = await popoutWidget(context, widget);
    await expect(popoutPage).toHaveTitle(/View Attributes/);

    expect(popoutPage.viewportSize()).toEqual({
      height: 270,
      width: 218,
    });

    // Update widget size and close the popout.
    await popoutPage.setViewportSize({
      height: 400,
      width: 300,
    });
    await popoutPage.close({ runBeforeUnload: true });

    // TODO: ATM need to activate the tab, since the widget is not floating after window is closed
    await tab.click();
    await expect(tab).toHaveClass(/nz-active/);

    popoutPage = await popoutWidget(context, widget);
    expect(popoutPage.viewportSize()).toEqual({
      height: 400,
      width: 300,
    });
  });

  test("should maintain popout widget bounds (after reload)", async ({
    context,
    page,
  }) => {
    const tab = tabLocator(page, "View Attributes");
    const widget = widgetLocator({ tab });

    let popoutPage = await popoutWidget(context, widget);
    await expect(popoutPage).toHaveTitle(/View Attributes/);

    // Update widget size and close the popout.
    await popoutPage.setViewportSize({
      height: 400,
      width: 300,
    });
    await popoutPage.close({ runBeforeUnload: true });

    await expectSavedFrontstageState(context, (state) => {
      return (
        state.nineZone.widgets["appui-test-providers:ViewAttributesWidget"]
          ?.activeTabId === "appui-test-providers:ViewAttributesWidget"
      );
    });

    await page.reload();

    popoutPage = await popoutWidget(context, widget);
    expect(popoutPage.viewportSize()).toEqual({
      height: 400,
      width: 300,
    });
  });

  test("should close a popout (when floating a widget)", async ({
    context,
    page,
  }) => {
    const widget = floatingWidgetLocator({
      page,
      id: "appui-test-providers:ViewAttributesWidget",
    });

    const popoutPage = await popoutWidget(context, widget);
    await popoutPage.waitForLoadState(); // TODO: childWindow is only added after 'load' event
    expect(popoutPage.isClosed()).toBe(false);

    await setWidgetState(
      page,
      "appui-test-providers:ViewAttributesWidget",
      WidgetState.Floating
    );
    await expect.poll(async () => popoutPage.isClosed()).toBe(true);
  });

  test("should not unmount when widget is popped out", async ({
    context,
    page,
  }) => {
    const id = "appui-test-providers:PopoutMountUnmountWidget";
    const widgetLifecycle = trackWidgetLifecycle(page, id);
    const widget = floatingWidgetLocator({
      page,
      id,
    });

    const popoutPage = await popoutWidget(context, widget);
    expect(popoutPage.isClosed()).toBe(false);

    await popoutPage.close();

    expect(widgetLifecycle.mountCount).toBe(1);
    expect(widgetLifecycle.unMountCount).toBe(0);
  });
});

async function popoutWidget(context: BrowserContext, widget: Locator) {
  const popoutButton = popoutButtonLocator(widget);
  const [popoutPage] = await Promise.all([
    context.waitForEvent("page"),
    popoutButton.click(),
  ]);
  return popoutPage;
}
