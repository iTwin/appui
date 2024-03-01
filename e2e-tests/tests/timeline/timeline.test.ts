/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { expect, test } from "@playwright/test";
import { openComponentExamples } from "../Utils";

test("timeline handle simultaneous initial and total duration props change (regression test)", async ({
  page,
  baseURL,
}) => {
  await openComponentExamples(page, baseURL);
  const timeline = page.getByTestId("timeline-component");

  await page.getByRole("button", { name: "Timeline", exact: true }).click();

  await page.getByText("Set to 1 second").click();
  await expect(timeline).toHaveScreenshot();
  await page.getByText("Set to 5 seconds").click();
  await expect(timeline).toHaveScreenshot();
  await page.getByText("Set to 10 seconds").click();
  await expect(timeline).toHaveScreenshot();
});
