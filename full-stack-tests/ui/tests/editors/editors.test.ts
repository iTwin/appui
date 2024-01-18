/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { expect, test } from "@playwright/test";
import { openComponentExamples } from "../Utils";

function editorId(id: string) {
  return `#${id.replace(/[^A-Za-z]/g, "")}`;
}
function sizedLocator(id: string, position: number) {
  return `${editorId(id)} > div > :nth-child(${position + 1})`;
}

const testIds = [
  "Primitive:string:Default",
  "Primitive:string:multi-line[UiAbstract-MultilineText] ",
  "Primitive:dateTime:Default",
  "Primitive:shortdate:Default",
  "Primitive:number:slider[UiAbstract-Slider] ",
  "Primitive:number:number-custom[UiAbstract-CustomFormattedNumber] ",
  "Primitive:number:number-custom[UiAbstract-CustomFormattedNumber,UiAbstract-Icon] ",
  "Primitive:number:numeric-input ",
  "Primitive:number:numeric-input[UiAbstract-InputEditorSize] ",
  "Primitive:number:numeric-input[UiAbstract-Range] ",
  "Primitive:number:numeric-input[UiAbstract-InputEditorSize,UiAbstract-Range] ",
  "Primitive:boolean:Default",
  "Primitive:boolean:toggle ",
  "Primitive:boolean:image-check-box[UiAbstract-CheckBoxImages] ",
  "Primitive:enum:Default",
  "Primitive:enum:enum-buttongroup ",
  "Primitive:enum:enum-buttongroup[UiAbstract-ButtonGroupData] ",
];
const sizes = ["default", "medium", "large"];
for (const id of testIds) {
  for (let i = 0; i < sizes.length; i++) {
    test(`Editor ${id} ${sizes[i]} visual`, async ({ page, baseURL }) => {
      await openComponentExamples(page, baseURL);

      await page.getByRole("button", { name: "Editor", exact: true }).click();

      const editors = page.locator(sizedLocator(id, i)).first();
      await expect(editors).toHaveScreenshot();
    });
  }
}
