/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import {
  LocalStateStorage,
  UiStateEntry,
  UiStateStorageStatus,
} from "../../core-react";
import { storageMock } from "../TestUtils";

function getBoolean(): boolean {
  return true;
}
function getString(): string {
  return "Hello";
}

describe("UiStateEntry", () => {
  it("constructor executes successfully", () => {
    const uiSetting = new UiStateEntry<boolean>(
      "Namespace",
      "Setting",
      getBoolean
    );
    expect(uiSetting).toBeTruthy();
    expect(uiSetting.settingNamespace).toEqual("Namespace");
    expect(uiSetting.settingName).toEqual("Setting");
    expect(uiSetting.getValue).toEqual(getBoolean);
  });

  describe("saveSetting", () => {
    const localUiSettings = new LocalStateStorage({
      localStorage: storageMock(),
    } as Window);

    it("Should save setting correctly", async () => {
      const uiSetting = new UiStateEntry<boolean>(
        "Namespace",
        "Setting",
        getBoolean
      );
      const result = await uiSetting.saveSetting(localUiSettings);
      expect(result.status).to.equal(UiStateStorageStatus.Success);
    });
  });

  describe("deleteSetting", async () => {
    const localUiSettings = new LocalStateStorage({
      localStorage: storageMock(),
    } as Window);
    const uiSetting = new UiStateEntry<string>(
      "Namespace",
      "Setting",
      getString
    );
    await uiSetting.saveSetting(localUiSettings);

    it("Should remove setting correctly", async () => {
      const result = await uiSetting.deleteSetting(localUiSettings);
      expect(result.status).to.equal(UiStateStorageStatus.Success);
      const result2 = await uiSetting.deleteSetting(localUiSettings);
      expect(result2.status).to.equal(UiStateStorageStatus.NotFound);
      expect(result2.setting).to.be.undefined;
    });
  });

  describe("getSettingAndApplyValue", async () => {
    function getNumber(): number {
      return 200;
    }

    let value = 100;
    function applyNumber(v: number) {
      value = v;
    }

    const localUiSettings = new LocalStateStorage({
      localStorage: storageMock(),
    } as Window);
    const uiSetting = new UiStateEntry<number>(
      "Namespace",
      "Setting",
      getNumber,
      applyNumber
    );
    await uiSetting.saveSetting(localUiSettings);

    it("Should load setting correctly", async () => {
      const result = await uiSetting.getSettingAndApplyValue(localUiSettings);
      expect(result.status).to.equal(UiStateStorageStatus.Success);
      expect(result.setting).toEqual(200);
      expect(value).toEqual(200);
    });

    it("Should return Uninitialized if no applyValue", async () => {
      const uiSetting2 = new UiStateEntry<number>(
        "Namespace",
        "XYZ",
        getNumber
      );
      const result = await uiSetting2.getSettingAndApplyValue(localUiSettings);
      expect(result.status).toEqual(UiStateStorageStatus.Uninitialized);
    });

    it("Should use default value if no applyValue", async () => {
      const defaultValue = 999;
      // make sure testing with a new key not yet in mock storage
      const uiSetting2 = new UiStateEntry<number>(
        "Namespace",
        "TEST-XYZ",
        getNumber,
        applyNumber,
        defaultValue
      );
      const result = await uiSetting2.getSettingAndApplyValue(localUiSettings);
      expect(result.status).toEqual(UiStateStorageStatus.Success);
      expect(result.setting).toEqual(defaultValue);
      expect(value).toEqual(defaultValue);
    });

    it("Should return NotFound if not saved", async () => {
      const uiSetting3 = new UiStateEntry<number>(
        "Namespace",
        "XYZ",
        getNumber,
        applyNumber
      );
      const result = await uiSetting3.getSettingAndApplyValue(localUiSettings);
      expect(result.status).toEqual(UiStateStorageStatus.NotFound);
    });
  });
});
