/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import React from "react";
import { Key } from "ts-key-enum";
import { fireEvent, render } from "@testing-library/react";
import { ColorByName } from "@itwin/core-common";
import type { PrimitiveValue } from "@itwin/appui-abstract";
import { StandardEditorNames } from "@itwin/appui-abstract";
import type { PropertyUpdatedArgs } from "@itwin/components-react";
import {
  EditorContainer,
  PropertyEditorManager,
} from "@itwin/components-react";
import "../../imodel-components-react.js";
import { ColorEditor } from "../../imodel-components-react/editors/ColorEditor.js";
import { MineDataController, TestUtils } from "../TestUtils.js";

describe("<ColorEditor />", () => {
  it("should render", () => {
    const renderedComponent = render(<ColorEditor setFocus={true} />);
    expect(renderedComponent).toBeTruthy();
  });

  it("should trigger componentDidUpdate", async () => {
    const record1 = TestUtils.createColorProperty("Test", ColorByName.green);
    const record2 = TestUtils.createColorProperty("Test", ColorByName.blue);
    record2.isDisabled = true;

    const originalValue = (record1.value as PrimitiveValue).value as number;
    expect(originalValue).toEqual(ColorByName.green);

    const renderedComponent = render(<ColorEditor propertyRecord={record1} />);
    renderedComponent.rerender(<ColorEditor propertyRecord={record2} />);
  });

  it("button press should open popup and allow color selection", async () => {
    const record = TestUtils.createColorProperty("Test", ColorByName.green);

    const originalValue = (record.value as PrimitiveValue).value as number;
    expect(originalValue).toEqual(ColorByName.green);

    const spyOnCommit = vi.fn();
    function handleCommit(commit: PropertyUpdatedArgs): void {
      const newValue = (commit.newValue as PrimitiveValue).value as number;
      expect(newValue).toEqual(ColorByName.blue);
      spyOnCommit();
    }

    const renderedComponent = render(
      <ColorEditor propertyRecord={record} onCommit={handleCommit} />
    );
    const pickerButton = renderedComponent.getByTestId(
      "components-colorpicker-button"
    );
    expect(pickerButton.tagName).toEqual("BUTTON");
    fireEvent.click(pickerButton);

    const popupDiv = renderedComponent.getByTestId(
      "components-colorpicker-popup-colors"
    );
    expect(popupDiv).toBeTruthy();
    if (popupDiv) {
      const firstColorButton = popupDiv.firstChild as HTMLElement;
      expect(firstColorButton).toBeTruthy();
      fireEvent.click(firstColorButton);

      // wait for async processing done in ColorEditor._onColorPick method
      await TestUtils.flushAsyncOperations();
      expect(spyOnCommit).toHaveBeenCalledOnce();
    }
  });

  it("renders editor for 'number' type and 'color-picker' editor using SliderEditor", () => {
    const propertyRecord = TestUtils.createNumericProperty(
      "Test",
      50,
      StandardEditorNames.ColorPicker
    );
    const renderedComponent = render(
      <EditorContainer
        propertyRecord={propertyRecord}
        title="abc"
        onCommit={() => {}}
        onCancel={() => {}}
      />
    );
    expect(renderedComponent.getByTestId("components-colorpicker-button")).to
      .exist;
  });

  // TODO: vitest
  it.skip("should not commit if DataController fails to validate", async () => {
    PropertyEditorManager.registerDataController("myData", MineDataController);
    const propertyRecord = TestUtils.createNumericProperty(
      "Test",
      50,
      StandardEditorNames.ColorPicker
    );
    propertyRecord.property.dataController = "myData";

    const spyOnCommit = vi.fn();
    const wrapper = render(
      <EditorContainer
        propertyRecord={propertyRecord}
        title="abc"
        onCommit={spyOnCommit}
        onCancel={() => {}}
      />
    );
    const pickerButton = wrapper.getByTestId("components-colorpicker-button");
    expect(pickerButton).toBeTruthy();

    fireEvent.keyDown(pickerButton, { key: Key.Enter });
    await TestUtils.flushAsyncOperations();
    expect(spyOnCommit).not.toBeCalled();

    PropertyEditorManager.deregisterDataController("myData");
  });
});
