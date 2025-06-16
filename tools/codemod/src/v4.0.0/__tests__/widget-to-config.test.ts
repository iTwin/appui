/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { createDefineInlineTest } from "../../utils/TestUtils";
import transformer from "../widget-to-config";

import input from "../__testfixtures__/widget-to-config/Widget.input?raw";
import output from "../__testfixtures__/widget-to-config/Widget.output?raw";

const defineInlineTest = createDefineInlineTest(transformer);

describe("widget-to-config", () => {
  defineInlineTest(input, output, "transforms correctly");
});
