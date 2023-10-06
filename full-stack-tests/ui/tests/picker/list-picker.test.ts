/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { expect, test } from "@playwright/test";
import { openComponentExamples } from "../Utils";

test("list picker test", async ({ page, baseURL }) => {
  await openComponentExamples(page, baseURL);

  await page.getByRole("button", { name: "Picker", exact: true }).click();

  await page.getByRole("button", { name: "ListPicker Title" }).click();

  const listPicker = page.getByText(
    "ThemeToggle the theme between light and darkDark LightExpandable SectionExpandab"
  );
  await expect(listPicker).toHaveScreenshot();
});
