/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { expect, test } from "@playwright/test";
import { openComponentExamples } from "../Utils";

function editorId(id: string) {
  return `${id.replace(/[^A-Za-z]/g, "")}`;
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

["Legacy", "New"].forEach((editorSystem) => {
  for (const id of testIds) {
    test(`Editor ${id} default visual in ${editorSystem} system`, async ({
      page,
      baseURL,
    }) => {
      await openComponentExamples(page, baseURL);

      // Avoid highlighting one of the editors.
      await page.keyboard.press("Escape");
      await page.getByRole("button", { name: "Editor", exact: true }).click();

      const editors = page.locator(`#${editorSystem}${editorId(id)}`).first();
      await expect(editors).toHaveScreenshot();
    });
  }
});
