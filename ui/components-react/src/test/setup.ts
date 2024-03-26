/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import TestUtils from "./TestUtils";

beforeEach(async () => {
  await TestUtils.initializeUiComponents();
});

afterEach(() => {
  TestUtils.terminateUiComponents();
});
