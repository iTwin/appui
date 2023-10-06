/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Page, expect, test } from "@playwright/test";
import { openComponentExamples } from "../Utils";

/**
 * Helper to open recurring message center popup;
 * @param page
 * @returns
 */
const openMessageCenterPopup = async (page: Page) => {
  return await page
    .locator("div")
    .filter({
      hasText:
        /^Message Center FieldMessages\dFill message centerClear message center$/,
    })
    .getByRole("button", { name: /^Messages \d$/ })
    .click();
};

test("message center field tab:all state:empty test", async ({
  page,
  baseURL,
}) => {
  await openComponentExamples(page, baseURL);

  await page.getByRole("button", { name: "Notification", exact: true }).click();

  await openMessageCenterPopup(page);

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
  await page.getByText("...with severity icons").click();

  await openMessageCenterPopup(page);

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

  await openMessageCenterPopup(page);

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
  await page.getByText("...with severity icons").click();

  await openMessageCenterPopup(page);

  await page.getByText("Errors", { exact: true }).click();
  //This will be a screenshot of the whole right panel of the screen so that both the button and panel are included
  const messageCenterField = page.getByText(
    "ThemeToggle the theme between light and darkDark LightElement TooltipOpen Elemen"
  );
  await expect.soft(messageCenterField).toHaveScreenshot();

  await page.getByText("Clear message center");
});

test("message center field message overflow test", async ({
  page,
  baseURL,
}) => {
  await openComponentExamples(page, baseURL);

  await page.getByRole("button", { name: "Notification", exact: true }).click();

  await page.getByText("Fill message center").click();
  await page.getByText("...with overflowing content").click();

  await openMessageCenterPopup(page);

  //This will be a screenshot of the whole right panel of the screen so that both the button and panel are included
  const messageCenterField = page.getByText(
    "ThemeToggle the theme between light and darkDark LightElement TooltipOpen Elemen"
  );
  await expect.soft(messageCenterField).toHaveScreenshot();

  await page.getByText("Clear message center");
});
