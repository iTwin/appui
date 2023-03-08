/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { defineInlineTest } from "jscodeshift/src/testUtils";
import { createInlineTransform, tsxModule } from "../../utils/testUtils";
import transformer from "../ui-items-provider";

const transform = tsxModule(createInlineTransform(transformer));

describe("ui-items-provider", () => {
  defineInlineTest(
    transform,
    {},
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
