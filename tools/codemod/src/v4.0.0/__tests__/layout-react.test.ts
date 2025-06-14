/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { createDefineInlineTest } from "../../utils/TestUtils";
import transformer from "../layout-react";

import input from "../__testfixtures__/layout-react.input?raw";
import output from "../__testfixtures__/layout-react.output?raw";

const defineInlineTest = createDefineInlineTest(transformer);

describe("layout-react", () => {
  defineInlineTest(input, output, "transforms correctly");
});
