/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Locator, expect, test } from "@playwright/test";
import {
  StagePanelState,
  panelLocator,
  tabLocator,
  widgetLocator,
} from "./Utils";

test.describe("WidgetApi", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("./blank?frontstageId=widget-api");
  });

  test("should toggle pin state", async ({ page }) => {
    const panel = panelLocator({ page, side: "right" });

    const layoutInfoTab = tabLocator(page, "Layout Info");
    await layoutInfoTab.click();
    const layoutInfoWidget = widgetLocator({ tab: layoutInfoTab });
    const pinned = layoutInfoWidget.getByText("pinned=");
    await expect(pinned).toHaveText("pinned=true");

    const unpinButton = panel.getByRole("button", {
      name: "Unpin widget panel",
    });
    await unpinButton.click();
    await expect(pinned).toHaveText("pinned=false");

    const pinButton = panel.getByRole("button", { name: "Pin widget panel" });
    await pinButton.click();
    await expect(pinned).toHaveText("pinned=true");
  });

  test("should resize", async ({ page }) => {
    const panel = panelLocator({ page, side: "right" });
    const handle = handleLocator(panel);

    expect(await getPanelSize(panel)).toBe(200);

    const panelBounds = (await panel.boundingBox())!;
    const clientX = panelBounds.x;
    const clientY = panelBounds.y + 20;
    await handle.dispatchEvent("mousedown", { clientX, clientY });

    await handle.dispatchEvent("mousemove", {
      clientX: clientX - 50,
      clientY,
    });
    expect(await getPanelSize(panel)).toBe(250);

    await handle.dispatchEvent("mousemove", {
      clientX: clientX - 40,
      clientY,
    });
    expect(await getPanelSize(panel)).toBe(240);
    await handle.dispatchEvent("mouseup");
  });
});

test("should initialize defaults", async ({ page }) => {
  await page.goto("./blank?frontstageId=test-panel");

  const panel = panelLocator({ page, side: "left" });
  await expect(panel).toBeVisible();
  expect(await getPanelSize(panel)).toBe(200);
});

test("should initialize size", async ({ page }) => {
  await page.goto("./blank?frontstageId=test-panel&size=500");

  const panel = panelLocator({ page, side: "left" });
  await expect(panel).toBeVisible();
  expect(await getPanelSize(panel)).toBe(500);
});

test("should initialize minimized", async ({ page }) => {
  await page.goto(
    `./blank?frontstageId=test-panel&defaultState=${StagePanelState.Minimized}`
  );

  const panel = panelLocator({ page, side: "left" });
  const handle = panel.locator(".nz-line-grip");
  await expect(handle).toBeVisible();
  expect(await getPanelSize(panel)).toBe(0);
});

test("should initialize resizable", async ({ page }) => {
  await page.goto("./blank?frontstageId=test-panel&resizable=0");

  const panel = panelLocator({ page, side: "left" });
  const handle = handleLocator(panel);
  await expect(handle).not.toBeVisible();
});

test("should resize (single panel)", async ({ page }) => {
  await page.goto("./blank?frontstageId=test-panel&menu=0");

  const panel = panelLocator({ page, side: "left" });
  const handle = handleLocator(panel);

  await expect(handle).toBeVisible();
  expect(await getPanelSize(panel)).toBe(200);

  const panelBounds = (await panel.boundingBox())!;
  const clientX = panelBounds.x + panelBounds.width;
  const clientY = panelBounds.y + 20;
  await handle.dispatchEvent("mousedown", { clientX, clientY });

  await handle.dispatchEvent("mousemove", {
    clientX: clientX + 50,
    clientY,
  });
  expect(await getPanelSize(panel)).toBe(250);

  await handle.dispatchEvent("mousemove", {
    clientX: clientX + 40,
    clientY,
  });
  expect(await getPanelSize(panel)).toBe(240);
  await handle.dispatchEvent("mouseup");
});

async function getPanelSize(panel: Locator) {
  await panel.scrollIntoViewIfNeeded(); // wait for https://playwright.dev/docs/actionability#stable
  const panelBounds = (await panel.boundingBox())!;
  return panelBounds.width;
}

function handleLocator(panel: Locator) {
  return panel.locator(".nz-grip-container").locator(".nz-handle");
}
