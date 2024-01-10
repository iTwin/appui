/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Locator, expect, test } from "@playwright/test";
import assert from "assert";
import { panelLocator, tabLocator, widgetLocator } from "./Utils";

test.describe("stage panel", () => {
  test.beforeEach(async ({ page, baseURL }) => {
    assert(baseURL);
    await page.goto(`${baseURL}?frontstage=appui-test-providers:WidgetApi`);
  });

  test("should toggle pin state", async ({ page }) => {
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

  test("should resize", async ({ baseURL, page }) => {
    assert(baseURL);
    await page.goto(`${baseURL}?frontstage=appui-test-providers:WidgetApi`);

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

test("should resize (single panel)", async ({ baseURL, page }) => {
  assert(baseURL);
  await page.goto(
    `${baseURL}?frontstage=appui-test-providers:CustomFrontstage`
  );

  const panel = panelLocator({ page, side: "left" });
  const handle = handleLocator(panel);

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
  const panelBounds = (await panel.boundingBox())!;
  return panelBounds.width;
}

function handleLocator(panel: Locator) {
  return panel.locator(".nz-grip-container").locator(".nz-handle");
}
