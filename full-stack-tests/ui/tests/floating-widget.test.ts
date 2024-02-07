/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { expect, Page, test } from "@playwright/test";
import assert from "assert";
import {
  dragWidget,
  expectSavedFrontstageState,
  floatingWidgetLocator,
  frontstageLocator,
  outlineLocator,
  panelLocator,
  setWidgetState,
  tabLocator,
  titleBarHandleLocator,
  widgetLocator,
  WidgetState,
} from "./Utils";

test.describe("floating widget", () => {
  test.beforeEach(async ({ page, baseURL }) => {
    assert(baseURL);
    await page.goto(`${baseURL}?frontstage=appui-test-providers:WidgetApi`);
  });

  test("should float a panel section", async ({ page }) => {
    const tab = tabLocator(page, "WL-1");
    const widget = widgetLocator({ tab });
    const floatingWidget = floatingWidgetLocator({ tab });

    await expect(floatingWidget).not.toBeVisible();

    await dragWidget(widget, {
      targetPosition: {
        x: 300,
        y: 200,
      },
    });

    await expect(floatingWidget).toBeVisible();
  });

  test("should float a tab", async ({ page }) => {
    const tab = tabLocator(page, "WR-A");
    const frontstage = frontstageLocator(page);
    const floatingWidget = floatingWidgetLocator({ tab });

    await expect(floatingWidget).not.toBeVisible();

    await tab.dragTo(frontstage, {
      targetPosition: {
        x: 300,
        y: 200,
      },
    });

    await expect(floatingWidget).toBeVisible();
  });

  test("should maintain a floating widget (after reload)", async ({
    context,
    page,
  }) => {
    const tab = tabLocator(page, "WL-1");
    const widget = widgetLocator({ tab });
    const floatingWidget = floatingWidgetLocator({ tab });

    await dragWidget(widget, {
      targetPosition: {
        x: 300,
        y: 200,
      },
    });
    const bounds = await floatingWidget.boundingBox();
    expect(bounds).toBeDefined();

    await expectSavedFrontstageState(context, (state) => {
      const widgets = Object.values(state.nineZone.widgets);
      const widget = widgets.find((w) => w.tabs.indexOf("WL-1") >= 0);
      if (!widget) return false;
      const floatingWidgetIndex = state.nineZone.floatingWidgets.allIds.indexOf(
        widget.id
      );
      return floatingWidgetIndex >= 0;
    });
    await page.reload();
    const newBounds = await floatingWidget.boundingBox();
    expect(newBounds).toEqual(bounds);
  });

  test.skip("FLAKY:should drag a floating widget", async ({ page }) => {
    const tab = tabLocator(page, "FW-1");
    const widget = widgetLocator({ tab });
    const titleBarHandle = titleBarHandleLocator(widget);
    const body = page.locator("body");

    const initialBounds = (await widget.boundingBox())!;
    await titleBarHandle.dispatchEvent("mousedown", {
      clientX: initialBounds.x,
      clientY: initialBounds.y,
    });
    await body.dispatchEvent("mousemove", {
      clientX: initialBounds.x + 1,
      clientY: initialBounds.y + 1,
    });
    await body.dispatchEvent("mousemove", {
      clientX: initialBounds.x + 21,
      clientY: initialBounds.y + 31,
    });
    await body.dispatchEvent("mouseup");

    const bounds = (await widget.boundingBox())!;
    expect(bounds.x).toEqual(initialBounds.x + 20);
    expect(bounds.y).toEqual(initialBounds.y + 30);
  });

  test("should drag a floating widget (in 'header' mode)", async ({
    page,
    baseURL,
  }) => {
    assert(baseURL);
    await page.goto(
      `${baseURL}?frontstage=appui-test-providers:WidgetApi&mode=header`
    );

    const tab = tabLocator(page, "FW-1");
    const widget = widgetLocator({ tab });
    const titleBarHandle = titleBarHandleLocator(widget);
    const body = page.locator("body");

    const initialBounds = (await widget.boundingBox())!;
    await titleBarHandle.dispatchEvent("mousedown", {
      clientX: initialBounds.x,
      clientY: initialBounds.y,
    });
    await body.dispatchEvent("mousemove", {
      clientX: initialBounds.x + 1,
      clientY: initialBounds.y + 1,
    });
    await body.dispatchEvent("mousemove", {
      clientX: initialBounds.x + 21,
      clientY: initialBounds.y + 31,
    });
    await body.dispatchEvent("mouseup");

    const bounds = (await widget.boundingBox())!;
    expect(bounds.x).toEqual(initialBounds.x + 20);
    expect(bounds.y).toEqual(initialBounds.y + 30);
  });

  test.skip("FLAKY:should contain floating widget (user sized)", async ({
    page,
  }) => {
    const tab = tabLocator(page, "FW-1");
    const widget = widgetLocator({ tab });
    const titleBarHandle = titleBarHandleLocator(widget);
    const body = page.locator("body");
    const frontstage = frontstageLocator(page);
    const frontstageBounds = (await frontstage.boundingBox())!;

    const initialBounds = (await widget.boundingBox())!;
    await titleBarHandle.dispatchEvent("mousedown", {
      clientX: initialBounds.x,
      clientY: initialBounds.y,
    });
    await titleBarHandle.dispatchEvent("mousemove", {
      clientX: initialBounds.x + 1,
      clientY: initialBounds.y + 1,
    });
    await body.dispatchEvent("mousemove", {
      clientX: frontstageBounds.width - 30,
      clientY: frontstageBounds.height - 30,
    });
    await body.dispatchEvent("mouseup");

    const bounds = (await widget.boundingBox())!;
    expect(bounds.x + bounds.width).toEqual(frontstageBounds.width);
    expect(bounds.y + bounds.height).toEqual(frontstageBounds.height);
  });

  test("should contain floating widget (auto sized)", async ({ page }) => {
    const tab = tabLocator(page, "View Attributes");
    const widget = widgetLocator({ tab });
    const titleBarHandle = titleBarHandleLocator(widget);
    const body = page.locator("body");
    const frontstage = frontstageLocator(page);
    const frontstageBounds = (await frontstage.boundingBox())!;

    const initialBounds = (await widget.boundingBox())!;
    await titleBarHandle.dispatchEvent("mousedown", {
      clientX: initialBounds.x,
      clientY: initialBounds.y,
    });
    await titleBarHandle.dispatchEvent("mousemove", {
      clientX: initialBounds.x + 1,
      clientY: initialBounds.y + 1,
    });
    await body.dispatchEvent("mousemove", {
      clientX: frontstageBounds.width - 30,
      clientY: frontstageBounds.height - 30,
    });
    await body.dispatchEvent("mouseup");

    const bounds = (await widget.boundingBox())!;
    expect(bounds.x + bounds.width).toEqual(frontstageBounds.width);
    expect(bounds.y + bounds.height).toEqual(frontstageBounds.height);
  });
});

test.describe("floating widget send back outline", () => {
  test.beforeEach(async ({ page, baseURL }) => {
    assert(baseURL);
    await page.goto(`${baseURL}?frontstage=appui-test-providers:WidgetApi`);
  });

  test("should show a widget (with tab) outline", async ({ page }) => {
    const tab = tabLocator(page, "FW-1");
    const floatingWidget = floatingWidgetLocator({ tab });
    const sendBackButton = floatingWidget.getByTitle("Send to panel");

    const destTab = tabLocator(page, "WL-A");
    const [widgetOutline, tabOutline] = outlineLocator({ tab: destTab });

    await expect(widgetOutline).not.toBeVisible();
    await expect(tabOutline).not.toBeVisible();
    await sendBackButton.hover();
    await expect(widgetOutline).toBeVisible();
    await expect(tabOutline).toBeVisible();
    await page.mouse.move(0, 0);
    await expect(widgetOutline).not.toBeVisible();
    await expect(tabOutline).not.toBeVisible();
  });

  test("should show a panel outline", async ({ page }) => {
    await setWidgetState(page, "WL-A", WidgetState.Hidden);
    await setWidgetState(page, "WL-1", WidgetState.Hidden);
    await setWidgetState(page, "WL-2", WidgetState.Hidden);
    await setWidgetState(page, "WL-3", WidgetState.Hidden);

    const tab = tabLocator(page, "FW-1");
    const floatingWidget = floatingWidgetLocator({ tab });
    const sendBackButton = floatingWidget.getByTitle("Send to panel");

    const outline = outlineLocator({ page, side: "left" });

    await expect(outline).not.toBeVisible();
    await sendBackButton.hover();
    await expect(outline).toBeVisible();
    await page.mouse.move(0, 0);
    await expect(outline).not.toBeVisible();
  });

  test("should show a top section outline", async ({ page }) => {
    await setWidgetState(page, "WL-A", WidgetState.Hidden);

    const tab = tabLocator(page, "FW-1");
    const floatingWidget = floatingWidgetLocator({ tab });
    const sendBackButton = floatingWidget.getByTitle("Send to panel");

    const panel = panelLocator({ page, side: "left" });
    const outline = outlineLocator({ panel, sectionId: 0 });

    await expect(outline).not.toBeVisible();
    await sendBackButton.hover();
    await expect(outline).toBeVisible();
    await page.mouse.move(0, 0);
    await expect(outline).not.toBeVisible();
  });

  test("should show a bottom section outline", async ({ page }) => {
    const tab = tabLocator(page, "WL-1");
    const frontstage = frontstageLocator(page);

    await tab.dragTo(frontstage, {
      targetPosition: {
        x: 300,
        y: 200,
      },
    });

    const floatingWidget = floatingWidgetLocator({ tab });
    const sendBackButton = floatingWidget.getByTitle("Send to panel");

    await setWidgetState(page, "WL-2", WidgetState.Hidden);
    await setWidgetState(page, "WL-3", WidgetState.Hidden);

    const panel = panelLocator({ page, side: "left" });
    const outline = outlineLocator({ panel, sectionId: 1 });

    await expect(outline).not.toBeVisible();
    await sendBackButton.hover();
    await expect(outline).toBeVisible();
    await page.mouse.move(0, 0);
    await expect(outline).not.toBeVisible();
  });
});
