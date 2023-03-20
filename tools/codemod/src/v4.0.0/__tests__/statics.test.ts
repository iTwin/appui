/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { createDefineInlineTest } from "../../utils/testUtils";
import transformer from "../statics";

const defineInlineTest = createDefineInlineTest(transformer);

describe("statics", () => {
  defineInlineTest(
    `FrontstageManager.initialize();`,
    ``,
    "should remove `FrontstageManager.initialize`"
  );

  defineInlineTest(
    `FrontstageManager.setActiveLayout();`,
    `UiFramework.content.layouts.setActive();`,
    "should update `FrontstageManager.setActiveLayout`"
  );

  defineInlineTest(
    `FrontstageManager.setActiveContentGroup();`,
    `UiFramework.content.layouts.setActiveContentGroup();`,
    "should update `FrontstageManager.setActiveContentGroup`"
  );

  defineInlineTest(
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

  defineInlineTest(
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
