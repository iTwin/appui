/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { defineInlineTest } from "jscodeshift/src/testUtils";
import { createInlineTransform, tsxModule } from "../../utils/testUtils";
import transformer from "../statics";

const transform = tsxModule(createInlineTransform(transformer));

function testStatics(input: string, output: string, testName: string) {
  return defineInlineTest(
    transform,
    {},
    input,
    output,
    testName,
  );
}

describe("statics", () => {
  testStatics(
    `FrontstageManager.initialize();`,
    ``,
    "should remove `FrontstageManager.initialize`"
  );

  testStatics(
    `FrontstageManager.setActiveLayout();`,
    `UiFramework.content.layouts.setActive();`,
    "should update `FrontstageManager.setActiveLayout`"
  );

  testStatics(
    `FrontstageManager.setActiveContentGroup();`,
    `UiFramework.content.layouts.setActiveContentGroup();`,
    "should update `FrontstageManager.setActiveContentGroup`"
  );

  testStatics(
    `
    import { FrontstageManager } from "@itwin/appui-react";
    await FrontstageManager.getFrontstageDef(stageId);
    FrontstageManager.activeFrontstageDef;
    `,
    `
    import { UiFramework } from "@itwin/appui-react";
    await UiFramework.frontstages.getFrontstageDef(stageId);
    UiFramework.frontstages.activeFrontstageDef;
    `,
    "should update `FrontstageManager`"
  );

  testStatics(
    `
    import { FrontstageManager } from "@itwin/appui-react";
    await FrontstageManager.getFrontstageDef(stageId);
    FrontstageManager.activeFrontstageDef;
    `,
    `
    import { UiFramework } from "@itwin/appui-react";
    await UiFramework.frontstages.getFrontstageDef(stageId);
    UiFramework.frontstages.activeFrontstageDef;
    `,
    "should update `FrontstageManager`"
  );
});
