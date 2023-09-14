/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { expect, test } from "@playwright/test";
import assert from "assert";
import {
  expectSavedFrontstageState,
  frontstageLocator,
  setWidgetState,
  tabLocator,
  WidgetState,
} from "./Utils";

test.describe("tool settings", () => {
  test.beforeEach(async ({ page, baseURL }) => {
    assert(baseURL);
    await page.goto(`${baseURL}?frontstage=appui-test-providers:WidgetApi`);
  });

  test("should render tool settings", async ({ page }) => {
    await expect(page.getByText("does not have tool settings.")).toBeVisible();
  });

  test("should not render tool settings (undefined tool settings config)", async ({
    page,
    baseURL,
  }) => {
    await page.goto(
      `${baseURL}?frontstage=appui-test-providers:WidgetApi&toolSettings=off`
    );
    await expect(
      page.getByText("does not have tool settings.")
    ).not.toBeVisible();
  });

  test("should not render tool settings (hidden tool settings)", async ({
    page,
    baseURL,
  }) => {
    await page.goto(
      `${baseURL}?frontstage=appui-test-providers:WidgetApi&toolSettings=hidden`
    );
    await expect(
      page.getByText("does not have tool settings.")
    ).not.toBeVisible();
  });

  test("should hide/show docked tool settings", async ({ page }) => {
    await setWidgetState(page, "WidgetApi:ToolSettings", WidgetState.Hidden);
    await expect(
      page.getByText("does not have tool settings.")
    ).not.toBeVisible();

    await setWidgetState(page, "WidgetApi:ToolSettings", WidgetState.Open);
    await expect(page.getByText("does not have tool settings.")).toBeVisible();
  });

  test("should show/hide (hidden tool settings)", async ({ page, baseURL }) => {
    await page.goto(
      `${baseURL}?frontstage=appui-test-providers:WidgetApi&toolSettings=hidden`
    );
    await expect(
      page.getByText("does not have tool settings.")
    ).not.toBeVisible();

    await setWidgetState(page, "WidgetApi:ToolSettings", WidgetState.Open);
    await expect(page.getByText("does not have tool settings.")).toBeVisible();

    await setWidgetState(page, "WidgetApi:ToolSettings", WidgetState.Hidden);
    await expect(
      page.getByText("does not have tool settings.")
    ).not.toBeVisible();
  });

  test("should hide/show (widget tool settings)", async ({ page }) => {
    const dockedToolSettingsHandle = page.getByTitle("Undock tool settings");
    const widgetToolSettings = tabLocator(page, "Tool Settings");

    // Float docked tool settings.
    const frontstage = frontstageLocator(page);
    await dockedToolSettingsHandle.dragTo(frontstage, {
      targetPosition: {
        x: 300,
        y: 200,
      },
    });
    await expect(widgetToolSettings).toBeVisible();

    await setWidgetState(page, "WidgetApi:ToolSettings", WidgetState.Hidden);
    await expect(widgetToolSettings).not.toBeVisible();

    await setWidgetState(page, "WidgetApi:ToolSettings", WidgetState.Open);
    await expect(widgetToolSettings).toBeVisible();
  });

  test("should float docked tool settings", async ({ page }) => {
    const dockedToolSettings = page.getByText("does not have tool settings.");
    const widgetToolSettings = tabLocator(page, "Tool Settings");

    await setWidgetState(page, "WidgetApi:ToolSettings", WidgetState.Floating);
    await expect(dockedToolSettings).not.toBeVisible();
    await expect(widgetToolSettings).toBeVisible();
  });

  test("should close floating tool settings", async ({ page }) => {
    const dockedToolSettings = page.getByText("does not have tool settings.");
    const widgetToolSettings = tabLocator(page, "Tool Settings");

    await setWidgetState(page, "WidgetApi:ToolSettings", WidgetState.Floating);
    await setWidgetState(page, "WidgetApi:ToolSettings", WidgetState.Closed);
    await expect(dockedToolSettings).not.toBeVisible();
    await expect(widgetToolSettings).toBeVisible();
  });

  test("should ignore WidgetState.Closed if tool settings is docked", async ({
    page,
  }) => {
    const dockedToolSettings = page.getByText("does not have tool settings.");
    const widgetToolSettings = tabLocator(page, "Tool Settings");

    await setWidgetState(page, "WidgetApi:ToolSettings", WidgetState.Hidden);
    await setWidgetState(page, "WidgetApi:ToolSettings", WidgetState.Closed);
    await expect(dockedToolSettings).not.toBeVisible();
    await expect(widgetToolSettings).not.toBeVisible();
  });

  test("should ignore WidgetState.Closed for docked tool settings", async ({
    page,
  }) => {
    const dockedToolSettings = page.getByText("does not have tool settings.");
    const widgetToolSettings = tabLocator(page, "Tool Settings");

    await setWidgetState(page, "WidgetApi:ToolSettings", WidgetState.Closed);
    await expect(dockedToolSettings).toBeVisible();
    await expect(widgetToolSettings).not.toBeVisible();
  });

  test("should maintain tool settings as widget (after reload) ", async ({
    context,
    page,
  }) => {
    const dockedToolSettingsHandle = page.getByTitle("Undock tool settings");
    const widgetToolSettings = tabLocator(page, "Tool Settings");

    // Float docked tool settings.
    const frontstage = frontstageLocator(page);
    await dockedToolSettingsHandle.dragTo(frontstage, {
      targetPosition: {
        x: 300,
        y: 200,
      },
    });
    await expect(widgetToolSettings).toBeVisible();

    await expectSavedFrontstageState(context, (state) => {
      const widgets = Object.values(state.nineZone.widgets);
      const widget = widgets.find(
        (w) => w.tabs.indexOf("WidgetApi:ToolSettings") >= 0
      );
      if (!widget) return false;
      const floatingWidgetIndex = state.nineZone.floatingWidgets.allIds.indexOf(
        widget.id
      );
      return floatingWidgetIndex >= 0;
    });
    await page.reload();

    await expect(widgetToolSettings).toBeVisible();
    await expect(dockedToolSettingsHandle).not.toBeVisible();
  });

  test("should support dynamic tool settings", async ({ page }) => {
    const toolButton = page.getByTitle("Tool With Dynamic Settings");
    await toolButton.click();

    const initialState = page.getByText("Undefined", { exact: true });
    const californiaState = page.getByText("California", { exact: true });
    const alabamaState = page.getByText("Alabama", { exact: true });
    const californiaCity = page.getByText("Los Angeles", { exact: true });
    const alabamaCity = page.getByText("Birmingham", { exact: true });

    await expect(initialState).toBeVisible();
    // Open state dropdown list;
    await initialState.click();

    // Pick state item in dropdown;
    await californiaState.click();

    // Check that we are currently displaying the correct city in he second picker
    await expect(californiaCity).toBeVisible();
    await expect(alabamaCity).not.toBeVisible();

    // Open state dropdown list;
    await californiaState.click();

    // Pick state item in dropdown;
    await alabamaState.click();

    // Check that we are currently displaying the correct city in he second picker
    await expect(alabamaCity).toBeVisible();
    await expect(californiaCity).not.toBeVisible();
  });
});
