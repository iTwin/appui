/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Logger } from "@itwin/core-bentley";
import { UiComponents } from "../components-react";
import TestUtils from "./TestUtils";

describe("UiComponents", () => {
  beforeEach(() => {
    TestUtils.terminateUiComponents();
  });

  it("i18nNamespace should return UiComponents", () => {
    expect(UiComponents.localizationNamespace).toEqual("UiComponents");
  });

  it("packageName should return components-react", () => {
    expect(UiComponents.packageName).toEqual("components-react");
  });

  it("translate should return the key (in test environment)", async () => {
    await TestUtils.initializeUiComponents();
    expect(UiComponents.translate("test1.test2")).toEqual("test1.test2");
  });

  it("translate should return blank and log error if UiComponents not initialized", () => {
    const spyLogger = vi.spyOn(Logger, "logError");
    expect(UiComponents.translate("xyz")).toEqual("");
    expect(spyLogger).toHaveBeenCalledOnce();
  });

  it("calling initialize twice should log", async () => {
    const spyLogger = vi.spyOn(Logger, "logInfo");
    expect(UiComponents.initialized).toEqual(false);
    await UiComponents.initialize(TestUtils.i18n);
    expect(UiComponents.initialized).toEqual(true);
    await UiComponents.initialize(TestUtils.i18n);
    expect(spyLogger).toHaveBeenCalledOnce();
  });

  it("calling loggerCategory without an obj should return packageName", () => {
    const category = UiComponents.loggerCategory(undefined);
    expect(category).toEqual(UiComponents.packageName);
  });
});
