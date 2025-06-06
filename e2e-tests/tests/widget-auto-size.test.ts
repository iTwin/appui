/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { test, expect } from "@playwright/test";
import assert from "assert";
import {
  frontstageLocator,
  tabLocator,
  titleBarHandleLocator,
  widgetLocator,
} from "./Utils";

test.describe("widget auto size", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("./blank?frontstageId=widget-api&menu=0");
  });

  test("auto-sized floating widget should follow the cursor when undocked", async ({
    page,
  }) => {
    const frontstage = frontstageLocator(page);

    // Widget from end section of a bottom panel.
    const tab = tabLocator(page, "Layout Controls");
    const widget = widgetLocator({ tab });
    const titleBarHandle = titleBarHandleLocator(widget);

    const boundingBox = await titleBarHandle.boundingBox();
    const frontstageBounds = await frontstage.boundingBox();
    assert(!!boundingBox);
    assert(!!frontstageBounds);
    await titleBarHandle.dragTo(frontstage, {
      // Drag top right corner of a handle.
      sourcePosition: {
        x: boundingBox.width - 60,
        y: boundingBox.height - 5,
      },
      // Drag to top right corner of a frontstage.
      targetPosition: {
        x: frontstageBounds.width - 5,
        y: 5,
      },
    });

    const updatedBoundingBox = await titleBarHandle.boundingBox();
    assert(!!updatedBoundingBox);

    // Top right corner of a floating widget should render close to the top right of a frontstage.
    expect(updatedBoundingBox.x + updatedBoundingBox.width).toBeGreaterThan(
      frontstageBounds.width - 5
    );
    expect(updatedBoundingBox.y).toBeLessThan(5);
  });
});
