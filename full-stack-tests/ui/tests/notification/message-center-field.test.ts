/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { expect, test } from "@playwright/test";
import { openComponentExamples } from "../Utils";

test("message center field tab:all state:empty test", async ({
  page,
  baseURL,
}) => {
  await openComponentExamples(page, baseURL);

  await page.getByRole("button", { name: "Notification", exact: true }).click();

  await page
    .locator("div")
    .filter({
      hasText:
        /^Message Center FieldMessages0Fill message centerClear message center$/,
    })
    .getByRole("button", { name: "Messages 0" })
    .click();

  //This will be a screenshot of the whole right panel of the screen so that both the button and panel are included
  const messageCenterField = page.getByText(
    "ThemeToggle the theme between light and darkDark LightElement TooltipOpen Elemen"
  );
  await expect(messageCenterField).toHaveScreenshot();
});

test("message center field tab:all state:filled test", async ({
  page,
  baseURL,
}) => {
  await openComponentExamples(page, baseURL);

  await page.getByRole("button", { name: "Notification", exact: true }).click();

  await page.getByText("Fill message center").click();

  await page
    .locator("div")
    .filter({
      hasText:
        /^Message Center FieldMessages5Fill message centerClear message center$/,
    })
    .getByRole("button", { name: "Messages 5" })
    .click();

  //This will be a screenshot of the whole right panel of the screen so that both the button and panel are included
  const messageCenterField = page.getByText(
    "ThemeToggle the theme between light and darkDark LightElement TooltipOpen Elemen"
  );
  await expect.soft(messageCenterField).toHaveScreenshot();

  await page.getByText("Clear message center");
});

test("message center field tab:error state:empty test", async ({
  page,
  baseURL,
}) => {
  await openComponentExamples(page, baseURL);

  await page.getByRole("button", { name: "Notification", exact: true }).click();

  await page
    .locator("div")
    .filter({
      hasText:
        /^Message Center FieldMessages0Fill message centerClear message center$/,
    })
    .getByRole("button", { name: "Messages 0" })
    .click();

  await page.getByText("Errors", { exact: true }).click();
  //This will be a screenshot of the whole right panel of the screen so that both the button and panel are included
  const messageCenterField = page.getByText(
    "ThemeToggle the theme between light and darkDark LightElement TooltipOpen Elemen"
  );
  await expect.soft(messageCenterField).toHaveScreenshot();
});

test("message center field tab:error state:filled test", async ({
  page,
  baseURL,
}) => {
  await openComponentExamples(page, baseURL);

  await page.getByRole("button", { name: "Notification", exact: true }).click();

  await page.getByText("Fill message center").click();

  await page
    .locator("div")
    .filter({
      hasText:
        /^Message Center FieldMessages5Fill message centerClear message center$/,
    })
    .getByRole("button", { name: "Messages 5" })
    .click();

  await page.getByText("Errors", { exact: true }).click();
  //This will be a screenshot of the whole right panel of the screen so that both the button and panel are included
  const messageCenterField = page.getByText(
    "ThemeToggle the theme between light and darkDark LightElement TooltipOpen Elemen"
  );
  await expect.soft(messageCenterField).toHaveScreenshot();

  await page.getByText("Clear message center");
});
