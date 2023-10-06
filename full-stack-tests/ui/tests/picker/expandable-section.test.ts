/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { expect, test } from "@playwright/test";
import { openComponentExamples } from "../Utils";

test("expandable section test", async ({ page, baseURL }) => {
  await openComponentExamples(page, baseURL);

  await page.getByRole("button", { name: "Picker", exact: true }).click();

  await page.getByRole("button", { name: "Expandable Section Title" }).click();

  const expandableSection = page.getByText(
    "Expandable Section TitleItem 1Item 2Item 3Item 4"
  );
  await expect(expandableSection).toHaveScreenshot();
});
