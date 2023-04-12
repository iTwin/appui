/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { createDefineInlineTest } from "../../utils/TestUtils";
import transformer from "../components-react";

const defineInlineTest = createDefineInlineTest(transformer);

describe("components-react", () => {
  defineInlineTest(
    `
    import { Toolbar, ToolbarItem } from "@itwin/components-react";
    const item: ToolbarItem = {};
    <Toolbar />
    `,
    `
    import { Toolbar, ToolbarItem } from "@itwin/appui-react";
    const item: ToolbarItem = {};
    <Toolbar />
    `,
    "should update declaration"
  );

  defineInlineTest(
    `
    import { CustomToolbarItem } from "@itwin/components-react";
    const item: CustomToolbarItem = {};
    `,
    `
    import { ToolbarCustomItem } from "@itwin/appui-react";
    const item: ToolbarCustomItem = {};
    `,
    "should rename `CustomToolbarItem`"
  );
});
