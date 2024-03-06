/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import sinon from "sinon";
import { expect } from "chai";
import { fireEvent, render } from "@testing-library/react";
import { ColorByName, ColorDef } from "@itwin/core-common";
import { TestUtils } from "../TestUtils";
import { ColorPickerDialog } from "../../imodel-components-react/color/ColorPickerDialog";
import { ColorValue } from "@itwin/itwinui-react";

/* eslint-disable deprecation/deprecation */

describe("ColorPickerDialog", () => {
  before(async () => {
    await TestUtils.initializeUiIModelComponents();
  });

  after(() => {
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
      expect(wrapper.findByText("-testing-title-")).not.to.be.null;
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
      const spyOnCancel = sinon.spy();

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
      expect(cancelButton).not.to.be.null;
      fireEvent.click(cancelButton);
      expect(spyOnCancel).to.be.calledOnce;
    });

    it("should trigger onOkResult with initial color", () => {
      const spyOnOK = sinon.spy();

      function handleOK(color: ColorDef): void {
        expect(color.tbgr).to.be.equal(ColorByName.blue);
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
      expect(okButton).not.to.be.null;
      fireEvent.click(okButton);
      expect(spyOnOK).to.be.calledOnce;
    });

    it("should trigger onOkResult with preset color (black)", () => {
      const spyOnOK = sinon.spy();

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
        expect(color.tbgr).to.be.equal(ColorByName.black);
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
      expect(spyOnOK).to.be.calledOnce;
    });
  });
});
