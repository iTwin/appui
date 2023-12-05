/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { test, expect } from "@playwright/test";
import assert from "assert";
import {
  WidgetState,
  expectSavedFrontstageState,
  floatingWidgetLocator,
  openFrontstage,
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
    const popoutButton = widget.locator('[title="Pop out active widget tab"]');
    await expect(tab).toBeVisible();

    const [popoutPage] = await Promise.all([
      context.waitForEvent("page"),
      popoutButton.click(),
    ]);
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
    const popoutButton = widget.locator('[title="Pop out active widget tab"]');
    await expect(tab).toBeVisible();

    const [popoutPage] = await Promise.all([
      context.waitForEvent("page"),
      popoutButton.click(),
    ]);
    await expect(popoutPage.locator("body")).toHaveScreenshot();
  });

  test("should float a popout widget (after frontstage change)", async ({
    context,
    page,
  }) => {
    const tab = tabLocator(page, "View Attributes");
    const widget = widgetLocator({ tab });
    const popoutButton = widget.locator('[title="Pop out active widget tab"]');

    // Popout the widget w/ default size.
    let [popoutPage] = await Promise.all([
      context.waitForEvent("page"),
      popoutButton.click(),
    ]);
    expect(popoutPage.isClosed()).toBe(false);

    await openFrontstage(page, "appui-test-app:main-stage");
    expect(popoutPage.isClosed()).toBe(true);

    await openFrontstage(page, "appui-test-providers:WidgetApi");
    expect(popoutPage.isClosed()).toBe(true);

    const floatingWidget = floatingWidgetLocator({ tab });
    await expect(floatingWidget).toBeVisible();
  });

  test("should maintain popout widget bounds", async ({ context, page }) => {
    const tab = tabLocator(page, "View Attributes");
    const widget = widgetLocator({ tab });
    const popoutButton = widget.locator('[title="Pop out active widget tab"]');

    // Popout the widget w/ default size.
    let [popoutPage] = await Promise.all([
      context.waitForEvent("page"),
      popoutButton.click(),
    ]);
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

    // Popout the widget.
    [popoutPage] = await Promise.all([
      context.waitForEvent("page"),
      popoutButton.click(),
    ]);
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
    const popoutButton = widget.locator('[title="Pop out active widget tab"]');

    // Popout the widget w/ default size.
    let [popoutPage] = await Promise.all([
      context.waitForEvent("page"),
      popoutButton.click(),
    ]);
    await expect(popoutPage).toHaveTitle(/View Attributes/);

    // Update widget size and close the popout.
    await popoutPage.setViewportSize({
      height: 400,
      width: 300,
    });
    await popoutPage.close({ runBeforeUnload: true });

    // TODO: ATM need to activate the tab, since the widget is not floating after window is closed
    await tab.click();
    await expect(tab).toHaveClass(/nz-active/);

    await expectSavedFrontstageState(context, (state) => {
      return (
        state.nineZone.widgets.leftStart?.activeTabId ===
        "appui-test-providers:ViewAttributesWidget"
      );
    });

    await page.reload();

    // Popout the widget.
    [popoutPage] = await Promise.all([
      context.waitForEvent("page"),
      popoutButton.click(),
    ]);
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
    const popoutButton = widget.locator('[title="Pop out active widget tab"]');

    const [popoutPage] = await Promise.all([
      context.waitForEvent("page"),
      popoutButton.click(),
    ]);
    await popoutPage.waitForLoadState(); // TODO: childWindow is only added after 'load' event
    expect(popoutPage.isClosed()).toBe(false);

    await setWidgetState(
      page,
      "appui-test-providers:ViewAttributesWidget",
      WidgetState.Floating
    );
    await expect.poll(async () => popoutPage.isClosed()).toBe(true);
  });
  test("should render popout, mount content to WidgetContainer, and then set widget to floating", async ({
    context,
    page,
  }) => {
    const id = "appui-test-providers:PopoutMountUnmountWidget";
    const widgetLifecycle = trackWidgetLifecycle(page, id);
    const widget = floatingWidgetLocator({
      page,
      id,
    });
    const popoutButton = widget.locator('[title="Pop out active widget tab"]');

    const [popoutPage] = await Promise.all([
      context.waitForEvent("page"),
      popoutButton.click(),
    ]);
    await popoutPage.waitForLoadState(); // TODO: childWindow is only added after 'load' event
    expect(popoutPage.isClosed()).toBe(false);

    popoutPage.close();

    await setWidgetState(page, id, WidgetState.Floating);
    await expect.poll(async () => popoutPage.isClosed()).toBe(true);
    // Due to the change to Popouts where `WidgetContentContainer` is displayed instead of a React Node. The actual widget is no longer unmounted
    // and is simply sent to a different `WidgetContentContainer`. That's why the unmount count was changed to 0 here.
    expect(widgetLifecycle.mountCount).toBe(1);
    expect(widgetLifecycle.unMountCount).toBe(0);
  });
});
