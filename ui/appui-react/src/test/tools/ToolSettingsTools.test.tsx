/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { render } from "@testing-library/react";
import {
  BumpToolSetting,
  FocusToolSettings,
} from "../../appui-react/tools/ToolSettingsTools.js";

describe("ToolSettingsTools", () => {
  describe("FocusToolSettings", () => {
    it("should return false if no ToolSettings div found", async () => {
      render(<div data-testid="div"></div>);
      const tool = new FocusToolSettings();
      expect(await tool.parseAndRun()).toEqual(false);
    });

    it("should return true if focusable item in docked ToolSettings", async () => {
      render(
        <div className="uifw-toolSettings-docked">
          <button />
        </div>
      );
      const tool = new FocusToolSettings();
      expect(await tool.parseAndRun()).toEqual(true);
    });
  });

  describe("BumpToolSetting", () => {
    it("should return true if no args", async () => {
      const tool = new BumpToolSetting();
      expect(await tool.parseAndRun()).toEqual(true);
    });

    it("should return true if valid arg", async () => {
      const tool = new BumpToolSetting();
      expect(await tool.parseAndRun("2")).toEqual(true);
    });

    it("should return false if invalid arg", async () => {
      const tool = new BumpToolSetting();
      expect(await tool.parseAndRun("bad")).toEqual(false);
    });
  });
});
