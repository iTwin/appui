/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { CustomItemDef } from "../../appui-react/shared/CustomItemDef";
import TestUtils from "../TestUtils";

describe("CustomItemDef", () => {
  beforeAll(async () => {
    await TestUtils.initializeUiFramework();
  });

  afterAll(() => {
    TestUtils.terminateUiFramework();
  });

  it("CustomItemDef with no commandId should get generated id", () => {
    const item = new CustomItemDef({});

    expect(item.id.substring(0, CustomItemDef.customIdPrefix.length)).to.eq(
      CustomItemDef.customIdPrefix
    );
  });

  it("CustomItemDef with commandId should use it", () => {
    const testId = "Test";
    const item = new CustomItemDef({
      customId: testId,
    });

    expect(item.id).to.eq(testId);
  });
});
