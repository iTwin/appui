/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Logger } from "@itwin/core-bentley";
import { UiCore } from "../core-react/UiCore.js";
import TestUtils from "./TestUtils.js";

describe("UiCore", () => {
  beforeEach(() => {
    TestUtils.terminateUiCore();
  });

  it("terminate should run even if no i18n to unregister", () => {
    expect(() => UiCore.terminate()).to.not.throw(Error);
  });

  it("i18nNamespace should return UiCore", () => {
    expect(UiCore.localizationNamespace).toEqual("UiCore");
  });

  it("packageName should return core-react", () => {
    expect(UiCore.packageName).toEqual("core-react");
  });

  it("translate should return the key (in test environment)", async () => {
    await TestUtils.initializeUiCore();
    expect(UiCore.translate("test1.test2")).toEqual("test1.test2");
  });

  it("translate should return blank and log error if UiCore not initialized", () => {
    const spyLogger = vi.spyOn(Logger, "logError");
    expect(UiCore.translate("xyz")).toEqual("");
    expect(spyLogger).toHaveBeenCalledOnce();
  });

  it("loggerCategory passed null should return 'core-react'", () => {
    expect(UiCore.loggerCategory(null)).toEqual("core-react");
  });

  it("calling initialize twice should log", async () => {
    const spyLogger = vi.spyOn(Logger, "logInfo");
    expect(UiCore.initialized).toEqual(false);
    await UiCore.initialize(TestUtils.i18n);
    expect(UiCore.initialized).toEqual(true);
    await UiCore.initialize(TestUtils.i18n);
    expect(spyLogger).toHaveBeenCalledOnce();
  });
});
