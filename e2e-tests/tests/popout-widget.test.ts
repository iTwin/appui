/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { test, expect } from "@playwright/test";
import {
  WidgetState,
  expectSavedFrontstageState,
  expectTabInPanelSection,
  floatingWidgetLocator,
  openFrontstage,
  panelSectionLocator,
  popoutWidget,
  setWidgetState,
  tabLocator,
  trackConsole,
  widgetLocator,
} from "./Utils";

test.describe("popout widget", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("./blank?frontstageId=widget-api");
  });

  test("should popout a widget", async ({ page }) => {
    const widget = floatingWidgetLocator({
      page,
      id: "appui-test-providers:ViewAttributesWidget",
    });
    const tab = tabLocator(page, "View Attributes");
    await expect(tab).toBeVisible();

    const popoutPage = await popoutWidget(widget);
    await expect(popoutPage).toHaveTitle(/View Attributes/);

    await expect(tab).not.toBeVisible();
    expect(await popoutPage.title()).toEqual("View Attributes");
  });

  test("should apply styles to popout", async ({ page }) => {
    const widget = floatingWidgetLocator({
      page,
      id: "appui-test-providers:ViewAttributesWidget",
    });
    const tab = tabLocator(page, "View Attributes");
    await expect(tab).toBeVisible();

    const popoutPage = await popoutWidget(widget);
    await expect(popoutPage.locator("body")).toHaveScreenshot();
  });

  test("should float a popout widget (after frontstage change)", async ({
    page,
  }) => {
    const tab = tabLocator(page, "View Attributes");
    const widget = widgetLocator({ tab });

    const popoutPage = await popoutWidget(widget);
    await expect.poll(async () => popoutPage.isClosed()).toBe(false);

    await openFrontstage(page, "main");
    await expect.poll(async () => popoutPage.isClosed()).toBe(true);

    await openFrontstage(page, "widget-api");
    await expect.poll(async () => popoutPage.isClosed()).toBe(true);

    const floatingWidget = floatingWidgetLocator({ tab });
    await expect(floatingWidget).toBeVisible();
  });

  test("should dock a popout widget (after frontstage change)", async ({
    page,
  }) => {
    const tab = tabLocator(page, "WT-2");
    const widget = widgetLocator({ tab });

    const popoutPage = await popoutWidget(widget);
    await expect.poll(async () => popoutPage.isClosed()).toBe(false);

    await openFrontstage(page, "main");
    await expect.poll(async () => popoutPage.isClosed()).toBe(true);

    await openFrontstage(page, "widget-api");
    await expect.poll(async () => popoutPage.isClosed()).toBe(true);

    const locator = panelSectionLocator(page, "top", 1, { has: tab });
    await expect(locator).toBeVisible();
  });

  test("should maintain popout widget bounds", async ({ page }) => {
    const tab = tabLocator(page, "View Attributes");
    const widget = widgetLocator({ tab });

    // Popout the widget w/ default size.
    let popoutPage = await popoutWidget(widget);
    await expect(popoutPage).toHaveTitle(/View Attributes/);

    const size = popoutPage.viewportSize();
    expect(size?.height).toEqual(270);
    expect(size?.width).toBeGreaterThanOrEqual(218);
    expect(size?.width).toBeLessThanOrEqual(219);

    // Update widget size and close the popout.
    await popoutPage.setViewportSize({
      height: 400,
      width: 300,
    });
    await popoutPage.close({ runBeforeUnload: true });

    // TODO: ATM need to activate the tab, since the widget is not floating after window is closed
    await tab.click();
    await expect(tab).toHaveClass(/nz-active/);

    popoutPage = await popoutWidget(widget);
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

    let popoutPage = await popoutWidget(widget);
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
          ?.activeTabId === "appui-test-providers:ViewAttributesWidget" &&
        !!state.nineZone.savedTabs.byId[
          "appui-test-providers:ViewAttributesWidget"
        ]
      );
    });

    await page.reload();

    popoutPage = await popoutWidget(widget);
    expect(popoutPage.viewportSize()).toEqual({
      height: 400,
      width: 300,
    });
  });

  test("should close a popout (when floating a widget)", async ({ page }) => {
    const widget = floatingWidgetLocator({
      page,
      id: "appui-test-providers:ViewAttributesWidget",
    });

    const popoutPage = await popoutWidget(widget);
    await expect.poll(async () => popoutPage.isClosed()).toBe(false);

    await setWidgetState(
      page,
      "appui-test-providers:ViewAttributesWidget",
      WidgetState.Floating
    );
    await expect.poll(async () => popoutPage.isClosed()).toBe(true);
  });

  test("should unmount when popped out widget is closed", async ({ page }) => {
    const id = "appui-test-providers:PopoutMountUnmountWidget";
    const widget = floatingWidgetLocator({
      page,
      id,
    });
    await expect(widget).toBeVisible();
    const logs = trackConsole(page);
    const popoutPage = await popoutWidget(widget);
    const text = popoutPage.getByText(id);
    await expect(text).toBeVisible();

    await popoutPage.close();

    await expect.poll(() => logs).toContain(`Widget ${id} mount`);
    await expect.poll(() => logs).toContain(`Widget ${id} unmount`);
  });
});

test("should copy styles", async ({ page }) => {
  await page.goto("./blank?frontstageId=test-popout");

  const tab = tabLocator(page, "Widget 1");
  const widget = widgetLocator({ tab });

  const popoutPage = await popoutWidget(widget);
  const borders = popoutPage.locator("#border-test");
  await expect(borders).toHaveScreenshot();
});

test("should copy shadow root styles", async ({ page }) => {
  await page.goto("./blank?frontstageId=test-popout&reparentPopoutWidgets=1");

  const tab = tabLocator(page, "Widget 1");
  const widget = widgetLocator({ tab });

  const popoutPage = await popoutWidget(widget);
  const borders = popoutPage.locator("#progress-radial");
  await expect(borders).toHaveScreenshot();
});

test("should render after link styles are loaded", async ({
  context,
  page,
}) => {
  context.route("**", (route) => route.continue());
  await page.goto("./blank?frontstageId=test-popout");

  const tab = tabLocator(page, "Widget 1");
  const widget = widgetLocator({ tab });
  await expect(widget).toBeVisible();

  const logs = trackConsole<{
    clientWidth: number;
    clientHeight: number;
  }>(page, async (msg) => {
    if (msg.text().includes("LinkTest")) {
      const val = await msg.args()[1].jsonValue();
      return val;
    }
  });

  await popoutWidget(widget);

  await expect.poll(() => logs[0]).toBeTruthy();
  expect(logs[0]).toEqual(
    expect.objectContaining({
      clientWidth: 10,
      clientHeight: 15,
    })
  );
});

test("useWidget hook", async ({ page }) => {
  await page.goto("./blank?frontstageId=widget-api");

  // TODO: make sure the widget is not overlaid. Need to split into smaller test frontstages.
  await setWidgetState(
    page,
    "appui-test-providers:UseWidgetHookWidget",
    WidgetState.Floating
  );

  const tab = tabLocator(page, "Use Widget Hook");
  const widget = floatingWidgetLocator({
    tab,
  });

  const popoutPage = await popoutWidget(widget);
  const widgetText = popoutPage.getByText(
    `{"state":0,"widgetLocation":"popout"}`
  );
  await expect(widgetText).toBeVisible();
});

for (const useDefaultPopoutUrl of [1, 0]) {
  test(`should return popout widget to main window (useDefaultPopoutUrl=${useDefaultPopoutUrl})`, async ({
    page,
  }) => {
    await page.goto(
      `./blank?frontstageId=test-popout&useDefaultPopoutUrl=${useDefaultPopoutUrl}`
    );

    const tab = tabLocator(page, "Widget 1");
    const widget = widgetLocator({ tab });

    const popoutPage = await popoutWidget(widget);
    await expect(popoutPage.getByText("Widget 1 content")).toBeVisible();

    await popoutPage.close();
    await expectTabInPanelSection(tab, "left", 0);
  });
}

test("should persist widget state with `reparentPopoutWidgets` enabled", async ({
  page,
}) => {
  await page.goto("./blank?frontstageId=test-popout&reparentPopoutWidgets=1");

  const increment = page.getByRole("button", { name: "Increment: " });
  await increment.click();
  await increment.click();
  await increment.click();
  await expect(increment).toHaveText("Increment: 3");

  const input = page.getByRole("textbox");
  await input.fill("test");
  await expect(input).toHaveValue("test");

  const tab = tabLocator(page, "State widget");
  const widget = widgetLocator({ tab });
  const popoutPage = await popoutWidget(widget);

  const popoutIncrement = popoutPage.getByRole("button", {
    name: "Increment: 3",
  });
  await expect(popoutIncrement).toBeVisible();

  const popoutInput = popoutPage.getByRole("textbox");
  await expect(popoutInput).toHaveValue("test");
});
