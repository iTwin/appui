/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Logger } from "@itwin/core-bentley";
import { IModelApp, NoRenderApp } from "@itwin/core-frontend";
import { UiIModelComponents } from "../imodel-components-react";
import TestUtils from "./TestUtils";

describe("UiIModelComponents", () => {
  beforeEach(() => {
    TestUtils.terminateUiIModelComponents();
  });

  afterEach(async () => {
    await IModelApp.shutdown();
  });

  it("i18nNamespace should return 'UiIModelComponents'", () => {
    expect(UiIModelComponents.localizationNamespace).toEqual(
      "UiIModelComponents"
    );
  });

  it("packageName should return 'imodel-components-react'", () => {
    expect(UiIModelComponents.packageName).toEqual("imodel-components-react");
  });

  it("translate should return the key (in test environment)", async () => {
    await NoRenderApp.startup();
    await TestUtils.initializeUiIModelComponents();
    expect(UiIModelComponents.translate("test1.test2")).toEqual("test1.test2");
    TestUtils.terminateUiIModelComponents();
  });

  it("translate should return blank and log error if UiIModelComponents not initialized", () => {
    const spyLogger = vi.spyOn(Logger, "logError");
    expect(UiIModelComponents.translate("xyz")).toEqual("");
    expect(spyLogger).toHaveBeenCalledOnce();
  });

  it("calling initialize twice should log", async () => {
    const spyLogger = vi.spyOn(Logger, "logInfo");
    expect(UiIModelComponents.initialized).to.be.false;
    await UiIModelComponents.initialize();
    expect(UiIModelComponents.initialized).toEqual(true);
    await UiIModelComponents.initialize();
    expect(spyLogger).toHaveBeenCalledOnce();
  });

  it("calling initialize without I18N will use IModelApp.i18n", async () => {
    await NoRenderApp.startup();

    await UiIModelComponents.initialize();
    await IModelApp.shutdown();
  });

  it("calling loggerCategory without an obj should return packageName", () => {
    const category = UiIModelComponents.loggerCategory(undefined);
    expect(category).toEqual(UiIModelComponents.packageName);
  });
});
