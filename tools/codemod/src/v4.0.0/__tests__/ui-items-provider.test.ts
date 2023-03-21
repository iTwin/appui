/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { createDefineInlineTest } from "../../utils/testUtils";
import transformer from "../ui-items-provider";

const defineInlineTest = createDefineInlineTest(transformer);

describe("ui-items-provider", () => {
  defineInlineTest(
    `
    export class CustomUiItemsProvider implements UiItemsProvider {
      public provideToolbarButtonItems(_stageId: string): ToolbarItem[] {
        return [];
      }
    }
    `,
    `
    export class CustomUiItemsProvider implements UiItemsProvider {
      public provideToolbarItems(_stageId: string): ToolbarItem[] {
        return [];
      }
    }
    `,
    "should rename 'provideToolbarButtonItems`"
  );
});
