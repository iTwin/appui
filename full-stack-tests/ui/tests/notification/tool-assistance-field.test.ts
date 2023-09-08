/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { expect, test } from "@playwright/test";
import { openComponentExamples } from "../Utils";

test("tool assistance field test", async ({ page, baseURL }) => {
  await openComponentExamples(page, baseURL);

  await page.getByRole("button", { name: "Notification", exact: true }).click();

  await page
    .getByRole("button", {
      name: "Measure Distance > Click for more information",
    })
    .click();

  const toolAssistanceField = page.getByText(
    "ThemeToggle the theme between light and darkDark LightElement TooltipOpen Elemen"
  );
  await expect(toolAssistanceField).toHaveScreenshot();
});
