/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { fireEvent, render } from "@testing-library/react";
import { ColorByName, ColorDef } from "@itwin/core-common";
import { TestUtils } from "../TestUtils.js";
import { ColorPickerDialog } from "../../imodel-components-react/color/ColorPickerDialog.js";
import { ColorValue } from "@itwin/itwinui-react";

/* eslint-disable @typescript-eslint/no-deprecated */

describe("ColorPickerDialog", () => {
  beforeEach(async () => {
    await TestUtils.initializeUiIModelComponents();
  });

  afterEach(() => {
    TestUtils.terminateUiIModelComponents();
  });

  describe("renders", () => {
    it("should render", () => {
      const wrapper = render(
        <ColorPickerDialog
          dialogTitle="-testing-title-"
          color={ColorDef.blue}
          onOkResult={(_selectedColor: ColorDef) => {}}
          onCancelResult={() => {}}
        />
      );
      wrapper.getByText("-testing-title-");
    });

    it("should render with presets", () => {
      const defaultColors = [
        ColorDef.create(ColorByName.red),
        ColorDef.create(ColorByName.orange),
        ColorDef.create(ColorByName.yellow),
        ColorDef.create(ColorByName.green),
        ColorDef.create(ColorByName.blue),
        ColorDef.create(ColorByName.olive),
      ];
      const wrapper = render(
        <ColorPickerDialog
          dialogTitle="-testing-title-"
          color={ColorDef.blue}
          colorPresets={defaultColors}
          onOkResult={(_selectedColor: ColorDef) => {}}
          onCancelResult={() => {}}
        />
      );
      defaultColors.forEach((def) => {
        wrapper.getByText(
          ColorValue.fromTbgr(def.tbgr).toHslString(true).toUpperCase()
        );
      });
    });

    it("should trigger onCancelResult", () => {
      const spyOnCancel = vi.fn();

      const wrapper = render(
        <ColorPickerDialog
          dialogTitle="-testing-title-"
          color={ColorDef.blue}
          onOkResult={(_selectedColor: ColorDef) => {}}
          onCancelResult={spyOnCancel}
        />
      );
      const cancelButton = wrapper.getByRole("button", {
        name: "dialog.cancel",
      });
      expect(cancelButton).toBeTruthy();
      fireEvent.click(cancelButton);
      expect(spyOnCancel).toHaveBeenCalledOnce();
    });

    it("should trigger onOkResult with initial color", () => {
      const spyOnOK = vi.fn();

      function handleOK(color: ColorDef): void {
        expect(color.tbgr).toEqual(ColorByName.blue);
        spyOnOK();
      }

      const wrapper = render(
        <ColorPickerDialog
          dialogTitle="-testing-title-"
          colorInputType="hsl"
          color={ColorDef.blue}
          onOkResult={handleOK}
          onCancelResult={() => {}}
        />
      );
      const okButton = wrapper.getByRole("button", {
        name: "dialog.ok",
      });
      expect(okButton).toBeTruthy();
      fireEvent.click(okButton);
      expect(spyOnOK).toHaveBeenCalledOnce();
    });

    it("should trigger onOkResult with preset color (black)", () => {
      const spyOnOK = vi.fn();

      const defaultColors = [
        ColorDef.create(ColorByName.black),
        ColorDef.create(ColorByName.red),
        ColorDef.create(ColorByName.orange),
        ColorDef.create(ColorByName.yellow),
        ColorDef.create(ColorByName.green),
        ColorDef.create(ColorByName.blue),
        ColorDef.create(ColorByName.olive),
      ];

      function handleOK(color: ColorDef): void {
        expect(color.tbgr).toEqual(ColorByName.black);
        spyOnOK();
      }

      const wrapper = render(
        <ColorPickerDialog
          dialogTitle="-testing-title-"
          color={ColorDef.blue}
          colorPresets={defaultColors}
          onOkResult={handleOK}
          onCancelResult={() => {}}
        />
      );

      const button = wrapper.getByRole("button", {
        name: ColorValue.fromTbgr(defaultColors[0].tbgr)
          .toHslString(true)
          .toUpperCase(),
      });
      fireEvent.click(button);

      const okButton = wrapper.getByRole("button", {
        name: "dialog.ok",
      });
      fireEvent.click(okButton);
      expect(spyOnOK).toHaveBeenCalledOnce();
    });
  });
});
