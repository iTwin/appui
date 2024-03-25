/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { expect } from "chai";
import { CustomItemDef } from "../../appui-react/shared/CustomItemDef";
import TestUtils from "../TestUtils";

describe("CustomItemDef", () => {
  before(async () => {
    await TestUtils.initializeUiFramework();
  });

  after(() => {
    TestUtils.terminateUiFramework();
  });

  it("CustomItemDef with no commandId should get generated id", () => {
    const item = new CustomItemDef({});

    expect(item.id.substring(0, CustomItemDef.customIdPrefix.length)).toEqual(
      CustomItemDef.customIdPrefix
    );
  });

  it("CustomItemDef with commandId should use it", () => {
    const testId = "Test";
    const item = new CustomItemDef({
      customId: testId,
    });

    expect(item.id).toEqual(testId);
  });
});
