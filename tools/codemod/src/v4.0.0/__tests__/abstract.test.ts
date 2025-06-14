/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { createDefineInlineTest } from "../../utils/TestUtils";
import transformer from "../abstract";

import input from "../__testfixtures__/abstract.input?raw";
import output from "../__testfixtures__/abstract.output?raw";

const defineInlineTest = createDefineInlineTest(transformer);

describe("abstract", () => {
  defineInlineTest(input, output, "transforms correctly");
});
